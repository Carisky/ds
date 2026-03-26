const { spawn } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { app, BrowserWindow, globalShortcut, ipcMain, screen, session } = require("electron");
const { NsisUpdater } = require("electron-updater");
const packageMetadata = require("./package.json");
const {
  createSignalServer,
  discoverSignalServers,
  getLocalIPv4Addresses,
  probeSignalServer
} = require("./signal-server");

let mainWindow = null;
let overlayWindow = null;
let activeServer = null;
let registeredMuteShortcut = null;
let modifierOnlyMuteShortcut = null;
let modifierOnlyMuteShortcutProcess = null;
let modifierOnlyMuteShortcutStdout = "";

const logFilePath = path.join(os.tmpdir(), "ds-voice-lan.log");
const DEFAULT_SETTINGS = {
  nodeId: crypto.randomUUID(),
  nickname: "Guest",
  globalMuteShortcut: "CommandOrControl+Shift+M",
  networkBufferMode: "medium",
  audioInputDeviceId: "default",
  audioOutputDeviceId: "default",
  overlayPosition: "left-top",
  savedServers: []
};
const DEFAULT_UPDATER_STATE = {
  enabled: false,
  configured: false,
  currentVersion: packageMetadata.version,
  availableVersion: "",
  status: "disabled",
  message: "",
  progressPercent: 0,
  bytesPerSecond: 0,
  transferred: 0,
  total: 0
};
const AUTO_UPDATE_CHECK_DELAY_MS = 2500;

const MODIFIER_TOKEN_ORDER = ["CommandOrControl", "Control", "Alt", "Shift", "Super"];
const MODIFIER_SHORTCUT_TOKENS = new Set(["CommandOrControl", "Control", "Alt", "Shift", "Super", "Meta"]);
const MODIFIER_LISTENER_FILENAME = "modifier-hotkey-listener.ps1";
const SHORTCUT_TOKEN_ALIASES = {
  ctrl: "Control",
  ctral: "Control",
  control: "Control",
  commandorcontrol: "CommandOrControl",
  cmdorctrl: "CommandOrControl",
  alt: "Alt",
  option: "Alt",
  shift: "Shift",
  super: "Super",
  meta: "Super",
  win: "Super",
  windows: "Super",
  cmd: "Super",
  return: "Return",
  enter: "Return",
  esc: "Escape",
  escape: "Escape",
  backspace: "Backspace",
  del: "Delete",
  delete: "Delete",
  ins: "Insert",
  insert: "Insert",
  space: "Space",
  spacebar: "Space",
  up: "Up",
  down: "Down",
  left: "Left",
  right: "Right",
  home: "Home",
  end: "End",
  pageup: "PageUp",
  pgup: "PageUp",
  pagedown: "PageDown",
  pgdn: "PageDown",
  tab: "Tab"
};

let appSettings = { ...DEFAULT_SETTINGS };
let appUpdater = null;
let updaterState = { ...DEFAULT_UPDATER_STATE };
let overlaySnapshot = {
  visible: false,
  roomName: "DS Voice LAN",
  address: "",
  muted: false,
  participants: []
};

function writeLog(message, error = null) {
  const parts = [`[${new Date().toISOString()}] ${message}`];
  if (error) {
    parts.push(error.stack || String(error));
  }

  try {
    fs.appendFileSync(logFilePath, `${parts.join("\n")}\n`);
  } catch (logError) {
    console.error("Failed to write log file:", logError);
  }
}

function getSettingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function sanitizeNickname(value) {
  const clean = String(value || "").trim().slice(0, 24);
  return clean || DEFAULT_SETTINGS.nickname;
}

function sanitizeNodeId(value, fallback = "") {
  const raw = String(value || fallback || crypto.randomUUID());
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || crypto.randomUUID();
}

function normalizeShortcutToken(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  const collapsed = raw.replace(/\s+/g, "").toLowerCase();
  if (SHORTCUT_TOKEN_ALIASES[collapsed]) {
    return SHORTCUT_TOKEN_ALIASES[collapsed];
  }

  if (/^f\d{1,2}$/i.test(raw)) {
    return raw.toUpperCase();
  }

  if (/^[a-z0-9]$/i.test(raw)) {
    return raw.toUpperCase();
  }

  return raw;
}

function isModifierShortcutToken(value) {
  return MODIFIER_SHORTCUT_TOKENS.has(String(value || ""));
}

function parseShortcutParts(value) {
  return String(value || "")
    .split("+")
    .map((token) => normalizeShortcutToken(token))
    .filter(Boolean);
}

function sanitizeShortcut(value) {
  const parts = parseShortcutParts(value);
  if (!parts.length) {
    return DEFAULT_SETTINGS.globalMuteShortcut;
  }

  const seen = new Set();
  const modifiers = [];
  const keys = [];

  for (const part of parts) {
    if (seen.has(part)) {
      continue;
    }

    seen.add(part);
    if (isModifierShortcutToken(part)) {
      modifiers.push(part);
    } else {
      keys.push(part);
    }
  }

  modifiers.sort((left, right) => MODIFIER_TOKEN_ORDER.indexOf(left) - MODIFIER_TOKEN_ORDER.indexOf(right));
  const clean = [...modifiers, ...keys].join("+");
  return clean || DEFAULT_SETTINGS.globalMuteShortcut;
}

function sanitizeServerAddress(value) {
  return String(value || "")
    .trim()
    .replace(/^wss?:\/\//i, "")
    .replace(/^https?:\/\//i, "")
    .slice(0, 120);
}

function sanitizeServerName(value, fallback = "") {
  const clean = String(value || "").trim().slice(0, 32);
  return clean || fallback;
}

function sanitizeSavedServers(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .slice(0, 32)
    .map((entry, index) => {
      const address = sanitizeServerAddress(entry?.address);
      if (!address) {
        return null;
      }

      const rawId = String(entry?.id || crypto.randomUUID() || `server_${index}`);
      const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || `server_${index}`;

      return {
        id,
        name: sanitizeServerName(entry?.name, address),
        address
      };
    })
    .filter(Boolean);
}

function sanitizeMediaDeviceId(value, fallback = "default") {
  const clean = String(value || fallback || "default").trim().slice(0, 512);
  return clean || "default";
}

function sanitizeOverlayPosition(value, fallback = DEFAULT_SETTINGS.overlayPosition) {
  const clean = String(value || fallback || DEFAULT_SETTINGS.overlayPosition).trim().toLowerCase();
  if (["left-top", "left-center", "right-top", "right-center"].includes(clean)) {
    return clean;
  }

  return DEFAULT_SETTINGS.overlayPosition;
}

function sanitizeNetworkBufferMode(value) {
  const clean = String(value || "").trim().toLowerCase();
  if (["none", "medium", "max"].includes(clean)) {
    return clean;
  }

  return DEFAULT_SETTINGS.networkBufferMode;
}

function sanitizeOverlaySnapshot(value) {
  const participants = Array.isArray(value?.participants)
    ? value.participants.slice(0, 12).map((participant) => ({
      id: String(participant?.id || ""),
      name: String(participant?.name || "User").trim().slice(0, 24) || "User",
      initials: String(participant?.initials || "U").trim().slice(0, 3) || "U",
      self: Boolean(participant?.self),
      muted: Boolean(participant?.muted),
      speaking: Boolean(participant?.speaking)
    }))
    : [];

  return {
    visible: Boolean(value?.visible),
    roomName: String(value?.roomName || "DS Voice LAN").trim().slice(0, 40) || "DS Voice LAN",
    address: String(value?.address || "").trim().slice(0, 120),
    muted: Boolean(value?.muted),
    participants
  };
}

function getPublicSettings() {
  return {
    nodeId: appSettings.nodeId,
    nickname: appSettings.nickname,
    globalMuteShortcut: appSettings.globalMuteShortcut,
    networkBufferMode: appSettings.networkBufferMode,
    audioInputDeviceId: appSettings.audioInputDeviceId,
    audioOutputDeviceId: appSettings.audioOutputDeviceId,
    overlayPosition: appSettings.overlayPosition,
    savedServers: appSettings.savedServers
  };
}

function getPublicUpdaterState() {
  return {
    ...updaterState
  };
}

async function refreshServerCatalog(savedServersInput) {
  const savedServers = sanitizeSavedServers(savedServersInput);
  const discoveredServers = await discoverSignalServers();
  const statusByAddress = new Map();

  for (const server of discoveredServers) {
    statusByAddress.set(server.address, "online");
  }

  const savedAddresses = [...new Set(savedServers.map((server) => server.address))];

  await Promise.all(savedAddresses.map(async (address) => {
    if (statusByAddress.has(address)) {
      return;
    }

    const isOnline = await probeSignalServer(address);
    statusByAddress.set(address, isOnline ? "online" : "offline");
  }));

  return {
    discoveredServers,
    statuses: [...statusByAddress.entries()].map(([address, status]) => ({
      address,
      status
    })),
    checkedAt: Date.now()
  };
}

function parseGitHubRepositoryValue(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return null;
  }

  if (/^[^/\s]+\/[^/\s]+$/.test(raw)) {
    const [owner, repo] = raw.split("/");
    return { owner, repo };
  }

  const normalized = raw
    .replace(/^git\+/, "")
    .replace(/^git@github\.com:/i, "https://github.com/")
    .replace(/\.git$/i, "");

  const match = normalized.match(/github\.com\/([^/]+)\/([^/]+)$/i);
  if (!match) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2]
  };
}

function resolveGitHubUpdateConfig() {
  const embeddedConfig = packageMetadata.dsUpdate;
  if (embeddedConfig?.owner && embeddedConfig?.repo) {
    return {
      provider: "github",
      owner: embeddedConfig.owner,
      repo: embeddedConfig.repo,
      releaseType: embeddedConfig.releaseType || "release"
    };
  }

  const repositoryField = typeof packageMetadata.repository === "string"
    ? packageMetadata.repository
    : packageMetadata.repository?.url;
  const candidates = [
    process.env.DS_GITHUB_REPOSITORY,
    process.env.GITHUB_REPOSITORY,
    process.env.DS_GITHUB_OWNER && process.env.DS_GITHUB_REPO
      ? `${process.env.DS_GITHUB_OWNER}/${process.env.DS_GITHUB_REPO}`
      : "",
    repositoryField
  ];

  for (const candidate of candidates) {
    const parsed = parseGitHubRepositoryValue(candidate);
    if (parsed) {
      return {
        provider: "github",
        owner: parsed.owner,
        repo: parsed.repo,
        releaseType: "release"
      };
    }
  }

  return null;
}

function broadcastUpdaterState() {
  if (!mainWindow || mainWindow.isDestroyed() || mainWindow.webContents.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send("updater:state", getPublicUpdaterState());
}

function setUpdaterState(patch) {
  updaterState = {
    ...updaterState,
    ...patch
  };
  broadcastUpdaterState();
  return getPublicUpdaterState();
}

function initializeUpdaterState(config) {
  updaterState = {
    ...DEFAULT_UPDATER_STATE,
    currentVersion: app.getVersion(),
    configured: Boolean(config),
    enabled: Boolean(config) && app.isPackaged && process.platform === "win32"
  };

  if (!config) {
    return;
  }

  if (!app.isPackaged) {
    return;
  }

  if (process.platform !== "win32") {
    return;
  }

  updaterState.status = "idle";
  updaterState.message = "Автообновление подключено.";
}

function attachUpdaterEvents(updater) {
  updater.on("checking-for-update", () => {
    setUpdaterState({
      status: "checking",
      message: "Проверяем GitHub Releases...",
      progressPercent: 0,
      bytesPerSecond: 0,
      transferred: 0,
      total: 0
    });
  });

  updater.on("update-available", (info) => {
    const nextVersion = String(info?.version || "").trim();
    setUpdaterState({
      status: "available",
      availableVersion: nextVersion,
      message: nextVersion
        ? `Доступна версия ${nextVersion}.`
        : "Доступно новое обновление.",
      progressPercent: 0,
      bytesPerSecond: 0,
      transferred: 0,
      total: 0
    });
  });

  updater.on("update-not-available", () => {
    setUpdaterState({
      status: "idle",
      availableVersion: "",
      message: `У вас актуальная версия ${app.getVersion()}.`,
      progressPercent: 0,
      bytesPerSecond: 0,
      transferred: 0,
      total: 0
    });
  });

  updater.on("download-progress", (progress) => {
    setUpdaterState({
      status: "downloading",
      message: updaterState.availableVersion
        ? `Скачивается версия ${updaterState.availableVersion}...`
        : "Скачивается обновление...",
      progressPercent: Number(progress?.percent || 0),
      bytesPerSecond: Number(progress?.bytesPerSecond || 0),
      transferred: Number(progress?.transferred || 0),
      total: Number(progress?.total || 0)
    });
  });

  updater.on("update-downloaded", (info) => {
    const nextVersion = String(info?.version || updaterState.availableVersion || "").trim();
    setUpdaterState({
      status: "downloaded",
      availableVersion: nextVersion,
      message: nextVersion
        ? `Версия ${nextVersion} готова к установке.`
        : "Обновление готово к установке.",
      progressPercent: 100,
      transferred: updaterState.total || updaterState.transferred,
      total: updaterState.total || updaterState.transferred
    });
  });

  updater.on("error", (error) => {
    writeLog("Updater error.", error);
    setUpdaterState({
      status: "error",
      message: error?.message || String(error || "Updater error")
    });
  });
}

function initializeAppUpdater() {
  const config = resolveGitHubUpdateConfig();
  initializeUpdaterState(config);

  if (!config || !updaterState.enabled) {
    return;
  }

  appUpdater = new NsisUpdater(config);
  appUpdater.autoDownload = false;
  appUpdater.autoInstallOnAppQuit = false;
  appUpdater.allowDowngrade = false;
  attachUpdaterEvents(appUpdater);

  setTimeout(() => {
    void checkForAppUpdates(false);
  }, AUTO_UPDATE_CHECK_DELAY_MS);
}

async function checkForAppUpdates(manual = false) {
  if (!appUpdater) {
    if (manual) {
      setUpdaterState({
        status: updaterState.configured ? "disabled" : "error",
        message: updaterState.configured
          ? "Автообновление доступно только в установленной Windows-сборке."
          : "GitHub Releases не настроены для этой сборки."
      });
    }

    return getPublicUpdaterState();
  }

  if (["checking", "downloading"].includes(updaterState.status)) {
    return getPublicUpdaterState();
  }

  try {
    await appUpdater.checkForUpdates();
  } catch (error) {
    writeLog("Failed to check for app updates.", error);
    setUpdaterState({
      status: "error",
      message: error?.message || "Не удалось проверить обновления."
    });
  }

  return getPublicUpdaterState();
}

async function downloadAppUpdate() {
  if (!appUpdater) {
    throw new Error("Автообновление недоступно в этой сборке.");
  }

  if (updaterState.status === "downloaded") {
    return getPublicUpdaterState();
  }

  if (!updaterState.availableVersion || !["available", "error"].includes(updaterState.status)) {
    await checkForAppUpdates(true);
    if (updaterState.status !== "available") {
      return getPublicUpdaterState();
    }
  }

  try {
    await appUpdater.downloadUpdate();
  } catch (error) {
    writeLog("Failed to download app update.", error);
    setUpdaterState({
      status: "error",
      message: error?.message || "Не удалось скачать обновление."
    });
  }

  return getPublicUpdaterState();
}

async function installDownloadedUpdate() {
  if (!appUpdater) {
    throw new Error("Автообновление недоступно в этой сборке.");
  }

  if (updaterState.status !== "downloaded") {
    return getPublicUpdaterState();
  }

  setUpdaterState({
    status: "installing",
    message: "Закрываем приложение и запускаем установку..."
  });

  setImmediate(() => {
    appUpdater.quitAndInstall(false, true);
  });

  return getPublicUpdaterState();
}

function loadSettings() {
  try {
    const raw = fs.readFileSync(getSettingsPath(), "utf8");
    const parsed = JSON.parse(raw);
    appSettings = {
      ...DEFAULT_SETTINGS,
      ...parsed,
      nodeId: sanitizeNodeId(parsed.nodeId, DEFAULT_SETTINGS.nodeId),
      nickname: sanitizeNickname(parsed.nickname),
      globalMuteShortcut: sanitizeShortcut(parsed.globalMuteShortcut),
      networkBufferMode: sanitizeNetworkBufferMode(parsed.networkBufferMode),
      audioInputDeviceId: sanitizeMediaDeviceId(parsed.audioInputDeviceId, DEFAULT_SETTINGS.audioInputDeviceId),
      audioOutputDeviceId: sanitizeMediaDeviceId(parsed.audioOutputDeviceId, DEFAULT_SETTINGS.audioOutputDeviceId),
      overlayPosition: sanitizeOverlayPosition(parsed.overlayPosition, DEFAULT_SETTINGS.overlayPosition),
      savedServers: sanitizeSavedServers(parsed.savedServers)
    };
  } catch (error) {
    appSettings = { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  fs.writeFileSync(getSettingsPath(), JSON.stringify(appSettings, null, 2));
}

function handleGlobalMuteShortcut() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("mute:toggle-request");
  }
}

function isModifierOnlyShortcut(accelerator) {
  const parts = parseShortcutParts(accelerator);
  return Boolean(parts.length) && parts.every((part) => isModifierShortcutToken(part));
}

function getModifierOnlyShortcutValue() {
  return modifierOnlyMuteShortcut;
}

function getModifierListenerSourcePath() {
  return path.join(__dirname, MODIFIER_LISTENER_FILENAME);
}

function getModifierListenerRuntimePath() {
  return path.join(app.getPath("userData"), MODIFIER_LISTENER_FILENAME);
}

function ensureModifierListenerScript() {
  const sourcePath = getModifierListenerSourcePath();
  const runtimePath = getModifierListenerRuntimePath();
  const source = fs.readFileSync(sourcePath, "utf8");

  let current = "";
  try {
    current = fs.readFileSync(runtimePath, "utf8");
  } catch (error) {
    current = "";
  }

  if (current !== source) {
    fs.writeFileSync(runtimePath, source, "utf8");
  }

  return runtimePath;
}

function stopModifierOnlyShortcutProcess() {
  modifierOnlyMuteShortcut = null;
  modifierOnlyMuteShortcutStdout = "";

  if (!modifierOnlyMuteShortcutProcess) {
    return;
  }

  modifierOnlyMuteShortcutProcess.removeAllListeners();
  modifierOnlyMuteShortcutProcess.stdout?.removeAllListeners();
  modifierOnlyMuteShortcutProcess.stderr?.removeAllListeners();
  modifierOnlyMuteShortcutProcess.kill();
  modifierOnlyMuteShortcutProcess = null;
}

function handleModifierShortcutStdout(chunk, resolve, reject, normalized) {
  modifierOnlyMuteShortcutStdout += chunk.toString();
  const lines = modifierOnlyMuteShortcutStdout.split(/\r?\n/);
  modifierOnlyMuteShortcutStdout = lines.pop() || "";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (line === "READY") {
      resolve(normalized);
      continue;
    }

    if (line === "TRIGGER") {
      handleGlobalMuteShortcut();
      continue;
    }

    if (line.startsWith("ERROR:")) {
      reject(new Error(line.slice("ERROR:".length).trim() || "Modifier-only hotkey listener failed."));
      continue;
    }

    writeLog(`Modifier-only hotkey listener: ${line}`);
  }
}

async function enableModifierOnlyShortcut(accelerator) {
  const normalized = sanitizeShortcut(accelerator);
  const runtimePath = ensureModifierListenerScript();
  stopModifierOnlyShortcutProcess();
  modifierOnlyMuteShortcut = normalized;

  return await new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(
      "powershell.exe",
      [
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-WindowStyle",
        "Hidden",
        "-STA",
        "-File",
        runtimePath,
        normalized
      ],
      {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"]
      }
    );

    modifierOnlyMuteShortcutProcess = child;
    modifierOnlyMuteShortcutStdout = "";

    const fail = (error) => {
      if (settled) {
        writeLog("Modifier-only hotkey listener failed after start.", error);
        return;
      }

      settled = true;
      stopModifierOnlyShortcutProcess();
      reject(error);
    };

    const succeed = (value) => {
      if (settled) {
        return;
      }

      settled = true;
      resolve(value);
    };

    child.stdout?.on("data", (chunk) => {
      handleModifierShortcutStdout(chunk, succeed, fail, normalized);
    });

    child.stderr?.on("data", (chunk) => {
      writeLog(`Modifier-only hotkey listener stderr: ${chunk.toString().trim()}`);
    });

    child.once("error", (error) => {
      fail(new Error(`Modifier-only hotkey listener failed to start: ${error.message || error}`));
    });

    child.once("exit", (code, signal) => {
      if (child === modifierOnlyMuteShortcutProcess) {
        modifierOnlyMuteShortcutProcess = null;
      }

      if (!settled) {
        fail(new Error(`Modifier-only hotkey listener exited before ready (${code ?? signal ?? "unknown"}).`));
        return;
      }

      if (code && code !== 0) {
        writeLog(`Modifier-only hotkey listener exited with code ${code}.`);
      }
    });
  });
}

function disableModifierOnlyShortcut() {
  stopModifierOnlyShortcutProcess();
}

function disableElectronShortcut() {
  if (!registeredMuteShortcut) {
    return;
  }

  globalShortcut.unregister(registeredMuteShortcut);
  registeredMuteShortcut = null;
}

function getRegisteredShortcutSnapshot() {
  if (registeredMuteShortcut) {
    return {
      mode: "electron",
      value: registeredMuteShortcut
    };
  }

  const modifierShortcut = getModifierOnlyShortcutValue();
  if (modifierShortcut) {
    return {
      mode: "modifier",
      value: modifierShortcut
    };
  }

  return null;
}

function clearRegisteredGlobalMuteShortcut() {
  disableElectronShortcut();
  disableModifierOnlyShortcut();
}

async function restoreRegisteredGlobalMuteShortcut(snapshot) {
  if (!snapshot?.value) {
    return;
  }

  try {
    if (snapshot.mode === "modifier") {
      await enableModifierOnlyShortcut(snapshot.value);
    } else {
      registerWithElectronGlobalShortcut(snapshot.value);
    }
  } catch (error) {
    writeLog("Failed to restore previous global mute shortcut.", error);
  }
}

function registerWithElectronGlobalShortcut(accelerator) {
  const normalized = sanitizeShortcut(accelerator);

  try {
    if (!globalShortcut.register(normalized, handleGlobalMuteShortcut)) {
      throw new Error(`Shortcut is unavailable: ${normalized}`);
    }
  } catch (error) {
    throw new Error(`Shortcut is unavailable: ${normalized}. ${error.message || error}`);
  }

  registeredMuteShortcut = normalized;
  return normalized;
}

async function registerGlobalMuteShortcut(accelerator) {
  const normalized = sanitizeShortcut(accelerator);
  const previousShortcut = getRegisteredShortcutSnapshot();

  clearRegisteredGlobalMuteShortcut();

  try {
    if (isModifierOnlyShortcut(normalized)) {
      return await enableModifierOnlyShortcut(normalized);
    }

    return registerWithElectronGlobalShortcut(normalized);
  } catch (error) {
    await restoreRegisteredGlobalMuteShortcut(previousShortcut);
    throw error;
  }
}

function broadcastOverlayState() {
  if (!overlayWindow || overlayWindow.isDestroyed() || overlayWindow.webContents.isDestroyed()) {
    return;
  }

  overlayWindow.webContents.send("overlay:state", overlaySnapshot);
}

function hideOverlayWindow() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.hide();
  }
}

function closeOverlayWindow() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.close();
  }

  overlayWindow = null;
}

function shouldShowOverlay() {
  return Boolean(
    mainWindow &&
    !mainWindow.isDestroyed() &&
    mainWindow.isMinimized() &&
    overlaySnapshot.visible &&
    overlaySnapshot.participants.length
  );
}

function createOverlayWindow() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    return overlayWindow;
  }

  overlayWindow = new BrowserWindow({
    width: 220,
    height: 84,
    frame: false,
    transparent: true,
    roundedCorners: false,
    thickFrame: false,
    resizable: false,
    movable: true,
    show: false,
    skipTaskbar: true,
    focusable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    alwaysOnTop: true,
    hasShadow: false,
    backgroundColor: "#00000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  overlayWindow.setAlwaysOnTop(true, "screen-saver");
  overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  overlayWindow.setMenuBarVisibility(false);
  overlayWindow.setIgnoreMouseEvents(true, { forward: true });

  overlayWindow.loadFile(path.join(__dirname, "overlay.html")).catch((error) => {
    writeLog("Failed to load overlay window.", error);
  });

  overlayWindow.webContents.on("did-finish-load", () => {
    broadcastOverlayState();
    if (shouldShowOverlay()) {
      overlayWindow.showInactive();
    }
  });

  overlayWindow.on("closed", () => {
    overlayWindow = null;
  });

  return overlayWindow;
}

function syncOverlayVisibility() {
  if (!shouldShowOverlay()) {
    hideOverlayWindow();
    return;
  }

  const windowRef = createOverlayWindow();
  const count = Math.max(1, overlaySnapshot.participants.length);
  const columns = Math.min(6, count);
  const rows = Math.max(1, Math.ceil(count / columns));
  const width = 24 + columns * 44 + Math.max(0, columns - 1) * 10;
  const height = 24 + rows * 44 + Math.max(0, rows - 1) * 10;
  const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()) || screen.getPrimaryDisplay();
  const { x, y, width: workAreaWidth, height: workAreaHeight } = display.workArea;
  const margin = 16;
  const overlayPosition = sanitizeOverlayPosition(appSettings.overlayPosition, DEFAULT_SETTINGS.overlayPosition);
  const nextX = overlayPosition.startsWith("right")
    ? x + Math.max(margin, workAreaWidth - width - margin)
    : x + margin;
  const nextY = overlayPosition.endsWith("center")
    ? y + Math.max(margin, Math.round((workAreaHeight - height) / 2))
    : y + margin;

  windowRef.setContentSize(width, height);
  windowRef.setPosition(nextX, nextY, false);
  broadcastOverlayState();
  windowRef.showInactive();
}

function attachMainWindowEvents(windowRef) {
  windowRef.on("minimize", () => {
    setTimeout(() => {
      syncOverlayVisibility();
    }, 120);
  });

  for (const eventName of ["restore", "show", "focus", "maximize", "unmaximize"]) {
    windowRef.on(eventName, () => {
      hideOverlayWindow();
    });
  }

  windowRef.on("closed", () => {
    closeOverlayWindow();
    mainWindow = null;
  });
}

function createMainWindow() {
  writeLog(`Creating main window from ${__dirname}`);

  mainWindow = new BrowserWindow({
    width: 1500,
    height: 920,
    minWidth: 1180,
    minHeight: 760,
    autoHideMenuBar: true,
    backgroundColor: "#07080c",
    title: "DS Voice LAN",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  attachMainWindowEvents(mainWindow);
  mainWindow.webContents.on("did-finish-load", () => {
    broadcastUpdaterState();
  });

  mainWindow.loadFile(path.join(__dirname, "index.html")).catch((error) => {
    writeLog("Failed to load renderer.", error);
    app.quit();
  });
}

async function stopActiveServer() {
  if (!activeServer) {
    return;
  }

  await activeServer.stop();
  activeServer = null;
}

app.whenReady().then(async () => {
  writeLog("Electron app is ready.");
  loadSettings();

  try {
    appSettings.globalMuteShortcut = await registerGlobalMuteShortcut(appSettings.globalMuteShortcut);
  } catch (error) {
    writeLog("Failed to register global mute shortcut.", error);
    appSettings.globalMuteShortcut = DEFAULT_SETTINGS.globalMuteShortcut;

    try {
      appSettings.globalMuteShortcut = await registerGlobalMuteShortcut(DEFAULT_SETTINGS.globalMuteShortcut);
    } catch (fallbackError) {
      writeLog("Failed to register fallback global mute shortcut.", fallbackError);
    }
  }

  saveSettings();

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === "media" || permission === "microphone") {
      callback(true);
      return;
    }

    callback(false);
  });

  initializeAppUpdater();

  ipcMain.handle("network:get-ips", async () => {
    return {
      addresses: getLocalIPv4Addresses()
    };
  });

  ipcMain.handle("assets:read-text", async (_event, relativePath) => {
    const appRoot = path.resolve(__dirname);
    const resolved = path.resolve(appRoot, String(relativePath || ""));
    const rootWithSeparator = `${appRoot}${path.sep}`;

    if (resolved !== appRoot && !resolved.startsWith(rootWithSeparator)) {
      throw new Error("Asset path escapes app root.");
    }

    return fs.promises.readFile(resolved, "utf8");
  });

  ipcMain.handle("assets:read-binary", async (_event, relativePath) => {
    const appRoot = path.resolve(__dirname);
    const resolved = path.resolve(appRoot, String(relativePath || ""));
    const rootWithSeparator = `${appRoot}${path.sep}`;

    if (resolved !== appRoot && !resolved.startsWith(rootWithSeparator)) {
      throw new Error("Asset path escapes app root.");
    }

    const buffer = await fs.promises.readFile(resolved);
    return Array.from(buffer);
  });

  ipcMain.handle("settings:get", async () => {
    return getPublicSettings();
  });

  ipcMain.handle("updater:get-state", async () => {
    return getPublicUpdaterState();
  });

  ipcMain.handle("updater:check", async () => {
    return checkForAppUpdates(true);
  });

  ipcMain.handle("updater:download", async () => {
    return downloadAppUpdate();
  });

  ipcMain.handle("updater:install", async () => {
    return installDownloadedUpdate();
  });

  ipcMain.handle("settings:update", async (_event, patch) => {
    const nextSettings = {
      ...appSettings
    };

    if (patch && Object.prototype.hasOwnProperty.call(patch, "nickname")) {
      nextSettings.nickname = sanitizeNickname(patch.nickname);
    }

    if (patch && Object.prototype.hasOwnProperty.call(patch, "globalMuteShortcut")) {
      nextSettings.globalMuteShortcut = await registerGlobalMuteShortcut(patch.globalMuteShortcut);
    }

    if (patch && Object.prototype.hasOwnProperty.call(patch, "savedServers")) {
      nextSettings.savedServers = sanitizeSavedServers(patch.savedServers);
    }

    if (patch && Object.prototype.hasOwnProperty.call(patch, "networkBufferMode")) {
      nextSettings.networkBufferMode = sanitizeNetworkBufferMode(patch.networkBufferMode);
    }

    if (patch && Object.prototype.hasOwnProperty.call(patch, "audioInputDeviceId")) {
      nextSettings.audioInputDeviceId = sanitizeMediaDeviceId(patch.audioInputDeviceId, nextSettings.audioInputDeviceId);
    }

    if (patch && Object.prototype.hasOwnProperty.call(patch, "audioOutputDeviceId")) {
      nextSettings.audioOutputDeviceId = sanitizeMediaDeviceId(patch.audioOutputDeviceId, nextSettings.audioOutputDeviceId);
    }

    if (patch && Object.prototype.hasOwnProperty.call(patch, "overlayPosition")) {
      nextSettings.overlayPosition = sanitizeOverlayPosition(patch.overlayPosition, nextSettings.overlayPosition);
    }

    appSettings = nextSettings;
    saveSettings();
    syncOverlayVisibility();
    return getPublicSettings();
  });

  ipcMain.handle("server:refresh-catalog", async (_event, savedServers) => {
    return refreshServerCatalog(savedServers);
  });

  ipcMain.handle("server:start", async (_event, payload) => {
    const port = Number(typeof payload === "object" ? payload?.port : payload);
    const requestedName = typeof payload === "object" ? payload?.name : "";
    const requestedOwnerNodeId = typeof payload === "object" ? payload?.ownerNodeId : "";
    const serverName = sanitizeServerName(requestedName, `Server ${port}`);
    const ownerNodeId = sanitizeNodeId(requestedOwnerNodeId, activeServer?.ownerNodeId || appSettings.nodeId);

    if (!Number.isInteger(port) || port < 1024 || port > 65535) {
      throw new Error("Port must be between 1024 and 65535.");
    }

    if (
      activeServer &&
      (activeServer.port !== port || activeServer.name !== serverName || activeServer.ownerNodeId !== ownerNodeId)
    ) {
      await stopActiveServer();
    }

    if (!activeServer) {
      activeServer = await createSignalServer(port, {
        name: serverName,
        ownerNodeId
      });
    }

    return {
      port: activeServer.port,
      addresses: getLocalIPv4Addresses(),
      leaderId: activeServer.ownerNodeId
    };
  });

  ipcMain.handle("server:stop", async () => {
    await stopActiveServer();
    return { stopped: true };
  });

  ipcMain.on("overlay:update", (_event, payload) => {
    overlaySnapshot = sanitizeOverlaySnapshot(payload);
    syncOverlayVisibility();
  });

  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

process.on("uncaughtException", (error) => {
  writeLog("Uncaught exception.", error);
});

process.on("unhandledRejection", (error) => {
  writeLog("Unhandled rejection.", error);
});

app.on("window-all-closed", async () => {
  writeLog("All windows closed.");
  closeOverlayWindow();
  await stopActiveServer();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  disableModifierOnlyShortcut();
  globalShortcut.unregisterAll();
});

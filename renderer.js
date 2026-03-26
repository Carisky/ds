const savedServerIcons = document.getElementById("savedServerIcons");
const workspaceAvatar = document.getElementById("workspaceAvatar");
const workspaceTitle = document.getElementById("workspaceTitle");
const connectionStatus = document.getElementById("connectionStatus");
const roomInfo = document.getElementById("roomInfo");
const hostInfo = document.getElementById("hostInfo");
const participantCount = document.getElementById("participantCount");
const savedServerCount = document.getElementById("savedServerCount");
const profileMiniAvatar = document.getElementById("profileMiniAvatar");
const profileMiniName = document.getElementById("profileMiniName");
const profileMiniHotkey = document.getElementById("profileMiniHotkey");
const noiseSuppressorInfo = document.getElementById("noiseSuppressorInfo");
const dockAvatar = document.getElementById("dockAvatar");
const dockName = document.getElementById("dockName");
const dockStatus = document.getElementById("dockStatus");
const muteButton = document.getElementById("muteButton");
const disconnectButton = document.getElementById("disconnectButton");
const pageEyebrow = document.getElementById("pageEyebrow");
const pageTitle = document.getElementById("pageTitle");
const heroAddress = document.getElementById("heroAddress");
const overlayState = document.getElementById("overlayState");
const heroCard = document.querySelector(".hero-card");
const heroRoomName = document.getElementById("heroRoomName");
const heroRoomCopy = document.getElementById("heroRoomCopy");
const heroSaveServerButton = document.getElementById("heroSaveServerButton");
const heroEmptyState = document.getElementById("heroEmptyState");
const roomTiles = document.getElementById("roomTiles");
const participantContextMenu = document.getElementById("participantContextMenu");
const participantContextAvatar = document.getElementById("participantContextAvatar");
const participantContextName = document.getElementById("participantContextName");
const participantContextMeta = document.getElementById("participantContextMeta");
const participantContextVolumeField = document.getElementById("participantContextVolumeField");
const participantContextVolume = document.getElementById("participantContextVolume");
const participantContextVolumeValue = document.getElementById("participantContextVolumeValue");
const participantContextHint = document.getElementById("participantContextHint");
const participantCountInline = document.getElementById("participantCountInline");
const participantsList = document.getElementById("participants");
const eventLog = document.getElementById("eventLog");
const serverLabelInput = document.getElementById("serverLabel");
const serverAddressInput = document.getElementById("serverAddress");
const joinButton = document.getElementById("joinButton");
const saveServerButton = document.getElementById("saveServerButton");
const joinHint = document.getElementById("joinHint");
const hostPortInput = document.getElementById("hostPort");
const hostButton = document.getElementById("hostButton");
const hostPanelInfo = document.getElementById("hostPanelInfo");
const refreshServersButton = document.getElementById("refreshServersButton");
const serverDiscoveryStatus = document.getElementById("serverDiscoveryStatus");
const availableServersGrid = document.getElementById("availableServersGrid");
const availableServerCountBadge = document.getElementById("availableServerCountBadge");
const savedServersGrid = document.getElementById("savedServersGrid");
const savedServerCountBadge = document.getElementById("savedServerCountBadge");
const profileAvatarHero = document.getElementById("profileAvatarHero");
const profileHeroName = document.getElementById("profileHeroName");
const profileNicknameInput = document.getElementById("profileNickname");
const globalMuteShortcutInput = document.getElementById("globalMuteShortcut");
const saveHotkeyButton = document.getElementById("saveHotkeyButton");
const hotkeyStatus = document.getElementById("hotkeyStatus");
const outputVolumeInput = document.getElementById("outputVolume");
const outputVolumeValue = document.getElementById("outputVolumeValue");
const inputVolumeInput = document.getElementById("inputVolume");
const inputVolumeValue = document.getElementById("inputVolumeValue");
const localIps = document.getElementById("localIps");
const quickAddServerButton = document.getElementById("quickAddServerButton");
const updateRailButton = document.getElementById("updateRailButton");
const updateSidebarCard = document.getElementById("updateSidebarCard");
const updateVersionBadge = document.getElementById("updateVersionBadge");
const updateStatusText = document.getElementById("updateStatusText");
const updateProgressBlock = document.getElementById("updateProgressBlock");
const updateProgressFill = document.getElementById("updateProgressFill");
const updateProgressLabel = document.getElementById("updateProgressLabel");
const updateSpeedLabel = document.getElementById("updateSpeedLabel");
const updateActionButton = document.getElementById("updateActionButton");
const appVersionLabel = document.getElementById("appVersionLabel");
const checkUpdatesButton = document.getElementById("checkUpdatesButton");
const audioContainer = document.getElementById("audioContainer");

const pageSwitchers = [...document.querySelectorAll("[data-page-switch]")];
const pages = [...document.querySelectorAll(".page")];
const navButtons = [...document.querySelectorAll(".nav-link, .rail-button")];

const RNNOISE_PROCESSOR_ID = "@sapphi-red/web-noise-suppressor/rnnoise";
const RNNOISE_WORKLET_PATH = "node_modules/@sapphi-red/web-noise-suppressor/dist/rnnoise/workletProcessor.js";
const RNNOISE_WASM_PATH = "node_modules/@sapphi-red/web-noise-suppressor/dist/rnnoise.wasm";
const RNNOISE_SIMD_WASM_PATH = "node_modules/@sapphi-red/web-noise-suppressor/dist/rnnoise_simd.wasm";
const DEFAULT_ROOM_NAME = "Локальная комната";
const DEFAULT_HOTKEY = "CommandOrControl+Shift+M";
const SERVER_CATALOG_REFRESH_MS = 5000;
const ICONS = {
  micOn: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V21h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-3.08A7 7 0 0 1 5 11a1 1 0 1 1 2 0 5 5 0 0 0 10 0Z"/>
    </svg>
  `,
  micOff: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.36 17.3 16.95 18.7 5.3 7.05l1.4-1.41 11.66 11.66ZM14 5.83v5.34l-2-2V5.83a2 2 0 1 0-4 0v1.34l-2-2V5.83a4 4 0 1 1 8 0Zm4.74 5.27A6.97 6.97 0 0 1 19 13a7 7 0 0 1-7 7 6.97 6.97 0 0 1-1.9-.26l1.66-1.66c.08.01.16.02.24.02a5 5 0 0 0 5-5c0-.08-.01-.16-.02-.24l1.76-1.76ZM12 22a9 9 0 0 1-9-9h2a7 7 0 0 0 11.95 4.95l1.42 1.42A8.97 8.97 0 0 1 12 22Z"/>
    </svg>
  `,
  disconnect: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 17v-3H3v-4h7V7l5 5-5 5Zm4 4H5a2 2 0 0 1-2-2v-3h2v3h9v2Zm0-18v2H5v3H3V5a2 2 0 0 1 2-2h9Z"/>
    </svg>
  `,
  more: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12a1.75 1.75 0 1 0 0 .01V12Zm6 0a1.75 1.75 0 1 0 0 .01V12Zm6 0a1.75 1.75 0 1 0 0 .01V12Z"/>
    </svg>
  `,
  self: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5a1 1 0 1 0 2 0c0-1.45 2.39-3 6-3s6 1.55 6 3a1 1 0 1 0 2 0c0-2.76-3.58-5-8-5Z"/>
    </svg>
  `,
  speaking: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 14h3v-4H3v4Zm5 4h3V6H8v12Zm5-2h3v-8h-3v8Zm5 3h3V5h-3v14Z"/>
    </svg>
  `,
  statusActive: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-14 0 1 1 0 1 1 2 0 5 5 0 0 0 10 0Z"/>
    </svg>
  `,
  statusOffline: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm4.59 13.17L10.83 9.4l1.41-1.41 5.76 5.76-1.41 1.42ZM9.4 15.59 8 14.17l5.76-5.76 1.41 1.41L9.4 15.59Z"/>
    </svg>
  `
};

const peerConnections = new Map();
const pendingIceCandidates = new Map();
const remoteAudios = new Map();
const participantVolumes = new Map();

const rtcConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
};

const audioState = {
  rawStream: null,
  outboundStream: null,
  context: null,
  source: null,
  highPass: null,
  micGain: null,
  suppressor: null,
  destination: null
};

const activityState = {
  context: null,
  local: null,
  remotes: new Map(),
  intervalId: null
};

let activeContextMenuUserId = "";

const state = {
  page: "room",
  nickname: "Guest",
  hotkey: DEFAULT_HOTKEY,
  savedServers: [],
  discoveredServers: [],
  serverStatuses: {},
  serverRefreshInFlight: false,
  serverLastCheckedAt: 0,
  serverRefreshError: "",
  serverRefreshTimer: null,
  selectedServerId: null,
  selfId: null,
  users: [],
  socket: null,
  connectedAddress: "",
  displayAddress: "",
  roomLabel: DEFAULT_ROOM_NAME,
  isMuted: false,
  speakerVolume: 1,
  microphoneVolume: 1,
  localIpAddresses: [],
  nicknameSaveTimer: null,
  noiseSuppressorMode: "RNNoise pending",
  speakingUsers: new Set(),
  updater: {
    enabled: false,
    configured: false,
    currentVersion: "",
    availableVersion: "",
    status: "disabled",
    message: "",
    progressPercent: 0,
    bytesPerSecond: 0,
    transferred: 0,
    total: 0
  }
};

function getDesktopApi() {
  if (!window.desktopApi) {
    throw new Error("Desktop bridge is unavailable. Restart the app or reinstall the latest build.");
  }

  return window.desktopApi;
}

function sanitizeNickname(value) {
  const clean = String(value || "").trim().slice(0, 24);
  return clean || "Guest";
}

function sanitizeServerAddress(value) {
  return String(value || "")
    .trim()
    .replace(/^wss?:\/\//i, "")
    .replace(/^https?:\/\//i, "")
    .slice(0, 120);
}

function sanitizeServerLabel(value, fallback = "") {
  const clean = String(value || "").trim().slice(0, 32);
  return clean || fallback;
}

function sanitizeServerId(value, fallback = "") {
  const rawId = String(value || fallback || globalThis.crypto?.randomUUID?.() || `${Date.now()}`);
  return rawId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || `server_${Date.now()}`;
}

function normalizeServerPresenceStatus(value) {
  if (value === "online" || value === "offline" || value === "checking") {
    return value;
  }

  return "offline";
}

function sanitizeSavedServer(server) {
  const address = sanitizeServerAddress(server?.address);
  if (!address) {
    return null;
  }

  const name = sanitizeServerLabel(server?.name, address);
  const id = sanitizeServerId(server?.id, address);

  return {
    id,
    name,
    address
  };
}

function sanitizeDiscoveredServer(server) {
  const address = sanitizeServerAddress(server?.address);
  if (!address) {
    return null;
  }

  return {
    id: sanitizeServerId(server?.id, address),
    name: sanitizeServerLabel(server?.name, address),
    address,
    status: normalizeServerPresenceStatus(server?.status || "online")
  };
}

function normalizeAddress(input) {
  const raw = String(input || "").trim();

  if (!raw) {
    return "";
  }

  if (raw.startsWith("ws://") || raw.startsWith("wss://")) {
    return raw;
  }

  if (raw.startsWith("http://")) {
    return raw.replace("http://", "ws://");
  }

  if (raw.startsWith("https://")) {
    return raw.replace("https://", "wss://");
  }

  return `ws://${raw}`;
}

function stripTransport(address) {
  return String(address || "").replace(/^wss?:\/\//i, "");
}

function formatHotkeyToken(token) {
  const normalized = String(token || "").trim();
  const labelMap = {
    CommandOrControl: "Ctrl",
    Control: "Ctrl",
    Alt: "Alt",
    Option: "Alt",
    Shift: "Shift",
    Super: "Win",
    Meta: "Win",
    Return: "Enter",
    Escape: "Esc",
    Backspace: "Backspace",
    Delete: "Delete",
    Insert: "Insert",
    Space: "Space",
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
    Home: "Home",
    End: "End",
    PageUp: "PgUp",
    PageDown: "PgDn",
    Tab: "Tab"
  };

  return labelMap[normalized] || normalized;
}

function formatHotkeyLabel(value) {
  return String(value || DEFAULT_HOTKEY)
    .split("+")
    .map((token) => formatHotkeyToken(token))
    .filter(Boolean)
    .join(" + ");
}

function setHotkeyInputValue(accelerator) {
  const normalized = String(accelerator || "").trim();
  globalMuteShortcutInput.dataset.accelerator = normalized;
  globalMuteShortcutInput.value = normalized ? formatHotkeyLabel(normalized) : "";
}

function isModifierKey(key) {
  return ["Control", "Shift", "Alt", "Meta"].includes(String(key || ""));
}

function normalizeHotkeyKey(key) {
  const normalized = String(key || "");
  const namedKeys = {
    " ": "Space",
    Escape: "Escape",
    Esc: "Escape",
    Enter: "Return",
    Backspace: "Backspace",
    Delete: "Delete",
    Insert: "Insert",
    Tab: "Tab",
    ArrowUp: "Up",
    ArrowDown: "Down",
    ArrowLeft: "Left",
    ArrowRight: "Right",
    Home: "Home",
    End: "End",
    PageUp: "PageUp",
    PageDown: "PageDown"
  };

  if (namedKeys[normalized]) {
    return namedKeys[normalized];
  }

  if (/^F\d{1,2}$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  if (/^[a-z0-9]$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  return "";
}

function buildHotkeyFromKeyboardEvent(event) {
  const parts = [];

  if (event.ctrlKey || event.key === "Control") {
    parts.push("Control");
  }

  if (event.altKey || event.key === "Alt") {
    parts.push("Alt");
  }

  if (event.shiftKey || event.key === "Shift") {
    parts.push("Shift");
  }

  if (event.metaKey || event.key === "Meta") {
    parts.push("Super");
  }

  if (!isModifierKey(event.key)) {
    const keyPart = normalizeHotkeyKey(event.key);
    if (keyPart) {
      parts.push(keyPart);
    }
  }

  return parts.join("+");
}

function getInitials(value) {
  const clean = String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!clean.length) {
    return "DS";
  }

  return clean
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function getPreferredRoomLabel() {
  return sanitizeServerLabel(serverLabelInput.value, DEFAULT_ROOM_NAME);
}

function normalizeUpdaterState(value) {
  return {
    enabled: Boolean(value?.enabled),
    configured: Boolean(value?.configured),
    currentVersion: String(value?.currentVersion || "").trim(),
    availableVersion: String(value?.availableVersion || "").trim(),
    status: String(value?.status || "disabled").trim() || "disabled",
    message: String(value?.message || "").trim(),
    progressPercent: Math.max(0, Math.min(100, Number(value?.progressPercent || 0))),
    bytesPerSecond: Math.max(0, Number(value?.bytesPerSecond || 0)),
    transferred: Math.max(0, Number(value?.transferred || 0)),
    total: Math.max(0, Number(value?.total || 0))
  };
}

function formatVersion(version) {
  const clean = String(version || "").trim();
  return clean ? `v${clean}` : "v0.0.0";
}

function formatBytes(bytes) {
  const value = Math.max(0, Number(bytes || 0));
  const units = ["B", "KB", "MB", "GB"];
  let index = 0;
  let amount = value;

  while (amount >= 1024 && index < units.length - 1) {
    amount /= 1024;
    index += 1;
  }

  const precision = index === 0 ? 0 : amount >= 10 ? 1 : 2;
  return `${amount.toFixed(precision)} ${units[index]}`;
}

function formatSpeed(bytesPerSecond) {
  const value = Math.max(0, Number(bytesPerSecond || 0));
  return value ? `${formatBytes(value)}/s` : "0 B/s";
}

function getUpdaterPrimaryAction(stateValue) {
  switch (stateValue.status) {
    case "available":
      return {
        label: stateValue.availableVersion ? `Скачать ${formatVersion(stateValue.availableVersion)}` : "Скачать обновление",
        action: "download"
      };
    case "downloaded":
      return {
        label: "Перезапустить и обновить",
        action: "install"
      };
    case "error":
      return {
        label: stateValue.availableVersion ? "Скачать снова" : "Проверить снова",
        action: stateValue.availableVersion ? "download" : "check"
      };
    default:
      return null;
  }
}

function shouldShowUpdaterCard(stateValue) {
  if (!stateValue.enabled) {
    return false;
  }

  return ["checking", "available", "downloading", "downloaded", "error", "installing"].includes(stateValue.status);
}

function getUpdaterStatusText(stateValue) {
  if (stateValue.message) {
    return stateValue.message;
  }

  switch (stateValue.status) {
    case "checking":
      return "Проверяем GitHub Releases...";
    case "available":
      return stateValue.availableVersion
        ? `Доступна версия ${formatVersion(stateValue.availableVersion)}.`
        : "Доступно обновление.";
    case "downloading":
      return "Скачиваем обновление...";
    case "downloaded":
      return "Обновление готово к установке.";
    case "installing":
      return "Запускаем установщик...";
    case "error":
      return "Ошибка обновления.";
    default:
      return "";
  }
}

async function runUpdateAction(action) {
  if (!action) {
    return;
  }

  const desktopApi = getDesktopApi();

  if (action === "check") {
    applyUpdaterState(await desktopApi.checkForUpdates());
    return;
  }

  if (action === "download") {
    applyUpdaterState(await desktopApi.downloadUpdate());
    return;
  }

  if (action === "install") {
    applyUpdaterState(await desktopApi.installUpdate());
  }
}

function renderUpdaterUi() {
  const updater = state.updater;
  const cardVisible = shouldShowUpdaterCard(updater);
  const primaryAction = getUpdaterPrimaryAction(updater);
  const showProgress = ["downloading", "downloaded", "installing"].includes(updater.status);
  const progressPercent = Math.round(updater.progressPercent);

  appVersionLabel.textContent = formatVersion(updater.currentVersion || "0.0.0");
  checkUpdatesButton.disabled = ["checking", "downloading", "installing"].includes(updater.status);

  updateSidebarCard.hidden = !cardVisible;
  updateRailButton.hidden = !cardVisible;
  updateProgressBlock.hidden = !showProgress;
  updateActionButton.hidden = !cardVisible || !primaryAction;

  if (!cardVisible) {
    updateRailButton.classList.remove("has-update", "is-ready", "is-error");
    return;
  }

  updateVersionBadge.textContent = formatVersion(updater.availableVersion || updater.currentVersion);
  updateStatusText.textContent = getUpdaterStatusText(updater);
  updateProgressFill.style.width = `${showProgress ? progressPercent : 0}%`;
  updateProgressLabel.textContent = `${progressPercent}%`;
  updateSpeedLabel.textContent = updater.status === "downloading"
    ? `${formatBytes(updater.transferred)} / ${formatBytes(updater.total || updater.transferred)} · ${formatSpeed(updater.bytesPerSecond)}`
    : updater.status === "downloaded"
      ? `Скачано: ${formatBytes(updater.total || updater.transferred)}`
      : updater.status === "installing"
        ? "Закрываем приложение..."
        : "";

  if (primaryAction) {
    updateActionButton.textContent = primaryAction.label;
    updateActionButton.dataset.action = primaryAction.action;
    updateActionButton.disabled = ["checking", "downloading", "installing"].includes(updater.status);
  } else {
    updateActionButton.dataset.action = "";
  }

  updateRailButton.classList.toggle("has-update", updater.status === "available");
  updateRailButton.classList.toggle("is-ready", updater.status === "downloaded");
  updateRailButton.classList.toggle("is-error", updater.status === "error");
  updateRailButton.disabled = ["checking", "downloading", "installing"].includes(updater.status);
  updateRailButton.textContent = updater.status === "downloaded"
    ? "↻"
    : updater.status === "error"
      ? "!"
      : updater.status === "downloading"
        ? "…"
        : "↓";
  updateRailButton.title = primaryAction?.label || getUpdaterStatusText(updater) || "Обновление";
}

function applyUpdaterState(nextUpdaterState) {
  const previous = state.updater;
  const next = normalizeUpdaterState(nextUpdaterState);
  state.updater = next;
  renderUpdaterUi();

  if (previous.status !== next.status || previous.availableVersion !== next.availableVersion) {
    if (next.status === "available" && next.availableVersion) {
      appendEvent(`Доступно обновление ${formatVersion(next.availableVersion)}.`);
    }

    if (next.status === "downloaded") {
      appendEvent("Обновление скачано и готово к установке.");
    }

    if (next.status === "error" && next.message) {
      appendEvent(`Ошибка обновления: ${next.message}`);
    }

    if (next.status === "idle" && previous.status === "checking" && next.message) {
      appendEvent(next.message);
    }

    if (next.status === "disabled" && next.message) {
      appendEvent(next.message);
    }
  }
}

function areSetsEqual(left, right) {
  if (left.size !== right.size) {
    return false;
  }

  for (const value of left) {
    if (!right.has(value)) {
      return false;
    }
  }

  return true;
}

function appendEvent(text) {
  const item = document.createElement("div");
  item.className = "event";
  item.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  eventLog.prepend(item);

  while (eventLog.childElementCount > 80) {
    eventLog.removeChild(eventLog.lastElementChild);
  }
}

function setStatus(text, statusClass) {
  connectionStatus.textContent = text;
  connectionStatus.className = `status-pill ${statusClass}`;
}

function setHotkeyStatus(text, isError = false) {
  hotkeyStatus.textContent = text;
  hotkeyStatus.style.color = isError ? "#ffb7c2" : "";
}

function setNoiseSuppressorMode(text) {
  state.noiseSuppressorMode = text;
  noiseSuppressorInfo.textContent = `Шумодав: ${text}`;
}

function updateVolumeLabels() {
  outputVolumeValue.textContent = `${Math.round(state.speakerVolume * 100)}%`;
  inputVolumeValue.textContent = `${Math.round(state.microphoneVolume * 100)}%`;
}

function updateMuteButton() {
  const label = state.isMuted ? "Включить микрофон" : "Выключить микрофон";
  muteButton.innerHTML = state.isMuted ? ICONS.micOff : ICONS.micOn;
  muteButton.title = label;
  muteButton.setAttribute("aria-label", label);
  muteButton.classList.toggle("is-muted", state.isMuted);
}

function renderDisconnectButton() {
  disconnectButton.innerHTML = ICONS.disconnect;
  disconnectButton.title = "Отключиться";
  disconnectButton.setAttribute("aria-label", "Отключиться");
}

function renderDockStatus() {
  let markup = ICONS.statusOffline;
  let label = "Не подключено";
  let stateName = "offline";

  if (state.connectedAddress) {
    if (state.isMuted) {
      markup = ICONS.micOff;
      label = "Микрофон выключен";
      stateName = "muted";
    } else if (state.selfId && state.speakingUsers.has(state.selfId)) {
      markup = ICONS.speaking;
      label = "Вы говорите";
      stateName = "speaking";
    } else {
      markup = ICONS.statusActive;
      label = "Микрофон активен";
      stateName = "active";
    }
  }

  dockStatus.innerHTML = markup;
  dockStatus.dataset.state = stateName;
  dockStatus.title = label;
  dockStatus.setAttribute("aria-label", label);
}

function applyMuteToOutboundTracks() {
  if (!audioState.outboundStream) {
    return;
  }

  for (const track of audioState.outboundStream.getAudioTracks()) {
    track.enabled = !state.isMuted;
  }
}

function getParticipantVolume(peerId) {
  return participantVolumes.get(peerId) ?? 1;
}

function findUserById(userId) {
  return state.users.find((user) => user.id === userId) || null;
}

function getRoomTileMinimumWidth(count) {
  if (count >= 8) {
    return 170;
  }

  if (count >= 6) {
    return 190;
  }

  if (count >= 4) {
    return 210;
  }

  if (count === 3) {
    return 230;
  }

  return 260;
}

function getUserStatusLabel(user) {
  if (user.id === state.selfId) {
    if (state.isMuted) {
      return "Микрофон выключен";
    }

    return state.speakingUsers.has(user.id) ? "Вы говорите" : "";
  }

  if (user.muted) {
    return "Микрофон выключен";
  }

  if (state.speakingUsers.has(user.id)) {
    return "Говорит";
  }

  return peerConnections.has(user.id) ? "" : "Подключается";
}

function hideParticipantContextMenu() {
  activeContextMenuUserId = "";
  participantContextMenu.hidden = true;
  participantContextMenu.style.left = "";
  participantContextMenu.style.top = "";
}

function positionParticipantContextMenu(clientX, clientY) {
  if (!heroCard || participantContextMenu.hidden) {
    return;
  }

  const heroBounds = heroCard.getBoundingClientRect();
  const menuBounds = participantContextMenu.getBoundingClientRect();
  const inset = 18;
  let left = clientX - heroBounds.left + 14;
  let top = clientY - heroBounds.top + 14;

  left = Math.min(Math.max(inset, left), Math.max(inset, heroBounds.width - menuBounds.width - inset));
  top = Math.min(Math.max(inset, top), Math.max(inset, heroBounds.height - menuBounds.height - inset));

  participantContextMenu.style.left = `${left}px`;
  participantContextMenu.style.top = `${top}px`;
}

function syncParticipantContextMenu() {
  if (participantContextMenu.hidden || !activeContextMenuUserId) {
    return;
  }

  const user = findUserById(activeContextMenuUserId);
  if (!user) {
    hideParticipantContextMenu();
    return;
  }

  const isSelf = user.id === state.selfId;
  const currentVolume = Math.round(getParticipantVolume(user.id) * 100);

  participantContextAvatar.textContent = getInitials(user.username);
  participantContextName.textContent = isSelf ? `${user.username} (вы)` : user.username;
  participantContextMeta.textContent = isSelf ? "Локальный пользователь" : "Громкость слышимости";
  participantContextVolumeField.hidden = isSelf;

  if (!isSelf) {
    participantContextVolume.value = String(currentVolume);
    participantContextVolumeValue.textContent = `${currentVolume}%`;
  }

  if (isSelf) {
    participantContextHint.textContent = state.isMuted
      ? "Ваш микрофон выключен."
      : "Это ваша плитка. Общая громкость меняется в профиле.";
    return;
  }

  participantContextHint.textContent = user.muted
    ? "Участник выключил микрофон. Громкость сохранится локально."
    : "Громкость меняется только у вас.";
}

function showParticipantContextMenu(user, clientX, clientY) {
  activeContextMenuUserId = user.id;
  participantContextMenu.hidden = false;
  syncParticipantContextMenu();
  requestAnimationFrame(() => {
    positionParticipantContextMenu(clientX, clientY);
  });
}

function renderParticipantTiles() {
  if (!roomTiles || !heroEmptyState || !heroCard) {
    return;
  }

  const hasTiles = Boolean(state.connectedAddress && state.users.length);
  roomTiles.hidden = !hasTiles;
  heroEmptyState.hidden = hasTiles;
  heroCard.classList.toggle("has-participants", hasTiles);

  if (!hasTiles) {
    roomTiles.innerHTML = "";
    hideParticipantContextMenu();
    return;
  }

  roomTiles.style.setProperty("--room-tile-min", `${getRoomTileMinimumWidth(state.users.length)}px`);
  roomTiles.innerHTML = "";

  for (const user of state.users) {
    const isSelf = user.id === state.selfId;
    const isMuted = isSelf ? state.isMuted : Boolean(user.muted);
    const isSpeaking = state.speakingUsers.has(user.id);
    const statusLabel = getUserStatusLabel(user);

    const tile = document.createElement("article");
    tile.className = "room-tile";
    tile.dataset.userId = user.id;
    tile.classList.toggle("self", isSelf);
    tile.classList.toggle("remote", !isSelf);
    tile.classList.toggle("is-muted", isMuted);
    tile.classList.toggle("speaking", isSpeaking);

    tile.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showParticipantContextMenu(user, event.clientX, event.clientY);
    });

    const top = document.createElement("div");
    top.className = "room-tile-top";

    const badges = document.createElement("div");
    badges.className = "room-tile-badges";

    if (isSelf) {
      const selfBadge = document.createElement("span");
      selfBadge.className = "room-tile-badge";
      selfBadge.innerHTML = ICONS.self;
      selfBadge.title = "Вы";
      badges.append(selfBadge);
    }

    if (isSpeaking) {
      const speakingBadge = document.createElement("span");
      speakingBadge.className = "room-tile-badge live";
      speakingBadge.innerHTML = ICONS.speaking;
      speakingBadge.title = "Говорит";
      badges.append(speakingBadge);
    }

    if (isMuted) {
      const mutedBadge = document.createElement("span");
      mutedBadge.className = "room-tile-badge muted";
      mutedBadge.innerHTML = ICONS.micOff;
      mutedBadge.title = "Микрофон выключен";
      badges.append(mutedBadge);
    }

    top.append(badges);

    if (!isSelf) {
      const more = document.createElement("span");
      more.className = "room-tile-more";
      more.innerHTML = ICONS.more;
      more.title = "Меню участника";
      top.append(more);
    }

    const center = document.createElement("div");
    center.className = "room-tile-center";

    const avatar = document.createElement("div");
    avatar.className = "room-tile-avatar";
    avatar.textContent = getInitials(user.username);
    center.append(avatar);

    const identity = document.createElement("div");
    identity.className = "room-tile-identity";

    const name = document.createElement("strong");
    name.className = "room-tile-name";
    name.textContent = user.username;
    identity.append(name);

    if (statusLabel) {
      const status = document.createElement("span");
      status.className = "room-tile-status";
      status.textContent = statusLabel;
      identity.append(status);
    }

    center.append(identity);
    tile.append(top, center);
    roomTiles.append(tile);
  }

  syncParticipantContextMenu();
}

function applyRemoteAudioVolume(peerId) {
  const audio = remoteAudios.get(peerId);
  if (!audio) {
    return;
  }

  audio.volume = Math.max(0, Math.min(1, state.speakerVolume * getParticipantVolume(peerId)));
}

function applySpeakerVolume() {
  for (const peerId of remoteAudios.keys()) {
    applyRemoteAudioVolume(peerId);
  }
}

function applyMicrophoneVolume() {
  if (!audioState.context || !audioState.micGain) {
    return;
  }

  audioState.micGain.gain.setTargetAtTime(
    state.microphoneVolume,
    audioState.context.currentTime,
    0.02
  );
}

async function ensureActivityContext() {
  if (!activityState.context) {
    activityState.context = createAudioContext();
  }

  if (!activityState.context) {
    return null;
  }

  if (activityState.context.state === "suspended") {
    await activityState.context.resume();
  }

  return activityState.context;
}

function createActivityEntry(context, stream) {
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.72;
  source.connect(analyser);

  return {
    source,
    analyser,
    data: new Uint8Array(analyser.frequencyBinCount),
    activeUntil: 0
  };
}

function readActivityLevel(entry) {
  entry.analyser.getByteTimeDomainData(entry.data);

  let sum = 0;
  for (const sample of entry.data) {
    const normalized = (sample - 128) / 128;
    sum += normalized * normalized;
  }

  return Math.sqrt(sum / entry.data.length);
}

function stopActivityMonitor() {
  if (activityState.intervalId) {
    window.clearInterval(activityState.intervalId);
    activityState.intervalId = null;
  }
}

function destroyActivityEntry(entry) {
  if (!entry) {
    return;
  }

  try {
    entry.source?.disconnect();
  } catch (error) {
    void error;
  }

  try {
    entry.analyser?.disconnect();
  } catch (error) {
    void error;
  }
}

function refreshSpeakingState() {
  const now = performance.now();
  const nextSpeaking = new Set();

  if (activityState.local && state.selfId && !state.isMuted) {
    const level = readActivityLevel(activityState.local);
    if (level > 0.045) {
      activityState.local.activeUntil = now + 180;
    }

    if (activityState.local.activeUntil > now) {
      nextSpeaking.add(state.selfId);
    }
  }

  for (const [peerId, entry] of activityState.remotes.entries()) {
    const level = readActivityLevel(entry);
    if (level > 0.032) {
      entry.activeUntil = now + 180;
    }

    if (entry.activeUntil > now) {
      nextSpeaking.add(peerId);
    }
  }

  if (!areSetsEqual(nextSpeaking, state.speakingUsers)) {
    state.speakingUsers = nextSpeaking;
    renderParticipantTiles();
    renderRoomSummaries();
    pushOverlayState();
  }
}

function ensureActivityMonitorRunning() {
  if (activityState.intervalId) {
    return;
  }

  activityState.intervalId = window.setInterval(refreshSpeakingState, 120);
}

async function attachLocalActivityStream(stream) {
  const context = await ensureActivityContext();
  if (!context) {
    return;
  }

  destroyActivityEntry(activityState.local);
  activityState.local = createActivityEntry(context, stream);
  ensureActivityMonitorRunning();
}

async function attachRemoteActivityStream(peerId, stream) {
  const context = await ensureActivityContext();
  if (!context) {
    return;
  }

  destroyActivityEntry(activityState.remotes.get(peerId));
  activityState.remotes.set(peerId, createActivityEntry(context, stream));
  ensureActivityMonitorRunning();
}

async function teardownActivityStreams() {
  destroyActivityEntry(activityState.local);
  activityState.local = null;

  for (const entry of activityState.remotes.values()) {
    destroyActivityEntry(entry);
  }

  activityState.remotes.clear();
  stopActivityMonitor();
  state.speakingUsers = new Set();

  if (activityState.context) {
    try {
      await activityState.context.close();
    } catch (error) {
      void error;
    }
  }

  activityState.context = null;
}

function renderLocalIps() {
  localIps.innerHTML = "";

  const addresses = state.localIpAddresses.length ? state.localIpAddresses : ["127.0.0.1"];
  for (const address of addresses) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = address;
    localIps.append(chip);
  }
}

function renderProfileVisuals() {
  const initials = getInitials(state.nickname);
  const hotkeyLabel = formatHotkeyLabel(state.hotkey);

  for (const element of [profileMiniAvatar, dockAvatar, profileAvatarHero]) {
    element.textContent = initials;
  }

  profileMiniName.textContent = state.nickname;
  profileMiniHotkey.textContent = hotkeyLabel;
  profileHeroName.textContent = state.nickname;
  dockName.textContent = state.nickname;

  profileNicknameInput.value = state.nickname;
  setHotkeyInputValue(state.hotkey);
}

function updatePageHeader() {
  let eyebrow = "Комната";
  let title = state.roomLabel || DEFAULT_ROOM_NAME;

  if (state.page === "servers") {
    eyebrow = "Серверы";
    title = "Подключение и библиотека";
  }

  if (state.page === "profile") {
    eyebrow = "Профиль";
    title = state.nickname;
  }

  pageEyebrow.textContent = eyebrow;
  pageTitle.textContent = title;
}

function renderRoomSummaries() {
  const displayAddress = state.displayAddress || sanitizeServerAddress(serverAddressInput.value) || "Не подключено";
  const roomName = state.connectedAddress ? state.roomLabel : getPreferredRoomLabel();

  workspaceTitle.textContent = roomName;
  workspaceAvatar.textContent = getInitials(roomName);
  heroRoomName.textContent = roomName;
  heroAddress.textContent = displayAddress;

  roomInfo.textContent = state.connectedAddress
    ? `Подключено к ${displayAddress}. Можно управлять громкостью каждого участника отдельно.`
    : "Подключитесь по IP:PORT или поднимите локальный signaling server.";

  heroRoomCopy.textContent = state.connectedAddress
    ? `Overlay покажет участников этой комнаты при сворачивании окна. Текущий адрес: ${displayAddress}.`
    : "Подключайтесь по IP:PORT, сохраняйте сервера в левую рейку и держите комнату перед глазами даже в свёрнутом виде.";

  participantCount.textContent = String(state.users.length);
  participantCountInline.textContent = String(state.users.length);
  savedServerCount.textContent = String(state.savedServers.length);
  savedServerCountBadge.textContent = String(state.savedServers.length);

  overlayState.textContent = state.connectedAddress
    ? "Overlay активен при сворачивании"
    : "Overlay ждёт подключения";

  renderDockStatus();

  updatePageHeader();
}

function setPage(page) {
  state.page = page;

  if (page !== "room") {
    hideParticipantContextMenu();
  }

  for (const section of pages) {
    section.classList.toggle("is-active", section.dataset.page === page);
  }

  for (const button of navButtons) {
    button.classList.toggle("is-active", button.dataset.pageSwitch === page);
  }

  updatePageHeader();
}

function fillServerForm(server) {
  if (!server) {
    return;
  }

  state.selectedServerId = server.id;
  serverLabelInput.value = server.name;
  serverAddressInput.value = server.address;
  renderSavedServers();
  renderRoomSummaries();
}

async function persistSavedServers() {
  const settings = await getDesktopApi().updateSettings({
    savedServers: state.savedServers
  });

  applyLoadedSettings(settings);
}

function getServerPresence(address) {
  const cleanAddress = sanitizeServerAddress(address);
  if (!cleanAddress) {
    return "offline";
  }

  return state.serverStatuses[cleanAddress] || (state.serverLastCheckedAt ? "offline" : "checking");
}

function getServerPresenceLabel(status) {
  if (status === "online") {
    return "online";
  }

  if (status === "checking") {
    return "checking";
  }

  return "offline";
}

function createServerPresenceBadge(status) {
  const presence = document.createElement("span");
  presence.className = `server-presence is-${status}`;

  const dot = document.createElement("span");
  dot.className = "server-presence-dot";

  const label = document.createElement("span");
  label.textContent = getServerPresenceLabel(status);

  presence.append(dot, label);
  return presence;
}

function createServerHead(server, status) {
  const head = document.createElement("div");
  head.className = "saved-server-head";

  const avatar = document.createElement("div");
  avatar.className = "saved-server-avatar";
  avatar.textContent = getInitials(server.name);

  const copy = document.createElement("div");
  copy.className = "saved-server-copy";

  const name = document.createElement("strong");
  name.textContent = server.name;

  const meta = document.createElement("div");
  meta.className = "saved-server-meta";

  const address = document.createElement("div");
  address.className = "saved-server-address";
  address.textContent = server.address;

  meta.append(createServerPresenceBadge(status), address);
  copy.append(name, meta);
  head.append(avatar, copy);

  return head;
}

function getAvailableServers() {
  const savedAddresses = new Set(state.savedServers.map((server) => server.address));
  return state.discoveredServers.filter((server) => !savedAddresses.has(server.address));
}

function renderServerCatalogState() {
  const availableServers = getAvailableServers();

  availableServerCountBadge.textContent = String(availableServers.length);
  savedServerCountBadge.textContent = String(state.savedServers.length);
  refreshServersButton.disabled = state.serverRefreshInFlight;

  if (state.serverRefreshInFlight) {
    serverDiscoveryStatus.textContent = "Проверяем серверы в локальной сети...";
    return;
  }

  if (state.serverRefreshError) {
    serverDiscoveryStatus.textContent = `Ошибка проверки: ${state.serverRefreshError}`;
    return;
  }

  if (state.serverLastCheckedAt) {
    serverDiscoveryStatus.textContent = `Автопроверка каждые 5 сек. Последняя: ${new Date(state.serverLastCheckedAt).toLocaleTimeString()}`;
    return;
  }

  serverDiscoveryStatus.textContent = "Автопроверка каждые 5 сек.";
}

function renderAvailableServers() {
  const availableServers = getAvailableServers();
  availableServersGrid.innerHTML = "";

  for (const server of availableServers) {
    const card = document.createElement("article");
    card.className = "saved-server-card";

    const status = getServerPresence(server.address);
    const head = createServerHead(server, status);
    const actions = document.createElement("div");
    actions.className = "saved-server-actions";

    const useButton = document.createElement("button");
    useButton.textContent = "Выбрать";
    useButton.addEventListener("click", () => {
      fillServerForm(server);
      setPage("servers");
    });

    const saveButton = document.createElement("button");
    saveButton.textContent = "В библиотеку";
    saveButton.addEventListener("click", async () => {
      fillServerForm(server);
      await saveCurrentServer();
      void refreshServerCatalog({ announceError: false });
    });

    const connectButton = document.createElement("button");
    connectButton.className = "accent";
    connectButton.textContent = "Подключиться";
    connectButton.addEventListener("click", async () => {
      try {
        fillServerForm(server);
        setPage("room");
        await connect(server.address, server.name, server.address);
      } catch (error) {
        appendEvent(`Ошибка подключения: ${error.message}`);
        setStatus("Ошибка", "error");
      }
    });

    actions.append(useButton, saveButton, connectButton);
    card.append(head, actions);
    availableServersGrid.append(card);
  }

  if (!availableServers.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = state.serverRefreshInFlight
      ? "Ищем серверы в локальной сети..."
      : "Новых доступных серверов пока нет. Проверка повторяется автоматически каждые 5 секунд.";
    availableServersGrid.append(empty);
  }
}

function renderSavedServers() {
  savedServerIcons.innerHTML = "";
  savedServersGrid.innerHTML = "";

  for (const server of state.savedServers) {
    const isActive = server.id === state.selectedServerId || server.address === state.displayAddress;
    const status = getServerPresence(server.address);

    const iconButton = document.createElement("button");
    iconButton.className = `server-icon ${isActive ? "is-active" : ""}`;
    iconButton.title = `${server.name} · ${server.address} · ${getServerPresenceLabel(status)}`;
    iconButton.textContent = getInitials(server.name);
    iconButton.addEventListener("click", () => {
      fillServerForm(server);
      setPage("servers");
      appendEvent(`Выбран сервер ${server.name}.`);
    });
    savedServerIcons.append(iconButton);

    const card = document.createElement("article");
    card.className = `saved-server-card ${isActive ? "is-active" : ""}`;

    const head = createServerHead(server, status);

    const actions = document.createElement("div");
    actions.className = "saved-server-actions";

    const useButton = document.createElement("button");
    useButton.textContent = "Выбрать";
    useButton.addEventListener("click", () => {
      fillServerForm(server);
      setPage("servers");
    });

    const connectButton = document.createElement("button");
    connectButton.className = "accent";
    connectButton.textContent = "Подключиться";
    connectButton.addEventListener("click", async () => {
      try {
        fillServerForm(server);
        setPage("room");
        await connect(server.address, server.name, server.address);
      } catch (error) {
        appendEvent(`Ошибка подключения: ${error.message}`);
        setStatus("Ошибка", "error");
      }
    });

    const removeButton = document.createElement("button");
    removeButton.className = "danger";
    removeButton.textContent = "Удалить";
    removeButton.addEventListener("click", async () => {
      state.savedServers = state.savedServers.filter((entry) => entry.id !== server.id);
      if (state.selectedServerId === server.id) {
        state.selectedServerId = null;
      }
      await persistSavedServers();
      renderAvailableServers();
      renderServerCatalogState();
      void refreshServerCatalog({ announceError: false });
      appendEvent(`Сервер ${server.name} удалён из списка.`);
    });

    actions.append(useButton, connectButton, removeButton);
    card.append(head, actions);
    savedServersGrid.append(card);
  }

  if (!state.savedServers.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Сохранённые серверы появятся здесь. Добавьте IP:PORT на странице серверов.";
    savedServersGrid.append(empty);
  }

  renderAvailableServers();
  renderServerCatalogState();
  renderRoomSummaries();
}

function applyServerCatalog(catalog) {
  const nextStatuses = {};

  for (const entry of catalog?.statuses || []) {
    const address = sanitizeServerAddress(entry?.address);
    if (!address) {
      continue;
    }

    nextStatuses[address] = normalizeServerPresenceStatus(entry?.status);
  }

  state.serverStatuses = nextStatuses;
  state.discoveredServers = (catalog?.discoveredServers || [])
    .map((server) => sanitizeDiscoveredServer(server))
    .filter(Boolean);
  state.serverLastCheckedAt = Number(catalog?.checkedAt) || Date.now();
  state.serverRefreshError = "";
  renderSavedServers();
}

async function refreshServerCatalog({ announceError = true } = {}) {
  if (state.serverRefreshInFlight) {
    return;
  }

  state.serverRefreshInFlight = true;
  state.serverRefreshError = "";
  renderServerCatalogState();

  try {
    const catalog = await getDesktopApi().refreshServerCatalog(state.savedServers);
    applyServerCatalog(catalog);
  } catch (error) {
    state.serverRefreshError = error.message;
    renderServerCatalogState();

    if (announceError) {
      appendEvent(`Ошибка проверки серверов: ${error.message}`);
    }
  } finally {
    state.serverRefreshInFlight = false;
    renderServerCatalogState();
  }
}

function startServerCatalogRefresh() {
  if (state.serverRefreshTimer) {
    return;
  }

  void refreshServerCatalog({ announceError: false });
  state.serverRefreshTimer = window.setInterval(() => {
    void refreshServerCatalog({ announceError: false });
  }, SERVER_CATALOG_REFRESH_MS);
}

function applyLoadedSettings(settings) {
  state.nickname = sanitizeNickname(settings.nickname);
  state.hotkey = String(settings.globalMuteShortcut || DEFAULT_HOTKEY).trim() || DEFAULT_HOTKEY;
  state.savedServers = (settings.savedServers || [])
    .map((server) => sanitizeSavedServer(server))
    .filter(Boolean);

  if (state.selectedServerId && !state.savedServers.some((server) => server.id === state.selectedServerId)) {
    state.selectedServerId = null;
  }

  renderProfileVisuals();
  renderSavedServers();
  renderRoomSummaries();
}

async function loadSettings() {
  const settings = await getDesktopApi().getSettings();
  applyLoadedSettings(settings);
  setHotkeyStatus(`Глобальный mute: ${formatHotkeyLabel(state.hotkey)}.`);
}

async function loadLocalIps() {
  const response = await getDesktopApi().getIps();
  state.localIpAddresses = response.addresses || [];
  renderLocalIps();
}

async function loadUpdaterState() {
  const updaterState = await getDesktopApi().getUpdaterState();
  applyUpdaterState(updaterState);
}

async function persistNickname(value, silent = false) {
  const clean = sanitizeNickname(value);

  try {
    const settings = await getDesktopApi().updateSettings({ nickname: clean });
    applyLoadedSettings(settings);
    return state.nickname;
  } catch (error) {
    if (!silent) {
      appendEvent(`Не удалось сохранить ник: ${error.message}`);
    }

    return clean;
  }
}

function scheduleNicknameSave(value) {
  const clean = sanitizeNickname(value);
  profileNicknameInput.value = clean;

  if (state.nicknameSaveTimer) {
    window.clearTimeout(state.nicknameSaveTimer);
  }

  state.nicknameSaveTimer = window.setTimeout(() => {
    state.nicknameSaveTimer = null;
    void persistNickname(clean, true);
  }, 250);
}

async function saveGlobalMuteShortcut() {
  const requested = String(globalMuteShortcutInput.dataset.accelerator || "").trim();
  if (!requested) {
    setHotkeyStatus("Укажите сочетание клавиш для глобального mute.", true);
    return;
  }

  saveHotkeyButton.disabled = true;

  try {
    const settings = await getDesktopApi().updateSettings({
      globalMuteShortcut: requested
    });
    applyLoadedSettings(settings);
    setHotkeyStatus(`Глобальный mute сохранён: ${formatHotkeyLabel(state.hotkey)}.`);
    appendEvent(`Глобальный hotkey обновлён: ${formatHotkeyLabel(state.hotkey)}.`);
  } catch (error) {
    setHotkeyStatus("Не удалось зарегистрировать hotkey. Проверьте формат и занятость сочетания.", true);
    appendEvent(`Ошибка hotkey: ${error.message}`);
  } finally {
    saveHotkeyButton.disabled = false;
  }
}

function supportsWasmSimd() {
  return WebAssembly.validate(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3,
    2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11
  ]));
}

function createAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    return null;
  }

  try {
    return new AudioContextConstructor({ sampleRate: 48000 });
  } catch (error) {
    return new AudioContextConstructor();
  }
}

class RnnoiseWorkletNode extends AudioWorkletNode {
  constructor(context, options) {
    super(context, RNNOISE_PROCESSOR_ID, {
      processorOptions: {
        maxChannels: options.maxChannels,
        wasmBinary: options.wasmBinary
      }
    });
  }

  destroy() {
    this.port.postMessage("destroy");
  }
}

async function createRnnoiseSuppressor(context) {
  if (!context.audioWorklet) {
    return null;
  }

  const desktopApi = getDesktopApi();
  const processorSource = await desktopApi.readAssetText(RNNOISE_WORKLET_PATH);
  const processorBlobUrl = URL.createObjectURL(new Blob([processorSource], { type: "text/javascript" }));

  try {
    await context.audioWorklet.addModule(processorBlobUrl);
  } finally {
    URL.revokeObjectURL(processorBlobUrl);
  }

  const simdEnabled = supportsWasmSimd();
  const wasmPath = simdEnabled ? RNNOISE_SIMD_WASM_PATH : RNNOISE_WASM_PATH;
  const wasmBytes = await desktopApi.readAssetBinary(wasmPath);
  const wasmBinary = new Uint8Array(wasmBytes).buffer;

  return {
    node: new RnnoiseWorkletNode(context, {
      maxChannels: 1,
      wasmBinary
    }),
    mode: simdEnabled ? "RNNoise SIMD active" : "RNNoise active"
  };
}

async function ensureLocalAudio() {
  if (audioState.outboundStream) {
    return audioState.outboundStream;
  }

  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  const audioConstraints = {
    channelCount: 1,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: false
  };

  if (supportedConstraints.voiceIsolation) {
    audioConstraints.voiceIsolation = true;
  }

  audioState.rawStream = await navigator.mediaDevices.getUserMedia({
    audio: audioConstraints,
    video: false
  });
  await attachLocalActivityStream(audioState.rawStream);

  const context = createAudioContext();
  if (!context) {
    audioState.outboundStream = audioState.rawStream;
    setNoiseSuppressorMode("Chromium fallback");
    return audioState.outboundStream;
  }

  audioState.context = context;
  if (audioState.context.state === "suspended") {
    await audioState.context.resume();
  }

  audioState.source = audioState.context.createMediaStreamSource(audioState.rawStream);
  audioState.highPass = audioState.context.createBiquadFilter();
  audioState.highPass.type = "highpass";
  audioState.highPass.frequency.value = 110;
  audioState.highPass.Q.value = 0.7;

  audioState.micGain = audioState.context.createGain();
  audioState.destination = audioState.context.createMediaStreamDestination();

  audioState.source.connect(audioState.highPass);
  audioState.highPass.connect(audioState.micGain);
  applyMicrophoneVolume();

  try {
    const suppressor = await createRnnoiseSuppressor(audioState.context);

    if (suppressor) {
      audioState.suppressor = suppressor.node;
      audioState.micGain.connect(audioState.suppressor);
      audioState.suppressor.connect(audioState.destination);
      setNoiseSuppressorMode(suppressor.mode);
    } else {
      audioState.micGain.connect(audioState.destination);
      setNoiseSuppressorMode("Chromium fallback");
    }
  } catch (error) {
    audioState.micGain.connect(audioState.destination);
    setNoiseSuppressorMode("Chromium fallback");
    appendEvent(`RNNoise fallback: ${error.message}`);
  }

  audioState.outboundStream = audioState.destination.stream;
  applyMuteToOutboundTracks();

  return audioState.outboundStream;
}

async function teardownLocalAudio() {
  await teardownActivityStreams();

  if (audioState.rawStream) {
    for (const track of audioState.rawStream.getTracks()) {
      track.stop();
    }
  }

  if (audioState.outboundStream && audioState.outboundStream !== audioState.rawStream) {
    for (const track of audioState.outboundStream.getTracks()) {
      track.stop();
    }
  }

  try {
    audioState.suppressor?.destroy();
  } catch (error) {
    void error;
  }

  for (const node of [
    audioState.source,
    audioState.highPass,
    audioState.micGain,
    audioState.suppressor
  ]) {
    try {
      node?.disconnect();
    } catch (error) {
      void error;
    }
  }

  if (audioState.context) {
    try {
      await audioState.context.close();
    } catch (error) {
      void error;
    }
  }

  audioState.rawStream = null;
  audioState.outboundStream = null;
  audioState.context = null;
  audioState.source = null;
  audioState.highPass = null;
  audioState.micGain = null;
  audioState.suppressor = null;
  audioState.destination = null;
  setNoiseSuppressorMode("RNNoise pending");
}

function cleanupRemoteAudio(peerId) {
  destroyActivityEntry(activityState.remotes.get(peerId));
  activityState.remotes.delete(peerId);
  state.speakingUsers.delete(peerId);

  const audio = remoteAudios.get(peerId);
  if (!audio) {
    return;
  }

  audio.srcObject = null;
  audio.remove();
  remoteAudios.delete(peerId);
}

function closePeer(peerId) {
  const peer = peerConnections.get(peerId);
  if (peer) {
    peer.ontrack = null;
    peer.onicecandidate = null;
    peer.close();
    peerConnections.delete(peerId);
  }

  pendingIceCandidates.delete(peerId);
  cleanupRemoteAudio(peerId);
}

function sendSignal(targetId, signal) {
  if (!state.socket || state.socket.readyState !== WebSocket.OPEN) {
    return;
  }

  state.socket.send(JSON.stringify({
    type: "signal",
    targetId,
    signal
  }));
}

function sendPresenceUpdate() {
  if (!state.socket || state.socket.readyState !== WebSocket.OPEN) {
    return;
  }

  state.socket.send(JSON.stringify({
    type: "presence",
    muted: state.isMuted
  }));
}

function ensureRemoteAudio(peerId, username) {
  let audio = remoteAudios.get(peerId);
  if (audio) {
    return audio;
  }

  audio = document.createElement("audio");
  audio.autoplay = true;
  audio.playsInline = true;
  audio.dataset.peerId = peerId;
  audio.title = username;
  audioContainer.append(audio);
  remoteAudios.set(peerId, audio);
  applyRemoteAudioVolume(peerId);
  return audio;
}

async function flushPendingIceCandidates(peerId, peer) {
  const queue = pendingIceCandidates.get(peerId);
  if (!queue || !queue.length) {
    return;
  }

  for (const candidate of queue) {
    try {
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      appendEvent(`ICE candidate error for ${peerId}: ${error.message}`);
    }
  }

  pendingIceCandidates.delete(peerId);
}

async function createPeerConnection(peerId, username, initiator) {
  if (peerConnections.has(peerId)) {
    return peerConnections.get(peerId);
  }

  const stream = await ensureLocalAudio();
  const peer = new RTCPeerConnection(rtcConfig);

  for (const track of stream.getTracks()) {
    peer.addTrack(track, stream);
  }

  peer.onicecandidate = (event) => {
    if (!event.candidate) {
      return;
    }

    sendSignal(peerId, {
      type: "candidate",
      candidate: event.candidate
    });
  };

  peer.ontrack = (event) => {
    const audio = ensureRemoteAudio(peerId, username);
    audio.srcObject = event.streams[0];
    applyRemoteAudioVolume(peerId);
    void attachRemoteActivityStream(peerId, event.streams[0]);

    audio.play().catch(() => {
      appendEvent(`Не удалось автоматически включить звук ${username}.`);
    });
  };

  peer.onconnectionstatechange = () => {
    if (["failed", "closed", "disconnected"].includes(peer.connectionState)) {
      closePeer(peerId);
      renderParticipants();
    }
  };

  peerConnections.set(peerId, peer);
  renderParticipants();

  if (initiator) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    sendSignal(peerId, {
      type: "offer",
      sdp: offer
    });
  }

  return peer;
}

async function handleSignal(fromId, fromUsername, signal) {
  if (!signal || !signal.type) {
    return;
  }

  const peer = await createPeerConnection(fromId, fromUsername || "User", false);

  if (signal.type === "offer") {
    await peer.setRemoteDescription(new RTCSessionDescription(signal.sdp));
    await flushPendingIceCandidates(fromId, peer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    sendSignal(fromId, {
      type: "answer",
      sdp: answer
    });
    return;
  }

  if (signal.type === "answer") {
    await peer.setRemoteDescription(new RTCSessionDescription(signal.sdp));
    await flushPendingIceCandidates(fromId, peer);
    return;
  }

  if (signal.type === "candidate" && signal.candidate) {
    if (peer.remoteDescription && peer.remoteDescription.type) {
      try {
        await peer.addIceCandidate(new RTCIceCandidate(signal.candidate));
      } catch (error) {
        appendEvent(`ICE candidate error for ${fromUsername || fromId}: ${error.message}`);
      }
      return;
    }

    const queue = pendingIceCandidates.get(fromId) || [];
    queue.push(signal.candidate);
    pendingIceCandidates.set(fromId, queue);
  }
}

function pushOverlayState() {
  getDesktopApi().updateOverlay({
    visible: Boolean(state.connectedAddress && state.users.length),
    roomName: state.roomLabel,
    address: state.displayAddress,
    muted: state.isMuted,
    participants: state.users.map((user) => ({
      id: user.id,
      name: user.username,
      initials: getInitials(user.username),
      self: user.id === state.selfId,
      muted: user.id === state.selfId ? state.isMuted : Boolean(user.muted),
      speaking: state.speakingUsers.has(user.id)
    }))
  });
}

function applyUsers(nextUsers) {
  state.users = nextUsers || [];
  renderParticipants();
  renderRoomSummaries();
}

function setMuteState(nextMuted, source = "") {
  const targetMuted = Boolean(nextMuted);
  const changed = state.isMuted !== targetMuted;

  state.isMuted = targetMuted;
  if (state.isMuted && state.selfId) {
    state.speakingUsers.delete(state.selfId);
  }
  applyMuteToOutboundTracks();
  updateMuteButton();
  renderParticipants();
  renderRoomSummaries();
  pushOverlayState();
  sendPresenceUpdate();

  if (changed) {
    const prefix = source ? `${source}: ` : "";
    appendEvent(`${prefix}${state.isMuted ? "микрофон выключен." : "микрофон включён."}`);
  }
}

function toggleMute(source = "") {
  setMuteState(!state.isMuted, source);
}

async function disconnect(stopServer = false) {
  if (state.socket) {
    state.socket.onopen = null;
    state.socket.onmessage = null;
    state.socket.onclose = null;
    state.socket.onerror = null;
    state.socket.close();
    state.socket = null;
  }

  for (const peerId of [...peerConnections.keys()]) {
    closePeer(peerId);
  }

  participantVolumes.clear();
  state.selfId = null;
  state.users = [];
  state.connectedAddress = "";
  state.displayAddress = "";
  state.roomLabel = getPreferredRoomLabel();
  renderParticipants();
  await teardownLocalAudio();

  if (stopServer) {
    try {
      await getDesktopApi().stopServer();
    } catch (error) {
      appendEvent(`Не удалось остановить сервер: ${error.message}`);
    }
  }

  setStatus("Не подключено", "offline");
  muteButton.disabled = true;
  disconnectButton.disabled = true;
  updateMuteButton();
  renderRoomSummaries();
  pushOverlayState();
}

async function connect(address, roomName = "", displayAddress = sanitizeServerAddress(address)) {
  const normalizedAddress = normalizeAddress(address);
  const cleanDisplayAddress = sanitizeServerAddress(displayAddress || stripTransport(normalizedAddress));

  if (!normalizedAddress) {
    throw new Error("Укажите IP:PORT сервера.");
  }

  await persistNickname(profileNicknameInput.value, true);
  await disconnect(false);
  await ensureLocalAudio();

  state.roomLabel = sanitizeServerLabel(roomName, cleanDisplayAddress || DEFAULT_ROOM_NAME);
  state.displayAddress = cleanDisplayAddress || stripTransport(normalizedAddress);
  state.connectedAddress = normalizedAddress;
  state.selectedServerId = state.savedServers.find((server) => server.address === state.displayAddress)?.id || null;
  renderSavedServers();
  renderRoomSummaries();
  setPage("room");

  state.socket = new WebSocket(normalizedAddress);

  state.socket.onopen = () => {
    state.socket.send(JSON.stringify({
      type: "join",
      username: state.nickname,
      muted: state.isMuted
    }));

    setStatus("Подключено", "online");
    muteButton.disabled = false;
    disconnectButton.disabled = false;
    appendEvent(`Соединение открыто: ${state.displayAddress}`);
  };

  state.socket.onmessage = async (event) => {
    const payload = JSON.parse(event.data);

    if (payload.type === "welcome") {
      state.selfId = payload.selfId;
      applyUsers(payload.users);
      appendEvent(`Вы вошли как ${state.nickname}.`);

      for (const peer of payload.peers || []) {
        await createPeerConnection(peer.id, peer.username, true);
      }

      return;
    }

    if (payload.type === "peer-joined") {
      applyUsers(payload.users);
      appendEvent(`${payload.peer.username} подключился.`);
      return;
    }

    if (payload.type === "peer-left") {
      closePeer(payload.peerId);
      applyUsers(payload.users);
      appendEvent(`${payload.peerUsername || "Участник"} отключился.`);
      return;
    }

    if (payload.type === "peer-presence") {
      applyUsers(payload.users);
      return;
    }

    if (payload.type === "signal") {
      await handleSignal(payload.fromId, payload.fromUsername, payload.signal);
      return;
    }

    if (payload.type === "error") {
      appendEvent(payload.message);
    }
  };

  state.socket.onerror = () => {
    appendEvent("Ошибка соединения с сигнальным сервером.");
  };

  state.socket.onclose = () => {
    appendEvent("Соединение закрыто.");
    disconnect(false);
  };
}

async function hostAndJoin() {
  const port = Number(hostPortInput.value);
  const response = await getDesktopApi().startServer(
    port,
    sanitizeServerLabel(serverLabelInput.value, "Локальный сервер")
  );
  const addresses = response.addresses || [];
  const shareAddress = addresses[0] ? `${addresses[0]}:${response.port}` : `127.0.0.1:${response.port}`;
  const shareLines = addresses.length
    ? addresses.map((ip) => `ws://${ip}:${response.port}`).join(" · ")
    : `ws://127.0.0.1:${response.port}`;

  hostInfo.textContent = `Адреса для подключения: ${shareLines}`;
  hostPanelInfo.textContent = `Локальный сервер поднят. Раздавайте адрес: ${shareLines}`;
  serverAddressInput.value = shareAddress;

  appendEvent(`Сервер запущен на порту ${response.port}.`);
  await connect(`127.0.0.1:${response.port}`, sanitizeServerLabel(serverLabelInput.value, "Локальный сервер"), shareAddress);
}

async function saveCurrentServer() {
  const preferredAddress = sanitizeServerAddress(state.displayAddress || serverAddressInput.value);
  if (!preferredAddress) {
    setPage("servers");
    serverAddressInput.focus();
    appendEvent("Сначала укажите адрес сервера.");
    return;
  }

  const fallbackName = sanitizeServerLabel(state.roomLabel, preferredAddress);
  const draft = sanitizeSavedServer({
    id: state.selectedServerId || globalThis.crypto?.randomUUID?.(),
    name: sanitizeServerLabel(serverLabelInput.value, fallbackName),
    address: preferredAddress
  });

  if (!draft) {
    appendEvent("Не удалось сохранить сервер: адрес пустой.");
    return;
  }

  const existingIndex = state.savedServers.findIndex((server) => server.id === draft.id || server.address === draft.address);

  if (existingIndex >= 0) {
    state.savedServers[existingIndex] = draft;
  } else {
    state.savedServers.unshift(draft);
  }

  state.selectedServerId = draft.id;
  serverLabelInput.value = draft.name;
  serverAddressInput.value = draft.address;

  await persistSavedServers();
  appendEvent(`Сервер сохранён: ${draft.name}.`);
}

function renderParticipants() {
  renderParticipantTiles();
  participantsList.innerHTML = "";

  if (!state.users.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "В комнате пока никого нет. После подключения здесь появятся участники и индивидуальная громкость.";
    participantsList.append(empty);
    pushOverlayState();
    return;
  }

  for (const user of state.users) {
    const item = document.createElement("li");
    item.className = "participant-item";

    const main = document.createElement("div");
    main.className = "participant-main";

    const avatar = document.createElement("div");
    avatar.className = "participant-avatar";
    avatar.textContent = getInitials(user.username);

    const copy = document.createElement("div");
    copy.className = "participant-copy";

    const name = document.createElement("strong");
    name.textContent = user.id === state.selfId ? `${user.username} (вы)` : user.username;

    const meta = document.createElement("div");
    meta.className = "participant-meta";

    const role = document.createElement("span");
    role.textContent = user.id === state.selfId ? "локально" : "peer";

    const status = document.createElement("span");
    if (user.id === state.selfId) {
      status.textContent = state.isMuted ? "микрофон выключен" : "микрофон активен";
    } else {
      status.textContent = user.muted
        ? "микрофон выключен"
        : peerConnections.has(user.id) ? "online" : "signaling";
    }

    meta.append(role, status);
    copy.append(name, meta);
    main.append(avatar, copy);
    item.append(main);

    if (user.id !== state.selfId) {
      const volumeWrap = document.createElement("div");
      volumeWrap.className = "participant-volume";

      const sliderLabel = document.createElement("label");
      sliderLabel.textContent = "Громкость пользователя";

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "100";
      slider.value = String(Math.round(getParticipantVolume(user.id) * 100));

      const value = document.createElement("span");
      value.className = "participant-volume-value";
      value.textContent = `${slider.value}%`;

      slider.addEventListener("input", () => {
        const nextVolume = Number(slider.value) / 100;
        participantVolumes.set(user.id, nextVolume);
        value.textContent = `${slider.value}%`;
        applyRemoteAudioVolume(user.id);
      });

      sliderLabel.append(slider);
      volumeWrap.append(sliderLabel, value);
      item.append(volumeWrap);
    }

    participantsList.append(item);
  }

  pushOverlayState();
}

pageSwitchers.forEach((button) => {
  button.addEventListener("click", () => {
    setPage(button.dataset.pageSwitch);
  });
});

quickAddServerButton.addEventListener("click", () => {
  setPage("servers");
  serverAddressInput.focus();
});

heroSaveServerButton.addEventListener("click", async () => {
  await saveCurrentServer();
});

joinButton.addEventListener("click", async () => {
  joinButton.disabled = true;
  try {
    await connect(serverAddressInput.value, serverLabelInput.value, serverAddressInput.value);
  } catch (error) {
    appendEvent(`Ошибка подключения: ${error.message}`);
    setStatus("Ошибка", "error");
  } finally {
    joinButton.disabled = false;
  }
});

saveServerButton.addEventListener("click", async () => {
  await saveCurrentServer();
});

refreshServersButton.addEventListener("click", async () => {
  await refreshServerCatalog();
});

hostButton.addEventListener("click", async () => {
  hostButton.disabled = true;
  try {
    await hostAndJoin();
  } catch (error) {
    appendEvent(`Ошибка запуска сервера: ${error.message}`);
    setStatus("Ошибка", "error");
  } finally {
    hostButton.disabled = false;
  }
});

serverLabelInput.addEventListener("input", () => {
  if (!state.connectedAddress) {
    state.roomLabel = getPreferredRoomLabel();
    renderRoomSummaries();
  }
});

serverAddressInput.addEventListener("input", () => {
  if (!state.connectedAddress) {
    renderRoomSummaries();
  }
});

profileNicknameInput.addEventListener("input", (event) => {
  const clean = sanitizeNickname(event.target.value);
  profileNicknameInput.value = clean;
  state.nickname = clean;
  renderProfileVisuals();
  updatePageHeader();
  scheduleNicknameSave(clean);
});

profileNicknameInput.addEventListener("blur", () => {
  void persistNickname(profileNicknameInput.value, true);
});

globalMuteShortcutInput.addEventListener("focus", () => {
  setHotkeyStatus("Нажмите нужное сочетание клавиш, затем сохраните.", false);
});

globalMuteShortcutInput.addEventListener("click", () => {
  globalMuteShortcutInput.focus();
});

globalMuteShortcutInput.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    return;
  }

  event.preventDefault();

  if (event.key === "Escape" && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
    setHotkeyInputValue(state.hotkey);
    setHotkeyStatus(`Глобальный mute: ${formatHotkeyLabel(state.hotkey)}.`);
    return;
  }

  if ((event.key === "Backspace" || event.key === "Delete") && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
    setHotkeyInputValue("");
    setHotkeyStatus("Сочетание очищено. Нажмите новую комбинацию или Esc для отмены.", false);
    return;
  }

  const accelerator = buildHotkeyFromKeyboardEvent(event);
  if (!accelerator) {
    return;
  }

  setHotkeyInputValue(accelerator);
  setHotkeyStatus(`Новое сочетание: ${formatHotkeyLabel(accelerator)}. Нажмите "Сохранить".`, false);
});

globalMuteShortcutInput.addEventListener("blur", () => {
  if (!globalMuteShortcutInput.dataset.accelerator) {
    setHotkeyInputValue(state.hotkey);
  }
});

saveHotkeyButton.addEventListener("click", async () => {
  await saveGlobalMuteShortcut();
});

checkUpdatesButton.addEventListener("click", async () => {
  await runUpdateAction("check");
});

updateActionButton.addEventListener("click", async () => {
  await runUpdateAction(updateActionButton.dataset.action);
});

updateRailButton.addEventListener("click", async () => {
  const primaryAction = getUpdaterPrimaryAction(state.updater);
  await runUpdateAction(primaryAction?.action || "check");
});

outputVolumeInput.addEventListener("input", () => {
  state.speakerVolume = Number(outputVolumeInput.value) / 100;
  updateVolumeLabels();
  applySpeakerVolume();
});

inputVolumeInput.addEventListener("input", () => {
  state.microphoneVolume = Number(inputVolumeInput.value) / 100;
  updateVolumeLabels();
  applyMicrophoneVolume();
});

participantContextVolume.addEventListener("input", () => {
  if (!activeContextMenuUserId) {
    return;
  }

  const nextVolume = Number(participantContextVolume.value) / 100;
  participantVolumes.set(activeContextMenuUserId, nextVolume);
  participantContextVolumeValue.textContent = `${participantContextVolume.value}%`;
  applyRemoteAudioVolume(activeContextMenuUserId);
});

muteButton.addEventListener("click", () => {
  toggleMute();
});

disconnectButton.addEventListener("click", async () => {
  await disconnect(false);
});

document.addEventListener("pointerdown", (event) => {
  if (participantContextMenu.hidden) {
    return;
  }

  const target = event.target instanceof Element ? event.target : null;
  if (!target) {
    hideParticipantContextMenu();
    return;
  }

  if (participantContextMenu.contains(target) || target.closest(".room-tile")) {
    return;
  }

  hideParticipantContextMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideParticipantContextMenu();
  }
});

window.addEventListener("resize", () => {
  hideParticipantContextMenu();
});

getDesktopApi().onMuteToggleRequested(() => {
  toggleMute("Глобальный hotkey");
});

getDesktopApi().onUpdaterState((updaterState) => {
  applyUpdaterState(updaterState);
});

window.addEventListener("beforeunload", () => {
  if (state.nicknameSaveTimer) {
    window.clearTimeout(state.nicknameSaveTimer);
    state.nicknameSaveTimer = null;
    void persistNickname(profileNicknameInput.value, true);
  }

  if (state.serverRefreshTimer) {
    window.clearInterval(state.serverRefreshTimer);
    state.serverRefreshTimer = null;
  }

  disconnect(false);
});

setNoiseSuppressorMode("RNNoise pending");
updateMuteButton();
renderDisconnectButton();
updateVolumeLabels();
setPage("room");
renderParticipants();
renderRoomSummaries();
renderProfileVisuals();
renderUpdaterUi();

Promise.all([
  loadSettings(),
  loadLocalIps(),
  loadUpdaterState()
]).then(() => {
  startServerCatalogRefresh();
}).catch((error) => {
  setHotkeyStatus("Не удалось загрузить настройки приложения.", true);
  appendEvent(`Ошибка загрузки настроек: ${error.message}`);
});

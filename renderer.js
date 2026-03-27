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
const radioButton = document.getElementById("radioButton");
const radioButtonLabel = document.getElementById("radioButtonLabel");
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
const networkBufferModeInput = document.getElementById("networkBufferMode");
const networkBufferHint = document.getElementById("networkBufferHint");
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
const inputDeviceSelect = document.getElementById("inputDeviceSelect");
const outputDeviceSelect = document.getElementById("outputDeviceSelect");
const overlayEnabledInput = document.getElementById("overlayEnabled");
const overlayPositionSelect = document.getElementById("overlayPositionSelect");
const overlayLayoutSelect = document.getElementById("overlayLayoutSelect");
const overlayAvatarSizeInput = document.getElementById("overlayAvatarSize");
const overlayAvatarSizeValue = document.getElementById("overlayAvatarSizeValue");
const selfTestButton = document.getElementById("selfTestButton");
const localMicMeter = document.getElementById("localMicMeter");
const localMicMeterLabel = document.getElementById("localMicMeterLabel");
const selfTestStatus = document.getElementById("selfTestStatus");
const audioContainer = document.getElementById("audioContainer");
const radioModal = document.getElementById("radioModal");
const radioModalBackdrop = document.getElementById("radioModalBackdrop");
const radioModalCloseButton = document.getElementById("radioModalCloseButton");
const radioModalStatus = document.getElementById("radioModalStatus");
const radioRefreshButton = document.getElementById("radioRefreshButton");
const radioStopButton = document.getElementById("radioStopButton");
const radioStationsList = document.getElementById("radioStationsList");

const pageSwitchers = [...document.querySelectorAll("[data-page-switch]")];
const pages = [...document.querySelectorAll(".page")];
const navButtons = [...document.querySelectorAll(".nav-link, .rail-button")];

const RNNOISE_PROCESSOR_ID = "@sapphi-red/web-noise-suppressor/rnnoise";
const RNNOISE_WORKLET_PATH = "node_modules/@sapphi-red/web-noise-suppressor/dist/rnnoise/workletProcessor.js";
const RNNOISE_WASM_PATH = "node_modules/@sapphi-red/web-noise-suppressor/dist/rnnoise.wasm";
const RNNOISE_SIMD_WASM_PATH = "node_modules/@sapphi-red/web-noise-suppressor/dist/rnnoise_simd.wasm";
const DEFAULT_ROOM_NAME = "Локальная комната";
const DEFAULT_HOTKEY = "CommandOrControl+Shift+M";
const DEFAULT_NETWORK_BUFFER_MODE = "medium";
const DEFAULT_AUDIO_INPUT_DEVICE_ID = "default";
const DEFAULT_AUDIO_OUTPUT_DEVICE_ID = "default";
const DEFAULT_OVERLAY_ENABLED = false;
const DEFAULT_OVERLAY_POSITION = "left-top";
const DEFAULT_OVERLAY_LAYOUT = "column";
const DEFAULT_OVERLAY_AVATAR_SIZE = 56;
const RADIO_CATALOG_URL = "http://192.168.195.85:3440/";
const RADIO_BOT_NODE_PREFIX = "radio_";
const RADIO_STATION_CACHE_MS = 15000;
const SERVER_CATALOG_REFRESH_MS = 5000;
const AUTO_RECONNECT_MAX_ATTEMPTS = 2;
const AUTO_RECONNECT_RETRY_DELAY_MS = 10000;
const LOCAL_MIC_METER_BARS = 24;
const LOCAL_MIC_LEVEL_MAX_RMS = 0.08;
const LOCAL_SPEAKING_THRESHOLD = 0.09;
const REMOTE_SPEAKING_THRESHOLD = 0.08;
const SPEAKING_HOLD_MS = 260;
const NETWORK_BUFFER_TARGETS_MS = {
  none: 0,
  medium: 120,
  max: 250
};
const QUALITY_STATS_REFRESH_MS = 4000;
const QUALITY_METRIC_TTL_MS = 12000;
const QUALITY_LOSS_WEIGHT = 25;
const QUALITY_MISSING_LINK_PENALTY = 5000;
const ICONS = {
  micOn: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V21h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-3.08A7 7 0 0 1 5 11a1 1 0 1 1 2 0 5 5 0 0 0 10 0Z"/>
    </svg>
  `,
  micOff: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5A3.5 3.5 0 0 0 8.5 6v1.14l7 7V6A3.5 3.5 0 0 0 12 2.5Zm7.2 8.5a1 1 0 1 0-2 0 5.13 5.13 0 0 1-.6 2.38l1.47 1.47c.73-1.08 1.13-2.41 1.13-3.85ZM12 18.5a5.5 5.5 0 0 1-5.5-5.5 1 1 0 1 0-2 0 7.5 7.5 0 0 0 6.5 7.43V22h2v-1.57a7.48 7.48 0 0 0 3.66-1.38l-1.45-1.45a5.44 5.44 0 0 1-3.21.9Zm8.2 2.8-16-16a1 1 0 1 0-1.4 1.4l16 16a1 1 0 0 0 1.4-1.4Z"/>
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
  radio: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 7.25A4.25 4.25 0 0 1 10.75 3h2.5a1 1 0 1 1 0 2h-2.5A2.25 2.25 0 0 0 8.5 7.25V8h7V7a1 1 0 1 1 2 0v1h.5A2.5 2.5 0 0 1 20.5 10.5v7A2.5 2.5 0 0 1 18 20H6A2.5 2.5 0 0 1 3.5 17.5v-7A2.5 2.5 0 0 1 6 8h.5v-.75ZM6 10a.5.5 0 0 0-.5.5v7A.5.5 0 0 0 6 18h12a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 18 10H6Zm3 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/>
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
const peerControlChannels = new Map();
const membershipDirectory = new Map();
const participantVolumes = new Map();

const meshState = {
  heartbeatTimer: null,
  electionTimer: null,
  reconnectInFlight: false,
  takeoverInFlight: false,
  socketEpoch: 0,
  processedTakeovers: new Set(),
  qualityRefreshInFlight: false,
  lastQualitySampleAt: 0
};

const reconnectState = {
  timer: null,
  attemptsRemaining: 0,
  attemptInFlight: false,
  waitingForOnline: false,
  targetAddress: "",
  displayAddress: "",
  roomName: "",
  armed: false
};

const DATA_CHANNEL_LABEL = "ds-mesh-control";
const PEER_HEARTBEAT_INTERVAL_MS = 2000;
const PEER_HEARTBEAT_TIMEOUT_MS = 6500;
const LEADER_ELECTION_DELAY_MS = 900;
const CONTROL_CONNECT_TIMEOUT_MS = 2200;

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
  destination: null,
  selfTestAudio: null
};

const activityState = {
  context: null,
  local: null,
  remotes: new Map(),
  intervalId: null
};

const radioState = {
  modalOpen: false,
  loading: false,
  loadPromise: null,
  proxyOrigin: "",
  catalogName: "radio_api",
  stations: [],
  lastLoadedAt: 0,
  lastError: "",
  activeStation: null,
  bot: null,
  starting: false,
  switchingFrequency: "",
  startToken: 0
};

let activeContextMenuUserId = "";

const state = {
  page: "room",
  installationId: "",
  nodeId: "",
  nickname: "Guest",
  hotkey: DEFAULT_HOTKEY,
  networkBufferMode: DEFAULT_NETWORK_BUFFER_MODE,
  audioInputDeviceId: DEFAULT_AUDIO_INPUT_DEVICE_ID,
  audioOutputDeviceId: DEFAULT_AUDIO_OUTPUT_DEVICE_ID,
  overlayEnabled: DEFAULT_OVERLAY_ENABLED,
  overlayPosition: DEFAULT_OVERLAY_POSITION,
  overlayLayout: DEFAULT_OVERLAY_LAYOUT,
  overlayAvatarSize: DEFAULT_OVERLAY_AVATAR_SIZE,
  availableAudioInputs: [],
  availableAudioOutputs: [],
  savedServers: [],
  discoveredServers: [],
  serverStatuses: {},
  serverRefreshInFlight: false,
  serverLastCheckedAt: 0,
  serverRefreshError: "",
  serverRefreshTimer: null,
  selectedServerId: null,
  leaderId: "",
  selfId: null,
  users: [],
  socket: null,
  controlConnected: false,
  controlRecovering: false,
  connectedAddress: "",
  displayAddress: "",
  roomLabel: DEFAULT_ROOM_NAME,
  isMuted: false,
  speakerVolume: 1,
  microphoneVolume: 1,
  localMicRawLevel: 0,
  localMicLevel: 0,
  selfTestActive: false,
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

function sanitizeNodeId(value, fallback = "") {
  const rawId = String(value || fallback || globalThis.crypto?.randomUUID?.() || `${Date.now()}`);
  return rawId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || `node_${Date.now()}`;
}

function sanitizeHttpUrl(value) {
  try {
    const parsed = new URL(String(value || "").trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }

    return parsed.toString();
  } catch (error) {
    return "";
  }
}

function sanitizeRadioFrequency(value) {
  return String(value || "").trim().replace(/[^0-9.]/g, "").slice(0, 12);
}

function sanitizeRadioTrackTitle(value) {
  return String(value || "").trim().slice(0, 160);
}

function sanitizeRadioStation(station, baseUrl = RADIO_CATALOG_URL) {
  const frequency = sanitizeRadioFrequency(station?.frequency);
  if (!frequency) {
    return null;
  }

  const catalogBaseUrl = sanitizeHttpUrl(baseUrl) || RADIO_CATALOG_URL;
  let streamUrl = sanitizeHttpUrl(station?.streamUrl);
  if (!streamUrl) {
    try {
      streamUrl = new URL(`/radio/${encodeURIComponent(frequency)}`, catalogBaseUrl).toString();
    } catch (error) {
      streamUrl = "";
    }
  }

  if (!streamUrl) {
    return null;
  }

  const nowPlaying = station?.nowPlaying && typeof station.nowPlaying === "object"
    ? {
      filename: sanitizeRadioTrackTitle(station.nowPlaying.filename),
      elapsedSeconds: Math.max(0, Number(station.nowPlaying.elapsedSeconds || 0) || 0),
      remainingSeconds: Math.max(0, Number(station.nowPlaying.remainingSeconds || 0) || 0)
    }
    : null;

  return {
    frequency,
    trackCount: Math.max(0, Number(station?.trackCount || 0) || 0),
    loopDurationSeconds: Math.max(0, Number(station?.loopDurationSeconds || 0) || 0),
    streamUrl,
    nowPlaying
  };
}

function createRuntimeNodeId(installationId = "") {
  const seed = sanitizeNodeId(installationId, "device");
  const runtimeSuffix = sanitizeNodeId(globalThis.crypto?.randomUUID?.() || `${Date.now()}`).slice(0, 12);
  return sanitizeNodeId(`${seed}_${runtimeSuffix}`);
}

function sanitizeNetworkBufferMode(value, fallback = DEFAULT_NETWORK_BUFFER_MODE) {
  const clean = String(value || fallback || DEFAULT_NETWORK_BUFFER_MODE).trim().toLowerCase();
  if (Object.prototype.hasOwnProperty.call(NETWORK_BUFFER_TARGETS_MS, clean)) {
    return clean;
  }

  return DEFAULT_NETWORK_BUFFER_MODE;
}

function sanitizeMediaDeviceId(value, fallback = DEFAULT_AUDIO_INPUT_DEVICE_ID) {
  const clean = String(value || fallback || "").trim().slice(0, 512);
  return clean || fallback || DEFAULT_AUDIO_INPUT_DEVICE_ID;
}

function sanitizeToggle(value, fallback = DEFAULT_OVERLAY_ENABLED) {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true" || value === "1" || value === 1) {
    return true;
  }

  if (value === "false" || value === "0" || value === 0) {
    return false;
  }

  return Boolean(fallback);
}

function sanitizeVolume(value, fallback = 1, { min = 0, max = 1 } = {}) {
  const numeric = Number(value);
  const normalizedFallback = Number.isFinite(Number(fallback)) ? Number(fallback) : 1;
  if (!Number.isFinite(numeric)) {
    return Math.min(max, Math.max(min, normalizedFallback));
  }

  return Math.min(max, Math.max(min, numeric));
}

function sanitizeOverlayPosition(value, fallback = DEFAULT_OVERLAY_POSITION) {
  const clean = String(value || fallback || DEFAULT_OVERLAY_POSITION).trim().toLowerCase();
  if (["left-top", "left-center", "right-top", "right-center"].includes(clean)) {
    return clean;
  }

  return DEFAULT_OVERLAY_POSITION;
}

function sanitizeOverlayLayout(value, fallback = DEFAULT_OVERLAY_LAYOUT) {
  const clean = String(value || fallback || DEFAULT_OVERLAY_LAYOUT).trim().toLowerCase();
  if (clean === "row" || clean === "column") {
    return clean;
  }

  return DEFAULT_OVERLAY_LAYOUT;
}

function sanitizeOverlayAvatarSize(value, fallback = DEFAULT_OVERLAY_AVATAR_SIZE) {
  const numeric = Math.round(Number(value));
  const normalizedFallback = Math.round(Number(fallback || DEFAULT_OVERLAY_AVATAR_SIZE));
  if (!Number.isFinite(numeric)) {
    return Math.min(96, Math.max(36, normalizedFallback));
  }

  return Math.min(96, Math.max(36, numeric));
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

function sanitizeObservedLinks(value) {
  const sourceEntries = Array.isArray(value)
    ? value
    : Object.entries(value && typeof value === "object" ? value : {})
      .map(([targetId, metric]) => ({
        targetId,
        ...(metric && typeof metric === "object" ? metric : {})
      }));
  const links = {};

  for (const entry of sourceEntries.slice(0, 32)) {
    const targetId = sanitizeNodeId(entry?.targetId);
    if (!targetId) {
      continue;
    }

    const rawRttMs = Number(entry?.rttMs);
    const rawLossPct = Number(entry?.lossPct);
    const rawSampledAt = Number(entry?.sampledAt);

    links[targetId] = {
      rttMs: Number.isFinite(rawRttMs) && rawRttMs >= 0 ? Math.min(rawRttMs, 5000) : null,
      lossPct: Number.isFinite(rawLossPct) && rawLossPct >= 0 ? Math.min(rawLossPct, 100) : null,
      sampledAt: Number.isFinite(rawSampledAt) && rawSampledAt > 0 ? rawSampledAt : 0
    };
  }

  return links;
}

function sanitizeRoomUser(user, fallbackId = "") {
  const id = sanitizeNodeId(user?.id, fallbackId);
  const hasObservedLinks = Boolean(
    user &&
    typeof user === "object" &&
    (Object.prototype.hasOwnProperty.call(user, "observedLinks") || Object.prototype.hasOwnProperty.call(user, "links"))
  );

  return {
    id,
    username: sanitizeNickname(user?.username || user?.name || "User"),
    muted: Boolean(user?.muted),
    leader: Boolean(user?.leader),
    observedLinks: hasObservedLinks ? sanitizeObservedLinks(user?.observedLinks || user?.links) : undefined
  };
}

function isRadioBotId(value) {
  return sanitizeNodeId(value).startsWith(RADIO_BOT_NODE_PREFIX);
}

function isRadioBotUser(user) {
  return isRadioBotId(user?.id);
}

function buildRadioBotNodeId() {
  const suffix = sanitizeNodeId(globalThis.crypto?.randomUUID?.() || `${Date.now()}`).slice(0, 16);
  return sanitizeNodeId(`${RADIO_BOT_NODE_PREFIX}${state.nodeId || "guest"}_${suffix}`);
}

function buildRadioBotName(station) {
  return sanitizeNickname(`Радио ${station?.frequency || "FM"}`);
}

function getRadioStationLabel(station) {
  return station?.frequency ? `${station.frequency} FM` : "Радио";
}

function formatRadioTrackName(filename) {
  return sanitizeRadioTrackTitle(filename)
    .replace(/\.[a-z0-9]{2,6}$/i, "")
    .replace(/^\d+\.\s*/, "")
    .trim() || "Без названия";
}

function formatRadioDuration(seconds) {
  const totalSeconds = Math.max(0, Math.round(Number(seconds || 0) || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function parseAddressParts(value) {
  const clean = sanitizeServerAddress(value);
  if (!clean) {
    return null;
  }

  try {
    const parsed = new URL(`http://${clean}`);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 80)
    };
  } catch (error) {
    return null;
  }
}

function getRoomPortCandidate() {
  const parsed = parseAddressParts(state.displayAddress || state.connectedAddress || serverAddressInput.value);
  if (parsed?.port && Number.isInteger(parsed.port)) {
    return parsed.port;
  }

  const fallbackPort = Number(hostPortInput.value);
  return Number.isInteger(fallbackPort) && fallbackPort >= 1024 && fallbackPort <= 65535 ? fallbackPort : 3030;
}

function buildAddressCandidates(addresses, port, includeLoopback = false) {
  const results = [];

  if (includeLoopback) {
    results.push(`127.0.0.1:${port}`);
  }

  for (const address of addresses || []) {
    results.push(`${address}:${port}`);
  }

  return [...new Set(results.map((address) => sanitizeServerAddress(address)).filter(Boolean))];
}

function sortUsers(users) {
  return [...users].sort((left, right) => {
    if (left.id === state.nodeId) {
      return -1;
    }

    if (right.id === state.nodeId) {
      return 1;
    }

    if (left.leader && !right.leader) {
      return -1;
    }

    if (right.leader && !left.leader) {
      return 1;
    }

    const leftIsRadio = isRadioBotUser(left);
    const rightIsRadio = isRadioBotUser(right);
    if (leftIsRadio !== rightIsRadio) {
      return leftIsRadio ? 1 : -1;
    }

    return left.username.localeCompare(right.username, "ru");
  });
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

async function ensureRadioProxyOrigin() {
  if (radioState.proxyOrigin) {
    return radioState.proxyOrigin;
  }

  const payload = await getDesktopApi().getRadioProxyOrigin();
  const origin = sanitizeHttpUrl(payload?.origin);
  if (!origin) {
    throw new Error("Не удалось подготовить локальный radio proxy.");
  }

  radioState.proxyOrigin = origin.replace(/\/$/, "");
  return radioState.proxyOrigin;
}

function buildRadioProxyStreamUrl(sourceUrl) {
  const proxyOrigin = sanitizeHttpUrl(radioState.proxyOrigin);
  const cleanSourceUrl = sanitizeHttpUrl(sourceUrl);
  if (!proxyOrigin || !cleanSourceUrl) {
    return "";
  }

  const proxyUrl = new URL("/radio-stream", proxyOrigin);
  proxyUrl.searchParams.set("source", cleanSourceUrl);
  return proxyUrl.toString();
}

function getRadioModalStatusText() {
  if (!state.connectedAddress) {
    return "Сначала подключитесь к голосовой комнате.";
  }

  if (radioState.starting && radioState.switchingFrequency) {
    return `Подключаем ${radioState.switchingFrequency} FM в комнату через отдельного бота.`;
  }

  if (radioState.loading && !radioState.stations.length) {
    return "Загружаем список станций...";
  }

  if (radioState.activeStation) {
    const trackTitle = radioState.activeStation.nowPlaying?.filename
      ? ` Сейчас: ${formatRadioTrackName(radioState.activeStation.nowPlaying.filename)}.`
      : "";
    return `Сейчас в комнате играет ${getRadioStationLabel(radioState.activeStation)}.${trackTitle}`;
  }

  if (radioState.lastError && !radioState.stations.length) {
    return `Не удалось загрузить станции: ${radioState.lastError}`;
  }

  if (radioState.stations.length) {
    return `Доступно станций: ${radioState.stations.length}. Выберите одну из них, и в комнату зайдет отдельный радио-бот.`;
  }

  return "Нажмите «Обновить список», чтобы получить станции.";
}

function renderRadioUi() {
  if (!radioButton || !radioButtonLabel) {
    return;
  }

  const connected = Boolean(state.connectedAddress);
  const activeLabel = radioState.activeStation ? getRadioStationLabel(radioState.activeStation) : "Радио";
  radioButtonLabel.textContent = activeLabel;
  radioButton.disabled = !connected;
  radioButton.classList.toggle("is-active", Boolean(radioState.activeStation));
  radioButton.title = radioState.activeStation
    ? `Радио: ${activeLabel}`
    : "Радио";
  radioButton.setAttribute("aria-label", radioButton.title);

  if (!radioModal || !radioModalStatus || !radioStationsList || !radioRefreshButton || !radioStopButton) {
    return;
  }

  radioModal.hidden = !radioState.modalOpen;
  radioModalStatus.textContent = getRadioModalStatusText();
  radioRefreshButton.disabled = !connected || radioState.loading || radioState.starting;
  radioStopButton.hidden = !radioState.activeStation;
  radioStopButton.disabled = !radioState.activeStation || radioState.starting;
  radioStationsList.innerHTML = "";

  if (!connected) {
    const message = document.createElement("div");
    message.className = "radio-station-empty";
    message.textContent = "Подключитесь к комнате, затем откройте радио.";
    radioStationsList.append(message);
    return;
  }

  if (radioState.loading && !radioState.stations.length) {
    const message = document.createElement("div");
    message.className = "radio-station-empty";
    message.textContent = "Загружаем станции...";
    radioStationsList.append(message);
    return;
  }

  if (!radioState.stations.length) {
    const message = document.createElement("div");
    message.className = "radio-station-empty";
    message.textContent = radioState.lastError
      ? `Ошибка загрузки станций: ${radioState.lastError}`
      : "Станции пока не найдены.";
    radioStationsList.append(message);
    return;
  }

  for (const station of radioState.stations) {
    const isActive = station.frequency === radioState.activeStation?.frequency;
    const isBusy = radioState.starting && station.frequency === radioState.switchingFrequency;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "radio-station-card";
    card.classList.toggle("is-active", isActive);
    card.classList.toggle("is-busy", isBusy);
    card.disabled = isBusy;
    card.addEventListener("click", () => {
      if (!isBusy) {
        void startRadioStation(station);
      }
    });

    const top = document.createElement("div");
    top.className = "radio-station-top";

    const frequency = document.createElement("strong");
    frequency.className = "radio-station-frequency";
    frequency.textContent = getRadioStationLabel(station);

    const badge = document.createElement("span");
    badge.className = "radio-station-badge";
    badge.textContent = isBusy
      ? "Подключаем"
      : isActive
        ? "В комнате"
        : "Выбрать";

    top.append(frequency, badge);

    const meta = document.createElement("div");
    meta.className = "radio-station-meta";

    const trackCount = document.createElement("span");
    trackCount.textContent = station.trackCount
      ? `${station.trackCount} треков`
      : "Поток";

    const duration = document.createElement("span");
    duration.textContent = station.loopDurationSeconds
      ? `Цикл ${formatRadioDuration(station.loopDurationSeconds)}`
      : "Непрерывно";

    meta.append(trackCount, duration);

    if (station.nowPlaying?.remainingSeconds) {
      const remaining = document.createElement("span");
      remaining.textContent = `Осталось ${formatRadioDuration(station.nowPlaying.remainingSeconds)}`;
      meta.append(remaining);
    }

    const track = document.createElement("div");
    track.className = "radio-station-track";
    track.textContent = station.nowPlaying?.filename
      ? `Сейчас: ${formatRadioTrackName(station.nowPlaying.filename)}`
      : "Сейчас играет поток станции.";

    card.append(top, meta, track);
    radioStationsList.append(card);
  }
}

async function loadRadioStations({ force = false } = {}) {
  if (radioState.loading && radioState.loadPromise) {
    return radioState.loadPromise;
  }

  if (
    !force &&
    radioState.stations.length &&
    Date.now() - radioState.lastLoadedAt < RADIO_STATION_CACHE_MS
  ) {
    return radioState.stations;
  }

  radioState.loading = true;
  radioState.lastError = "";
  renderRadioUi();

  radioState.loadPromise = getDesktopApi()
    .getRadioStations(RADIO_CATALOG_URL)
    .then((payload) => {
      radioState.catalogName = String(payload?.name || "radio_api").trim().slice(0, 48) || "radio_api";
      radioState.stations = Array.isArray(payload?.stations)
        ? payload.stations
          .map((station) => sanitizeRadioStation(station, RADIO_CATALOG_URL))
          .filter(Boolean)
        : [];
      radioState.lastLoadedAt = Date.now();
      return radioState.stations;
    })
    .catch((error) => {
      radioState.lastError = error.message || "Не удалось загрузить станции.";
      throw error;
    })
    .finally(() => {
      radioState.loading = false;
      radioState.loadPromise = null;
      renderRadioUi();
    });

  return radioState.loadPromise;
}

async function openRadioModal() {
  if (!state.connectedAddress) {
    appendEvent("Сначала подключитесь к комнате, потом включайте радио.");
    return;
  }

  radioState.modalOpen = true;
  renderRadioUi();

  try {
    await loadRadioStations({ force: !radioState.stations.length });
  } catch (error) {
    void error;
  }
}

function closeRadioModal() {
  radioState.modalOpen = false;
  renderRadioUi();
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

function renderVolumeControls() {
  outputVolumeInput.value = String(Math.round(state.speakerVolume * 100));
  inputVolumeInput.value = String(Math.round(state.microphoneVolume * 100));
  updateVolumeLabels();
}

function getAudioInputLabel(device, index) {
  if (!device) {
    return `Микрофон ${index + 1}`;
  }

  if (device.deviceId === "default") {
    return device.label || "Системный микрофон";
  }

  return device.label || `Микрофон ${index + 1}`;
}

function getAudioOutputLabel(device, index) {
  if (!device) {
    return `Динамик ${index + 1}`;
  }

  if (device.deviceId === "default") {
    return device.label || "Системные динамики";
  }

  return device.label || `Динамик ${index + 1}`;
}

function normalizeDeviceChoices(devices, fallbackId, kind) {
  const entries = [];
  const seenIds = new Set();
  const fallbackLabel = kind === "audioinput" ? "Системный микрофон" : "Системные динамики";

  entries.push({
    deviceId: "default",
    label: fallbackLabel
  });
  seenIds.add("default");

  for (const device of devices || []) {
    if (!device || device.kind !== kind) {
      continue;
    }

    const deviceId = sanitizeMediaDeviceId(device.deviceId, "");
    if (!deviceId || seenIds.has(deviceId)) {
      continue;
    }

    seenIds.add(deviceId);
    entries.push({
      deviceId,
      label: kind === "audioinput"
        ? getAudioInputLabel(device, entries.length)
        : getAudioOutputLabel(device, entries.length)
    });
  }

  if (!entries.some((entry) => entry.deviceId === fallbackId)) {
    return {
      entries,
      selectedId: entries[0]?.deviceId || "default"
    };
  }

  return {
    entries,
    selectedId: fallbackId
  };
}

function getInputDeviceConstraint() {
  const selectedId = sanitizeMediaDeviceId(state.audioInputDeviceId, DEFAULT_AUDIO_INPUT_DEVICE_ID);
  if (!selectedId || selectedId === DEFAULT_AUDIO_INPUT_DEVICE_ID) {
    return null;
  }

  return { exact: selectedId };
}

function createBaseAudioConstraints() {
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

  const inputDeviceConstraint = getInputDeviceConstraint();
  if (inputDeviceConstraint) {
    audioConstraints.deviceId = inputDeviceConstraint;
  }

  return audioConstraints;
}

function ensureSelfTestAudioElement() {
  if (audioState.selfTestAudio) {
    return audioState.selfTestAudio;
  }

  const audio = document.createElement("audio");
  audio.autoplay = true;
  audio.playsInline = true;
  audio.dataset.role = "self-test";
  audioContainer.append(audio);
  audioState.selfTestAudio = audio;
  return audio;
}

async function applyOutputDeviceToElement(element) {
  if (!element || typeof element.setSinkId !== "function") {
    return;
  }

  const requestedSinkId = sanitizeMediaDeviceId(state.audioOutputDeviceId, DEFAULT_AUDIO_OUTPUT_DEVICE_ID);
  const sinkId = requestedSinkId === DEFAULT_AUDIO_OUTPUT_DEVICE_ID ? "" : requestedSinkId;

  try {
    await element.setSinkId(sinkId);
  } catch (error) {
    appendEvent(`Не удалось переключить устройство вывода: ${error.message}`);
    throw error;
  }
}

async function applyOutputDeviceToActiveAudio() {
  const tasks = [];

  for (const audio of remoteAudios.values()) {
    tasks.push(applyOutputDeviceToElement(audio).catch(() => {}));
  }

  if (audioState.selfTestAudio) {
    tasks.push(applyOutputDeviceToElement(audioState.selfTestAudio).catch(() => {}));
  }

  await Promise.all(tasks);
}

function getLocalMicLevelLabel(level) {
  if (level >= 0.88) {
    return "Перегруз";
  }

  if (level >= 0.6) {
    return "Хорошо";
  }

  if (level >= 0.22) {
    return "Тихо";
  }

  return "Нет сигнала";
}

function getSelfTestStatusText() {
  if (state.selfTestActive) {
    return "Проверка активна: воспроизводим ваш обработанный голос на выбранный динамик.";
  }

  const level = state.localMicLevel;
  if (level >= 0.88) {
    return "Сигнал слишком горячий. Убавьте громкость микрофона, чтобы не было перегруза.";
  }

  if (level >= 0.55) {
    return "Уровень хороший. Можно оставлять как есть.";
  }

  if (level >= 0.18) {
    return "Сигнал есть, но можно немного добавить громкости микрофона.";
  }

  return "Говорите в микрофон и следите за индикатором. Для прослушки используйте проверку.";
}

function renderLocalMicMeter() {
  if (!localMicMeter.childElementCount) {
    for (let index = 0; index < LOCAL_MIC_METER_BARS; index += 1) {
      const bar = document.createElement("span");
      bar.className = "local-mic-meter-bar";
      localMicMeter.append(bar);
    }
  }

  const level = Math.max(0, Math.min(1, state.localMicLevel));
  const activeBars = Math.round(level * LOCAL_MIC_METER_BARS);
  const bars = [...localMicMeter.children];

  bars.forEach((bar, index) => {
    const normalizedIndex = (index + 1) / LOCAL_MIC_METER_BARS;
    const height = Math.round(16 + normalizedIndex * 30);
    bar.style.height = `${height}px`;
    bar.classList.toggle("is-active", index < activeBars);
    bar.classList.toggle("is-hot", index < activeBars && normalizedIndex > 0.8);
  });

  localMicMeterLabel.textContent = getLocalMicLevelLabel(level);
  selfTestStatus.textContent = getSelfTestStatusText();
  selfTestButton.textContent = state.selfTestActive ? "Остановить проверку" : "Проверить себя";
}

function updateLocalMicLevel(rawLevel) {
  state.localMicRawLevel = Math.max(0, Number(rawLevel || 0));
  state.localMicLevel = normalizeActivityLevel(state.localMicRawLevel, state.microphoneVolume);
  renderLocalMicMeter();
}

function normalizeActivityLevel(rawLevel, multiplier = 1) {
  const scaledLevel = Math.max(0, Number(rawLevel || 0)) * Math.max(0, Number(multiplier || 0));
  return Math.max(0, Math.min(1, scaledLevel / LOCAL_MIC_LEVEL_MAX_RMS));
}

function getNetworkBufferHint(mode = state.networkBufferMode) {
  if (mode === "none") {
    return "Минимальная задержка. Подходит для стабильной сети.";
  }

  if (mode === "max") {
    return "Максимальное сглаживание потерь пакетов. Задержка будет выше.";
  }

  return "Баланс между задержкой и устойчивостью к потерям пакетов.";
}

function getNetworkBufferModeLabel(mode = state.networkBufferMode) {
  if (mode === "none") {
    return "нет";
  }

  if (mode === "max") {
    return "максимальная";
  }

  return "средняя";
}

function renderOverlayPosition() {
  overlayEnabledInput.checked = Boolean(state.overlayEnabled);
  overlayPositionSelect.value = sanitizeOverlayPosition(state.overlayPosition, DEFAULT_OVERLAY_POSITION);
  overlayLayoutSelect.value = sanitizeOverlayLayout(state.overlayLayout, DEFAULT_OVERLAY_LAYOUT);
  overlayAvatarSizeInput.value = String(sanitizeOverlayAvatarSize(state.overlayAvatarSize, DEFAULT_OVERLAY_AVATAR_SIZE));
  overlayAvatarSizeValue.textContent = `${sanitizeOverlayAvatarSize(state.overlayAvatarSize, DEFAULT_OVERLAY_AVATAR_SIZE)}px`;

  const overlayControlsEnabled = Boolean(state.overlayEnabled);
  overlayPositionSelect.disabled = !overlayControlsEnabled;
  overlayLayoutSelect.disabled = !overlayControlsEnabled;
  overlayAvatarSizeInput.disabled = !overlayControlsEnabled;
}

function renderNetworkBufferMode() {
  const mode = sanitizeNetworkBufferMode(state.networkBufferMode);
  networkBufferModeInput.value = mode;
  networkBufferHint.textContent = getNetworkBufferHint(mode);
}

function getNetworkBufferTargetMs(mode = state.networkBufferMode) {
  return NETWORK_BUFFER_TARGETS_MS[sanitizeNetworkBufferMode(mode)] ?? NETWORK_BUFFER_TARGETS_MS[DEFAULT_NETWORK_BUFFER_MODE];
}

function applyReceiverNetworkBuffer(receiver) {
  if (!receiver || receiver.track?.kind !== "audio") {
    return;
  }

  const targetMs = getNetworkBufferTargetMs();

  try {
    if ("jitterBufferTarget" in receiver) {
      receiver.jitterBufferTarget = targetMs;
      return;
    }

    if ("playoutDelayHint" in receiver) {
      receiver.playoutDelayHint = targetMs / 1000;
    }
  } catch (error) {
    void error;
  }
}

function applyNetworkBufferModeToPeer(peer) {
  if (!peer) {
    return;
  }

  for (const receiver of peer.getReceivers()) {
    applyReceiverNetworkBuffer(receiver);
  }
}

function applyNetworkBufferModeToActivePeers() {
  for (const peer of peerConnections.values()) {
    applyNetworkBufferModeToPeer(peer);
  }
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

function updateMembershipEntry(userLike, { markSeen = true } = {}) {
  const user = sanitizeRoomUser(userLike);
  const existing = membershipDirectory.get(user.id) || {};
  const observedLinks = user.observedLinks === undefined
    ? sanitizeObservedLinks(existing.observedLinks)
    : sanitizeObservedLinks(user.observedLinks);
  const next = {
    ...existing,
    ...user,
    observedLinks,
    leader: user.id === state.leaderId || Boolean(user.leader),
    lastSeen: markSeen ? Date.now() : existing.lastSeen || 0
  };

  membershipDirectory.set(user.id, next);
  return next;
}

function getObservedLinksForNode(nodeId) {
  return sanitizeObservedLinks(membershipDirectory.get(sanitizeNodeId(nodeId))?.observedLinks);
}

function getSelfObservedLinksPayload() {
  return getObservedLinksForNode(state.nodeId);
}

function replaceSelfObservedLinks(observedLinks) {
  if (!state.nodeId) {
    return;
  }

  updateMembershipEntry({
    id: state.nodeId,
    username: state.nickname,
    muted: state.isMuted,
    leader: state.nodeId === state.leaderId,
    observedLinks
  }, { markSeen: false });
}

function removeSelfObservedLink(peerId) {
  const normalizedPeerId = sanitizeNodeId(peerId);
  if (!normalizedPeerId) {
    return;
  }

  const observedLinks = getSelfObservedLinksPayload();
  if (!Object.prototype.hasOwnProperty.call(observedLinks, normalizedPeerId)) {
    return;
  }

  delete observedLinks[normalizedPeerId];
  replaceSelfObservedLinks(observedLinks);
}

function ensureSelfMembership() {
  if (!state.nodeId) {
    return null;
  }

  return updateMembershipEntry({
    id: state.nodeId,
    username: state.nickname,
    muted: state.isMuted,
    leader: state.nodeId === state.leaderId,
    observedLinks: getSelfObservedLinksPayload()
  });
}

function isNodeAlive(nodeId) {
  if (!nodeId) {
    return false;
  }

  const normalizedId = sanitizeNodeId(nodeId);
  if (!normalizedId) {
    return false;
  }

  if (normalizedId === state.nodeId) {
    return true;
  }

  if (peerConnections.has(normalizedId)) {
    return true;
  }

  const membership = membershipDirectory.get(normalizedId);
  return Boolean(membership && Date.now() - (membership.lastSeen || 0) <= PEER_HEARTBEAT_TIMEOUT_MS);
}

function isFreshObservedLink(metric) {
  return Boolean(
    metric &&
    Number.isFinite(metric.sampledAt) &&
    metric.sampledAt > 0 &&
    Date.now() - metric.sampledAt <= QUALITY_METRIC_TTL_MS
  );
}

function extractPeerQualityMetric(stats) {
  let bestRttMs = null;
  const lossSamples = [];

  for (const report of stats.values()) {
    if (report.type === "candidate-pair" && report.state === "succeeded") {
      const rttCandidate = Number(report.currentRoundTripTime)
        || (Number(report.totalRoundTripTime) > 0 && Number(report.responsesReceived) > 0
          ? Number(report.totalRoundTripTime) / Number(report.responsesReceived)
          : 0);
      if (Number.isFinite(rttCandidate) && rttCandidate > 0) {
        const rttMs = rttCandidate * 1000;
        if (bestRttMs === null || report.nominated || report.selected || rttMs < bestRttMs) {
          bestRttMs = rttMs;
        }
      }
    }

    const isAudioReport = report.kind === "audio" || report.mediaType === "audio";
    if (!isAudioReport) {
      continue;
    }

    if (report.type === "remote-inbound-rtp") {
      const remoteRttMs = Number(report.roundTripTime) * 1000;
      if (Number.isFinite(remoteRttMs) && remoteRttMs > 0 && (bestRttMs === null || remoteRttMs < bestRttMs)) {
        bestRttMs = remoteRttMs;
      }
    }

    if (report.type !== "inbound-rtp" && report.type !== "remote-inbound-rtp") {
      continue;
    }

    const receivedPackets = Number(report.packetsReceived || report.packetsSent || 0);
    const lostPackets = Number(report.packetsLost || 0);
    const totalPackets = receivedPackets + lostPackets;
    if (Number.isFinite(totalPackets) && totalPackets > 0 && Number.isFinite(lostPackets) && lostPackets >= 0) {
      lossSamples.push((lostPackets / totalPackets) * 100);
    }
  }

  if (bestRttMs === null && !lossSamples.length) {
    return null;
  }

  return {
    rttMs: bestRttMs === null ? null : Math.round(bestRttMs),
    lossPct: lossSamples.length ? Math.round(Math.max(...lossSamples) * 10) / 10 : 0,
    sampledAt: Date.now()
  };
}

async function refreshLocalMeshQualityMetrics(force = false) {
  if (!state.connectedAddress) {
    return;
  }

  if (meshState.qualityRefreshInFlight) {
    return;
  }

  const now = Date.now();
  const connectionKey = state.connectedAddress;
  if (!force && now - meshState.lastQualitySampleAt < QUALITY_STATS_REFRESH_MS) {
    return;
  }

  meshState.qualityRefreshInFlight = true;
  meshState.lastQualitySampleAt = now;

  try {
    const observedLinks = {};

    await Promise.all([...peerConnections.entries()].map(async ([peerId, peer]) => {
      if (!peer || typeof peer.getStats !== "function") {
        return;
      }

      try {
        const metric = extractPeerQualityMetric(await peer.getStats());
        if (metric) {
          observedLinks[sanitizeNodeId(peerId)] = metric;
        }
      } catch (error) {
        void error;
      }
    }));

    if (state.connectedAddress === connectionKey) {
      replaceSelfObservedLinks(observedLinks);
    }
  } finally {
    meshState.qualityRefreshInFlight = false;
  }
}

function getObservedLinkMetric(fromId, targetId) {
  const links = getObservedLinksForNode(fromId);
  const metric = links[sanitizeNodeId(targetId)];
  return isFreshObservedLink(metric) ? metric : null;
}

function getRouteMetricBetween(leftId, rightId) {
  const leftMetric = getObservedLinkMetric(leftId, rightId);
  const rightMetric = getObservedLinkMetric(rightId, leftId);
  const metrics = [leftMetric, rightMetric].filter(Boolean);
  if (!metrics.length) {
    return null;
  }

  const rttValues = metrics
    .map((metric) => Number(metric.rttMs))
    .filter((value) => Number.isFinite(value) && value >= 0);
  const lossValues = metrics
    .map((metric) => Number(metric.lossPct))
    .filter((value) => Number.isFinite(value) && value >= 0);

  return {
    rttMs: rttValues.length ? rttValues.reduce((sum, value) => sum + value, 0) / rttValues.length : null,
    lossPct: lossValues.length ? Math.max(...lossValues) : 0
  };
}

function getRouteMetricCost(metric) {
  if (!metric) {
    return QUALITY_MISSING_LINK_PENALTY;
  }

  const rttCost = Number.isFinite(metric.rttMs) ? metric.rttMs : QUALITY_MISSING_LINK_PENALTY * 0.75;
  const lossCost = Number.isFinite(metric.lossPct) ? metric.lossPct * QUALITY_LOSS_WEIGHT : QUALITY_LOSS_WEIGHT * 10;
  return rttCost + lossCost;
}

function getLeaderCandidateScore(candidateId, aliveIds) {
  const peers = aliveIds.filter((peerId) => peerId !== candidateId);
  if (!peers.length) {
    return 0;
  }

  const totalCost = peers.reduce((sum, peerId) => sum + getRouteMetricCost(getRouteMetricBetween(candidateId, peerId)), 0);
  return totalCost / peers.length;
}

function getMembershipPayload() {
  ensureSelfMembership();

  return [...membershipDirectory.values()]
    .filter((entry) => entry.id === state.nodeId || isNodeAlive(entry.id))
    .map((entry) => ({
      id: entry.id,
      username: entry.id === state.nodeId ? state.nickname : entry.username,
      muted: entry.id === state.nodeId ? state.isMuted : Boolean(entry.muted),
      leader: entry.id === state.leaderId,
      observedLinks: entry.id === state.nodeId ? getSelfObservedLinksPayload() : sanitizeObservedLinks(entry.observedLinks)
    }));
}

function syncUsersFromMembership() {
  const nextUsers = getMembershipPayload();
  state.users = sortUsers(nextUsers);
  renderParticipants();
  renderRoomSummaries();
}

function getLeaderCandidateId() {
  const aliveIds = getMembershipPayload()
    .map((entry) => entry.id)
    .filter(Boolean)
    .sort();

  if (!aliveIds.length) {
    return state.nodeId;
  }

  let bestCandidateId = aliveIds[0];
  let bestScore = Number.POSITIVE_INFINITY;

  for (const candidateId of aliveIds) {
    const candidateScore = getLeaderCandidateScore(candidateId, aliveIds);
    if (candidateScore < bestScore - 0.5) {
      bestCandidateId = candidateId;
      bestScore = candidateScore;
      continue;
    }

    if (Math.abs(candidateScore - bestScore) <= 0.5 && candidateId < bestCandidateId) {
      bestCandidateId = candidateId;
    }
  }

  return bestCandidateId || state.nodeId;
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

  if (isRadioBotUser(user)) {
    if (state.speakingUsers.has(user.id)) {
      return "В эфире";
    }

    return peerConnections.has(user.id) ? "Станция в комнате" : "Подключается";
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
  const isRadio = isRadioBotUser(user);
  const currentVolume = Math.round(getParticipantVolume(user.id) * 100);

  participantContextAvatar.textContent = getInitials(user.username);
  participantContextName.textContent = isSelf ? `${user.username} (вы)` : user.username;
  participantContextMeta.textContent = isSelf
    ? "Локальный пользователь"
    : isRadio
      ? "Громкость станции"
      : "Громкость слышимости";
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

  if (isRadio) {
    participantContextHint.textContent = "Это радиопоток. Громкость меняется только у вас, в комнате станция продолжит играть.";
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
    const isRadio = isRadioBotUser(user);
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

    if (isRadio) {
      const radioBadge = document.createElement("span");
      radioBadge.className = "room-tile-badge";
      radioBadge.innerHTML = ICONS.radio;
      radioBadge.title = "Радио";
      badges.append(radioBadge);
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

  if (audioState.selfTestAudio) {
    audioState.selfTestAudio.volume = Math.max(0, Math.min(1, state.speakerVolume));
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
  let localLevel = 0;

  if (activityState.local) {
    const level = readActivityLevel(activityState.local);
    localLevel = level;
    const normalizedLocalLevel = normalizeActivityLevel(level, state.microphoneVolume);
    if (state.selfId && !state.isMuted && normalizedLocalLevel > LOCAL_SPEAKING_THRESHOLD) {
      activityState.local.activeUntil = now + SPEAKING_HOLD_MS;
    }

    if (state.selfId && !state.isMuted && activityState.local.activeUntil > now) {
      nextSpeaking.add(state.selfId);
    }
  }

  for (const [peerId, entry] of activityState.remotes.entries()) {
    const level = readActivityLevel(entry);
    const normalizedRemoteLevel = normalizeActivityLevel(level);
    if (normalizedRemoteLevel > REMOTE_SPEAKING_THRESHOLD) {
      entry.activeUntil = now + SPEAKING_HOLD_MS;
    }

    if (entry.activeUntil > now) {
      nextSpeaking.add(peerId);
    }
  }

  updateLocalMicLevel(localLevel);

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
  state.localMicRawLevel = 0;
  updateLocalMicLevel(0);

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
  renderAudioDeviceOptions();
  renderVolumeControls();
  renderOverlayPosition();
  renderNetworkBufferMode();
  renderLocalMicMeter();
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

  heroRoomCopy.textContent = !state.overlayEnabled
    ? "Overlay выключен в профиле. При сворачивании останется только основное окно приложения."
    : state.connectedAddress
      ? `Overlay покажет участников этой комнаты при сворачивании окна. Текущий адрес: ${displayAddress}.`
      : "Подключайтесь по IP:PORT, сохраняйте серверы и включайте overlay только когда он действительно нужен.";

  participantCount.textContent = String(state.users.length);
  participantCountInline.textContent = String(state.users.length);
  savedServerCount.textContent = String(state.savedServers.length);
  savedServerCountBadge.textContent = String(state.savedServers.length);

  overlayState.textContent = !state.overlayEnabled
    ? "Overlay выключен"
    : state.connectedAddress
      ? "Overlay активен при сворачивании"
      : "Overlay ждёт подключения";

  renderDockStatus();
  renderRadioUi();

  updatePageHeader();
}

function setPage(page) {
  const previousPage = state.page;
  state.page = page;

  if (page !== "room") {
    hideParticipantContextMenu();
    closeRadioModal();
  }

  for (const section of pages) {
    section.classList.toggle("is-active", section.dataset.page === page);
  }

  for (const button of navButtons) {
    button.classList.toggle("is-active", button.dataset.pageSwitch === page);
  }

  if (page === "profile") {
    void ensureProfileAudioReady();
  } else if (previousPage === "profile" && !state.connectedAddress) {
    stopSelfTestPlayback();
    void teardownLocalAudio();
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
  state.installationId = sanitizeNodeId(settings.nodeId, state.installationId);
  if (!state.nodeId) {
    state.nodeId = createRuntimeNodeId(state.installationId);
  }
  state.nickname = sanitizeNickname(settings.nickname);
  state.hotkey = String(settings.globalMuteShortcut || DEFAULT_HOTKEY).trim() || DEFAULT_HOTKEY;
  state.networkBufferMode = sanitizeNetworkBufferMode(settings.networkBufferMode, state.networkBufferMode);
  state.audioInputDeviceId = sanitizeMediaDeviceId(settings.audioInputDeviceId, state.audioInputDeviceId || DEFAULT_AUDIO_INPUT_DEVICE_ID);
  state.audioOutputDeviceId = sanitizeMediaDeviceId(settings.audioOutputDeviceId, state.audioOutputDeviceId || DEFAULT_AUDIO_OUTPUT_DEVICE_ID);
  state.speakerVolume = sanitizeVolume(settings.speakerVolume, state.speakerVolume, { min: 0, max: 1 });
  state.microphoneVolume = sanitizeVolume(settings.microphoneVolume, state.microphoneVolume, { min: 0, max: 2 });
  state.overlayEnabled = sanitizeToggle(settings.overlayEnabled, state.overlayEnabled);
  state.overlayPosition = sanitizeOverlayPosition(settings.overlayPosition, state.overlayPosition || DEFAULT_OVERLAY_POSITION);
  state.overlayLayout = sanitizeOverlayLayout(settings.overlayLayout, state.overlayLayout || DEFAULT_OVERLAY_LAYOUT);
  state.overlayAvatarSize = sanitizeOverlayAvatarSize(settings.overlayAvatarSize, state.overlayAvatarSize || DEFAULT_OVERLAY_AVATAR_SIZE);
  state.savedServers = (settings.savedServers || [])
    .map((server) => sanitizeSavedServer(server))
    .filter(Boolean);

  if (state.selectedServerId && !state.savedServers.some((server) => server.id === state.selectedServerId)) {
    state.selectedServerId = null;
  }

  ensureSelfMembership();

  applySpeakerVolume();
  applyMicrophoneVolume();
  updateLocalMicLevel(state.localMicRawLevel);
  renderProfileVisuals();
  applyNetworkBufferModeToActivePeers();
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

async function persistNetworkBufferMode(value, silent = false) {
  const clean = sanitizeNetworkBufferMode(value, state.networkBufferMode);

  try {
    const settings = await getDesktopApi().updateSettings({ networkBufferMode: clean });
    applyLoadedSettings(settings);
    return state.networkBufferMode;
  } catch (error) {
    if (!silent) {
      appendEvent(`Не удалось сохранить сетевую буферизацию: ${error.message}`);
    }

    state.networkBufferMode = clean;
    renderNetworkBufferMode();
    applyNetworkBufferModeToActivePeers();
    return clean;
  }
}

async function persistAudioDevicePreferences(patch, silent = false) {
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(patch || {}, "audioInputDeviceId")) {
    payload.audioInputDeviceId = sanitizeMediaDeviceId(patch.audioInputDeviceId, state.audioInputDeviceId);
  }

  if (Object.prototype.hasOwnProperty.call(patch || {}, "audioOutputDeviceId")) {
    payload.audioOutputDeviceId = sanitizeMediaDeviceId(patch.audioOutputDeviceId, state.audioOutputDeviceId);
  }

  try {
    const settings = await getDesktopApi().updateSettings(payload);
    applyLoadedSettings(settings);
    return settings;
  } catch (error) {
    if (!silent) {
      appendEvent(`Не удалось сохранить аудиоустройства: ${error.message}`);
    }

    throw error;
  }
}

async function persistAudioMixPreferences(patch, silent = false) {
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(patch || {}, "speakerVolume")) {
    payload.speakerVolume = sanitizeVolume(patch.speakerVolume, state.speakerVolume, { min: 0, max: 1 });
  }

  if (Object.prototype.hasOwnProperty.call(patch || {}, "microphoneVolume")) {
    payload.microphoneVolume = sanitizeVolume(patch.microphoneVolume, state.microphoneVolume, { min: 0, max: 2 });
  }

  try {
    const settings = await getDesktopApi().updateSettings(payload);
    applyLoadedSettings(settings);
    return settings;
  } catch (error) {
    if (!silent) {
      appendEvent(`Не удалось сохранить параметры звука: ${error.message}`);
    }

    throw error;
  }
}

async function persistOverlaySettings(patch, silent = false) {
  const payload = {};

  if (Object.prototype.hasOwnProperty.call(patch || {}, "overlayEnabled")) {
    payload.overlayEnabled = sanitizeToggle(patch.overlayEnabled, state.overlayEnabled);
  }

  if (Object.prototype.hasOwnProperty.call(patch || {}, "overlayPosition")) {
    payload.overlayPosition = sanitizeOverlayPosition(patch.overlayPosition, state.overlayPosition);
  }

  if (Object.prototype.hasOwnProperty.call(patch || {}, "overlayLayout")) {
    payload.overlayLayout = sanitizeOverlayLayout(patch.overlayLayout, state.overlayLayout);
  }

  if (Object.prototype.hasOwnProperty.call(patch || {}, "overlayAvatarSize")) {
    payload.overlayAvatarSize = sanitizeOverlayAvatarSize(patch.overlayAvatarSize, state.overlayAvatarSize);
  }

  try {
    const settings = await getDesktopApi().updateSettings(payload);
    applyLoadedSettings(settings);
    return settings;
  } catch (error) {
    if (!silent) {
      appendEvent(`Не удалось сохранить настройки overlay: ${error.message}`);
    }

    throw error;
  }
}

function renderAudioDeviceOptions() {
  const renderSelect = (select, entries, selectedId) => {
    select.innerHTML = "";

    for (const entry of entries) {
      const option = document.createElement("option");
      option.value = entry.deviceId;
      option.textContent = entry.label;
      select.append(option);
    }

    select.disabled = !entries.length;
    if (entries.length) {
      select.value = entries.some((entry) => entry.deviceId === selectedId) ? selectedId : entries[0].deviceId;
    }
  };

  renderSelect(inputDeviceSelect, state.availableAudioInputs, state.audioInputDeviceId);
  renderSelect(outputDeviceSelect, state.availableAudioOutputs, state.audioOutputDeviceId);
}

async function refreshMediaDevices({ requestAudio = false } = {}) {
  if (!navigator.mediaDevices?.enumerateDevices) {
    return;
  }

  if (requestAudio && !audioState.rawStream) {
    await ensureLocalAudio();
  }

  const devices = await navigator.mediaDevices.enumerateDevices();
  const normalizedInputs = normalizeDeviceChoices(devices, state.audioInputDeviceId, "audioinput");
  const normalizedOutputs = normalizeDeviceChoices(devices, state.audioOutputDeviceId, "audiooutput");

  state.availableAudioInputs = normalizedInputs.entries;
  state.availableAudioOutputs = normalizedOutputs.entries;
  state.audioInputDeviceId = normalizedInputs.selectedId;
  state.audioOutputDeviceId = normalizedOutputs.selectedId;
  renderAudioDeviceOptions();
  await applyOutputDeviceToActiveAudio().catch(() => {});
}

async function syncSelfTestAudioStream() {
  const audio = audioState.selfTestAudio;
  if (!audio) {
    return;
  }

  audio.volume = Math.max(0, Math.min(1, state.speakerVolume));
  await applyOutputDeviceToElement(audio).catch(() => {});

  if (!state.selfTestActive) {
    audio.pause();
    audio.srcObject = null;
    return;
  }

  const stream = await ensureLocalAudio();
  audio.srcObject = stream;
  await audio.play().catch(() => {});
}

function stopSelfTestPlayback() {
  state.selfTestActive = false;
  if (audioState.selfTestAudio) {
    audioState.selfTestAudio.pause();
    audioState.selfTestAudio.srcObject = null;
  }
  renderLocalMicMeter();
}

async function startSelfTestPlayback() {
  const audio = ensureSelfTestAudioElement();
  state.selfTestActive = true;
  renderLocalMicMeter();

  try {
    await refreshMediaDevices({ requestAudio: true });
    await syncSelfTestAudioStream();
    appendEvent("Проверка микрофона запущена.");
  } catch (error) {
    stopSelfTestPlayback();
    appendEvent(`Не удалось запустить проверку микрофона: ${error.message}`);
    throw error;
  }
}

async function replaceOutgoingAudioTrack(stream) {
  const nextTrack = stream?.getAudioTracks?.()[0] || null;
  const replaceTasks = [];

  for (const peer of peerConnections.values()) {
    const sender = peer.getSenders().find((entry) => entry.track?.kind === "audio");
    if (!sender) {
      continue;
    }

    replaceTasks.push(sender.replaceTrack(nextTrack).catch(() => {}));
  }

  await Promise.all(replaceTasks);
}

async function rebuildLocalAudioPipeline() {
  const shouldRestoreSelfTest = state.selfTestActive;
  stopSelfTestPlayback();
  await teardownLocalAudio();
  const stream = await ensureLocalAudio();
  await replaceOutgoingAudioTrack(stream);

  if (shouldRestoreSelfTest) {
    await startSelfTestPlayback().catch(() => {});
  }

  return stream;
}

async function ensureProfileAudioReady() {
  try {
    await refreshMediaDevices({ requestAudio: true });
    renderLocalMicMeter();
  } catch (error) {
    selfTestStatus.textContent = `Нет доступа к микрофону: ${error.message}`;
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

async function disposeRadioBotMedia(bot) {
  if (!bot) {
    return;
  }

  const stream = bot.stream;
  if (stream?.getTracks) {
    for (const track of stream.getTracks()) {
      try {
        track.stop();
      } catch (error) {
        void error;
      }
    }
  }

  if (bot.audioElement) {
    bot.audioElement.onerror = null;
    bot.audioElement.onended = null;

    try {
      bot.audioElement.pause();
    } catch (error) {
      void error;
    }

    try {
      bot.audioElement.removeAttribute("src");
      bot.audioElement.load();
    } catch (error) {
      void error;
    }
  }

  for (const node of [bot.sourceNode, bot.gainNode, bot.destinationNode]) {
    try {
      node?.disconnect();
    } catch (error) {
      void error;
    }
  }

  if (bot.context) {
    try {
      await bot.context.close();
    } catch (error) {
      void error;
    }
  }

  bot.audioElement = null;
  bot.context = null;
  bot.sourceNode = null;
  bot.gainNode = null;
  bot.destinationNode = null;
  bot.stream = null;
}

function closeRadioBotPeer(bot, peerId) {
  const peer = bot?.peerConnections?.get(peerId);
  if (!peer) {
    return;
  }

  peer.onicecandidate = null;
  peer.ondatachannel = null;
  peer.onconnectionstatechange = null;
  peer.ontrack = null;

  try {
    peer.close();
  } catch (error) {
    void error;
  }

  bot.peerConnections.delete(peerId);
  bot.pendingIceCandidates.delete(peerId);
}

async function cleanupRadioBotResources(bot, { closeSocket = true } = {}) {
  if (!bot || bot.cleanedUp) {
    return;
  }

  bot.cleanedUp = true;

  if (closeSocket && bot.socket) {
    const socket = bot.socket;
    bot.socket = null;
    socket.onopen = null;
    socket.onmessage = null;
    socket.onclose = null;
    socket.onerror = null;

    try {
      socket.close();
    } catch (error) {
      void error;
    }
  }

  for (const peerId of [...bot.peerConnections.keys()]) {
    closeRadioBotPeer(bot, peerId);
  }

  bot.pendingIceCandidates.clear();
  await disposeRadioBotMedia(bot);
}

function sendRadioBotSignal(bot, targetId, signal) {
  if (!bot?.socket || bot.socket.readyState !== WebSocket.OPEN) {
    return;
  }

  bot.socket.send(JSON.stringify({
    type: "signal",
    targetId: sanitizeNodeId(targetId),
    signal
  }));
}

async function flushRadioBotPendingIceCandidates(bot, peerId, peer) {
  const queue = bot?.pendingIceCandidates?.get(peerId);
  if (!queue?.length) {
    return;
  }

  for (const candidate of queue) {
    try {
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      void error;
    }
  }

  bot.pendingIceCandidates.delete(peerId);
}

async function createRadioBotPeerConnection(bot, peerId, username, initiator) {
  if (!bot?.stream) {
    throw new Error("Radio stream is not ready.");
  }

  const normalizedPeerId = sanitizeNodeId(peerId);
  if (!normalizedPeerId || normalizedPeerId === bot.nodeId) {
    return null;
  }

  if (bot.peerConnections.has(normalizedPeerId)) {
    return bot.peerConnections.get(normalizedPeerId);
  }

  const peer = new RTCPeerConnection(rtcConfig);
  applyNetworkBufferModeToPeer(peer);

  for (const track of bot.stream.getTracks()) {
    peer.addTrack(track, bot.stream);
  }

  peer.onicecandidate = (event) => {
    if (!event.candidate) {
      return;
    }

    sendRadioBotSignal(bot, normalizedPeerId, {
      type: "candidate",
      candidate: event.candidate
    });
  };

  peer.ondatachannel = (event) => {
    const channel = event.channel;
    if (!channel) {
      return;
    }

    channel.onopen = null;
    channel.onmessage = null;
    channel.onclose = null;
    channel.onerror = null;

    try {
      channel.close();
    } catch (error) {
      void error;
    }
  };

  peer.ontrack = () => {
    void username;
  };

  peer.onconnectionstatechange = () => {
    if (["failed", "closed", "disconnected"].includes(peer.connectionState)) {
      closeRadioBotPeer(bot, normalizedPeerId);
    }
  };

  bot.peerConnections.set(normalizedPeerId, peer);

  if (initiator) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    sendRadioBotSignal(bot, normalizedPeerId, {
      type: "offer",
      sdp: offer
    });
  }

  return peer;
}

async function handleRadioBotSignal(bot, fromId, fromUsername, signal) {
  if (!signal?.type) {
    return;
  }

  const normalizedFromId = sanitizeNodeId(fromId);
  if (!normalizedFromId || normalizedFromId === bot.nodeId) {
    return;
  }

  const peer = await createRadioBotPeerConnection(bot, normalizedFromId, fromUsername || "User", false);
  if (!peer) {
    return;
  }

  if (signal.type === "offer") {
    await peer.setRemoteDescription(new RTCSessionDescription(signal.sdp));
    await flushRadioBotPendingIceCandidates(bot, normalizedFromId, peer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    sendRadioBotSignal(bot, normalizedFromId, {
      type: "answer",
      sdp: answer
    });
    return;
  }

  if (signal.type === "answer") {
    await peer.setRemoteDescription(new RTCSessionDescription(signal.sdp));
    await flushRadioBotPendingIceCandidates(bot, normalizedFromId, peer);
    return;
  }

  if (signal.type === "candidate" && signal.candidate) {
    if (peer.remoteDescription?.type) {
      try {
        await peer.addIceCandidate(new RTCIceCandidate(signal.candidate));
      } catch (error) {
        void error;
      }
      return;
    }

    const queue = bot.pendingIceCandidates.get(normalizedFromId) || [];
    queue.push(signal.candidate);
    bot.pendingIceCandidates.set(normalizedFromId, queue);
  }
}

async function createRadioBotMedia(station) {
  await ensureRadioProxyOrigin();

  const proxiedStreamUrl = buildRadioProxyStreamUrl(station.streamUrl);
  if (!proxiedStreamUrl) {
    throw new Error("Не удалось построить URL радиопотока.");
  }

  const audioElement = new Audio();
  audioElement.crossOrigin = "anonymous";
  audioElement.playsInline = true;
  audioElement.preload = "none";
  audioElement.src = proxiedStreamUrl;

  const context = createAudioContext();
  if (!context) {
    throw new Error("AudioContext недоступен.");
  }

  if (context.state === "suspended") {
    await context.resume();
  }

  const sourceNode = context.createMediaElementSource(audioElement);
  const gainNode = context.createGain();
  const destinationNode = context.createMediaStreamDestination();

  sourceNode.connect(gainNode);
  gainNode.connect(destinationNode);
  gainNode.gain.value = 1;

  await audioElement.play();

  const stream = destinationNode.stream;
  if (!stream?.getAudioTracks?.().length) {
    throw new Error("Не удалось получить аудиотрек станции.");
  }

  return {
    audioElement,
    context,
    sourceNode,
    gainNode,
    destinationNode,
    stream
  };
}

function connectRadioBotSocket(bot) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const socket = new WebSocket(bot.roomAddress);
    const timeoutId = window.setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      try {
        socket.close();
      } catch (error) {
        void error;
      }
      reject(new Error(`Таймаут подключения радио ${getRadioStationLabel(bot.station)} к комнате.`));
    }, CONTROL_CONNECT_TIMEOUT_MS);

    const rejectAttempt = (error) => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(timeoutId);
      socket.onopen = null;
      socket.onmessage = null;
      socket.onclose = null;
      socket.onerror = null;

      try {
        socket.close();
      } catch (closeError) {
        void closeError;
      }

      reject(error);
    };

    socket.onopen = () => {
      if (bot.cleanedUp) {
        rejectAttempt(new Error("Запуск радио отменен."));
        return;
      }

      bot.socket = socket;
      socket.send(JSON.stringify({
        type: "join",
        nodeId: bot.nodeId,
        username: bot.username,
        muted: false
      }));
    };

    socket.onmessage = async (event) => {
      let payload = null;

      try {
        payload = JSON.parse(event.data);
      } catch (error) {
        return;
      }

      if (payload.type === "welcome") {
        for (const peer of payload.peers || []) {
          await createRadioBotPeerConnection(bot, peer.id, peer.username || "User", true);
        }

        if (!settled) {
          settled = true;
          window.clearTimeout(timeoutId);
          resolve(bot);
        }
        return;
      }

      if (payload.type === "peer-left") {
        closeRadioBotPeer(bot, payload.peerId);
        return;
      }

      if (payload.type === "signal") {
        await handleRadioBotSignal(bot, payload.fromId, payload.fromUsername, payload.signal);
        return;
      }

      if (payload.type === "error") {
        if (!settled) {
          rejectAttempt(new Error(payload.message || "Ошибка radio bot signaling."));
          return;
        }

        appendEvent(`Радио ${getRadioStationLabel(bot.station)}: ${payload.message || "ошибка signaling"}.`);
      }
    };

    socket.onerror = () => {
      if (!settled) {
        rejectAttempt(new Error(`Не удалось подключить радио ${getRadioStationLabel(bot.station)} к комнате.`));
      }
    };

    socket.onclose = () => {
      if (!settled) {
        rejectAttempt(new Error(`Соединение радио ${getRadioStationLabel(bot.station)} закрылось слишком рано.`));
        return;
      }

      if (bot.cleanedUp) {
        return;
      }

      const wasActiveBot = radioState.bot === bot;
      void cleanupRadioBotResources(bot, { closeSocket: false });

      if (wasActiveBot) {
        radioState.bot = null;
        radioState.activeStation = null;
        radioState.starting = false;
        radioState.switchingFrequency = "";
        renderRadioUi();
        appendEvent(`${getRadioStationLabel(bot.station)} отключилось от комнаты.`);
      }
    };
  });
}

async function stopRadioBot({ silent = false, reason = "" } = {}) {
  radioState.startToken += 1;
  radioState.starting = false;
  radioState.switchingFrequency = "";

  const bot = radioState.bot;
  radioState.bot = null;
  radioState.activeStation = null;
  renderRadioUi();

  if (!bot) {
    if (reason && !silent) {
      appendEvent(reason);
    }
    return;
  }

  await cleanupRadioBotResources(bot);

  if (!silent) {
    appendEvent(reason || `${getRadioStationLabel(bot.station)} остановлено.`);
  }
}

async function startRadioStation(station) {
  const cleanStation = sanitizeRadioStation(station, RADIO_CATALOG_URL);
  if (!cleanStation) {
    appendEvent("Некорректная радиостанция.");
    return;
  }

  if (!state.connectedAddress) {
    appendEvent("Сначала подключитесь к комнате, потом включайте радио.");
    return;
  }

  if (radioState.bot && radioState.activeStation?.frequency === cleanStation.frequency) {
    closeRadioModal();
    return;
  }

  if (radioState.bot) {
    await stopRadioBot({ silent: true });
  }

  const startToken = ++radioState.startToken;
  const bot = {
    station: cleanStation,
    roomAddress: state.connectedAddress,
    nodeId: buildRadioBotNodeId(),
    username: buildRadioBotName(cleanStation),
    socket: null,
    peerConnections: new Map(),
    pendingIceCandidates: new Map(),
    audioElement: null,
    context: null,
    sourceNode: null,
    gainNode: null,
    destinationNode: null,
    stream: null,
    cleanedUp: false
  };

  radioState.starting = true;
  radioState.switchingFrequency = cleanStation.frequency;
  renderRadioUi();

  try {
    Object.assign(bot, await createRadioBotMedia(cleanStation));

    bot.audioElement.onerror = () => {
      if (radioState.bot === bot) {
        appendEvent(`Поток ${getRadioStationLabel(cleanStation)} оборвался.`);
        void stopRadioBot({ silent: true });
      }
    };

    bot.audioElement.onended = () => {
      if (radioState.bot === bot) {
        appendEvent(`${getRadioStationLabel(cleanStation)} завершило поток.`);
        void stopRadioBot({ silent: true });
      }
    };

    if (startToken !== radioState.startToken) {
      await cleanupRadioBotResources(bot);
      return;
    }

    await connectRadioBotSocket(bot);

    if (startToken !== radioState.startToken) {
      await cleanupRadioBotResources(bot);
      return;
    }

    radioState.bot = bot;
    radioState.activeStation = cleanStation;
    radioState.starting = false;
    radioState.switchingFrequency = "";
    closeRadioModal();
    renderRadioUi();
    appendEvent(`В комнату добавлено ${getRadioStationLabel(cleanStation)}.`);
  } catch (error) {
    await cleanupRadioBotResources(bot);
    radioState.bot = null;
    radioState.activeStation = null;
    radioState.starting = false;
    radioState.switchingFrequency = "";
    renderRadioUi();
    appendEvent(`Не удалось запустить ${getRadioStationLabel(cleanStation)}: ${error.message}`);
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

async function requestLocalInputStream() {
  const withPreferredInput = createBaseAudioConstraints();

  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: withPreferredInput,
      video: false
    });
  } catch (error) {
    if (!withPreferredInput.deviceId) {
      throw error;
    }

    const fallbackConstraints = createBaseAudioConstraints();
    delete fallbackConstraints.deviceId;
    state.audioInputDeviceId = DEFAULT_AUDIO_INPUT_DEVICE_ID;
    renderAudioDeviceOptions();

    return navigator.mediaDevices.getUserMedia({
      audio: fallbackConstraints,
      video: false
    });
  }
}

async function ensureLocalAudio() {
  if (audioState.outboundStream) {
    return audioState.outboundStream;
  }

  audioState.rawStream = await requestLocalInputStream();
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
  stopSelfTestPlayback();
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

function getPeerControlChannel(peerId) {
  const channel = peerControlChannels.get(peerId);
  return channel && channel.readyState === "open" ? channel : null;
}

function sendPeerControl(targetId, payload) {
  const channel = getPeerControlChannel(targetId);
  if (!channel) {
    return false;
  }

  channel.send(JSON.stringify(payload));
  return true;
}

function broadcastPeerControl(payload, excludeId = "") {
  for (const [peerId, channel] of peerControlChannels.entries()) {
    if (peerId === excludeId || channel.readyState !== "open") {
      continue;
    }

    channel.send(JSON.stringify(payload));
  }
}

function sendControlHello(targetId, requestSync = false) {
  sendPeerControl(targetId, {
    type: "hello",
    nodeId: state.nodeId,
    username: state.nickname,
    muted: state.isMuted,
    leaderId: state.leaderId,
    observedLinks: getSelfObservedLinksPayload(),
    requestSync
  });
}

function sendMembershipSnapshot(targetId = "") {
  const payload = {
    type: "membership",
    leaderId: state.leaderId,
    users: getMembershipPayload()
  };

  if (targetId) {
    sendPeerControl(targetId, payload);
    return;
  }

  broadcastPeerControl(payload);
}

async function handlePeerControlMessage(fromId, payload) {
  if (!payload || typeof payload !== "object" || !payload.type) {
    return;
  }

  if (payload.type === "hello" || payload.type === "heartbeat") {
    updateMembershipEntry({
      id: fromId,
      username: payload.username || findUserById(fromId)?.username || "User",
      muted: payload.muted,
      leader: payload.leaderId === fromId,
      observedLinks: payload.observedLinks
    });

    if (payload.leaderId) {
      state.leaderId = sanitizeNodeId(payload.leaderId, state.leaderId);
    }

    if (payload.type === "hello" && payload.requestSync) {
      sendControlHello(fromId, false);
      sendMembershipSnapshot(fromId);
    }

    if (!state.controlConnected) {
      syncUsersFromMembership();
    }

    return;
  }

  if (payload.type === "membership") {
    for (const user of payload.users || []) {
      updateMembershipEntry(user);
    }

    if (payload.leaderId) {
      state.leaderId = sanitizeNodeId(payload.leaderId, state.leaderId);
    }

    if (!state.controlConnected) {
      syncUsersFromMembership();
    }

    return;
  }

  if (payload.type === "leader-election") {
    for (const user of payload.users || []) {
      updateMembershipEntry(user);
    }

    scheduleLeaderElection("peer-election");
    return;
  }

  if (payload.type === "takeover") {
    if (payload.takeoverId && meshState.processedTakeovers.has(payload.takeoverId)) {
      return;
    }

    if (payload.takeoverId) {
      meshState.processedTakeovers.add(payload.takeoverId);
      if (meshState.processedTakeovers.size > 24) {
        const firstValue = meshState.processedTakeovers.values().next().value;
        if (firstValue) {
          meshState.processedTakeovers.delete(firstValue);
        }
      }
    }

    if (payload.leaderId) {
      state.leaderId = sanitizeNodeId(payload.leaderId, state.leaderId);
      updateMembershipEntry({
        id: state.leaderId,
        username: payload.username || membershipDirectory.get(state.leaderId)?.username || "Leader",
        muted: false,
        leader: true
      }, { markSeen: false });
    }

    if (!state.controlConnected) {
      syncUsersFromMembership();
    }

    await reconnectToLeaderFromTakeover(payload);
  }
}

function bindPeerControlChannel(peerId, channel) {
  const previousChannel = peerControlChannels.get(peerId);
  if (previousChannel && previousChannel !== channel) {
    previousChannel.onopen = null;
    previousChannel.onmessage = null;
    previousChannel.onclose = null;
    previousChannel.onerror = null;

    try {
      previousChannel.close();
    } catch (error) {
      void error;
    }
  }

  peerControlChannels.set(peerId, channel);

  channel.onopen = () => {
    updateMembershipEntry({
      id: peerId,
      username: findUserById(peerId)?.username || membershipDirectory.get(peerId)?.username || "User",
      muted: membershipDirectory.get(peerId)?.muted
    });
    void refreshLocalMeshQualityMetrics(true);
    sendControlHello(peerId, true);
    sendMembershipSnapshot(peerId);
    if (!state.controlConnected) {
      syncUsersFromMembership();
    }
  };

  channel.onmessage = (event) => {
    let payload = null;

    try {
      payload = JSON.parse(event.data);
    } catch (error) {
      return;
    }

    void handlePeerControlMessage(peerId, payload);
  };

  channel.onclose = () => {
    if (peerControlChannels.get(peerId) === channel) {
      peerControlChannels.delete(peerId);
    }

    if (!state.controlConnected) {
      syncUsersFromMembership();
      scheduleLeaderElection("control-channel-closed");
    }
  };

  channel.onerror = () => {
    void 0;
  };
}

function closePeer(peerId) {
  const peer = peerConnections.get(peerId);
  if (peer) {
    peer.ontrack = null;
    peer.onicecandidate = null;
    peer.ondatachannel = null;
    peer.onconnectionstatechange = null;
    peer.close();
    peerConnections.delete(peerId);
  }

  const controlChannel = peerControlChannels.get(peerId);
  if (controlChannel) {
    controlChannel.onopen = null;
    controlChannel.onmessage = null;
    controlChannel.onclose = null;
    controlChannel.onerror = null;

    try {
      controlChannel.close();
    } catch (error) {
      void error;
    }

    peerControlChannels.delete(peerId);
  }

  pendingIceCandidates.delete(peerId);
  membershipDirectory.delete(peerId);
  removeSelfObservedLink(peerId);
  cleanupRemoteAudio(peerId);

  if (!state.controlConnected) {
    syncUsersFromMembership();
    if (peerId === state.leaderId) {
      scheduleLeaderElection("peer-closed");
    }
    if (!peerConnections.size && state.connectedAddress) {
      armAutoReconnect("peers-lost");
    }
  }
}

function sendSignal(targetId, signal) {
  if (!state.socket || state.socket.readyState !== WebSocket.OPEN) {
    return;
  }

  state.socket.send(JSON.stringify({
    type: "signal",
    targetId: sanitizeNodeId(targetId),
    signal
  }));
}

function sendPresenceUpdate() {
  if (state.socket && state.socket.readyState === WebSocket.OPEN) {
    state.socket.send(JSON.stringify({
      type: "presence",
      muted: state.isMuted
    }));
  }

  broadcastPeerControl({
    type: "heartbeat",
    nodeId: state.nodeId,
    username: state.nickname,
    muted: state.isMuted,
    leaderId: state.leaderId
  });
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
  void applyOutputDeviceToElement(audio).catch(() => {});
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
  applyNetworkBufferModeToPeer(peer);

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

  peer.ondatachannel = (event) => {
    if (event.channel?.label === DATA_CHANNEL_LABEL) {
      bindPeerControlChannel(peerId, event.channel);
    }
  };

  peer.ontrack = (event) => {
    applyReceiverNetworkBuffer(event.receiver);
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
  updateMembershipEntry({
    id: peerId,
    username,
    muted: membershipDirectory.get(peerId)?.muted
  }, { markSeen: false });
  renderParticipants();

  if (initiator) {
    bindPeerControlChannel(peerId, peer.createDataChannel(DATA_CHANNEL_LABEL, {
      ordered: true
    }));

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

function applyUsers(nextUsers, { leaderId = "", replace = false } = {}) {
  const normalizedUsers = [...new Map((nextUsers || [])
    .map((user) => {
      const normalized = sanitizeRoomUser(user);
      return [normalized.id, normalized];
    }))
    .values()];

  if (leaderId) {
    state.leaderId = sanitizeNodeId(leaderId, state.leaderId);
  } else {
    const leader = normalizedUsers.find((user) => user.leader);
    if (leader) {
      state.leaderId = leader.id;
    }
  }

  const seenIds = new Set();
  for (const user of normalizedUsers) {
    user.leader = user.id === state.leaderId || Boolean(user.leader);
    updateMembershipEntry(user);
    seenIds.add(user.id);
  }

  ensureSelfMembership();

  if (replace) {
    for (const nodeId of [...membershipDirectory.keys()]) {
      if (nodeId !== state.nodeId && !seenIds.has(nodeId)) {
        membershipDirectory.delete(nodeId);
      }
    }
  }

  const users = normalizedUsers.map((user) => ({
    ...user,
    leader: user.id === state.leaderId || Boolean(user.leader)
  }));

  if (state.nodeId && !users.some((user) => user.id === state.nodeId)) {
    users.push({
      id: state.nodeId,
      username: state.nickname,
      muted: state.isMuted,
      leader: state.nodeId === state.leaderId
    });
  }

  state.users = sortUsers(users);
  renderParticipants();
  renderRoomSummaries();
}

function stopMeshControlLoop() {
  if (meshState.heartbeatTimer) {
    window.clearInterval(meshState.heartbeatTimer);
    meshState.heartbeatTimer = null;
  }

  if (meshState.electionTimer) {
    window.clearTimeout(meshState.electionTimer);
    meshState.electionTimer = null;
  }

  meshState.reconnectInFlight = false;
  meshState.takeoverInFlight = false;
  meshState.qualityRefreshInFlight = false;
  meshState.lastQualitySampleAt = 0;
}

function handleMeshHeartbeatTick() {
  if (!state.connectedAddress) {
    return;
  }

  ensureSelfMembership();
  void refreshLocalMeshQualityMetrics();
  broadcastPeerControl({
    type: "heartbeat",
    nodeId: state.nodeId,
    username: state.nickname,
    muted: state.isMuted,
    leaderId: state.leaderId,
    observedLinks: getSelfObservedLinksPayload()
  });

  if (!state.controlConnected) {
    syncUsersFromMembership();

    if (!state.leaderId || state.leaderId === state.nodeId || !isNodeAlive(state.leaderId)) {
      scheduleLeaderElection("heartbeat");
    }
  }
}

function startMeshControlLoop() {
  if (meshState.heartbeatTimer) {
    return;
  }

  meshState.heartbeatTimer = window.setInterval(handleMeshHeartbeatTick, PEER_HEARTBEAT_INTERVAL_MS);
  handleMeshHeartbeatTick();
}

function clearAutoReconnect({ clearTarget = false } = {}) {
  if (reconnectState.timer) {
    window.clearTimeout(reconnectState.timer);
    reconnectState.timer = null;
  }

  reconnectState.attemptsRemaining = 0;
  reconnectState.attemptInFlight = false;
  reconnectState.waitingForOnline = false;
  reconnectState.armed = false;

  if (clearTarget) {
    reconnectState.targetAddress = "";
    reconnectState.displayAddress = "";
    reconnectState.roomName = "";
  }
}

function rememberReconnectTarget(address, roomName = "", displayAddress = "") {
  const cleanAddress = sanitizeServerAddress(address || stripTransport(state.connectedAddress));
  if (!cleanAddress) {
    return;
  }

  reconnectState.targetAddress = cleanAddress;
  reconnectState.displayAddress = sanitizeServerAddress(displayAddress || cleanAddress) || cleanAddress;
  reconnectState.roomName = sanitizeServerLabel(roomName || state.roomLabel, reconnectState.displayAddress || DEFAULT_ROOM_NAME);
}

function scheduleAutoReconnectAttempt(delayMs) {
  if (reconnectState.timer) {
    window.clearTimeout(reconnectState.timer);
  }

  reconnectState.timer = window.setTimeout(() => {
    reconnectState.timer = null;
    void runAutoReconnectAttempt();
  }, delayMs);
}

async function runAutoReconnectAttempt() {
  if (
    !reconnectState.armed ||
    !reconnectState.targetAddress ||
    reconnectState.attemptsRemaining <= 0 ||
    state.controlConnected
  ) {
    if (state.controlConnected) {
      clearAutoReconnect();
    }
    return;
  }

  if (peerConnections.size > 0) {
    return;
  }

  if (meshState.takeoverInFlight || meshState.reconnectInFlight) {
    scheduleAutoReconnectAttempt(AUTO_RECONNECT_RETRY_DELAY_MS);
    return;
  }

  if (navigator.onLine === false) {
    reconnectState.waitingForOnline = true;
    return;
  }

  reconnectState.attemptInFlight = true;
  reconnectState.waitingForOnline = false;

  const attemptNumber = AUTO_RECONNECT_MAX_ATTEMPTS - reconnectState.attemptsRemaining + 1;
  const displayAddress = reconnectState.displayAddress || reconnectState.targetAddress;

  appendEvent(`Автореконнект ${attemptNumber}/${AUTO_RECONNECT_MAX_ATTEMPTS}: ${displayAddress}.`);

  try {
    await connectControlSocketCandidates([reconnectState.targetAddress], {
      roomName: reconnectState.roomName,
      displayAddress: reconnectState.displayAddress,
      preservePeers: true
    });
    appendEvent(`Автореконнект успешен: ${displayAddress}.`);
    clearAutoReconnect();
  } catch (error) {
    reconnectState.attemptsRemaining -= 1;

    if (reconnectState.attemptsRemaining > 0) {
      appendEvent(`Автореконнект не удался: ${error.message}. Повтор через 10 сек.`);
      scheduleAutoReconnectAttempt(AUTO_RECONNECT_RETRY_DELAY_MS);
    } else {
      reconnectState.armed = false;
      appendEvent(`Автореконнект остановлен: ${error.message}`);
    }
  } finally {
    reconnectState.attemptInFlight = false;
  }
}

function armAutoReconnect(reason = "") {
  if (!reconnectState.targetAddress || state.controlConnected) {
    return;
  }

  if (!reconnectState.armed || reconnectState.attemptsRemaining <= 0) {
    reconnectState.armed = true;
    reconnectState.attemptsRemaining = AUTO_RECONNECT_MAX_ATTEMPTS;
  }

  if (reconnectState.attemptInFlight || reconnectState.timer) {
    return;
  }

  if (navigator.onLine === false) {
    const shouldAnnounce = !reconnectState.waitingForOnline;
    reconnectState.waitingForOnline = true;
    if (shouldAnnounce) {
      appendEvent("Сеть недоступна. Ждём восстановления и попробуем вернуть последнюю комнату.");
    }
    return;
  }

  if (reason && reconnectState.attemptsRemaining === AUTO_RECONNECT_MAX_ATTEMPTS) {
    appendEvent("Пробуем автоматически вернуть control.");
  }

  scheduleAutoReconnectAttempt(0);
}

function closeCurrentControlSocket() {
  if (!state.socket) {
    return;
  }

  const socket = state.socket;
  state.socket = null;
  state.controlConnected = false;

  socket.onopen = null;
  socket.onmessage = null;
  socket.onclose = null;
  socket.onerror = null;

  try {
    socket.close();
  } catch (error) {
    void error;
  }
}

function handleControlSocketLoss(message = "") {
  if (!state.connectedAddress) {
    return;
  }

  rememberReconnectTarget(stripTransport(state.connectedAddress), state.roomLabel, state.displayAddress);

  const wasRecovering = state.controlRecovering;
  state.controlConnected = false;
  state.controlRecovering = true;
  setStatus("Control потерян", "error");
  renderRoomSummaries();

  if (!wasRecovering) {
    appendEvent(message || "Потеряна связь с сигнальным сервером.");
  }

  syncUsersFromMembership();
  startMeshControlLoop();
  scheduleLeaderElection("control-lost");
  if (!peerConnections.size) {
    armAutoReconnect("control-lost");
  }
}

function scheduleLeaderElection(reason = "") {
  if (!state.connectedAddress) {
    return;
  }

  if (meshState.electionTimer) {
    window.clearTimeout(meshState.electionTimer);
  }

  broadcastPeerControl({
    type: "leader-election",
    reason,
    leaderId: state.leaderId,
    users: getMembershipPayload()
  });

  meshState.electionTimer = window.setTimeout(() => {
    meshState.electionTimer = null;
    void evaluateLeaderElection(reason);
  }, LEADER_ELECTION_DELAY_MS);
}

async function evaluateLeaderElection(reason = "") {
  if (state.controlConnected || !state.connectedAddress) {
    return;
  }

  const nextLeaderId = getLeaderCandidateId();
  if (!nextLeaderId) {
    return;
  }

  state.leaderId = nextLeaderId;
  syncUsersFromMembership();

  if (nextLeaderId === state.nodeId) {
    await startLeaderTakeover(reason);
  }
}

async function startLeaderTakeover(reason = "") {
  if (meshState.takeoverInFlight || !state.connectedAddress) {
    return;
  }

  meshState.takeoverInFlight = true;
  state.leaderId = state.nodeId;
  ensureSelfMembership();
  syncUsersFromMembership();

  const roomName = sanitizeServerLabel(state.roomLabel || serverLabelInput.value, DEFAULT_ROOM_NAME);
  const portCandidates = [...new Set([
    getRoomPortCandidate(),
    Number(hostPortInput.value) || 0,
    3030
  ].filter((port) => Number.isInteger(port) && port >= 1024 && port <= 65535))];

  let response = null;
  let lastError = null;

  for (const port of portCandidates) {
    try {
      response = await getDesktopApi().startServer(port, roomName, state.nodeId);
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!response) {
    meshState.takeoverInFlight = false;
    appendEvent(`Не удалось поднять новый signaling server: ${lastError?.message || "неизвестная ошибка"}`);
    return;
  }

  const leaderAddresses = response.addresses?.length ? response.addresses : state.localIpAddresses;
  const localCandidates = buildAddressCandidates(leaderAddresses, response.port, true);
  const remoteCandidates = buildAddressCandidates(leaderAddresses, response.port, false);
  const displayAddress = remoteCandidates[0] || localCandidates[0];
  const takeoverId = globalThis.crypto?.randomUUID?.() || `${Date.now()}`;
  meshState.processedTakeovers.add(takeoverId);

  broadcastPeerControl({
    type: "takeover",
    takeoverId,
    leaderId: state.nodeId,
    username: state.nickname,
    roomName,
    port: response.port,
    displayAddress,
    addresses: remoteCandidates
  });

  hostInfo.textContent = remoteCandidates.length
    ? `Адреса для подключения: ${remoteCandidates.map((value) => `ws://${value}`).join(" · ")}`
    : `Адрес для подключения: ws://${displayAddress}`;
  hostPanelInfo.textContent = `Хост мигрировал на этот клиент. Раздавайте адрес: ws://${displayAddress}`;
  hostPortInput.value = String(response.port);
  serverLabelInput.value = roomName;
  serverAddressInput.value = displayAddress;

  try {
    await connectControlSocketCandidates(localCandidates, {
      roomName,
      displayAddress,
      preservePeers: true
    });
    appendEvent(`Хост мигрировал на ${state.nickname}${reason ? ` (${reason})` : ""}.`);
  } catch (error) {
    appendEvent(`Новый хост поднят, но control не переподключился: ${error.message}`);
  } finally {
    meshState.takeoverInFlight = false;
  }
}

async function reconnectToLeaderFromTakeover(payload) {
  if (!payload?.leaderId || payload.leaderId === state.nodeId || meshState.reconnectInFlight) {
    return;
  }

  const candidateAddresses = [...new Set([...(payload.addresses || []), payload.displayAddress || ""]
    .map((address) => sanitizeServerAddress(address))
    .filter(Boolean))];

  if (!candidateAddresses.length) {
    return;
  }

  meshState.reconnectInFlight = true;
  state.leaderId = sanitizeNodeId(payload.leaderId, state.leaderId);
  rememberReconnectTarget(
    candidateAddresses[0],
    sanitizeServerLabel(payload.roomName || state.roomLabel, DEFAULT_ROOM_NAME),
    sanitizeServerAddress(payload.displayAddress || candidateAddresses[0])
  );

  try {
    await connectControlSocketCandidates(candidateAddresses, {
      roomName: sanitizeServerLabel(payload.roomName || state.roomLabel, DEFAULT_ROOM_NAME),
      displayAddress: sanitizeServerAddress(payload.displayAddress || candidateAddresses[0]),
      preservePeers: true
    });
    appendEvent(`Control переподключён к новому хосту: ${sanitizeServerAddress(payload.displayAddress || candidateAddresses[0])}.`);
  } catch (error) {
    appendEvent(`Не удалось переподключиться к новому хосту: ${error.message}`);
  } finally {
    meshState.reconnectInFlight = false;
  }
}

function openControlSocketCandidate(address, { roomName = "", displayAddress = "", preservePeers = false } = {}) {
  const normalizedAddress = normalizeAddress(address);
  const cleanDisplayAddress = sanitizeServerAddress(displayAddress || stripTransport(normalizedAddress));

  if (!normalizedAddress) {
    return Promise.reject(new Error("Укажите IP:PORT сервера."));
  }

  const epoch = ++meshState.socketEpoch;

  return new Promise((resolve, reject) => {
    let settled = false;
    const socket = new WebSocket(normalizedAddress);
    const timeoutId = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        try {
          socket.close();
        } catch (error) {
          void error;
        }
        reject(new Error(`Таймаут подключения к ${cleanDisplayAddress}.`));
      }
    }, CONTROL_CONNECT_TIMEOUT_MS);

    const rejectAttempt = (error) => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(timeoutId);

      try {
        socket.close();
      } catch (closeError) {
        void closeError;
      }

      reject(error);
    };

    socket.onopen = () => {
      if (epoch !== meshState.socketEpoch) {
        rejectAttempt(new Error("Подключение устарело."));
        return;
      }

      state.socket = socket;
      state.selfId = state.nodeId;
      state.controlConnected = true;
      state.controlRecovering = false;
      state.roomLabel = sanitizeServerLabel(roomName, state.roomLabel || DEFAULT_ROOM_NAME);
      state.displayAddress = cleanDisplayAddress || state.displayAddress;
      state.connectedAddress = normalizedAddress;
      rememberReconnectTarget(stripTransport(normalizedAddress), state.roomLabel, cleanDisplayAddress);
      clearAutoReconnect();

      if (radioState.bot && radioState.bot.roomAddress !== normalizedAddress) {
        void stopRadioBot({
          silent: false,
          reason: "Радио остановлено: комната переподключилась к другому хосту."
        });
      }

      state.selectedServerId = state.savedServers.find((server) => server.address === state.displayAddress)?.id || null;
      serverLabelInput.value = state.roomLabel;
      serverAddressInput.value = state.displayAddress;
      renderSavedServers();
      renderRoomSummaries();
      setStatus("Подключено", "online");
      muteButton.disabled = false;
      disconnectButton.disabled = false;
      startMeshControlLoop();

      socket.send(JSON.stringify({
        type: "join",
        nodeId: state.nodeId,
        username: state.nickname,
        muted: state.isMuted
      }));

      if (!settled) {
        settled = true;
        window.clearTimeout(timeoutId);
        resolve();
      }
    };

    socket.onmessage = async (event) => {
      if (state.socket !== socket) {
        return;
      }

      const payload = JSON.parse(event.data);

      if (payload.type === "welcome") {
        state.selfId = state.nodeId;
        if (payload.leaderId) {
          state.leaderId = sanitizeNodeId(payload.leaderId, state.leaderId || state.nodeId);
        }

        applyUsers(payload.users, { leaderId: payload.leaderId });

        for (const peer of payload.peers || []) {
          await createPeerConnection(peer.id, peer.username, true);
        }

        if (!preservePeers) {
          appendEvent(`Вы вошли как ${state.nickname}.`);
        }

        return;
      }

      if (payload.type === "peer-joined") {
        applyUsers(payload.users, { leaderId: payload.leaderId });
        appendEvent(`${payload.peer.username} подключился.`);
        return;
      }

      if (payload.type === "peer-left") {
        closePeer(payload.peerId);
        applyUsers(payload.users, { leaderId: payload.leaderId });
        appendEvent(`${payload.peerUsername || "Участник"} отключился.`);
        return;
      }

      if (payload.type === "peer-presence") {
        applyUsers(payload.users, { leaderId: payload.leaderId });
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

    socket.onerror = () => {
      if (!settled) {
        rejectAttempt(new Error(`Не удалось подключиться к ${cleanDisplayAddress}.`));
        return;
      }

      appendEvent("Ошибка соединения с сигнальным сервером.");
    };

    socket.onclose = () => {
      if (!settled) {
        rejectAttempt(new Error(`Соединение закрыто: ${cleanDisplayAddress}.`));
        return;
      }

      if (state.socket === socket) {
        state.socket = null;
        handleControlSocketLoss(`Соединение закрыто: ${cleanDisplayAddress}.`);
      }
    };
  });
}

async function connectControlSocketCandidates(addresses, options = {}) {
  const candidates = [...new Set((addresses || [])
    .map((address) => sanitizeServerAddress(address))
    .filter(Boolean))];

  if (!candidates.length) {
    throw new Error("Нет адресов для переподключения.");
  }

  closeCurrentControlSocket();

  let lastError = null;
  for (const address of candidates) {
    try {
      await openControlSocketCandidate(address, options);
      return address;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Не удалось подключиться к signaling server.");
}

function setMuteState(nextMuted, source = "") {
  const targetMuted = Boolean(nextMuted);
  const changed = state.isMuted !== targetMuted;

  state.isMuted = targetMuted;
  if (state.isMuted && state.selfId) {
    state.speakingUsers.delete(state.selfId);
  }
  ensureSelfMembership();
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
  await stopRadioBot({ silent: true });
  clearAutoReconnect({ clearTarget: true });
  stopMeshControlLoop();
  closeCurrentControlSocket();

  for (const peerId of [...peerConnections.keys()]) {
    closePeer(peerId);
  }

  membershipDirectory.clear();
  peerControlChannels.clear();
  meshState.processedTakeovers.clear();
  participantVolumes.clear();
  state.selfId = null;
  state.leaderId = "";
  state.users = [];
  state.controlConnected = false;
  state.controlRecovering = false;
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
  const cleanAddress = sanitizeServerAddress(address);
  const cleanDisplayAddress = sanitizeServerAddress(displayAddress || cleanAddress);

  if (!cleanAddress) {
    throw new Error("Укажите IP:PORT сервера.");
  }

  clearAutoReconnect({ clearTarget: true });
  await persistNickname(profileNicknameInput.value, true);
  await disconnect(false);
  await ensureLocalAudio();

  meshState.processedTakeovers.clear();
  state.selfId = state.nodeId;
  state.leaderId = "";
  state.roomLabel = sanitizeServerLabel(roomName, cleanDisplayAddress || DEFAULT_ROOM_NAME);
  state.displayAddress = cleanDisplayAddress || cleanAddress;
  state.connectedAddress = normalizeAddress(cleanAddress);
  state.selectedServerId = state.savedServers.find((server) => server.address === state.displayAddress)?.id || null;
  ensureSelfMembership();
  renderSavedServers();
  renderRoomSummaries();
  setPage("room");
  startMeshControlLoop();

  try {
    await connectControlSocketCandidates([cleanAddress], {
      roomName: state.roomLabel,
      displayAddress: state.displayAddress,
      preservePeers: false
    });
  } catch (error) {
    await disconnect(false);
    throw error;
  }

  appendEvent(`Соединение открыто: ${state.displayAddress}`);
}

async function hostAndJoin() {
  const port = Number(hostPortInput.value);
  const response = await getDesktopApi().startServer(
    port,
    sanitizeServerLabel(serverLabelInput.value, "Локальный сервер"),
    state.nodeId
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
    const isRadio = isRadioBotUser(user);
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
    role.textContent = user.id === state.selfId ? "локально" : isRadio ? "radio" : "peer";

    const status = document.createElement("span");
    if (user.id === state.selfId) {
      status.textContent = state.isMuted ? "микрофон выключен" : "микрофон активен";
    } else if (isRadio) {
      status.textContent = getUserStatusLabel(user);
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
      sliderLabel.textContent = isRadio ? "Громкость станции" : "Громкость пользователя";

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
  state.speakerVolume = sanitizeVolume(Number(outputVolumeInput.value) / 100, state.speakerVolume, { min: 0, max: 1 });
  renderVolumeControls();
  applySpeakerVolume();
});

outputVolumeInput.addEventListener("change", async () => {
  try {
    await persistAudioMixPreferences({ speakerVolume: state.speakerVolume }, true);
  } catch (error) {
    appendEvent(`Не удалось сохранить громкость комнаты: ${error.message}`);
  }
});

inputVolumeInput.addEventListener("input", () => {
  state.microphoneVolume = sanitizeVolume(Number(inputVolumeInput.value) / 100, state.microphoneVolume, { min: 0, max: 2 });
  renderVolumeControls();
  applyMicrophoneVolume();
  updateLocalMicLevel(state.localMicRawLevel);
});

inputVolumeInput.addEventListener("change", async () => {
  try {
    await persistAudioMixPreferences({ microphoneVolume: state.microphoneVolume }, true);
  } catch (error) {
    appendEvent(`Не удалось сохранить чувствительность микрофона: ${error.message}`);
  }
});

networkBufferModeInput.addEventListener("change", async () => {
  const cleanMode = sanitizeNetworkBufferMode(networkBufferModeInput.value, state.networkBufferMode);
  if (cleanMode === state.networkBufferMode) {
    renderNetworkBufferMode();
    return;
  }

  state.networkBufferMode = cleanMode;
  renderNetworkBufferMode();
  applyNetworkBufferModeToActivePeers();
  await persistNetworkBufferMode(cleanMode, true);
  appendEvent(`Сетевая буферизация: ${getNetworkBufferModeLabel(state.networkBufferMode)}.`);
});

inputDeviceSelect.addEventListener("change", async () => {
  const previousDeviceId = state.audioInputDeviceId;
  const requestedDeviceId = sanitizeMediaDeviceId(inputDeviceSelect.value, previousDeviceId || DEFAULT_AUDIO_INPUT_DEVICE_ID);
  if (requestedDeviceId === previousDeviceId) {
    return;
  }

  state.audioInputDeviceId = requestedDeviceId;
  renderAudioDeviceOptions();

  try {
    await rebuildLocalAudioPipeline();
    await refreshMediaDevices({ requestAudio: true });
    await persistAudioDevicePreferences({ audioInputDeviceId: state.audioInputDeviceId }, true);
    appendEvent(`Устройство ввода: ${inputDeviceSelect.selectedOptions[0]?.textContent || "микрофон"}.`);
  } catch (error) {
    state.audioInputDeviceId = previousDeviceId;
    renderAudioDeviceOptions();
    await rebuildLocalAudioPipeline().catch(() => {});
    selfTestStatus.textContent = `Не удалось переключить микрофон: ${error.message}`;
    appendEvent(`Не удалось переключить микрофон: ${error.message}`);
  }
});

outputDeviceSelect.addEventListener("change", async () => {
  const previousDeviceId = state.audioOutputDeviceId;
  const requestedDeviceId = sanitizeMediaDeviceId(outputDeviceSelect.value, previousDeviceId || DEFAULT_AUDIO_OUTPUT_DEVICE_ID);
  if (requestedDeviceId === previousDeviceId) {
    return;
  }

  state.audioOutputDeviceId = requestedDeviceId;
  renderAudioDeviceOptions();

  try {
    await applyOutputDeviceToActiveAudio();
    await persistAudioDevicePreferences({ audioOutputDeviceId: state.audioOutputDeviceId }, true);
    appendEvent(`Устройство вывода: ${outputDeviceSelect.selectedOptions[0]?.textContent || "динамик"}.`);
  } catch (error) {
    state.audioOutputDeviceId = previousDeviceId;
    renderAudioDeviceOptions();
    await applyOutputDeviceToActiveAudio().catch(() => {});
    selfTestStatus.textContent = `Не удалось переключить динамик: ${error.message}`;
  }
});

overlayPositionSelect.addEventListener("change", async () => {
  const previousPosition = state.overlayPosition;
  const nextPosition = sanitizeOverlayPosition(overlayPositionSelect.value, previousPosition || DEFAULT_OVERLAY_POSITION);
  if (nextPosition === previousPosition) {
    return;
  }

  state.overlayPosition = nextPosition;
  renderOverlayPosition();

  try {
    await persistOverlaySettings({ overlayPosition: nextPosition }, true);
    appendEvent(`Позиция overlay: ${overlayPositionSelect.selectedOptions[0]?.textContent || nextPosition}.`);
  } catch (error) {
    state.overlayPosition = previousPosition;
    renderOverlayPosition();
    appendEvent(`Не удалось изменить позицию overlay: ${error.message}`);
  }
});

overlayEnabledInput.addEventListener("change", async () => {
  const previousValue = state.overlayEnabled;
  const nextValue = Boolean(overlayEnabledInput.checked);
  if (nextValue === previousValue) {
    renderOverlayPosition();
    return;
  }

  state.overlayEnabled = nextValue;
  renderOverlayPosition();
  renderRoomSummaries();

  try {
    await persistOverlaySettings({ overlayEnabled: nextValue }, true);
    appendEvent(nextValue ? "Overlay включён." : "Overlay выключен.");
  } catch (error) {
    state.overlayEnabled = previousValue;
    renderOverlayPosition();
    renderRoomSummaries();
    appendEvent(`Не удалось изменить состояние overlay: ${error.message}`);
  }
});

overlayLayoutSelect.addEventListener("change", async () => {
  const previousLayout = state.overlayLayout;
  const nextLayout = sanitizeOverlayLayout(overlayLayoutSelect.value, previousLayout || DEFAULT_OVERLAY_LAYOUT);
  if (nextLayout === previousLayout) {
    renderOverlayPosition();
    return;
  }

  state.overlayLayout = nextLayout;
  renderOverlayPosition();

  try {
    await persistOverlaySettings({ overlayLayout: nextLayout }, true);
    appendEvent(`Раскладка overlay: ${overlayLayoutSelect.selectedOptions[0]?.textContent || nextLayout}.`);
  } catch (error) {
    state.overlayLayout = previousLayout;
    renderOverlayPosition();
    appendEvent(`Не удалось изменить раскладку overlay: ${error.message}`);
  }
});

overlayAvatarSizeInput.addEventListener("input", () => {
  const previewSize = sanitizeOverlayAvatarSize(overlayAvatarSizeInput.value, state.overlayAvatarSize || DEFAULT_OVERLAY_AVATAR_SIZE);
  overlayAvatarSizeValue.textContent = `${previewSize}px`;
});

overlayAvatarSizeInput.addEventListener("change", async () => {
  const previousSize = state.overlayAvatarSize;
  const nextSize = sanitizeOverlayAvatarSize(overlayAvatarSizeInput.value, previousSize || DEFAULT_OVERLAY_AVATAR_SIZE);
  if (nextSize === previousSize) {
    renderOverlayPosition();
    return;
  }

  state.overlayAvatarSize = nextSize;
  renderOverlayPosition();

  try {
    await persistOverlaySettings({ overlayAvatarSize: nextSize }, true);
    appendEvent(`Размер avatar overlay: ${nextSize}px.`);
  } catch (error) {
    state.overlayAvatarSize = previousSize;
    renderOverlayPosition();
    appendEvent(`Не удалось изменить размер avatar overlay: ${error.message}`);
  }
});

selfTestButton.addEventListener("click", async () => {
  if (state.selfTestActive) {
    stopSelfTestPlayback();
    appendEvent("Проверка микрофона остановлена.");
    return;
  }

  try {
    await startSelfTestPlayback();
  } catch (error) {
    void error;
  }
});

radioButton.addEventListener("click", () => {
  if (radioState.modalOpen) {
    closeRadioModal();
    return;
  }

  void openRadioModal();
});

radioModalBackdrop.addEventListener("click", () => {
  closeRadioModal();
});

radioModalCloseButton.addEventListener("click", () => {
  closeRadioModal();
});

radioRefreshButton.addEventListener("click", () => {
  void loadRadioStations({ force: true }).catch((error) => {
    appendEvent(`Не удалось обновить список станций: ${error.message}`);
  });
});

radioStopButton.addEventListener("click", async () => {
  await stopRadioBot();
  closeRadioModal();
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
    if (radioState.modalOpen) {
      closeRadioModal();
    }
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

if (navigator.mediaDevices?.addEventListener) {
  navigator.mediaDevices.addEventListener("devicechange", () => {
    void refreshMediaDevices({ requestAudio: false });
  });
}

window.addEventListener("online", () => {
  if (
    !reconnectState.armed ||
    reconnectState.attemptsRemaining <= 0 ||
    state.controlConnected ||
    peerConnections.size > 0
  ) {
    return;
  }

  reconnectState.waitingForOnline = false;
  appendEvent("Сеть восстановлена. Пробуем вернуть последнюю комнату.");

  if (!reconnectState.timer && !reconnectState.attemptInFlight) {
    scheduleAutoReconnectAttempt(0);
  }
});

window.addEventListener("offline", () => {
  if (!state.connectedAddress) {
    return;
  }

  rememberReconnectTarget(stripTransport(state.connectedAddress), state.roomLabel, state.displayAddress);

  if (reconnectState.timer) {
    window.clearTimeout(reconnectState.timer);
    reconnectState.timer = null;
  }

  armAutoReconnect("offline");
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

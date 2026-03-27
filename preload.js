const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApi", {
  getIps: () => ipcRenderer.invoke("network:get-ips"),
  getSettings: () => ipcRenderer.invoke("settings:get"),
  updateSettings: (patch) => ipcRenderer.invoke("settings:update", patch),
  getUpdaterState: () => ipcRenderer.invoke("updater:get-state"),
  checkForUpdates: () => ipcRenderer.invoke("updater:check"),
  downloadUpdate: () => ipcRenderer.invoke("updater:download"),
  installUpdate: () => ipcRenderer.invoke("updater:install"),
  getRadioStations: (baseUrl) => ipcRenderer.invoke("radio:get-stations", baseUrl),
  getRadioProxyOrigin: () => ipcRenderer.invoke("radio:get-proxy-origin"),
  refreshServerCatalog: (savedServers) => ipcRenderer.invoke("server:refresh-catalog", savedServers),
  startServer: (port, name, ownerNodeId) => ipcRenderer.invoke("server:start", { port, name, ownerNodeId }),
  stopServer: () => ipcRenderer.invoke("server:stop"),
  readAssetText: (relativePath) => ipcRenderer.invoke("assets:read-text", relativePath),
  readAssetBinary: (relativePath) => ipcRenderer.invoke("assets:read-binary", relativePath),
  updateOverlay: (payload) => ipcRenderer.send("overlay:update", payload),
  onMuteToggleRequested: (callback) => {
    ipcRenderer.removeAllListeners("mute:toggle-request");
    ipcRenderer.on("mute:toggle-request", () => callback());
  },
  onOverlayState: (callback) => {
    ipcRenderer.removeAllListeners("overlay:state");
    ipcRenderer.on("overlay:state", (_event, payload) => callback(payload));
  },
  onUpdaterState: (callback) => {
    ipcRenderer.removeAllListeners("updater:state");
    ipcRenderer.on("updater:state", (_event, payload) => callback(payload));
  }
});

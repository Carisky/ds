# DS Voice LAN

Minimal Electron + Node.js voice room over IP and port.

## Version 0.2.3

- Global room volume control.
- Microphone sensitivity control.
- RNNoise-based suppression for a result closer to Krisp.
- Removed the old gain-based noise gate that caused audible volume pumping.
- Fixed preload bridge initialization for packaged builds so `window.desktopApi` is available again.
- Added persisted nickname loading/saving between launches.
- Added a system-wide microphone mute hotkey with Electron `globalShortcut`.
- Added a Discord-like multi-page UI with saved servers in a left icon rail.
- Added per-user room volume controls and a minimized overlay window with participant icons.
- Overlay is now click-through, pinned to the top-left corner, icon-only, with green speaking outlines.
- Removed the constant glass-like idle border around overlay avatars.
- Global mute hotkey field now captures pressed keys instead of requiring manual typing.

## What it does

- One user starts a signaling server on a chosen port.
- Other users run the same app and connect by `IP:PORT`.
- Voice is transferred peer-to-peer with WebRTC.
- Works as a lightweight Discord-style voice room MVP.

## Development

```powershell
npm install
npm start
```

If your environment globally sets `ELECTRON_RUN_AS_NODE=1`, the provided npm scripts already clear it before launch.

## Windows build

```powershell
npm run dist
```

The installer will be created in `dist\`.

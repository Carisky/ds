const overlayRoot = document.getElementById("overlayRoot");
const overlayParticipants = document.getElementById("overlayParticipants");

function createMuteIcon() {
  const badge = document.createElement("div");
  badge.className = "overlay-mute-icon";
  badge.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5A3.5 3.5 0 0 0 8.5 6v1.14l7 7V6A3.5 3.5 0 0 0 12 2.5Zm7.2 8.5a1 1 0 1 0-2 0 5.13 5.13 0 0 1-.6 2.38l1.47 1.47c.73-1.08 1.13-2.41 1.13-3.85ZM12 18.5a5.5 5.5 0 0 1-5.5-5.5 1 1 0 1 0-2 0 7.5 7.5 0 0 0 6.5 7.43V22h2v-1.57a7.48 7.48 0 0 0 3.66-1.38l-1.45-1.45a5.44 5.44 0 0 1-3.21.9Zm8.2 2.8-16-16a1 1 0 1 0-1.4 1.4l16 16a1 1 0 0 0 1.4-1.4Z"/>
    </svg>
  `;
  return badge;
}

function clampOverlayAvatarSize(value) {
  const numeric = Math.round(Number(value));
  if (!Number.isFinite(numeric)) {
    return 56;
  }

  return Math.min(96, Math.max(36, numeric));
}

function applyOverlaySettings(settings = {}) {
  const avatarSize = clampOverlayAvatarSize(settings.avatarSize);
  const layout = settings.layout === "row" ? "row" : "column";
  const gap = Math.max(8, Math.round(avatarSize * 0.22));
  const badgeSize = Math.max(18, Math.round(avatarSize * 0.4));
  const itemSize = avatarSize + Math.max(10, Math.round(avatarSize * 0.18));
  const speakingRing = Math.max(2, Math.round(avatarSize * 0.07));

  overlayRoot.dataset.layout = layout;
  overlayRoot.style.setProperty("--overlay-avatar-size", `${avatarSize}px`);
  overlayRoot.style.setProperty("--overlay-item-size", `${itemSize}px`);
  overlayRoot.style.setProperty("--overlay-gap", `${gap}px`);
  overlayRoot.style.setProperty("--overlay-badge-size", `${badgeSize}px`);
  overlayRoot.style.setProperty("--overlay-speaking-ring", `${speakingRing}px`);
}

function renderOverlay(state) {
  applyOverlaySettings(state.settings || {});
  overlayParticipants.innerHTML = "";

  for (const participant of state.participants || []) {
    const item = document.createElement("div");
    item.className = "overlay-user";
    item.classList.toggle("is-self", Boolean(participant.self));
    item.classList.toggle("is-speaking", Boolean(participant.speaking));

    const avatar = document.createElement("div");
    avatar.className = "overlay-avatar";
    avatar.textContent = participant.initials || "U";
    item.append(avatar);

    if (participant.muted) {
      item.append(createMuteIcon());
    }

    overlayParticipants.append(item);
  }
}

window.desktopApi?.onOverlayState((state) => {
  renderOverlay(state);
});

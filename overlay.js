const overlayParticipants = document.getElementById("overlayParticipants");

function createMuteIcon() {
  const badge = document.createElement("div");
  badge.className = "overlay-mute-icon";
  badge.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.36 17.3 16.95 18.7 5.3 7.05l1.4-1.41 11.66 11.66ZM14 5.83v5.34l-2-2V5.83a2 2 0 1 0-4 0v1.34l-2-2V5.83a4 4 0 1 1 8 0Zm4.74 5.27A6.97 6.97 0 0 1 19 13a7 7 0 0 1-7 7 6.97 6.97 0 0 1-1.9-.26l1.66-1.66c.08.01.16.02.24.02a5 5 0 0 0 5-5c0-.08-.01-.16-.02-.24l1.76-1.76ZM12 22a9 9 0 0 1-9-9h2a7 7 0 0 0 11.95 4.95l1.42 1.42A8.97 8.97 0 0 1 12 22Z"/>
    </svg>
  `;
  return badge;
}

function renderOverlay(state) {
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

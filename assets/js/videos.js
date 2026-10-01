// The videos page: controls for the embedded YouTube players.
//
// Each player sits in a <details> element and is embedded with enablejsapi=1,
// which lets the page send it commands with postMessage (YouTube's IFrame
// Player API, without loading YouTube's own script). This adds:
//   - closing a disclosure pauses its video; opening it again resumes;
//   - a "Playback speed" select above each player, applied through the API.
//     The chosen speed applies to every video on the page and is remembered in
//     this browser, since YouTube's own speed setting sits in its player's
//     menu and keyboard shortcuts, which are hard to reach with a screen reader.
// Without this script the players still work, with YouTube's own controls.

const playerOrigin = "https://www.youtube-nocookie.com";
const storageKey = "eyesunstrung-video-speed";

const players = [...document.querySelectorAll("details.video")].map((details) => ({
  details,
  iframe: details.querySelector("iframe"),
  select: details.querySelector("select"),
}));

let speed = 1;
try {
  speed = Number(localStorage.getItem(storageKey)) || 1;
} catch {
  // Storage can be unavailable (private windows, blocked site data); use normal speed.
}

function send(iframe, func, args = []) {
  iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), playerOrigin);
}

for (const player of players) {
  player.select.value = String(speed);
  player.select.closest("label").hidden = false;

  // Ask the player to report its state, so we know when it is ready for commands.
  player.iframe.addEventListener("load", () => {
    player.iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: player.iframe.id, channel: "widget" }),
      playerOrigin,
    );
  });

  player.details.addEventListener("toggle", () => {
    if (!player.details.open) send(player.iframe, "pauseVideo");
  });

  player.select.addEventListener("change", () => {
    speed = Number(player.select.value);
    try {
      localStorage.setItem(storageKey, String(speed));
    } catch {
      // Not remembered; it still applies for this visit.
    }
    for (const other of players) {
      other.select.value = String(speed);
      send(other.iframe, "setPlaybackRate", [speed]);
    }
  });
}

// When a player first reports in, give it the chosen speed.
const ready = new Set();
window.addEventListener("message", (event) => {
  if (event.origin !== playerOrigin) return;
  let data;
  try {
    data = JSON.parse(event.data);
  } catch {
    return;
  }
  const player = players.find((p) => p.iframe.contentWindow === event.source);
  if (!player || ready.has(player)) return;
  if (data.event === "onReady" || data.event === "initialDelivery") {
    ready.add(player);
    send(player.iframe, "setPlaybackRate", [speed]);
  }
});

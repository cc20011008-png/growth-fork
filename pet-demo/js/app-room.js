import { loadState, getPet } from "./lib/store.js";
import { mountOnboarding } from "./views/onboarding.js";
import { mountRoomChat } from "./views/roomChat.js";
import { SilverPetRoomScene } from "./room/silver-room-scene.js";

const state = loadState();
let scene = null;

function start() {
  const pet = getPet(state);
  const stage = document.getElementById("room-stage");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const bootChat = () => {
    mountRoomChat(state);
  };

  if (!stage) {
    bootChat();
    return;
  }

  scene = new SilverPetRoomScene(stage, {
    petImage: pet.image,
    reducedMotion,
  });

  scene
    .start()
    .then(() => {
      stage.classList.add("ready");
      window.setTimeout(bootChat, reducedMotion ? 0 : 420);
    })
    .catch(() => {
      stage.classList.add("fallback");
      const img = document.createElement("img");
      img.className = "room-fallback-pet";
      img.src = pet.image;
      img.alt = pet.name;
      stage.append(img);
      bootChat();
    });
}

mountOnboarding(state, { onDone: start });
if (state.onboarded) start();

window.addEventListener("beforeunload", () => scene?.dispose());

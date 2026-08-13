import { loadState, getPet, saveState } from "./lib/store.js";
import { mountOnboarding } from "./views/onboarding.js";
import { mountRoomChat } from "./views/roomChat.js";
import { mountLetterSouvenir } from "./views/letterSouvenir.js";
import { mintReturnLetter } from "./services/petAgent.js";
import { SilverPetRoomScene } from "./room/silver-room-scene.js";

const state = loadState();
let scene = null;

function start() {
  const pet = getPet(state);
  const stage = document.getElementById("room-stage");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Demo C: every homepage open simulates the pet just returning with one letter.
  mintReturnLetter(state);
  saveState(state);

  const bootChat = () => {
    mountRoomChat(state);
    mountLetterSouvenir(state, {
      onAccept: (letter) => {
        if (!letter?.skill?.detailId) return;
        window.setTimeout(() => {
          location.href = `../skill-detail.html?id=${encodeURIComponent(letter.skill.detailId)}`;
        }, 480);
      },
    });
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

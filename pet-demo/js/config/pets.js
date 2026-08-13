/** @typedef {'cat' | 'dog' | 'capybara'} PetId */

/** @type {Record<PetId, { id: PetId; name: string; personality: string; greeting: string; image: string; imageSolid: string; stageImage: string; faceImage: string; voice: (s: string) => string }>} */
export const PETS = {
  cat: {
    id: "cat",
    name: "小猫",
    personality: "温柔 · 松弛",
    greeting: "慢一点也没关系，我们先走一小步。",
    image: "../assets/companion-cat-transparent.png",
    imageSolid: "../assets/companion-cat.png",
    stageImage: "../assets/companion-cat-chrome-bowl-cut.png",
    faceImage: "../assets/companion-cat-face.png",
    voice: (s) => s,
  },
  dog: {
    id: "dog",
    name: "小狗",
    personality: "热情 · 行动派",
    greeting: "准备好了吗？我们现在就出发！",
    image: "../assets/companion-dog-transparent.png",
    imageSolid: "../assets/companion-dog.png",
    stageImage: "../assets/companion-dog-chrome-bowl-cut.png",
    faceImage: "../assets/companion-dog-transparent.png",
    voice: (s) => s.replace(/慢慢|不着急/g, "马上"),
  },
  capybara: {
    id: "capybara",
    name: "水豚",
    personality: "稳定 · 不焦虑",
    greeting: "没完成也没关系，今天接着来。",
    image: "../assets/companion-capybara-transparent.png",
    imageSolid: "../assets/companion-capybara.png",
    stageImage: "../assets/companion-capybara-chrome-bowl-cut.png",
    faceImage: "../assets/companion-capybara-transparent.png",
    voice: (s) => s,
  },
};

export const PET_LIST = Object.values(PETS);
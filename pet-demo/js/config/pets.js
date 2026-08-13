/** @typedef {'cat' | 'dog' | 'capybara'} PetId */

/**
 * Daily check-in copy: bubble 1 = care hello, bubble 2 = ask about today.
 * `{name}` is replaced with the user's name when present.
 * @type {Record<PetId, Array<{ hello: string; ask: string }>>}
 */
export const DAILY_GREETINGS = {
  cat: [
    {
      hello: "{name}，你来啦。我在这儿等你一会儿了。",
      ask: "今天想学点什么？还是有哪件事想慢慢推进一下？",
    },
    {
      hello: "嘿，{name}。今天还好吗？不着急，我陪着你。",
      ask: "你现在最想做的是什么？跟我说一声就好。",
    },
    {
      hello: "看到你了，{name}。先喘口气，我在这儿。",
      ask: "今天想学新的，还是把昨天没做完的接着弄？",
    },
  ],
  dog: [
    {
      hello: "{name}！你来啦～我一直在等你！",
      ask: "今天想学点什么？还是有哪件事想先搞定？我们一起开干！",
    },
    {
      hello: "嘿 {name}，早上好呀！看到你我就开心了。",
      ask: "今天最想冲哪一件？学习、作业，还是别的都可以跟我说！",
    },
    {
      hello: "{name}，你终于来啦！我尾巴都要摇起来了。",
      ask: "今天想做什么？告诉我，我马上陪你推进下一步！",
    },
    {
      hello: "哇，{name}来了！今天辛苦了没？我在这儿陪你。",
      ask: "想学什么、想做什么都行——你说，我们现在就开始？",
    },
  ],
  capybara: [
    {
      hello: "{name}，你来了。慢慢来也没关系，我在。",
      ask: "今天想学点什么？或者有哪一件事想先稳稳做完？",
    },
    {
      hello: "嗨，{name}。今天怎么样？不焦虑，我们按自己的节奏。",
      ask: "你现在最想推进的是什么？跟我说一声就行。",
    },
    {
      hello: "{name}，又见面了。我先在这儿陪着你。",
      ask: "今天想做点学习，还是把某件具体的事搞定？",
    },
  ],
};

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

/**
 * Pick one daily greeting pair for the pet, with optional user name filled in.
 * @param {{ id: PetId; name: string }} pet
 * @param {string} [userName]
 */
export function pickDailyGreeting(pet, userName = "") {
  const pool = DAILY_GREETINGS[pet.id] || DAILY_GREETINGS.dog;
  const pair = pool[Math.floor(Math.random() * pool.length)];
  const name = (userName || "").trim();
  const fill = (text) => {
    if (name) return text.replaceAll("{name}", name);
    return text
      .replaceAll("{name}！", "嘿！")
      .replaceAll("{name}，", "")
      .replaceAll("嘿 {name}，", "嘿，")
      .replaceAll("{name}", "你");
  };
  return {
    hello: fill(pair.hello).replace(/\s{2,}/g, " ").trim(),
    ask: fill(pair.ask).replace(/\s{2,}/g, " ").trim(),
  };
}
/* Growth Fork · 附近创作者演示数据（校园级位置，非个人精确定位） */
(function (root) {
  const skill = function (id, title, extra) {
    return Object.assign({
      id: id,
      title: title,
      typeLabel: "单 Skill",
      users: "320",
      href: "skill-detail.html?id=" + id
    }, extra || {});
  };

  root.GROWTH_CREATORS = [
    {
      id: "guyan",
      name: "顾言",
      role: "校园招聘博主",
      school: "清华大学",
      schoolId: "thu",
      area: "清华园附近",
      lat: 40.0026,
      lng: 116.3268,
      avatar: "assets/creators/guyan.jpg",
      bio: "把社团和实验室经历写成能投递的项目。常在招聘季帮同学改简历口径。",
      followers: 1284,
      uses: 2189,
      published: [
        skill("resume", "社团经历项目化表达", { typeLabel: "单 Skill", users: "2,189" }),
        skill("resume", "实验室经历写成简历项目", { typeLabel: "单 Skill", users: "2,640" })
      ],
      used: [
        skill("interview", "运营岗模拟面试追问", { users: "318" }),
        skill("career", "内容运营实习上岸路线", { typeLabel: "专家路径", users: "1,284" })
      ],
      saved: [
        skill("research", "夏令营材料清单与陈述", { typeLabel: "专家路径", users: "672" })
      ]
    },
    {
      id: "linran",
      name: "林然",
      role: "前大厂运营实习生",
      school: "北京邮电大学",
      schoolId: "bupt",
      area: "北邮校园附近",
      lat: 39.9628,
      lng: 116.3582,
      avatar: "assets/creators/linran.jpg",
      bio: "按北邮同学真实投递节奏，把提前批拆成能完成的 28 天。",
      followers: 962,
      uses: 3382,
      published: [
        skill("career", "互联网提前批 28 天冲刺", { typeLabel: "专家路径", users: "3,102" }),
        skill("career", "大厂后端实习投递", { typeLabel: "专家路径", users: "2,280" })
      ],
      used: [
        skill("resume", "课程项目写成实习作品", { users: "1,670" }),
        skill("exam", "机试冲刺周计划", { users: "1,980" })
      ],
      saved: [
        skill("interview", "后端基础与项目追问", { users: "1,102" })
      ]
    },
    {
      id: "zhouzhi",
      name: "周知",
      role: "认证专家 · 科研导师",
      school: "北京大学",
      schoolId: "pku",
      area: "燕园附近",
      lat: 39.9914,
      lng: 116.3056,
      avatar: "assets/creators/zhouzhi.jpg",
      bio: "带没有科研经历的同学走完第一份研究计划和夏令营材料。",
      followers: 2106,
      uses: 1874,
      published: [
        skill("research", "科研入门：从读论文到找选题", { typeLabel: "专家路径", users: "672" }),
        skill("research", "CS 夏令营材料时间线", { typeLabel: "专家路径", users: "1,874" })
      ],
      used: [
        skill("exam", "学术写作周计划", { users: "1,560" })
      ],
      saved: [
        skill("demo", "社会调研一周共创", { typeLabel: "组合路径", users: "487" })
      ]
    },
    {
      id: "azhe",
      name: "阿哲",
      role: "模拟面试创作者",
      school: "北京理工大学",
      schoolId: "bit",
      area: "北理中关村校区附近",
      lat: 39.9582,
      lng: 116.3174,
      avatar: "assets/creators/azhe.jpg",
      bio: "按真实面试节奏追问，帮你补案例细节和表达漏洞。",
      followers: 448,
      uses: 744,
      published: [
        skill("interview", "产品岗追问模拟", { users: "744" }),
        skill("interview", "硬件 / 算法岗模拟面", { users: "421" })
      ],
      used: [
        skill("career", "国防特色简历表达", { typeLabel: "专家路径", users: "890" })
      ],
      saved: [
        skill("exam", "考研 408 复习生成器", { users: "2,340" })
      ]
    },
    {
      id: "mia",
      name: "Mia",
      role: "学习效率博主",
      school: "北京师范大学",
      schoolId: "bnu",
      area: "北师大校园附近",
      lat: 39.9619,
      lng: 116.3658,
      avatar: "assets/creators/mia.jpg",
      bio: "按剩余天数生成能完成的复习清单，不写假计划。",
      followers: 1730,
      uses: 3214,
      published: [
        skill("exam", "期末复习计划生成器", { users: "3,214" }),
        skill("exam", "教资面试追问清单", { users: "1,440" })
      ],
      used: [
        skill("research", "教育研究入门一周", { typeLabel: "专家路径", users: "612" })
      ],
      saved: [
        skill("resume", "教育实习写成项目", { users: "388" })
      ]
    },
    {
      id: "qingqing",
      name: "清清",
      role: "选调上岸学姐",
      school: "中国人民大学",
      schoolId: "ruc",
      area: "人大校园附近",
      lat: 39.9696,
      lng: 116.3186,
      avatar: "assets/creators/qingqing.jpg",
      bio: "把选调材料和面试故事按本校节奏排开，适合公管和社科同学。",
      followers: 806,
      uses: 1102,
      published: [
        skill("career", "选调生材料清单", { typeLabel: "专家路径", users: "1,102" })
      ],
      used: [
        skill("resume", "商赛与调研项目化", { users: "864" }),
        skill("exam", "期末论文周计划", { users: "933" })
      ],
      saved: [
        skill("research", "社科研究计划入门", { typeLabel: "专家路径", users: "477" })
      ]
    },
    {
      id: "moyou",
      name: "模友",
      role: "建模社共创者",
      school: "北京理工大学",
      schoolId: "bit",
      area: "北理校园西门附近",
      lat: 39.9564,
      lng: 116.3138,
      avatar: "assets/creators/moyou.jpg",
      bio: "48 小时内帮新手队选定可交付、有数据的赛题方向。",
      followers: 391,
      uses: 1120,
      published: [
        skill("demo", "数学建模国赛避坑", { typeLabel: "组合路径", users: "1,120" })
      ],
      used: [
        skill("resume", "智能车经历项目化", { users: "508" })
      ],
      saved: [
        skill("demo", "竞赛 Demo 一周共创营", { typeLabel: "组合路径", users: "493" })
      ]
    },
    {
      id: "feng",
      name: "阿航",
      role: "冯如杯项目教练",
      school: "北京航空航天大学",
      schoolId: "buaa",
      area: "北航学院路附近",
      lat: 39.9808,
      lng: 116.3464,
      avatar: "assets/creators/feng.jpg",
      bio: "把航模和竞赛作品改成评委能听懂的问题、方法和结果。",
      followers: 527,
      uses: 776,
      published: [
        skill("demo", "冯如杯项目叙事一周", { typeLabel: "组合路径", users: "776" }),
        skill("resume", "航模竞赛写成项目", { users: "433" })
      ],
      used: [
        skill("career", "航天院所实习投递", { typeLabel: "专家路径", users: "640" })
      ],
      saved: [
        skill("research", "沈元学院保研材料", { typeLabel: "专家路径", users: "512" })
      ]
    },
    {
      id: "trade",
      name: "许川",
      role: "商科实习教练",
      school: "对外经济贸易大学",
      schoolId: "uibe",
      area: "贸大惠新附近",
      lat: 39.9801,
      lng: 116.4242,
      avatar: "assets/creators/trade.jpg",
      bio: "双语简历和四大 / 互金网申，按贸大校招节点拆任务。",
      followers: 614,
      uses: 860,
      published: [
        skill("resume", "双语商科简历打磨", { users: "722" }),
        skill("career", "四大 / 互金实习 21 天", { typeLabel: "专家路径", users: "860" })
      ],
      used: [
        skill("interview", "英文面试追问", { users: "410" })
      ],
      saved: [
        skill("demo", "商赛一周路演", { typeLabel: "组合路径", users: "298" })
      ]
    },
    {
      id: "cai",
      name: "周禾",
      role: "金融实习创作者",
      school: "中央财经大学",
      schoolId: "cufe",
      area: "中财校园附近",
      lat: 39.9576,
      lng: 116.3772,
      avatar: "assets/creators/cai.jpg",
      bio: "从投递名单到面试故事，按中财校友节奏走完金融实习网申。",
      followers: 488,
      uses: 790,
      published: [
        skill("career", "金融实习网申冲刺", { typeLabel: "专家路径", users: "790" })
      ],
      used: [
        skill("resume", "量化 / 研究助理项目化", { users: "512" }),
        skill("exam", "CPA / 考研并行周计划", { users: "1,120" })
      ],
      saved: [
        skill("interview", "金融市场案例追问", { users: "344" })
      ]
    }
  ];

  root.MY_MAP_ORIGIN = { lat: 40.0034, lng: 116.3322, label: "你在清华东门附近" };

  root.creatorById = function creatorById(id) {
    return root.GROWTH_CREATORS.find(function (c) { return c.id === id; });
  };

  var FOLLOW_KEY = "growth-fork-follows";

  root.readFollows = function readFollows() {
    try {
      var raw = localStorage.getItem(FOLLOW_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  };

  root.isFollowing = function isFollowing(id) {
    return root.readFollows().indexOf(id) !== -1;
  };

  root.toggleFollow = function toggleFollow(id) {
    var list = root.readFollows();
    var i = list.indexOf(id);
    if (i === -1) list.push(id);
    else list.splice(i, 1);
    localStorage.setItem(FOLLOW_KEY, JSON.stringify(list));
    return i === -1;
  };

  root.followerCount = function followerCount(creator) {
    return creator.followers + (root.isFollowing(creator.id) ? 1 : 0);
  };

  /* —— Skill 需求悬赏 —— */
  var BOUNTY_KEY = "growth-fork-bounties";
  var POINTS_KEY = "growth-fork-points";
  var CLAIM_KEY = "growth-fork-bounty-claims";
  var REC_KEY = "growth-fork-bounty-recs";

  root.GROWTH_RECOMMEND_SKILLS = [
    { id: "resume", title: "社团经历项目化表达", typeLabel: "单 Skill" },
    { id: "career", title: "内容运营实习上岸路线", typeLabel: "专家路径" },
    { id: "interview", title: "运营岗模拟面试追问", typeLabel: "单 Skill" },
    { id: "research", title: "科研入门：从读论文到找选题", typeLabel: "专家路径" },
    { id: "demo", title: "竞赛 Demo 一周共创营", typeLabel: "组合路径" },
    { id: "exam", title: "期末复习计划生成器", typeLabel: "单 Skill" }
  ];

  var seedBounties = [
    {
      id: "b-guyan-1",
      ownerId: "guyan",
      title: "中大迎新晚会统筹怎么写成简历项目",
      need: "我有统筹经历，但几乎没有数据。需要一个能追问事实、再输出 STAR 条目的 Skill。",
      reward: 80,
      status: "open",
      createdAt: "2026-08-10"
    },
    {
      id: "b-linran-1",
      ownerId: "linran",
      title: "北邮课设转成可讲的实习作品",
      need: "后端课设代码能跑，但面试讲不清楚边界和指标。想要一个专改课设叙事的 Skill。",
      reward: 100,
      status: "open",
      createdAt: "2026-08-09"
    },
    {
      id: "b-mia-1",
      ownerId: "mia",
      title: "教资面试试讲节奏教练",
      need: "结构化问答还行，试讲容易超时。需要按分钟卡点、追问设计意图的 Skill。",
      reward: 60,
      status: "open",
      createdAt: "2026-08-08"
    },
    {
      id: "b-zhouzhi-1",
      ownerId: "zhouzhi",
      title: "没有实验室经历如何冷启动科研",
      need: "大二，零科研。想要一周内读综述、收敛问题、写出第一份研究笔记的 Skill。",
      reward: 120,
      status: "open",
      createdAt: "2026-08-07"
    },
    {
      id: "b-lin-1",
      ownerId: "lin",
      title: "把公众号运营案例收成可投递作品",
      need: "已有第一版案例，缺数据和岗位口径。需要能追问指标、再压成简历项目的 Skill。",
      reward: 80,
      status: "open",
      createdAt: "2026-08-11"
    }
  ];

  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var val = JSON.parse(raw);
      return val == null ? fallback : val;
    } catch (err) {
      return fallback;
    }
  }

  function writeJson(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  root.readPoints = function readPoints() {
    var n = Number(readJson(POINTS_KEY, 0));
    return Number.isFinite(n) ? n : 0;
  };

  root.addPoints = function addPoints(delta) {
    var next = root.readPoints() + delta;
    writeJson(POINTS_KEY, next);
    return next;
  };

  root.readUserBounties = function readUserBounties() {
    var list = readJson(BOUNTY_KEY, []);
    return Array.isArray(list) ? list : [];
  };

  root.allBounties = function allBounties() {
    var user = root.readUserBounties();
    var map = {};
    seedBounties.concat(user).forEach(function (b) { map[b.id] = b; });
    return Object.keys(map).map(function (k) { return map[k]; });
  };

  root.bountiesFor = function bountiesFor(ownerId) {
    return root.allBounties()
      .filter(function (b) { return b.ownerId === ownerId; })
      .sort(function (a, b) { return String(b.createdAt).localeCompare(String(a.createdAt)); });
  };

  root.bountyById = function bountyById(id) {
    return root.allBounties().find(function (b) { return b.id === id; });
  };

  root.postBounty = function postBounty(ownerId, title, need, reward) {
    var list = root.readUserBounties();
    var item = {
      id: "b-user-" + Date.now(),
      ownerId: ownerId,
      title: title,
      need: need,
      reward: Math.max(20, Number(reward) || 40),
      status: "open",
      createdAt: new Date().toISOString().slice(0, 10)
    };
    list.unshift(item);
    writeJson(BOUNTY_KEY, list);
    return item;
  };

  root.readClaims = function readClaims() {
    return readJson(CLAIM_KEY, {});
  };

  root.claimBounty = function claimBounty(bountyId, workerName) {
    var claims = root.readClaims();
    if (claims[bountyId]) return claims[bountyId];
    claims[bountyId] = {
      workerName: workerName || "林",
      claimedAt: new Date().toISOString()
    };
    writeJson(CLAIM_KEY, claims);
    return claims[bountyId];
  };

  root.isClaimedByMe = function isClaimedByMe(bountyId) {
    return Boolean(root.readClaims()[bountyId]);
  };

  root.readRecs = function readRecs() {
    return readJson(REC_KEY, {});
  };

  root.recommendSkillForBounty = function recommendSkillForBounty(bountyId, skillId, skillTitle) {
    var recs = root.readRecs();
    if (!recs[bountyId]) recs[bountyId] = [];
    var already = recs[bountyId].some(function (r) { return r.skillId === skillId; });
    if (already) return { ok: false, reason: "already", points: 0, total: root.readPoints() };
    var bounty = root.bountyById(bountyId);
    var pts = bounty ? Math.max(15, Math.round(bounty.reward * 0.25)) : 20;
    recs[bountyId].unshift({
      skillId: skillId,
      skillTitle: skillTitle,
      from: "林",
      at: new Date().toISOString()
    });
    writeJson(REC_KEY, recs);
    var total = root.addPoints(pts);
    return { ok: true, points: pts, total: total };
  };

  root.recsFor = function recsFor(bountyId) {
    var recs = root.readRecs();
    return recs[bountyId] || [];
  };

  root.deliverClaimedBounty = function deliverClaimedBounty(bountyId) {
    if (!root.isClaimedByMe(bountyId)) return { ok: false, reason: "not-claimed" };
    var bounty = root.bountyById(bountyId);
    if (!bounty || bounty.status !== "open") return { ok: false, reason: "closed" };
    var list = root.readUserBounties();
    var found = list.find(function (b) { return b.id === bountyId; });
    if (found) {
      found.status = "delivered";
      writeJson(BOUNTY_KEY, list);
    } else {
      // seed bounty: mirror into user store as delivered copy
      list.unshift(Object.assign({}, bounty, { status: "delivered" }));
      writeJson(BOUNTY_KEY, list);
    }
    var total = root.addPoints(bounty.reward);
    return { ok: true, points: bounty.reward, total: total };
  };

  /* —— 当前登录用户「林」的主页数据 —— */
  root.MY_CREATOR_ID = "lin";
  root.MY_FOLLOWERS_BASE = 48;
  var REVIEW_KEY = "growth-fork-pet-reviews";
  var PUBLISHED_KEY = "growth-fork-my-published";
  var TASK_DONE_KEY = "growth-fork-task-done";

  root.myFollowingCount = function myFollowingCount() {
    return root.readFollows().length;
  };

  root.myFollowerCount = function myFollowerCount() {
    return root.MY_FOLLOWERS_BASE;
  };

  function resolveCompanion() {
    return {
      name: "小狗",
      image: "assets/companion-dog-transparent.png"
    };
  }

  root.resolveCompanion = resolveCompanion;

  root.composePetReviewNote = function composePetReviewNote(skillTitle, petName) {
    var base = "这次你把任务跑完了。我记下了卡点和产出，下一场同类事情可以少绕一圈。";
    if (/社团|简历|项目化/.test(skillTitle)) base = "你把活动数据补上之后，这条路径才真正跑通。下一场先写结果数字，STAR 会更稳。";
    else if (/综述|文献/.test(skillTitle)) base = "材料已经够用。缺口那一栏比堆论文标题更值钱，下一场开写先钉住它。";
    else if (/运营|实习/.test(skillTitle)) base = "案例有了第一版。把阅读和互动数字写进去，这条实习路径才站得住。";
    else if (/面试/.test(skillTitle)) base = "答法已经能开口。下一轮先讲结果，再补行动，追问会稳很多。";
    return "跑完了！" + base;
  };

  root.composePetReviewStars = function composePetReviewStars(skillTitle) {
    if (/面试/.test(skillTitle)) return 4;
    return 5;
  };

  root.composePetReviewTranscript = function composePetReviewTranscript(payload) {
    var skillTitle = String((payload && payload.skillTitle) || "已调用 Skill");
    var taskTitle = String((payload && payload.taskTitle) || skillTitle);
    var skillId = String((payload && payload.skillId) || "skill");
    var note = String((payload && payload.note) || root.composePetReviewNote(skillTitle));
    var incoming = payload && Array.isArray(payload.transcript) ? payload.transcript : [];
    var lines = incoming.map(function (m) {
      return {
        role: m && m.role === "user" ? "user" : "assistant",
        text: String((m && (m.text || m.content)) || "").trim().slice(0, 320)
      };
    }).filter(function (m) { return m.text; }).slice(-6);
    if (lines.length >= 2) return lines;
    return [
      { role: "user", text: "/" + skillId + "\n今日计划：" + taskTitle },
      { role: "assistant", text: "已加载「" + skillTitle + "」。把你做过的事、卡点和想要的结果发给我。" },
      { role: "user", text: "材料已经补上，帮我收成可验证的结果。" },
      { role: "assistant", text: note }
    ];
  };

  root.composePetReviewShots = function composePetReviewShots(payload) {
    var existing = payload && Array.isArray(payload.shots) ? payload.shots.filter(function (s) {
      return s && (s.src || (Array.isArray(s.messages) && s.messages.length));
    }) : [];
    if (existing.length >= 2) return existing.slice(0, 3);
    var lines = root.composePetReviewTranscript(payload);
    var pairs = [];
    var i = 0;
    while (i < lines.length && pairs.length < 3) {
      var chunk = lines.slice(i, i + 2);
      if (chunk.length) pairs.push(chunk);
      i += 2;
    }
    if (pairs.length === 1 && lines.length > 2) {
      pairs = [lines.slice(0, 2), lines.slice(2)];
    }
    var captions = ["调用 Skill", "怎么使用", "拿到的结果"];
    var shots = pairs.map(function (messages, idx) {
      return { caption: captions[Math.min(idx, captions.length - 1)], messages: messages };
    });
    if (payload && payload.screenshot) {
      shots.unshift({ src: payload.screenshot, caption: "学习对话框截图" });
      shots = shots.slice(0, 3);
    }
    return shots.slice(0, 3);
  };

  var seedReviews = [
    {
      skillId: "resume",
      skillTitle: "社团经历项目化表达",
      href: "skill-detail.html?id=resume",
      typeLabel: "单 Skill",
      taskTitle: "社团经历项目化",
      completedAt: "2026-08-12",
      petName: "小狗",
      petImage: "assets/companion-dog-transparent.png",
      verdict: "跑通了",
      stars: 5,
      note: "跑完了！你把活动数据补上之后，这条路径才真正跑通。下一场先写结果数字，STAR 会更稳。",
      screenshot: "assets/reviews/chat-resume.png",
      transcript: [
        { role: "user", text: "/resume\n今日计划：把社团公众号经历写成简历项目" },
        { role: "assistant", text: "把你做过的事、负责的工作和能验证的数字发给我。阅读量、专题数、你亲自经手的部分，越具体越好。" },
        { role: "user", text: "我负责校园公众号三个月。阅读从八百做到一万二，自己策划了四期专题，其中两期被学院转发。" },
        { role: "assistant", text: "这条已经能写进简历了：\n\n主导校园公众号内容运营，3 个月内将篇均阅读从 800 做到 1.2 万；独立策划 4 期专题，2 期被学院转发。\n\nSTAR 站住了。下一场先写结果数字，会更稳。" }
      ]
    },
    {
      skillId: "literature-review",
      skillTitle: "文献综述撰写 Skill",
      href: "skill-detail.html?id=literature-review",
      typeLabel: "单 Skill",
      taskTitle: "文献综述撰写",
      completedAt: "2026-08-10",
      petName: "小狗",
      petImage: "assets/companion-dog-transparent.png",
      verdict: "跑通了",
      stars: 5,
      note: "跑完了！材料已经够用。缺口那一栏比堆论文标题更值钱，下一场开写先钉住它。",
      screenshot: "assets/reviews/chat-literature.png",
      transcript: [
        { role: "user", text: "/literature-review\n今日计划：把 8 篇论文收成综述提纲" },
        { role: "assistant", text: "先对照主题 / 方法 / 结论 / 缺口做一张表。标出 2–3 处可引用原句，再生成可直接开写的段落提纲。" },
        { role: "user", text: "八篇主要讨论算法推荐和社会比较。我还不知道缺口该怎么写。" },
        { role: "assistant", text: "缺口钉住这一句就够开写：现有研究很少写清「推荐强度如何改变比较对象」。\n\n提纲第一节：算法推荐如何改变社会比较的对象与频率。把那 2 句原句放进方法对照表，可以开始写了。" }
      ]
    }
  ];

  root.readPetReviews = function readPetReviews() {
    var user = readJson(REVIEW_KEY, []);
    if (!Array.isArray(user)) user = [];
    var map = {};
    seedReviews.concat(user).forEach(function (r) {
      var key = String(r.skillId) + "::" + String(r.taskTitle);
      var prev = map[key] || {};
      map[key] = Object.assign({}, prev, r, {
        petName: "小狗",
        petImage: "assets/companion-dog-transparent.png",
        stars: Math.max(1, Math.min(5, Number(r.stars || prev.stars) || 5)),
        screenshot: r.screenshot || prev.screenshot || "",
        transcript: root.composePetReviewTranscript(Object.assign({}, prev, r)),
        shots: root.composePetReviewShots(Object.assign({}, prev, r))
      });
    });
    return Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) { return String(b.completedAt).localeCompare(String(a.completedAt)); });
  };

  root.recordPetSkillReview = function recordPetSkillReview(payload) {
    var pet = resolveCompanion();
    var skillTitle = String((payload && payload.skillTitle) || "已调用 Skill");
    var taskTitle = String((payload && payload.taskTitle) || skillTitle);
    var skillId = String((payload && payload.skillId) || "general");
    var note = root.composePetReviewNote(skillTitle, pet.name);
    var item = {
      skillId: skillId,
      skillTitle: skillTitle,
      href: (payload && payload.href) || ("skill-detail.html?id=" + encodeURIComponent(skillId)),
      typeLabel: (payload && payload.typeLabel) || "单 Skill",
      taskTitle: taskTitle,
      completedAt: new Date().toISOString().slice(0, 10),
      petName: pet.name,
      petImage: pet.image,
      verdict: "跑通了",
      stars: root.composePetReviewStars(skillTitle),
      note: note,
      screenshot: (payload && payload.screenshot) || "",
      transcript: root.composePetReviewTranscript({
        skillId: skillId,
        skillTitle: skillTitle,
        taskTitle: taskTitle,
        note: note,
        transcript: payload && payload.transcript
      })
    };
    item.shots = root.composePetReviewShots(item);
    var list = readJson(REVIEW_KEY, []);
    if (!Array.isArray(list)) list = [];
    list = list.filter(function (r) { return !(r.skillId === item.skillId && r.taskTitle === item.taskTitle); });
    list.unshift(item);
    writeJson(REVIEW_KEY, list);
    return item;
  };

  var seedPublished = [
    skill("resume", "校园公众号经历 → 内容运营简历项目", { typeLabel: "单 Skill", users: "1,284" }),
    skill("demo", "竞赛 Demo 一周共创营", { typeLabel: "组合路径", users: "493" })
  ];

  root.myPublishedSkills = function myPublishedSkills() {
    var extra = readJson(PUBLISHED_KEY, []);
    if (!Array.isArray(extra)) extra = [];
    var map = {};
    seedPublished.concat(extra).forEach(function (s) { map[s.id] = s; });
    return Object.keys(map).map(function (k) { return map[k]; });
  };

  root.recordPublishedSkill = function recordPublishedSkill(entry) {
    var list = readJson(PUBLISHED_KEY, []);
    if (!Array.isArray(list)) list = [];
    var item = Object.assign({
      id: "pub-" + Date.now(),
      typeLabel: "单 Skill",
      users: "0",
      href: "skill-detail.html?id=resume"
    }, entry || {});
    list = list.filter(function (s) { return s.id !== item.id; });
    list.unshift(item);
    writeJson(PUBLISHED_KEY, list);
    return item;
  };

  root.mySavedSkills = function mySavedSkills() {
    return [
      skill("research", "科研入门：从读论文到找选题", { typeLabel: "专家路径", users: "672" }),
      skill("exam", "期末复习计划生成器", { users: "3,214" })
    ];
  };

  root.readDoneTasks = function readDoneTasks() {
    var list = readJson(TASK_DONE_KEY, ["社团经历项目化"]);
    return Array.isArray(list) ? list : ["社团经历项目化"];
  };

  root.markTaskDone = function markTaskDone(title) {
    var list = root.readDoneTasks();
    if (list.indexOf(title) === -1) list.push(title);
    writeJson(TASK_DONE_KEY, list);
    return list;
  };

  root.hasPetReviewForTask = function hasPetReviewForTask(taskTitle) {
    return root.readPetReviews().some(function (r) { return r.taskTitle === taskTitle; });
  };

  root.GROWTH_PETS = {
    dog: { name: "小狗", image: "assets/companion-dog-transparent.png" },
    cat: { name: "小猫", image: "assets/companion-cat-transparent.png" },
    capybara: { name: "水豚", image: "assets/companion-capybara-transparent.png" },
    rabbit: { name: "兔子", image: "assets/companion-rabbit-transparent.png" },
    hamster: { name: "仓鼠", image: "assets/companion-hamster-transparent.png" }
  };

  function petByKey(key) {
    return root.GROWTH_PETS[key] || root.GROWTH_PETS.dog;
  }

  function htmlEsc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function shotsOf(cmd, plan, ask, material, result) {
    return [
      {
        caption: "调用 Skill",
        messages: [
          { role: "user", text: cmd + "\n今日计划：" + plan },
          { role: "assistant", text: ask }
        ]
      },
      {
        caption: "怎么使用",
        messages: [
          { role: "user", text: material },
          { role: "assistant", text: "材料够了。我按这个往下收，先给你能直接用的一版。" }
        ]
      },
      {
        caption: "拿到的结果",
        messages: [
          { role: "user", text: "把结果写成我能复制走的一版。" },
          { role: "assistant", text: result }
        ]
      }
    ];
  }

  function publicComment(opts) {
    var pet = petByKey(opts.pet);
    return {
      skillId: opts.skillId,
      skillTitle: opts.title || "",
      userName: opts.user,
      userMark: opts.mark,
      userSchool: opts.school,
      petKey: opts.pet,
      petName: pet.name,
      petImage: pet.image,
      stars: opts.stars || 5,
      note: opts.note,
      verdict: opts.verdict || "跑通了",
      completedAt: opts.date,
      shots: opts.shots
    };
  }

  var seedSkillComments = [
    publicComment({
      skillId: "resume", title: "社团经历项目化表达",
      user: "顾言", mark: "顾", school: "清华大学", pet: "cat", stars: 5, date: "2026-08-11",
      note: "迎新晚会以前只会写「负责统筹」。小猫追着要到场人数和协作部门，STAR 才站得住。没用过的同学：先准备 1 个可验证数字再开。",
      shots: shotsOf("/resume", "迎新晚会写成简历项目",
        "到场人数、协作人数、预算执行，越具体越好。",
        "我统筹迎新晚会，800 人到场，协调 6 个部门，预算执行 97%。",
        "主导 1 场 800+ 人校园迎新晚会，协调 6 个部门、预算执行率 97%，沉淀可复用排期模板。")
    }),
    publicComment({
      skillId: "resume", title: "社团经历项目化表达",
      user: "周知", mark: "知", school: "北京大学", pet: "capybara", stars: 4, date: "2026-08-09",
      note: "水豚不让我把实验室成果写成「参与」。个人贡献边界问清楚之后，这条才敢投递。适合已经有经历、但条目发虚的人。",
      shots: shotsOf("/resume", "实验室经历写成项目",
        "你独自负责的模块、推动改变的一次决策、可验证的结果。",
        "我负责数据清洗脚本，把处理时间从两天收到半天，组里后来都用这份。",
        "独立编写实验室数据清洗脚本，将处理周期从 2 天压缩至 0.5 天，现已成为组内默认流程。")
    }),
    publicComment({
      skillId: "resume", title: "社团经历项目化表达",
      user: "林然", mark: "然", school: "北京邮电大学", pet: "rabbit", stars: 5, date: "2026-08-07",
      note: "兔子盯着公众号阅读量不放。没有数据就不要硬写「运营能力」——这条 Skill 会逼你把数字找出来。",
      shots: shotsOf("/resume", "公众号运营写成简历项目",
        "阅读、互动、你亲自策划的专题，缺一不可。",
        "三个月阅读从 800 做到 1.2 万，自己策划 4 期专题，2 期被学院转发。",
        "主导校园公众号内容运营，3 个月内篇均阅读从 800 做到 1.2 万；独立策划 4 期专题，2 期被学院转发。")
    }),
    publicComment({
      skillId: "career", title: "内容运营实习上岸路线",
      user: "林然", mark: "然", school: "北京邮电大学", pet: "dog", stars: 5, date: "2026-08-08",
      note: "小狗把 28 天拆成每天一件可验证的事。适合零实习、但能每天交出作品的人；空想日程会被拆掉。",
      shots: shotsOf("/career", "一个月内拿到运营初面",
        "先写岗位画像和差距清单，今天只做一件能交差的事。",
        "我还没有实习，作品只有公众号和一次活动。",
        "Day 1 差距清单：缺数据作品、缺面试口述。今晚只交 1 条 STAR 项目，明天才碰投递表。")
    }),
    publicComment({
      skillId: "career", title: "内容运营实习上岸路线",
      user: "Mia", mark: "M", school: "对外经济贸易大学", pet: "hamster", stars: 4, date: "2026-08-05",
      note: "仓鼠把投递节奏压得很死。提前批会用上；如果你还在纠结方向，先别开 28 天冲刺。",
      shots: shotsOf("/career", "提前批投递节奏",
        "本周只投 8 家，每家对应一条作品。",
        "我有两份案例，但岗位描述对不上。",
        "案例 A 对内容运营，案例 B 对用户增长。本周 8 家按这个拆，不要混投。")
    }),
    publicComment({
      skillId: "career", title: "内容运营实习上岸路线",
      user: "阿哲", mark: "哲", school: "北京师范大学", pet: "cat", stars: 5, date: "2026-08-03",
      note: "小猫逼我把模拟面试录下来。路径后半段才是面试，前 14 天没有作品就不要跳。",
      shots: shotsOf("/career", "第 18 天模拟面试",
        "先用项目开场 60 秒，我来追问决策点。",
        "我主导过公众号，但说不清自己做了哪几步。",
        "开场改成：我把篇均阅读从 800 做到 1.2 万，关键动作是专题节奏和标题复盘。下一步补决策点。")
    }),
    publicComment({
      skillId: "research", title: "科研入门：从读论文到找选题",
      user: "周知", mark: "知", school: "北京大学", pet: "capybara", stars: 5, date: "2026-08-10",
      note: "水豚不让我堆论文标题。缺口那一栏写清楚，选题才收得住。适合没有科研经历、但已经读过几篇的人。",
      shots: shotsOf("/research", "从读论文到找选题",
        "先对照主题 / 方法 / 结论 / 缺口做一张表。",
        "我读了 8 篇，都在讲推荐系统和焦虑，缺口写不出来。",
        "缺口钉住：现有研究很少写清推荐强度如何改变比较对象。今天的选题就从这一句收。")
    }),
    publicComment({
      skillId: "research", title: "科研入门：从读论文到找选题",
      user: "顾言", mark: "顾", school: "清华大学", pet: "rabbit", stars: 4, date: "2026-08-06",
      note: "兔子把研究问题缩到 4 周能做完。题目太大时会被打回来——这是优点，不是毛病。",
      shots: shotsOf("/research", "收敛研究问题",
        "写下变量和对照，排除过大或不可测的问题。",
        "我想写短视频对大学生的全部影响。",
        "收成：推荐时长是否改变社会比较频率。4 周只验证这一个对照。")
    }),
    publicComment({
      skillId: "research", title: "科研入门：从读论文到找选题",
      user: "宋慈", mark: "宋", school: "中国人民大学", pet: "hamster", stars: 5, date: "2026-08-04",
      note: "仓鼠逼我标出可引用原句。后面写综述会省很多回头翻 PDF 的时间。",
      shots: shotsOf("/research", "精读笔记",
        "标出 2–3 处可引用原句，再写一句这篇对你问题的贡献。",
        "我摘了很多段，不知道哪些能进综述。",
        "留下两句：方法段的样本说明，结论段的比较机制。其余先放进附录。")
    }),
    publicComment({
      skillId: "demo", title: "竞赛 Demo 一周共创营",
      user: "阿哲", mark: "哲", school: "北京师范大学", pet: "dog", stars: 4, date: "2026-08-08",
      note: "小狗把选题压到 45 分钟。适合临时组队、还没有方向的队伍；已经有完整产品的就别走这一周。",
      shots: shotsOf("/demo", "队伍还没有方向",
        "30 分钟发散，15 分钟收敛，用可行性矩阵淘汰。",
        "我们三个人，只会做问卷和简单网页。",
        "切口锁定：把问卷结果自动生成一页答辩图。明天只做主流程三屏。")
    }),
    publicComment({
      skillId: "demo", title: "竞赛 Demo 一周共创营",
      user: "林然", mark: "然", school: "北京邮电大学", pet: "cat", stars: 5, date: "2026-08-06",
      note: "小猫不让我们做完美视觉。可点击线框加 90 秒脚本，评委追问才接得住。",
      shots: shotsOf("/demo", "最小可演示",
        "只做主流程。用可点击线框代替完美视觉。",
        "我们想先把 UI 做漂亮再演示。",
        "砍掉配色。今晚三屏可点，明天只写 90 秒演示脚本。")
    }),
    publicComment({
      skillId: "demo", title: "竞赛 Demo 一周共创营",
      user: "Mia", mark: "M", school: "对外经济贸易大学", pet: "capybara", stars: 5, date: "2026-08-02",
      note: "水豚把答辩压到 3 分钟。超时的队伍会在叙事那一步被拦住，这正是你要的鉴别信号。",
      shots: shotsOf("/demo", "答辩容易超时",
        "把故事压到问题—方案—证据，准备评委追问卡片。",
        "我们讲背景就要两分钟。",
        "开场 20 秒只留问题。证据放第二屏数字。追问卡片写 4 张就够。")
    }),
    publicComment({
      skillId: "exam", title: "期末复习计划生成器",
      user: "Mia", mark: "M", school: "对外经济贸易大学", pet: "hamster", stars: 5, date: "2026-08-12",
      note: "仓鼠按学分和剩余天数排，不让我平均撒时间。三门课里难的会先占日历。",
      shots: shotsOf("/exam", "还有 12 天三门课",
        "先排高学分高难度，插入回顾日。",
        "高数 5 学分最虚，英语和马原还行。",
        "12 日节奏：高数 6 天含 2 个回顾日，英语 3 天，马原 2 天，最后 1 天只做真题。")
    }),
    publicComment({
      skillId: "exam", title: "期末复习计划生成器",
      user: "顾言", mark: "顾", school: "清华大学", pet: "dog", stars: 4, date: "2026-08-09",
      note: "小狗把每天收成保底 2 项。计划总完不成的人适合；已经能自驱刷题的会觉得节奏偏慢。",
      shots: shotsOf("/exam", "计划总完不成",
        "区分保底与加分任务，中断后可重排。",
        "我一写完日程就做不完，然后放弃。",
        "每天只保底 2 项。今晚高数两章 + 英语单词。加分项明天再说。")
    }),
    publicComment({
      skillId: "exam", title: "期末复习计划生成器",
      user: "宋慈", mark: "宋", school: "中国人民大学", pet: "rabbit", stars: 5, date: "2026-08-01",
      note: "兔子拿真题映射知识点，不知道从哪章开始时很有用。没有大纲或真题就先去找，再开 Skill。",
      shots: shotsOf("/exam", "不知道从哪章开始",
        "上传大纲或章节列表，按易考点排序。",
        "我只有一份考试范围 PDF。",
        "攻坚顺序：第 3、5、7 章占过往真题 60%。今天只做第 3 章例题。")
    }),
    publicComment({
      skillId: "interview", title: "运营岗模拟面试追问",
      user: "阿哲", mark: "哲", school: "北京师范大学", pet: "cat", stars: 4, date: "2026-08-11",
      note: "小猫按真实节奏追问，空话会被拆。已经有项目、但开场超过 60 秒的人最该用。",
      shots: shotsOf("/interview", "介绍一次主导的校园项目",
        "先压缩成 60 秒，我再追问你的决策点。",
        "我一讲迎新晚会就会超时。",
        "60 秒版：问题是跨部门协同，动作是排期模板，结果是 800 人到场、预算执行 97%。")
    }),
    publicComment({
      skillId: "interview", title: "运营岗模拟面试追问",
      user: "林然", mark: "然", school: "北京邮电大学", pet: "capybara", stars: 5, date: "2026-08-07",
      note: "水豚问「数据下降怎么办」时不接受态度句。要排查顺序。情景题弱的人能立刻看出来。",
      shots: shotsOf("/interview", "如果数据下降你怎么办",
        "给出排查顺序，不要先表态。",
        "我会先和团队复盘，再看数据。",
        "改成：先核对统计口径，再看渠道/内容/时机三块，最后才开会。今晚把这三步背熟。")
    }),
    publicComment({
      skillId: "interview", title: "运营岗模拟面试追问",
      user: "周知", mark: "知", school: "北京大学", pet: "hamster", stars: 4, date: "2026-08-04",
      note: "仓鼠把协作冲突问得很具体。适合容易讲情绪、不讲取舍的人。",
      shots: shotsOf("/interview", "和队友意见不合",
        "关注事实而非情绪，体现推动结果的能力。",
        "当时大家吵起来，最后听了学长的。",
        "改成：争议点是范围，我用可行性矩阵让队伍在当晚锁定切口，Demo 按期交了。")
    }),
    publicComment({
      skillId: "literature-review", title: "文献综述撰写 Skill",
      user: "周知", mark: "知", school: "北京大学", pet: "capybara", stars: 5, date: "2026-08-10",
      note: "水豚逼我先做主题/方法/结论/缺口表。没有表就开写，会被打回来——这就是鉴别点。",
      shots: shotsOf("/literature-review", "把 8 篇收成综述提纲",
        "先对照主题 / 方法 / 结论 / 缺口做一张表。",
        "八篇主要讨论算法推荐和社会比较。",
        "提纲第一节：算法推荐如何改变社会比较的对象与频率。缺口那一栏先钉住。")
    }),
    publicComment({
      skillId: "literature-review", title: "文献综述撰写 Skill",
      user: "宋慈", mark: "宋", school: "中国人民大学", pet: "rabbit", stars: 5, date: "2026-08-08",
      note: "兔子不让我堆摘要。可引用原句标出来，综述才不是剪贴。",
      shots: shotsOf("/literature-review", "综述不要写成摘要合集",
        "每篇只留 2 句可引用原句，再写它对你问题的贡献。",
        "我每篇都摘了很长。",
        "每篇删到两句。贡献写成：这篇提供了比较对象的操作化定义。")
    }),
    publicComment({
      skillId: "literature-review", title: "文献综述撰写 Skill",
      user: "Mia", mark: "M", school: "对外经济贸易大学", pet: "hamster", stars: 4, date: "2026-08-03",
      note: "仓鼠把提纲压到能开写的一节。还没读完 6 篇就开综述的人会被拦——先把表做完再进来。",
      shots: shotsOf("/literature-review", "提纲先收成一节",
        "缺口写清楚之前，不要开长文。",
        "我想先写引言再补文献。",
        "顺序反过来：今晚只交缺口表和第一节提纲。引言明天再写。")
    })
  ];

  var remixCommentMap = {
    "resume-sysu": "resume",
    "resume-quant": "resume",
    "resume-sysu-cs": "resume",
    "career-xhs": "career",
    "exam-lab": "exam"
  };

  var COMMENT_REVIEWERS = [
    { user: "顾言", mark: "顾", school: "清华大学" },
    { user: "周知", mark: "知", school: "北京大学" },
    { user: "林然", mark: "然", school: "北京邮电大学" },
    { user: "Mia", mark: "M", school: "对外经济贸易大学" },
    { user: "阿哲", mark: "哲", school: "北京师范大学" },
    { user: "宋慈", mark: "宋", school: "中国人民大学" },
    { user: "清清", mark: "清", school: "中国人民大学" },
    { user: "乔南", mark: "乔", school: "北京理工大学" }
  ];
  var COMMENT_PETS = ["cat", "dog", "capybara", "rabbit", "hamster"];

  function commentHash(s) {
    var h = 2166136261;
    var str = String(s || "");
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function commentScene(skillId, title) {
    var cmd = "/" + (skillId || "skill");
    var rules = [
      { re: /选调/, plan: "按节点收齐选调材料", ask: "先对岗位画像，再列证明材料和面试故事缺口。", material: "我有支教和一次调研，但说不清和基层岗位怎么匹配。", result: "岗位关键词钉在基层调研、群众工作。今晚只补 1 条可验证的调研故事，证明材料对照清单明天收。", fit: "已经决定考选调、材料散着的人", skip: "还在互联网和选调之间摇摆", need: "至少 1 段能被追问的实践故事" },
      { re: /夏令营|保研|推研|沈元/, plan: "把升学材料按周排开", ask: "推荐信、研究计划和自我陈述，先标截止日期再写。", material: "套磁还没回，研究计划只写了半页。", result: "本周只交研究计划一页骨架。推荐信节点标在倒计时第 10 天，套磁跟进另开一条。", fit: "目标院校已定、材料还散着的人", skip: "还没想好申哪、也没读过论文", need: "一份能被导师追问的研究切口" },
      { re: /提前批|大厂|后端实习|互联网/, plan: "按投递节奏走完提前批", ask: "今天只做一件能交差的事：简历、作品或投递表，三选一。", material: "项目有课设，但和 JD 对不上，投递表还是空的。", result: "Day 1 差距清单：缺可讲项目、缺口述。今晚只改 1 条项目描述，明天才碰投递表。", fit: "方向已定、能每天交一件作品的人", skip: "还在纠结方向就开 28 天冲刺", need: "至少 1 个能讲 60 秒的项目" },
      { re: /四大|互金|金融实习|网申/, plan: "网申和面试案例按校历拆开", ask: "先锁投递名单，再补每家对应的一条故事。", material: "我有商赛和一份实习，但岗位描述对不上。", result: "案例 A 对审计/研究，案例 B 对市场。本周只投对得上的 8 家，不要混投。", fit: "网申窗口已经打开的人", skip: "案例还没写完就海投", need: "2 条能对上 JD 的经历" },
      { re: /航天院所|国防|涉农企业/, plan: "在可公开范围内写清贡献", ask: "先标哪些能写、哪些必须模糊，再生成企业能读懂的条目。", material: "项目涉内部细节，我不知道简历能写到哪一步。", result: "公开版只留问题、方法和可验证结果。保密细节改成「按规范完成交付」，今晚交这一条。", fit: "有项目但不敢写、怕写超的人", skip: "还没有任何可公开成果", need: "一条去掉敏感信息后仍站得住的贡献" },
      { re: /双语|英文面试/, plan: "中英项目描述对齐", ask: "先锁中文事实，再译成面试能说出口的英文。", material: "中文条目有数字，英文一开口就空。", result: "英文版保留同一个数字和同一个决策点。今晚只背 60 秒开场，不扩词汇。", fit: "中文经历已有、英文说不稳的人", skip: "中文条目还是空的", need: "一条带数字的中文项目" },
      { re: /教资|教师岗/, plan: "按面试环节排试讲和答辩", ask: "结构化、试讲、答辩分开准备，今天只攻一个环节。", material: "试讲稿有了，但被追问班级管理就卡住。", result: "答辩卡只留 3 个班级案例。今晚不改试讲稿，只补追问句。", fit: "试讲稿已有、怕被追问的人", skip: "还没写过教学设计", need: "一份能讲 8 分钟的试讲稿" },
      { re: /西综|临床|规培|医学/, plan: "按剩余月份拆可完成的块", ask: "先排高权重系统，插入回顾日，临床故事另开一条。", material: "内科和病理一起推进，两边都做不完。", result: "本月只攻坚生理—病理联动。临床故事合规写观察，不写超范围操作。", fit: "剩余时间明确、容易平均用力的人", skip: "还没拿到大纲或真题范围", need: "一份考试范围或科室见习记录" },
      { re: /考研|408|机试|考证|CPA|期末|周计划|学术写作/, plan: "按剩余天数生成能完成的清单", ask: "先排高学分或高权重，插入回顾日，不平均撒时间。", material: "三门一起推进，计划写完就做不完。", result: "每天只保底 2 项。难的先占日历，加分项明天再说。", fit: "计划总完不成、需要保底节奏的人", skip: "已经能自驱刷题、只想要题库", need: "大纲、真题或 DDL" },
      { re: /建模|冯如|挑战杯|黑客|路演|共创|叙事|创新创业|投资研究|社会调查|社会调研/, plan: "一周做成可展示成果", ask: "30 分钟发散，15 分钟收敛，用可行性矩阵淘汰。", material: "队伍还没有方向，只会做问卷和简单演示。", result: "切口锁定后今晚只做主流程三屏。视觉往后放，先写 90 秒脚本。", fit: "临时组队、还没有方向的队伍", skip: "已经有完整产品只差美化", need: "一个可在 7 天做完的切口" },
      { re: /面试|追问/, plan: "按真实节奏追问案例", ask: "先把开场压到 60 秒，我再追问决策点。", material: "我一讲项目就会超时，被问细节就空。", result: "60 秒版只留问题、动作、结果。今晚把决策点补成 3 句，不要态度句。", fit: "已经有项目、但开场超过 60 秒的人", skip: "经历还没写成项目就模面", need: "一条带结果数字的项目" },
      { re: /简历|项目化|写成|经历/, plan: "把经历收成可投递条目", ask: "到场人数、你独自负责的模块、可验证结果，越具体越好。", material: "以前只会写「负责统筹」或「参与」，个人贡献说不清。", result: "条目改成可验证的动作和结果。没有数字的能力词今晚先删掉。", fit: "已经有经历、但条目发虚的人", skip: "还没有任何可写的事实", need: "1 个可验证数字或独立模块" }
    ];
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].re.test(title)) {
        return {
          cmd: cmd,
          plan: rules[i].plan,
          ask: rules[i].ask,
          material: rules[i].material,
          result: rules[i].result,
          fit: rules[i].fit,
          skip: rules[i].skip,
          need: rules[i].need
        };
      }
    }
    var typed = {
      resume: { plan: "把经历写成可投递项目", ask: "你独自负责的模块、推动改变的一次决策、可验证的结果。", material: "我写过，但条目发虚，个人贡献边界不清。", result: "删掉「参与」「负责」。留下模块、决策和结果，今晚交这一条。", fit: "已经有经历、但条目发虚的人", skip: "还没有任何可写的事实", need: "1 个可验证数字" },
      career: { plan: "按节点走完这条路径", ask: "先写差距清单，今天只做一件能交差的事。", material: "方向大概有了，但每天不知道交什么。", result: "今晚只交 1 件可验证的事。投递表明天再碰。", fit: "能每天交出一件作品的人", skip: "还在纠结方向", need: "一个明确的目标岗位或考试" },
      research: { plan: "从读论文收到可做的问题", ask: "先对照主题 / 方法 / 结论 / 缺口做一张表。", material: "我读了几篇，缺口写不出来，题目也太大。", result: "缺口钉住一句。4 周只验证这一个对照。", fit: "已经读过几篇、但收不住选题的人", skip: "还没打开过论文", need: "2–3 篇能标出原句的文献" },
      demo: { plan: "一周做成可演示成果", ask: "只做主流程。用可点击线框代替完美视觉。", material: "我们想先把界面做漂亮再演示。", result: "砍掉配色。今晚三屏可点，明天只写 90 秒脚本。", fit: "临时组队、还没有方向的队伍", skip: "已经有完整产品", need: "一个 7 天能做完的切口" },
      exam: { plan: "按剩余天数生成能完成的清单", ask: "先排高学分高难度，插入回顾日。", material: "计划一写完就做不完，然后放弃。", result: "每天只保底 2 项。加分项明天再说。", fit: "计划总完不成的人", skip: "已经能自驱刷题", need: "大纲或真题范围" },
      interview: { plan: "按真实节奏追问", ask: "先压缩成 60 秒，我再追问决策点。", material: "我一开口就超时，被问细节就空。", result: "60 秒只留问题、动作、结果。今晚背这三句。", fit: "已经有项目、但开场不稳的人", skip: "经历还没写成项目", need: "一条带数字的项目" }
    };
    var fallback = typed[skillId] || typed.resume;
    return {
      cmd: cmd,
      plan: "跑通「" + title + "」",
      ask: fallback.ask,
      material: fallback.material,
      result: fallback.result,
      fit: fallback.fit,
      skip: fallback.skip,
      need: fallback.need
    };
  }

  function commentsForNamedSkill(skillId, skillTitle) {
    var title = String(skillTitle || "这个 Skill");
    var scene = commentScene(skillId, title);
    var h = commentHash(skillId + "|" + title);
    var petStart = h % COMMENT_PETS.length;
    var userStart = (h >>> 8) % COMMENT_REVIEWERS.length;
    var notes = [
      function (pet) { return pet + "看完「" + title + "」：适合" + scene.fit + "。对话里有可验证结果，才值得跟。"; },
      function (pet) { return pet + "把不适合的人拦下来了——" + scene.skip + "，先别开这条。"; },
      function (pet) { return pet + "盯着前置条件：没有「" + scene.need + "」会被打回来。这就是鉴别点。"; }
    ];
    var shotSets = [
      shotsOf(scene.cmd, scene.plan, scene.ask, scene.material, scene.result),
      shotsOf(scene.cmd, scene.plan, "先确认你是不是这条路径的人。方向没定就开，后面会空转。", scene.skip + "。我先把真实起点说清楚。", "先别开。把方向定下来再回来，否则这条路径会空转。"),
      shotsOf(scene.cmd, scene.plan, "把前置材料发来。没有的话我会停，避免你空跑。", "我还没有：" + scene.need + "。", "停在这里。先补齐「" + scene.need + "」，再调用这条 Skill。")
    ];
    return [0, 1, 2].map(function (idx) {
      var u = COMMENT_REVIEWERS[(userStart + idx) % COMMENT_REVIEWERS.length];
      var pet = COMMENT_PETS[(petStart + idx) % COMMENT_PETS.length];
      return publicComment({
        skillId: skillId,
        title: title,
        user: u.user,
        mark: u.mark,
        school: u.school,
        pet: pet,
        stars: idx === 1 ? 4 : 5,
        date: "2026-08-" + String(12 - idx * 3).padStart(2, "0"),
        note: notes[idx](petByKey(pet).name),
        shots: shotSets[idx]
      });
    });
  }

  root.skillCommentsFor = function skillCommentsFor(skillId, skillTitle) {
    var id = String(skillId || "");
    var title = String(skillTitle || "").trim();
    var mapped = remixCommentMap[id] || id;
    var list = seedSkillComments.filter(function (c) { return c.skillId === mapped; });
    var seedTitle = list[0] && list[0].skillTitle;
    if (list.length && (!title || title === seedTitle)) return list;
    if (title) return commentsForNamedSkill(mapped, title);
    if (list.length) return list;
    return commentsForNamedSkill(mapped, title || "这个 Skill");
  };

  root.starRowHtml = function starRowHtml(n) {
    var filled = Math.max(1, Math.min(5, Number(n) || 5));
    var star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2l2.35 6.1 6.55.42-5.08 4.28 1.58 6.4L12 16.9 6.6 20.4l1.58-6.4L3.1 9.72l6.55-.42z" fill="currentColor"/></svg>';
    return '<span class="pet-stars" role="img" aria-label="' + filled + ' 星">' +
      [1, 2, 3, 4, 5].map(function (i) {
        return star.replace("<svg", '<svg class="' + (i <= filled ? "on" : "") + '"');
      }).join("") + "</span>";
  };

  root.renderPetShotsHtml = function renderPetShotsHtml(review) {
    var shots = Array.isArray(review.shots) ? review.shots.slice(0, 3) : [];
    if (!shots.length) shots = root.composePetReviewShots(review);
    if (!shots.length) return "";
    var mark = review.userMark || "林";
    var petImage = review.petImage || petByKey("dog").image;
    var petName = review.petName || "小狗";
    var title = review.skillTitle || "";
    var altBase = petName + "和" + (review.userName || "同学") + "使用「" + title + "」的学习对话截图";
    return '<div class="pet-shots" data-count="' + shots.length + '">' + shots.map(function (shot, idx) {
      var caption = shot.caption || ("截图 " + (idx + 1));
      var alt = altBase + " · " + caption;
      var inner;
      if (shot.src) {
        inner = '<img src="' + htmlEsc(shot.src) + '" alt="' + htmlEsc(alt) + '" width="220" height="168" loading="lazy" decoding="async">';
      } else {
        var messages = (shot.messages || []).slice(0, 4);
        inner = '<div class="chat-shot" role="img" aria-label="' + htmlEsc(alt) + '">' +
          '<header class="chat-shot-head"><img src="' + htmlEsc(petImage) + '" alt=""><div><b>' + htmlEsc(petName) + '</b><span>' + htmlEsc(caption) + '</span></div></header>' +
          '<div class="chat-shot-feed">' + messages.map(function (m) {
            var user = m.role === "user";
            return '<div class="chat-shot-msg' + (user ? " user" : "") + '">' +
              (user
                ? '<span class="chat-shot-mark">' + htmlEsc(mark) + "</span>"
                : '<img class="chat-shot-face" src="' + htmlEsc(petImage) + '" alt="">') +
              '<div class="chat-shot-bubble">' + htmlEsc(m.text).replace(/\n/g, "<br>") + "</div></div>";
          }).join("") + "</div></div>";
      }
      return '<button type="button" class="pet-shot" data-shot="' + idx + '">' + inner +
        "<figcaption>" + htmlEsc(caption) + "</figcaption></button>";
    }).join("") + "</div>";
  };

  root.renderPetReviewHtml = function renderPetReviewHtml(review, opts) {
    opts = opts || {};
    var who = opts.public
      ? htmlEsc(review.userName) + "的" + htmlEsc(review.petName)
      : htmlEsc(review.petName);
    var sub = opts.public
      ? htmlEsc(review.userSchool || "") + " · " + htmlEsc(review.verdict || "跑通了")
      : "亲自看完这次学习 · " + htmlEsc(review.verdict || "跑通了");
    return '<div class="pet-review">' +
      '<div class="pet-review-head">' +
      '<img src="' + htmlEsc(review.petImage) + '" alt="">' +
      '<div class="pet-review-who"><b>' + who + "</b><span>" + sub + "</span></div>" +
      root.starRowHtml(review.stars) +
      "</div>" +
      '<p class="pet-review-note">' + htmlEsc(review.note) + "</p>" +
      root.renderPetShotsHtml(review) +
      "</div>";
  };

  root.commentTeaserHtml = function commentTeaserHtml(skillId, skillTitle) {
    var list = root.skillCommentsFor(skillId, skillTitle);
    if (!list.length) return "";
    var avg = Math.round(list.reduce(function (sum, c) { return sum + (Number(c.stars) || 5); }, 0) / list.length * 10) / 10;
    var faces = list.slice(0, 3).map(function (c) {
      return '<img src="' + htmlEsc(c.petImage) + '" alt="' + htmlEsc(c.petName) + '">';
    }).join("");
    return '<div class="pet-teaser"><span class="pet-teaser-faces">' + faces +
      "</span><span><b>" + list.length + " 条宠物评价</b> · " + avg + " 星，可辨别适不适合你</span></div>";
  };

  root.bindPetReviewShots = function bindPetReviewShots(host) {
    if (!host || host.dataset.shotBound) return;
    host.dataset.shotBound = "1";
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-shot]");
      if (!btn || !host.contains(btn)) return;
      var wrap = btn.closest(".pet-shots");
      if (!wrap) return;
      var open = btn.classList.contains("is-open");
      wrap.querySelectorAll("[data-shot]").forEach(function (el) { el.classList.remove("is-open"); });
      if (!open) btn.classList.add("is-open");
    });
  };
})(window);

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
      note: "跑完了！你把活动数据补上之后，这条路径才真正跑通。下一场先写结果数字，STAR 会更稳。"
    }
  ];

  root.readPetReviews = function readPetReviews() {
    var user = readJson(REVIEW_KEY, []);
    if (!Array.isArray(user)) user = [];
    var map = {};
    seedReviews.concat(user).forEach(function (r) {
      map[String(r.skillId) + "::" + String(r.taskTitle)] = Object.assign({}, r, {
        petName: "小狗",
        petImage: "assets/companion-dog-transparent.png"
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
      note: root.composePetReviewNote(skillTitle, pet.name)
    };
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
})(window);

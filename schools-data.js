/* Growth Fork · 北京高校专区演示数据（非官方校方入驻） */
(function (root) {
  const skills = {
    resume: { id: "resume", category: "career", type: "single", typeLabel: "单 Skill", verified: "可运行", color: "#FF4F9A" },
    career: { id: "career", category: "career", type: "expert", typeLabel: "专家路径", verified: "已验证", color: "#141416", expert: true },
    interview: { id: "interview", category: "career", type: "single", typeLabel: "单 Skill", verified: "可运行", color: "#141416" },
    research: { id: "research", category: "research", type: "expert", typeLabel: "专家路径", verified: "已验证", color: "#141416", expert: true },
    demo: { id: "demo", category: "project", type: "path", typeLabel: "组合路径", verified: "已验证", color: "#FF4F9A" },
    exam: { id: "exam", category: "study", type: "single", typeLabel: "单 Skill", verified: "可运行", color: "#FF4F9A" }
  };

  function skill(base, extra) {
    return Object.assign({}, skills[base], extra);
  }

  root.GROWTH_SCHOOLS = [
    {
      id: "thu",
      name: "清华大学",
      short: "清华",
      letter: "清",
      mark: "square",
      markFill: "ink",
      cats: ["综合", "理工"],
      tags: ["综合", "理工", "保研"],
      desc: "本校同学把实验室入门、夏令营材料和互联网提前批，收成可复用的科研与求职 Skill。",
      skillCount: 86,
      uses: "12.4 万",
      rank: 1,
      catalog: [
        skill("career", { title: "互联网提前批 28 天冲刺", desc: "按清华同学真实投递节奏，从简历到终面复盘走完提前批。", name: "林然 · 清华 2023", role: "前字节产品运营实习生", avatar: "https://i.pravatar.cc/80?img=47", users: "3,102", rate: "78%", forks: "96" }),
        skill("resume", { title: "实验室经历写成简历项目", desc: "把组会、实验和论文边角料，改成有指标的实习项目描述。", name: "顾言 · 清华计算机", initial: "顾", users: "2,640", rate: "86%", forks: "121" }),
        skill("research", { title: "CS 夏令营材料时间线", desc: "套磁、推荐信、研究计划按周拆开，避免卡在最后十天。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "1,874", rate: "71%", forks: "54" }),
        skill("demo", { title: "挑战杯路演叙事营", desc: "选题、原型、分工和答辩稿，一周做成可展示 Demo。", name: "清创社", initial: "清", users: "968", rate: "73%", forks: "61" }),
        skill("interview", { title: "产品岗追问模拟", desc: "按提前批面试节奏追问，补齐案例细节和表达漏洞。", name: "阿哲 · 清华经管", initial: "哲", users: "744", rate: "80%", forks: "39" }),
        skill("exam", { title: "推研英语与机试周计划", desc: "按剩余天数生成能完成的机试、口语和专业课清单。", name: "Mia · 清华 2024", initial: "M", users: "1,205", rate: "77%", forks: "48" })
      ]
    },
    {
      id: "pku",
      name: "北京大学",
      short: "北大",
      letter: "北",
      mark: "circle",
      markFill: "ink",
      cats: ["综合"],
      tags: ["综合", "学术", "选调"],
      desc: "燕园同学把学术写作、夏令营和选调材料沉淀下来，后来者按本校节奏走，不必从零问。",
      skillCount: 74,
      uses: "10.8 万",
      rank: 2,
      catalog: [
        skill("research", { title: "夏令营材料清单与陈述", desc: "按目标院校整理推荐信节奏、研究计划和自我陈述提纲。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "2,011", rate: "74%", forks: "58" }),
        skill("resume", { title: "社团与支教经历项目化", desc: "把普通活动写成有对象、有结果、可追问的简历条目。", name: "顾言 · 北大元培", initial: "顾", users: "1,882", rate: "83%", forks: "97" }),
        skill("career", { title: "选调生材料 21 天", desc: "从岗位匹配到面试案例，按北大同学走通过的节点拆任务。", name: "清清 · 北大政府管理", initial: "清", expert: true, role: "选调上岸学长", avatar: "https://i.pravatar.cc/80?img=12", users: "1,430", rate: "69%", forks: "41" }),
        skill("exam", { title: "学术写作周计划", desc: "文献精读、提纲和初稿按课程 DDL 生成可完成清单。", name: "Mia · 北大学习博主", initial: "M", users: "1,560", rate: "81%", forks: "66" }),
        skill("interview", { title: "咨询 / 互联网案例追问", desc: "用本校常见面试题追问，补市场感与结构化表达。", name: "阿哲", initial: "哲", users: "612", rate: "76%", forks: "28" }),
        skill("demo", { title: "社会调研一周共创", desc: "选题、问卷、访谈和路演，7 天交出可展示成果。", name: "未名实践社", initial: "未", users: "487", rate: "70%", forks: "33" })
      ]
    },
    {
      id: "bit",
      name: "北京理工大学",
      short: "北理",
      letter: "理",
      mark: "square",
      markFill: "pink",
      cats: ["理工"],
      tags: ["理工", "竞赛", "考研"],
      desc: "徐特立、智能车和建模的走通经验被收成 Skill，适合要竞赛成果或考研 408 的同学。",
      skillCount: 61,
      uses: "7.2 万",
      rank: 3,
      catalog: [
        skill("demo", { title: "数学建模国赛避坑", desc: "48 小时内选定可交付、有数据支撑的赛题方向。", name: "模友社 · 北理", initial: "模", users: "1,120", rate: "72%", forks: "84" }),
        skill("career", { title: "国防特色简历表达", desc: "在可公开范围内，把项目写成企业能读懂的贡献。", name: "林然", role: "北理 2022 · 认证创作者", avatar: "https://i.pravatar.cc/80?img=15", users: "890", rate: "75%", forks: "37" }),
        skill("exam", { title: "考研 408 复习生成器", desc: "按剩余周数拆数据结构、组成原理、操作系统与网络。", name: "Mia", initial: "M", users: "2,340", rate: "68%", forks: "102" }),
        skill("research", { title: "实验室冷启动一周", desc: "读论文、找选题、写第一份研究笔记的最小闭环。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "654", rate: "66%", forks: "29" }),
        skill("interview", { title: "硬件 / 算法岗模拟面", desc: "按北理常见岗位追问项目细节与基础题。", name: "阿哲", initial: "哲", users: "421", rate: "77%", forks: "22" }),
        skill("resume", { title: "智能车经历项目化", desc: "把调试日志变成可量化的系统与协作成果。", name: "顾言", initial: "顾", users: "508", rate: "80%", forks: "31" })
      ]
    },
    {
      id: "buaa",
      name: "北京航空航天大学",
      short: "北航",
      letter: "航",
      mark: "hex",
      markFill: "ink",
      cats: ["理工"],
      tags: ["理工", "航宇航", "竞赛"],
      desc: "冯如杯、航模和院所实习被本校同学写成可运行 Skill，后来者按节点准备作品与材料。",
      skillCount: 58,
      uses: "6.9 万",
      rank: 4,
      catalog: [
        skill("demo", { title: "冯如杯项目叙事一周", desc: "把作品做成评委能听懂的问题、方法和结果。", name: "冯如工作室", initial: "冯", users: "776", rate: "74%", forks: "52" }),
        skill("career", { title: "航天院所实习投递", desc: "简历、保密表述和面试案例，按院所节奏拆 21 天。", name: "林然", role: "北航 2023 · 院所实习", avatar: "https://i.pravatar.cc/80?img=47", users: "640", rate: "71%", forks: "34" }),
        skill("research", { title: "沈元学院保研材料", desc: "研究计划、推荐信和夏令营时间线按周对齐。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "512", rate: "69%", forks: "27" }),
        skill("resume", { title: "航模竞赛写成项目", desc: "把试飞、迭代和分工，改成工程简历条目。", name: "顾言", initial: "顾", users: "433", rate: "82%", forks: "29" }),
        skill("interview", { title: "航空宇航基础追问", desc: "模拟专业面，补项目边界和基础概念。", name: "阿哲", initial: "哲", users: "298", rate: "73%", forks: "18" }),
        skill("exam", { title: "期末与机试周计划", desc: "按课程难度生成能完成的复习和编程清单。", name: "Mia", initial: "M", users: "801", rate: "79%", forks: "44" })
      ]
    },
    {
      id: "ruc",
      name: "中国人民大学",
      short: "人大",
      letter: "人",
      mark: "square",
      markFill: "ink",
      cats: ["综合"],
      tags: ["综合", "经管", "选调"],
      desc: "经管实习、学术写作和选调材料是人大专区最常被 Fork 的路径。",
      skillCount: 52,
      uses: "6.1 万",
      rank: 5,
      catalog: [
        skill("career", { title: "选调生材料清单", desc: "岗位匹配、证明材料和面试故事按本校节奏排列。", name: "清清 · 人大公管", initial: "清", expert: true, role: "选调上岸学姐", avatar: "https://i.pravatar.cc/80?img=23", users: "1,102", rate: "70%", forks: "46" }),
        skill("resume", { title: "商赛与调研项目化", desc: "把案例赛写成咨询/互金能读的项目描述。", name: "顾言", initial: "顾", users: "864", rate: "84%", forks: "55" }),
        skill("interview", { title: "经管实习面试追问", desc: "按行业研究、市场和运营岗补案例细节。", name: "阿哲", initial: "哲", users: "590", rate: "78%", forks: "31" }),
        skill("research", { title: "社科研究计划入门", desc: "从问题意识到文献综述的第一份可提交提纲。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "477", rate: "67%", forks: "22" }),
        skill("exam", { title: "期末论文周计划", desc: "按 DDL 拆选题、文献和初稿，避免最后一夜。", name: "Mia", initial: "M", users: "933", rate: "80%", forks: "40" }),
        skill("demo", { title: "社会调查共创营", desc: "问卷、访谈和路演一周做成可展示成果。", name: "人大实践团", initial: "人", users: "356", rate: "72%", forks: "24" })
      ]
    },
    {
      id: "bnu",
      name: "北京师范大学",
      short: "北师大",
      letter: "师",
      mark: "circle",
      markFill: "pink",
      cats: ["师范"],
      tags: ["师范", "保研", "教资"],
      desc: "教育研究、教资面试和保研材料由本校同学共创，适合要走教师或学术路径的人。",
      skillCount: 41,
      uses: "4.3 万",
      recent: true,
      catalog: [
        skill("research", { title: "教育研究入门一周", desc: "读论文、找选题、写第一份研究设计。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "612", rate: "68%", forks: "26" }),
        skill("exam", { title: "教资面试追问清单", desc: "结构化、试讲和答辩按剩余天数排计划。", name: "Mia", initial: "M", users: "1,440", rate: "82%", forks: "71" }),
        skill("resume", { title: "教育实习写成项目", desc: "把听课、带班和公开课改成可验证成果。", name: "顾言", initial: "顾", users: "388", rate: "81%", forks: "19" }),
        skill("career", { title: "保研材料检查包", desc: "成绩、科研和面试故事按北师节奏核对。", name: "林然", role: "北师大 2023", avatar: "https://i.pravatar.cc/80?img=47", users: "504", rate: "73%", forks: "28" }),
        skill("interview", { title: "教师岗模拟面试", desc: "按真实面试追问教学设计与班级案例。", name: "阿哲", initial: "哲", users: "276", rate: "76%", forks: "15" })
      ]
    },
    {
      id: "bupt",
      name: "北京邮电大学",
      short: "北邮",
      letter: "邮",
      mark: "square",
      markFill: "chrome",
      cats: ["理工"],
      tags: ["理工", "互联网", "实习"],
      desc: "后端、产品和技术实习是北邮专区最热的 Skill，按提前批节点使用。",
      skillCount: 49,
      uses: "8.6 万",
      catalog: [
        skill("career", { title: "大厂后端实习投递", desc: "简历、项目和笔面试按北邮同学走通的 28 天拆开。", name: "林然", role: "北邮 2022 · 前大厂实习", avatar: "https://i.pravatar.cc/80?img=11", users: "2,280", rate: "76%", forks: "88" }),
        skill("resume", { title: "课程项目写成实习作品", desc: "把课设和实验室代码改成可讲的工程项目。", name: "顾言", initial: "顾", users: "1,670", rate: "85%", forks: "93" }),
        skill("interview", { title: "后端基础与项目追问", desc: "按实习面试节奏补网络、存储和项目细节。", name: "阿哲", initial: "哲", users: "1,102", rate: "79%", forks: "47" }),
        skill("demo", { title: "黑客马拉松一周共创", desc: "选题、分工、原型和路演，7 天可演示。", name: "北邮创新坊", initial: "邮", users: "540", rate: "71%", forks: "42" }),
        skill("exam", { title: "机试冲刺周计划", desc: "按剩余天数生成题单和复习块。", name: "Mia", initial: "M", users: "1,980", rate: "74%", forks: "81" })
      ]
    },
    {
      id: "uibe",
      name: "对外经济贸易大学",
      short: "贸大",
      letter: "贸",
      mark: "diamond",
      markFill: "ink",
      cats: ["财经"],
      tags: ["财经", "商科", "实习"],
      desc: "双语简历、商赛和四大/互金实习路径，由贸大同学按校招节点整理。",
      skillCount: 36,
      uses: "3.8 万",
      recent: true,
      catalog: [
        skill("resume", { title: "双语商科简历打磨", desc: "中英项目描述对齐，适合四大、咨询和跨境岗位。", name: "顾言", initial: "顾", users: "722", rate: "83%", forks: "44" }),
        skill("career", { title: "四大 / 互金实习 21 天", desc: "网申、笔试和面试案例按贸大节奏拆任务。", name: "林然", role: "贸大 2023 · 审计实习", avatar: "https://i.pravatar.cc/80?img=47", users: "860", rate: "72%", forks: "36" }),
        skill("interview", { title: "英文面试追问", desc: "补商业案例的英文表达和追问细节。", name: "阿哲", initial: "哲", users: "410", rate: "75%", forks: "21" }),
        skill("demo", { title: "商赛一周路演", desc: "行业研究、模型和答辩稿 7 天成型。", name: "贸大商赛队", initial: "贸", users: "298", rate: "70%", forks: "19" }),
        skill("exam", { title: "考证与期末并行计划", desc: "CPA 预习和课程 DDL 排进同一张周历。", name: "Mia", initial: "M", users: "654", rate: "78%", forks: "27" })
      ]
    },
    {
      id: "cufe",
      name: "中央财经大学",
      short: "中财",
      letter: "财",
      mark: "pill",
      markFill: "pink",
      cats: ["财经"],
      tags: ["财经", "金融", "考证"],
      desc: "金融实习、建模和证考计划是中财同学最常贡献的 Skill。",
      skillCount: 33,
      uses: "3.4 万",
      recent: true,
      catalog: [
        skill("career", { title: "金融实习网申冲刺", desc: "从投递名单到面试故事，按中财校友节奏走 21 天。", name: "林然", role: "中财 2022 · 投行实习", avatar: "https://i.pravatar.cc/80?img=48", users: "790", rate: "71%", forks: "33" }),
        skill("resume", { title: "量化 / 研究助理项目化", desc: "把课程作业写成研究员能看的数据项目。", name: "顾言", initial: "顾", users: "512", rate: "80%", forks: "28" }),
        skill("exam", { title: "CPA / 考研并行周计划", desc: "按剩余时间生成能完成的章节清单。", name: "Mia", initial: "M", users: "1,120", rate: "69%", forks: "51" }),
        skill("interview", { title: "金融市场案例追问", desc: "补宏观、行业和项目细节的表达。", name: "阿哲", initial: "哲", users: "344", rate: "74%", forks: "17" }),
        skill("demo", { title: "投资研究一周共创", desc: "选题、模型和路演做成可展示一页纸。", name: "中财投研社", initial: "财", users: "266", rate: "68%", forks: "14" })
      ]
    },
    {
      id: "bjtu",
      name: "北京交通大学",
      short: "北交",
      letter: "交",
      mark: "square",
      markFill: "ink",
      cats: ["理工"],
      tags: ["理工", "交通", "考研"],
      desc: "交通、软件和考研路径由北交同学共创，适合要实习也要升学的人。",
      skillCount: 29,
      uses: "2.9 万",
      recent: true,
      catalog: [
        skill("exam", { title: "考研专业课周计划", desc: "按剩余周数拆专业课和数学，避免平均用力。", name: "Mia", initial: "M", users: "980", rate: "70%", forks: "43" }),
        skill("career", { title: "互联网 / 国企实习双线", desc: "两套简历和投递节奏，按北交校历对齐。", name: "林然", role: "北交 2023", avatar: "https://i.pravatar.cc/80?img=14", users: "430", rate: "73%", forks: "20" }),
        skill("resume", { title: "课设与实验室项目化", desc: "把交通或软件课设写成可讲项目。", name: "顾言", initial: "顾", users: "356", rate: "81%", forks: "22" }),
        skill("demo", { title: "建模与数竞一周营", desc: "选题、分工和答辩，7 天可交付。", name: "北交建模社", initial: "交", users: "288", rate: "69%", forks: "18" }),
        skill("interview", { title: "开发岗项目追问", desc: "补课设细节、基础题和协作分工。", name: "阿哲", initial: "哲", users: "241", rate: "75%", forks: "12" })
      ]
    },
    {
      id: "cau",
      name: "中国农业大学",
      short: "农大",
      letter: "农",
      mark: "circle",
      markFill: "ink",
      cats: ["农林"],
      tags: ["农林", "科研", "考研"],
      desc: "田间试验、科研入门和升学材料被农大同学收成 Skill，适合农学与生科路径。",
      skillCount: 24,
      uses: "1.8 万",
      recent: true,
      catalog: [
        skill("research", { title: "农学科研冷启动", desc: "从读综述到第一份试验记录的最小闭环。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "322", rate: "67%", forks: "16" }),
        skill("exam", { title: "考研农学周计划", desc: "按剩余天数生成专业课和英语清单。", name: "Mia", initial: "M", users: "540", rate: "72%", forks: "24" }),
        skill("resume", { title: "试验与社会实践项目化", desc: "把采样、问卷和报告写成可验证成果。", name: "顾言", initial: "顾", users: "210", rate: "79%", forks: "11" }),
        skill("career", { title: "涉农企业实习投递", desc: "岗位匹配、简历和面试按农大节奏拆 21 天。", name: "林然", role: "农大 2023", avatar: "https://i.pravatar.cc/80?img=47", users: "188", rate: "70%", forks: "9" }),
        skill("demo", { title: "创新创业项目叙事", desc: "把课题做成评委能听懂的问题和结果。", name: "农大创赛队", initial: "农", users: "156", rate: "68%", forks: "8" })
      ]
    },
    {
      id: "ccmu",
      name: "首都医科大学",
      short: "首医",
      letter: "医",
      mark: "circle",
      markFill: "chrome",
      cats: ["医科"],
      tags: ["医科", "考研", "规培"],
      desc: "临床实习叙事、考研西综和科研入门，由首医同学按学期节点整理。",
      skillCount: 21,
      uses: "1.5 万",
      recent: true,
      catalog: [
        skill("exam", { title: "西综复习计划生成器", desc: "按剩余月份拆生理、病理、内科，避免平均推进。", name: "Mia", initial: "M", users: "860", rate: "71%", forks: "39" }),
        skill("resume", { title: "临床见习写成经历", desc: "在合规范围内，把见习观察写成可讲故事。", name: "顾言", initial: "顾", users: "190", rate: "77%", forks: "10" }),
        skill("research", { title: "医学科研入门一周", desc: "读临床研究、找可做的小问题和第一份笔记。", name: "周知", role: "高校科研导师 · 认证专家", avatar: "https://i.pravatar.cc/80?img=32", users: "244", rate: "65%", forks: "13" }),
        skill("career", { title: "考研 / 规培双线准备", desc: "时间块拆开，减少两头都做不完。", name: "林然", role: "首医 2022", avatar: "https://i.pravatar.cc/80?img=36", users: "312", rate: "69%", forks: "15" }),
        skill("interview", { title: "医学面试追问", desc: "补伦理边界、临床故事和基础概念。", name: "阿哲", initial: "哲", users: "142", rate: "74%", forks: "7" })
      ]
    }
  ];

  const org = function (id, kind, name) {
    return { id: id, kind: kind, name: name };
  };

  const SCHOOL_ORGS = {
    thu: {
      orgs: [
        org("cs", "major", "计算机系"),
        org("sem", "major", "经管学院"),
        org("lab", "lab", "实验室圈"),
        org("chuang", "club", "清创社")
      ],
      skills: ["sem", "lab", "cs", "chuang", "sem", "cs"]
    },
    pku: {
      orgs: [
        org("yuanpei", "major", "元培学院"),
        org("gpa", "major", "政府管理学院"),
        org("acad", "lab", "学术写作圈"),
        org("weiming", "team", "未名实践社")
      ],
      skills: ["acad", "yuanpei", "gpa", "acad", "yuanpei", "weiming"]
    },
    bit: {
      orgs: [
        org("cs", "major", "计算机学院"),
        org("auto", "major", "车辆与智能车"),
        org("lab", "lab", "实验室圈"),
        org("moyou", "club", "模友社")
      ],
      skills: ["moyou", "auto", "cs", "lab", "cs", "auto"]
    },
    buaa: {
      orgs: [
        org("sy", "major", "沈元学院"),
        org("aero", "major", "航空宇航"),
        org("fengru", "club", "冯如工作室"),
        org("hangmo", "club", "航模队")
      ],
      skills: ["fengru", "aero", "sy", "hangmo", "aero", "sy"]
    },
    ruc: {
      orgs: [
        org("gongguan", "major", "公共管理学院"),
        org("biz", "major", "商学院"),
        org("writing", "lab", "社科写作圈"),
        org("shijian", "team", "人大实践团")
      ],
      skills: ["gongguan", "biz", "biz", "writing", "writing", "shijian"]
    },
    bnu: {
      orgs: [
        org("edu", "major", "教育学部"),
        org("teach", "team", "教资备考圈"),
        org("intern", "club", "教育实习团")
      ],
      skills: ["edu", "teach", "intern", "edu", "teach"]
    },
    bupt: {
      orgs: [
        org("cs", "major", "计算机学院"),
        org("se", "major", "软件学院"),
        org("chuang", "club", "北邮创新坊")
      ],
      skills: ["cs", "se", "cs", "chuang", "cs"]
    },
    uibe: {
      orgs: [
        org("biz", "major", "国际商学院"),
        org("finance", "major", "金融学院"),
        org("contest", "team", "贸大商赛队")
      ],
      skills: ["biz", "finance", "biz", "contest", "finance"]
    },
    cufe: {
      orgs: [
        org("finance", "major", "金融学院"),
        org("quant", "lab", "量化研究圈"),
        org("touyan", "club", "中财投研社")
      ],
      skills: ["finance", "quant", "finance", "finance", "touyan"]
    },
    bjtu: {
      orgs: [
        org("trans", "major", "交通运输"),
        org("se", "major", "软件学院"),
        org("model", "club", "北交建模社")
      ],
      skills: ["trans", "se", "se", "model", "se"]
    },
    cau: {
      orgs: [
        org("agr", "major", "农学"),
        org("lab", "lab", "试验站"),
        org("chuang", "team", "农大创赛队")
      ],
      skills: ["lab", "agr", "lab", "agr", "chuang"]
    },
    ccmu: {
      orgs: [
        org("clinic", "major", "临床医学"),
        org("xizong", "team", "西综备考圈"),
        org("medlab", "lab", "医学科研圈")
      ],
      skills: ["xizong", "clinic", "medlab", "clinic", "clinic"]
    }
  };

  root.GROWTH_SCHOOLS.forEach(function (school) {
    const spec = SCHOOL_ORGS[school.id];
    if (!spec) return;
    school.orgs = spec.orgs;
    school.catalog.forEach(function (item, i) {
      item.orgId = spec.skills[i] || spec.orgs[0].id;
    });
  });

  root.ORG_KIND_ORDER = ["major", "club", "lab", "team"];
  root.ORG_KIND_LABEL = { major: "专业", club: "社团", lab: "实验室", team: "竞赛与实践" };

  root.GROWTH_HOT_SKILLS = [
    { schoolId: "thu", title: "互联网提前批 28 天冲刺", uses: "3,102", skillId: "career" },
    { schoolId: "pku", title: "夏令营材料清单与陈述", uses: "2,011", skillId: "research" },
    { schoolId: "bupt", title: "大厂后端实习投递", uses: "2,280", skillId: "career" },
    { schoolId: "bit", title: "数学建模国赛避坑", uses: "1,120", skillId: "demo" },
    { schoolId: "buaa", title: "冯如杯项目叙事一周", uses: "776", skillId: "demo" },
    { schoolId: "ruc", title: "选调生材料清单", uses: "1,102", skillId: "career" }
  ];

  root.renderSchoolMark = function renderSchoolMark(school, size) {
    size = size || 40;
    const src = "assets/schools/" + school.id + ".png";
    return `<img class="school-mark" src="${src}" alt="" width="${size}" height="${size}">`;
  };

  root.schoolById = function schoolById(id) {
    return root.GROWTH_SCHOOLS.find(function (s) { return s.id === id; });
  };

  root.schoolByName = function schoolByName(name) {
    if (!name) return null;
    var n = String(name).trim();
    return root.GROWTH_SCHOOLS.find(function (s) { return s.name === n; })
      || root.GROWTH_SCHOOLS.find(function (s) { return s.short === n; })
      || null;
  };

  root.readOnboardingProfile = function readOnboardingProfile() {
    try {
      var raw = localStorage.getItem("growth-fork-onboarding-profile-v1");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  root.certifiedSchool = function certifiedSchool() {
    var profile = root.readOnboardingProfile();
    if (!profile || !profile.school) return null;
    return root.schoolByName(profile.school);
  };
})(window);

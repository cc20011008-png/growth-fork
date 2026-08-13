/** Catalog of demo skills used by the planner gate. */
export const SKILLS = [
  {
    id: "literature-review",
    title: "文献综述撰写 Skill",
    blurb: "把论文主题、方法与缺口收成可写大纲",
    tomatoes: 2,
    keywords: ["文献", "综述", "论文", "阅读笔记", "主题归类", "研究缺口"],
  },
  {
    id: "resume-polish",
    title: "简历项目化表达",
    blurb: "把经历写成可投递的项目条目",
    tomatoes: 2,
    keywords: ["简历", "实习", "项目化", "经历", "投递"],
  },
  {
    id: "cold-email",
    title: "冷邮件沟通 Skill",
    blurb: "起草并跟踪外联邮件（平台内可观测回复）",
    tomatoes: 1,
    keywords: ["冷邮件", "邮件", "外联", "导师", "沟通信"],
  },
  {
    id: "interview-drill",
    title: "面试模拟 Skill",
    blurb: "按岗位追问并整理可复盘答法",
    tomatoes: 2,
    keywords: ["面试", "模拟面试", "自我介绍", "行为面试"],
  },
  {
    id: "data-clean",
    title: "问卷数据清洗 Skill",
    blurb: "整理字段、异常值与分析思路",
    tomatoes: 2,
    keywords: ["问卷", "数据", "清洗", "统计", "表格"],
  },
  {
    id: "study-outline",
    title: "学习大纲生成 Skill",
    blurb: "把模糊目标拆成可执行学习块",
    tomatoes: 1,
    keywords: ["大纲", "复习", "刷题计划", "笔记整理", "写作"],
  },
];

/** Phrases that usually mean offline / self-complete (no Skill). */
export const SELF_COMPLETE_HINTS = [
  "图书馆", "还书", "占座", "跑步", "健身", "运动", "见面", "开会",
  "上课", "通勤", "吃饭", "睡觉", "洗衣", "打扫", "取快递", "办卡",
  "打印", "交材料", "盖章", "线下", "散步",
];
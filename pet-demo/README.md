# Pet Agent Demo · MeowPlan

液态银 + 粉的学习宠物应用壳。

## 页面

- `index.html` 首页：液态银宠物房间 + 学习对话框；每次打开会模拟宠物从市集寄回一封 Skill 推荐信
- `goals.html` 目标管理：记录中长期目标，一键生成今日计划
- `calendar.html` 学习日历
- `report.html` 月度小结（侧栏「数据统计」）

## 启动

```bash
npm start
```

打开 `http://localhost:3000/pet-demo/`

## 架构

```
pet-demo/
  css/   pet-room · …
  js/
    config/ pets · skills
    lib/ store · dom · date
    services/ planner · calendarAgent · focusTimer · petAgent
    views/ roomChat · letterSouvenir · …
    app-room.js
```

状态键：`gf-pet-demo-v3`

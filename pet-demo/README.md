# Pet Agent Demo · MeowPlan

液态银 + 粉的学习宠物应用壳。

## 页面

- `index.html` 今日计划：添加待办 / 从目标生成清单 / Skill 门禁
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
  css/   app-shell · today-plan · goals · …
  js/
    components/sidebar.js
    config/ pets · skills
    lib/ store · dom · date
    services/ planner · calendarAgent · focusTimer
    views/ todayPlan · goalsView · …
    app-*.js
```

状态键：`gf-pet-demo-v2`

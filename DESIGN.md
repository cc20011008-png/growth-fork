---
name: 成长 Fork
description: Douyin Campus chrome-and-pink over Cold Luxury silver — liquid chrome rooms, one bubblegum accent, chrome-rim glass.
colors:
  ink: "#141416"
  muted: "#6B6E78"
  canvas: "#E8EAEE"
  paper: "#F7F7F9"
  pink: "#FF4F9A"
  pink-deep: "#E83384"
  chrome: "#C9CDD4"
  silver: "#F4F5F7"
  mercury: "#C5C9D0"
  liquid: "#EEF0F4"
typography:
  display:
    fontFamily: "Outfit, \"Noto Sans SC\", sans-serif"
    fontSize: "15px"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  clock:
    fontFamily: "Outfit, \"Noto Sans SC\", sans-serif"
    fontSize: "clamp(3.4rem, 7vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "16px"
  card: "22px"
  sheet: "28px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "28px"
components:
  button-primary:
    backgroundColor: "{colors.pink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "11px 18px"
  button-primary-hover:
    backgroundColor: "{colors.pink-deep}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "11px 18px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "11px 18px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,.35)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "11px 18px"
  button-focus-go:
    backgroundColor: "{colors.pink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "14px 18px"
  button-focus-go-hover:
    backgroundColor: "{colors.pink-deep}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "14px 18px"
  chip-skill:
    backgroundColor: "rgba(255, 79, 154, 0.1)"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "8px 9px"
  chip-skill-on:
    backgroundColor: "rgba(255, 79, 154, 0.16)"
    textColor: "{colors.pink}"
    rounded: "{rounded.lg}"
    padding: "8px 9px"
  chip-focus:
    backgroundColor: "{colors.chrome}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0"
    height: "52px"
  chip-focus-on:
    backgroundColor: "{colors.pink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "0"
    height: "52px"
  nav-overlay:
    backgroundColor: "rgba(255, 255, 255, 0.42)"
    textColor: "#3D4148"
    rounded: "{rounded.pill}"
    padding: "6px 8px"
  card-chrome:
    backgroundColor: "rgba(247, 248, 250, 0.42)"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  card-focus:
    backgroundColor: "rgba(247, 248, 250, 0.78)"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "28px 28px 24px"
  chat-sheet:
    backgroundColor: "rgba(255, 255, 255, 0.72)"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "16px"
  bubble-assistant:
    backgroundColor: "rgba(255, 255, 255, 0.92)"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "10px 12px"
  bubble-user:
    backgroundColor: "{colors.pink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "10px 12px"
  send:
    backgroundColor: "{colors.pink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "9px 12px"
---

# Design System: 成长 Fork

## Overview

**Creative North Star: "Douyin Campus chrome-and-pink over Cold Luxury silver"**

成长 Fork is a silver-white metallic campus: liquid chrome atmosphere behind every page, bubblegum pink as the only warm pulse, chrome-rim glass cards, and an italic Outfit wordmark. The product is not a pastel dashboard and not a dark-mode toy. It is cold luxury with one campus-pink voice.

Opening 我的宠物 is walking into the pet's mercury apartment. The first viewport is the house and the companion (cat, dog, or capybara) on a pink cushion; the study sheet arrives as frosted chrome-rim glass, lower-left — the pet is the learning agent, not a mascot parked beside a to-do list.

Daily Plan 开始专注 walks into that same silver lounge from the other door. The first viewport is the doorway photograph and a chrome-rim glass card (进屋专注, 15 / 25 / 45 / 50, pink 开始倒计时). Starting the round sits you in the study: Outfit numerals in the oval campus window, one pink arc, the companion studying on the bench.

**Key Characteristics:**
- Silver-white mist canvas, mercury 3D room, chrome rims on glass
- One accent only: bubblegum pink
- Outfit italic wordmark + Noto Sans SC UI
- Companion pets remain cat / dog / capybara PNG cutouts
- Overlay UI floats; the room (or the mist) is the page
- Daily Plan focus is a walk-in study: window as clock, one pink arc

## Surfaces

- **Home**: Soft chrome-ring nest + companion pet, brand wordmark hero signal, glass search → task match
- **Match**: Stage (task + AI 完善) above, selectable skill tray + combo path below
- **Store**: Full Skill catalog + wish pool, same chrome/pink system
- **Create**: Web voice interview with chrome/pink AI orb
- **Detail**: App Store-like skill page + effect-preview chat
- **Map / Growth**: Campus heat map; personal homepage (`my-growth.html`) matches creator identity (small circular avatar + school certification, 关注 / 粉丝) plus 学习成就 / 专注时长 / 宠物情况, then 我的成长书架 as a Pomodoro-style learning stats board, then the same four shelves as nearby creators: 发布 / 用过（宠物在学习对话框完成后亲自沉淀评价）/ 收藏 / 需求悬赏
- **School Zone**: Nav opens the certified school's Skill page (`school-skills.html`); switch to 全国视角 for the Beijing directory (`school-zone.html?view=national`). Campus page groups Skills into 专业 / 社团 / 实验室 / 竞赛与实践 circles.
- **Learn** (`my-tasks.html`): Skill 学习工作台（原计划/任务页）
- **Daily Plan**: `calendar.html` 日计划 to-do；`plan-calendar.html` 月历。同属导航「每日计划」，点日历换页而非同页下翻。勾选完成会同步到日历格子。未完成事项上的 **开始专注** opens a fullscreen overlay (`focus-room.css` via `calendar.js`): doorway `assets/focus-threshold-bg.png` with chrome-rim glass 进屋专注 and duration chips 15 / 25 / 45 / 50 (default 25); **开始倒计时** enters the study (`assets/focus-session-bg.png`) where Outfit numerals sit in the oval window with one pink arc and the companion studies from `assets/focus-study-cat.png` / `focus-study-dog.png` / `focus-study-capybara.png`. **离开**, tab-hide, or Escape interrupts the round (the todo stays open). Completing the countdown marks the todo done and records the minutes.
- **My Pet** (`pet-demo/index.html`): Full-bleed orbitable 3D liquid-silver apartment (mercury walls and floor, bubblegum-pink sofa / rug / cushion, chrome drum and lamp, pink-neon oval window). The chosen companion PNG sits on the pink cushion, center-right. Overlay frosted-pill nav. Chrome-rim glass study sheet lower-left (Skill chips + compose from 学习页; the pet is the learning agent). No today-plan checklist. At 860px and below, nav links hide and the sheet docks to the bottom 42dvh.

## Colors

Silver field, one pink voice. Pink is furniture, neon, active nav, user bubbles, and the send control — never a second hue family.

### Primary
- **Bubblegum Pink** (`{colors.pink}`): The only accent. Wordmark on My Pet, active nav underline, 3D cove / window neon / sheen, Skill-chip stroke and icons, user chat bubbles, plus control, send fill, focus 开始倒计时, selected duration chip, window arc, and 开始专注. Hover on pill buttons deepens to **Pink Deep** (`{colors.pink-deep}`). Velvet furniture and the send gradient lift through `#FF6AA8` — same hue, not a second accent.

### Neutral
- **Ink** (`{colors.ink}`): Primary text, user avatar mark, contact-shadow tint in the 3D room, window-clock numerals.
- **Muted** (`{colors.muted}`): Secondary copy, file meta, non-active nav on mist pages, focus threshold warning.
- **Canvas** (`{colors.canvas}`): Product mist field behind glass pages.
- **Paper** (`{colors.paper}`): Solid fallback when transparency is reduced; ink-button type.
- **Silver** (`{colors.silver}`): Cool highlight, file-remove control, chrome-ring outer wash.
- **Chrome** (`{colors.chrome}`): Rim metal on glass cards and 3D chrome legs / drum / lamp shade; unselected focus duration chips.
- **Mercury** (`{colors.mercury}`): My Pet stage wash (body and CSS fallback behind the WebGL canvas).
- **Liquid** (`{colors.liquid}`): 3D wall / floor / ceiling metal (physical material, not a UI fill).

### Named Rules
**The One Pink Rule.** The accent is `{colors.pink}` only. No teal, blue, or purple. A lighter mix (`#FF6AA8`) is a tint of that pink for velvet and the send gradient, never a second brand color.

## Typography

**Display Font:** Outfit (with Noto Sans SC)
**Body Font:** Noto Sans SC (with PingFang SC)
**Label/Mono Font:** Noto Sans SC (no separate mono)

**Character:** Outfit is the italic campus wordmark — skewed, tight, pink on My Pet — and the upright window-clock numerals. Noto Sans SC carries every Chinese UI line: chat, chips, nav, compose, threshold copy. The pairing is metallic and bilingual, not editorial serif.

### Hierarchy
- **Display** (900 italic Outfit, 15px, letter-spacing -0.04em, skew -8deg): Brand wordmark `成长 Fork` only.
- **Clock** (800 upright Outfit, `clamp(3.4rem, 7vw, 5.6rem)` / `clamp(2.8rem, 14vw, 3.8rem)` below 860px, line-height 0.9, letter-spacing -0.045em): Daily Plan window-clock `MM:SS` only. Soft white highlight plus cool drop. Duration chips use the same family at 18px / 700.
- **Headline** (800, 16px, letter-spacing -0.03em): Study-sheet title (`和我聊聊今天的学习`). Focus threshold title `进屋专注` is 28px / 800 / -0.03em (24px below 860px).
- **Title** (600–800, 14px on My Pet overlay nav; 17px on mist-page nav): Navigation labels. Active My Pet item is 800 and pink.
- **Body** (400, 13px, line-height 1.55): Chat bubbles, compose field, buttons at 13px / 12px send.
- **Label** (700, 11–12px): Orbit hint, Skill chips (11px / 700), file chips (10px), 开始专注 (12px / 750). Sentence case. No tracked uppercase.

### Named Rules
**The Italic Wordmark Rule.** Outfit italic + skew is reserved for `成长 Fork`. Outfit upright numerals sit in the focus window clock and duration chips. UI sentences stay Noto Sans SC, upright.

## Layout

Mist pages sit in a 1400px shell with 28px side padding (16px below 720px). My Pet does not use that shell: the 3D stage is `position: fixed; inset: 0`. Overlay nav is `width: min(1280px, calc(100% - 40px))`, horizontally centered, 18px from the top. The study sheet is `left: 28px; bottom: 28px; width: min(420px, calc(100vw - 48px))`, min-height 390px, max-height `min(64vh, 680px)`. The orbit hint sits `right: 28px; bottom: 28px`. The pet reads center-right on the cushion; the sheet must not cover it.

Daily Plan focus is the same full-bleed overlay model: `position: fixed; inset: 0; z-index: 80`. The doorway photograph fills the scene; the glass card is centered (`width: min(100%, 440px)`). After start, the window-clock sits at `top: 36%; left: 50%`, `width: min(52vw, 640px)`, aspect 1.08. The studying pet sits `left: 38%; bottom: 7%`, `width: min(28vw, 340px)` (doorway stage: `left: 22%; bottom: 10%`). A frosted HUD docks to the bottom edge during the run.

Below 860px the sheet docks `left/right/bottom: 12px`, max-height 42dvh, radius 22px; nav links hide; the orbit hint lifts above the sheet. The focus window shrinks to `min(86vw, 340px)` at `top: 30%`; the pet centers; duration chips drop from four columns to two; the threshold card pads 22px 18px at 22px radius. Below 960px, mist-page nav wraps. Spacing rhythm is 8 / 16 / 28.

**The Apartment-First Rule.** My Pet is a full-bleed room with overlay chrome. Do not introduce a dashboard column, today-plan list, or second card stack on this surface.

**The Window-Clock Rule.** Daily Plan focus is a full-bleed study overlay. Time lives as Outfit numerals in the oval campus window, with one pink arc. Not a floating pomodoro ring, not a nested card stack.

## Elevation & Depth

Hybrid: the room is real 3D (soft key light, pink fill, contact blobs at 18% ink). UI depth is chrome-rim glass — inset white highlight, inset cool shade, 1px chrome ring, then a cool ambient drop — not a hard offset shadow.

### Shadow Vocabulary
- **Ambient card** (`box-shadow: 0 22px 50px rgba(110, 116, 128, 0.14)`): Default mist-page lift (`--shadow`).
- **Chrome glass** (`inset 0 1px 0 rgba(255,255,255,.82), inset 0 -1px 0 rgba(150,156,168,.16), 0 0 0 1px rgba(201,205,212,.28), 0 18px 44px rgba(110,116,128,.13)`): Shared `.glass` / `.chrome-card` family.
- **Study sheet** (`inset 0 1px 0 rgba(255,255,255,.92), inset 0 -1px 0 rgba(150,156,168,.28), 0 0 0 1px rgba(201,205,212,.7), 0 0 0 3px rgba(244,245,247,.55), 0 28px 64px rgba(70,76,90,.2)`): My Pet chat. Extra outer silver ring.
- **Focus card** (`0 0 0 1px rgba(255, 255, 255, 0.72) inset, 0 22px 50px rgba(40, 46, 58, 0.2), 0 0 0 1px rgba(155, 160, 170, 0.35)`): Threshold and result glass. Chrome 1.5px rim, `blur(22px) saturate(1.2)`.
- **Nav pill** (`inset 0 1px 0 rgba(255,255,255,.8), 0 12px 28px rgba(90,96,110,.1)`): Overlay nav on the room.
- **Focus HUD** (`inset 0 1px 0 rgba(255, 255, 255, 0.85)` over `rgba(247, 248, 250, 0.78)`): Run-state dock. `blur(18px) saturate(1.15)`, chrome hairline on top.
- **Pink send** (`0 10px 20px rgba(255, 79, 154, 0.32)`): Send control only.
- **Pink focus glow** (`0 14px 28px rgba(255, 79, 154, 0.28)`): 开始倒计时. Selected duration chips use `0 10px 20px` at the same pink alpha.
- **Pink arc** (`filter: drop-shadow(0 0 10px rgba(255, 79, 154, 0.55))`): The one window stroke, not a second accent.
- **3D contact** (circle, ink at 18% opacity): Under sofa and pedestal, not under UI. Result overlay uses the same ink at 18% as a wash.

Backdrop on the study sheet is `blur(28px) saturate(170%)`. Overlay nav is `blur(18px) saturate(160%)`. When `prefers-reduced-transparency`, both flatten to `{colors.paper}`.

### Named Rules
**The Chrome Rim Rule.** Glass earns its edge from inset white + chrome ring, not from a single drop shadow. Hard offset shadows are not this world.

## Shapes

Pills for nav, orbit hint, and primary actions (999px). Chrome cards use 22px (`--radius`). The My Pet study sheet and the focus threshold card are 28px on desktop, 22px when docked or below 860px. Skill chips and duration chips 14px; plus / send 12px; bubbles 16px with a 6px inner corner on the tail; file chips 10px; avatars and pet faces are circles. The window-clock is an oval (aspect 1.08) with one short pink arc, not a full ring. 3D furniture is rounded boxes, tufted spheres, and a chrome cylinder — no sharp rectilinear cabinetry.

**The Soft Metal Rule.** Corners read as bent chrome and stuffed velvet, not as a 4px app radius.

## Components

Tactile chrome and one pink pulse. Controls are compact; the room stays visible.

### Buttons
- **Shape:** Full pill (999px) on mist pages; send / plus on My Pet are 12px rounded squares.
- **Primary:** Pink fill, white type, 11px 18px, 13px / 700. Hover uses pink-deep. My Pet send is a 145deg gradient from `#FF6AA8` to pink, 12px / 800, with the pink send shadow.
- **Focus go:** Same pink pill as primary, larger: 14px 18px, 16px / 800, pink focus glow. Copy is 开始倒计时 on the door, 返回日计划 on the result. Hover pink-deep. Focus-visible is a 2px ink outline, 3px offset.
- **Ink:** Ink fill, paper type — secondary commit on mist pages.
- **Ghost:** Translucent white, hairline white border, inset highlight.
- **开始专注:** Pink-wash pill on an open todo, 6px 11px, 12px, 1px pink border at 22% alpha. Hover fills pink with white type. After a finished round, the control becomes a pink minutes label (`专注 N 分`).
- **Focus:** 2px pink outline, 2px offset (shared with chips, plus, and compose).

### Chips
- **Style:** Three-column Skill tiles. Pink wash `rgba(255, 79, 154, 0.1)`, 1px pink border at 18% alpha, 14px radius, 11px / 700 ink type, 8px 9px.
- **State:** Hover and `.on` raise wash to 16% and type to pink; border to 45% alpha.
- **Focus duration:** Four-up row of 15 / 25 / 45 / 50. Chrome-to-paper vertical metal, 14px radius, min-height 52px, Outfit 18px / 700. Selected is pink fill, white type, pink glow; `aria-pressed="true"`. Two columns below 860px. Default 25.

### Cards / Containers
- **Corner Style:** 22px chrome cards; 28px study sheet and focus threshold card.
- **Background:** White-to-chrome gradient over translucent paper, then blur.
- **Shadow Strategy:** Chrome Rim Rule.
- **Border:** `1px solid rgba(255,255,255,.68)` on shared glass; study sheet uses chrome `rgba(201, 205, 212, 0.95)`; focus card uses 1.5px `{colors.chrome}`.
- **Internal Padding:** 16px on the sheet head and message column; 10px 12px on compose; 28px 28px 24px on the focus card.

### Inputs / Fields
- **Style:** Compose is borderless and transparent inside the sheet. Onboarding fields are 14px radius, paper fill, 10% ink hairline.
- **Focus:** Compose uses the shared 2px pink outline. Onboarding fields shift the border to pink and add a 3px pink-soft ring.
- **Placeholder:** `#7A7E86`.

### Navigation
- **My Pet overlay:** Frosted pill, 14px links, 8px 14px padding. Hover is 55% white. Active is pink, 800, inset 2px pink underline — not a filled white pill.
- **Mist pages:** Sticky row, 17px / 600 muted links; active is ink on 72% white at 14px radius.
- **Wordmark:** 34px rounded-10 logo tile + italic Outfit `成长 Fork`. On My Pet the em is pink.
- **Avatar:** 40px circle, 2px white ring, pink-to-ink gradient fallback, 林 (or the profile initial).
- **Mobile:** Overlay links hide at 860px; mist nav wraps at 960px.

### Study Sheet (signature)
Chrome-rim glass column, lower-left. Head: 42px circular pet face + 16px / 800 title. Assistant bubbles are white, 16px 16px 16px 6px; user bubbles are pink, 16px 16px 6px 16px, with a 26px ink initial. Skill grid, then plus + field + send. Enters at 0.55s `cubic-bezier(0.16, 1, 0.3, 1)` (skipped when reduced motion).

### Liquid-Silver Room (signature)
Orbitable WebGL apartment. Walls / floor / ceiling are liquid metal (`{colors.liquid}`, metalness ~0.92) with a slow vertex ripple. Furniture is pink velvet (`#FF6AA8` with pink sheen) on chrome legs; the pet is a transparent PNG plane on the tufted cushion (not a sculpted mesh). Oval window carries pink-neon torus and a dusk city plate. Auto-rotate 0.35 until the user drags. Fallback: still room photograph + companion PNG, center-right.

### Focus Room (signature)
Fullscreen overlay on Daily Plan (`calendar.html` / `plan-calendar.html`). Doorway photograph (`assets/focus-threshold-bg.png`) plus centered chrome-rim glass: 进屋专注, the open todo line, duration chips, pink 开始倒计时, muted 中途离开会打断这一轮. Starting swaps to the study photograph (`assets/focus-session-bg.png`): Outfit `MM:SS` in the oval window, one pink SVG arc (`stroke-dasharray` 32→0 of 100, stroke-width 5, rotated -88deg), task label under the numerals, studying companion PNG on the bench with a 4.8s breathe (off when reduced motion). Bottom HUD: 离开 and 全屏 as transparent pills. Result reuses the same glass card (专注完成 / 这一轮被打断了). Leave, tab-hide, or Escape during the run breaks the round; the todo stays open. Completing the countdown checks the todo and writes `focusMinutes`.

## Do's and Don'ts

### Do:
- **Do** keep one accent: `{colors.pink}` on ≤ the furniture, neon, active nav, user bubble, send, and Daily Plan focus (arc, selected chip, 开始倒计时).
- **Do** treat My Pet as a walk-in mercury apartment: full-bleed orbitable room, overlay nav, study sheet lower-left.
- **Do** treat Daily Plan focus as walking into the pet's study: threshold glass, then Outfit numerals in the oval window with one pink arc.
- **Do** rim glass with inset white + chrome ring, then cool ambient shadow.
- **Do** set the wordmark in Outfit italic (skew -8deg); set UI in Noto Sans SC; set the window clock in Outfit upright numerals.
- **Do** keep companions as cat / dog / capybara PNG cutouts on the pink cushion, and as studying cutouts (`focus-study-cat.png` / `focus-study-dog.png` / `focus-study-capybara.png`) on the focus bench.

### Don't:
- **Don't** add teal, blue, purple, or a second accent family.
- **Don't** put a today-plan checklist on My Pet.
- **Don't** replace Daily Plan focus with a floating pomodoro ring on a blank canvas, or nest the timer as a card inside the calendar.
- **Don't** replace the 3D room with a card dashboard or dock the study sheet over the pet on desktop.
- **Don't** use hard offset shadows or a 4px app radius as the house shape.
- **Don't** assign Outfit italic to body sentences or nav labels.

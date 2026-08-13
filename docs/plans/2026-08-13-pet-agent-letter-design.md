# Pet Agent Letter — Design (2026-08-13)

## Goal
Treat the companion pet as a learning Agent (Travel-Frog style): when the user is away, it browses the Skill marketplace using the user's learning signals, then returns with **one letter** recommending a Skill. Opening the letter happens **on the pet-room homepage** (`pet-demo/index.html`), not a separate page.

## Confirmed product choices
- Open form: **letter only** (no gift-box souvenir)
- Screens: Away (future), Returned + letter prop, Letter overlay on homepage
- Demo frequency **C**: every refresh / reopen of the homepage mints a fresh "just returned" letter

## Learning signals (read-only aggregation)
- Active goals stuck ≥ 3 days without related calendar progress
- Recent calendar backlog / empty days
- Learning-dialog keywords (实习 / 综述 / 面试 / 外联…)
- Skill usage imbalance (e.g. many 文献综述 vs few 简历)

## UX on homepage
1. On load → `mintReturnLetter(state)` → status `returned`
2. Toast: 「小狗回来了 · 带了封信」
3. Chrome-rim letter prop near the cushion → click opens overlay
4. Overlay: wax seal, pet-voiced body, reason chips, Skill postcard
5. **收下这份 Skill** → jump to `skill-detail.html?id=…`
6. **先放进抽屉** → stash in `petAgent.drawer` (reopen from drawer pill)

## Files
- `pet-demo/js/services/petAgent.js` — signals + letter mint / accept / drawer
- `pet-demo/js/views/letterSouvenir.js` — prop, toast, overlay
- `pet-demo/js/app-room.js` — Demo C wire-up
- `pet-demo/js/lib/store.js` — `petAgent` state
- `pet-demo/css/pet-room.css` — letter styles (chrome / pink system)

## Non-goals (this demo)
- Real offline scheduling / background jobs
- Gift-box alternate open form
- Writing letters into the 3D scene mesh (DOM overlay is enough)

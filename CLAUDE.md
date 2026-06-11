# OPRS Design System — Claude Context

## What this project is
Storybook 8 (react-vite) component library for KSRTC's OPRS (Online Passenger Reservation System).
Deployed to GitHub Pages at: https://kaur6amarpreet-bot.github.io/oprs-design-system/
Repo: https://github.com/kaur6amarpreet-bot/oprs-design-system

## Owner
Amarpreet Kaur — Product / UX Designer, 8 years experience. Strong in UI/UX detail.
Adjust depth accordingly: skip basics, give context on non-obvious technical decisions.

## Tech stack
- React 18 + Vite
- Storybook 8, CSF3, autodocs
- Plain CSS (no Tailwind, no CSS-in-JS)
- Token file: `tokens.css` (design tokens as CSS custom properties)
- Dark tokens: `dark-tokens.css`
- Shared component styles: `components.css`

## Token reference (critical — use these, never hardcode values)
```
--color-primary: #1A56A0          (blue — used for focus rings, links, active states)
--color-secondary: #D84315        (deep orange — PRIMARY action color for buttons)
--color-secondary-container: #FFDBCA
--color-tertiary: #2E7D32         (green — checkmarks, success, availability)
--color-surface: #FFFFFF
--color-surface-container-low: #EEF2F9
--color-on-surface: #1C1B1F
--color-on-surface-variant: #49454E
--color-outline: (border color)
--color-outline-variant: #CAC4D0
--color-primary-container: #D6E4FF
--color-error: #BA1A1A
```

## Button hierarchy (decided — do not change without flagging)
| Variant class | Visual | Use |
|---|---|---|
| `.btn-filled-secondary` | Orange fill | PRIMARY CTA (Book, Continue, Select) |
| `.btn-outlined` | Orange border, transparent bg | Secondary actions |
| `.btn-text` | Orange text, no border | Tertiary / low-emphasis |
| `.icon-btn-outlined` | Blue border (--color-primary) | Icon-only actions (swap, etc.) |
- Blue filled (`btn-filled`) exists in code but NOT promoted — do not use as CTA.

## Segmented button active state
`.segmented-btn .seg-opt.active` = light blue tint (`--color-primary-container` bg, `--color-primary` text, bold). NOT solid fill.

## TextField
Only `variant="filled"` (MD3 style — surface-container background, rounded top, 2px bottom indicator).
Outlined variant exists in code but is NOT used in the product. Do not promote it.

## Select / DatePicker
Both use the **outlined floating border label** pattern:
- Container has `padding-top: 8px` to reserve space
- Label is `position: absolute; top: 0; transform: translateY(-50%)` on the trigger border
- White background on the label (`--color-surface`) to cut through the border
- Open state: label turns `--color-primary`
This pattern is called `md3-border-lbl` in the prototype.

## SeatMap component
Three layout variants — set via `layout` prop:
| layout | Bus type | Cell shape |
|---|---|---|
| `seater` | Non-AC Ordinary / Rajahamsa | Short wide cells (upright seats) |
| `sleeper` | Airavat Club Class / Full Sleeper | Tall cells, both upper + lower |
| `semi-sleeper` | Airavat / Fly Bus | Upper = berths, lower = seater cells |

Seat statuses: `available`, `ladies`, `blocked`, `conductor`, `quota`, `selected`

## File structure
```
src/components/
  Button/
  Chip/
  DataTable/
  DatePicker/
  Dialog/
  FilterDropdown/
  Icons/           ← searchable icon gallery, ~400 icons, click-to-copy
  NavigationDrawer/
  RadioGroup/
  SeatMap/
  SegmentedButton/
  Select/
  Snackbar/
  Tabs/
  TextField/
  Toggle/
  TopAppBar/
components.css     ← shared: buttons, chips, seat-chips, type-badge, segmented-btn
tokens.css         ← all design tokens
dark-tokens.css    ← dark mode overrides
```

## GitHub deployment
Workflow: `.github/workflows/deploy.yml`
Triggers on push to `main` → builds Storybook → deploys to Pages.
To deploy: `git push origin main` then enable Pages in repo Settings → Pages → Source → GitHub Actions.

## Known decisions (check MEMORY.md for full log)
- Outlined button border = orange (`--color-secondary`), NOT blue. Superseded the 2026-06-09 blue border decision.
- Icon gallery is under `Design Tokens/Icons` in Storybook sidebar.
- DataTable uses ag-Grid Community. Full-width rows for group headers and seat panel detail rows.
- DatePicker fixed: removed extra `</div>` that caused "Adjacent JSX elements" build error.
- Icons.stories.jsx fixed: removed duplicate `color` key in style object.

## Rules for this chat
- Never over-explain CSS or React basics.
- Before any significant rewrite, describe what will change and wait for confirmation.
- Only change what is asked. Flag improvements at the end, don't touch them.
- Check MEMORY.md before suggesting approaches to tasks previously attempted.

# UI Context

## Theme

Dark mode only.

The visual language is a modern technical workspace designed for productivity and focus. The interface uses near-black backgrounds, layered surfaces, subtle borders, and a vibrant blue accent color for interactive elements.

Design principles:

* High contrast for readability
* Minimal visual noise
* Layered depth through surfaces and borders
* Consistent spacing and alignment
* Blue reserved for actions, highlights, and active states
* Smooth transitions and hover feedback
* Accessibility-first color contrast

---

## Colors

Define all colors as CSS custom properties.

```css
:root {
  --bg-base: #0a0f1c;
  --bg-surface: #111827;

  --text-primary: #f8fafc;
  --text-muted: #94a3b8;

  --accent-primary: #3b82f6;

  --border-default: #1f2937;

  --state-error: #ef4444;
  --state-success: #22c55e;
}
```

| Role            | CSS Variable       | Value     |
| --------------- | ------------------ | --------- |
| Page background | `--bg-base`        | `#0a0f1c` |
| Surface         | `--bg-surface`     | `#111827` |
| Primary text    | `--text-primary`   | `#f8fafc` |
| Muted text      | `--text-muted`     | `#94a3b8` |
| Primary accent  | `--accent-primary` | `#3b82f6` |
| Border          | `--border-default` | `#1f2937` |
| Error           | `--state-error`    | `#ef4444` |
| Success         | `--state-success`  | `#22c55e` |

---

## Typography

| Role        | Font       | Variable      |
| ----------- | ---------- | ------------- |
| UI text     | Geist Sans | `--font-sans` |
| Code / Mono | Geist Mono | `--font-mono` |

Typography guidelines:

* Headings: `font-semibold`
* Body: `font-normal`
* Muted text: use `--text-muted`
* Code blocks: use mono font with elevated surface background

---

## Border Radius

| Context           | Class         |
| ----------------- | ------------- |
| Inline / small UI | `rounded-md`  |
| Cards / panels    | `rounded-xl`  |
| Modals / overlays | `rounded-2xl` |

---

## Component Library

**shadcn/ui** on top of **Tailwind CSS**.

Guidelines:

* Components live in `components/ui`
* Add components through the shadcn CLI
* Prefer composition over custom component creation
* Extend existing primitives before building new ones

Common components:

* Button
* Input
* Textarea
* Card
* Dialog
* Dropdown Menu
* Tooltip
* Sheet
* Tabs
* Select
* Table
* Command
* Sonner (toast notifications)

---

## Layout Patterns

### Application Shell

* Full viewport layout
* Sticky top navigation
* Scrollable content area
* Optional left navigation sidebar

```txt
┌───────────────────────────────┐
│ Navbar                        │
├─────────┬─────────────────────┤
│ Sidebar │ Main Content        │
│         │                     │
└─────────┴─────────────────────┘
```

### Sidebars

* Fixed width: `w-64`
* Right border separator
* Surface background
* Independent scrolling

### Cards & Panels

* Surface background
* Subtle border
* Rounded corners
* Consistent padding

### Modals

* Centered overlay
* Backdrop blur
* Elevated surface
* Focus trapping

### Navbar

* Fixed height: `h-14`
* Bottom border
* Surface background
* Sticky positioning

### Dashboard Grids

```txt
┌──────────┬──────────┬──────────┐
│ Stat     │ Stat     │ Stat     │
├──────────┴──────────┴──────────┤
│ Main Content                  │
└───────────────────────────────┘
```

---

## Icons

Use **Lucide React**.

Guidelines:

| Usage         | Size      |
| ------------- | --------- |
| Inline        | `h-4 w-4` |
| Buttons       | `h-5 w-5` |
| Navigation    | `h-5 w-5` |
| Feature Cards | `h-6 w-6` |

Rules:

* Stroke-based icons only
* Match icon weight across UI
* Use muted colors by default
* Use accent color for active states

---
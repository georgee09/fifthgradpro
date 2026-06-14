Read `AGENTS.md` before starting.

We're adding the design system and UI primitive components.

Install and configure `shadcn/ui`.

Add these shadcn components:
- Button
- Card
- Dialog
- Input
- Tabs
- TextArea
- ScrollArea

Do not modify the generated `components/ui/*` file after installation.

Also Install `lucide-react`.

Create `lib/utils.ts` with a reusable `cn()` helper and merging Tailwind classes.

Ensure all components matchs the existing darl theme in `global.css`.

### Check when done 
- All components import without errors
- `cn()` works properly 
- No default light styling appears

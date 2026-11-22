# FitPlan project notes

## Publish workflow (user rule)
- Make changes locally, build, and tell the user it is ready to test — do NOT push to GitHub automatically.
- Ask before every push: "طبّقت؟ أرفع على GitHub ولا لأ؟" Only push on explicit approval.

## Build & deploy
- `.\build.ps1` — rebuilds `preview/fitplan.html` (standalone) and `index.html` (hosted).
- `.\deploy.ps1 "message"` — build + commit + push (use only after user approval).

## Structure
- Source scripts/styles in `src/` — never edit `index.html`/`preview/fitplan.html` by hand; they are generated.
- User data lives in localStorage/IndexedDB on each device — code deploys never touch it.

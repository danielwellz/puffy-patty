# Testing checklist

Manual QA steps after the refactor and data seed (`backend npm run seed`).

- **Auth & roles**: Login with sample users (manager `09120001000`, head chef `09120000001`, staff `09120000002`, password `password123`). Ensure role-appropriate navigation (manager sees all links; staff cannot reach manager pages and is redirected).
- **Checklists**: Visit `/checklists/open`, `/checklists/handover`, `/checklists/close`. Persian items should match the seeded templates; toggling checkboxes saves without errors.
- **Prep list**: `/prep-list` shows all ~30 prep items (خمیر پیتزا، پیاز کاراملی، سس‌ها...). Manager/head chef can “Generate from template,” add items, and toggle done; staff can only toggle.
- **Shopping list**: `/shopping-list` shows nightly items grouped by category (پروتئین، نان، لبنیات، سبزیجات، چاشنی، مواد خشک، ادویه، بسته‌بندی). Manager can generate from template, add items, and mark acquired.
- **Logs**: `/purchase-log` and `/waste-log` allow adding entries (manager/head chef). Entries appear in the list with quantities/prices/reasons.
- **Periodic tasks**: `/periodic-tasks` lists tasks مثل «دیپ کلین آشپزخانه»، «تعویض روغن سرخ‌کن» با تناوب روزانه؛ marking done updates last completed date.
- **Expiration tracker**: `/expiration-tracker` lists rules (e.g., «گوشت چرخ کرده خام – ۲-۳ روز», «سس رشیو – ۵ روز») without errors.
- **Recipes**: `/recipes` shows seeded recipes (پافیرونی، اِل پُیو، برگرها، هات‌داگ‌ها، سس‌ها) with ingredients and notes.
- **Schedule**: `/schedule` shows seeded weekly shifts; manager can add a shift; others can view.
- **RTL/i18n**: Default language is Persian (RTL). Switch to EN via the topbar toggle and confirm layout flips; switch back to FA and ensure spacing/text direction remains correct.
- **Responsive**: Resize to mobile widths; sidebar collapses to the hamburger button; forms and lists remain readable without horizontal scrolling.
- **PWA build (optional)**: `cd frontend && npm run build` then serve the `build/` folder (e.g., `npx serve -s build`). Load on a phone over LAN, add to home screen, and confirm it opens in standalone mode.

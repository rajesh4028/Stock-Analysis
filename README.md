# Private Limited Company Compliance Checklist

A single-page, static checklist website for tracking recurring statutory compliance
for an Indian Private Limited Company registered in Karnataka:

- **GST** — monthly GSTR-1 / GSTR-3B, ITC reconciliation, e-way bills, annual GSTR-9/9C
- **Karnataka Professional Tax** — monthly employer return & employee PT deduction (Form 5), annual employer PT-EC payment
- **MCA / ROC Compliance** — monthly register upkeep, quarterly board meetings, half-yearly MSME-1, and annual AGM/AOC-4/MGT-7/DIR-3 KYC/DPT-3 etc.
- **Income Tax & TDS** (bonus, closely related) — monthly TDS payment, quarterly TDS returns & advance tax, annual ITR/tax audit

## Features

- **User accounts** — register / sign in / sign out with secure email + password auth (powered by Supabase)
- **Per-user cloud storage** — each account's checklist is saved to a database and syncs across devices; a local cache keeps it instant and works offline
- Checkbox tracking per item, with "N/A" (Not Applicable) marking that excludes items from progress
- Filter by frequency (Monthly / Quarterly / Half-Yearly / Annually) or search by keyword
- Progress bar overall and per frequency
- "Reset Monthly / Quarterly / Half-Yearly / Annual / All" buttons for starting a fresh period
- Light/dark theme toggle, print-friendly view
- Company name & financial year fields for labeling your own copy

## Architecture

| Layer | Technology |
|-------|------------|
| Frontend | Plain HTML/CSS/JS, hosted on GitHub Pages (no build step) |
| Auth | Supabase Auth (email/password) |
| Database | Supabase Postgres — one `checklist_state` row per user, protected by Row-Level Security |

The Supabase **anon key** used in the frontend is safe to expose publicly; users can
only ever read/write their own data because of the Row-Level Security policies in
[`supabase/schema.sql`](supabase/schema.sql). The `service_role` key and database
password are **never** placed in this repo.

## One-time Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **Create the database table:** open **SQL Editor → New query**, paste the contents
   of [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
3. **Connect the frontend:** in Supabase go to **Settings → API** and copy your
   **Project URL** and **anon public** key into [`assets/config.js`](assets/config.js).
4. **(Recommended) Set the Site URL:** in **Authentication → URL Configuration**, set
   the Site URL to your live GitHub Pages URL so email-confirmation and password-reset
   links point back to your site.
   - For quick testing you can instead turn off **Authentication → Providers → Email →
     "Confirm email"**, which lets accounts sign in immediately without email verification.

## Running locally

No build step required — it's plain HTML/CSS/JS. After completing the Supabase setup
above:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/login.html
```

The app entry point is `login.html`; once signed in you're taken to `index.html`.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set the source to the `main` branch, root folder.
3. Your checklist will be available at `https://<username>.github.io/<repo>/`.

## Updating the checklist

All compliance items live in [`assets/data.js`](assets/data.js) as a plain array —
edit titles, due dates, descriptions, or add new categories/items there.

## Disclaimer

This is a general reference checklist, not professional advice. GST, MCA, and Karnataka
Professional Tax due dates, thresholds, and penalties can change via government
notifications — verify current requirements with your CA/CS before relying on any
date shown here.

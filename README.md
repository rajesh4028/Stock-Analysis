# Private Limited Company Compliance Checklist

A single-page, static checklist website for tracking recurring statutory compliance
for an Indian Private Limited Company registered in Karnataka:

- **GST** — monthly GSTR-1 / GSTR-3B, ITC reconciliation, e-way bills, annual GSTR-9/9C
- **Karnataka Professional Tax** — monthly employer return & employee PT deduction (Form 5), annual employer PT-EC payment
- **MCA / ROC Compliance** — monthly register upkeep, quarterly board meetings, half-yearly MSME-1, and annual AGM/AOC-4/MGT-7/DIR-3 KYC/DPT-3 etc.
- **Income Tax & TDS** (bonus, closely related) — monthly TDS payment, quarterly TDS returns & advance tax, annual ITR/tax audit

## Features

- Checkbox tracking per item, persisted in the browser via `localStorage` (nothing is sent to a server)
- Filter by frequency (Monthly / Quarterly / Half-Yearly / Annually) or search by keyword
- Progress bar overall and per frequency
- "Reset Monthly / Quarterly / Half-Yearly / Annual / All" buttons for starting a fresh period
- Light/dark theme toggle, print-friendly view
- Company name & financial year fields for labeling your own copy

## Running locally

No build step required — it's plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Or just open `index.html` directly in a browser.

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

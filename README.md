# Baby Barry Land 🧸

A whimsical baby shower website — envelope landing page, layered parallax
invitation, Amazon registry, and an RSVP form that emails you and fills a
Google Sheet.

Everything lives in one file: **index.html**.

## Preview locally

Open a terminal in this folder and run:

```
python3 -m http.server 4173
```

Then visit http://localhost:4173 on your phone-sized browser window.

## RSVP setup (email + Google Sheet) — about 5 minutes

Until you do this, the RSVP button falls back to opening the guest's email
app with their answers pre-filled (works, but depends on the guest hitting
send). With the setup below, every RSVP lands in a Google Sheet **and**
emails you automatically:

1. Go to [sheets.new](https://sheets.new) and create a blank spreadsheet.
   Name it something like *Baby Shower RSVPs*.
2. In the sheet: **Extensions → Apps Script**.
3. Delete the sample code and paste in the entire contents of
   [`rsvp-backend.gs`](rsvp-backend.gs) from this folder.
4. Click **Deploy → New deployment → ⚙️ Select type → Web app**, then set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, authorize it with your Google account when prompted,
   and copy the **Web app URL** (it ends in `/exec`).
6. Open `index.html`, find this line near the bottom:

   ```js
   const RSVP_ENDPOINT = '';
   ```

   and paste your URL between the quotes:

   ```js
   const RSVP_ENDPOINT = 'https://script.google.com/macros/s/…/exec';
   ```

That's it. Submit a test RSVP on the site and check that a row appears in
the sheet and an email arrives at habibi93.ab@gmail.com.

> If you ever edit the Apps Script code later, use
> **Deploy → Manage deployments → ✏️ Edit → Version: New version** so the
> same URL picks up your changes.

## Editing the details

All content is plain text inside `index.html`:

- **Date / time / venue** — search for `August 23` and `Congo Town`.
- **Registry link** — search for `shorturl.at`.
- **RSVP deadline** — search for `August 10th`.
- **Names & wording** — search for `Baby Barry` / `The Barrys`.
- **Colors** — the `:root { … }` block at the top of the CSS holds the
  whole palette.

## Putting it online

The site is a single static file — any free static host works:

- **Netlify Drop**: drag this folder onto https://app.netlify.com/drop
- **GitHub Pages**: push this repo to GitHub → Settings → Pages → deploy
  from the `main` branch.

Then share the link with your guests. 🤎

# Kavindu Deshal Silva – Portfolio

An underwater portfolio: it opens 1,200 m down in the dark and rises to the surface as you scroll.
Plain HTML, CSS and JavaScript. No framework, no build step, no trackers, fonts self-hosted.

## Deploy to Vercel (free)

1. Create a new GitHub repository, for example `portfolio`, and push this folder to it:
   ```bash
   git init && git add . && git commit -m "Underwater portfolio"
   git branch -M main
   git remote add origin https://github.com/Deshal-001/portfolio.git
   git push -u origin main
   ```
2. Go to vercel.com, sign in with GitHub, click **Add New → Project** and import `portfolio`.
3. Framework preset: **Other**. Leave build command and output directory empty. Click **Deploy**.
4. The site is live at `https://<project-name>.vercel.app`. Every push to `main` redeploys it.

## Free domain

**Option A – yourname.is-a.dev (free, no expiry)**
1. In Vercel: Project → Settings → Domains → add `deshal.is-a.dev` (or another free name). Vercel shows a CNAME target and a TXT verification value.
2. Fork `github.com/is-a-dev/register`, add `domains/deshal.json`:
   ```json
   {
     "owner": { "username": "Deshal-001" },
     "records": { "CNAME": "cname.vercel-dns.com" }
   }
   ```
   Use the exact CNAME Vercel gives you. If Vercel asks for verification, also add `domains/_vercel.deshal.json` with the TXT value, as described at docs.is-a.dev/guides/vercel.
3. Open a pull request. Once it's merged, the domain works within a few hours.

**Option B – a real .me / .tech / .dev domain, free for one year (student)**
1. Verify as a student at education.github.com/pack (Hildesheim email or student ID).
2. Claim the domain from Namecheap (.me), get.tech (.tech) or Name.com (.dev, .app and others).
3. In Vercel add the domain under Settings → Domains, then set the A / CNAME records it shows in the registrar's DNS panel.
4. Note the renewal price before the free year ends.

## Editing

- Projects: the `P` array at the top of `app.js` (summary, bullet points, stack, architecture layers).
- Smaller repositories: the `MORE` array in `app.js`.
- Experience, about and contact: plain HTML in `index.html`.
- Depth of each section: the `data-depth` attribute on each `<section>`.
- CV: replace `assets/Kavindu_Deshal_Silva_CV.pdf` with the current one, same file name.

## What moves

- Background colour, light rays and the depth gauge are driven by scroll position.
- In the deep sections the cursor is a light: it lights up the name, the drifting particles and the jellyfish. A click sends a sonar ping.
- Near the surface there are rising bubbles and a school of fish that scatters from the cursor. A click releases bubbles.
- `prefers-reduced-motion` turns all animation off.

Fonts: Big Shoulders and Hanken Grotesk, SIL Open Font License (see `assets/fonts`).

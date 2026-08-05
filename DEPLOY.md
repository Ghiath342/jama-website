# Deploying JAMA to Vercel (with a password)

This is a static site. The included `middleware.js` locks the whole site behind a
username + password using Vercel's free plan. You choose the password yourself in
Vercel — it is never stored in the code.

## 1. Create a free Vercel account
Go to https://vercel.com and sign up (GitHub, GitLab, or email).

## 2. Upload the site (pick ONE method)

### A) Easiest — drag & drop (no tools needed)
1. In the Vercel dashboard: **Add New… → Project → Deploy a folder** (or use
   https://vercel.com/new and drag the folder in).
2. Drag the **`jama-website`** folder onto the page.
3. Click **Deploy**.

### B) Vercel CLI
```bash
npm i -g vercel
cd jama-website
vercel        # follow the prompts; then: vercel --prod
```

### C) GitHub
Push this `jama-website` folder to a GitHub repo, then in Vercel: **Add New →
Project → Import** that repo.

## 3. Set the password (required)
In Vercel: **Project → Settings → Environment Variables**, add:

| Name            | Value                    |
|-----------------|--------------------------|
| `SITE_USER`     | a username (e.g. `jama`) |
| `SITE_PASSWORD` | the password you want    |

Then **redeploy** (Deployments → ⋯ → Redeploy) so the variables take effect.

## 4. Done
Visit your `https://<your-project>.vercel.app` URL — the browser will ask for the
username/password before showing the site.

- To **change** the password later: edit `SITE_PASSWORD` and redeploy.
- To add a **custom domain**: Project → Settings → Domains.

### Note
If you prefer a one-click password with no code, Vercel's built-in **Deployment
Protection → Password** does the same thing but requires the paid **Pro** plan.
The `middleware.js` method above works on the free plan.

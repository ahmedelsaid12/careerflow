# CareerFlow

A university career-management platform prototype (student profiles, employer search, university analytics, Career Assistant).

## Run locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Build for production

```bash
npm install
npm run build
```

Output goes to `dist/`. Preview it with:

```bash
npm run preview
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (the whole folder, not just the `.jsx` file).
2. Go to vercel.com → **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

## Deploy to Netlify

1. Push this folder to GitHub.
2. Netlify → **Add new site** → import from Git.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

## Why the single .jsx file didn't deploy

A hosting platform needs a full project: `package.json` (dependencies + build script), a bundler config (`vite.config.js`), an HTML entry point (`index.html`), and an entry script (`main.jsx`) that mounts the component. A bare `.jsx` file has none of that, so there was nothing for Vercel/Netlify to build — hence the 404. This folder has all of it.

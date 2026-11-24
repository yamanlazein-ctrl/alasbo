# Al-Sabouni Digital Archive

An Arabic, right-to-left cultural archive for Sheikh Muhammad Ali Al-Sabouni. The site includes the cinematic homepage with the Hero, navigation, and library entrance. The library, tafsir, lectures, and fatwas URLs are compatibility pages, and search currently validates and displays the query without querying an archive catalog.

The application uses Next.js App Router, React, strict TypeScript, Tailwind CSS, Lucide, GSAP ScrollTrigger, and Lenis. It runs as a Node.js application.

## Getting started

Use Node.js 20.19 or later and npm. Install exactly the dependencies in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Copy `.env.example` to `.env.local` when environment overrides are needed. The app can run with every setting blank.

| Setting | Purpose |
| --- | --- |
| `SITE_URL` | Public HTTPS origin for canonical links and the sitemap. Set it before building for a deployment. |

### Local Thmanyah fonts

Obtain the fonts through the [official Thmanyah download](https://font.thmanyah.com/) and review the [publisher's terms](https://ask.thmanyah.com/en/thmanyah-line-for-everyone) for the intended use. For an authorized local setup, place the supplied webfont weights 300, 400, 500, 700, and 900 under `public/fonts/thmanyah/sans/` and `public/fonts/thmanyah/serif-display/`. Match the filenames referenced in `src/app/globals.css`. Git ignores the font binaries. The CSS includes fallback families when those files are absent.

## Checks and deployment

| Command | Purpose |
| --- | --- |
| `npm run lint` | Run ESLint with Next.js Core Web Vitals and TypeScript rules. |
| `npm run typecheck` | Generate App Router types and run strict TypeScript. |
| `npm run build` | Create the production build. |
| `npm start` | Serve the production build with Next.js. |

The package currently defines no `npm test` command. For a release smoke test, exercise the homepage, archive entry routes, search, and not-found page on the production server. Check Arabic text direction, keyboard navigation, and motion at desktop and phone widths.

Deploy to a Node.js host that can run `npm ci`, `npm run build`, and `npm start`. Set `SITE_URL` for the deployment. Voice input uses the browser's speech recognition service with the `ar-SY` locale. The browser may process microphone input remotely, and typed search remains available when recognition is unavailable.

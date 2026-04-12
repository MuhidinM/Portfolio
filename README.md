# Portfolio

Personal portfolio site: hero, about, stats, projects (with filters and pagination), contact form, and footer. Dark theme, responsive layout, and motion handled with GSAP (with reduced-motion support).

## Tech stack

- **Next.js** (App Router), **React**, **TypeScript**
- **Tailwind CSS** + **shadcn/ui**-style primitives (`components/ui`)
- **GSAP** (scroll-driven animations, hero, sections)
- **React Hook Form** + **Zod** for the contact form
- **Resend** for outbound email from the contact action

## Features

- **Projects** — Data lives in `data/projects.json`. The app exposes `GET /api/projects` with query params for pagination (`page`, `pageSize`), category filters (`web`, `api`, `backend`, `mobile`, `desktop`), search (`q`), and sort (`id` default, or title A–Z / Z–A). The projects UI syncs filters to the URL query string.
- **Contact** — Server action sends mail via Resend. Phone rows open **WhatsApp** (`wa.me`); email rows use `**mailto:`** links.
- **Content** — Copy and achievements wiring live in `constants.tsx`; project counts for stats come from `lib/projects.ts` (same source as the JSON).

## Scripts


| Command                      | Purpose                                                                   |
| ---------------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`                   | Dev server (`http://localhost:3000`)                                      |
| `pnpm build`                 | Production build                                                          |
| `pnpm start`                 | Run production server                                                     |
| `pnpm lint`                  | ESLint                                                                    |
| `pnpm run generate:projects` | Regenerate `data/projects.json` from `scripts/generate-projects-json.mjs` |


## Getting started

1. Clone the repo and install dependencies:
  ```bash
   git clone https://github.com/MuhidinM/Portfolio.git
   cd Portfolio
   pnpm install
  ```
   (`npm install` works if you prefer npm.)
2. **Environment variables** — Create `.env.local` and set Resend credentials used by `lib/mail.ts` (e.g. `NEXT_PUBLIC_RESEND_API_KEY` as referenced there). Adjust `from` / `to` in `lib/mail.ts` for your domain and inbox when you go to production.
3. Run the dev server:
  ```bash
   pnpm dev
  ```

## Project layout (high level)

- `app/` — Routes, layout, `globals.css`, API route `app/api/projects/route.ts`
- `components/` — Page sections and UI
- `data/projects.json` — Project catalog (regenerate with `generate:projects` when you change the generator script)
- `lib/` — Utilities, GSAP helpers, project query logic
- `actions/` — Server actions (e.g. contact email)

## License

This project is licensed under the [MIT License](LICENSE).
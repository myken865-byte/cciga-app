# CCIGA App

Web platform for CCIGA (Complexe Collège International George Anglade): a public marketing site plus an administration section for managing the school — students, admissions, grades/bulletins, and related records.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Prisma 7](https://www.prisma.io) with the libSQL driver adapter
- [Tailwind CSS 4](https://tailwindcss.com)
- [Capacitor](https://capacitorjs.com) for the Android build

## Project structure

- `app/(site)/...` — public marketing pages, with the shared navbar/footer layout
- `app/admin/...` — the admin section, under its own layout with no public chrome
- `prisma/` — database schema and seed script
- `android/` — Capacitor-generated Android project

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. `postinstall` runs `prisma generate` automatically.

## Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the codebase
```

## Deployment

Deployed on [Vercel](https://vercel.com).

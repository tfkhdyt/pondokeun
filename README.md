# Pondokeun

Lightweight, Modern, Free and Open Source Link Shortener

## Built with

- SvelteKit (Web Framework)
- Tailwind CSS (CSS Framework)
- TypeScript (Programming Language)
- Flowbite (UI Component)
- Prisma (ORM)
- Zod (Validation Library)
- Auth.js (Auth Library)
- Auto Animate (Animation Library)
- Day.js (Date Parser Library)
- Inversify (Dependency Injection Library)
- Svelte French Toast (Toast / Notification Library)

## Getting Started

### Prerequisites

- Node.js
- Node.js Package Manager (_pnpm_ is highly recommended)
- PostgreSQL
- GitHub OAuth
- Google OAuth

### Installation

```bash
git clone https://github.com/tfkhdyt/pondokeun
cd pondokeun
pnpm i
# npm install
# yarn install

# setup environment variable
cp .env.example .env
# and then put your env var to .env file

# start your PostgreSQL
sudo systemctl start postgresql.service

# database migration
pnpm prisma migrate dev
```

#### Environment Variables

- `DATABASE_URL` = Your PostgreSQL database url
- `GITHUB_ID` = Your GitHub OAuth Client ID
- `GITHUB_SECRET` = Your GitHub OAuth Client Secret
- `GOOGLE_ID` = Your Google OAuth Client ID
- `GOOGLE_SECRET` = Your Google OAuth Client Secret
- `AUTH_SECRET` = Random string
- `PUBLIC_APP_URL` = Your app URL

Check [.env.example](.env.example) file for more info.

### Usage

```bash
# development
pnpm dev

# production
pnpm build
pnpm preview

# if you change the database schema
pnpm prisma migrate dev
```

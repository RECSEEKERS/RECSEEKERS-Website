# RecSeekers Website

This repository contains the full RecSeekers website stack:

- `frontend/`: Next.js 16 marketing site and pages.
- `cms/`: Sanity Studio for managing content.

The frontend consumes content from Sanity using the project and dataset configured in this repo.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion.
- CMS: Sanity Studio 5, TypeScript.
- Content Delivery: `@sanity/client` + GROQ queries.

## Repository Structure

```txt
RecSeekers-Website/
|- frontend/            # Next.js app
|- cms/                 # Sanity Studio
|- Design.md            # Design notes/reference
|- README.md            # This file
```

## Prerequisites

- Node.js `>=22.13.0`
- npm `>=10`

Check versions:

```powershell
node -v
npm -v
```

## Quick Start

### 1. Install dependencies

From the repo root, install for each app:

```powershell
cd frontend
npm install
cd ..\cms
npm install
cd ..
```

### 2. Configure environment variables (frontend)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=3o1ax6lm
NEXT_PUBLIC_SANITY_DATASET=production
```

Notes:

- These are required by `frontend/sanity/client.ts`.
- Current Sanity config in `cms/sanity.config.ts` and `cms/sanity.cli.ts` also points to:
	- Project ID: `3o1ax6lm`
	- Dataset: `production`

### 3. Run both apps locally

Use two terminals.

Terminal 1 (frontend):

```powershell
cd frontend
npm run dev
```

Terminal 2 (CMS):

```powershell
cd cms
npm run dev
```

Local URLs:

- Frontend: `http://localhost:3000`
- Sanity Studio: `http://localhost:3333`

## Development Workflow

1. Edit/create content in Sanity Studio.
2. Publish content in Studio.
3. Frontend fetches published content through GROQ queries in `frontend/sanity/queries.ts`.
4. Build and verify frontend output.

## Useful Commands

### Frontend (`frontend/`)

- `npm run dev`: Start local dev server with Turbopack.
- `npm run build`: Production build.
- `npm run start`: Run production server.
- `npm run lint`: Run ESLint.

### CMS (`cms/`)

- `npm run dev`: Start Sanity Studio.
- `npm run build`: Build Studio.
- `npm run deploy`: Deploy Studio.
- `npm run deploy-schema`: Deploy schema changes.
- `npm run deploy-graphql`: Deploy GraphQL API changes.

## Content Model Notes

Current frontend queries include:

- `templateStatus` (from `templateStatus` schema)
- `linkedinEmbed` (from `linkedinEmbed` schema)

Relevant files:

- `cms/schemaTypes/`
- `frontend/sanity/queries.ts`
- `frontend/sanity/client.ts`

## LinkedIn Feed Automation (Reference)

If needed for automatic LinkedIn feed ingestion:

- RSS feed: `https://rss.app/feed/zFeZPh5EF8gkvEpJ`
- Make scenario: `https://eu1.make.com/1348195/scenarios/5038513/edit`

## Deployment Notes

- Keep `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` set in your frontend deployment environment.
- Deploy schema changes before relying on new fields in the frontend.
- Publish content in Sanity to make it available to public frontend queries.

## Additional Documentation

- CMS details: `cms/cms-README.md`
- Frontend details: `frontend/frontend-README.md`
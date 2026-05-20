# CMS: Sanity Studio Template

This folder contains your **Sanity Studio** — a headless CMS where you manage content (posts, pages, etc.) that the frontend queries.

---

## Quick Start

### 1. Install dependencies

```bash
cd cms
npm install
```

This installs Sanity packages, Studio, and plugins.

### 2. Start the Studio

```bash
npm run dev
```

You should see output like:

```
✓ Studio successfully compiled! Go to http://localhost:3333
```

Visit `http://localhost:3333` in your browser. You'll see the Sanity Studio UI.

---

## How It Works

- **Sanity Project**: A backend content database (like a mini CMS server).
  - Each project has a unique **Project ID** (e.g., `2nd7mzk3`).
  - Lives at `sanity.io/manage`.

- **Sanity Studio**: The web UI for editing content.
  - Can be embedded in your Next.js app at `/studio` (via `app/studio/[[...index]]/page.tsx`).
  - Or run standalone locally.

- **Schemas**: Define what content looks like (documents, fields, types).
  - Lives in `cms/schemaTypes/`.

- **Datasets**: Collections of documents within a project.
  - Usually `production`.

---

## Folder Structure

```
cms/
├── sanity.config.ts              # Main config (Project ID, dataset, plugins)
├── schemaTypes/
│   ├── index.ts                 # Exports all schemas
│   ├── post.ts                  # Example: Blog post schema
│   ├── author.ts
│   └── templateStatus.ts        # Test schema
├── structure.ts                 # (Optional) Desk structure customization
├── package.json
├── tsconfig.json
└── README.md (this file)
```

---

## Managing Content

### Creating a new document

1. Open Studio at `http://localhost:3333`.
2. Click **"Create"** in the top-left.
3. Choose a document type (e.g., "Post", "Page").
4. Fill in the fields.
5. Click **"Publish"** to make it live.

### Finding your project

In Studio, top-left corner shows your project name and dataset. Or:

1. Visit `sanity.io/manage`.
2. Log in.
3. Find your org and project.
4. Copy the **Project ID** (looks like `2nd7mzk3`).

### Switching projects (for new clients)

If you're cloning this template for a new project:

1. **Create a new Sanity project** (via CLI or `sanity.io/manage`).
2. **Update `sanity.config.ts`** with the new Project ID and dataset.
3. **Restart Studio**: `npm run dev`.

---

## Schemas Explained

A schema is **what kind of content you can create**. Example: a Blog Post schema might have:

- `title` (text field)
- `slug` (unique URL slug)
- `content` (rich text editor)
- `author` (link to Author document)
- `publishedAt` (date picker)

### Creating a new schema

Create `cms/schemaTypes/myNewType.ts`:

```ts
export default {
  name: 'myNewType',
  title: 'My New Type',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
```

Then **add it to** `cms/schemaTypes/index.ts`:

```ts
import myNewType from './myNewType';

export const schemaTypes = [
  myNewType,
  // ... other schemas
];
```

### Deploying schema changes

When you **add/change/remove fields or document types**, you need to deploy:

```bash
cd cms
npm run deploy-schema
```

This uploads your schemas to Sanity's servers so the Studio UI updates and the frontend can query them.

> Note: `deploy-schema` is an **npm script**, not a Sanity CLI command.
> - ✅ Correct: `npm run deploy-schema`
> - ✅ Also works: `npx sanity schema deploy`
> - ❌ Incorrect: `npx sanity deploy-schema`

### If you get Rollup optional dependency errors on Windows

If you see an error like `Cannot find module @rollup/rollup-win32-x64-msvc`, it's usually the npm optional-deps bug.
Fix it by reinstalling cleanly inside `cms/`:

```powershell
cd cms
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## Using the Blog Schema (included)

This template comes with a **Blog Post** schema (if you chose the blog template during init). It has:

- `title` — Blog post title
- `slug` — URL slug (e.g., `my-first-post`)
- `content` — Rich text body
- `author` — Link to an author
- `publishedAt` — Publication date
- `excerpt` — Short description
- `mainImage` — Featured image

### Create a test blog post

1. Open Studio.
2. Click **Create** → **Post**.
3. Fill in:
   - Title: "Hello World"
   - Slug: `hello-world`
   - Content: Some text
   - Publish date: Today
4. Click **Publish**.

Now the frontend can query this post via GROQ:

```groq
*[_type == "post" && slug.current == "hello-world"][0]
```

---

## Deploying Schema Changes

### When to deploy

- You add a new field to a schema.
- You create a new document type.
- You rename or delete fields.

### How to deploy

```bash
npx sanity schema deploy
```

Follow the prompts. Your changes upload to Sanity's backend, and the Studio UI updates automatically.

### What if I can't deploy?

Possible issues:

1. **Not logged in**: Run `sanity login` first.
2. **In the wrong folder**: Make sure you're in `cms/` (where `sanity.config.ts` lives).
3. **Config errors**: Check `sanity.config.ts` for typos or missing `projectId`/`dataset`.

Try:

```bash
sanity logout
sanity login
npm run dev  # Start Studio to authenticate
```

Then retry `npx sanity schema deploy`.

---

## Environment & Configuration

### `sanity.config.ts`

This file connects Studio to your Sanity project:

```ts
export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',
  projectId: 'abc123def456',  // Your unique project ID
  dataset: 'production',        // Dataset name
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

**Never commit secrets here** — Project ID is OK to commit, but API tokens are not (keep those in `.env.local` if needed server-side).

### `.env` (if using)

Sanity v3+ doesn't require a `.env` for basic Studio setup. If you need one:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

---

## Viewing Content

### Vision Tool (built-in)

In Studio, click **Vision** (top-right) to write and test **GROQ queries** against your data.

Example query:

```groq
*[_type == "post"] {
  title,
  "slug": slug.current,
  publishedAt
}
```

Run it to see all published posts. This is what the frontend uses to fetch data.

---

## Removing Sanity (if needed later)

If a project doesn't need CMS:

1. **Delete this folder:**

   ```bash
   rm -r cms/
   ```

2. **In frontend, remove Sanity references** (see frontend README).

3. **Uninstall packages from frontend:**

   ```bash
   npm uninstall @sanity/client @sanity/image-url next-sanity
   ```

---

## Starting a New Project with This Template

For each **new client/site**:

### 1. Clone the template

```bash
git clone <your-template-repo> my-new-site
cd my-new-site
```

### 2. Install in both folders

```bash
cd frontend && npm install
cd ../cms && npm install
```

### 3. Create a new Sanity project

In `cms/`:

```bash
npx sanity@latest init
```

Follow the prompts:

- Create a **new project** (not reuse the template one).
- Choose the correct **organization** for this client.
- Pick a **template** (Blog, etc.) or start blank.

This will:

- Create a new Sanity project on `sanity.io`.
- Generate a new **Project ID**.
- Update `cms/sanity.config.ts` with the new ID.
- Create an optional `.env.local` (you can ignore).

### 4. Update frontend env vars

In `frontend/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<the new Project ID from step 3>
NEXT_PUBLIC_SANITY_DATASET=production
```

### 5. Start both servers

```bash
# Terminal 1: from cms/
npm run dev

# Terminal 2: from frontend/
npm run dev
```

- Studio: `http://localhost:3333`
- Frontend: `http://localhost:3000`

### 6. Test

- Create a post in Studio.
- See it appear on the frontend.

---

## Common Tasks

### Edit a published document

1. Open Studio.
2. Find the document (search or browse by type).
3. Click to open it.
4. Make changes.
5. Click **Publish**.

Changes appear on the frontend immediately (or after a cache refresh).

### Change a schema field

1. Edit the schema file in `cms/schemaTypes/`.
2. Save.
3. Run `npx sanity schema deploy`.
4. Studio UI updates automatically.

### Add a new document type

1. Create a new file in `cms/schemaTypes/`, e.g., `cms/schemaTypes/product.ts`.
2. Define the schema.
3. Export it from `cms/schemaTypes/index.ts`.
4. Run `npx sanity schema deploy`.
5. Studio now has a "Product" option in Create menu.

---

## Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [Studio Customization](https://www.sanity.io/docs/studio/customization)

---

## Troubleshooting

### Studio won't start

```bash
npm run dev
```

If that fails:

1. Make sure you're in `cms/` folder.
2. Check `sanity.config.ts` exists.
3. Try: `npm install` again, then `npm run dev`.

### "projectId is missing" error

Edit `cms/sanity.config.ts` and ensure:

```ts
projectId: 'your_actual_project_id',  // Not empty!
```

### Changes in Studio don't appear on frontend

1. Make sure frontend's `.env.local` has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID`.
2. Restart frontend dev server: `npm run dev`.
3. Check that you **Published** the document in Studio (not just drafted).

---

Happy content management! 🎉

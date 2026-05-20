# Frontend: Next.js + Tailwind Template

Welcome! This is a **Next.js 16+ with Tailwind CSS** frontend, optionally wired to Sanity CMS for content management.

---

## Quick Start

### 1. Install dependencies

```bash
cd frontend
npm install
```

This installs all packages for the Next.js app (including Sanity client, image-url builder, and development tools).

### 2. Set up environment variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=        # optional, only for draft preview or server-side writes
```

**Where to find your project ID:**
- If you initialized Sanity in the `cms/` folder, check `cms/sanity.config.ts`.
- Or visit `sanity.io/manage` → your org → your project → copy the Project ID.

### 3. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:3000`. You should see the template homepage.

### 4. Test Sanity integration (if using CMS)

- Visit `http://localhost:3000` to see the frontend.
- If Sanity is wired, it will query and display content.
- If the `.env.local` vars are missing, the app still runs but without CMS data.

---

## Folder Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (wraps all pages)
│   ├── page.tsx                 # Home page (/)
│   ├── globals.css              # Tailwind + CSS variables
│   └── about/                    # Example: /about route
│       ├── page.tsx             # /about
│       └── [slug]/
│           └── page.tsx         # /about/post-title (only for like blogs...)
├── components/
│   ├── ui/                      # Reusable UI components (Button, Card, etc.)
│   │   ├── Button.tsx
│   │   └── ...
│   └── layout/                  # Layout components (Header, Footer, etc.)
│       ├── Header.tsx
│       └── Footer.tsx
├── sanity/                      # Sanity client & queries
│   ├── client.ts               # Sanity client configuration
│   ├── image.ts                # Image URL builder
│   └── queries.ts              # GROQ queries
├── lib/                        # Utilities & helpers
│   └── utils.ts
├── public/                     # Static assets (favicon, etc.)
├── .env.local                  # Local env vars (NOT committed)
├── .env.example                # Template for required env vars
├── package.json
├── next.config.js
├── tailwind.config.js          # Tailwind config (if using v3)
├── tsconfig.json
└── README.md (this file)
```

---

## How Pages Work

### File-based routing

Each page is a **directory with a `page.tsx` file**:

- `app/page.tsx` → `/` (home)
- `app/about/page.tsx` → `/about`
- `app/blog/page.tsx` → `/blog`
- `app/blog/[slug]/page.tsx` → `/blog/any-slug` (dynamic)

**Example: creating a new page**

Create `app/contact/page.tsx`:

```tsx
export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      <p>Email: hello@example.com</p>
    </main>
  );
}
```

Now visit `/contact`. That's it!

### Layouts

`app/layout.tsx` wraps **all** pages globally. Use it for:

- Header/nav
- Footer
- Global styles or providers

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### Server vs. Client Components

- **By default, components are Server Components** (run on the server, send HTML to browser).
- **Use `"use client"`** at the top for interactive components (forms, buttons with state, etc.).

Example:

```tsx
// Server Component (default) - can fetch from Sanity
export default async function PostList() {
  const posts = await client.fetch(`*[_type == "post"]`);
  return <div>{/* render posts */}</div>;
}

// Client Component - interactive state
"use client";
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Customizing Design: Colors & Typography

### Using Tailwind 4 CSS Variables

All design is controlled via **CSS variables in `globals.css`** (no config file needed in Tailwind 4+).

Edit `app/globals.css`:

```css
@import "tailwindcss";

:root {
  /* Brand colors – change these per project */
  --background: #ffffff;
  --foreground: #171717;
  --primary: #0ea5e9;
  --primary-dark: #000000; /*chnage "brown" to black*/
  --neutral-50: #f9fafb;
  --neutral-900: #111827;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-dark: var(--primary-dark);
  --color-neutral-50: var(--neutral-50);
  --color-neutral-900: var(--neutral-900);
  
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --primary: #38bdf8;
  }
}
```

Then use in components:

```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary hover:bg-primary-dark">
    Click me
  </button>
</div>
```

### Changing Fonts

Fonts are imported in `app/layout.tsx` from Google Fonts:

```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

To **change fonts**, replace the import names (find them at [fonts.google.com](https://fonts.google.com)) and update the variable names.

---

## Sanity Integration

### How it works

- **`sanity/client.ts`**: Creates a Sanity client that fetches content from your CMS.
- **`sanity/queries.ts`**: GROQ queries (Sanity's query language).
- **`sanity/image.ts`**: Optimizes image URLs from Sanity for Next.js `<Image />`.

### Fetching content (Server Component)

```tsx
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <main>
      {posts.map(post => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}
```

### Displaying Sanity images

```tsx
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export function PostCard({ post }) {
  return (
    <div>
      <Image
        src={urlFor(post.image).url()}
        alt={post.title}
        width={600}
        height={400}
      />
      <h3>{post.title}</h3>
    </div>
  );
}
```

### Creating GROQ queries

Add queries to `sanity/queries.ts`:

```ts
import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  image
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  content,
  image,
  publishedAt
}`;
```

Then use in pages:

```tsx
const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: params.slug });
```

---

## Environment Variables

### What each does

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**: Your Sanity project ID. `NEXT_PUBLIC_` means it's sent to the browser (so it's not secret).
- **`NEXT_PUBLIC_SANITY_DATASET`**: Usually `production`. Can be anything; defines which dataset in Sanity to query.
- **`SANITY_API_TOKEN`**: Only needed for:
  - Draft preview (showing unpublished content).
  - Server-side mutations (creating/updating documents from the app).
  - **Keep this secret!** Don't expose in browser code.

### Local development

Create `frontend/.env.local` (gitignored, never committed):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

### Deployment (Vercel, etc.)

Set these as **environment variables** in your hosting dashboard, not in files.

---

## Removing Sanity Completely

If you decide not to use Sanity:

1. **Delete Sanity files:**

   ```bash
   rm -r sanity/
   ```

2. **Remove from `app/layout.tsx`** any Sanity imports.

3. **Delete Sanity env vars from `.env.local` and `.env.example`.**

4. **Uninstall packages:**

   ```bash
   npm uninstall @sanity/client @sanity/image-url next-sanity
   ```

5. **Update pages** to use static content instead of queries:

   ```tsx
   // Before (with Sanity)
   const posts = await client.fetch(POSTS_QUERY);

   // After (static)
   const posts = [
     { _id: "1", title: "Post 1", slug: "post-1" },
     { _id: "2", title: "Post 2", slug: "post-2" },
   ];
   ```

---

## Removing Only Image URL Builder

If you use Sanity but don't need the `@sanity/image-url` optimizations:

1. **Delete `sanity/image.ts`.**

2. **In components, use Sanity URLs directly:**

   ```tsx
   // Before (with image builder)
   import Image from "next/image";
   import { urlFor } from "@/sanity/image";
   <Image src={urlFor(post.image).url()} />

   // After (direct URL)
   <img src={post.image.asset.url} alt={post.title} />
   ```

3. **Optionally uninstall:**

   ```bash
   npm uninstall @sanity/image-url
   ```

4. **Update `next.config.js`** if you had Sanity CDN in `remotePatterns` (optional if using direct asset URLs).

---

## Common Tasks

### Add a new page

```bash
mkdir -p app/new-page
cat > app/new-page/page.tsx << 'EOF'
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
EOF
```

Now visit `/new-page`.

### Create a reusable component

Create `components/ui/MyComponent.tsx`:

```tsx
type MyComponentProps = {
  title: string;
  children: React.ReactNode;
};

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

Use it:

```tsx
import { MyComponent } from "@/components/ui/MyComponent";

export default function Page() {
  return (
    <MyComponent title="Hello">
      <p>Content here</p>
    </MyComponent>
  );
}
```

### Deploy to Vercel

```bash
git push origin main
```

Then connect your repo to [Vercel](https://vercel.com):

1. Import your GitHub repo.
2. Add environment variables (Project ID, dataset, token if needed).
3. Deploy!

---

## Troubleshooting

### "Cannot find module '@sanity/...'"

You might need to install packages:

```bash
npm install @sanity/client @sanity/image-url next-sanity
npm install canvas-confetti
npm install -D @types/canvas-confetti
```

### "NEXT_PUBLIC_SANITY_PROJECT_ID is empty"

Make sure `.env.local` exists and has the right value:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_id
```

Then restart `npm run dev`.

### Images from Sanity won't load

Check:

1. **In `next.config.js`**: Do you have `cdn.sanity.io` in `remotePatterns`?
2. **In image.ts**: Are you using `urlFor()` correctly?
3. **In Sanity**: Is the image asset actually uploaded?

---

## Next Steps

- Explore [Next.js docs](https://nextjs.org/docs).
- Learn [GROQ queries](https://www.sanity.io/docs/groq).
- Check out [Sanity docs](https://www.sanity.io/docs).
- Customize colors/fonts for your brand (see "Customizing Design" above).

Happy building! 🚀

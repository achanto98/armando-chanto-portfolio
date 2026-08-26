# Armando Chanto — QA Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS, following the
Phase 1 roadmap: Home, About, Projects, Technical Articles, Resume, and Contact.

## Getting started

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    page.tsx              # Home
    about/page.tsx
    projects/page.tsx      # Projects list
    projects/[slug]/page.tsx  # Project case study (Problem/Architecture/Implementation/Results/Lessons)
    articles/page.tsx
    resume/page.tsx
    contact/page.tsx
    layout.tsx
    globals.css
  components/
    Navbar.tsx
    Footer.tsx
    Container.tsx
    ProjectCard.tsx
    SectionHeading.tsx
  data/
    projects.ts   # Edit this to add/update project case studies
    articles.ts   # Edit this to add/update technical articles
public/
  resume.pdf      # Add your PDF resume here (referenced by the Resume page)
  images/         # Screenshots, diagrams, dashboards go here
```

## Next steps to fill in (placeholders to replace)

- ~~**`your-user`**: replace with your real GitHub/LinkedIn usernames~~ — done: GitHub
  (`github.com/achanto98`) and LinkedIn (`linkedin.com/in/armando-chanto-cr2904`) are wired up in
  `src/data/projects.ts`, `src/components/Footer.tsx`, `src/app/page.tsx`, and
  `src/app/contact/page.tsx`.
- ~~**`public/resume.pdf`**~~ — done, resume PDF is in place.
- **`src/data/projects.ts`**: each project already has real, roadmap-based copy for Problem /
  Architecture / Implementation / Results / Lessons Learned — adjust once each framework/repo
  exists on `github.com/achanto98` (the links currently assume repo names that match the project
  slugs; create those repos or update the links to match).
- **Screenshots & diagrams**: add images to `public/images/` and reference them on the project
  detail page (`src/app/projects/[slug]/page.tsx`) as you build out each repository (framework
  folder structure, Playwright HTML reports, JMeter dashboards, Postman collections, GitHub
  Actions runs, architecture diagrams).
- **Favicon & OG image**: no `favicon.ico`/`app/icon.png` or Open Graph share image exists yet —
  add them so browser tabs and social link previews aren't blank.
- **Domain**: once deployed, point `armandochanto.dev` at Vercel (or GitHub Pages) and confirm the
  `metadataBase` URL in `src/app/layout.tsx` and the URLs in `src/app/sitemap.ts` /
  `src/app/robots.ts` match.

## Deployment

**Vercel (recommended for full Next.js features):**

```bash
npm install -g vercel
vercel
```

**GitHub Pages (static export):** add `output: "export"` to `next.config.mjs`, run
`npm run build`, and publish the generated `out/` directory. Note: static export does not support
dynamic API routes if you add any later.

## A note on how this was built

This project was scaffolded by hand (file by file) rather than via `create-next-app`/`npm install`,
because the sandbox this was generated in has no access to the npm registry. Run `npm install`
on your own machine to pull in Next.js, React, and Tailwind — the code itself follows standard
Next.js 14 App Router + Tailwind conventions and has not been build-verified in this environment.
Please run `npm run build` locally once dependencies are installed, and let me know if anything
needs fixing.

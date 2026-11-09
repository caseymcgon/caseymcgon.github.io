# Casey’s field notes

A static personal website built with Astro, TypeScript, MDX, Tailwind, and GitHub Pages. Display name, introduction, report prose, and photo selections are placeholders for you to edit. All 21 supplied photographs are included as web-sized, metadata-free JPEG copies; original TIFFs stay outside this repository.

## Run locally

Install Node.js 22 (22.12 or newer) and pnpm 11.25.0, then:

```sh
pnpm install
pnpm dev
```

Visit the local URL printed by Astro. `pnpm build` runs type/content checks and generates `dist/`. `pnpm preview` serves that production build.

## Edit your details

- `src/config.ts`: display name, introduction, site description, navigation.
- `src/pages/index.astro`: homepage headline and supporting copy.
- `src/styles/global.css`: shared design tokens and responsive styles.
- `src/content/trips/summer-in-the-mountains/index.mdx`: initial report and metadata.
- `src/content/photos/photos.json`: shared photo catalog.

Trip URLs come from their folder names. Renaming a title leaves the URL unchanged. Trip metadata uses `period` for the human-readable dates and `sortDate` for ordering; the initial sort date is a placeholder, not a verified date.

## Add a trip

```sh
pnpm new:trip my-next-trip "My next trip"
pnpm import:photos "/absolute/path/to/photo-folder" my-next-trip
```

The importer creates JPEGs no larger than 2400 pixels on either side, applies EXIF orientation, and removes metadata by using Sharp’s default output behavior. Originals stay untouched. Duplicate catalog IDs are skipped; existing image files are never overwritten. Add real alt text and optional captions to the catalog. Copy one photo’s `id` into the report’s `coverId`; fill out the other metadata and write the report. Set `draft: false` when ready.

Plain Markdown works too: use `index.md` instead of `index.mdx`. Use relative Markdown image paths for inline photos, for example `![Descriptive alt text](../../../assets/my-next-trip/photo.jpg)`. All catalog photos associated with a trip also appear automatically in its final photo roll. Avoid duplicating an inline photo in the catalog if you do not want it repeated.

Run `pnpm dev`, review the pages, then commit and push. A draft is excluded from generated pages, homepage listings, and the portfolio, **but source content in a public repository is still public**. Keep private material outside Git entirely.

## Curate the portfolio

Set `selected: true` on any photo in `src/content/photos/photos.json`. Lower `order` values appear first. Set `selected: false` to remove a photo from the portfolio without removing it from its trip. The initial six selections were chosen with a fixed random seed and can all be replaced. Delete the temporary-selection note in `src/pages/photos/index.astro` when you have curated it.

Photos can stand alone: omit `trip` for a photograph that is not associated with a report. Captions are optional; alt text is required. The catalog validates image paths at build time. Published trips must reference existing covers; photo trip references must match a report folder.

## Publish to GitHub Pages

The public repository is already created at `https://github.com/caseymcgon/caseymcgon.github.io` and its Pages source is configured as **GitHub Actions**. This local checkout preserves the repository’s initial commit and has the site ready to push.

After authenticating Git for GitHub, run from this project directory:

```sh
git push -u origin main
```

Open **Actions → Deploy personal site** to follow the build and deployment. Verify `https://caseymcgon.github.io/`, `/trips/`, `/trips/summer-in-the-mountains/`, and `/photos/` once it completes. Until the site source is pushed and the workflow succeeds, the public address may show the repository’s initial README page.

Pull requests build and validate without deploying. Pushes to `main` deploy. There are no tokens or server secrets in this site. The Astro `site` value assumes the root user site; a repository under a different name needs Astro’s `base` setting and base-aware links.

For a custom domain later, configure GitHub Pages and DNS, then update `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt`.

## Extending the site

Add future sections under `src/pages/`, with independent collections in `src/content.config.ts`, and reuse `Base.astro`. Add navigation in `src/config.ts`. No projects or fantasy app implementation is included.

GitHub Pages cannot run a database or application server. A future shared CRUD app should get a separate backend and database; link to that app from a project page. React or another client framework can be added if a future interactive feature needs it. No frontend framework is needed for the existing photo viewer.

## Image budget

Do not commit full-resolution TIFFs. Repository history retains old large files, so prepare photos before adding them. Keep the published site well below GitHub Pages’ 1 GB limit. External object storage can replace the local photo source later if the archive grows substantially.

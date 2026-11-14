# Developer portfolio

A responsive React portfolio built with Vite. On wider screens, the introduction and navigation stay in a fixed sidebar while the portfolio content scrolls independently. On smaller screens, the site switches to a single-column layout with a compact sticky section menu.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run lint` and `npm run build` to check the code and create a production build.

## Personalize the content

The sample profile and portfolio content are near the top of `src/App.jsx`:

- `profile` — name, role, introduction, and social links
- `experiences` — work, education, or community experience
- `toolGroups` — technologies grouped by category
- `projects` — all project cards, repository URLs, and live demo URLs
- `articles` — published writing (empty until real articles are available)

The homepage automatically shows the first three projects. The **All projects** page uses the complete project list. Replace the sample entries and generic URLs with your own details before publishing.

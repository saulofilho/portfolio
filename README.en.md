# Portfolio · Saulo Filho

[Português](README.md) · **English**

Saulo Filho's personal site: security tools for AI and the web, firmware for grooveboxes, and a blog.

**Live:** https://saulofilho.github.io/portfolio/

## Sections

- **About:** the home page opens straight on the intro.
- **Work:** projects grouped into Studies, Planning and generation, Analysis and detection, Offensive, Firmware (M-VAVE FM-1) and Apps.
- **Writing:** the 5 most recent blog posts. The full list is on `blog.html`, grouped by year.
- **Let’s connect:** LinkedIn, GitHub, Writing and 押忍.
- **押忍** (`osu.html`): a page with just an ASCII drawing.

## Colors

The **Colors** button in the top bar opens a panel for picking the background and text colors:

- 8 ready-made pairs (Paper, Lime, Cobalt, Bubblegum, Tomato, Mint, Grape, Butter);
- custom colors, from the picker or by typing a hex value;
- **Surprise me**, which picks a random pair with at least 7:1 contrast;
- **Reset**, which goes back to black on white.

The panel shows the contrast of the chosen pair. The choice is saved in the browser (`localStorage`, key `colors`) and applied before the page paints, so there is no flash. The site's other colors (secondary text, lines, code backgrounds) are derived from those two with `color-mix`.

## Blog

Posts live in `posts/`, one `.md` file per post. To publish, add the file and push to `main`; there is no list to update.

```markdown
---
title: Post title
date: 2026-11-17
description: A sentence or two shown in the list and under the title.
tags: [security, ai]
lang: pt-BR
---

Markdown text. Each `##` becomes an entry in the post's index.
```

- The file name becomes the address: `posts/my-post.md` opens at `post.html?p=my-post`.
- Without `title`, the first `# Heading` in the text is used. Without `date`, a `YYYY-MM-DD-` prefix in the file name works.
- `lang` sets the post's language (the site itself is in English), which helps screen readers and translators.
- `draft: true` hides a post. Files whose names start with `_` are skipped too (see `posts/_template.md`).
- Images can live in `posts/` and be referenced by relative path.
- To break a line without starting a new paragraph, end the line with `\`.
- Code blocks get a language label and a **Copy** button. `##` and `###` headings get a `#` link.
- Reading time is counted at 220 words per minute.

For YouTube videos, use a clickable thumbnail instead of an iframe:

```html
<a class="video" href="https://www.youtube.com/watch?v=ID"><img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="What the video shows"><span class="play">▶ Watch on YouTube</span></a>
```

For Shorts (vertical), use `class="video short"`.

On GitHub Pages, the list of posts comes from the GitHub API (`/repos/saulofilho/portfolio/contents/posts`). Locally, it comes from the server's directory listing. If both fail, the site tries `posts/index.json` (`["file.md", ...]`). The list is cached for the browser session.

## Sharing

Every page has a favicon, iOS and Android icons, and Open Graph and Twitter tags. A shared link shows `assets/og.png` (1200×630).

Posts are built in the browser, and social networks don't run JavaScript. So a link to a post shows the blog's general image and description, not the post's own.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Home: About, Work, Writing and contact |
| `blog.html` | All posts, grouped by year |
| `post.html` | A single post |
| `osu.html` | 押忍: the ASCII drawing, linked at the end of Let’s connect |
| `blog.js` | Reads the `.md` files in `posts/`, parses the front matter and renders with [marked](https://marked.js.org) |
| `main.js` | Mobile menu, colors panel and side index |
| `styles.css` | Site styles: Inter Tight and JetBrains Mono, colors derived from `--bg` and `--fg` |
| `sw.js` | Removes the service worker and cache left by the old portfolio |
| `assets/` | Icons (favicon, iOS, Android) and `og.png` |
| `posts/` | The blog posts |
| `.nojekyll` | Stops Jekyll from turning the `.md` files into HTML |

Plain HTML, CSS and JavaScript, no build step.

## Run locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Publishing

GitHub Pages, from the root of the `main` branch. Each push to `main` updates the site in about a minute.

## History

The previous portfolio, built with Gatsby, is still in the Git history (commit `38efa42`).

## License

MIT.

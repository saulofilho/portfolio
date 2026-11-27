# Portfolio · Saulo Filho

[Português](README.md) · **English**

Saulo Filho's personal site: security tools for AI and the web, firmware for grooveboxes, and a blog.

**Live:** https://saulofilho.github.io/portfolio/

## Sections

- **About:** the home page opens straight on the intro.
- **Work:** projects grouped into Studies, Planning and generation, Analysis and detection, Offensive, Firmware (M-VAVE FM-1), Games, Apps, Client work and Advertising.
- **Writing:** the 5 most recent blog posts. The full list is on `blog.html`, grouped by year.
- **Let’s connect:** LinkedIn, GitHub, Writing and 押忍.
- **押忍** (`osu.html`): a Matrix-style terminal that reads back what your browser hands to any site without asking: IP, provider and rough location, system, GPU, screen, language and timezone, battery, installed fonts, a fingerprint ID and, live, your cursor, clicks and keys. It ends on the ASCII drawing. Nothing is stored; only the IP lookup leaves the browser (geojs.io, with ipwho.is and ipinfo.io as fallbacks). Enter or space skips the animation, Esc goes home.

## Projects

### Studies

- [prompt-engineering-ptbr](https://saulofilho.github.io/prompt-engineering-ptbr/): prompts written in Portuguese are legitimate, and they don’t need a translation to be taken seriously.
- [support-your-localhost](https://github.com/saulofilho/support-your-localhost): a hub of security tools that run 100% on your own machine. No cloud, no account, and your targets stay with you.
- [Software Engineer Atlas](https://saulofilho.github.io/software-engineer-txt/): study notes, docs and papers on software engineering, from algorithms and system design to MCP and LGPD.

### Planning and generation (no LLM)

- [agent-eval-planner](https://saulofilho.github.io/agent-eval-planner/): reads an agent’s contract (system prompt, tools, out-of-scope rules) and builds an eval pack: attack prompts, pass/fail criteria, a JSONL suite and fixes.
- [agent-eval-planner-python](https://saulofilho.github.io/agent-eval-planner-python/): the Python port, with the same output. Also runs in GitHub Actions.
- [security-pentest-planner](https://saulofilho.github.io/security-pentest-planner/): turns OpenAPI specs, code or design docs into a pentest plan: attack vectors, payloads, fixes and RFCs for the structural ones.
- [security-pentest-planner-python](https://saulofilho.github.io/security-pentest-planner-python/): the Python port: scope, engagement, contract risks, plan, fixes and selective RFCs.
- [routes_api_spec_generator](https://saulofilho.github.io/routes_api_spec_generator/): reads a Rails API’s routes and controllers and writes rswag request specs. No OpenAPI file needed.

### Analysis and detection

- [SecScan](https://secscan.ai.studio/): an AppSec suite: SAST, a secrets matrix, data flow and a quality gate, with SARIF output.
- [WebAudit Pro](https://webauditpro.ai.studio/): audits a website for security, SEO, performance, accessibility and privacy, with reports and visual diffs.
- [Exposure Canary](https://saulofilho.github.io/exposure-canary/): plants canary tokens (URL, DNS, email) on assets you own and tells you when, and by whom, each one was touched.

### Offensive (authorized use only)

- [scopehound](https://saulofilho.github.io/scopehound/): a human-in-the-loop pentest agent. Scope and limits live in a layer the model can’t touch, and every action is logged.
- [pentest-harness](https://saulofilho.github.io/pentest-harness/): LangGraph orchestration for authorized AppSec work, with a scope guard, a human approval gate and dry-run on by default.
- [hackbot](https://saulofilho.github.io/hackbot/): a ReAct agent that picks security tools against an authorized target, with a scope guard and a kill switch.
- [Caipora](https://saulofilho.github.io/caipora/): red teaming for LLMs and agents with a Brazilian accent: Portuguese attacks, CPF, CNPJ and Pix detection, an agent honeypot and MCP server audits.

### Firmware (M-VAVE FM-1)

- [COQUÍ](https://saulofilho.github.io/coqui-fm1/): a Latin groovebox: congas, bongos, timbales, güiro and clave, plus a HUMAN knob that loosens the sequencer’s grip.
- [BAILE](https://saulofilho.github.io/baile-fm1/): a funk tracker: tamborzão, Volt Mix, funk 150, mandelão and brega funk, six tracks, patterns chained into a song and 64 live effects.
- [RIDDIM](https://saulofilho.github.io/riddim-fm1/): a roots reggae firmware: one drop, rockers, steppers and dub, a whole band synthesized on the FM-1 and a dub desk to version the tune while it plays.
- [Afterglow](https://github.com/saulofilho/afterglow-fm1): a live visualizer for any FM-1: its sound, notes, clock and knobs, drawn as falling panels of diagonal lines. In progress.
- [Spectral Relief](https://saulofilho.github.io/spectral-relief/): a music visualizer study for synths: the sound spectrum drawn as a halftone mountain range, for the FM-1 and Ableton Live.
- [FLIPERAMA](https://github.com/saulofilho/fliperama-fm1): a neighbourhood arcade inside the FM-1: six sound chips, each with its own original game that the music plays by itself. In early development.
- [GL!TCH](https://saulofilho.github.io/glitch/): a neon-noir groovebox with six cyber scales and seven sound sources. It boots in your browser, no device needed.
- [synth-firmware](https://saulofilho.github.io/synth-firmware/): a Claude Code plugin that packages the COQUÍ method for building the next FM-1 firmware.

### Games (in development)

- [Hound.exe](https://saulofilho.github.io/hound-exe/): a 1-bit action metroidvania inside an infected computer. You play the hound from scopehound, sniffing and blasting bugs folder by folder down to the kernel. Planned for Steam.

### Apps

- [MaréSegura](https://mare-segura.ai.studio/): real-time tide forecasts, live ocean data, under-keel clearance alerts and nautical charts that work fully offline.
- [Filtro EGA Dither](https://saulofilho.github.io/filtro-ega-dither/): turns photos into late-80s PC game art: tall 1:2 pixels, a short magenta palette and checkerboard dither.

### Client work (Buena Vista Lab)

Freelance work through my studio, [Buena Vista Lab](https://buenavistalab.com/). Clients include Polícia Federal, Kibon, Uber, Gillette, Brastemp, Saraiva, Absolut and Deco Capinhas.

- [Brastemp B.blend Cápsulas](https://loja.bblend.com.br/): store for Brazil’s first alcoholic drink capsules (VTEX, full stack).
- [Brastemp B.blend Máquinas](https://loja.bblend.com.br/maquinas): store for the B.blend machine that makes drinks, juices and sodas from capsules (VTEX, full stack).
- [DecoSkin](https://www.deco.com.br/): phone cases, screen protectors and accessories (VTEX, full stack).
- **LAR Home Decor**: home decor store (Shopify, full stack).
- **ProductLab**: landing for a sales platform that lets small brands sell like the big players (Shopify, front end).
- [FECMT](https://fecmt.org.br/): news and services for FECMT, the education and culture federation of Mato Grosso (Netlify CMS, full stack).
- [Santa Contabilidade](https://santacontabilidade-pagina-de-materiais.netlify.app/): site for a digital accounting firm (Netlify CMS, full stack).
- [Manual do Customer Success](https://manual-customer-success.vercel.app/): landing page for an online course based on Hiram Damin’s book (landing page, full stack).
- [FFWD](https://ffwd.com.br/): agency site with case studies, like Malwee’s 50th anniversary (Netlify CMS, full stack).
- [Bad Company](https://github.com/saulofilho/badcompany): site for a creative studio: branding, content and consultancy (site, full stack).
- [WOGO Filmes](https://wogofilmes.com.br/): site for a video production company (Netlify CMS, full stack).
- [Jessyca Creative](https://jessycasilva.work/): portfolio for a creative (Netlify CMS, full stack).
- [Bendito Cheiro Art](https://github.com/saulofilho/benditocheiro): site for a handicraft brand (Netlify CMS, full stack).
- [ZineTrip](https://github.com/saulofilho/zinetrip): a zine you scroll through (Netlify CMS, full stack).
- [instaxmmrs](https://github.com/saulofilho/instaxmmrs): a wall of instant photos (Netlify CMS, full stack).
- [spdwd](https://github.com/saulofilho/spdwd): brand site for Speedweed (site, full stack).
- [Botanic Daily Data](https://github.com/saulofilho/green-home): an app for building your own harvest database by tracking and analyzing what goes in (app, full stack).

### Advertising (the old days)

- **Kibon**: 3D key visual: an ice cream bar planted in a pot and watered.
- **Kibon Clock**: an ice-cream-bar clock installed on a square in Campinas.
- **Saraiva Pocket Books**: print ad: Twenty Thousand Leagues Under the Sea embroidered on a jeans pocket.
- **Absolut**: packaging concept: fruit in clear trays shaped like the bottle.
- **Uber**: UberTRIO, a promo inside the Uber app.
- **Barber**: a site where you could watch job interviews held in a barbershop, and hire the candidates.

## Writing

Most posts are in Portuguese.

- [A sua Inteligência Artificial é inteligente?](https://saulofilho.github.io/portfolio/post.html?p=a-sua-inteligencia-artificial-e-inteligente) (Aug 31, 2026), also on [Medium](https://medium.com/totvsdevelopers/a-sua-intelig%C3%AAncia-artificial-%C3%A9-inteligente-235709afd1ea)
- [Transformando ruído do time em música para os ouvidos com o Docker](https://saulofilho.github.io/portfolio/post.html?p=transformando-ruido-do-time-em-musica-com-docker) (Aug 14, 2026), also on [Medium](https://medium.com/totvsdevelopers/transformando-ru%C3%ADdo-do-time-em-m%C3%BAsica-para-os-ouvidos-com-o-docker-42af7206833a)
- [Usando a inteligência artificial para atacar a própria API](https://saulofilho.github.io/portfolio/post.html?p=usando-ia-para-atacar-a-propria-api) (Aug 3, 2026), also on [Medium](https://medium.com/totvsdevelopers/usando-a-intelig%C3%AAncia-artificial-para-atacar-a-pr%C3%B3pria-api-acc7c343eb69)

All posts: https://saulofilho.github.io/portfolio/blog.html

## Contact

- [LinkedIn](https://www.linkedin.com/in/saulofilho/)
- [GitHub](https://github.com/saulofilho)
- [押忍](https://saulofilho.github.io/portfolio/osu.html)

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
| `osu.html`, `osu.css`, `osu.js` | 押忍: the terminal that shows the visitor's data and ends on the ASCII drawing. Standalone, it doesn't use `styles.css` or `main.js` |
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

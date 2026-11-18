# Portfólio · Saulo Filho

Site pessoal de Saulo Filho: ferramentas de segurança para IA e web, firmwares para grooveboxes e um blog.

**No ar:** https://saulofilho.github.io/portfolio/

## Seções

- **About:** a home abre direto na apresentação.
- **Work:** estudos e ferramentas, agrupados em Planning, Analysis, Offensive, Firmware e Apps.
- **Writing:** os posts mais recentes do blog.
- **Let’s connect:** LinkedIn e GitHub.

## Blog

Os posts ficam em `posts/`, um arquivo `.md` por post. Para publicar, crie o arquivo e dê push na `main`; não há lista para atualizar.

```markdown
---
title: Título do post
date: 2026-11-17
description: Uma ou duas frases que aparecem na lista e abaixo do título.
tags: [security, ai]
---

Texto em Markdown. Cada `##` vira um item do índice do post.
```

- O nome do arquivo vira o endereço: `posts/meu-post.md` abre em `post.html?p=meu-post`.
- Sem `title`, o primeiro `# Título` do texto é usado. Sem `date`, vale um prefixo `AAAA-MM-DD-` no nome do arquivo.
- `draft: true` esconde o post. Arquivos que começam com `_` também ficam de fora (veja `posts/_template.md`).
- Imagens podem ficar em `posts/` e ser referenciadas pelo caminho relativo.

No GitHub Pages, a lista de posts vem da API do GitHub (`/repos/saulofilho/portfolio/contents/posts`). Localmente, vem da listagem de diretório do servidor.

## Arquivos

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Home: About, Work, Writing e contato |
| `blog.html` | Todos os posts, agrupados por ano |
| `post.html` | Página de um post |
| `blog.js` | Lê os `.md` de `posts/`, interpreta o front matter e renderiza com [marked](https://marked.js.org) |
| `main.js` | Menu mobile e índice lateral |
| `styles.css` | Fundo branco, texto preto, Inter Tight e JetBrains Mono |
| `.nojekyll` | Impede o Jekyll de converter os `.md` em HTML |
| `assets/` | Ícones (favicon, iOS, Android) e `og.png`, a imagem 1200×630 que aparece ao compartilhar o link |

HTML, CSS e JavaScript puros, sem build.

## Rodar localmente

```bash
python3 -m http.server 4321
```

Depois abra http://localhost:4321.

## Publicação

GitHub Pages, a partir da raiz do branch `main`. Cada push na `main` atualiza o site em cerca de um minuto.

## Histórico

O portfólio anterior, feito em Gatsby, continua no histórico do Git (commit `38efa42`).

## Licença

MIT.

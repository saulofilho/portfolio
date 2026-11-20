# Portfólio · Saulo Filho

**Português** · [English](README.en.md)

Site pessoal de Saulo Filho: ferramentas de segurança para IA e web, firmwares para grooveboxes e um blog.

**No ar:** https://saulofilho.github.io/portfolio/

## Seções

- **About:** a home abre direto na apresentação.
- **Work:** projetos agrupados em Studies, Planning and generation, Analysis and detection, Offensive, Firmware (M-VAVE FM-1) e Apps.
- **Writing:** os 5 posts mais recentes do blog. A lista completa fica em `blog.html`, agrupada por ano.
- **Let’s connect:** LinkedIn, GitHub, Writing e 押忍.
- **押忍** (`osu.html`): uma página só com um desenho em ASCII.

## Cores

O botão **Colors**, no topo, abre um painel para escolher a cor do fundo e do texto:

- 8 combinações prontas (Paper, Lime, Cobalt, Bubblegum, Tomato, Mint, Grape, Butter);
- cores livres, pelo seletor ou digitando o hex;
- **Surprise me**, que sorteia um par com contraste de pelo menos 7:1;
- **Reset**, que volta para o branco e preto.

O painel mostra o contraste do par escolhido. A escolha fica salva no navegador (`localStorage`, chave `colors`) e é aplicada antes da página aparecer, sem piscar. As outras cores do site (texto secundário, linhas, fundos de código) são derivadas dessas duas com `color-mix`.

## Blog

Os posts ficam em `posts/`, um arquivo `.md` por post. Para publicar, crie o arquivo e dê push na `main`; não há lista para atualizar.

```markdown
---
title: Título do post
date: 2026-11-17
description: Uma ou duas frases que aparecem na lista e abaixo do título.
tags: [security, ai]
lang: pt-BR
---

Texto em Markdown. Cada `##` vira um item do índice do post.
```

- O nome do arquivo vira o endereço: `posts/meu-post.md` abre em `post.html?p=meu-post`.
- Sem `title`, o primeiro `# Título` do texto é usado. Sem `date`, vale um prefixo `AAAA-MM-DD-` no nome do arquivo.
- `lang` marca o idioma do post (o site é em inglês), o que ajuda leitores de tela e tradutores.
- `draft: true` esconde o post. Arquivos que começam com `_` também ficam de fora (veja `posts/_template.md`).
- Imagens podem ficar em `posts/` e ser referenciadas pelo caminho relativo.
- Para quebrar a linha sem abrir um novo parágrafo, termine a linha com `\`.
- Blocos de código ganham o nome da linguagem e um botão **Copy**. Títulos `##` e `###` ganham um link `#`.
- O tempo de leitura é calculado a 220 palavras por minuto.

Para vídeos do YouTube, use uma capa clicável em vez de iframe:

```html
<a class="video" href="https://www.youtube.com/watch?v=ID"><img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="Descrição do vídeo"><span class="play">▶ Ver no YouTube</span></a>
```

Para Shorts (vertical), use `class="video short"`.

No GitHub Pages, a lista de posts vem da API do GitHub (`/repos/saulofilho/portfolio/contents/posts`). Localmente, vem da listagem de diretório do servidor. Se as duas falharem, o site tenta `posts/index.json` (`["arquivo.md", ...]`). A lista fica em cache durante a sessão do navegador.

## Compartilhamento

Todas as páginas têm favicon, ícones para iOS e Android e as tags Open Graph e Twitter. Ao compartilhar um link, aparece `assets/og.png` (1200×630).

Os posts são montados no navegador, e as redes sociais não executam JavaScript. Por isso, um link de post mostra a imagem e a descrição gerais do blog, não as do post.

## Arquivos

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Home: About, Work, Writing e contato |
| `blog.html` | Todos os posts, agrupados por ano |
| `post.html` | Página de um post |
| `osu.html` | 押忍: o desenho em ASCII, linkado no fim do Let’s connect |
| `blog.js` | Lê os `.md` de `posts/`, interpreta o front matter e renderiza com [marked](https://marked.js.org) |
| `main.js` | Menu mobile, painel de cores e índice lateral |
| `styles.css` | Estilos do site: Inter Tight e JetBrains Mono, cores derivadas de `--bg` e `--fg` |
| `sw.js` | Remove o service worker e o cache deixados pelo portfólio antigo |
| `assets/` | Ícones (favicon, iOS, Android) e `og.png` |
| `posts/` | Os posts do blog |
| `.nojekyll` | Impede o Jekyll de converter os `.md` em HTML |

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

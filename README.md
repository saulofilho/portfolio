# Portfólio · Saulo Filho

**Português** · [English](README.en.md)

Site pessoal de Saulo Filho: ferramentas de segurança para IA e web, firmwares para grooveboxes e um blog.

**No ar:** https://saulofilho.github.io/portfolio/

## Seções

- **About:** a home abre direto na apresentação.
- **Work:** projetos agrupados em Studies, Planning and generation, Analysis and detection, Offensive, Firmware (M-VAVE FM-1), Games, Apps, Client work e Advertising.
- **Writing:** os 5 posts mais recentes do blog. A lista completa fica em `blog.html`, agrupada por ano.
- **Let’s connect:** LinkedIn, GitHub, Writing e 押忍.
- **押忍** (`osu.html`): um terminal estilo Matrix que lê em voz alta o que o navegador entrega a qualquer site, sem pedir permissão: IP, provedor e cidade aproximada, sistema, GPU, tela, idioma e fuso, bateria, fontes instaladas, um ID de fingerprint e, ao vivo, cursor, cliques e teclas. No fim aparece o desenho em ASCII. Nada é guardado; só a consulta de IP sai do navegador (geojs.io, com ipwho.is e ipinfo.io de reserva). Enter ou espaço pulam a animação, Esc volta para a home.

## Projetos

### Studies

- [prompt-engineering-ptbr](https://saulofilho.github.io/prompt-engineering-ptbr/): prompts escritos em português são legítimos e não precisam de tradução para serem levados a sério.
- [support-your-localhost](https://github.com/saulofilho/support-your-localhost): um hub de ferramentas de segurança que rodam 100% na sua máquina. Sem nuvem, sem conta, sem enviar seus alvos para ninguém.
- [Software Engineer Atlas](https://saulofilho.github.io/software-engineer-txt/): anotações de estudo, docs e papers sobre engenharia de software, de algoritmos e system design a MCP e LGPD.

### Planning and generation (sem LLM)

- [agent-eval-planner](https://saulofilho.github.io/agent-eval-planner/): lê o contrato de um agente (system prompt, ferramentas, regras de fora do escopo) e monta um pacote de evals: prompts de ataque, critérios de passa/falha, uma suíte JSONL e correções.
- [agent-eval-planner-python](https://saulofilho.github.io/agent-eval-planner-python/): a versão em Python, com a mesma saída. Também roda no GitHub Actions.
- [security-pentest-planner](https://saulofilho.github.io/security-pentest-planner/): transforma specs OpenAPI, código ou design docs num plano de pentest: vetores de ataque, payloads, correções e RFCs para os itens estruturais.
- [security-pentest-planner-python](https://saulofilho.github.io/security-pentest-planner-python/): a versão em Python: escopo, engajamento, riscos do contrato, plano, correções e RFCs seletivos.
- [routes_api_spec_generator](https://saulofilho.github.io/routes_api_spec_generator/): lê as rotas e os controllers de uma API Rails e escreve request specs do rswag. Não precisa de arquivo OpenAPI.

### Analysis and detection

- [SecScan](https://secscan.ai.studio/): uma suíte de AppSec: SAST, matriz de segredos, fluxo de dados e quality gate, com saída em SARIF.
- [WebAudit Pro](https://webauditpro.ai.studio/): audita um site em segurança, SEO, performance, acessibilidade e privacidade, com relatórios e diffs visuais.
- [Exposure Canary](https://saulofilho.github.io/exposure-canary/): planta canary tokens (URL, DNS, e-mail) em ativos seus e avisa quando, e por quem, cada um foi tocado.

### Offensive (só com autorização)

- [scopehound](https://saulofilho.github.io/scopehound/): um agente de pentest com humano no loop. Escopo e limites ficam numa camada que o modelo não alcança, e toda ação é registrada.
- [pentest-harness](https://saulofilho.github.io/pentest-harness/): orquestração com LangGraph para trabalho de AppSec autorizado, com guarda de escopo, aprovação humana e dry-run ligado por padrão.
- [hackbot](https://saulofilho.github.io/hackbot/): um agente ReAct que escolhe ferramentas de segurança contra um alvo autorizado, com guarda de escopo e botão de desligar.
- [Caipora](https://saulofilho.github.io/caipora/): red teaming de LLMs e agentes com sotaque brasileiro: ataques em português, detecção de CPF, CNPJ e Pix, um honeypot de agentes e auditoria de servidores MCP.

### Firmware (M-VAVE FM-1)

- [COQUÍ](https://saulofilho.github.io/coqui-fm1/): uma groovebox latina: congas, bongôs, timbales, güiro e clave, mais um botão HUMAN que solta a mão do sequenciador.
- [BAILE](https://saulofilho.github.io/baile-fm1/): um tracker de funk: tamborzão, Volt Mix, funk 150, mandelão e brega funk, seis faixas, patterns encadeados numa música e 64 efeitos ao vivo.
- [Afterglow](https://github.com/saulofilho/afterglow-fm1): um visualizador ao vivo para qualquer FM-1: som, notas, clock e botões, desenhados como painéis de linhas diagonais que caem. Em andamento.
- [GL!TCH](https://saulofilho.github.io/glitch/): uma groovebox neon-noir com seis escalas cyber e sete fontes de som. Roda no navegador, sem precisar do aparelho.
- [synth-firmware](https://saulofilho.github.io/synth-firmware/): um plugin do Claude Code que empacota o método do COQUÍ para criar o próximo firmware do FM-1.

### Games (em desenvolvimento)

- [Hound.exe](https://saulofilho.github.io/hound-exe/): um metroidvania de ação em 1-bit dentro de um computador infectado. Você é o cão do scopehound, farejando e caçando bugs pasta por pasta até o kernel. Previsto para a Steam.

### Apps

- [MaréSegura](https://mare-segura.ai.studio/): previsão de marés em tempo real, dados do oceano ao vivo, alertas de folga sob a quilha e cartas náuticas que funcionam totalmente offline.

### Client work (Buena Vista Lab)

Trabalhos freelance pelo meu estúdio, [Buena Vista Lab](https://buenavistalab.com/). Clientes incluem Polícia Federal, Kibon, Uber, Gillette, Brastemp, Saraiva, Absolut e Deco Capinhas.

- [Brastemp B.blend Cápsulas](https://loja.bblend.com.br/): loja das primeiras cápsulas de drinks alcoólicos do Brasil (VTEX, full stack).
- [Brastemp B.blend Máquinas](https://loja.bblend.com.br/maquinas): loja da máquina B.blend, que faz drinks, sucos e refrigerantes a partir de cápsulas (VTEX, full stack).
- [DecoSkin](https://www.deco.com.br/): capinhas, películas e acessórios para celular (VTEX, full stack).
- **LAR Home Decor**: loja de decoração (Shopify, full stack).
- **ProductLab**: landing de uma plataforma de vendas para marcas pequenas venderem como os grandes players (Shopify, front end).
- [Spotz Car](https://github.com/saulofilho/spotz-car): loja de carros (e-commerce, full stack).
- [FECMT](https://fecmt.org.br/): notícias e serviços da FECMT, a Federação de Educação e Cultura de Mato Grosso (Netlify CMS, full stack).
- [Santa Contabilidade](https://santacontabilidade-pagina-de-materiais.netlify.app/): site de um escritório de contabilidade digital (Netlify CMS, full stack).
- [Manual do Customer Success](https://manual-customer-success.vercel.app/): landing page de um curso online baseado no livro de Hiram Damin (landing page, full stack).
- [FFWD](https://ffwd.com.br/): site de agência com cases, como os 50 anos da Malwee (Netlify CMS, full stack).
- [Bad Company](https://github.com/saulofilho/badcompany): site de um estúdio criativo: branding, conteúdo e consultoria (site, full stack).
- [WOGO Filmes](https://wogofilmes.com.br/): site de uma produtora de vídeo (Netlify CMS, full stack).
- [Jessyca Creative](https://jessycasilva.work/): portfólio de uma criativa (Netlify CMS, full stack).
- [Bendito Cheiro Art](https://github.com/saulofilho/benditocheiro): site de uma marca de artesanato (Netlify CMS, full stack).
- [ZineTrip](https://github.com/saulofilho/zinetrip): um zine para rolar a tela (Netlify CMS, full stack).
- [instaxmmrs](https://github.com/saulofilho/instaxmmrs): um mural de fotos instantâneas (Netlify CMS, full stack).
- [spdwd](https://github.com/saulofilho/spdwd): site da marca Speedweed (site, full stack).
- [My Favorites](https://myfavoritesapp.vercel.app/): catálogo de produtos favoritos com busca (site, full stack).
- [GitHub Stars](https://githubstars-git-main-saulofilho.vercel.app/): repositórios com estrela no GitHub numa tabela com busca (site, full stack).
- [Chat Bot](https://chatnilson.vercel.app/): Chatnilson, um chatbot que conduz a conversa por um menu de opções (bot, full stack).
- [Botanic Daily Data](https://github.com/saulofilho/green-home): app para montar seu próprio banco de dados da colheita, registrando e analisando os insumos (app, full stack).

### Advertising (the old days)

- **Kibon**: key visual em 3D: um picolé plantado num vaso e regado.
- **Kibon Clock**: um relógio-picolé instalado numa praça de Campinas.
- **Saraiva Pocket Books**: anúncio impresso: Vinte Mil Léguas Submarinas bordado num bolso de jeans.
- **Absolut**: conceito de embalagem: frutas em bandejas transparentes no formato da garrafa.
- **Uber**: UberTRIO, uma promoção dentro do app da Uber.
- **Barber**: um site para assistir a entrevistas de emprego feitas numa barbearia e contratar os candidatos.

## Textos

- [A sua Inteligência Artificial é inteligente?](https://saulofilho.github.io/portfolio/post.html?p=a-sua-inteligencia-artificial-e-inteligente) (31 ago. 2026), também no [Medium](https://medium.com/totvsdevelopers/a-sua-intelig%C3%AAncia-artificial-%C3%A9-inteligente-235709afd1ea)
- [Transformando ruído do time em música para os ouvidos com o Docker](https://saulofilho.github.io/portfolio/post.html?p=transformando-ruido-do-time-em-musica-com-docker) (14 ago. 2026), também no [Medium](https://medium.com/totvsdevelopers/transformando-ru%C3%ADdo-do-time-em-m%C3%BAsica-para-os-ouvidos-com-o-docker-42af7206833a)
- [Usando a inteligência artificial para atacar a própria API](https://saulofilho.github.io/portfolio/post.html?p=usando-ia-para-atacar-a-propria-api) (3 ago. 2026), também no [Medium](https://medium.com/totvsdevelopers/usando-a-intelig%C3%AAncia-artificial-para-atacar-a-pr%C3%B3pria-api-acc7c343eb69)

Todos os textos: https://saulofilho.github.io/portfolio/blog.html

## Contato

- [LinkedIn](https://www.linkedin.com/in/saulofilho/)
- [GitHub](https://github.com/saulofilho)
- [押忍](https://saulofilho.github.io/portfolio/osu.html)

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
| `osu.html`, `osu.css`, `osu.js` | 押忍: o terminal que mostra os dados do visitante e termina no desenho em ASCII. Página independente, não usa `styles.css` nem `main.js` |
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

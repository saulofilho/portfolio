---
title: Transformando ruído do time em música para os ouvidos com o Docker
date: 2026-08-14
description: Padronizar ambientes de desenvolvimento, eliminar atritos diários e sincronizar o fluxo de entrega com a dupla Docker e Compose.
tags: [docker, docker-compose, frontend, supply-chain]
lang: pt-BR
---

![Maestro de costas regendo uma orquestra num palco iluminado](https://miro.medium.com/v2/resize:fit:1400/1*Q-2WRoAS_bILhsuK6mRk8g.jpeg)

*Imagem gerada por Inteligência Artificial.*

Vou confessar uma coisa: foi complicado escrever este texto.

É demais de desafiador falar sobre Docker de uma perspectiva inédita, visto que o caminho mais fácil é, inevitavelmente, cair no lugar-comum: *container* de navio, “*ship your machine*”, “funciona em qualquer nuvem”, isolamento mágico, baleia de pacotes etc.

Então, eu precisava beber de uma fonte que saciasse o meu problema prosaico: como fazer o mesmo projeto soar igual em máquinas diferentes.

Esse era o conceito da POC.

Afinal, o Docker unifica. Meio que uma partitura, sabe?! Ele dá o tom que o desenvolvimento vai ter.

Mas a ideia, em si, não era a música. Estava além. Nas entrelinhas da partitura. O gancho veio da unicidade que o Docker, então, estava resolvendo.

Pois todo time *fullstack* conhece a Torre de Babel moderna: mesmo repositório, cinco *setups*, três versões de *Node*, dois *Yarns* e uma frase inevitável: “na minha máquina funciona”.

A gente precisava de uma linguagem em comum. Que falasse com todas as máquinas. Esse era o maior desafio. Fora os outros inúmeros problemas que o Docker resolve, e que já vem como item de série.

> Buscamos uma linguagem que pertença a todas as cidades da Itália e que não pareça pertencer a nenhuma em particular.

Lembrei dos livros da época de vestibular. Livros que eu lia por obrigaç... digo, paixão. Afinal, 17 anos, tendo que prestar vestibular para Direto na Federal é um pouco, como posso dizer, provocador.

Não tão provocador quanto o autor que cito acima. Autor este, visto pela primeira vez na lista dos livros exigidos para a prestação da prova.

Em *De vulgari eloquentia*, Dante Alighieri não tentou proibir que os cidadãos de Florença e/ou Bolonha falassem seus dialetos locais em casa. Ele buscava algo diferente: uma *vulgar ilustre*, uma língua comum que permitisse à poesia e à política circularem entre as cidades sem que a conversa se perdesse na tradução.

Excelente gancho para falar de Docker e do Compose.

![Músicos medievais tocando juntos num salão iluminado por velas](https://miro.medium.com/v2/resize:fit:1400/1*Q-BgZcKWVcySILrv1EMwcg.png)

*Imagem gerada por Inteligência Artificial.*

O **Docker Compose** cumpre esse exato papel. Ele não dita como você configura o seu sistema operacional, a sua IDE ou o seu terminal, já que isso é o seu dialeto pessoal. O que ele padroniza é a partitura do projeto.

Como disse Dante ao buscar uma linguagem universal: “buscamos aquilo que pertence a todas as cidades, mas não parece pertencer a nenhuma em particular”. Sua máquina continua sendo sua, e o container é apenas a língua em que o projeto conversa com o mundo.

É como reunir violinista, pianista e orquestra sem uma partitura comum. Cada um pode ser excelente. Cada um pode até tocar o mesmo tema. Mas sem uma referência compartilhada, o ensaio vira uma tradução permanente, e o resultado não é uma sinfonia, é um ruído.

*Ziriguidum* para cá.\
*Paticumbum Prugurundum* para lá.

A escolha da metáfora musical não é gratuita. No *De vulgari*, ele chega a definir a própria poesia como “*fictio rethorica musica composita*”: uma invenção poética e retórica posta em música.

A harmonia do poema só existe quando o ritmo, a forma e o tom seguem uma proporção exata. Quando tentamos rodar um projeto instalando *Node*, *Yarn* e dezenas de dependências direto no sistema operacional, é como se cada músico decidisse afinar o instrumento em uma frequência própria. O projeto “toca”, mas desafinado. E qualquer atualização de ambiente vira uma nota fora do tom que paralisa o ensaio.

O Docker Compose surge como essa partitura compartilhada. Ele não dita qual editor você usa, o seu tema do terminal ou como você organiza seus atalhos no *macOS*, *Linux* ou *WSL*. Esse continua sendo o seu dialeto, a sua interpretação individual. Mas a estrutura que rege o runtime, as dependências e o ambiente é rigorosamente a mesma.

Foi exatamente para trocar o ruído dos dialetos por uma execução harmônica que construí esta POC.

Em vez de transformar o *notebook* de cada *dev* em uma fábrica poluída por *giga-bytes* de `node_modules` e versões conflitantes, mudamos a premissa: a máquina não precisa ser o ambiente de desenvolvimento. Ela só precisa ser o porto onde o container… digo, o palco onde a partitura é executada. Desafinar faz parte. Afinal, “*Só desafina quem tá tentando tocar*”, diria o poeta!

A seguir, após algumas tentativas, mostro como a POC do ***marketing-multichannel-frontend*** colocou essa teoria em prática: desde o momento em que tiramos o *Node* do *host* até a construção da camada de auditoria que convenceu o time de Segurança.

![Orquestra de câmara ensaiando num salão de pedra, sob feixes de luz](https://miro.medium.com/v2/resize:fit:1400/1*T34BH-KCcUMMnmIsYpp5gA.png)

*Imagem gerada por Inteligência Artificial.*

## Start: desenvolver sem instalar o stack no host

A primeira entrega técnica foi um ambiente de desenvolvimento local baseado apenas em Docker e Docker Compose. A premissa era objetiva: o time não precisa instalar *Node.js*, *Yarn* ou `node_modules` na máquina para subir o projeto.

A imagem partiu de `node:22.5.1-bookworm-slim`.

No Compose, dois serviços cobrem o fluxo diário:

- `fake-api` executa `yarn fake:api` na porta 5000;
- `app` executa `yarn start` na porta 3000;

Ambos rodam com `working_dir` em `packages/main`, que é onde mora o fluxo real da aplicação.

Também foram criados profiles de *CI* para *test* (`yarn test:ci`) e *lint* (`yarn lint`), reutilizando a mesma base de imagem.

O código fica no host e entra no container por *bind mount* (`.:/app`). Já as dependências ficam em volumes Docker (`node_modules` e `packages/main/node_modules`). Essa separação permite *hot reload* sem poluir o sistema operacional local.

No serviço `app`, variáveis como `CHOKIDAR_USEPOLLING`, `WATCHPACK_POLLING` e `HOST=0.0.0.0` garantem que o watch e o bind funcionem bem em *Docker/WSL*.

Para o time, o fluxo ficou reduzido a:

```bash
cp .env.example .env
docker compose up --build
```

Com isso, o runtime deixou de ser um ritual de máquina e passou a ser um artefato compartilhado.

## Autenticação jFrog facilitada

O segundo desafio técnico resolveu o acesso aos pacotes privados da empresa.

No ecossistema *Yarn Berry*, a autenticação não se comporta como no *npm* clássico: não basta “ter um `.npmrc` qualquer”.

A POC configura o *Yarn* via `npmScopes` e `npmRegistries`, força a versão *3.8.7* no *build* por compatibilidade com o projeto, e monta a credencial no padrão `base64("usuario:token")`, alinhado ao que já se usa em *CI*.

O ponto importante da portabilidade foi eliminar caminhos pessoais. Nada de `/mnt/c/Users/…`, nada de depender do `~/.npmrc` de cada pessoa. A entrada é o `.env` local com `JFROG_USERNAME` e `JFROG_PASSWORD`.

Na primeira versão, as credenciais ainda entravam como `ARG` de *build*. Isso funcionava, mas tinha um problema de segurança: valores em `ARG` podem vazar para o histórico da imagem. Essa escolha foi revista na fase seguinte.

## Resolvendo o volume vazio no primeiro up

Assim que os contêineres passaram a usar volumes nomeados para `node_modules`, apareceu um clássico de Docker: o volume sobe vazio e sobrescreve o que veio na imagem. Na prática, o container “esquecia” as dependências instaladas no *build*.

A solução foi:

- instalar as deps no *build*;
- guardar um cache compactado na imagem (`/opt/node_modules_cache.tar.gz`);
- no primeiro *start*, extrair esse *cache* para `/app/node_modules`;
- usar um *lock* (`.docker-initializing`) para evitar corrida entre `app` e `fake-api`;

Também foi necessário tratar o caminho como absoluto. Como o `working_dir` é `packages/main`, um restore relativo quebrava silenciosamente. O *entrypoint* final ficou em `docker/entrypoint.sh`, copiado para `/usr/local/bin/docker-entrypoint.sh`.

## Menos scripts, mais Dockerfile

Depois da primeira versão funcional, veio uma limpeza estrutural. A famigerada refatoração. A POC inicial acumulará scripts auxiliares demais (`configure-jfrog.js`, `configure-yarn-auth.js` etc.). Tecnicamente úteis na exploração, mas ruído demais para o time.

A implementação foi consolidada:

- *auth* + *install* no `Dockerfile`;
- *entrypoint* em arquivo dedicado;
- remoção de `.npmrc` / `.npmrc.bak` locais da equação;
- documentação alinhada ao fluxo real;

A regra ficou mais fácil de explicar: *Docker* + `.env` + *Compose*.

## Otimização de espaço e endurecimento das credenciais

O feedback do time sobre o espaço ocupado em disco foi o primeiro stress test sério da POC.

`app` e `fake-api` apareciam com cerca de 3,27 GB cada. No *setup* local, o projeto ocupava cerca de 2,38 GB. Haja disco rígido, amigo!

A análise mostrou três causas principais:

- duas tags de serviço aparentando peso duplicado, embora compartilhando camadas;
- `node_modules` duplicado entre imagem, cache e volumes;
- contexto de *build* carregando *caches* locais;

As correções técnicas foram diretas:

- uma única imagem compartilhada (`marketing-multichannel-frontend:development`);
- `.dockerignore` reforçado (`node_modules`, `.yarn/cache`, `.webpack_cache`, `.env`, *builds*, *logs*);
- compactação das *deps* e limpeza de *caches* do *Yarn* após o *install*;
- remoção de resíduos em `/root/.yarn` e `/tmp/yarn-cache`;

Resultado medido:

- imagem compartilhada em torno de 708 MB;
- volumes de dependência em torno de 627 MB;
- total aproximado de 1,3 GB, abaixo do setup local típico;

No mesmo movimento, a autenticação *jFrog* saiu de `ARG` e passou a *BuildKit secrets*. As credenciais são montadas só durante o `RUN` do ***install***, usadas para configurar o *Yarn*, e em seguida removidas da configuração antes de fechar a camada. A imagem final não carrega o *token* no *filesystem*.

Aqui a POC deixou de ser só conveniente e passou a ter uma postura mínima de segurança de *build*.

## Auditoria de supply chain: o pedido da Segurança

A pergunta da Segurança deslocou o centro do problema: Se o `node_modules` não está mais na máquina, ainda dá para auditar?

No GitHub, historicamente, usamos o arquivo do repositório para saber quem foi afetado.

A resposta técnica da POC foi separar três superfícies:

- o que fica no GitHub;
- o que fica na imagem/volume;
- o que precisa ser gerado como evidência de auditoria;

E o que continua no GitHub? `package.json` e `yarn.lock` permanecem no repositório. Isso preserva o fluxo histórico de busca de impacto. O *package* instalado do Docker não sobe para o GitHub, e não precisa. Ainda bem. O mapa de “quem foi afetado” continua sendo o *lockfile*.

Também foi adicionado `.github/dependabot.yml` para varredura periódica do ecossistema npm no próprio GitHub.

Durante o *build* da imagem, a POC executa `yarn npm audit` (raiz e `packages/main`) e persiste relatórios em `/opt/security`. A severidade é configurável (`AUDIT_SEVERITY`, padrão `high`), e existe gate opcional (`FAIL_ON_AUDIT`) para quebrar o build quando necessário. Na POC, o default permanece `false` para não travar sem política formal da Segurança.

Além do audit, um gerador lê o `yarn.lock` (*Yarn Berry*) e produz:

- inventário de dependências (`deps-inventory.json`);
- SBOM (*Software Bill of Materials*, ou *Lista de Materiais de Software*);
- CycloneDX 1.5 (`sbom.cdx.json`);
- sumário (`summary.json`)

Na validação da POC, o inventário chegou a cerca de 2240 pacotes. Isso importa porque o *audit* por *advisory* não é a mesma coisa que inventário completo: um responde “há alerta conhecido?”; já o outro responde “o que exatamente entrou?”.

Com isso o compose ganhou um profile `security` com:

- `security-export` para extrair `/opt/security` para `./security-reports`;
- `security-audit` para reexecutar a geração de evidências;
- `security-image-scan` com *Trivy* sobre a imagem;

Também existe o atalho `scripts/security-scan.sh`, que encadeia *build*, ***export*** e ***scan*** para demo ou validação local.

Um resultado importante da validação: o **npm audit** pode vir limpo em **high/critical** enquanto o **Trivy** ainda aponta findings de **imagem/OS**. Em vez de esconder isso, a POC usa o fato como argumento técnico — uma camada só não basta.

Os artefatos vão para `security-reports/`, ignorados no Git. Assim, a POC gera prova auditável sem transformar o repositório em depósito de relatórios *binários/JSON* volumosos.

Quando a implementação entrou em revisão automatizada, dois ajustes fecharam a fase técnica:

- o *Hadolint* quebrava no *heredoc inline* do *entrypoint*;
- a correção foi externalizar `docker/entrypoint.sh`, definir `SHELL` com pipefail e isolar o warning de ***pin*** de pacotes *apt*;
- o *parser* do `yarn.lock` foi refatorado em funções menores para reduzir complexidade estrutural, sem perder a geração do SBOM;

Esses pontos parecem cosméticos, mas são parte da mesma tese da POC: o fluxo precisa ser repetível inclusive sob *lint/CI*, não só “na minha máquina com Docker ligado”.

## Arquitetura técnica final

O estado atual da POC pode ser lido em cinco camadas:

- DX/runtime: Compose, *bind mount*, *volumes*, *hot reload*, `app` na 3000 e *fake API* na 5000;
- *Auth* privada: *jFrog* via *BuildKit secrets* + configuração *Yarn Berry*;
- Eficiência: uma imagem compartilhada, *cache* compactado, *dockerignore* rígido;
- Segurança de credencial: sem *token* no histórico/*filesystem* final da imagem;
- *Supply chain*: *lockfile* no GitHub, Dependabot, SBOM, *npm audit*, Trivy e *export* de evidências

Arquivos centrais:

- `Dockerfile`;
- `docker-compose.yml`;
- `docker/entrypoint.sh`;
- `docker/generate-sbom.js`;
- `docker/run-security-audit.sh`;
- `scripts/security-scan.sh`;
- `.env.example`;
- `.dockerignore`;
- `.github/dependabot.yml`;
- `docs/DOCKER_SECURITY.md`;

## O que foi validado de ponta a ponta

Ao fim do ciclo técnico, a POC comprovou:

- `docker compose up --build` funcional;
- `app` respondendo em `http://localhost:3000`;
- *fake API* respondendo em `http://localhost:5000`;
- autenticação jFrog sem path de SO;
- imagem otimizada em torno de 708 MB;
- geração de SBOM/*audit* no *build*;
- export de relatórios e scan de imagem;
- preservação do `yarn.lock` como superfície de busca no GitHub;

Em outras palavras: o ambiente deixou de ser uma instalação pessoal e passou a ser um pacote operacional com evidência.

## Limites explícitos da implementação

Para manter honestidade técnica, a POC ainda não cobre:

- Dev Containers / *attach* completo do editor para LSP idêntico ao *host* com *deps* locais;
- imagem de produção;
- scanner corporativo obrigatório no lugar do *Yarn audit*;
- *hard gate* ligado por padrão;
- *healthchecks* de serviço;
- publicação automática de SBOM como artefato oficial de CI enterprise;

Isso não enfraquece a entrega. Delimita o perímetro: a POC resolve desenvolvimento local portável com auditoria básica de *supply chain*, e deixa pronto o caminho para a Segurança endurecer a política.

Do começo ao fim, a implementação seguiu uma linha contínua:

- Primeiro, tirar o *runtime* da máquina;
- Depois, fazer isso de forma portável e segura com jFrog;
- Em seguida, caber no disco sem autoengano;
- Por fim, responder à Segurança com inventário, audit e scan, sem abrir mão do mapa histórico no GitHub;

Dante defende uma língua comum para além dos dialetos locais.\
Não para apagar diferenças; para tornar a conversa possível.

Dante não pediu que todos falassem igual em casa.\
Pediu uma língua capaz de circular entre as cidades.\
O Compose, aqui, cumpre papel parecido: não padroniza o gosto do músico: padroniza a partitura.

![Figura encapuzada sobre um púlpito diante de uma multidão num salão gótico](https://miro.medium.com/v2/resize:fit:1400/1*s7DoboCu3wlQmPs2sBwrIQ.png)

*Imagem gerada por Inteligência Artificial.*

Uma especificação.\
Qualquer máquina.\
Menos dialeto.\
Mais equipe.

Agora, em vez de instalar o stack em cada máquina, o ambiente sobe igual no Docker: Linux, macOS ou WSL.

A máquina muda.\
O jeito de desenvolver, não.

---

**Bibliografia**

- ALIGHIERI, Dante. **De vulgari eloquentia**. Tradução de Nuno Judice. Lisboa: Editorial Presença, 1984.
- DOCKER. **Standard Container Manifesto**. [S. l.]: Moby Project, 2013. Disponível em: <https://github.com/moby/moby/blob/master/README.md>. Acesso em: 7 ago. 2026.
- CYCLONEDX. **CycloneDX Software Bill of Materials (SBOM) Specification**. OWASP Foundation, 2021. Disponível em: <https://cyclonedx.org/>. Acesso em: 7 ago. 2026.
- OWASP FOUNDATION. **OWASP Top 10 Software Component Analysis**. [S. l.]: OWASP, 2023. Disponível em: <https://owasp.org/>. Acesso em: 7 ago. 2026.

*Publicado originalmente no [Medium, em TOTVS Developers](https://medium.com/totvsdevelopers/transformando-ru%C3%ADdo-do-time-em-m%C3%BAsica-para-os-ouvidos-com-o-docker-42af7206833a).*

---
title: Usando a inteligência artificial para atacar a própria API
date: 2026-08-03
description: E depois a inteligência humana para transformar em um produto interno.
tags: [security, pentest, ai, rails]
lang: pt-BR
---

![Escavadeira em pixel art demolindo um prédio](https://miro.medium.com/v2/resize:fit:1400/1*T5iDA3Cs6Jev90487vtMFQ.png)

Vamos começar com nostalgia! Logo de cara mesmo.

Porque não tem como escrever esse texto e não lembrar do vídeo — que eu não consegui achar, por sinal — da época em que o YouTube era só mato e vídeos com pouca resolução, que chama: *A MÁQUINA QUE CONSTRÓI TUDO*. Ou algo parecido.

Mas encontrei um irmão gêmeo, um pouco mais contemporâneo, com melhor definição, mais pixels, então está valendo:

<a class="video short" href="https://www.youtube.com/shorts/eZLSwdKRY6g"><img src="https://i.ytimg.com/vi/eZLSwdKRY6g/hqdefault.jpg" alt="Vídeo no YouTube: uma máquina que tritura capacetes de bicicleta, rodando ao contrário"><span class="play">▶ Ver no YouTube</span></a>

Vídeo besta, não é mesmo?! Mas é isso que torna ele tão valioso. A ingênua inversão de valores, uma simples mudança na perspectiva, criando algo totalmente diferente, totalmente extraordinário, totalmente destruidor.

A ideia é exatamente esta: destruir é igual construir.\
Só que ao contrário.

Destruir o que você construiu tem valor, porque é aí que você realmente aprende o que construiu.

Ou desaprende.\
Não sei.

Depende do ponto de vista.\
Depende do caos.

> Chaos Engineering é a disciplina de realizar experimentos sobre sistemas com o intuito de construir confiança com relação a capacidade de um sistema suportar condições adversas em produção.

A Chaos Engineering destrói disponibilidade controlada para construir resiliência.

Destrói.\
Depois, constrói.

E isso eu venho aplicando desde o tempo em que as máquinas (o querido *PC Itautec Pentium MMX 233*, o “performático” *Pentium II 266* rodando Windows 95) pareciam que iam levantar voo: as minhas lembravam muito o saudoso [Fokker 100](https://pt.wikipedia.org/wiki/Fokker_100) decolando.

Tempos simples.\
*Beep. Boop.*\
E cheios de bugs.\
*Boop. Beep.*

Mas, aqui, entre a gente: tem jeito melhor de aprender a programar nos anos 90?!

Sempre destruindo.

Veja bem: a Natureza mesmo aplica este conhecimento. Lá de onde eu venho, o Cerrado Mato Grossense, a Natureza se [regenera queimando](https://esajournals.onlinelibrary.wiley.com/doi/abs/10.1002/ecy.2648) a si mesma. O manejo do fogo, de forma criteriosa e inteligente, é indispensável para a preservação do Cerrado, pois na época de estiagem destrói a vegetação seca e as árvores velhas, enquanto o calor abre sementes rígidas e os restos das folhas em forma de cinzas fertilizam o solo, gerando um ecossistema para novas plantações nascerem.

Quem vai duvidar da Natureza?!

Mas, deixando o passado de lado, e olhando para o presente: você está construindo ou destruindo? Ou apenas está fazendo funcionar? É válido! Quem sou eu para julgar?!

Bom, durante muito tempo o meu trabalho como engenheiro foi fazer as coisas funcionarem de qualquer maneira.

Feature sobe, teste passa, métrica aparece, cliente vê o dashboard e o jogo segue. Estamos no caminho feliz: o sistema se comporta como prometemos.

> This kind of thinking is not natural for most people. It’s not natural for engineers. Good engineering involves thinking about how things can be made to work; the security mindset involves thinking about how things can be made to fail. It involves thinking like an attacker, an adversary or a criminal. You don’t have to exploit the vulnerabilities you find, but if you don’t see the world that way, you’ll never notice most security problems.

*Bruce Schneier* já formulou isso de um jeito difícil de melhorar: boa engenharia pensa em como fazer algo funcionar; a mentalidade de segurança pensa em como fazer algo falhar.

> The lack of a security mindset explains a lot of bad security out there: voting machines, electronic payment cards, medical devices, ID cards, internet protocols. The designers are so busy making these systems work that they don’t stop to notice how they might fail or be made to fail, and then how those failures might be exploited.

Veja só, jovem Padawan, quem diria?

Não é natural para a maioria das pessoas. Também não é natural para a maioria dos engenheiros: estamos ocupados entregando. E no alinhamento do meu PDI, com foco em *Cyber Security*, minha gestora e eu chegamos a uma ideia simples: conduzir um Pentest na API — que havia acabado de sair do forno — do próprio time.

A API que eu ajudei a construir, tive que destruir.\
Ossos do ofício.

No sistema do Multichannel API, agora **MULTI**, consolidamos métricas de E-mail, SMS e WhatsApp. Nada mais, nada menos quê: API Ruby on Rails, endpoint `/api/v1/channels`, *Data Lake* no *BigQuery*. Arquitetura multi-tenant. Isolamento entre clientes não é detalhe, é requisito.

API bem feitinha, bem bonitinha.\
Agora, vamos tentar quebrar.

![Escavadeira amarela em pixel art sobre os escombros de um prédio](https://miro.medium.com/v2/resize:fit:1400/1*BVwMn7oM7EpYEfgW399OBA.png)

E antes de escrever um único script, construí, ironicamente, um documento de destruição: o Plano de Ação de Pentest.

- Cada vetor com hipótese clara.
- *Tenant* traversal.
- Header injection.
- *SQL* em filtro de data.
- Range abusivo.
- Bypass no *Data Lake*.
- *Over Privilege* de *Service Account*.
- *DoS* de custo.

E cada ataque era uma pergunta disfarçada de payload: o que este sistema confia que talvez não deveria?

- Trocar `X-Tenant-ID` por *ID* alheio.
- Omitir o *tenant*.
- Enviar payloads clássicos em `start_date`/`end_date`.
- Pedir intervalos absurdos (1900–2100).
- Apontar `UNION` para `INFORMATION_SCHEMA`.
- Testar se a SA “read-only” ainda lia demais.

E não é que a API saiu bem na borda.

- A sessão prevalecia.
- *Tenant* omitido virava 400.
- Coerção e `SAFE_CAST` engoliam injeção.
- O payload `' OR '1'='1` não atravessava.

Aprovamos a maior parte da matriz. E foi daí, então, que surgiram os RFCs: *tenant* obrigatório no *OpenAPI*, whitelist de timezone, rate limiting, banir interpolação *SQL* em *heredoc*, *IAM* mínimo. A reconstrução começa exatamente onde a destruição apontou.

Mas isso vale além de *security*. Ao tentar replicar o plano de ação, surgiu o problema real: cada serviço tem granularidade diferente. *Endpoint*, *controller*, *query BigQuery*, design doc. Reproduzir à mão aquele nível de detalhe para cada novo escopo não escala.

Um *endpoint REST* simples não tem os mesmos vetores que uma API analítica *multi-tenant*. Uma *query BigQuery* com *heredoc SQL* tem riscos que um *controller* Rails não tem. Um sistema com upload de arquivo exige vetores de *path* traversal que uma API de leitura não exige.

E, então, sabe o que eu fiz?\
Resolvi destruir o processo!\
E isso importou tanto quanto destruir a API.

A necessidade não era “fazer IA atacar sozinha”. Era padronizar e acelerar o planejamento, antes mesmo da execução dos testes, que define se o Pentest vai ser superficial ou completo.

- **Jira**: não funcionou. Além da fricção técnica, aparece um ponto de governança: expor contrato e código sensível no lugar errado também é risco.
- **Gemini corporativo**: seguro do ponto de vista de treino de modelo, mas complexo demais no dia a dia: envs, orquestração, alta fricção.
- **Cursor**: funcionou. Contexto local do repositório, *skill* versionada, iteração rápida com mentoria.

Destruir três hipóteses de ferramenta foi pré-requisito para construir a certa. O que sobreviveu virou a *skill* [security-pentest-planner](https://saulofilho.github.io/security-pentest-planner/) no *Product Factory* e *ai-registry*:

```bash
engex ai skill install security-pentest-planner -y
```

A ferramenta não executa o ataque sozinha. Ela padroniza o plano da destruição: vetores OWASP adaptados ao contrato, procedimentos, critérios, remediações e RFCs quando o item é estrutural. IA acelera o mapeamento. Humanos validam o golpe.

![Prédio em construção com guindastes em pixel art, sob um pôr do sol alaranjado](https://miro.medium.com/v2/resize:fit:1400/1*lfvjsD7a971lhQ89IC9opg.png)

E isso teve um baita valor para o time.

Para AppSec/QA:

- Plano consistente antes da execução manual.
- Cobertura OWASP adaptada ao contrato, não genérica.
- Menos tempo montando documento do zero a cada novo *endpoint*.
- IDs de vetor rastreáveis entre plano, remediação e RFC.

Para Desenvolvimento:

- *Handoff* claro: sabe o que testar e o que corrigir.
- `remediacoes.md` com priorização (P0/S primeiro).
- *Snippets* de referência no *stack* do projeto (*Rails*, *BigQuery*).
- Não precisa ser especialista em OWASP para começar.

Para Tech Leader:

- RFCs estruturados para decisões arquiteturais.
- Padronização entre times via *ai-registry*.
- Segurança ofensiva na esteira, não como etapa isolada *pós-release*.
- Evidência de conformidade documentada (repositório + matriz).

Para a empresa:

- Skill reutilizável: nasceu no *Multichannel*, serve qualquer API multi-tenant ou integração com *Data Lake*.
- Instalável em qualquer projeto via *EngEx CLI*.
- Curada, versionada e com *review* de governança.
- Case de colaboração Sec + Engenharia + Plataforma.

![Duas torres cobertas de plantas em pixel art, sob um céu azul](https://miro.medium.com/v2/resize:fit:1400/1*LM9xIXksmEvJse43pV75Lw.png)

Primeiro destruí a API de propósito.\
Depois destruí três formas de automatizar.\
E o que restou virou ferramenta para o time construir melhor.

> If more people had a security mindset, services that compromise privacy wouldn’t have such a sizable market share — and Facebook would be totally different. Laptops wouldn’t be lost with millions of unencrypted Social Security numbers on them, and we’d all learn a lot fewer security lessons the hard way. The power grid would be more secure. Identity theft would go way down. Medical records would be more private. If people had the security mindset, they wouldn’t have tried to look at Britney Spears’ medical records, since they would have realized that they would be caught.

Destruir.\
Aprender.\
Construir.

E fazer tudo de novo.\
Essa é a graça.

> A gente destrói aquilo que mais ama\
> em campo aberto, ou numa emboscada;\
> alguns com a leveza do carinho\
> outros com a dureza da palavra;\
> os covardes destroem com um beijo\
> os valentes destroem com a espada.\
> Mas a gente sempre destrói aquilo que mais ama.

---

**Bibliografia**

1. SCHNEIER, Bruce. **The Security Mindset**. Schneier on Security, 2008. Disponível em: <https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html>. Acesso em: 20 jul. 2026.
2. NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY. **Principles of Chaos Engineering**. Chaos Engineering, [s.d.]. Disponível em: <https://principlesofchaos.org/pt/>. Acesso em: 20 jul. 2026.
3. WILDE, Oscar. **A balada do cárcere de Reading**. In: COELHO, Paulo. *As Valquírias*. [S.l.]: [s.n.], 1992. Trecho citado.

*Publicado originalmente no [Medium, em TOTVS Developers](https://medium.com/totvsdevelopers/usando-a-intelig%C3%AAncia-artificial-para-atacar-a-pr%C3%B3pria-api-acc7c343eb69).*

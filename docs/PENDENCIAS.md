# Pendências — site da Tao Klyn

O que ainda falta para o site sair do ar de teste e ir ao ar de verdade.

**Regra que orientou a construção:** nada foi inventado. Onde a informação não
existia nas referências, o campo ficou vazio, o texto ficou genérico ou a seção
se esconde sozinha. Cada item abaixo é uma decisão que só a clínica pode tomar.

---

## 1. Bloqueiam a publicação

| # | Pendência | Por quê |
|---|---|---|
| 1.1 | **Domínio oficial** | Enquanto não houver domínio, o endereço canônico e o sitemap apontam para `https://taoklyn-site.pages.dev`. Basta definir `SITE_URL` no Cloudflare Pages. |
| 1.2 | **Revisão jurídica das políticas** | `Política de Privacidade` e `Política de Cookies` foram escritas descrevendo corretamente o funcionamento técnico do site, e trazem um aviso de que precisam de revisão. Um advogado deve validá-las. |
| 1.3 | **Lista final de serviços** | Os 10 serviços publicados vieram dos destaques do Instagram e das artes. Confirmar se todos estão ativos hoje e se falta algum. |

---

## 2. Conteúdo que falta

| # | Pendência | Onde entra |
|---|---|---|
| 2.1 | **Horário de funcionamento oficial** | Configurações → Horário. Enquanto não for preenchido, o site pede para a pessoa confirmar pelo WhatsApp, em vez de mostrar horário inventado. |
| 2.2 | **Link oficial do Google Maps** | Configurações → Endereço. Sem ele, "Como chegar" faz uma busca pelo endereço. Nenhum Place ID foi inventado. |
| 2.3 | **Fotos da clínica** | Fachada, recepção, consultórios, sala de pilates, sala de funcional. Não há **nenhuma** foto do espaço nas referências (ver `referencias/clinica/LEIA-ME.txt`). As seções "Espaços" e "Galeria" estão vazias e se escondem sozinhas. |
| 2.4 | **Fotos originais dos profissionais** | As fotos hoje no site foram **recortadas das artes de divulgação** (`scripts/preparar-assets.mjs`). Funcionam, mas a resolução é a da arte. Com o arquivo original, basta trocar pelo CMS. |
| 2.5 | **Textos dos serviços** | Foram escritos de forma sóbria e genérica, sem prometer resultado terapêutico. A clínica deve revisar cada um. |
| 2.6 | **Texto institucional e destaques** | Compostos a partir da missão oficial e do texto da arte da Dra. Audinei. Revisar. |
| 2.7 | **Quem atende Fisioterapia, Pilates, Terapias Integrativas e G.T. Dança** | Esses quatro serviços estão sem profissional relacionado, porque nenhuma referência informa quem os conduz. |
| 2.8 | **História da clínica** | Só se sabe a data de fundação (22/12/2007). Uma página "Sobre" mais rica depende de material da clínica. |
| 2.9 | **Informações de locação** | Valores, metragem, horários e condições **não foram inventados**. A seção convida a consultar pelo WhatsApp. |
| 2.10 | **Acessibilidade física e estacionamento** | Campo "Orientações de como chegar", em Configurações → Endereço, está vazio. |
| 2.11 | **Registro profissional do Fernando** | Nenhum CREF foi informado. O campo está vazio — nada foi inventado. |
| 2.12 | **Primeira publicação do blog** | Existe apenas um **rascunho** chamado "Modelo de publicação", que não aparece no site. |
| 2.13 | **Conferir "Hipnose ericksoniana" com o Robson** | O termo foi confirmado por você em 23/08/2026 e publicado. Vale uma confirmação direta com o profissional, já que a arte de origem trazia o termo truncado. |

---

## 3. Técnicas

| # | Pendência | Detalhe |
|---|---|---|
| 3.1 | **Repositório no GitHub** | O projeto ainda **não foi enviado**. Atenção: `taoklyn/taoklyn-site` **já existe e está ocupado pelo VITORDIS** (sistema de gestão de alunos), cuja `main` está publicada lá. O site vai para um repositório **novo** — decisão de 23/08/2026. O remote local foi removido para que nenhum push acidental sobrescreva o VITORDIS. |
| 3.2 | **Cloudflare Pages** | Criar o projeto apontando para o repositório. Build: `npm run build`. Saída: `dist`. Variáveis: `SITE_URL` e, se quiser medição, `PUBLIC_GA_ID`. |
| 3.3 | **Pages CMS** | Instalar o GitHub App na organização `taoklyn` e **limitar ao repositório do site** (passo a passo em `docs/CMS.md`). Limitar importa: quem cuida do conteúdo não deve alcançar o repositório do VITORDIS, que trata de dados de alunos e menores. |
| 3.4 | **Google Analytics 4** | Sem `PUBLIC_GA_ID`, nenhum script é carregado e nenhum cookie é gravado. Ao configurar, os eventos já estão prontos: `click_whatsapp`, `click_phone`, `click_maps`, `click_instagram`, `click_service`, `click_professional`, `click_room_rental`, `view_post`. |
| 3.5 | **Fonte da marca** | O site usa fontes do sistema (nenhuma requisição externa, carregamento imediato). Se a clínica quiser a fonte das artes, é preciso licença de uso na web e auto-hospedagem. |
| 3.6 | **Horários em dados estruturados** | `openingHoursSpecification` não foi gerado, porque exigiria interpretar texto livre. Depois de definido o horário oficial, vale acrescentar. |
| 3.7 | **Google Business Profile** | Ao ter o perfil verificado, vale ligá-lo ao site (item 2.2) — é o que mais pesa em busca local. |

---

## 4. Decisões já tomadas pelo cliente

| Data | Decisão |
|---|---|
| 23/08/2026 | A grafia oficial é **Fernando Picciguelli** (dois L), como nas artes de divulgação. O endereço da página é `/profissionais/fernando-picciguelli`. |
| 23/08/2026 | O termo truncado na arte do Robson é **Hipnose ericksoniana**, e foi publicado entre as áreas de atuação. |
| 23/08/2026 | O site vai para um **repositório novo**, e não para `taoklyn/taoklyn-site` — que está ocupado pelo VITORDIS. |

---

## 5. Decisões que tomei e que você pode reverter

| Decisão | Por quê | Como reverter |
|---|---|---|
| Uploads em `src/assets/uploads/` e não em `public/uploads/` | Dentro de `src/`, o Astro gera AVIF/WebP em vários tamanhos automaticamente. Em `public/`, a imagem vai crua para o ar. | Trocar `input`/`output` em `.pages.yml` e os `path` dos campos de imagem. |
| **Galeria** e **Espaços** como lista única (arrastar para ordenar) em vez de um arquivo por foto | Muito menos atrito para quem envia 20 fotos de uma vez. | Virariam coleções em `.pages.yml` e `src/content.config.ts`. |
| Sem página `/galeria` separada: a galeria vive dentro de `/espacos` | Duas páginas vazias em vez de uma. | Criar `src/pages/galeria.astro` reaproveitando o bloco de galeria. |
| O **nome do arquivo é o endereço da página** — não há campo "slug" | Dois donos do mesmo endereço quebram links já compartilhados. Renomear está desativado no CMS. | Liberar `operations.rename` no `.pages.yml`. |
| Relação profissional ↔ serviço gravada dos **dois lados**, mas **unida** na exibição | A recepção preenche por onde for mais natural e as duas telas nunca discordam. | `src/lib/conteudo.ts`, funções `servicosDoProfissional` e `profissionaisDoServico`. |
| Políticas como conteúdo editável no CMS | Permite que a clínica atualize junto com o advogado sem programador. | — |
| Sem embed do Instagram | O widget oficial carrega scripts de terceiros, cookies e atrasa a página. Há um convite com link. | — |
| Sem formulário de contato | Formulário em site de clínica convida a escrever queixa de saúde, o que criaria tratamento de dado sensível. O contato é por WhatsApp/telefone. | — |

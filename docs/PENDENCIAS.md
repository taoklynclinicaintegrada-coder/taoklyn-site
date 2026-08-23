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
| 1.2 | **Revisão jurídica das políticas** | `Política de Privacidade` e `Política de Cookies` descrevem corretamente o funcionamento técnico do site e trazem um aviso de que precisam de revisão. Um advogado deve validá-las. |
| 1.3 | **Lista final de serviços** | São 12 serviços publicados. Confirmar se todos estão ativos hoje e se falta algum. |
| 1.4 | **CRM da Dra. Nicolie Lira** | A arte informa apenas "Consulta de Endocrinologia com Dra. Nicolie Lira". **Nenhum registro foi publicado.** Publicidade médica sem CRM contraria a resolução do CFM. |
| 1.5 | **CRM da Dra. Marília Cavalcante** | A arte informa "Urologista", sem registro. **Nenhum registro foi publicado.** Mesmo motivo acima. |

---

## 2. Conteúdo que falta

### 2a. Sobre os profissionais recém-cadastrados

| # | Pendência | Detalhe |
|---|---|---|
| 2.1 | **RQE de Nicolie Lira e Marília Cavalcante** | Se houver título de especialista registrado, é ele que autoriza anunciar a especialidade. Nada foi publicado a respeito. |
| 2.2 | **Nome completo da Dra. Nicolie Lira** | A arte traz só "Nicolie Lira". O endereço da página é `/profissionais/nicolie-lira`; corrigir o nome exibido depois **não** muda o endereço. |
| 2.3 | **Nome completo da Dra. Marília Cavalcante** | Mesma situação. |
| 2.4 | **Confirmação das áreas de atuação** | Todas as áreas publicadas foram lidas diretamente das artes, uma a uma. Vale a conferência de cada profissional com o próprio texto. |
| 2.5 | **"Há 38 anos cuidando da saúde mental"** (Margarida) | Está na arte e foi publicado na biografia. **É um dado que envelhece:** em 2027 estará desatualizado. Considerar trocar por "desde 19XX". |
| 2.6 | **Fotografias originais, sem layout gráfico** | As fotos dos **nove** profissionais foram recortadas das artes de divulgação (`scripts/preparar-assets.mjs`). Ficaram limpas, mas a resolução é a da arte. Com o arquivo original, basta trocar pelo CMS — nenhuma linha de código muda. |
| 2.7 | **Autorização para exibir contatos individuais** | As artes trazem telefones e Instagram pessoais (Margarida, Tereza, Alicya, Nicolie, Marília). **Nada disso foi publicado.** O site usa apenas o WhatsApp e o telefone da clínica. Para expor contato individual, é preciso autorização de cada profissional — e o campo teria de ser criado no CMS. |
| 2.8 | **Textos dos serviços novos** | "Endocrinologia" e "Urologia" foram criados porque as artes confirmam que a clínica os oferece. Os textos são mínimos e neutros; a clínica deve revisá-los. |

### 2b. Sobre a clínica

| # | Pendência | Onde entra |
|---|---|---|
| 2.9 | **Horário de funcionamento oficial** | Configurações → Horário. Enquanto não for preenchido, o site pede para confirmar pelo WhatsApp, em vez de mostrar horário inventado. |
| 2.10 | **Link oficial do Google Maps** | Configurações → Endereço. Sem ele, "Abrir no Google Maps" faz uma busca pelo endereço. Nenhum Place ID foi inventado. |
| 2.11 | **Fotos da clínica** | A galeria continua vazia. Os dois vídeos do tour já mostram os ambientes, mas fotos permitem legenda e categoria. |
| 2.12 | **Texto institucional e destaques** | Compostos a partir da missão oficial e do texto da arte da Dra. Audinei. Revisar. |
| 2.13 | **Quem atende Terapias Integrativas e G.T. Dança** | Seguem sem profissional relacionado, porque nenhuma referência informa quem os conduz. Fisioterapia, Pilates e Yoga já foram ligados a Tereza e Alicya. |
| 2.14 | **História da clínica** | Só se sabe a data de fundação (22/12/2007). |
| 2.15 | **Informações de locação** | Valores, metragem, horários e condições **não foram inventados**. |
| 2.16 | **Acessibilidade física e estacionamento** | Campo "Orientações de como chegar", em Configurações → Endereço, está vazio. |
| 2.17 | **Registro profissional do Fernando** | Nenhum CREF foi informado. O campo está vazio. |
| 2.18 | **Primeira publicação do blog** | Existe apenas um **rascunho** chamado "Modelo de publicação". |
| 2.19 | **Conferir "Hipnose ericksoniana" com o Robson** | Confirmado por você em 23/08/2026 e publicado. A arte de origem trazia o termo truncado; vale confirmar com o profissional. |

---

## 3. Vídeos

Medidos com `node scripts/inspecionar-video.mjs`. Todos H.264 (avc1) + AAC
(mp4a), 720×1280 vertical, 30 fps:

| Arquivo | Duração | Tamanho | Bitrate | Situação |
|---|---|---|---|---|
| `conhecendo-clinica-parte-1.mp4` | 12,8 s | **1,74 MB** | 1,14 Mbps | ✅ publicado em `public/uploads/videos/` |
| `conhecendo-clinica-parte-2.mp4` | 14,1 s | **2,05 MB** | 1,21 Mbps | ✅ publicado em `public/uploads/videos/` |
| `como-chegar-tao-klyn.mp4` | 65,2 s | **24,38 MB** | 3,13 Mbps | ⛔ **não publicado** — permanece só em `referencias/` |

| # | Pendência | Detalhe |
|---|---|---|
| 3.1 | **Hospedagem definitiva do "como chegar"** | 24,38 MB é demais para este repositório: o limite do Cloudflare Pages é 25 MiB **por arquivo** (passaria raspando) e o Git guardaria cada versão futura para sempre. **Recomendação: publicar no YouTube** e colar o endereço no CMS, em Vídeos → "Endereço do vídeo". Assim que houver URL, o botão "Assistir como chegar" aparece sozinho na Localização e no Contato. |
| 3.2 | **Capa do vídeo "como chegar"** | Só faz sentido gerar quando houver fonte. As capas dos dois vídeos do tour foram extraídas de quadros reais dos próprios vídeos, não desenhadas. |
| 3.3 | **Legendas** | Nenhum vídeo tem legenda. Para acessibilidade plena valeria um arquivo `.vtt`; hoje há apenas descrição textual em cada vídeo. |

---

## 4. Técnicas

| # | Pendência | Detalhe |
|---|---|---|
| 4.1 | **Repositório no GitHub** | ✅ Feito em 23/08/2026: `taoklyn/taoklyn-site`, privado. A `main` anterior era o VITORDIS e foi substituída por decisão do cliente. |
| 4.2 | **Cloudflare Pages** | Criar o projeto apontando para o repositório. Build: `npm run build`. Saída: `dist`. Variáveis: `SITE_URL` e, se quiser medição, `PUBLIC_GA_ID`. |
| 4.3 | **Pages CMS** | Instalar o GitHub App na organização `taoklyn` e limitar ao repositório do site (passo a passo em `docs/CMS.md`). |
| 4.4 | **ZIPs no histórico do Git** | `taoklyn-profissionais-novos.zip` (6,7 MB) e `taoklyn-videos.zip` (29,5 MB) entraram por engano no commit `152d9ae` e já foram publicados. Foram removidos da árvore e o `.gitignore` passou a barrá-los, **mas os blobs seguem no histórico**. Limpá-los exige reescrever o histórico e um novo force-push — decisão sua. |
| 4.5 | **Google Analytics 4** | Sem `PUBLIC_GA_ID`, nenhum script é carregado e nenhum cookie é gravado. Os eventos já estão prontos. |
| 4.6 | **Fonte da marca** | O site usa fontes do sistema. Para usar a fonte das artes, é preciso licença de uso na web e auto-hospedagem. |
| 4.7 | **Horários em dados estruturados** | `openingHoursSpecification` não foi gerado, porque exigiria interpretar texto livre. |
| 4.8 | **Google Business Profile** | Ao ter o perfil verificado, vale ligá-lo ao site (item 2.10). |

---

## 5. Decisões já tomadas pelo cliente

| Data | Decisão |
|---|---|
| 23/08/2026 | A grafia oficial é **Fernando Picciguelli** (dois L), como nas artes. O endereço da página é `/profissionais/fernando-picciguelli`. |
| 23/08/2026 | O termo truncado na arte do Robson é **Hipnose ericksoniana**, e foi publicado entre as áreas de atuação. |
| 23/08/2026 | O site fica em **`taoklyn/taoklyn-site`**, substituindo o VITORDIS que estava publicado ali. O VITORDIS segue íntegro no computador; se voltar ao GitHub, precisa de outro repositório. |

---

## 6. Decisões que tomei e que você pode reverter

| Decisão | Por quê | Como reverter |
|---|---|---|
| Imagens do CMS em `src/assets/uploads/`, vídeos em `public/uploads/videos/` | Dentro de `src/`, o Astro gera AVIF/WebP em vários tamanhos. Vídeo não passa por esse otimizador, então fica em `public/`, servido como está. | Trocar `input`/`output` em `.pages.yml` e os `path` dos campos. |
| **Galeria**, **Espaços** e **Vídeos** como lista única (arrastar para ordenar) | Muito menos atrito do que um arquivo por item. | Virariam coleções em `.pages.yml`. |
| Vídeo externo abre em nova aba, **sem player incorporado** | O incorporado do YouTube traz scripts e cookies de terceiros, atrasa a página e não passa pela Content-Security-Policy. | Exigiria afrouxar a CSP em `public/_headers`. |
| `preload="none"` em todo vídeo, **sem autoplay** | A página só paga o peso da capa (~20 KB) até alguém apertar play. | `src/components/VideoInstitucional.astro`. |
| Endocrinologia e Urologia criados como serviços | As artes confirmam que a clínica os oferece; sem eles, as duas médicas ficariam sem serviço relacionado. | Basta desmarcar "Mostrar no site" nos dois. |
| Página inicial mostra **até 6 profissionais** | Com nove, a home viraria uma listagem. Quem está marcado como destaque aparece primeiro; o resto completa por ordem. | `src/pages/index.astro`. |
| O **nome do arquivo é o endereço da página** — não há campo "slug" | Dois donos do mesmo endereço quebram links já compartilhados. Renomear está desativado no CMS. | Liberar `operations.rename` no `.pages.yml`. |
| Relação profissional ↔ serviço gravada dos **dois lados**, mas **unida** na exibição | A recepção preenche por onde for mais natural e as duas telas nunca discordam. | `src/lib/conteudo.ts`. |
| Políticas como conteúdo editável no CMS | A clínica atualiza junto com o advogado, sem programador. | — |
| Sem embed do Instagram | Scripts de terceiros e cookies. Há um convite com link. | — |
| Sem formulário de contato | Formulário em site de clínica convida a escrever queixa de saúde, criando tratamento de dado sensível. | — |

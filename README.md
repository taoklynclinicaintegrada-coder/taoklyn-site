# Tao Klyn | Clínica Integrada — site institucional

Site institucional da Tao Klyn, clínica integrada no Farol, em Maceió (AL),
fundada em 22 de dezembro de 2007.

**Quem cuida do conteúdo não precisa deste arquivo.** O manual da recepção é o
[`docs/CMS.md`](docs/CMS.md).

| Documento | Para quem | Assunto |
|---|---|---|
| [`docs/ACESSO-RAPIDO.md`](docs/ACESSO-RAPIDO.md) | recepção | folha de 3 passos para entrar, com QR code. É o que se imprime |
| [`docs/CMS.md`](docs/CMS.md) | recepção e equipe de conteúdo | manual completo: escrever, publicar, trocar imagem, desfazer |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | quem administra | manual completo: contas, Cloudflare, variáveis, domínio na Hostinger, Analytics e falhas |
| [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md) | ambos | o que falta e o que deliberadamente não foi inventado |

---

## Sumário

- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Rodando o projeto](#rodando-o-projeto)
- [Comandos](#comandos)
- [Estrutura de diretórios](#estrutura-de-diretórios)
- [Conteúdo](#conteúdo)
- [CMS](#cms)
- [Imagens](#imagens)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Deploy no Cloudflare Pages](#deploy-no-cloudflare-pages)
- [Decisões de projeto](#decisões-de-projeto)

---

## Stack

| Camada | Escolha |
|---|---|
| Framework | [Astro](https://astro.build) 7, saída **estática** |
| Linguagem | TypeScript em modo `strict` |
| Estilo | CSS próprio com custom properties. Sem framework, sem build extra |
| JavaScript no cliente | **~0,7 KB** — só os botões do carrossel. Mais o Google Analytics, se configurado |
| Conteúdo | Content Collections (Markdown + JSON), validado com Zod |
| Imagens | `astro:assets` + sharp (AVIF/WebP, tamanhos responsivos) |
| SEO | `@astrojs/sitemap`, JSON-LD, Open Graph |
| CMS | [Pages CMS](https://pagescms.org) (aplicação hospedada, sobre o GitHub) |
| Hospedagem | Cloudflare Pages |

O menu do celular é um `<details>` e os cartões são links. O carrossel de
profissionais rola de forma nativa (`scroll-snap`) — o dedo, o trackpad e as
setas do teclado funcionam sem script; os botões de avançar e voltar são o
único JavaScript da página e nascem escondidos, aparecendo só quando o script
roda. Nenhum conteúdo depende de JavaScript para existir.

`npm run verificar:site` impõe um **orçamento de 8 KB de JavaScript por
página** — hoje o site usa 0,7 KB. Passar do teto quebra a verificação.

## Arquitetura

```
 Administração da clínica
          │
          ▼
    Pages CMS (app.pagescms.org)
          │  grava arquivos no repositório
          ▼
        GitHub  ──▶  Cloudflare Pages  ──▶  site atualizado
                        (npm run build)
```

Não existe backend, banco de dados, autenticação própria nem API. O site é um
conjunto de arquivos HTML gerados no build.

## Rodando o projeto

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:4321`.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run preview` | Serve o que foi gerado |
| `npm run preview:producao` | Serve `dist/` **com os cabeçalhos de `public/_headers`**, como o Cloudflare fará — é o único jeito de testar a Content-Security-Policy antes do deploy |
| `npm run check` | Verificação de tipos e de template (Astro + TypeScript) |
| `npm run verificar:cms` | Confere se o `.pages.yml` bate com os schemas e com as pastas |
| `npm run verificar:contraste` | Confere os pares de cor contra o mínimo da WCAG AA |
| `npm run verificar:site` | Audita o `dist/` gerado: links internos, `alt`, H1, canonical, JSON-LD, sitemap |
| `npm run verificar` | Roda tudo: tipos, CMS, contraste, build e auditoria do `dist/` |
| `npm run assets:marca` | Regera logos, ícones, imagem social e recortes a partir de `referencias/` |
| `node scripts/gerar-qr-do-painel.mjs` | Regera o QR code que abre o painel de conteúdo |
| `node scripts/inspecionar-video.mjs <arquivo>` | Mede duração, resolução, codec e bitrate de um MP4 antes de publicá-lo |

## Estrutura de diretórios

```
taoklyn-site/
├── .pages.yml                 configuração do CMS (rótulos em português)
├── astro.config.mjs
├── docs/
│   ├── ACESSO-RAPIDO.md       folha de 3 passos (com QR) para entrar
│   ├── CMS.md                 manual da recepção
│   ├── DEPLOY.md              publicação passo a passo
│   └── PENDENCIAS.md          o que falta e o que não foi inventado
├── public/                    servido como está (favicons, logos, manifest)
│   ├── _headers               cabeçalhos HTTP aplicados pelo Cloudflare
│   ├── images/brand/
│   └── uploads/videos/        vídeos e suas capas
├── referencias/               material de origem — NUNCA modificado pelo site
├── scripts/
│   ├── lib/mp4.mjs             leitor de MP4 (duração, resolução, codec)
│   ├── inspecionar-video.mjs   mede um vídeo antes de publicá-lo
│   ├── preparar-assets.mjs     referencias/ → public/ e src/assets/
│   ├── servir-como-producao.mjs dist/ com os cabeçalhos do Cloudflare
│   ├── verificar-cms.mjs
│   ├── verificar-contraste.mjs
│   └── verificar-site.mjs
└── src/
    ├── assets/uploads/        imagens enviadas pelo CMS (otimizadas no build)
    ├── components/
    ├── content/               profissionais, servicos, posts, paginas
    ├── content.config.ts      schemas Zod das coleções
    ├── data/                  site.json, galeria.json, espacos.json, videos.json
    ├── layouts/Base.astro     <head>, SEO, JSON-LD, cabeçalho e rodapé
    ├── lib/                   site.ts, conteudo.ts, imagens.ts, midia.ts, seo.ts
    ├── pages/
    └── styles/global.css      tokens da paleta e componentes visuais
```

## Conteúdo

| Tipo | Onde | Formato |
|---|---|---|
| Configurações institucionais | `src/data/site.json` | JSON, validado em `src/lib/site.ts` |
| Profissionais | `src/content/profissionais/*.md` | frontmatter YAML + corpo |
| Serviços | `src/content/servicos/*.md` | frontmatter YAML + corpo |
| Publicações | `src/content/posts/*.md` | frontmatter YAML + corpo |
| Políticas | `src/content/paginas/*.md` | frontmatter YAML + corpo |
| Galeria | `src/data/galeria.json` | lista |
| Espaços | `src/data/espacos.json` | lista |
| Vídeos | `src/data/videos.json` | lista |

Regras que valem para todo o conteúdo:

- **O nome do arquivo é o endereço da página.** Não existe campo "slug", e
  renomear está desativado no CMS — endereço que já circula não deve mudar.
- **Nada aparece por engano.** Profissionais e serviços têm `ativo`;
  publicações têm `publicado`, que nasce **falso**. O que está oculto não entra
  em listagem, página nem sitemap.
- **Conteúdo malformado derruba o build**, com mensagem apontando o arquivo e o
  campo. Melhor do que sumir em silêncio de uma seção.
- Nenhuma página chama `getCollection` direto: os filtros vivem em
  `src/lib/conteudo.ts`.

## CMS

O painel é a aplicação hospedada do Pages CMS, em **https://app.pagescms.org**,
que lê o `.pages.yml` do repositório. Não há `/admin` neste projeto, nem tela de
login própria, nem usuários próprios.

Depois de alterar `.pages.yml` ou os schemas, rode:

```bash
npm run verificar:cms
```

Ele acusa campo que existe no CMS e não no schema, pasta de upload inexistente,
mídia não declarada e referência a coleção que não existe.

## Imagens

Imagens enviadas pelo CMS vão para `src/assets/uploads/**`. Estando dentro de
`src/`, o Astro gera AVIF/WebP em vários tamanhos e escreve `width`/`height`
(sem deslocamento de layout). O componente `Figura.astro` resolve o caminho
gravado pelo CMS; se apontar para `public/` ou para um endereço externo, cai em
`<img>` simples em vez de quebrar.

`referencias/` é **somente leitura**: o script `preparar-assets.mjs` lê de lá e
escreve em `public/` e `src/assets/`, nunca o contrário.

## Variáveis de ambiente

Copie `.env.example` para `.env`. O `.env` **não** vai para o Git.

| Variável | Obrigatória | Para quê |
|---|---|---|
| `SITE_URL` | recomendada | Endereço público final. Alimenta canonical, Open Graph e sitemap. Sem ela, o build avisa e usa `https://taoklyn-site.pages.dev` |
| `PUBLIC_GA_ID` | não | Google Analytics 4 (`G-XXXXXXXXXX`). Sem ela, **nenhum** script de terceiro é carregado e nenhum cookie é gravado |

## Deploy no Cloudflare Pages

Repositório: **https://github.com/taoklyn/taoklyn-site** (privado).

> **Passo a passo completo, com os rótulos exatos de cada tela, domínio próprio,
> variáveis e resolução de problemas: [`docs/DEPLOY.md`](docs/DEPLOY.md).**
> O resumo abaixo serve para quem já conhece o Cloudflare.

1. Cloudflare Pages → **Create a project** → conectar o repositório
   `taoklyn/taoklyn-site`.
2. Configurar:
   - **Framework preset:** Astro (ou None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Em **Environment variables**, definir `SITE_URL` (e `PUBLIC_GA_ID`, se houver).
4. Salvar. Cada commit em `main` dispara um build novo.

Não é preciso servidor rodando nem webhook próprio: o Pages CMS grava no GitHub
e o Cloudflare reage ao commit.

### Cabeçalhos HTTP

`public/_headers` define cabeçalhos de segurança (incluindo uma
Content-Security-Policy que já prevê o Google Analytics) e cache imutável para
`/_astro/*`. O Cloudflare lê esse arquivo automaticamente.

Depois de mexer nele, teste **antes** de publicar — uma CSP errada só aparece em
produção, e aparece como página em branco:

```bash
npm run build && npm run preview:producao
```

## Decisões de projeto

- **JavaScript só onde ele acrescenta.** Menu, navegação, cartões e a rolagem do
  carrossel funcionam com HTML e CSS. O único script são os botões do carrossel
  (0,7 KB), e há orçamento automático de 8 KB por página para impedir que isso
  cresça sem alguém decidir.
- **Vídeo não é baixado antes do play.** `preload="none"` e nenhum autoplay: a
  página paga só o peso da capa (~20 KB). A duração exibida é lida do próprio
  arquivo durante o build, então nunca desatualiza.
- **Contraste conferido por script**, não por impressão: `verificar:contraste`
  falha se algum par usado na interface ficar abaixo do mínimo da WCAG AA.
- **Sem formulário de contato.** Formulário em site de clínica convida a
  escrever queixa de saúde, criando tratamento de dado sensível sem necessidade.
  O contato é por WhatsApp, telefone e e-mail.
- **Sem embed do Instagram.** O widget oficial traz scripts de terceiros e
  cookies; há um convite com link para o perfil.
- **Nada inventado.** Horário, Place ID, registro profissional, preço,
  avaliação e depoimento ausentes ficaram vazios, e a interface se adapta.
  O que falta está em [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md).

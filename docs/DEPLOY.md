# Publicação do site — passo a passo completo

Este documento leva o site da Tao Klyn do computador até o ar, do zero.

**Tempo estimado:** 30 a 40 minutos na primeira vez.
**Custo:** R$ 0,00. GitHub, Cloudflare Pages e Pages CMS têm planos gratuitos
que atendem folgadamente um site institucional. O único custo possível é o
domínio (`taoklyn.com.br`, por exemplo), pago ao registrador.

> **Quem faz o quê**
> Os passos 1 a 5 são feitos **uma vez só**, por quem administra as contas.
> Depois disso, atualizar o site é trabalho da recepção pelo painel — veja
> [`CMS.md`](CMS.md).

---

## Índice

1. [Antes de começar](#1-antes-de-começar)
2. [Enviar o site para o GitHub](#2-enviar-o-site-para-o-github)
3. [Publicar no Cloudflare Pages](#3-publicar-no-cloudflare-pages)
4. [Ligar o domínio próprio](#4-ligar-o-domínio-próprio)
5. [Ligar o painel de conteúdo (Pages CMS)](#5-ligar-o-painel-de-conteúdo-pages-cms)
6. [Medição de acessos (opcional)](#6-medição-de-acessos-opcional)
7. [Conferência depois de publicar](#7-conferência-depois-de-publicar)
8. [Como o site se atualiza no dia a dia](#8-como-o-site-se-atualiza-no-dia-a-dia)
9. [Quando algo dá errado](#9-quando-algo-dá-errado)
10. [Manutenção e segurança](#10-manutenção-e-segurança)

---

## 1. Antes de começar

### O que você precisa ter

| Item | Para quê | Como obter |
|---|---|---|
| Conta no **GitHub** | guarda o site e o conteúdo | github.com → *Sign up* |
| Conta no **Cloudflare** | hospeda e publica | dash.cloudflare.com → *Sign up* |
| Domínio (opcional) | endereço próprio | registro.br, ou qualquer registrador |

### O que já está pronto

- O código do site, completo e testado.
- O repositório **https://github.com/taoklyn/taoklyn-site** (privado), já com
  todo o conteúdo enviado.
- O arquivo `.pages.yml`, que define o painel de conteúdo.
- O arquivo `public/_headers`, com os cabeçalhos de segurança e cache.

### Conferência local (opcional, mas recomendada)

Antes de publicar, dá para rodar tudo na sua máquina:

```bash
npm install
```

```bash
npm run verificar
```

Esse comando roda, em sequência: verificação de tipos, conferência do painel
contra o conteúdo real, contraste de cores (WCAG AA), a geração do site e a
auditoria das páginas geradas (links quebrados, textos alternativos, títulos,
sitemap e orçamento de JavaScript). **Se ele terminar sem erro, o site está
pronto para publicar.**

Para ver o site rodando na sua máquina:

```bash
npm run dev
```

E abrir `http://localhost:4321`.

---

## 2. Enviar o site para o GitHub

> Se o repositório `taoklyn/taoklyn-site` já existe e está atualizado — que é o
> caso hoje —, **pule para o passo 3**.

### 2.1 Autenticar o computador no GitHub

Só é preciso uma vez por computador:

```bash
gh auth login
```

Responda: **GitHub.com** → **HTTPS** → **Login with a web browser**. Copie o
código que aparece no terminal, cole no navegador e autorize.

> Se a organização `taoklyn` usa login único (SSO), o navegador vai pedir para
> autorizar o token nela também. É preciso aceitar, senão o envio falha com
> erro de permissão.

### 2.2 Conferir para onde o projeto aponta

```bash
git remote -v
```

Deve aparecer `https://github.com/taoklyn/taoklyn-site.git`. Se estiver vazio:

```bash
git remote add origin https://github.com/taoklyn/taoklyn-site.git
```

### 2.3 Enviar

```bash
git push -u origin main
```

Pronto: o conteúdo está no GitHub.

---

## 3. Publicar no Cloudflare Pages

### 3.1 Criar o projeto

1. Entre em **https://dash.cloudflare.com**.
2. No menu lateral, clique em **Workers & Pages**.
3. Clique em **Create application** → aba **Pages** → **Connect to Git**.
4. Autorize o Cloudflare a acessar sua conta do GitHub.
5. Na tela de permissão do GitHub, escolha **Only select repositories** e marque
   **taoklyn-site**. Clique em **Install & Authorize**.
6. De volta ao Cloudflare, selecione o repositório **taoklyn-site** e clique em
   **Begin setup**.

### 3.2 Configurar a construção do site

Na seção **Set up builds and deployments**, preencha **exatamente** assim:

| Campo | Valor |
|---|---|
| **Project name** | `taoklyn-site` |
| **Production branch** | `main` |
| **Framework preset** | `Astro` (se não existir, deixe *None*) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory (advanced)** | *deixe vazio* |

> **Atenção ao "Build output directory".** Se estiver errado, o Cloudflare
> conclui a construção com sucesso e publica uma página em branco ou um erro
> 404. É o engano mais comum. Tem que ser `dist`.

### 3.3 Variáveis de ambiente

Ainda na mesma tela, abra **Environment variables (optional)** e adicione:

| Nome | Valor | Obrigatória? |
|---|---|---|
| `SITE_URL` | `https://taoklyn-site.pages.dev` | recomendada |
| `PUBLIC_GA_ID` | `G-XXXXXXXXXX` | só se for medir acessos |

**Para que serve `SITE_URL`:** é o endereço que o site escreve nos links
oficiais para o Google (canonical), no mapa do site (sitemap) e nas
pré-visualizações compartilhadas no WhatsApp (Open Graph). Se estiver errada, o
Google indexa o endereço errado. Quando o domínio próprio existir, **troque
este valor** e refaça a publicação.

Sem `PUBLIC_GA_ID`, nenhum script de medição é carregado e nenhum cookie é
gravado. O site funciona igual.

### 3.4 Publicar

Clique em **Save and Deploy**.

O Cloudflare vai baixar o código, rodar `npm install`, rodar `npm run build` e
publicar. Leva de 1 a 3 minutos. Ao terminar, você recebe um endereço no
formato **`https://taoklyn-site.pages.dev`**.

**Abra esse endereço.** Se o site aparecer, a publicação funcionou.

---

## 4. Ligar o domínio próprio

Faça isto quando tiver o domínio definido. O site funciona sem ele.

### 4.1 Se o domínio ainda não está no Cloudflare

1. No painel do Cloudflare, clique em **Add a site** e informe o domínio.
2. O Cloudflare mostra dois **nameservers**. Copie os dois.
3. Entre no site onde o domínio foi registrado (registro.br, GoDaddy…) e troque
   os nameservers pelos do Cloudflare.
4. A troca leva de minutos a algumas horas para valer em toda a internet.

### 4.2 Apontar o domínio para o site

1. **Workers & Pages** → clique no projeto **taoklyn-site**.
2. Aba **Custom domains** → **Set up a domain**.
3. Digite o domínio (`taoklyn.com.br`) e clique em **Continue**.
4. O Cloudflare cria o registro de DNS sozinho e emite o certificado de
   segurança (o cadeado do navegador). Isso costuma levar poucos minutos.
5. Repita para `www.taoklyn.com.br`, se quiser que os dois funcionem.

> **Não crie o registro CNAME manualmente antes de fazer isso pelo painel.** O
> domínio deixa de resolver e o site passa a mostrar erro 522.

### 4.3 Depois que o domínio estiver no ar

Volte em **Settings → Environment variables** e troque `SITE_URL` para
`https://taoklyn.com.br`. Depois, em **Deployments**, clique em **Retry
deployment** no último envio, para o site ser gerado de novo com o endereço
certo.

---

## 5. Ligar o painel de conteúdo (Pages CMS)

É o passo que permite à clínica editar o site sem programador.

1. Entre em **https://app.pagescms.org**.
2. Clique em **Sign in with GitHub** e entre com a conta que criou a
   organização `taoklyn`.
3. O Pages CMS pede para instalar um aplicativo do GitHub. Autorize.
4. Na tela do GitHub, **escolha a organização `taoklyn`, e não a sua conta
   pessoal**. Instalar na conta pessoal deixa o repositório invisível — é o
   engano mais comum deste passo.
5. Em **Repository access**, marque **Only select repositories** e selecione
   apenas **taoklyn-site**.
6. Confirme. De volta ao Pages CMS, abra o repositório **taoklyn-site**.

O painel abre já mostrando o conteúdo, porque o arquivo `.pages.yml` já está no
repositório.

6. Ainda no Pages CMS, abra **Settings** → **Collaborators** e convide a equipe
   por e-mail. **Sem este passo, o login por e-mail delas não encontra nenhum
   site.**

**Manuais de uso:** a folha de 3 passos para a recepção é o
[`ACESSO-RAPIDO.md`](ACESSO-RAPIDO.md); a referência completa é o
[`CMS.md`](CMS.md).

---

## 6. Medição de acessos (opcional)

1. Entre em **https://analytics.google.com** e crie uma propriedade do tipo
   **GA4** para o site.
2. Copie o **ID de medição**, no formato `G-XXXXXXXXXX`.
3. No Cloudflare: **Workers & Pages** → projeto → **Settings** → **Environment
   variables** → adicione `PUBLIC_GA_ID` com esse valor.
4. Em **Deployments**, clique em **Retry deployment**.

O site já registra estes eventos, sem precisar de configuração extra:

| Evento | Quando dispara |
|---|---|
| `click_whatsapp` | qualquer botão de WhatsApp |
| `click_phone` | clique no telefone |
| `click_maps` | "Abrir no Google Maps" |
| `click_instagram` | link do Instagram |
| `click_service` | abertura de um serviço |
| `click_professional` | abertura de um profissional |
| `click_room_rental` | "Consultar disponibilidade" (locação) |
| `view_post` | abertura de uma publicação |

> **Sobre a LGPD:** ao ativar a medição, o site passa a gravar cookies de
> análise. A Política de Cookies já descreve isso. Se a clínica quiser exibir
> um aviso de cookies, é preciso acrescentá-lo — hoje ele não existe, porque
> sem medição não há cookie nenhum.

---

## 7. Conferência depois de publicar

Abra o endereço do site e confira, nesta ordem:

- [ ] A página inicial carrega, com a marca no topo.
- [ ] O botão **Agendar pelo WhatsApp** abre o WhatsApp com a mensagem escrita.
- [ ] O carrossel de profissionais arrasta com o dedo, no celular.
- [ ] A página de um profissional abre (ex.: `/profissionais/tereza-feitosa`).
- [ ] Os vídeos aparecem em "Conheça nosso espaço" e **só começam ao clicar**.
- [ ] **Abrir no Google Maps** leva ao endereço certo.
- [ ] `https://SEU-ENDERECO/sitemap-index.xml` abre e lista as páginas.
- [ ] `https://SEU-ENDERECO/robots.txt` abre e aponta para o sitemap.
- [ ] Uma página inexistente (`/qualquercoisa`) mostra a página de erro do site,
      e não uma tela do Cloudflare.
- [ ] No celular, nada corta na horizontal.

### Avisar o Google que o site existe

1. Entre em **https://search.google.com/search-console**.
2. Adicione a propriedade com o endereço do site.
3. Confirme a posse (o Cloudflare facilita, se o domínio estiver lá).
4. Em **Sitemaps**, envie `sitemap-index.xml`.

Isso acelera a indexação. Sem isso, o Google acha o site do mesmo jeito, mas
demora mais.

---

## 8. Como o site se atualiza no dia a dia

```
  Recepção edita no Pages CMS
            ↓
  Pages CMS grava no GitHub  (aparece como um commit)
            ↓
  Cloudflare percebe e reconstrói  (1 a 3 minutos)
            ↓
  Site no ar, atualizado
```

Ninguém precisa avisar ninguém, nem rodar comando. **Não existe um botão
"publicar site"**: salvar no painel já é publicar.

Se a alteração não aparecer depois de 3 minutos, veja a seção seguinte.

---

## 9. Quando algo dá errado

### O site não atualizou depois de editar

1. Recarregue com `Ctrl + F5` (força o navegador a buscar de novo).
2. No Cloudflare: **Workers & Pages** → projeto → aba **Deployments**.
   - **Success** → o site está no ar; o problema é cache do seu navegador.
   - **Failed** → clique no envio para ver o registro do erro.
   - **Building** → ainda está processando; espere.

### Um envio falhou (Failed)

Clique no envio e leia as últimas linhas do registro. Os casos comuns:

| Mensagem contém | Causa | Solução |
|---|---|---|
| `Conteudo invalido em src/data/...` | um campo obrigatório ficou vazio | volte ao painel e preencha o campo citado |
| `Cannot find module` | dependência faltando | avise quem cuida do código |
| `Output directory "dist" not found` | configuração errada | corrija **Build output directory** para `dist` |

> O site **no ar continua funcionando** enquanto um envio falha. O Cloudflare só
> troca a versão publicada quando a construção termina bem. Uma falha nunca
> derruba o site.

### O site está no ar mas com conteúdo antigo

Cloudflare → projeto → **Deployments** → veja se o último envio bem-sucedido é o
mais recente. Se não for, clique em **Retry deployment**.

### Voltar o site para uma versão anterior

Cloudflare → **Deployments** → localize um envio antigo que funcionava → menu
**⋯** → **Rollback to this deployment**. O site volta em segundos.

Para desfazer uma alteração de **conteúdo**, o caminho é outro e está no
[`CMS.md`](CMS.md), seção "Desfazer uma alteração".

---

## 10. Manutenção e segurança

### O que nunca deve ir para o repositório

- Senhas, tokens, chaves ou qualquer credencial.
- Dados de pacientes: prontuário, diagnóstico, exame, foto de paciente.
- Arquivos muito grandes (vídeo acima de ~5 MB, por exemplo).

O arquivo `.gitignore` já barra o `.env` e arquivos compactados.

### Quem tem acesso a quê

| Pessoa | Acesso | Onde se controla |
|---|---|---|
| Administrador | tudo: código, configuração, publicação | GitHub e Cloudflare |
| Recepção / conteúdo | só o conteúdo e as imagens | Pages CMS → *Collaborators* |

Ao desligar alguém, remova o acesso **nos dois lugares** onde ele existir.

### Revisão periódica sugerida

| Quando | O quê |
|---|---|
| A cada 3 meses | conferir se telefone, WhatsApp e horários continuam certos |
| A cada 6 meses | rever a lista de profissionais e serviços ativos |
| A cada 6 meses | conferir quem ainda precisa de acesso ao painel |
| Uma vez por ano | rodar `npm install` e `npm run verificar` para atualizar dependências |

### O que ainda está pendente

A lista completa está em [`PENDENCIAS.md`](PENDENCIAS.md). Os itens que
**bloqueiam** uma divulgação ampla do site hoje:

- CRM das duas médicas (exigência do Conselho Federal de Medicina);
- revisão jurídica das políticas de privacidade e de cookies;
- definição do domínio oficial.

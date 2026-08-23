# Publicação do site — manual completo

Leva o site da Tao Klyn do computador até o ar, do zero, com o que aparece em
cada tela.

**Tempo:** 30 a 40 minutos, sem contar a espera do domínio.
**Custo:** R$ 0,00 em hospedagem. GitHub, Cloudflare Pages, Pages CMS e Google
Analytics têm planos gratuitos que atendem um site institucional com folga. O
**único custo é o domínio**, pago ao registrador (Hostinger, registro.br etc.).

> **Sobre os nomes das telas.** Cloudflare, GitHub e Hostinger mudam a interface
> de tempos em tempos. Se um botão não estiver com o nome exato descrito aqui,
> procure o mais parecido no mesmo lugar da tela — o caminho continua o mesmo.

---

## Índice

1. [Como as peças se encaixam](#1-como-as-peças-se-encaixam)
2. [Contas necessárias](#2-contas-necessárias)
3. [O repositório no GitHub](#3-o-repositório-no-github)
4. [Publicar no Cloudflare Pages](#4-publicar-no-cloudflare-pages)
5. [Variáveis: o que são, onde pegar, onde colocar](#5-variáveis-o-que-são-onde-pegar-onde-colocar)
6. [Domínio próprio: comprar na Hostinger](#6-domínio-próprio-comprar-na-hostinger)
7. [Ligar o domínio ao Cloudflare](#7-ligar-o-domínio-ao-cloudflare)
8. [Apontar o domínio para o site](#8-apontar-o-domínio-para-o-site)
9. [Google Analytics](#9-google-analytics)
10. [Ligar o painel de conteúdo](#10-ligar-o-painel-de-conteúdo)
11. [Conferência final](#11-conferência-final)
12. [Quando algo dá errado](#12-quando-algo-dá-errado)
13. [Manutenção](#13-manutenção)

---

## 1. Como as peças se encaixam

Quatro serviços, cada um com um papel:

| Serviço | Papel | Custo |
|---|---|---|
| **GitHub** | guarda o site e todo o histórico | grátis |
| **Cloudflare Pages** | transforma o código em site e entrega ao público | grátis |
| **Pages CMS** | painel onde a clínica edita o conteúdo | grátis |
| **Hostinger** (ou outro) | vende e registra o domínio | pago, anual |

```
  Você / a recepção edita
            ↓
        GitHub  (guarda)
            ↓  avisa que mudou
   Cloudflare Pages  (constrói e publica)
            ↓
     Domínio  →  visitante
```

Nenhum servidor fica ligado. O site é um conjunto de arquivos prontos.

---

## 2. Contas necessárias

### 2.1 GitHub — já existe

A organização **`taoklyn`** e o repositório **`taoklyn-site`** já estão criados,
e o site inteiro já foi enviado.

Se precisar criar outra conta um dia: **github.com** → **Sign up** → e-mail,
senha e nome de usuário → confirmar o código enviado por e-mail.

### 2.2 Cloudflare — criar agora

1. Abra **https://dash.cloudflare.com/sign-up**
2. Informe **e-mail** e **senha**. Use o e-mail da clínica, não o pessoal —
   assim o acesso não se perde quando alguém sair.
3. Confirme o e-mail que chega na caixa de entrada.
4. Ao entrar, o Cloudflare pergunta o que você quer fazer. **Pode fechar ou
   pular**: vamos pelo caminho certo no passo 4.

> **Anote e guarde** o e-mail e a senha do Cloudflare num lugar seguro — um
> gerenciador de senhas, de preferência. É a conta que controla o site no ar.

### 2.3 Hostinger — só se for comprar o domínio lá

Veja o [passo 6](#6-domínio-próprio-comprar-na-hostinger).

---

## 3. O repositório no GitHub

Confira que está tudo lá antes de publicar. Abra:

**https://github.com/taoklyn/taoklyn-site**

Você deve ver, na raiz: `.pages.yml`, `README.md`, `astro.config.mjs`,
`package.json`, e as pastas `docs`, `public`, `referencias`, `scripts`, `src`.

Se faltar algo, é porque um envio não foi feito. No computador do projeto:

```bash
git status
```

```bash
git push origin main
```

---

## 4. Publicar no Cloudflare Pages

### 4.1 Criar o projeto

1. Entre em **https://dash.cloudflare.com**.
2. No menu da esquerda, clique em **Workers & Pages**.
3. Clique em **Create application** (botão azul, canto superior direito).
4. Escolha a aba **Pages**.
5. Clique em **Connect to Git**.

### 4.2 Autorizar o GitHub

6. Clique em **Connect GitHub**. Abre uma janela do GitHub.
7. Entre com a conta que tem acesso à organização `taoklyn`.
8. O GitHub pergunta onde instalar. **Escolha a organização `taoklyn`**, e não
   sua conta pessoal — o repositório é dela.
9. Em **Repository access**, marque **Only select repositories** e escolha
   **taoklyn-site**.
10. Clique em **Install & Authorize**.

> Esse é o mesmo tropeço do Pages CMS: instalar na conta pessoal faz o
> repositório não aparecer na lista seguinte.

### 4.3 Escolher o repositório

11. De volta ao Cloudflare, a lista mostra **taoklyn-site**. Selecione e clique
    em **Begin setup**.

### 4.4 Configurar a construção

Na seção **Set up builds and deployments**, preencha exatamente:

| Campo | O que preencher | Por quê |
|---|---|---|
| **Project name** | `taoklyn-site` | vira o endereço `taoklyn-site.pages.dev` |
| **Production branch** | `main` | é o ramo que vai ao ar |
| **Framework preset** | `Astro` | preenche os dois campos seguintes sozinho |
| **Build command** | `npm run build` | o comando que gera o site |
| **Build output directory** | `dist` | a pasta onde o site pronto aparece |
| **Root directory (advanced)** | *deixe vazio* | o projeto está na raiz |

> **O erro mais comum do processo inteiro está aqui.** Se **Build output
> directory** não for exatamente `dist`, o Cloudflare termina a construção
> dizendo "Success" e publica uma **página em branco** ou erro 404. Confira duas
> vezes antes de seguir.

### 4.5 Primeira variável

Ainda nessa tela, clique em **Environment variables (optional)** para abrir a
seção e depois em **Add variable**:

| Variable name | Value |
|---|---|
| `SITE_URL` | `https://taoklyn-site.pages.dev` |

Por ora é esse endereço mesmo. Quando o domínio próprio existir, você troca —
[passo 8.3](#83-atualizar-a-variável-site_url).

### 4.6 Publicar

12. Clique em **Save and Deploy**.

O Cloudflare mostra o registro em tempo real: baixa o código, roda
`npm install`, roda `npm run build` e publica. **Leva de 1 a 3 minutos.**

Ao terminar aparece **Success!** e o endereço:

```
https://taoklyn-site.pages.dev
```

**Abra esse endereço.** Se o site aparecer, está publicado.

---

## 5. Variáveis: o que são, onde pegar, onde colocar

Variáveis são valores que o site lê na hora de ser construído. Existem duas.

| Variável | Para que serve | Onde pegar o valor | Obrigatória |
|---|---|---|---|
| `SITE_URL` | endereço oficial do site, usado no Google, no sitemap e na prévia do WhatsApp | é o próprio endereço do site | recomendada |
| `PUBLIC_GA_ID` | liga a medição de acessos | Google Analytics ([passo 9](#9-google-analytics)) | opcional |

### 5.1 Onde colocar, depois que o projeto existe

1. **Workers & Pages** → clique no projeto **taoklyn-site**.
2. Aba **Settings**.
3. Seção **Environment variables** (em algumas contas aparece como
   **Variables and Secrets**).
4. Clique em **Add variable**.
5. Preencha **Variable name** e **Value**.
6. Deixe marcado o ambiente **Production**.
7. Clique em **Save**.

### 5.2 Variável nova só vale no próximo envio

Alterar uma variável **não** republica o site sozinho. Depois de salvar:

**Deployments** → no envio mais recente, menu **⋯** → **Retry deployment**.

Sem isso, você troca o valor e nada muda no ar — e parece que a variável não
funcionou.

### 5.3 O que acontece se `SITE_URL` estiver errada

O site continua funcionando, mas:

- o Google pode indexar o endereço errado;
- o mapa do site aponta para o lugar errado;
- ao compartilhar no WhatsApp, a prévia pode não carregar a imagem.

Nada disso quebra a navegação — mas atrapalha quem procura a clínica no Google.

---

## 6. Domínio próprio: comprar na Hostinger

Você pode pular esta parte e usar o endereço `.pages.dev` para sempre. O
domínio próprio serve para credibilidade: `taoklyn.com.br` em vez de
`taoklyn-site.pages.dev`.

### 6.1 Escolher o endereço

| Terminação | Observação |
|---|---|
| `.com.br` | é o padrão para empresa brasileira e passa mais confiança |
| `.com` | internacional, costuma ser mais caro e mais disputado |

> **Cuidado com o preço do primeiro ano.** Registradores costumam anunciar um
> valor baixo na primeira compra e cobrar bem mais na renovação. Antes de
> fechar, procure o **preço de renovação** — é o que você vai pagar todo ano.

### 6.2 Comprar

1. Entre em **https://www.hostinger.com.br** e faça login (ou crie a conta).
2. No topo, procure **Domínios** → **Registro de domínio**.
3. Digite o nome desejado e veja se está livre.
4. Escolha o período. **Marque a proteção de privacidade** (WHOIS privacy) se
   estiver disponível sem custo: ela esconde seu telefone e endereço do registro
   público.
5. Conclua o pagamento.
6. A Hostinger envia um **e-mail de verificação**. É obrigatório confirmar —
   domínio não verificado é suspenso depois de alguns dias.

> **Domínio `.com.br` é registrado no registro.br**, mesmo quando comprado pela
> Hostinger. Alguns exigem CPF ou CNPJ do titular. Use os dados da clínica, não
> os de quem está comprando — assim o domínio pertence à empresa.

---

## 7. Ligar o domínio ao Cloudflare

O domínio foi comprado na Hostinger, mas quem vai administrar o DNS é o
Cloudflare. Isso é feito **uma vez**.

### 7.1 Adicionar o domínio no Cloudflare

1. No painel do Cloudflare, clique em **Add a site** (em algumas contas,
   **Onboard a domain**).
2. Digite o domínio **sem `www` e sem `https://`**:
   ```
   taoklyn.com.br
   ```
3. Clique em **Continue**.
4. Escolha o plano **Free** — role até o fim da lista, é o último. Ele atende
   este site inteiro.
5. O Cloudflare varre os registros existentes e mostra uma lista. Como o site
   ainda não existe nesse domínio, ela vem quase vazia. Clique em **Continue**.

### 7.2 Copiar os nameservers

O Cloudflare mostra **dois endereços**, com esta cara:

```
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```

Os nomes são sorteados e **são diferentes para cada conta** — use os que
aparecerem na sua tela, não estes do exemplo. Deixe essa aba aberta.

### 7.3 Trocar os nameservers na Hostinger

1. Entre em **https://hpanel.hostinger.com**.
2. No topo, clique em **Domínios** → **Portfólio de domínios**
   (*Domain portfolio*).
3. Ao lado do seu domínio, clique em **Gerenciar** (*Manage*).
4. Na página do domínio, procure o bloco **DNS / Nameservers** e clique em
   **Editar** (*Edit*) ou **Alterar** (*Change nameservers*).
5. Escolha a opção de usar **nameservers personalizados** (*Change nameservers*
   / *Use custom nameservers*).
6. Apague o que estiver lá e cole os **dois** endereços copiados do Cloudflare:
   - Nameserver 1: `alice.ns.cloudflare.com`
   - Nameserver 2: `bob.ns.cloudflare.com`
7. Salve.

> **Antes de salvar, desligue o DNSSEC** se ele estiver ativo na Hostinger. Com
> DNSSEC ligado durante a troca, o domínio pode ficar inacessível. Depois de
> tudo funcionando, dá para reativar pelo Cloudflare.

### 7.4 Esperar

Volte ao Cloudflare e clique em **Check nameservers now**.

A troca costuma valer em **poucos minutos**, mas o prazo oficial é de **até 24
horas**. Quando terminar, o Cloudflare envia um e-mail dizendo que o domínio
está **Active**.

Enquanto isso, o site continua acessível pelo endereço `.pages.dev`.

---

## 8. Apontar o domínio para o site

Com o domínio ativo no Cloudflare:

### 8.1 Adicionar o domínio ao projeto

1. **Workers & Pages** → projeto **taoklyn-site**.
2. Aba **Custom domains**.
3. Clique em **Set up a domain**.
4. Digite `taoklyn.com.br` e clique em **Continue**.
5. O Cloudflare mostra o registro de DNS que vai criar. Confirme em
   **Activate domain**.

O certificado de segurança (o cadeado do navegador) é emitido sozinho. Costuma
levar de 1 a 15 minutos, e o status sai de **Initializing** para **Active**.

### 8.2 Repetir para o `www`

Repita os passos com `www.taoklyn.com.br`, para quem digita o endereço com
`www` também chegar ao site.

### 8.3 Atualizar a variável `SITE_URL`

**Este passo é obrigatório e costuma ser esquecido.**

1. Projeto → **Settings** → **Environment variables**.
2. Edite `SITE_URL` e troque para:
   ```
   https://taoklyn.com.br
   ```
3. **Save**.
4. Vá em **Deployments** → menu **⋯** do envio mais recente → **Retry
   deployment**.

Sem isso, o site funciona no domínio novo, mas continua dizendo ao Google que
seu endereço oficial é o `.pages.dev`.

### 8.4 Avisar o Google

1. Entre em **https://search.google.com/search-console**.
2. **Adicionar propriedade** → escolha **Prefixo do URL** → informe
   `https://taoklyn.com.br`.
3. Para confirmar que o site é seu, escolha o método de **registro DNS** — como
   o domínio está no Cloudflare, basta colar o registro TXT que o Google fornece
   em **DNS** → **Records** → **Add record**.
4. Depois de verificado, vá em **Sitemaps** e envie:
   ```
   sitemap-index.xml
   ```

---

## 9. Google Analytics

Opcional. Sem isso, o site **não carrega nenhum script de medição e não grava
nenhum cookie**.

### 9.1 Criar a propriedade

1. Entre em **https://analytics.google.com** com a conta Google da clínica.
2. Se for a primeira vez, clique em **Começar a medir**.
3. **Nome da conta:** `Tao Klyn` → **Próxima**.
4. **Nome da propriedade:** `Site Tao Klyn`.
5. Escolha **fuso horário do Brasil** e **moeda Real** → **Próxima**.
6. Responda o setor (`Saúde`) e o tamanho da empresa → **Criar**.
7. Aceite os termos de uso.

### 9.2 Criar o fluxo de dados e pegar o ID

8. Na tela de plataforma, escolha **Web**.
9. **URL do site:** `https://taoklyn.com.br` — **Nome do fluxo:** `Site`.
10. Clique em **Criar fluxo**.
11. Aparece a tela do fluxo com o **ID de métricas**, no formato:
    ```
    G-XXXXXXXXXX
    ```
12. Copie esse código.

> Para reencontrá-lo depois: **Administrador** (engrenagem, canto inferior
> esquerdo) → **Fluxos de dados** → aba **Web** → clique no fluxo. O ID está na
> primeira linha.

### 9.3 Colocar no site

1. Cloudflare → projeto → **Settings** → **Environment variables** → **Add
   variable**:

   | Variable name | Value |
   |---|---|
   | `PUBLIC_GA_ID` | `G-XXXXXXXXXX` |

2. **Save**, e depois **Deployments** → **⋯** → **Retry deployment**.

### 9.4 O que já vem medido

Sem configurar mais nada, o site registra:

| Evento | Dispara quando alguém |
|---|---|
| `click_whatsapp` | clica em qualquer botão de WhatsApp |
| `click_phone` | clica no telefone |
| `click_maps` | clica em "Abrir no Google Maps" |
| `click_instagram` | clica no Instagram |
| `click_service` | abre um serviço |
| `click_professional` | abre a página de um profissional |
| `click_room_rental` | clica em "Consultar disponibilidade" |
| `view_post` | abre uma publicação |

> **Atenção à LGPD.** Ao ativar a medição, o site passa a gravar cookies de
> análise. A Política de Cookies já descreve isso, mas se a clínica quiser
> exibir um aviso de cookies na tela, ele precisa ser acrescentado — hoje não
> existe, porque sem medição não há cookie nenhum.

---

## 10. Ligar o painel de conteúdo

1. Entre em **https://app.pagescms.org**.
2. **Sign in with GitHub**, com a conta que administra a organização.
3. Clique em **Install GitHub App**.
4. **Escolha a organização `taoklyn`**, e não a conta pessoal.
5. **Only select repositories** → **taoklyn-site** → **Install**.
6. Abra o repositório: o painel aparece montado.
7. **Convide a equipe:** **Settings** → **Collaborators** → informe o e-mail de
   cada pessoa. **Sem este passo, o login por e-mail delas não encontra nenhum
   site.**

O manual da equipe é o [`CMS.md`](CMS.md), e a folha de 3 passos para imprimir é
o [`ACESSO-RAPIDO.md`](ACESSO-RAPIDO.md).

---

## 11. Conferência final

Abra o site e confira:

- [ ] A página inicial carrega, com a marca no topo.
- [ ] O cadeado de segurança aparece na barra do navegador.
- [ ] **Agendar pelo WhatsApp** abre o WhatsApp com a mensagem escrita.
- [ ] O carrossel de profissionais arrasta com o dedo, no celular.
- [ ] A página de um profissional abre.
- [ ] Os vídeos aparecem e **só começam ao clicar**.
- [ ] **Abrir no Google Maps** leva ao endereço certo.
- [ ] `SEU-DOMINIO/sitemap-index.xml` abre e lista as páginas.
- [ ] `SEU-DOMINIO/robots.txt` abre.
- [ ] Um endereço inexistente mostra a página de erro **do site**.
- [ ] No celular, nada corta na horizontal.
- [ ] Digitando o domínio **com e sem `www`**, os dois chegam ao site.

---

## 12. Quando algo dá errado

### O envio falhou (Failed)

Clique no envio e leia as últimas linhas do registro:

| A mensagem contém | Causa | Solução |
|---|---|---|
| `Conteudo invalido em src/data/...` | campo obrigatório vazio no painel | volte ao painel e preencha o campo citado |
| `Output directory "dist" not found` | configuração errada | **Settings → Builds & deployments** → corrija para `dist` |
| `Cannot find module` | dependência faltando | avise quem cuida do código |
| `npm ERR!` no começo | falha ao baixar dependências | **Retry deployment**; costuma ser instabilidade momentânea |

> **Uma construção que falha não derruba o site.** O Cloudflare só troca a
> versão publicada quando termina bem. O que está no ar continua no ar.

### O site abre em branco

Quase sempre é o **Build output directory** errado. Confira em **Settings →
Builds & deployments** se está `dist`.

### O domínio não abre / erro 522

- Confirme no Cloudflare que o domínio está **Active** (não *Pending*).
- Confirme que os dois nameservers na Hostinger estão exatamente como o
  Cloudflare mandou, sem espaço sobrando.
- Se você criou um registro CNAME à mão antes de usar **Set up a domain**,
  apague-o e refaça pelo painel do Pages.

### Editei no painel e o site não mudou

1. Espere de 1 a 3 minutos.
2. Recarregue com `Ctrl + F5`.
3. Cloudflare → **Deployments**: veja se o último envio foi **Success**.

### Voltar o site para uma versão anterior

**Deployments** → localize um envio antigo que funcionava → menu **⋯** →
**Rollback to this deployment**. Volta em segundos.

---

## 13. Manutenção

### Contas e senhas

| Serviço | Quem deve ter | Guardar onde |
|---|---|---|
| GitHub | administrador | gerenciador de senhas, com 2FA ativo |
| Cloudflare | administrador | gerenciador de senhas, com 2FA ativo |
| Hostinger | administrador | gerenciador de senhas |
| Pages CMS | equipe de conteúdo | não tem senha — é por e-mail |

**Ative a verificação em duas etapas no GitHub e no Cloudflare.** São as duas
contas que, perdidas, custam mais caro.

### O domínio precisa ser renovado

Domínio **expira**. Se vencer, o site sai do ar e o endereço pode ser comprado
por outra pessoa.

- Ative a **renovação automática** na Hostinger.
- Confirme que o cartão cadastrado está válido.
- Confirme que o e-mail de aviso é um que alguém lê.

### Calendário sugerido

| Quando | O quê |
|---|---|
| a cada 3 meses | conferir telefone, WhatsApp e horários no site |
| a cada 6 meses | rever profissionais e serviços ativos; rever quem tem acesso |
| 1 mês antes do vencimento | confirmar a renovação do domínio |
| 1 vez por ano | rodar `npm install` e `npm run verificar` para atualizar dependências |

### O que nunca vai para o repositório

- senha, token ou qualquer credencial;
- dado de paciente: prontuário, diagnóstico, exame, foto;
- arquivo pesado (vídeo acima de ~5 MB).

O `.gitignore` já barra o `.env` e arquivos compactados.

---

## Resumo de tudo em uma tela

| # | Passo | Onde | Resultado |
|---|---|---|---|
| 1 | Criar conta | dash.cloudflare.com | acesso ao painel |
| 2 | Conectar o repositório | Workers & Pages → Create application → Pages | projeto criado |
| 3 | Configurar build | `npm run build` / `dist` | site gerado |
| 4 | Definir `SITE_URL` | Settings → Environment variables | endereço correto no Google |
| 5 | Comprar domínio | Hostinger | endereço próprio |
| 6 | Trocar nameservers | hPanel → Domínios → Gerenciar → DNS/Nameservers | Cloudflare no comando |
| 7 | Set up a domain | Pages → Custom domains | domínio no ar com cadeado |
| 8 | Atualizar `SITE_URL` + Retry deployment | Cloudflare | endereço oficial correto |
| 9 | (opcional) Analytics | analytics.google.com | medição de acessos |
| 10 | Ligar o painel e convidar a equipe | app.pagescms.org | clínica edita sozinha |

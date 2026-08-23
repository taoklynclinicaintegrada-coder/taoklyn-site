# Manual do painel — site da Tao Klyn

Este guia é para quem cuida do conteúdo do site. **Não é preciso saber
programar.** Se você usa Instagram e e-mail, consegue usar isto.

O painel se chama **Pages CMS**. É uma página na internet onde você escreve,
troca fotos e publica. **Ao salvar, o site se atualiza sozinho em poucos
minutos** — não existe um botão "publicar site" separado.

> **Endereço do painel:** https://app.pagescms.org
> Guarde nos favoritos. É sempre o mesmo.

> ### Só quer entrar e escrever?
> A folha de 3 passos é o [`ACESSO-RAPIDO.md`](ACESSO-RAPIDO.md) — é o que se
> imprime e cola na recepção. Este manual aqui é a referência completa, para
> consultar quando surgir dúvida.

---

## Índice

1. [Como entrar](#1-como-entrar)
2. [Senha e segurança da conta](#2-senha-e-segurança-da-conta)
3. [Primeira configuração (só o administrador)](#3-primeira-configuração-só-o-administrador)
4. [Como o painel é organizado](#4-como-o-painel-é-organizado)
5. [Publicações: escrever, publicar e tirar do ar](#5-publicações-escrever-publicar-e-tirar-do-ar)
6. [Profissionais](#6-profissionais)
7. [Serviços](#7-serviços)
8. [Galeria, Espaços e Vídeos](#8-galeria-espaços-e-vídeos)
9. [Configurações do site](#9-configurações-do-site)
10. [Trocar uma imagem](#10-trocar-uma-imagem)
11. [Desfazer uma alteração](#11-desfazer-uma-alteração)
12. [Dar e tirar acesso de outras pessoas](#12-dar-e-tirar-acesso-de-outras-pessoas)
13. [Quando algo não funciona](#13-quando-algo-não-funciona)
14. [O que nunca publicar](#14-o-que-nunca-publicar)

---

## 1. Como entrar

Abra **https://app.pagescms.org**. A tela de entrada oferece **duas formas**:

### Forma A — com conta do GitHub (administrador)

Para quem administra o site e precisa mexer na configuração.

1. Clique em **Sign in with GitHub**.
2. Entre com o usuário e a senha do GitHub.
3. Se for a primeira vez, autorize o aplicativo.
4. Na lista de repositórios, escolha **taoklyn / taoklyn-site**.

### Forma B — com e-mail (recepção e equipe de conteúdo)

**Não precisa de conta no GitHub, não precisa instalar nada.**

1. Digite seu e-mail no campo **Email**.
2. Clique em **Continue with email**.
3. O Pages CMS envia o acesso para esse endereço. Abra sua caixa de entrada e
   siga o que chegou.
4. Pronto: o painel abre no site da clínica.

> Só funciona com um e-mail que já tenha sido **convidado** — veja a
> [seção 12](#12-dar-e-tirar-acesso-de-outras-pessoas). Um e-mail não convidado
> entra, mas não enxerga nenhum site.
>
> Se o e-mail não chegar em alguns minutos, **olhe no spam/lixo eletrônico**.

### "No repositories yet" — entrei e não aparece nada

Esta é a confusão mais comum na primeira vez:

> *No repositories yet. You need an invitation to a repository before you can
> collaborate. Ask a repository owner or organization admin to invite you.*

Essa mensagem significa que **você entrou pela porta do colaborador** (Forma B,
por e-mail) com um endereço que ninguém convidou.

**Se você é o administrador**, saia e entre de novo pelo caminho certo:

1. Clique no avatar redondo, canto superior direito → **Sign out**.
2. Clique em **Sign in with GitHub** — o botão de cima, e não o campo de e-mail.
3. Siga a [primeira configuração](#3-primeira-configuração-só-o-administrador).

**Se você é da equipe de conteúdo**, quer dizer que seu e-mail ainda não foi
convidado. Peça a quem administra para convidá-lo em
**Settings → Collaborators**, usando exatamente o endereço com que você tentou
entrar.

**Se você entrou pelo GitHub e mesmo assim não aparece nada**, o aplicativo foi
instalado no lugar errado ou ainda não foi aprovado:

| Causa provável | Como confirmar | Solução |
|---|---|---|
| Instalado na conta pessoal, não na organização | abra **github.com/settings/installations** e veja onde o Pages CMS aparece | clique em **Configure** e acrescente a organização `taoklyn` |
| Você não é administrador da organização | ao instalar, o GitHub avisa que precisa de aprovação | um administrador da organização precisa aprovar o pedido |
| O repositório não foi marcado | **github.com/settings/installations** → Pages CMS → **Configure** | em **Repository access**, marque **taoklyn-site** |

---

## 2. Senha e segurança da conta

### No painel não existe senha

Esta é a parte que costuma confundir: **o Pages CMS não tem senha própria.** Não
há senha para criar, lembrar, trocar nem perder.

- Quem entra **por e-mail** recebe o acesso na caixa de entrada, toda vez.
  A segurança do painel é a segurança do seu e-mail.
- Quem entra **pelo GitHub** usa a senha do GitHub.

Por isso, **proteger o e-mail é proteger o site**. Quem tiver acesso à sua caixa
de entrada tem acesso ao painel.

### Trocar a senha do GitHub (administrador)

1. Entre em **https://github.com** com sua conta.
2. Clique na sua foto, canto superior direito → **Settings**.
3. No menu lateral, **Password and authentication**.
4. Em **Change password**, informe a senha atual e a nova, duas vezes.
5. Clique em **Update password**.

### Ativar a verificação em duas etapas (fortemente recomendado)

Na mesma tela **Password and authentication**, seção **Two-factor
authentication** → **Enable two-factor authentication**. O GitHub guia o resto,
por aplicativo de autenticação ou SMS.

Isso impede que alguém entre no repositório do site mesmo tendo descoberto a
senha.

> **Guarde os códigos de recuperação** que o GitHub mostra ao ativar. Sem eles,
> perder o celular significa perder o acesso.

### Esqueci a senha do GitHub

Na tela de entrada do GitHub, clique em **Forgot password?** e informe o e-mail
da conta. O link de redefinição chega por e-mail.

### Se alguém sair da clínica

Remova o acesso da pessoa no painel
([seção 12](#12-dar-e-tirar-acesso-de-outras-pessoas)). Não é preciso trocar
senha de ninguém — cada pessoa entra com o próprio e-mail.

---

## 3. Primeira configuração (só o administrador)

Feita **uma vez só**, por quem é dono da organização `taoklyn` no GitHub.

> **O detalhe onde todo mundo trava:** `taoklyn` é uma **organização**, não uma
> conta pessoal. O aplicativo precisa ser instalado **na organização**. Instalado
> na conta pessoal, o repositório continua invisível e o painel mostra a mesma
> tela vazia de antes.

1. Entre em **https://app.pagescms.org** e clique em **Sign in with GitHub** —
   o botão de cima, e **não** o campo de e-mail.
2. Entre com a conta do GitHub que criou a organização.
3. Aparece a tela **Install Pages CMS**, com a lista de onde instalar:

   ```
   ○ Sua conta pessoal
   ○ taoklyn            ← escolha esta
   ```

4. Em **Repository access**, marque **Only select repositories** e selecione
   apenas **taoklyn-site**.
5. Clique em **Install** (ou **Install & Authorize**). O navegador volta ao
   Pages CMS com o repositório na lista.
6. **Convide a equipe:** dentro do repositório, **Settings** →
   **Collaborators** → informe o e-mail de cada pessoa. Sem isso, o login por
   e-mail delas não encontra nenhum site.

### Se o passo 3 não sair como esperado

| O que aconteceu | Significa | Solução |
|---|---|---|
| `taoklyn` não aparece na lista | você entrou com outra conta do GitHub | saia do GitHub e entre com a conta que criou a organização |
| Aparece **Request installation** em vez de **Install** | você não é owner da organização | um owner precisa aprovar em `github.com/organizations/taoklyn/settings/installations` |
| Instalou e o repositório não aparece | foi instalado na conta pessoal | `github.com/settings/installations` → Pages CMS → **Configure** → acrescente a organização |

O painel já abre montado, porque o arquivo de configuração (`.pages.yml`) está
no repositório. **Ele não precisa ser alterado no dia a dia.**

Para colocar o site no ar pela primeira vez, veja [`DEPLOY.md`](DEPLOY.md).

---

## 4. Como o painel é organizado

No menu da esquerda:

**GERAL**

| Item | O que tem dentro |
|---|---|
| **Configurações do site** | telefone, WhatsApp, e-mail, endereço, horários, missão, textos institucionais, redes sociais, locação de salas |

**CONTEÚDO**

| Item | O que tem dentro |
|---|---|
| **Profissionais** | quem atende na clínica — uma ficha por pessoa |
| **Serviços** | o que a clínica oferece — uma ficha por serviço |
| **Publicações** | textos e avisos do blog |
| **Galeria** | fotos da clínica |
| **Vídeos** | vídeos institucionais e o tour pela clínica |
| **Espaços** | salas e ambientes |
| **Páginas de texto** | Política de Privacidade e Política de Cookies |

Há ainda **Media**, onde ficam todas as imagens já enviadas.

### Dois tipos de tela

- **Ficha por ficha** (Profissionais, Serviços, Publicações, Páginas): há uma
  lista, e você clica em um item para editar. O botão **Add entry** cria um novo.
- **Lista única** (Galeria, Vídeos, Espaços): tudo numa tela só. O botão **Add
  item** acrescenta uma linha, e você **arrasta** para mudar a ordem — a ordem
  da lista é a ordem que aparece no site.

### Botões que aparecem em todas as telas

| Botão | O que faz |
|---|---|
| **Save** | grava e publica. É o único que importa |
| **Add entry / Add item** | cria conteúdo novo |
| **⋯** (três pontos) | opções extras, incluindo apagar |

---

## 5. Publicações: escrever, publicar e tirar do ar

É a parte mais usada do painel. Leia com calma uma vez; depois vira rotina.

### 5.1 Escrever uma publicação nova

1. Menu **Publicações** → botão **Add entry**.
2. Preencha os campos:

| Campo | O que escrever |
|---|---|
| **Título** | o nome do texto. Aparece grande na página e no Google |
| **Resumo** | uma ou duas frases. Aparece na lista de conteúdos e no Google |
| **Imagem de capa** | opcional. Fica melhor em formato deitado (paisagem) |
| **Categoria** | ex.: `Avisos`, `Saúde`, `Bem-estar`. Textos com a mesma categoria ficam agrupados |
| **Autor** | escolha um profissional já cadastrado. Pode deixar vazio |
| **Data de publicação** | a data que aparece para o leitor |
| **Data da última atualização** | preencha só se revisar o texto depois |
| **Destacar** | marque para dar prioridade ao texto |
| **Publicado no site** | **deixe DESMARCADO enquanto escreve** |
| **Texto** | o conteúdo em si |

3. Clique em **Save**.

### 5.2 Escrever o texto

O campo **Texto** funciona como um editor comum. A barra superior tem:

- **negrito** e *itálico*;
- títulos internos (para dividir o texto em partes);
- listas com marcador e listas numeradas;
- link (selecione a palavra e clique no ícone de corrente);
- imagem no meio do texto;
- citação.

**Estrutura que costuma funcionar bem:**

1. Um parágrafo curto dizendo do que se trata.
2. Dois a quatro títulos internos, dividindo o assunto.
3. Um fecho convidando a falar com a clínica.

Evite parágrafos com mais de cinco linhas — no celular, viram um bloco cansativo.

### 5.3 Salvar como rascunho

É simplesmente **não marcar "Publicado no site"**.

Com a opção desmarcada, o texto:

- não aparece no blog do site;
- não aparece no Google;
- não entra no mapa do site;
- fica guardado, visível só para quem tem acesso ao painel.

É assim que se prepara um texto com calma, ou se deixa algo pronto para publicar
numa data específica.

> Existe uma publicação chamada **Modelo de publicação**, já salva como
> rascunho. Use como referência — ela nunca aparece no site.

### 5.4 Publicar

Abra a publicação → marque **Publicado no site** → **Save**.

Em 1 a 3 minutos o texto está no ar, em `/blog`.

### 5.5 Editar algo já publicado

Menu **Publicações** → clique no título → altere → **Save**.

Se a mudança foi grande, vale preencher **Data da última atualização**: o site
passa a mostrar "atualizado em…" para o leitor.

### 5.6 Tirar do ar sem apagar

Abra a publicação → **desmarque "Publicado no site"** → **Save**.

O texto sai do site na hora e continua guardado. Para trazer de volta, marque de
novo. **Prefira sempre isso a apagar.**

### 5.7 Apagar de verdade

Abra a publicação → menu **⋯** → **Delete**.

Só faça isso se tiver certeza. O endereço do texto deixa de existir, e quem
tiver o link salvo ou compartilhado passa a ver a página de erro.

---

## 6. Profissionais

### Cadastrar alguém novo

Menu **Profissionais** → **Add entry**:

| Campo | Observação |
|---|---|
| **Nome do profissional** | obrigatório. É o nome que aparece no site |
| **Profissão** | obrigatório. Ex.: `Fisioterapeuta`, `Psicóloga` |
| **Conselho** | ex.: `CRM`, `CRP`, `CREFITO`. Vazio se não houver |
| **Número do registro** | ex.: `15/1565`. **Nunca invente** |
| **Foto** | veja [Trocar uma imagem](#10-trocar-uma-imagem). Quadrada fica melhor |
| **Apresentação curta** | uma ou duas frases, para o cartão da lista |
| **Áreas de atuação** | clique em **Add item** para cada uma. Viram etiquetas |
| **Serviços que atende** | escolha da lista de serviços já cadastrados |
| **Ordem de exibição** | número menor aparece primeiro |
| **Mostrar na página inicial** | dá prioridade no carrossel da home |
| **Mostrar no site** | deixe marcado |
| **Texto da página** | a biografia completa |

Clique em **Save**. A página da pessoa passa a existir sozinha, em
`/profissionais/nome-da-pessoa`.

### Tirar alguém do site sem apagar

Abra a ficha → **desmarque "Mostrar no site"** → **Save**. A pessoa some do
site, do carrossel e do mapa do site, mas a ficha continua guardada.

### Sobre o endereço da página

O endereço vem do **nome do arquivo**, definido quando a ficha é criada, e
**não muda** se você corrigir o nome exibido depois. Isso é proposital: endereço
que já circulou no Instagram ou no WhatsApp não pode deixar de funcionar.

Se o endereço estiver realmente errado, fale com quem cuida do código — é uma
alteração que exige cuidado com redirecionamento.

---

## 7. Serviços

Funciona como Profissionais.

| Campo | Observação |
|---|---|
| **Nome do serviço** e **Resumo** | é o que aparece no cartão |
| **Imagem** | opcional |
| **Ícone** | escolha o desenho do cartão |
| **Quem atende** | escolha os profissionais |
| **Mensagem que já vem escrita no WhatsApp** | o texto pronto ao clicar em "Agendar" nessa página |
| **Ordem de exibição** | menor aparece primeiro |
| **Mostrar no site** | desmarque para esconder sem apagar |

> **A relação com profissionais pode ser preenchida dos dois lados.** Ligar a
> Tereza ao Pilates pela ficha dela ou pela ficha do Pilates dá no mesmo — o
> site junta as duas pontas. Não é preciso preencher duas vezes.

---

## 8. Galeria, Espaços e Vídeos

As três são **listas**: tudo numa tela só, e a ordem da lista é a ordem no site.

### Galeria

1. Menu **Galeria** → **Add item**.
2. Envie a **Imagem**.
3. Preencha a **Descrição da imagem (acessibilidade)** — **obrigatória**.
   Descreva o que se vê: *"Recepção da clínica, com sofá e plantas"*. Esse texto
   é lido em voz alta para pessoas cegas e aparece se a imagem não carregar.
4. Escolha a **Categoria** (Recepção, Consultórios, Pilates…). As fotos ficam
   agrupadas por ela.
5. **Save**.

**Para reordenar**, arraste os itens pela alça lateral.
**Para esconder uma foto**, desmarque "Mostrar no site" naquele item.

### Espaços

Cada item é uma sala ou ambiente. Marque **Disponível para locação** para
aparecer o selo correspondente.

### Vídeos

Cada item é um vídeo. Há **duas formas** de colocá-lo no site:

**Vídeo pequeno (até uns 5 MB)** — envie o arquivo em **Arquivo de vídeo**.

**Vídeo grande** — publique primeiro no YouTube e cole o link em **Endereço do
vídeo (YouTube ou similar)**. Arquivo grande deixa o site pesado e pode estourar
o limite da hospedagem.

Preencha também:

- **Categoria** — decide **onde** o vídeo aparece:
  - *Conheça a clínica* → seção "Conheça nosso espaço"
  - *Como chegar* → botão "Assistir como chegar", na Localização e no Contato
  - *Institucional* → guardado para uso futuro
- **Imagem de capa** — o que aparece antes de apertar play.
- **Descrição do vídeo (acessibilidade)** — uma frase dizendo o que o vídeo
  mostra.

**Dica de título:** escrever `Conheça nossa clínica — Parte 1` faz o site
mostrar o selo "PARTE 1" sobre a capa e o título limpo embaixo. A duração
("0:13") aparece sozinha, lida do próprio arquivo.

> Nenhum vídeo começa sozinho e nenhum é baixado antes de a pessoa clicar. Quem
> abre a página paga só o peso da capa.

**O vídeo "Como chegar à Tao Klyn" está cadastrado e vazio de propósito:** o
arquivo original tem 24 MB, grande demais. Assim que ele estiver no YouTube,
cole o endereço nesse item e o botão aparece sozinho no site.

---

## 9. Configurações do site

Menu **Configurações do site**. O que muda aqui muda no site inteiro de uma vez.

### Trocar o telefone

**Contato → Telefone fixo**. Escreva com DDD: `(82) 3221-6064` → **Save**.

### Trocar o WhatsApp

**Contato → WhatsApp**. Escreva com DDD: `(82) 99131-1477` → **Save**. Todos os
botões do site passam a apontar para o número novo.

### Mudar a mensagem que já vem escrita no WhatsApp

**Contato → Mensagem que já vem escrita no WhatsApp**. É o texto que aparece
pronto quando alguém clica em "Agendar". Cada serviço também tem a sua, na ficha
do serviço.

### Publicar o horário de funcionamento

1. **Horário de funcionamento → Mostrar o horário no site**: marque.
2. Em **Faixas de horário**, **Add item**:
   - **Dias**: `Segunda a sexta`
   - **Horário**: `8h às 18h`
3. Repita para sábado, se houver. **Save**.

> Enquanto "Mostrar o horário no site" estiver **desmarcado**, o site pede que a
> pessoa confirme pelo WhatsApp — o que é melhor do que publicar horário errado.

### Colocar o link oficial do Google Maps

1. Abra o Google Maps, procure a clínica, clique em **Compartilhar** e copie o
   link.
2. Cole em **Endereço → Link oficial do Google Maps** → **Save**.

Enquanto estiver vazio, o botão "Abrir no Google Maps" faz uma busca pelo
endereço — funciona, mas o link oficial é melhor.

### Textos institucionais

**Frase principal da página inicial**, **Texto de apresentação** e **Missão**
são os textos grandes da home. Mudanças aqui aparecem em várias páginas.

---

## 10. Trocar uma imagem

Em qualquer campo de imagem:

1. Clique no campo (ou em **Select/Upload**).
2. Escolha **Upload** e selecione o arquivo do computador ou do celular.
3. Espere o envio terminar e confirme.
4. Clique em **Save**.

A imagem entra no site já otimizada, em vários tamanhos, automaticamente. Você
não precisa redimensionar nada antes.

**Dicas:**

| Onde | Formato que funciona melhor |
|---|---|
| Foto de profissional | **quadrada**, rosto centralizado |
| Capa de publicação | **deitada** (paisagem) |
| Galeria | qualquer uma; o site recorta com bom senso |
| Capa de vídeo | **em pé** (vertical), igual ao vídeo |

Evite arquivos acima de 5 MB: o envio fica lento sem ganho de qualidade visível.

---

## 11. Desfazer uma alteração

Todo salvamento fica registrado, com data, autor e o que mudou.

### Jeito simples

Reabra o item no painel e digite o texto anterior. Para a maioria dos casos,
resolve.

### Jeito completo (histórico)

1. Abra **https://github.com/taoklyn/taoklyn-site/commits/main**
2. Ache a alteração pela data e pela descrição
   (ex.: `content: atualiza pilates.md`).
3. Clique nela: o vermelho é o que saiu, o verde é o que entrou.
4. Para reverter, clique em **Revert** e confirme.

Em poucos minutos o site volta ao estado anterior.

> **Nada se perde.** Mesmo conteúdo apagado continua no histórico e pode ser
> recuperado.

---

## 12. Dar e tirar acesso de outras pessoas

### Convidar

1. Abra o repositório no Pages CMS.
2. Vá em **Settings** → **Collaborators**.
3. Informe o e-mail da pessoa e envie o convite.
4. Ela recebe o e-mail e passa a entrar em app.pagescms.org com o próprio
   endereço, sem precisar de conta no GitHub.

### O que a pessoa convidada pode e não pode

| Pode | Não pode |
|---|---|
| escrever, editar e publicar conteúdo | alterar a configuração do painel |
| enviar e trocar imagens e vídeos | convidar ou remover outras pessoas |
| desfazer o próprio trabalho | mexer em qualquer parte técnica |

### Remover

**Settings → Collaborators** → remova a pessoa da lista. O acesso acaba na hora.

> **Faça o primeiro convite para um e-mail seu**, para conhecer o fluxo antes de
> repassá-lo à recepção.

---

## 13. Quando algo não funciona

| Situação | O que fazer |
|---|---|
| **Salvei e o site não mudou** | espere de 1 a 3 minutos e recarregue com `Ctrl + F5` |
| **Continua sem mudar depois de 5 minutos** | pode ter havido erro na publicação; peça a quem administra para olhar em *Cloudflare → Deployments* |
| **O e-mail de acesso não chegou** | procure no spam; confirme que o endereço foi convidado |
| **"No repositories yet"** | veja ["No repositories yet"](#no-repositories-yet--entrei-e-não-aparece-nada), na seção 1 |
| **"Save" está apagado / não clica** | algum campo obrigatório está vazio. Procure a marcação em vermelho |
| **A imagem não sobe** | arquivo grande demais ou formato incomum. Use JPG, PNG ou WEBP com menos de 5 MB |
| **Apaguei sem querer** | veja [Desfazer uma alteração](#11-desfazer-uma-alteração) — nada se perde |

---

## 14. O que nunca publicar

Este site é **institucional**. Ele não tem área de paciente, cadastro nem
prontuário — e não deve receber conteúdo clínico de ninguém.

**Nunca publique:**

- nome, foto, história ou qualquer dado de paciente, mesmo com boa intenção e
  mesmo que a pessoa autorize de viva voz;
- diagnóstico, exame, medicamento ou orientação clínica individual;
- promessa de resultado ("cura", "elimina a dor", "garante");
- depoimento de paciente, antes e depois, ou número de casos atendidos;
- preço, convênio ou promoção sem confirmar com a direção;
- registro profissional que você não tenha visto — CRM, CRP e CREFITO errados
  são problema perante o conselho de classe.

**Na dúvida, deixe o campo vazio e pergunte.** O site foi construído para
funcionar bem com informação faltando: seções sem conteúdo simplesmente não
aparecem, em vez de mostrar algo errado.

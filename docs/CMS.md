# Como atualizar o site da Tao Klyn

Este guia é para quem cuida do conteúdo do site — **não é preciso saber
programar**. Se você consegue usar o Instagram e o e-mail, consegue usar isto.

O sistema chama-se **Pages CMS**. Ele funciona como um painel onde você escreve,
troca fotos e publica. Ao salvar, o site se atualiza sozinho em poucos minutos.

---

## Índice

1. [Como entrar no painel](#1-como-entrar-no-painel)
2. [Primeira configuração (uma vez só)](#2-primeira-configuração-uma-vez-só)
3. [O que existe no painel](#3-o-que-existe-no-painel)
4. [Profissionais](#4-profissionais)
5. [Serviços](#5-serviços)
6. [Publicações (blog)](#6-publicações-blog)
7. [Galeria e Espaços](#7-galeria-e-espaços)
8. [Configurações do site (telefone, WhatsApp, horários…)](#8-configurações-do-site)
9. [Trocar uma imagem](#9-trocar-uma-imagem)
10. [Desfazer uma alteração](#10-desfazer-uma-alteração)
11. [Convidar outra pessoa para editar](#11-convidar-outra-pessoa-para-editar)
12. [Perguntas frequentes](#12-perguntas-frequentes)

---

## 1. Como entrar no painel

1. Abra **https://pagescms.org**
2. Clique em **Sign in with GitHub** (entrar com GitHub).
3. Entre com a conta do GitHub que tem acesso ao repositório da clínica.
4. Na lista de repositórios, escolha **taoklyn/taoklyn-site**.

Pronto. O painel abre já mostrando o conteúdo do site.

> Guarde esse endereço nos favoritos. É sempre o mesmo.

---

## 2. Primeira configuração (uma vez só)

Feita apenas uma vez, por quem administra a conta do GitHub da clínica.

1. Entre em **https://pagescms.org** com a conta do GitHub.
2. O Pages CMS vai pedir para instalar um aplicativo do GitHub. Autorize.
3. Na tela do GitHub, escolha a organização **taoklyn**.
4. Em "Repository access", escolha **Only select repositories** e marque
   **taoklyn-site**. Isso limita o acesso apenas a este site.
5. Confirme. Volte ao Pages CMS e escolha o repositório.

O Pages CMS lê um arquivo chamado `.pages.yml`, que já está pronto no
repositório — é ele que define os campos que você vê no painel.

---

## 3. O que existe no painel

No menu da esquerda aparecem duas áreas:

**GERAL**
- **Configurações do site** — telefone, WhatsApp, e-mail, endereço, horários,
  textos institucionais, missão, redes sociais, locação de salas.

**CONTEÚDO**
- **Profissionais** — quem atende na clínica.
- **Serviços** — o que a clínica oferece.
- **Publicações** — textos e avisos do blog.
- **Galeria** — fotos da clínica.
- **Espaços** — salas e ambientes.
- **Páginas de texto** — Política de Privacidade e Política de Cookies.

Também há **Media**, onde ficam todas as imagens enviadas.

---

## 4. Profissionais

### Cadastrar um profissional novo

1. Menu **Profissionais** → botão **Add entry** (adicionar).
2. Preencha:
   - **Nome do profissional** (obrigatório)
   - **Profissão** (obrigatório) — ex.: Fisioterapeuta
   - **Conselho** e **Número do registro** — ex.: CREFITO e 12345-F.
     *Se a pessoa não tiver registro, deixe vazio. Nunca invente.*
   - **Foto** — veja [Trocar uma imagem](#9-trocar-uma-imagem)
   - **Apresentação curta** — uma ou duas frases
   - **Áreas de atuação** — clique em "Add item" para cada uma
   - **Serviços que atende** — escolha da lista de serviços já cadastrados
   - **Ordem de exibição** — menor número aparece primeiro
   - **Mostrar na página inicial** — marque para destacar
   - **Mostrar no site** — deixe marcado
   - **Texto da página** — biografia completa, com formatação
3. Clique em **Save**.

Em poucos minutos a página do profissional existe sozinha, no endereço
`taoklyn.com.br/profissionais/nome-da-pessoa`.

### Alterar um profissional

Clique no nome na lista, altere o que precisar e clique em **Save**.

### Tirar um profissional do site (sem apagar)

Abra o cadastro e **desmarque "Mostrar no site"** → **Save**.

A pessoa some do site imediatamente, mas o cadastro continua guardado. Para
trazer de volta, basta marcar de novo. **Prefira sempre isso a apagar.**

### Apagar de verdade

Só faça isso se tiver certeza. Abra o cadastro → menu **⋯** → **Delete**.
A página do profissional deixa de existir e o endereço passa a dar erro para
quem tiver o link salvo.

---

## 5. Serviços

Funciona igual a Profissionais.

- **Nome do serviço** e **Resumo** são o que aparece no cartão da lista.
- **Ícone** — escolha o desenho que aparece no cartão.
- **Quem atende** — escolha os profissionais. *Você pode preencher a relação
  por aqui ou pela ficha do profissional: o site junta as duas.*
- **Mensagem que já vem escrita no WhatsApp** — é o texto que aparece pronto
  quando alguém clica em "Agendar" nesta página.
- **Mostrar no site** — desmarque para esconder sem apagar.

---

## 6. Publicações (blog)

### Escrever uma publicação

1. Menu **Publicações** → **Add entry**.
2. Preencha **Título**, **Resumo**, **Categoria** e **Data de publicação**.
3. Escreva o texto no campo **Texto**, com negrito, listas e subtítulos.
4. **Deixe "Publicado no site" DESMARCADO** enquanto estiver escrevendo.
5. **Save**.

### Salvar como rascunho

É o passo 4 acima. Com "Publicado no site" desmarcado, o texto:

- não aparece no blog;
- não aparece no Google;
- não entra no mapa do site.

Fica guardado, visível só para quem tem acesso ao painel.

### Publicar

Abra a publicação → marque **Publicado no site** → **Save**.

### Despublicar

Desmarque **Publicado no site** → **Save**. O texto sai do ar e continua salvo.

> Existe uma publicação chamada **Modelo de publicação**, salva como rascunho.
> Use-a como referência — ela nunca aparece no site.

---

## 7. Galeria e Espaços

Estas duas são **listas**: tudo fica numa tela só.

### Galeria

1. Menu **Galeria**.
2. Clique em **Add item**.
3. Envie a **Imagem**.
4. Preencha a **Descrição da imagem (acessibilidade)** — obrigatória. Descreva
   o que aparece na foto: "Recepção da clínica, com sofá e plantas". Isso é
   lido por pessoas cegas e aparece se a imagem não carregar.
5. Escolha a **Categoria** (Recepção, Consultórios, Pilates…).
6. **Save**.

**Para reordenar**, arraste os itens pela alça na lateral. A ordem da lista é a
ordem no site.

**Para esconder uma foto**, desmarque "Mostrar no site" naquele item.

### Espaços

Mesma lógica. Cada item é uma sala ou ambiente. Marque **Disponível para
locação** para que apareça o selo correspondente.

---

## 8. Configurações do site

Menu **Configurações do site**. Aqui ficam os dados que aparecem no site
inteiro. Alterar aqui muda em todos os lugares de uma vez.

### Trocar o telefone

Campo **Contato → Telefone fixo**. Escreva com DDD: `(82) 3221-6064` → **Save**.

### Trocar o WhatsApp

Campo **Contato → WhatsApp**. Escreva com DDD: `(82) 99131-1477` → **Save**.
Todos os botões do site passam a apontar para o número novo.

### Mudar a mensagem que já vem escrita no WhatsApp

Campo **Contato → Mensagem que já vem escrita no WhatsApp**.
Cada serviço também tem a sua, na ficha do serviço.

### Publicar o horário de funcionamento

1. **Horário de funcionamento → Mostrar o horário no site**: marque.
2. Em **Faixas de horário**, clique em **Add item** e preencha:
   - **Dias**: `Segunda a sexta`
   - **Horário**: `8h às 18h`
3. Repita para sábado, se houver.
4. **Save**.

> Enquanto "Mostrar o horário no site" estiver **desmarcado**, o site diz para
> a pessoa confirmar o horário pelo WhatsApp — o que é melhor do que publicar
> um horário errado.

### Colocar o link oficial do Google Maps

1. Abra o Google Maps, procure a clínica, clique em **Compartilhar** e copie o
   link.
2. Cole em **Endereço → Link oficial do Google Maps** → **Save**.

Enquanto estiver vazio, o botão "Como chegar" faz uma busca pelo endereço —
funciona, mas o link oficial é melhor.

---

## 9. Trocar uma imagem

Em qualquer campo de imagem:

1. Clique no campo (ou no botão **Select/Upload**).
2. Escolha **Upload** e selecione o arquivo do computador ou do celular.
3. Espere o envio terminar e confirme.
4. Clique em **Save**.

A imagem entra no site já otimizada, em vários tamanhos, automaticamente.

**Dicas:**
- Fotos de profissionais ficam melhores **quadradas** e com o rosto centralizado.
- Capas de publicação ficam melhores **deitadas** (paisagem).
- Evite arquivos gigantes: acima de 5 MB, o envio fica lento.

---

## 10. Desfazer uma alteração

Todo salvamento fica registrado. Para voltar atrás:

1. Abra **https://github.com/taoklyn/taoklyn-site/commits/main**
2. Encontre a alteração pela data e pela descrição
   (ex.: `content: atualiza pilates.md`).
3. Clique nela. Você vê exatamente o que mudou: vermelho é o que saiu, verde é
   o que entrou.
4. Para reverter, clique em **Revert** e confirme. O site volta ao estado
   anterior em poucos minutos.

Se preferir, é mais simples reabrir o item no painel e digitar o texto antigo.

---

## 11. Convidar outra pessoa para editar

O Pages CMS permite convidar colaboradores por e-mail, direto no painel:

1. Abra o repositório no Pages CMS.
2. Vá em **Settings → Collaborators**.
3. Informe o e-mail da pessoa e envie o convite.
4. A pessoa aceita o convite e passa a acessar o painel com a própria conta.

Assim ninguém precisa compartilhar senha. Para tirar o acesso, remova a pessoa
da mesma lista.

---

## 12. Perguntas frequentes

**Salvei e o site não mudou. E agora?**
Espere de 1 a 3 minutos e recarregue a página com `Ctrl + F5`. O site é
reconstruído a cada alteração e isso leva algum tempo.

**Posso apagar um profissional que saiu da clínica?**
Prefira desmarcar "Mostrar no site". Se apagar, o endereço da página dele passa
a dar erro para quem tiver o link salvo.

**Posso mudar o nome de um profissional já cadastrado?**
Pode mudar o **nome exibido** normalmente. O endereço da página não muda junto
— e isso é proposital, para não quebrar links já compartilhados.

**Posso escrever informação de paciente no site?**
**Não.** Nada de prontuário, diagnóstico, sintoma, medicamento ou foto de
paciente. Este site é só institucional.

**Posso publicar preço, convênio ou promessa de resultado?**
Não sem conferir com a direção da clínica e com o conselho profissional
correspondente. Publicidade em saúde tem regras próprias.

**Estraguei alguma coisa. E agora?**
Nada se perde: veja [Desfazer uma alteração](#10-desfazer-uma-alteração).

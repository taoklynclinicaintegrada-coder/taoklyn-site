# Como entrar no painel — em 3 passos

Esta é a folha para colar na recepção ou mandar no WhatsApp da equipe. O manual
completo é o [`CMS.md`](CMS.md); aqui está só o essencial para entrar.

---

## Para quem cuida do conteúdo

### 1. Abra o painel

**app.pagescms.org**

Ou aponte a câmera do celular para o código em [`qr-painel.svg`](qr-painel.svg).

### 2. Digite o seu e-mail

No campo **Email**, toque em **Continue with email**.
Use o mesmo e-mail em que você recebeu o convite.

### 3. Abra o e-mail que chegou

Toque no link da mensagem. Pronto, você está dentro.

---

> ### Não existe senha
>
> Você não cria conta, não escolhe senha e não precisa lembrar de nada. O acesso
> chega sempre no seu e-mail — **por isso, manter o e-mail protegido é manter o
> site protegido**.

> ### Se aparecer "No repositories yet"
>
> Quer dizer que esse e-mail ainda não foi convidado. Fale com quem administra o
> site. Não adianta tentar de novo.

**Não é preciso ter conta no GitHub.** Se em algum momento a tela pedir GitHub,
você entrou pelo botão errado: volte e use o campo de e-mail.

---

## Para quem administra: convidar a equipe

Sem este passo, ninguém consegue entrar — nem você.

1. Entre em **app.pagescms.org** com **Sign in with GitHub**.
2. Abra o repositório **taoklyn/taoklyn-site**.
3. Vá em **Settings** → **Collaborators**.
4. Informe o e-mail da pessoa e envie o convite.
5. Repita para cada pessoa da equipe.

A partir daí, cada uma entra sozinha pelos 3 passos acima.

**Para tirar o acesso de alguém**, remova a pessoa dessa mesma lista. O acesso
acaba na hora, sem precisar trocar senha de ninguém.

---

## Deixar o painel a um toque

Vale fazer uma vez, em cada aparelho que a equipe usa:

**No celular (Android ou iPhone)**
Abra `app.pagescms.org` no navegador → menu do navegador →
**Adicionar à tela inicial**. Vira um ícone, como um aplicativo.

**No computador**
Abra o endereço e salve nos favoritos, ou arraste o endereço da barra para a
área de trabalho.

Assim ninguém precisa digitar nada nem lembrar do endereço.

---

## Regenerar o QR code

Se o endereço do painel mudar:

```bash
node scripts/gerar-qr-do-painel.mjs
```

/**
 * Audita o site JÁ GERADO em dist/.
 *
 * Confere o que só dá para ver no HTML final: link interno apontando para
 * página inexistente, imagem sem alt, página sem H1 ou com mais de um,
 * descrição fora do tamanho útil, rascunho vazado e JavaScript inesperado.
 *
 * Rode depois do build: `npm run verificar:site`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';

const DIST = 'dist';

/** Teto de JavaScript por página. Subir este número é uma decisão, não um acidente. */
const ORCAMENTO_DE_JS = 8 * 1024;
if (!existsSync(DIST)) {
  console.error('dist/ não existe. Rode `npm run build` antes.');
  process.exit(1);
}

const problemas = [];
const avisos = [];

/** Todos os .html gerados, com a URL pública correspondente. */
function listarPaginas(pasta = DIST, prefixo = '') {
  const saida = [];
  for (const item of readdirSync(pasta)) {
    const caminho = join(pasta, item);
    if (statSync(caminho).isDirectory()) {
      saida.push(...listarPaginas(caminho, posix.join(prefixo, item)));
    } else if (item.endsWith('.html')) {
      const url =
        item === 'index.html' ? `/${prefixo}`.replace(/\/$/, '') || '/' : `/${posix.join(prefixo, item.replace(/\.html$/, ''))}`;
      saida.push({ arquivo: caminho, url, html: readFileSync(caminho, 'utf8') });
    }
  }
  return saida;
}

const paginas = listarPaginas();
const urlsExistentes = new Set(paginas.map((p) => p.url));

function texto(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : undefined;
}

for (const pagina of paginas) {
  const { url, html } = pagina;
  const eh404 = url === '/404';

  const h1 = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1 !== 1) problemas.push(`${url}: ${h1} elementos <h1> (esperado exatamente 1)`);

  const descricao = texto(html, /<meta name="description" content="([^"]*)"/);
  if (!descricao) problemas.push(`${url}: sem meta description`);
  else if (descricao.length < 50 || descricao.length > 165) {
    avisos.push(`${url}: meta description com ${descricao.length} caracteres (ideal 50–165)`);
  }

  if (!eh404 && !/<link rel="canonical"/.test(html)) {
    problemas.push(`${url}: sem link canonical`);
  }

  if (!/<html lang="pt-BR">/.test(html)) problemas.push(`${url}: <html> sem lang="pt-BR"`);

  // Imagens sem alt. `alt` vazio é válido (imagem decorativa) e o Astro o
  // escreve como atributo booleano — `alt` sozinho, sem `=""`.
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt(\s|=|>|\/)/.test(tag)) {
      problemas.push(`${url}: <img> sem atributo alt — ${tag.slice(0, 90)}`);
    }
  }

  // JSON-LD precisa ser JSON válido, senão o Google descarta em silêncio.
  for (const bloco of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []) {
    const conteudo = bloco.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    try {
      JSON.parse(conteudo);
    } catch (erro) {
      problemas.push(`${url}: JSON-LD inválido — ${erro.message}`);
    }
  }

  // Links internos precisam existir.
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const alvo = href.replace(/\/$/, '') || '/';
    if (alvo.startsWith('/_astro/') || alvo.startsWith('/images/') || alvo.startsWith('/uploads/')) {
      if (!existsSync(join(DIST, alvo))) problemas.push(`${url}: arquivo ${alvo} não existe em dist/`);
      continue;
    }
    if (/\.(xml|txt|ico|png|jpg|webp|webmanifest|svg)$/.test(alvo)) {
      if (!existsSync(join(DIST, alvo))) problemas.push(`${url}: arquivo ${alvo} não existe em dist/`);
      continue;
    }
    if (!urlsExistentes.has(alvo)) problemas.push(`${url}: link interno quebrado para ${alvo}`);
  }

  // Orçamento de JavaScript. O site é quase todo HTML e CSS; o pouco que existe
  // (os botões do carrossel, e o Analytics quando configurado) precisa continuar
  // pequeno. Medir o peso pega o que "só mais um script" faz ao longo do tempo —
  // coisa que um aviso de "existe script" não pega.
  let jsEmBytes = 0;
  for (const [, atributos, corpo] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/ld\+json"/.test(atributos)) continue;
    if (/googletagmanager\.com/.test(atributos)) continue;

    const src = atributos.match(/\ssrc="([^"]+)"/)?.[1];
    if (src?.startsWith('/')) {
      const arquivo = join(DIST, src);
      jsEmBytes += existsSync(arquivo) ? statSync(arquivo).size : 0;
    } else {
      jsEmBytes += Buffer.byteLength(corpo, 'utf8');
    }
  }
  if (jsEmBytes > ORCAMENTO_DE_JS) {
    problemas.push(
      `${url}: ${(jsEmBytes / 1024).toFixed(1)} KB de JavaScript — acima do orçamento de ` +
        `${(ORCAMENTO_DE_JS / 1024).toFixed(0)} KB por página`,
    );
  }
}

/* Rascunhos e itens ocultos não podem ter gerado página nem entrado no sitemap. */
const sitemap = existsSync(join(DIST, 'sitemap-0.xml'))
  ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8')
  : '';

if (sitemap) {
  if (/\/404/.test(sitemap)) problemas.push('sitemap: contém a página 404');
  const urlsNoSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    new URL(m[1]).pathname.replace(/\/$/, '') || '/',
  );
  for (const url of urlsNoSitemap) {
    if (!urlsExistentes.has(url)) problemas.push(`sitemap: aponta para ${url}, que não foi gerada`);
  }
} else {
  avisos.push('sitemap-0.xml não encontrado em dist/');
}

/* ------------------------------- relatório -------------------------------- */

for (const aviso of avisos) console.log(`aviso  ${aviso}`);

if (problemas.length) {
  console.error(`\n${problemas.length} problema(s) no site gerado:\n`);
  for (const problema of problemas) console.error(`  - ${problema}`);
  process.exit(1);
}

console.log(`\nOK — ${paginas.length} páginas conferidas em dist/.`);

/**
 * Serve dist/ aplicando os cabeçalhos de public/_headers, como o Cloudflare
 * Pages faz.
 *
 * Existe por um motivo específico: nem `astro dev` nem `astro preview` aplicam
 * o _headers. Uma Content-Security-Policy errada só apareceria em produção —
 * e apareceria como página em branco.
 *
 * Uso: node scripts/servir-como-producao.mjs [porta]
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const porta = Number(process.argv[2]) || 4322;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/** Lê public/_headers no mesmo formato do Cloudflare: padrão + linhas indentadas. */
function lerRegras() {
  const regras = [];
  let atual = null;
  for (const linha of readFileSync('public/_headers', 'utf8').split('\n')) {
    if (!linha.trim() || linha.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(linha)) {
      atual = { padrao: linha.trim(), cabecalhos: {} };
      regras.push(atual);
    } else if (atual) {
      const separador = linha.indexOf(':');
      if (separador > 0) {
        atual.cabecalhos[linha.slice(0, separador).trim()] = linha.slice(separador + 1).trim();
      }
    }
  }
  return regras;
}

const regras = lerRegras();

function casa(padrao, caminho) {
  if (padrao === '/*') return true;
  if (padrao.endsWith('/*')) return caminho.startsWith(padrao.slice(0, -1));
  return padrao === caminho;
}

async function resolverArquivo(caminho) {
  const candidatos = [
    join(DIST, caminho),
    join(DIST, caminho, 'index.html'),
    join(DIST, `${caminho}.html`),
  ];
  for (const candidato of candidatos) {
    try {
      const info = await stat(candidato);
      if (info.isFile()) return candidato;
    } catch {
      /* tenta o próximo */
    }
  }
  return null;
}

const servidor = createServer(async (requisicao, resposta) => {
  const caminho = decodeURIComponent(new URL(requisicao.url, 'http://local').pathname);
  const arquivo = await resolverArquivo(caminho);

  const cabecalhos = {};
  for (const regra of regras) {
    if (casa(regra.padrao, caminho)) Object.assign(cabecalhos, regra.cabecalhos);
  }

  if (!arquivo) {
    const html = await readFile(join(DIST, '404.html'), 'utf8').catch(() => 'Não encontrado');
    resposta.writeHead(404, { ...cabecalhos, 'Content-Type': TIPOS['.html'] });
    resposta.end(html);
    return;
  }

  const conteudo = await readFile(arquivo);
  resposta.writeHead(200, {
    ...cabecalhos,
    'Content-Type': TIPOS[extname(arquivo)] ?? 'application/octet-stream',
  });
  resposta.end(conteudo);
});

servidor.listen(porta, () => {
  console.log(`dist/ servido em http://localhost:${porta} com os cabeçalhos de public/_headers`);
  for (const regra of regras) {
    console.log(`  ${regra.padrao} -> ${Object.keys(regra.cabecalhos).join(', ')}`);
  }
});

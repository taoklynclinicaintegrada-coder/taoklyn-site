/**
 * Prepara os ativos de producao a partir de /referencias.
 *
 * /referencias NUNCA e modificada: este script apenas LE de la e ESCREVE em
 * public/ e src/assets/. Rode com `npm run assets:marca`.
 */
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const raiz = process.cwd();
const ref = (...p) => join(raiz, 'referencias', ...p);
const dest = (...p) => join(raiz, ...p);

const rel = (caminho) => caminho.slice(raiz.length + 1);

async function garantirPasta(arquivo) {
  await mkdir(dirname(arquivo), { recursive: true });
}

async function copiar(origem, destino) {
  await garantirPasta(destino);
  await copyFile(origem, destino);
  console.log('copiado  ', rel(destino));
}

async function gerar(origem, destino, transformar) {
  await garantirPasta(destino);
  await transformar(sharp(origem)).toFile(destino);
  console.log('gerado   ', rel(destino));
}

/**
 * Logos usados nas paginas.
 *
 * Vao para src/assets/marca/ e nao para public/: dentro de src/ o Astro gera
 * AVIF/WebP no tamanho exato de exibicao. O arquivo original do cabecalho tem
 * 2067px de largura e 457KB para aparecer com 144px — servido cru, e ele que
 * decide o tempo de carregamento da primeira tela.
 */
const LOGOS = [
  // Fundo claro (cabecalho): versao horizontal colorida.
  [ref('logo', 'logo-horizontal.png'), dest('src/assets/marca/marca-horizontal.png')],
  // Fundo escuro (rodape): versao monocromatica branca.
  [ref('logo', 'logo-monocromatica-branca.png'), dest('src/assets/marca/marca-branca.png')],
  // Selo circular completo, para destaques.
  [ref('logo', 'logo-principal-512.png'), dest('src/assets/marca/marca-selo.png')],
  // Simbolo isolado (Tao), usado como ornamento discreto.
  [ref('logo', 'simbolo-tao.png'), dest('src/assets/marca/simbolo.png')],
];

/**
 * Logo publico, referenciado por URL fixa nos dados estruturados (JSON-LD) e
 * por buscadores. Precisa de endereco estavel, entao fica em public/ — mas vai
 * comprimido, nao cru.
 */
const LOGO_PUBLICO = {
  origem: ref('logo', 'logo-principal-512.png'),
  destino: dest('public/images/brand/marca-selo.png'),
};

/** Icones do navegador: os arquivos ja vem prontos nas referencias. */
const ICONES = [
  ['favicon.ico', 'public/favicon.ico'],
  ['favicon-16x16.png', 'public/favicon-16x16.png'],
  ['favicon-32x32.png', 'public/favicon-32x32.png'],
  ['apple-touch-icon.png', 'public/apple-touch-icon.png'],
  ['android-chrome-192x192.png', 'public/images/brand/icone-192.png'],
  ['android-chrome-512x512.png', 'public/images/brand/icone-512.png'],
];

/**
 * Retratos dos profissionais.
 *
 * As referencias sao as ARTES completas de divulgacao, nao retratos soltos.
 * Recortamos a area da fotografia de cada arte para uso em cartao e pagina.
 * Assim que houver fotografia original, basta troca-la pelo CMS.
 * Coordenadas conferidas a olho, uma a uma, sobre o arquivo original.
 */
const RETRATOS = [
  {
    origem: ref('profissionais', 'audinei-loureiro.png'),
    destino: dest('src/assets/uploads/profissionais/audinei-loureiro-cavalcante.webp'),
    recorte: { left: 455, top: 278, width: 318, height: 318 },
  },
  {
    origem: ref('profissionais', 'robson-feitosa.png'),
    destino: dest('src/assets/uploads/profissionais/robson-feitosa-de-lima.webp'),
    recorte: { left: 445, top: 245, width: 315, height: 315 },
  },
  {
    // O arquivo em referencias/ veio com um L; a grafia confirmada pela
    // clinica e Picciguelli, e e ela que vale no site.
    origem: ref('profissionais', 'fernando-piccigueli.png'),
    destino: dest('src/assets/uploads/profissionais/fernando-picciguelli.webp'),
    recorte: { left: 566, top: 206, width: 264, height: 264 },
  },
];

async function main() {
  for (const [origem, destino] of LOGOS) await copiar(origem, destino);

  await gerar(LOGO_PUBLICO.origem, LOGO_PUBLICO.destino, (img) =>
    img.resize({ width: 512 }).png({ compressionLevel: 9, quality: 82, palette: true }),
  );
  for (const [nome, destino] of ICONES) {
    if (nome.endsWith('.ico')) {
      await copiar(ref('logo', nome), dest(destino));
      continue;
    }
    await gerar(ref('logo', nome), dest(destino), (img) =>
      img.png({ compressionLevel: 9, quality: 82, palette: true }),
    );
  }

  for (const { origem, destino, recorte } of RETRATOS) {
    await gerar(origem, destino, (img) =>
      img.extract(recorte).resize({ width: 720, height: 720, fit: 'cover' }).webp({ quality: 82 }),
    );
  }

  // Imagem de compartilhamento social (Open Graph): marca branca sobre verde profundo.
  const og = dest('public/images/brand/og-taoklyn.png');
  await garantirPasta(og);
  const marca = await sharp(ref('logo', 'logo-monocromatica-branca.png'))
    .resize({ width: 460, height: 460, fit: 'inside' })
    .toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#123326' },
  })
    .composite([{ input: marca, gravity: 'center' }])
    .png({ compressionLevel: 9, quality: 85, palette: true })
    .toFile(og);
  console.log('gerado   ', 'public/images/brand/og-taoklyn.png');

  // webmanifest simples, apontando para os icones ja copiados.
  const manifesto = {
    name: 'Tao Klyn | Clínica Integrada',
    short_name: 'Tao Klyn',
    start_url: '/',
    display: 'browser',
    background_color: '#F3E8DD',
    theme_color: '#123326',
    icons: [
      { src: '/images/brand/icone-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/brand/icone-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  await writeFile(dest('public/site.webmanifest'), JSON.stringify(manifesto, null, 2) + '\n');
  console.log('gerado   ', 'public/site.webmanifest');
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});

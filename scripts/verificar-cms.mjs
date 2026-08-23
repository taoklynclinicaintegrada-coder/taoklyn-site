/**
 * Confere se o .pages.yml continua batendo com o conteúdo real do projeto.
 *
 * O erro caro aqui é silencioso: um campo renomeado no schema e esquecido no
 * CMS faz a recepção preencher algo que o site ignora — e ninguém percebe até
 * alguém reclamar que "salvou e não mudou nada".
 *
 * Rode com `npm run verificar:cms`. Sai com código 1 se algo divergir.
 */
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';

const problemas = [];
const avisos = [];

const config = parse(readFileSync('.pages.yml', 'utf8'));
const schemas = readFileSync('src/content.config.ts', 'utf8');

/* ---------------------------------- media --------------------------------- */

const medias = Array.isArray(config.media) ? config.media : [config.media];
const nomesDeMedia = new Set();

for (const media of medias) {
  if (typeof media === 'string') continue;
  nomesDeMedia.add(media.name);
  if (!existsSync(media.input)) {
    problemas.push(`media "${media.name}": a pasta ${media.input} não existe`);
  }
  if (!media.output?.startsWith('/')) {
    problemas.push(`media "${media.name}": output deveria começar com "/"`);
  }
}

/* --------------------------------- content -------------------------------- */

function achatar(itens, saida = []) {
  for (const item of itens) {
    if (item.type === 'group') achatar(item.items ?? [], saida);
    else saida.push(item);
  }
  return saida;
}

const entradas = achatar(config.content ?? []);

function nomesDosCampos(campos, prefixo = '') {
  const nomes = [];
  for (const campo of campos ?? []) {
    const caminho = prefixo ? `${prefixo}.${campo.name}` : campo.name;
    nomes.push({ caminho, campo });
    if (campo.type === 'object') nomes.push(...nomesDosCampos(campo.fields, caminho));
  }
  return nomes;
}

/** Marca "não dá para conferir agora": uma lista vazia no caminho. */
const LISTA_VAZIA = Symbol('lista vazia');

function valorNoObjeto(objeto, caminho) {
  return caminho.split('.').reduce((atual, chave) => {
    if (atual === LISTA_VAZIA) return LISTA_VAZIA;
    if (atual === undefined || atual === null) return undefined;
    if (Array.isArray(atual)) return atual.length ? atual[0]?.[chave] : LISTA_VAZIA;
    return atual[chave];
  }, objeto);
}

for (const entrada of entradas) {
  const rotulo = `${entrada.type} "${entrada.name}"`;

  if (!entrada.path || !existsSync(entrada.path)) {
    problemas.push(`${rotulo}: caminho ${entrada.path} não existe`);
    continue;
  }

  const campos = nomesDosCampos(entrada.fields);

  // Todo campo de imagem precisa apontar para uma media declarada.
  for (const { caminho, campo } of campos) {
    if (campo.type === 'image' || campo.type === 'file' || campo.type === 'rich-text') {
      const media = campo.options?.media;
      if (media !== false && media !== undefined && !nomesDeMedia.has(media)) {
        problemas.push(`${rotulo}: campo "${caminho}" usa media "${media}", que não existe`);
      }
      const pasta = campo.options?.path;
      if (pasta && !existsSync(pasta)) {
        problemas.push(`${rotulo}: campo "${caminho}" aponta para a pasta ${pasta}, que não existe`);
      }
    }
    if (campo.type === 'reference') {
      const colecao = campo.options?.collection;
      if (!entradas.some((e) => e.name === colecao)) {
        problemas.push(
          `${rotulo}: campo "${caminho}" referencia a coleção "${colecao}", que não está no CMS`,
        );
      }
    }
  }

  if (entrada.type === 'collection') {
    // Os campos do CMS precisam existir no schema do Astro, senão o editor
    // preenche algo que o site nunca lê.
    for (const { caminho, campo } of campos) {
      if (campo.name === 'body') continue;
      const declarado = new RegExp(`\\b${campo.name}:\\s`).test(schemas);
      if (!declarado) {
        problemas.push(
          `${rotulo}: campo "${caminho}" não aparece em src/content.config.ts`,
        );
      }
    }
  } else if (entrada.type === 'file' && entrada.format === 'json') {
    const dados = JSON.parse(readFileSync(entrada.path, 'utf8'));
    const alvo = entrada.list ? (Array.isArray(dados) ? dados : []) : dados;

    if (entrada.list) {
      if (alvo.length === 0) {
        avisos.push(`${rotulo}: lista vazia — nada a conferir em ${entrada.path}`);
        continue;
      }
      for (const { caminho } of campos) {
        if (valorNoObjeto(alvo[0], caminho) === undefined) {
          avisos.push(`${rotulo}: campo "${caminho}" não existe no primeiro item de ${entrada.path}`);
        }
      }
    } else {
      for (const { caminho, campo } of campos) {
        if (campo.type === 'object') continue;
        const valor = valorNoObjeto(alvo, caminho);
        if (valor === LISTA_VAZIA) {
          avisos.push(`${rotulo}: campo "${caminho}" está dentro de uma lista vazia — não conferido`);
        } else if (valor === undefined) {
          problemas.push(`${rotulo}: campo "${caminho}" não existe em ${entrada.path}`);
        }
      }
    }
  }
}

/* --------------------------------- relatório ------------------------------ */

for (const aviso of avisos) console.log(`aviso  ${aviso}`);

if (problemas.length) {
  console.error(`\n${problemas.length} problema(s) no .pages.yml:\n`);
  for (const problema of problemas) console.error(`  - ${problema}`);
  process.exit(1);
}

console.log(
  `\nOK — ${entradas.length} entradas de conteúdo e ${nomesDeMedia.size} fonte(s) de mídia conferidas.`,
);

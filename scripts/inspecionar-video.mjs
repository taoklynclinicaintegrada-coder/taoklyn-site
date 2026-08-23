/**
 * Lê a estrutura de um MP4 e informa duração, resolução, codec e bitrate.
 *
 * Existe porque a máquina não tem ffprobe e porque vídeo é o tipo de arquivo
 * que entra no repositório "só desta vez" e nunca mais sai. Antes de publicar
 * qualquer vídeo, meça.
 *
 * Uso: node scripts/inspecionar-video.mjs <arquivo.mp4> [outro.mp4 ...]
 */
import { readFileSync, statSync } from 'node:fs';
import { basename } from 'node:path';

/** Percorre as caixas (boxes) de um trecho do arquivo, chamando `visitar`. */
function percorrer(buffer, inicio, fim, visitar) {
  let posicao = inicio;
  while (posicao + 8 <= fim) {
    let tamanho = buffer.readUInt32BE(posicao);
    const tipo = buffer.toString('latin1', posicao + 4, posicao + 8);
    let cabecalho = 8;

    if (tamanho === 1) {
      // Tamanho de 64 bits, guardado logo após o tipo.
      tamanho = Number(buffer.readBigUInt64BE(posicao + 8));
      cabecalho = 16;
    } else if (tamanho === 0) {
      tamanho = fim - posicao;
    }
    if (tamanho < cabecalho || posicao + tamanho > fim) break;

    visitar(tipo, posicao + cabecalho, posicao + tamanho);
    posicao += tamanho;
  }
}

/** Números 16.16 de ponto fixo, usados em largura/altura da trilha. */
const pontoFixo1616 = (buffer, posicao) => buffer.readUInt32BE(posicao) / 65536;

export function inspecionar(caminho) {
  const buffer = readFileSync(caminho);
  const tamanhoEmBytes = statSync(caminho).size;

  const resultado = {
    arquivo: basename(caminho),
    tamanhoEmBytes,
    duracaoEmSegundos: 0,
    largura: 0,
    altura: 0,
    codecs: [],
    quadrosPorSegundo: 0,
    marca: '',
  };

  percorrer(buffer, 0, buffer.length, (tipo, inicio, fim) => {
    if (tipo === 'ftyp') {
      resultado.marca = buffer.toString('latin1', inicio, inicio + 4);
      return;
    }
    if (tipo !== 'moov') return;

    percorrer(buffer, inicio, fim, (tipoMoov, inicioMoov, fimMoov) => {
      if (tipoMoov === 'mvhd') {
        const versao = buffer[inicioMoov];
        const [escala, duracao] =
          versao === 1
            ? [buffer.readUInt32BE(inicioMoov + 20), Number(buffer.readBigUInt64BE(inicioMoov + 24))]
            : [buffer.readUInt32BE(inicioMoov + 12), buffer.readUInt32BE(inicioMoov + 16)];
        if (escala) resultado.duracaoEmSegundos = duracao / escala;
        return;
      }
      if (tipoMoov !== 'trak') return;

      let escalaDaMidia = 0;
      let duracaoDaMidia = 0;
      let ehVideo = false;

      percorrer(buffer, inicioMoov, fimMoov, (tipoTrak, inicioTrak, fimTrak) => {
        if (tipoTrak === 'tkhd') {
          const versao = buffer[inicioTrak];
          // No tkhd, largura e altura são os dois últimos campos: vêm logo
          // depois da matriz de 36 bytes. Versão 0 usa tempos de 32 bits.
          const base = inicioTrak + (versao === 1 ? 88 : 76);
          const largura = pontoFixo1616(buffer, base);
          const altura = pontoFixo1616(buffer, base + 4);
          // A trilha de áudio traz 0x0; só a de vídeo tem dimensão.
          if (largura > 0 && altura > 0) {
            resultado.largura = Math.round(largura);
            resultado.altura = Math.round(altura);
          }
          return;
        }
        if (tipoTrak !== 'mdia') return;

        percorrer(buffer, inicioTrak, fimTrak, (tipoMdia, inicioMdia, fimMdia) => {
          if (tipoMdia === 'mdhd') {
            const versao = buffer[inicioMdia];
            [escalaDaMidia, duracaoDaMidia] =
              versao === 1
                ? [
                    buffer.readUInt32BE(inicioMdia + 20),
                    Number(buffer.readBigUInt64BE(inicioMdia + 24)),
                  ]
                : [buffer.readUInt32BE(inicioMdia + 12), buffer.readUInt32BE(inicioMdia + 16)];
            return;
          }
          if (tipoMdia === 'hdlr') {
            ehVideo = buffer.toString('latin1', inicioMdia + 8, inicioMdia + 12) === 'vide';
            return;
          }
          if (tipoMdia !== 'minf') return;

          percorrer(buffer, inicioMdia, fimMdia, (tipoMinf, inicioMinf, fimMinf) => {
            if (tipoMinf !== 'stbl') return;
            percorrer(buffer, inicioMinf, fimMinf, (tipoStbl, inicioStbl, fimStbl) => {
              if (tipoStbl === 'stsd') {
                // 4 bytes de versão/flags + 4 de contagem, depois a primeira entrada.
                const entrada = inicioStbl + 8;
                if (entrada + 8 <= fimStbl) {
                  const codec = buffer.toString('latin1', entrada + 4, entrada + 8);
                  if (!resultado.codecs.includes(codec)) resultado.codecs.push(codec);
                }
                return;
              }
              if (tipoStbl === 'stts' && ehVideo && escalaDaMidia) {
                const entradas = buffer.readUInt32BE(inicioStbl + 4);
                let amostras = 0;
                for (let i = 0; i < entradas; i += 1) {
                  amostras += buffer.readUInt32BE(inicioStbl + 8 + i * 8);
                }
                const segundos = duracaoDaMidia / escalaDaMidia;
                if (segundos > 0) resultado.quadrosPorSegundo = amostras / segundos;
              }
            });
          });
        });
      });
    });
  });

  return resultado;
}

const MB = (bytes) => bytes / 1048576;

function formatarDuracao(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos - minutos * 60;
  return `${minutos}:${resto.toFixed(1).padStart(4, '0')}`;
}

const arquivos = process.argv.slice(2);
if (arquivos.length === 0) {
  console.error('Informe ao menos um arquivo .mp4');
  process.exit(1);
}

let totalEmBytes = 0;
for (const caminho of arquivos) {
  const v = inspecionar(caminho);
  totalEmBytes += v.tamanhoEmBytes;
  const bitrate = v.duracaoEmSegundos
    ? ((v.tamanhoEmBytes * 8) / v.duracaoEmSegundos / 1_000_000).toFixed(2)
    : '?';

  console.log(`\n${v.arquivo}`);
  console.log(`  tamanho    ${MB(v.tamanhoEmBytes).toFixed(2)} MB`);
  console.log(`  duração    ${formatarDuracao(v.duracaoEmSegundos)} (${v.duracaoEmSegundos.toFixed(1)}s)`);
  console.log(`  resolução  ${v.largura}x${v.altura}`);
  console.log(`  codecs     ${v.codecs.join(', ') || 'não identificado'}`);
  console.log(`  quadros/s  ${v.quadrosPorSegundo ? v.quadrosPorSegundo.toFixed(1) : '?'}`);
  console.log(`  bitrate    ${bitrate} Mbps`);
  console.log(`  formato    ${v.marca}`);
}

if (arquivos.length > 1) {
  console.log(`\ntotal: ${MB(totalEmBytes).toFixed(2)} MB em ${arquivos.length} arquivos`);
}

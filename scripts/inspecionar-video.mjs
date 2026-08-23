/**
 * Informa duração, resolução, codec, bitrate e tamanho de arquivos MP4.
 *
 * Uso: node scripts/inspecionar-video.mjs <arquivo.mp4> [outro.mp4 ...]
 */
import { inspecionar } from './lib/mp4.mjs';

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

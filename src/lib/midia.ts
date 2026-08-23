import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// Leitor de MP4 em JavaScript puro, compartilhado com os scripts de linha de
// comando. O TypeScript infere os tipos do próprio arquivo.
import { inspecionar } from '../../scripts/lib/mp4.mjs';

/**
 * Dados de um vídeo lidos do próprio arquivo, durante o build.
 *
 * A duração não é um campo do CMS de propósito: número digitado à mão
 * desatualiza no dia em que alguém troca o arquivo e esquece de corrigir.
 * Aqui ela sempre corresponde ao vídeo que está no ar.
 */
export interface DadosDoVideo {
  duracao: string;
  duracaoEmSegundos: number;
  tamanhoEmMB: number;
  vertical: boolean;
}

const cache = new Map<string, DadosDoVideo | undefined>();

function formatar(segundos: number): string {
  const minutos = Math.floor(segundos / 60);
  const resto = Math.round(segundos - minutos * 60);
  return `${minutos}:${String(resto).padStart(2, '0')}`;
}

/**
 * Lê o arquivo em public/. Devolve `undefined` para vídeo externo, arquivo
 * ausente ou MP4 que não dê para interpretar — nesses casos a interface
 * simplesmente não mostra a duração, em vez de mostrar algo errado.
 */
export function dadosDoVideo(caminho?: string): DadosDoVideo | undefined {
  if (!caminho || /^https?:\/\//.test(caminho)) return undefined;
  if (cache.has(caminho)) return cache.get(caminho);

  let resultado: DadosDoVideo | undefined;
  try {
    // Ancorado neste arquivo, e não em process.cwd(): o servidor de
    // desenvolvimento pode ser iniciado de outro diretório, e aí a duração
    // sumiria em silêncio — que foi exatamente o que aconteceu ao verificar.
    const arquivo = fileURLToPath(
      new URL(`../../public/${caminho.replace(/^\/+/, '')}`, import.meta.url),
    );
    if (existsSync(arquivo)) {
      const info = inspecionar(arquivo);
      if (info.duracaoEmSegundos > 0) {
        resultado = {
          duracao: formatar(info.duracaoEmSegundos),
          duracaoEmSegundos: info.duracaoEmSegundos,
          tamanhoEmMB: statSync(arquivo).size / 1048576,
          vertical: info.altura > info.largura,
        };
      }
    }
  } catch {
    // Vídeo ilegível não pode derrubar o build de uma página inteira.
    resultado = undefined;
  }

  cache.set(caminho, resultado);
  return resultado;
}

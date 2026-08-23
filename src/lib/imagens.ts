import type { ImageMetadata } from 'astro';

/**
 * Resolve o caminho de imagem gravado pelo CMS para um arquivo real do projeto.
 *
 * O Pages CMS grava caminhos como "/src/assets/uploads/profissionais/foto.webp".
 * Como esses arquivos vivem dentro de src/, o Astro consegue otimiza-los
 * (AVIF/WebP, tamanhos responsivos) — o que nao aconteceria em public/.
 */
const arquivos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/uploads/**/*.{jpeg,jpg,png,webp,avif,gif,svg}',
  { eager: true },
);

export function resolverImagem(caminho?: string): ImageMetadata | undefined {
  if (!caminho) return undefined;
  const limpo = caminho.trim();
  if (!limpo) return undefined;

  const candidatos = [
    limpo,
    limpo.startsWith('/') ? limpo : `/${limpo}`,
    `/src/assets/uploads/${limpo.replace(/^\/+/, '')}`,
  ];

  for (const candidato of candidatos) {
    const encontrado = arquivos[candidato];
    if (encontrado) return encontrado.default;
  }
  return undefined;
}

/** Caminho servido direto (imagem em public/ ou endereco externo). */
export function ehCaminhoExterno(caminho?: string): boolean {
  if (!caminho) return false;
  return /^https?:\/\//.test(caminho) || caminho.startsWith('/images/');
}

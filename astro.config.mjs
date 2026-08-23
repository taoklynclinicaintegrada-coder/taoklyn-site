// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

/**
 * Endereco publico do site. Enquanto o dominio oficial nao for definido,
 * vale o endereco gerado pelo Cloudflare Pages. Ver docs/PENDENCIAS.md.
 */
const site = env.SITE_URL || 'https://taoklyn-site.pages.dev';

if (!env.SITE_URL) {
  console.warn(
    '[taoklyn] SITE_URL nao definida — usando ' +
      site +
      ' em canonical/sitemap. Defina no .env ou no painel do Cloudflare Pages.',
  );
}

export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  image: {
    // Rascunhos e itens ocultos nao geram pagina, logo nao geram imagem.
    responsiveStyles: true,
  },
});

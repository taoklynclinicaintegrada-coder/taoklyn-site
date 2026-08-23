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
  // Site 100% estatico: paginas prontas, sem servidor nenhum. Explicito de
  // proposito — hospedagens que "detectam o framework" as vezes ligam o modo
  // servidor sozinhas, e ai as imagens passam a depender de um endpoint que
  // nao existe num site estatico.
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  image: {
    // Sharp declarado na mao pelo mesmo motivo: garante que a otimizacao
    // aconteca no build e gere arquivos, em vez de virar /_image?... .
    service: { entrypoint: 'astro/assets/services/sharp' },
    responsiveStyles: true,
  },
});

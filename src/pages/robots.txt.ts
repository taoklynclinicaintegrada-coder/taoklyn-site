import type { APIRoute } from 'astro';

/**
 * robots.txt gerado no build para que o endereco do sitemap acompanhe o
 * dominio configurado — um sitemap apontando para o dominio errado e pior do
 * que nenhum.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://taoklyn-site.pages.dev');
  const linhas = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', base).toString()}`,
    '',
  ];

  return new Response(linhas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

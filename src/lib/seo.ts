import { site, numeroWhatsApp } from './site';

/**
 * Dados estruturados (JSON-LD).
 *
 * Regra: so entra o que a clinica confirmou. Nada de avaliacoes, precos,
 * horarios ou certificacoes inventados — dado estruturado falso e pior que
 * dado estruturado ausente, porque o Google o exibe como se fosse verdade.
 */

export function urlAbsoluta(caminho: string, base: URL | string): string {
  return new URL(caminho, base).toString();
}

interface DadosDaOrganizacao {
  base: URL | string;
}

export function organizacao({ base }: DadosDaOrganizacao) {
  const redes = [site.redes.instagram, site.redes.facebook, site.redes.youtube].filter(Boolean);
  const { logradouro, bairro, cidade, estado, cep } = site.endereco;

  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': urlAbsoluta('/#clinica', base),
    name: site.nomeInstitucional,
    alternateName: site.nome,
    url: urlAbsoluta('/', base),
    logo: urlAbsoluta('/images/brand/marca-selo.png', base),
    image: urlAbsoluta(site.seo.imagem || '/images/brand/og-taoklyn.png', base),
    description: site.seo.descricao,
  };

  if (site.fundacao) dados.foundingDate = site.fundacao;
  if (site.contato.telefone) dados.telephone = `+55${site.contato.telefone.replace(/\D/g, '')}`;
  if (site.contato.email) dados.email = site.contato.email;
  if (redes.length) dados.sameAs = redes;
  if (logradouro || cidade) {
    dados.address = {
      '@type': 'PostalAddress',
      streetAddress: logradouro,
      addressLocality: cidade,
      addressRegion: estado,
      postalCode: cep,
      addressCountry: 'BR',
      ...(bairro ? { addressArea: bairro } : {}),
    };
  }
  if (site.endereco.mapaUrl) dados.hasMap = site.endereco.mapaUrl;
  const whatsapp = numeroWhatsApp();
  if (whatsapp) {
    dados.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'reservations',
      telephone: `+${whatsapp}`,
      availableLanguage: 'Portuguese',
    };
  }

  return dados;
}

export interface Migalha {
  nome: string;
  href: string;
}

export function migalhas(itens: Migalha[], base: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: item.nome,
      item: urlAbsoluta(item.href, base),
    })),
  };
}

interface DadosDaPessoa {
  nome: string;
  cargo: string;
  descricao?: string;
  imagem?: string;
  url: string;
  base: URL | string;
}

export function pessoa({ nome, cargo, descricao, imagem, url, base }: DadosDaPessoa) {
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nome,
    jobTitle: cargo,
    url: urlAbsoluta(url, base),
    worksFor: { '@id': urlAbsoluta('/#clinica', base) },
  };
  if (descricao) dados.description = descricao;
  if (imagem) dados.image = urlAbsoluta(imagem, base);
  return dados;
}

interface DadosDoArtigo {
  titulo: string;
  descricao?: string;
  imagem?: string;
  url: string;
  publicadoEm: Date;
  atualizadoEm?: Date;
  autor?: string;
  base: URL | string;
}

export function artigo({
  titulo,
  descricao,
  imagem,
  url,
  publicadoEm,
  atualizadoEm,
  autor,
  base,
}: DadosDoArtigo) {
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titulo,
    url: urlAbsoluta(url, base),
    datePublished: publicadoEm.toISOString(),
    publisher: { '@id': urlAbsoluta('/#clinica', base) },
    mainEntityOfPage: urlAbsoluta(url, base),
  };
  if (descricao) dados.description = descricao;
  if (imagem) dados.image = urlAbsoluta(imagem, base);
  if (atualizadoEm) dados.dateModified = atualizadoEm.toISOString();
  dados.author = autor
    ? { '@type': 'Person', name: autor }
    : { '@type': 'Organization', name: site.nomeInstitucional };
  return dados;
}

/** Descrição de fallback quando o editor não preencheu o campo de SEO. */
export function descricaoSegura(...candidatos: (string | undefined)[]): string {
  for (const texto of candidatos) {
    const limpo = texto?.replace(/\s+/g, ' ').trim();
    if (limpo && limpo.length >= 25) return limpo.slice(0, 158);
  }
  return site.seo.descricao;
}


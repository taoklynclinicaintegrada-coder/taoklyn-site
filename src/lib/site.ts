import { z } from 'astro/zod';
import dadosDoSite from '../data/site.json';
import dadosDaGaleria from '../data/galeria.json';
import dadosDosEspacos from '../data/espacos.json';

/**
 * Configuracoes institucionais e listas simples (galeria, espacos).
 *
 * Tudo aqui e validado no build: um JSON malformado derruba o build com
 * mensagem clara, em vez de sumir silenciosamente de uma secao do site.
 */

const textoOpcional = z.string().trim().default('');

const siteSchema = z.object({
  nome: z.string().trim().min(1),
  nomeInstitucional: z.string().trim().min(1),
  fundacao: textoOpcional,
  mensagemPrincipal: z.string().trim().min(1),
  textoHero: textoOpcional,
  textoInstitucional: textoOpcional,
  missao: textoOpcional,
  contato: z.object({
    telefone: textoOpcional,
    whatsapp: textoOpcional,
    email: textoOpcional,
    mensagemWhatsApp: textoOpcional,
  }),
  endereco: z.object({
    logradouro: textoOpcional,
    bairro: textoOpcional,
    cidade: textoOpcional,
    estado: textoOpcional,
    cep: textoOpcional,
    complemento: textoOpcional,
    mapaUrl: textoOpcional,
    comoChegar: textoOpcional,
  }),
  horarios: z.object({
    exibir: z.boolean().default(false),
    observacao: textoOpcional,
    itens: z
      .array(z.object({ dias: textoOpcional, horario: textoOpcional }))
      .default([]),
  }),
  redes: z.object({
    instagram: textoOpcional,
    instagramUsuario: textoOpcional,
    facebook: textoOpcional,
    youtube: textoOpcional,
  }),
  locacao: z.object({
    exibir: z.boolean().default(true),
    titulo: textoOpcional,
    texto: textoOpcional,
    mensagemWhatsApp: textoOpcional,
  }),
  destaques: z
    .array(z.object({ titulo: z.string().trim(), texto: textoOpcional }))
    .default([]),
  seo: z.object({
    titulo: z.string().trim().min(1),
    descricao: z.string().trim().min(1),
    imagem: textoOpcional,
  }),
});

const itemDaGaleriaSchema = z.object({
  titulo: textoOpcional,
  imagem: z.string().trim().min(1),
  alt: z.string().trim().min(1),
  categoria: textoOpcional,
  descricao: textoOpcional,
  ativo: z.boolean().default(true),
});

const espacoSchema = z.object({
  nome: z.string().trim().min(1),
  descricao: textoOpcional,
  imagem: textoOpcional,
  alt: textoOpcional,
  disponivelParaLocacao: z.boolean().default(false),
  ativo: z.boolean().default(true),
});

function validar<T>(schema: z.ZodType<T>, dados: unknown, arquivo: string): T {
  const resultado = schema.safeParse(dados);
  if (!resultado.success) {
    const problemas = resultado.error.issues
      .map((i) => `  - ${i.path.join('.') || '(raiz)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Conteudo invalido em ${arquivo}:\n${problemas}`);
  }
  return resultado.data;
}

export const site = validar(siteSchema, dadosDoSite, 'src/data/site.json');
export const galeria = validar(
  z.array(itemDaGaleriaSchema),
  dadosDaGaleria,
  'src/data/galeria.json',
).filter((item) => item.ativo);
export const espacos = validar(
  z.array(espacoSchema),
  dadosDosEspacos,
  'src/data/espacos.json',
).filter((item) => item.ativo);

export type Site = z.infer<typeof siteSchema>;
export type ItemDaGaleria = z.infer<typeof itemDaGaleriaSchema>;
export type Espaco = z.infer<typeof espacoSchema>;

/** Só dígitos, com o código do país na frente — formato exigido pelo wa.me. */
export function numeroWhatsApp(numero = site.contato.whatsapp): string {
  const digitos = numero.replace(/\D/g, '');
  if (!digitos) return '';
  return digitos.startsWith('55') ? digitos : `55${digitos}`;
}

/** Endereço do WhatsApp já com a mensagem pronta para a pessoa só enviar. */
export function linkWhatsApp(mensagem?: string): string {
  const numero = numeroWhatsApp();
  if (!numero) return '';
  const texto = (mensagem || site.contato.mensagemWhatsApp || '').trim();
  return texto
    ? `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
    : `https://wa.me/${numero}`;
}

export function linkTelefone(): string {
  const digitos = site.contato.telefone.replace(/\D/g, '');
  return digitos ? `tel:+55${digitos}` : '';
}

export function linkEmail(): string {
  return site.contato.email ? `mailto:${site.contato.email}` : '';
}

export function enderecoEmUmaLinha(): string {
  const { logradouro, bairro, cidade, estado, cep } = site.endereco;
  return [logradouro, bairro, [cidade, estado].filter(Boolean).join(' - '), cep]
    .filter(Boolean)
    .join(', ');
}

/**
 * Link do mapa. Usa a URL oficial informada pela clínica; enquanto ela não
 * existir, cai numa busca pelo endereço — nunca num Place ID inventado.
 */
export function linkMapa(): string {
  if (site.endereco.mapaUrl) return site.endereco.mapaUrl;
  const busca = encodeURIComponent(`${site.nomeInstitucional}, ${enderecoEmUmaLinha()}`);
  return `https://www.google.com/maps/search/?api=1&query=${busca}`;
}

export function anoDeFundacao(): string {
  return site.fundacao ? site.fundacao.slice(0, 4) : '';
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Esquemas do conteudo administrado pelo Pages CMS.
 *
 * Regra geral: o nome do arquivo E o endereco da pagina (slug). Nao existe
 * campo "slug" editavel — dois donos do mesmo endereco e o caminho mais curto
 * para quebrar uma URL que ja circula no Instagram.
 *
 * Campos obrigatorios sao o minimo para a pagina existir. Todo o resto e
 * opcional: conteudo faltando esconde o bloco, nunca quebra o site.
 */

/** Aceita tanto "pilates" quanto "src/content/servicos/pilates.md". */
const referenciaDeConteudo = z.string().trim().min(1);

const seo = {
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(180).optional(),
  seoImagem: z.string().trim().optional(),
};

const profissionais = defineCollection({
  loader: glob({ base: './src/content/profissionais', pattern: '**/*.md' }),
  schema: z.object({
    nome: z.string().trim().min(2),
    profissao: z.string().trim().min(2),
    registro: z.string().trim().optional(),
    registroNumero: z.string().trim().optional(),
    foto: z.string().trim().optional(),
    descricaoCurta: z.string().trim().max(240).optional(),
    areasDeAtuacao: z.array(z.string().trim()).default([]),
    servicosRelacionados: z.array(referenciaDeConteudo).default([]),
    ordem: z.number().int().default(100),
    destaque: z.boolean().default(false),
    ativo: z.boolean().default(true),
    ...seo,
  }),
});

const servicos = defineCollection({
  loader: glob({ base: './src/content/servicos', pattern: '**/*.md' }),
  schema: z.object({
    nome: z.string().trim().min(2),
    resumo: z.string().trim().max(280).optional(),
    imagem: z.string().trim().optional(),
    icone: z
      .enum(['folha', 'agulha', 'mente', 'movimento', 'coracao', 'equilibrio', 'maos', 'grupo'])
      .default('folha'),
    profissionaisRelacionados: z.array(referenciaDeConteudo).default([]),
    mensagemWhatsApp: z.string().trim().optional(),
    ordem: z.number().int().default(100),
    destaque: z.boolean().default(false),
    ativo: z.boolean().default(true),
    ...seo,
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string().trim().min(3),
    resumo: z.string().trim().max(320).optional(),
    imagemCapa: z.string().trim().optional(),
    categoria: z.string().trim().optional(),
    autor: referenciaDeConteudo.optional(),
    data: z.coerce.date(),
    ultimaAtualizacao: z.coerce.date().optional(),
    destaque: z.boolean().default(false),
    // Rascunho e o padrao: nada vai ao ar sem alguem marcar "Publicado".
    publicado: z.boolean().default(false),
    ...seo,
  }),
});

/**
 * Paginas de texto longo (politicas). Ficam em colecao para que a clinica possa
 * atualiza-las pelo CMS junto com o juridico, sem depender de programador.
 */
const paginas = defineCollection({
  loader: glob({ base: './src/content/paginas', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string().trim().min(3),
    resumo: z.string().trim().max(320).optional(),
    atualizadoEm: z.coerce.date().optional(),
    ...seo,
  }),
});

export const collections = { profissionais, servicos, posts, paginas };

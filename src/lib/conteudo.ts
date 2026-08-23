import { getCollection, type CollectionEntry } from 'astro:content';

export type Profissional = CollectionEntry<'profissionais'>;
export type Servico = CollectionEntry<'servicos'>;
export type Post = CollectionEntry<'posts'>;

/**
 * Acesso ao conteudo das colecoes, sempre ja filtrado.
 *
 * Nenhuma pagina deve chamar getCollection direto: quem esquecer o filtro
 * publica um profissional oculto ou um rascunho. O filtro mora aqui.
 */

/**
 * O CMS pode gravar a relacao como slug ("pilates") ou como caminho de arquivo
 * ("src/content/servicos/pilates.md"). As duas formas viram o mesmo slug.
 */
export function normalizarReferencia(valor: string): string {
  return valor
    .trim()
    .replace(/\.(md|mdx|json|ya?ml)$/i, '')
    .split('/')
    .filter(Boolean)
    .pop()!
    .toLowerCase();
}

function porOrdemENome<T extends { data: { ordem: number; nome: string } }>(a: T, b: T): number {
  if (a.data.ordem !== b.data.ordem) return a.data.ordem - b.data.ordem;
  return a.data.nome.localeCompare(b.data.nome, 'pt-BR');
}

export async function listarProfissionais(): Promise<Profissional[]> {
  const todos = await getCollection('profissionais', ({ data }) => data.ativo);
  return todos.sort(porOrdemENome);
}

export async function listarServicos(): Promise<Servico[]> {
  const todos = await getCollection('servicos', ({ data }) => data.ativo);
  return todos.sort(porOrdemENome);
}

export async function listarPosts(): Promise<Post[]> {
  const todos = await getCollection('posts', ({ data }) => data.publicado);
  return todos.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/**
 * A relacao profissional <-> servico e gravada dos dois lados no CMS, para que
 * a recepcao possa preenche-la por onde for mais natural. O site une os dois
 * sentidos, entao as duas telas nunca discordam mesmo se so um lado for
 * preenchido.
 */
export function servicosDoProfissional(
  profissional: Profissional,
  servicos: Servico[],
): Servico[] {
  const declarados = new Set(profissional.data.servicosRelacionados.map(normalizarReferencia));
  return servicos.filter(
    (servico) =>
      declarados.has(servico.id.toLowerCase()) ||
      servico.data.profissionaisRelacionados
        .map(normalizarReferencia)
        .includes(profissional.id.toLowerCase()),
  );
}

export function profissionaisDoServico(
  servico: Servico,
  profissionais: Profissional[],
): Profissional[] {
  const declarados = new Set(servico.data.profissionaisRelacionados.map(normalizarReferencia));
  return profissionais.filter(
    (profissional) =>
      declarados.has(profissional.id.toLowerCase()) ||
      profissional.data.servicosRelacionados
        .map(normalizarReferencia)
        .includes(servico.id.toLowerCase()),
  );
}

export function autorDoPost(post: Post, profissionais: Profissional[]): Profissional | undefined {
  if (!post.data.autor) return undefined;
  const slug = normalizarReferencia(post.data.autor);
  return profissionais.find((p) => p.id.toLowerCase() === slug);
}

/** Transforma "Saúde Integral" em "saude-integral" para uso em URL. */
export function paraSlug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface CategoriaDePosts {
  nome: string;
  slug: string;
  total: number;
}

export function categoriasDePosts(posts: Post[]): CategoriaDePosts[] {
  const mapa = new Map<string, CategoriaDePosts>();
  for (const post of posts) {
    const nome = post.data.categoria?.trim();
    if (!nome) continue;
    const slug = paraSlug(nome);
    const atual = mapa.get(slug);
    if (atual) atual.total += 1;
    else mapa.set(slug, { nome, slug, total: 1 });
  }
  return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

const FORMATO_DATA = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Maceio',
});

export function formatarData(data: Date): string {
  return FORMATO_DATA.format(data);
}

export function dataISO(data: Date): string {
  return data.toISOString().slice(0, 10);
}

/** Nome como aparece ao publico, com o registro do conselho quando houver. */
export function registroDoProfissional(profissional: Profissional): string {
  const { registro, registroNumero } = profissional.data;
  return [registro, registroNumero].filter(Boolean).join(' ');
}

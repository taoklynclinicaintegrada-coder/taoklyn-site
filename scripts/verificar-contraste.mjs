/**
 * Confere os pares de cor usados na interface contra o minimo da WCAG AA.
 * Roda com `node scripts/verificar-contraste.mjs`. Falha (exit 1) se algum par reprovar.
 */
const cor = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
};
const lum = (hex) => {
  const [r, g, b] = cor(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const razao = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const PARES = [
  ['texto principal sobre creme', '#123326', '#F3E8DD', 4.5],
  ['texto principal sobre branco', '#161616', '#FFFFFF', 4.5],
  ['texto suave sobre creme', '#3A4A42', '#F3E8DD', 4.5],
  ['texto sobre botao dourado', '#123326', '#C49338', 4.5],
  ['texto sobre verde profundo', '#F3E8DD', '#123326', 4.5],
  ['texto sobre verde escuro', '#FFFFFF', '#0E251B', 4.5],
  ['link dourado claro no rodape', '#D2AC61', '#0E251B', 4.5],
  ['detalhe dourado sobre verde profundo', '#D2AC61', '#123326', 3],
  ['borda de campo sobre creme', '#7A6A55', '#F3E8DD', 3],
  ['foco dourado sobre creme', '#8A6A20', '#F3E8DD', 3],
];

let falhou = false;
for (const [nome, frente, fundo, minimo] of PARES) {
  const r = razao(frente, fundo);
  const ok = r >= minimo;
  if (!ok) falhou = true;
  console.log(
    `${ok ? 'OK  ' : 'FALHA'} ${r.toFixed(2)}:1 (min ${minimo}) — ${nome} — ${frente} sobre ${fundo}`,
  );
}
process.exit(falhou ? 1 : 0);

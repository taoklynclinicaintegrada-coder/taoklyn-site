/**
 * Gera o QR code que leva ao painel de conteúdo.
 *
 * Existe para tirar a digitação do caminho: a recepção aponta a câmera do
 * celular e o painel abre. Rode de novo se o endereço do painel mudar.
 *
 * Uso: node scripts/gerar-qr-do-painel.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import QRCode from 'qrcode';

const ENDERECO = 'https://app.pagescms.org/taoklynclinicaintegrada-coder/taoklyn-site';
const DESTINO = 'docs/qr-painel.svg';

const svg = await QRCode.toString(ENDERECO, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 1,
  color: {
    dark: '#123326', // verde profundo da marca
    light: '#ffffff',
  },
});

mkdirSync('docs', { recursive: true });
writeFileSync(DESTINO, svg);

console.log(`QR gerado: ${DESTINO}`);
console.log(`aponta para: ${ENDERECO}`);

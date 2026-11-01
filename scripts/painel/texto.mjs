import { readFileSync } from 'node:fs';

const tabela = JSON.parse(readFileSync(new URL('./larguras.json', import.meta.url), 'utf8'));
const media = Object.fromEntries(
  Object.entries(tabela).map(([k, d]) => [k, Object.values(d).reduce((a, b) => a + b, 0) / Object.keys(d).length])
);

export function largura(texto, tamanho, { peso = 400, mono = false, espacamento = 0 } = {}) {
  const chave = mono ? 'mono400' : peso >= 500 ? 'geist600' : 'geist400';
  const d = tabela[chave];
  let em = 0;
  for (const c of texto) em += d[c] ?? media[chave];
  return em * tamanho + espacamento * Math.max(0, [...texto].length - 1);
}

export function quebrar(texto, larguraMax, tamanho, opcoes = {}, maxLinhas = Infinity) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const linhas = [];
  let atual = '';
  for (const p of palavras) {
    const tentativa = atual ? `${atual} ${p}` : p;
    if (largura(tentativa, tamanho, opcoes) <= larguraMax || !atual) atual = tentativa;
    else { linhas.push(atual); atual = p; }
  }
  if (atual) linhas.push(atual);
  if (linhas.length > maxLinhas) {
    console.warn(`[painel] texto longo demais, cortado: "${texto.slice(0, 40)}…"`);
    const cortadas = linhas.slice(0, maxLinhas);
    let ultima = cortadas[maxLinhas - 1];
    while (ultima && largura(ultima + '…', tamanho, opcoes) > larguraMax) ultima = ultima.slice(0, -1).trimEnd();
    cortadas[maxLinhas - 1] = ultima + '…';
    return cortadas;
  }
  return linhas;
}

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

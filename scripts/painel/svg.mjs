// Gera o SVG do painel a partir de conteudo.json (textos) e dados-github.json
// (números). Nenhum número é escrito à mão aqui: tudo vem de `dados`.
import { largura, quebrar, esc } from './texto.mjs';

export const W = 880;
const PAD = 40;
const COL2 = 480; // início da coluna da direita nas seções de baixo

export const TEMAS = {
  escuro: {
    fundo: '#0d0d0d', texto: '#ededed', suave: '#a1a1a1', fraco: '#6e6e6e',
    linha: '#262626', celula: '#1a1a1a', acento: '#ff7a45', acentoTexto: '#ff8f63',
  },
  claro: {
    fundo: '#fafafa', texto: '#171717', suave: '#525252', fraco: '#8a8a8a',
    linha: '#e4e4e4', celula: '#ececec', acento: '#e8590c', acentoTexto: '#c2410c',
  },
};

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
// caracteres sempre incluídos na fonte, para o cache não mudar todo dia com os números
export const FIXOS_GEIST = '0123456789.,/:–— ' + MESES.join('') + 'atualizdoemdsplcçãõ';
export const FIXOS_MONO = '0123456789.,/: ' + MESES.join('') + 'atualizdoem';

const nf = new Intl.NumberFormat('pt-BR');
const ddmm = (iso) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date(iso));

// ---------- dados derivados ----------
const nivel = (n) => (n <= 0 ? 0 : n <= 3 ? 1 : n <= 9 ? 2 : n <= 24 ? 3 : 4);
const diaUTC = (s) => new Date(`${s}T00:00:00Z`);
const somaDias = (d, n) => new Date(d.getTime() + n * 864e5);
const isoDia = (d) => d.toISOString().slice(0, 10);

export function derivar(dados) {
  const dias = [...dados.contribuicoes.dias].sort((a, b) => (a[0] < b[0] ? -1 : 1));
  let seq = 0, maior = 0, ativos = 0;
  for (const [, n] of dias) {
    if (n > 0) { ativos++; seq++; maior = Math.max(maior, seq); } else seq = 0;
  }
  // grade dos últimos 6 meses = 26 semanas, colunas começando no domingo
  const mapa = new Map(dias);
  const ultimo = diaUTC(dias.at(-1)[0]);
  const inicio = somaDias(ultimo, -ultimo.getUTCDay() - 25 * 7);
  const grade = [];
  let total6m = 0;
  for (let c = 0; c < 26; c++)
    for (let r = 0; r < 7; r++) {
      const d = somaDias(inicio, c * 7 + r);
      if (d > ultimo) continue;
      const n = mapa.get(isoDia(d)) ?? 0;
      total6m += n;
      grade.push({ c, r, d, n, nivel: nivel(n) });
    }
  return { ativos, maiorSequencia: maior, grade, total6m };
}

// ---------- peças ----------
const T = (x, y, txt, { tam = 14, peso = 400, cor, mono = false, ancora, esp, id } = {}) =>
  `<text${id ? ` id="${id}"` : ''} x="${x}" y="${y}" font-size="${tam}"${peso !== 400 ? ` font-weight="${peso}"` : ''}${
    mono ? ' font-family="Geist Mono, ui-monospace, monospace"' : ''
  } fill="${cor}"${ancora ? ` text-anchor="${ancora}"` : ''}${esp ? ` letter-spacing="${esp}"` : ''}>${esc(txt)}</text>`;

const rotulo = (x, y, txt, t) => T(x, y, txt.toUpperCase(), { tam: 11, mono: true, cor: t.fraco, esp: 1.2 });

// setas desenhadas (a fonte não tem os glifos ↗ e →)
const setaDiag = (x, y, s, cor) =>
  `<path d="M${x} ${y}L${x + s} ${y - s}M${x + s * 0.35} ${y - s}H${x + s}V${y - s * 0.65}" stroke="${cor}" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const setaDir = (x, y, s, cor) =>
  `<path d="M${x} ${y}H${x + s}M${x + s - 4} ${y - 4}L${x + s} ${y}L${x + s - 4} ${y + 4}" stroke="${cor}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// ---------- render ----------
export function render({ conteudo: k, dados, tema, cssFontes = '', miniatura }) {
  const t = TEMAS[tema];
  const der = derivar(dados);
  const textos = { geist: new Set(), mono: new Set() }; // caracteres usados, para pedir a fonte
  const usa = (s, mono) => [...s].forEach((c) => textos[mono ? 'mono' : 'geist'].add(c));
  const out = [];
  const push = (s) => out.push(s);
  const tx = (x, y, s, o = {}) => (usa(s, o.mono), T(x, y, s, { cor: t.texto, ...o }));

  // ===== topo, esquerda =====
  const larguraEsq = 400;
  push(`<g class="a a1">`);
  push(tx(PAD, 76, k.nome, { tam: 30, peso: 600, esp: -0.6, id: 'nome' }));
  push(tx(PAD, 104, k.cargo, { tam: 13, mono: true, cor: t.suave, id: 'cargo' }));
  const frase = quebrar(k.frase, larguraEsq, 16, {}, 2);
  frase.forEach((l, i) => push(tx(PAD, 140 + i * 23, l, { tam: 16, cor: t.texto, id: `frase${i}` })));
  const yC = 140 + frase.length * 23 + 14;
  push(`<circle class="pulso" cx="${PAD + 4}" cy="${yC - 4}" r="4" fill="${t.acento}"/>`);
  push(`<circle cx="${PAD + 4}" cy="${yC - 4}" r="4" fill="${t.acento}"/>`);
  push(tx(PAD + 16, yC, k.construindo, { tam: 13, mono: true, cor: t.suave, id: 'construindo' }));
  push(`</g>`);

  // ===== topo, direita: mapa de contribuições =====
  const cel = 10, gap = 3, passo = cel + gap;
  const gx = W - PAD - (26 * passo - gap), gy = 70;
  const op = [0, 0.3, 0.52, 0.76, 1];
  push(`<g class="a a2">`);
  let ultimaCol = -9;
  for (const { c, d } of der.grade) {
    if (d.getUTCDate() === 1 && c - ultimaCol >= 3) {
      const nome = MESES[d.getUTCMonth()];
      push(tx(gx + c * passo, gy - 10, nome, { tam: 11, mono: true, cor: t.fraco }));
      ultimaCol = c;
    }
  }
  for (const { c, r, nivel: nv } of der.grade) {
    const fill = nv === 0 ? `fill="${t.celula}"` : `fill="${t.acento}" fill-opacity="${op[nv]}"`;
    push(`<rect x="${gx + c * passo}" y="${gy + r * passo}" width="${cel}" height="${cel}" rx="2" ${fill}/>`);
  }
  const yTot = gy + 7 * passo + 22;
  const totalTxt = nf.format(dados.contribuicoes.total);
  push(tx(gx, yTot, totalTxt, { tam: 13, mono: true, peso: 400, cor: t.acentoTexto, id: 'total' }));
  push(tx(gx + largura(totalTxt, 13, { mono: true }) + 8, yTot, 'contribuições em 12 meses', { tam: 13, cor: t.suave }));
  // legenda só com os 5 níveis (0 · 1–3 · 4–9 · 10–24 · 25+), alinhada à direita do mapa
  const xq = W - PAD - (5 * 12 - 3);
  for (let i = 0; i < 5; i++) {
    const fill = i === 0 ? `fill="${t.celula}"` : `fill="${t.acento}" fill-opacity="${op[i]}"`;
    push(`<rect x="${xq + i * 12}" y="${yTot - 9}" width="9" height="9" rx="2" ${fill}/>`);
  }
  push(`</g>`);

  // ===== seção 2: o que eu faço / em números =====
  const y2 = Math.max(yC, yTot) + 30;
  push(`<line x1="${PAD}" y1="${y2}" x2="${W - PAD}" y2="${y2}" stroke="${t.linha}"/>`);
  push(`<g class="a a3">`);
  push(rotulo(PAD, y2 + 34, 'O que eu faço', t)); usa('O QUE EU FAÇO', true);
  k.faco.slice(0, 3).forEach((item, i) => {
    const y = y2 + 66 + i * 30;
    push(`<line x1="${PAD}" y1="${y - 5}" x2="${PAD + 10}" y2="${y - 5}" stroke="${t.acento}" stroke-width="1.5"/>`);
    const l = quebrar(item, COL2 - PAD - 60, 15, {}, 1)[0];
    push(tx(PAD + 22, y, l, { tam: 15, id: `faco${i}` }));
  });

  push(rotulo(COL2, y2 + 34, 'Em números', t)); usa('EM NÚMEROS', true);
  const numeros = [
    [dados.perfil.repositoriosPublicos, 'repositórios públicos'],
    [dados.perfil.seguidores, 'seguidores'],
    [der.ativos, 'dias com contribuição'],
    [der.maiorSequencia, 'dias seguidos (recorde)'],
  ];
  numeros.forEach(([v, r], i) => {
    const x = COL2 + (i % 2) * 190, y = y2 + 74 + Math.floor(i / 2) * 54;
    push(tx(x, y, nf.format(v), { tam: 26, peso: 600, esp: -0.5, id: `num${i}` }));
    push(tx(x, y + 20, r, { tam: 12.5, cor: t.suave }));
  });
  push(`</g>`);

  // ===== seção 3: projeto em destaque / stack + chamada =====
  const y3 = y2 + 186;
  push(`<line x1="${PAD}" y1="${y3}" x2="${W - PAD}" y2="${y3}" stroke="${t.linha}"/>`);
  push(`<g class="a a4">`);
  push(rotulo(PAD, y3 + 34, 'Projeto em destaque', t)); usa('PROJETO EM DESTAQUE', true);
  const mw = 168, mh = 105, my = y3 + 52;
  if (miniatura) {
    push(`<clipPath id="mini"><rect x="${PAD}" y="${my}" width="${mw}" height="${mh}" rx="6"/></clipPath>`);
    push(`<image href="data:image/webp;base64,${miniatura}" x="${PAD}" y="${my}" width="${mw}" height="${mh}" preserveAspectRatio="xMidYMid slice" clip-path="url(#mini)"/>`);
  }
  push(`<rect x="${PAD + 0.5}" y="${my + 0.5}" width="${mw - 1}" height="${mh - 1}" rx="6" fill="none" stroke="${t.linha}"/>`);
  const px = PAD + mw + 20, pw = COL2 - px - 22;
  push(tx(px, my + 16, k.projeto.nome, { tam: 18, peso: 600, esp: -0.3, id: 'projNome' }));
  quebrar(k.projeto.descricao, pw, 13.5, {}, 3).forEach((l, i) =>
    push(tx(px, my + 42 + i * 20, l, { tam: 13.5, cor: t.suave, id: `projDesc${i}` }))
  );
  const lt = k.projeto.linkTexto;
  push(tx(px, my + mh - 2, lt, { tam: 12.5, mono: true, cor: t.acentoTexto, id: 'projLink' }));
  push(setaDiag(px + largura(lt, 12.5, { mono: true }) + 5, my + mh - 3, 7, t.acentoTexto));

  push(rotulo(COL2, y3 + 34, 'Stack do dia a dia', t)); usa('STACK DO DIA A DIA', true);
  let xp = COL2, yp = y3 + 52;
  for (const s of k.stack) {
    const w = largura(s, 12, { mono: true }) + 22;
    if (xp + w > W - PAD) { xp = COL2; yp += 34; }
    push(`<rect x="${xp + 0.5}" y="${yp + 0.5}" width="${w - 1}" height="25" rx="12.5" fill="none" stroke="${t.linha}"/>`);
    push(tx(xp + 11, yp + 17, s, { tam: 12, mono: true, cor: t.suave }));
    xp += w + 8;
  }
  push(`</g>`);

  // chamada para a landing: alinhada à base da miniatura
  const yCta = Math.max(my + mh, yp + 25 + 48); // nunca encosta nas pílulas
  push(`<g class="a a5">`);
  push(tx(COL2, yCta - 22, k.chamada.titulo, { tam: 14, cor: t.texto, id: 'ctaTitulo' }));
  push(tx(COL2, yCta - 2, k.chamada.texto, { tam: 14, peso: 600, cor: t.acentoTexto, id: 'ctaLink' }));
  push(setaDir(COL2 + largura(k.chamada.texto, 14, { peso: 600 }) + 8, yCta - 7, 14, t.acentoTexto));
  push(`</g>`);

  // ===== rodapé =====
  const yR = yCta + 34;
  const H = yR + 34;
  push(`<line x1="${PAD}" y1="${yR}" x2="${W - PAD}" y2="${yR}" stroke="${t.linha}"/>`);
  const quando = dados.exemplo ? 'dados de exemplo — não publicar' : `atualizado em ${ddmm(dados.lidoEm)}`;
  push(tx(PAD, yR + 22, quando, { tam: 11, mono: true, cor: dados.exemplo ? t.acentoTexto : t.fraco, id: 'atualizado' }));
  push(tx(W - PAD, yR + 22, `github.com/${dados.usuario}`, { tam: 11, mono: true, cor: t.fraco, ancora: 'end' }));

  const desc = `${k.nome} — ${k.cargo}. ${nf.format(dados.contribuicoes.total)} contribuições no GitHub nos últimos 12 meses, ${dados.perfil.repositoriosPublicos} repositórios públicos. Projeto em destaque: ${k.projeto.nome}.`;

  const css = `${cssFontes}
.a{animation:surgir .7s cubic-bezier(.2,.7,.2,1) both}
.a2{animation-delay:.12s}.a3{animation-delay:.24s}.a4{animation-delay:.36s}.a5{animation-delay:.48s}
.pulso{transform-box:fill-box;transform-origin:center;animation:pulso 2.4s ease-out infinite}
@keyframes surgir{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes pulso{0%{opacity:.55;transform:scale(1)}80%,100%{opacity:0;transform:scale(3)}}
@media (prefers-reduced-motion:reduce){.a,.pulso{animation:none}.pulso{opacity:0}}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="titulo desc">
<title id="titulo">${esc(k.nome)} — painel do GitHub</title>
<desc id="desc">${esc(desc)}</desc>
<style>${css}</style>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.fundo}" stroke="${t.linha}"/>
<g font-family="Geist, ui-sans-serif, system-ui, sans-serif">
${out.join('\n')}
</g>
</svg>
`;
  return { svg, altura: H, textos };
}

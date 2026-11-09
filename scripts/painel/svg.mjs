import { largura, quebrar, esc } from './texto.mjs';

export const W = 880;
const PAD = 40;
const COL2 = 480;

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

const MESES = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const FRASES_FIXAS = 'updated on sample data — do not publish contributions in the last 12 months';
export const FIXOS_GEIST = '0123456789.,/:–— ' + MESES.join('') + FRASES_FIXAS;
export const FIXOS_MONO = '0123456789.,/: ' + MESES.join('') + FRASES_FIXAS;

const nf = new Intl.NumberFormat('en-US');
const ddmm = (iso) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date(iso));

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

const T = (x, y, txt, { tam = 14, peso = 400, cor, mono = false, ancora, esp, id } = {}) =>
  `<text${id ? ` id="${id}"` : ''} x="${x}" y="${y}" font-size="${tam}"${peso !== 400 ? ` font-weight="${peso}"` : ''}${
    mono ? ' font-family="Geist Mono, ui-monospace, monospace"' : ''
  } fill="${cor}"${ancora ? ` text-anchor="${ancora}"` : ''}${esp ? ` letter-spacing="${esp}"` : ''}>${esc(txt)}</text>`;

const rotulo = (x, y, txt, t) => T(x, y, txt.toUpperCase(), { tam: 11, mono: true, cor: t.fraco, esp: 1.2 });

const setaDiag = (x, y, s, cor) =>
  `<path d="M${x} ${y}L${x + s} ${y - s}M${x + s * 0.35} ${y - s}H${x + s}V${y - s * 0.65}" stroke="${cor}" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const setaDir = (x, y, s, cor) =>
  `<path d="M${x} ${y}H${x + s}M${x + s - 4} ${y - 4}L${x + s} ${y}L${x + s - 4} ${y + 4}" stroke="${cor}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

export function render({ conteudo: k, dados, tema, cssFontes = '', miniatura }) {
  const t = TEMAS[tema];
  const der = derivar(dados);
  const textos = { geist: new Set(), mono: new Set() }; // caracteres usados, para pedir a fonte
  const usa = (s, mono) => [...s].forEach((c) => textos[mono ? 'mono' : 'geist'].add(c));
  const out = [];
  const push = (s) => out.push(s);
  const tx = (x, y, s, o = {}) => (usa(s, o.mono), T(x, y, s, { cor: t.texto, ...o }));

  const larguraEsq = 400;
  push(`<g class="a a1">`);
  push(tx(PAD, 76, k.nome, { tam: 30, peso: 600, esp: -0.6, id: 'nome' }));
  push(tx(PAD, 106, k.cargo, { tam: 13, mono: true, cor: t.suave, id: 'cargo' }));
  const frase = quebrar(k.frase, larguraEsq, 16, {}, 2);
  frase.forEach((l, i) => push(tx(PAD, 146 + i * 25, l, { tam: 16, cor: t.texto, id: `frase${i}` })));
  let yC = 146 + (frase.length - 1) * 25;
  if (k.formacao) {
    yC += 34;
    // capelo de formatura
    const cx = PAD + 7, cy = yC - 6;
    push(`<path d="M${cx - 7} ${cy - 2}L${cx} ${cy - 5.5}L${cx + 7} ${cy - 2}L${cx} ${cy + 1.5}Z" fill="${t.acento}"/>`);
    push(`<path d="M${cx - 4} ${cy}V${cy + 3.2}Q${cx} ${cy + 5.8} ${cx + 4} ${cy + 3.2}V${cy}" fill="none" stroke="${t.acento}" stroke-width="1.4" stroke-linejoin="round"/>`);
    const curso = quebrar(k.formacao.curso, larguraEsq - 22, 14, { peso: 600 }, 1)[0];
    push(tx(PAD + 22, yC, curso, { tam: 14, peso: 600, id: 'formacaoCurso' }));
    yC += 20;
    push(tx(PAD + 22, yC, k.formacao.detalhe, { tam: 12, mono: true, cor: t.suave, id: 'formacaoDetalhe' }));
  }
  push(`</g>`);

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
  push(tx(gx + largura(totalTxt, 13, { mono: true }) + 8, yTot, 'contributions in the last 12 months', { tam: 13, cor: t.suave }));

  const xq = W - PAD - (5 * 12 - 3);
  for (let i = 0; i < 5; i++) {
    const fill = i === 0 ? `fill="${t.celula}"` : `fill="${t.acento}" fill-opacity="${op[i]}"`;
    push(`<rect x="${xq + i * 12}" y="${yTot - 9}" width="9" height="9" rx="2" ${fill}/>`);
  }
  push(`</g>`);

  const y2 = Math.max(yC, yTot) + 36;
  push(`<line x1="${PAD}" y1="${y2}" x2="${W - PAD}" y2="${y2}" stroke="${t.linha}"/>`);
  push(`<g class="a a3">`);
  push(rotulo(PAD, y2 + 36, 'What I do', t)); usa('WHAT I DO', true);
  k.faco.slice(0, 3).forEach((item, i) => {
    const y = y2 + 78 + i * 38;
    push(`<line x1="${PAD}" y1="${y - 5}" x2="${PAD + 10}" y2="${y - 5}" stroke="${t.acento}" stroke-width="1.5"/>`);
    const l = quebrar(item, COL2 - PAD - 60, 15, {}, 1)[0];
    push(tx(PAD + 22, y, l, { tam: 15, id: `faco${i}` }));
  });

  push(rotulo(COL2, y2 + 36, 'By the numbers', t)); usa('BY THE NUMBERS', true);
  const numeros = [
    [dados.perfil.repositoriosPublicos, 'public repositories'],
    [dados.perfil.seguidores, 'followers'],
    [der.ativos, 'days with contributions'],
    [der.maiorSequencia, 'day streak (record)'],
  ];
  const gapCard = 12, cw = (W - PAD - COL2 - gapCard) / 2, ch = 64, cy0 = y2 + 54;
  numeros.forEach(([v, r], i) => {
    const x = COL2 + (i % 2) * (cw + gapCard), y = cy0 + Math.floor(i / 2) * (ch + gapCard);
    push(`<rect x="${x + 0.5}" y="${y + 0.5}" width="${cw - 1}" height="${ch - 1}" rx="8" fill="${t.celula}" fill-opacity="0.55" stroke="${t.linha}"/>`);
    push(tx(x + 14, y + 29, nf.format(v), { tam: 22, peso: 600, esp: -0.5, id: `num${i}` }));
    push(tx(x + 14, y + 49, r, { tam: 12, cor: t.suave }));
  });
  push(`</g>`);

  const y3 = Math.max(cy0 + 2 * ch + gapCard, y2 + 78 + 2 * 38) + 36;
  push(`<line x1="${PAD}" y1="${y3}" x2="${W - PAD}" y2="${y3}" stroke="${t.linha}"/>`);
  push(`<g class="a a4">`);
  push(rotulo(PAD, y3 + 36, 'Featured project', t)); usa('FEATURED PROJECT', true);
  const mw = 168, mh = 105, my = y3 + 56;
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

  push(rotulo(COL2, y3 + 36, 'Everyday stack', t)); usa('EVERYDAY STACK', true);
  let xp = COL2, yp = y3 + 56;
  for (const s of k.stack) {
    const w = largura(s, 12, { mono: true }) + 22;
    if (xp + w > W - PAD) { xp = COL2; yp += 34; }
    push(`<rect x="${xp + 0.5}" y="${yp + 0.5}" width="${w - 1}" height="25" rx="12.5" fill="none" stroke="${t.linha}"/>`);
    push(tx(xp + 11, yp + 17, s, { tam: 12, mono: true, cor: t.suave }));
    xp += w + 8;
  }
  push(`</g>`);

  const yCta = Math.max(my + mh, yp + 25 + 48); // nunca encosta nas pílulas
  push(`<g class="a a5">`);
  push(tx(COL2, yCta - 22, k.chamada.titulo, { tam: 14, cor: t.texto, id: 'ctaTitulo' }));
  push(tx(COL2, yCta - 2, k.chamada.texto, { tam: 14, peso: 600, cor: t.acentoTexto, id: 'ctaLink' }));
  push(setaDir(COL2 + largura(k.chamada.texto, 14, { peso: 600 }) + 8, yCta - 7, 14, t.acentoTexto));
  push(`</g>`);

  const yR = yCta + 38;
  const H = yR + 36;
  push(`<line x1="${PAD}" y1="${yR}" x2="${W - PAD}" y2="${yR}" stroke="${t.linha}"/>`);
  const quando = dados.exemplo ? 'sample data — do not publish' : `updated on ${ddmm(dados.lidoEm)}`;
  push(tx(PAD, yR + 22, quando, { tam: 11, mono: true, cor: dados.exemplo ? t.acentoTexto : t.fraco, id: 'atualizado' }));
  push(tx(W - PAD, yR + 22, `github.com/${dados.usuario}`, { tam: 11, mono: true, cor: t.fraco, ancora: 'end' }));

  const desc = `${k.nome} — ${k.cargo}.${k.formacao ? ` ${k.formacao.curso} — ${k.formacao.detalhe}.` : ''} ${nf.format(dados.contribuicoes.total)} GitHub contributions in the last 12 months, ${dados.perfil.repositoriosPublicos} public repositories. Featured project: ${k.projeto.nome}.`;

  const css = `${cssFontes}
.a{animation:surgir .7s cubic-bezier(.2,.7,.2,1) both}
.a2{animation-delay:.12s}.a3{animation-delay:.24s}.a4{animation-delay:.36s}.a5{animation-delay:.48s}
@keyframes surgir{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.a{animation:none}}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="titulo desc">
<title id="titulo">${esc(k.nome)} — GitHub panel</title>
<desc id="desc">${esc(desc)}</desc>
<style>${css}</style>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.fundo}" stroke="${t.linha}"/>
<g font-family="Montserrat, ui-sans-serif, system-ui, sans-serif">
${out.join('\n')}
</g>
</svg>
`;
  return { svg, altura: H, textos };
}

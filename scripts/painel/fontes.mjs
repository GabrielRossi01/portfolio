import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

export const chaveFonte = (familia, pesos, texto) =>
  createHash('sha256').update(`${familia}|${pesos}|${texto}`).digest('hex').slice(0, 16);

async function baixar(familia, pesos, texto) {
  const url = `https://fonts.googleapis.com/css2?family=${familia.replace(/ /g, '+')}:wght@${pesos}&text=${encodeURIComponent(texto)}&display=block`;
  const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`Google Fonts ${familia} → HTTP ${r.status}`);
  let css = await r.text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]);
  if (!urls.length) throw new Error(`Google Fonts ${familia}: CSS sem url()`);
  for (const u of urls) {
    const f = await fetch(u, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) });
    if (!f.ok) throw new Error(`fonte ${u} → HTTP ${f.status}`);
    const b64 = Buffer.from(await f.arrayBuffer()).toString('base64');
    css = css.replace(u, `data:font/woff2;base64,${b64}`);
  }
  return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
}

export async function fontesEmbutidas(pedidos, caminhoCache) {
  const cache = existsSync(caminhoCache) ? JSON.parse(readFileSync(caminhoCache, 'utf8')) : {};
  let mudou = false;
  const blocos = [];
  for (const { familia, pesos, texto } of pedidos) {
    const chave = chaveFonte(familia, pesos, texto);
    let item = cache[familia];
    if (item?.chave !== chave) {
      try {
        item = { chave, css: await baixar(familia, pesos, texto) };
        cache[familia] = item;
        mudou = true;
      } catch (e) {
        if (!item) throw e;
        console.warn(`[painel] ${e.message} — usando fonte do cache (pode faltar caractere novo)`);
      }
    }
    blocos.push(item.css);
  }
  if (mudou) writeFileSync(caminhoCache, JSON.stringify(cache, null, 1) + '\n');
  return blocos.join('\n');
}

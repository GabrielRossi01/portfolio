#!/usr/bin/env node
// Roda no "prebuild" da landing. Sem dependências.
//  1. lê o GitHub (se houver GITHUB_TOKEN_LEITURA) e grava painel/dados-github.json
//  2. gera public/readme/painel-escuro.svg e painel-claro.svg
// Qualquer falha de rede mantém o JSON/SVG anteriores (commitados) e o build segue.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lerGithub } from './github.mjs';
import { fontesEmbutidas } from './fontes.mjs';
import { render, FIXOS_GEIST, FIXOS_MONO } from './svg.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arq = (...p) => join(raiz, ...p);
const PASTA_PUBLICA = process.env.PAINEL_PASTA_PUBLICA ?? 'public'; // "static" no SvelteKit, etc.
const lerJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

async function principal() {
  const args = new Set(process.argv.slice(2));
  const conteudo = lerJson(arq('painel', 'conteudo.json'));
  const caminhoDados = process.env.PAINEL_DADOS ?? arq('painel', 'dados-github.json');

  // 1. dados
  const token = process.env.GITHUB_TOKEN_LEITURA;
  if (args.has('--sem-rede')) console.log('[painel] --sem-rede: usando o JSON existente');
  else if (!token) console.warn('[painel] GITHUB_TOKEN_LEITURA ausente: mantendo dados anteriores');
  else {
    try {
      const novos = await lerGithub(conteudo.usuario, token);
      writeFileSync(caminhoDados, JSON.stringify(novos, null, 1) + '\n');
      console.log(`[painel] GitHub lido: ${novos.contribuicoes.total} contribuições, ${novos.perfil.repositoriosPublicos} repos`);
    } catch (e) {
      console.warn(`[painel] falha ao ler o GitHub (${e.message}): mantendo dados anteriores`);
    }
  }
  if (!existsSync(caminhoDados)) {
    console.warn('[painel] sem dados-github.json: mantendo os SVG que já existem');
    return;
  }
  const dados = lerJson(caminhoDados);
  if (dados.exemplo && (process.env.VERCEL || process.env.CI)) {
    console.warn('[painel] dados de EXEMPLO em build de produção/CI: SVG não será regerado');
    return;
  }

  // 2. imagem do projeto (webp pequeno, commitado)
  let miniatura;
  if (conteudo.projeto.miniatura) {
    const buf = readFileSync(arq(conteudo.projeto.miniatura));
    if (buf.length > 20_000) console.warn(`[painel] miniatura com ${Math.round(buf.length / 1024)} KB — o ideal é ~15 KB`);
    miniatura = buf.toString('base64');
  }

  // 3. caracteres usados (os dois temas têm o mesmo texto) → fonte só com eles
  const { textos } = render({ conteudo, dados, tema: 'escuro' });
  const juntar = (set, fixos) => [...new Set([...set, ...fixos])].sort().join('');
  const pedidos = [
    { familia: 'Geist', pesos: '400..600', texto: juntar(textos.geist, FIXOS_GEIST) },
    { familia: 'Geist Mono', pesos: '400', texto: juntar(textos.mono, FIXOS_MONO) },
  ];
  if (args.has('--listar-texto')) { console.log(JSON.stringify(pedidos)); return; }

  let cssFontes = '';
  try {
    cssFontes = await fontesEmbutidas(pedidos, arq('painel', 'fontes-cache.json'));
  } catch (e) {
    console.warn(`[painel] sem fonte embutida (${e.message}): o SVG cai na fonte do sistema`);
  }

  // 4. SVG
  const destino = arq(PASTA_PUBLICA, 'readme');
  mkdirSync(destino, { recursive: true });
  for (const tema of ['escuro', 'claro']) {
    const { svg } = render({ conteudo, dados, tema, cssFontes, miniatura });
    writeFileSync(join(destino, `painel-${tema}.svg`), svg);
    console.log(`[painel] ${PASTA_PUBLICA}/readme/painel-${tema}.svg (${Math.round(svg.length / 1024)} KB)`);
  }
}

principal().catch((e) => {
  // nunca derruba o build da landing
  console.warn(`[painel] erro inesperado, SVG anterior mantido: ${e.stack ?? e}`);
});

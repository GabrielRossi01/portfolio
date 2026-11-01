# Painel do README do GitHub

O portfólio (rossidev.vercel.app) gera e serve o painel do README do perfil:

- `https://rossidev.vercel.app/readme/painel-escuro.svg`
- `https://rossidev.vercel.app/readme/painel-claro.svg`

## Como funciona

1. No build, `scripts/painel/atualizar.mjs` lê o GitHub com `GITHUB_TOKEN_LEITURA`:
   - o perfil (`/users/GabrielRossi01`);
   - as contribuições do último ano (GraphQL).
2. Grava esses dados em `painel/dados-github.json`.
3. Gera os dois SVG em `public/readme/`. Cada SVG já traz embutidos:
   - a fonte, com só os caracteres usados;
   - a miniatura do projeto.
4. Uma vez por dia, o Vercel Cron chama `/api/atualizar-painel`. Essa rota dispara o Deploy Hook, e o novo deploy refaz o passo 1.
5. Se o token faltar ou o GitHub falhar, o build **não quebra**: usa o JSON e os SVG anteriores.

Os textos ficam em `painel/conteudo.json` e a miniatura em `painel/projeto.webp`, com no máximo 15 KB. Os números sempre saem do GitHub.

## Passo a passo (uma vez)

### 1. Copiar os arquivos para o repositório do portfólio

Copie estes arquivos:
- `scripts/painel/` inteiro;
- `painel/conteudo.json`, `painel/projeto.webp` e `painel/fontes-cache.json`;
- `app/api/atualizar-painel/route.ts`;
- `vercel.json`. Se o portfólio já tiver um, junte as chaves `headers` e `crons`.

Se o portfólio usa **Pages Router** (pasta `pages/`) em vez de `app/`, crie `pages/api/atualizar-painel.ts` com:

```ts
export default async function handler(req, res) {
  const segredo = process.env.CRON_SECRET;
  if (!segredo || req.headers.authorization !== `Bearer ${segredo}`) return res.status(401).end();
  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (!hook) return res.status(500).json({ erro: 'VERCEL_DEPLOY_HOOK ausente' });
  const r = await fetch(hook, { method: 'POST' });
  res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
```

### 2. Rodar o script antes do build

No `package.json`, altere o script de build:

```json
"build": "node scripts/painel/atualizar.mjs && next build"
```

Use isso em vez de `prebuild`: com pnpm, `prebuild` não roda sozinho.

### 3. Criar o token do GitHub (só leitura)

1. Acesse GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → *Generate new token*.
2. Preencha:
   - **Nome:** `painel-readme`.
   - **Expiração:** a mais longa que você aceitar. Anote a data: quando o token vencer, o painel congela nos últimos números.
   - **Repository access:** *Public repositories (read-only)*.
   - **Permissions:** nenhuma extra. Perfil e contribuições públicas já são lidos assim.
3. Copie o token. Ele começa com `github_pat_`.

As contribuições em repositórios privados só entram no total se, no seu perfil, a opção **"Include private contributions on my profile"** estiver ligada.

### 4. Criar as variáveis na Vercel

Vá em Vercel → projeto do portfólio → Settings → Environment Variables. Crie as três variáveis com o ambiente **Production**:

| Nome | Valor |
|---|---|
| `GITHUB_TOKEN_LEITURA` | o token do passo 3 (marque como *Sensitive*) |
| `CRON_SECRET` | uma senha aleatória longa (ex.: saída de `openssl rand -hex 32`) |
| `VERCEL_DEPLOY_HOOK` | a URL do passo 5 |

Nenhuma delas tem prefixo `NEXT_PUBLIC_`, então nada vai para o navegador.

### 5. Criar o Deploy Hook

1. Vá em Vercel → projeto → Settings → Git → **Deploy Hooks**.
2. Use o nome `painel-diario` e a branch `main` (ou a sua branch de produção).
3. Copie a URL gerada para `VERCEL_DEPLOY_HOOK`.

### 6. Fazer deploy e conferir

Depois do deploy, rode:

```bash
curl -sI https://rossidev.vercel.app/readme/painel-escuro.svg | grep -iE '^(HTTP|content-type|cache-control)'
```

Os três valores precisam ser:
- `HTTP/2 200`;
- `content-type: image/svg+xml`;
- `cache-control: public, max-age=3600`.

Confira sempre o **content-type**, não só o status. Uma página de erro também pode responder 200, mas com `text/html`.

Abra a URL no navegador. O rodapé deve mostrar **"atualizado em dd/mm"**, com a data de hoje.

Se aparecer "dados de exemplo", o token não funcionou: veja o log do build e procure as linhas `[painel]`.

### 7. Só então trocar o README do perfil

Substitua `README.md` do repositório `GabrielRossi01/GabrielRossi01` pelo novo.

## Manutenção

- **Mudar textos:** edite `painel/conteudo.json` e faça commit. Se aparecerem caracteres novos, o script baixa a fonte de novo e atualiza `painel/fontes-cache.json` só durante o build. Para não depender da rede, rode o script localmente e commite o cache atualizado.
- **Mudar o projeto em destaque:** troque `painel/projeto.webp` por um webp de 504×315 (até cerca de 15 KB).
- **Atualizar na hora, sem esperar o cron:** faça um redeploy pela Vercel ou rode `curl -X POST "<URL do Deploy Hook>"`.
- **Cron no plano Hobby:** roda uma vez por dia (`0 9 * * *`, 6h em São Paulo), com variação de até uma hora.
- **Cache do GitHub:** o proxy de imagens do GitHub (camo) pode levar até cerca de 1 hora para mostrar o SVG novo.

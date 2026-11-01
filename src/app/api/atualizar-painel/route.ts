// Chamado pelo Vercel Cron 1x por dia (vercel.json). Dispara um novo deploy
// pelo Deploy Hook; o build roda scripts/painel/atualizar.mjs e regera o SVG.
// A Vercel manda "Authorization: Bearer <CRON_SECRET>" nas chamadas do cron.
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const segredo = process.env.CRON_SECRET;
  if (!segredo || req.headers.get('authorization') !== `Bearer ${segredo}`) {
    return new Response('não autorizado', { status: 401 });
  }
  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (!hook) return Response.json({ ok: false, erro: 'VERCEL_DEPLOY_HOOK ausente' }, { status: 500 });

  const r = await fetch(hook, { method: 'POST', signal: AbortSignal.timeout(10000) });
  return Response.json({ ok: r.ok, status: r.status }, { status: r.ok ? 200 : 502 });
}

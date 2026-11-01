// Leitura dos dados do GitHub. Só o necessário vai para o JSON (contagens),
// nunca o token nem cabeçalhos.
const API = 'https://api.github.com';

function cabecalhos(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'painel-readme',
  };
}

async function pedir(url, init) {
  const r = await fetch(url, { ...init, signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`${init?.method ?? 'GET'} ${url} → HTTP ${r.status}`);
  return r.json();
}

const CONSULTA = `
query ($login: String!, $de: DateTime!, $ate: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $de, to: $ate) {
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

export async function lerGithub(usuario, token) {
  const ate = new Date();
  const de = new Date(ate);
  de.setUTCFullYear(de.getUTCFullYear() - 1);

  const [perfil, gql] = await Promise.all([
    pedir(`${API}/users/${encodeURIComponent(usuario)}`, { headers: cabecalhos(token) }),
    pedir(`${API}/graphql`, {
      method: 'POST',
      headers: { ...cabecalhos(token), 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: CONSULTA, variables: { login: usuario, de: de.toISOString(), ate: ate.toISOString() } }),
    }),
  ]);

  if (gql.errors?.length) throw new Error(`GraphQL: ${gql.errors.map((e) => e.message).join('; ')}`);
  const col = gql.data?.user?.contributionsCollection;
  const cal = col?.contributionCalendar;
  if (!cal || !Array.isArray(cal.weeks) || cal.weeks.length < 26) throw new Error('GraphQL: calendário ausente ou incompleto');
  if (typeof perfil.public_repos !== 'number') throw new Error('REST: perfil sem public_repos');

  return {
    lidoEm: ate.toISOString(),
    usuario: perfil.login,
    perfil: {
      nome: perfil.name,
      repositoriosPublicos: perfil.public_repos,
      seguidores: perfil.followers,
      contaCriadaEm: perfil.created_at,
    },
    contribuicoes: {
      total: cal.totalContributions,
      privadasNaoVisiveis: col.restrictedContributionsCount,
      // achatado em dias; a semana (coluna) é recalculada no render
      dias: cal.weeks.flatMap((w) => w.contributionDays.map((d) => [d.date, d.contributionCount])),
    },
  };
}

// Contribuições reais do GitHub para o card GithubActivity. O token fica só no
// servidor; ?year=YYYY escolhe um ano e, sem parâmetro, vêm os últimos 12 meses.
const LOGIN = "GabrielRossi01";
const REVALIDATE_SECONDS = 3600;
const FIRST_GITHUB_YEAR = 2008;

const QUERY = `
query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionYears
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type GithubDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

function streaks(days: GithubDay[]) {
  let longest = 0;
  let running = 0;
  for (const day of days) {
    running = day.contributionCount > 0 ? running + 1 : 0;
    longest = Math.max(longest, running);
  }

  // Hoje ainda não terminou: um dia atual zerado não interrompe a sequência.
  let end = days.length - 1;
  if (end >= 0 && days[end].contributionCount === 0) end -= 1;
  let current = 0;
  while (end >= 0 && days[end].contributionCount > 0) {
    current += 1;
    end -= 1;
  }

  return { current, longest };
}

export async function GET(req: Request) {
  const token = process.env.GITHUB_TOKEN_LEITURA;
  if (!token) {
    console.error("[github-activity] GITHUB_TOKEN_LEITURA ausente");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const currentYear = now.getUTCFullYear();
  const yearParam = new URL(req.url).searchParams.get("year");
  const year = yearParam === null ? null : Number(yearParam);

  if (
    year !== null &&
    (!Number.isInteger(year) || year < FIRST_GITHUB_YEAR || year > currentYear)
  ) {
    return Response.json({ error: "invalid year" }, { status: 400 });
  }

  // Limites por dia, não por instante: assim o cache do fetch vale o dia inteiro.
  let from: string;
  let to = `${today}T23:59:59Z`;
  if (year === null) {
    const start = new Date(`${today}T00:00:00Z`);
    start.setUTCFullYear(start.getUTCFullYear() - 1);
    start.setUTCDate(start.getUTCDate() + 1);
    from = start.toISOString();
  } else {
    from = `${year}-01-01T00:00:00Z`;
    if (year < currentYear) to = `${year}-12-31T23:59:59Z`;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-activity",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: LOGIN, from, to },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const body = await response.json();
    if (body.errors?.length) {
      throw new Error(
        body.errors.map((e: { message: string }) => e.message).join("; "),
      );
    }

    const collection = body.data?.user?.contributionsCollection;
    const calendar = collection?.contributionCalendar;
    if (!calendar) throw new Error("calendário ausente");

    const rawWeeks: { contributionDays: GithubDay[] }[] = calendar.weeks;
    const allDays = rawWeeks.flatMap((week) => week.contributionDays);
    const { current, longest } = streaks(allDays);

    return Response.json(
      {
        years: collection.contributionYears as number[],
        total: calendar.totalContributions as number,
        from: allDays[0]?.date ?? from.slice(0, 10),
        to: allDays[allDays.length - 1]?.date ?? to.slice(0, 10),
        // A sequência atual só faz sentido em períodos que chegam até hoje.
        currentStreak: year === null || year === currentYear ? current : null,
        longestStreak: longest,
        weeks: rawWeeks.map((week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
            level: LEVELS[day.contributionLevel] ?? 0,
          })),
        ),
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      },
    );
  } catch (error) {
    console.error("[github-activity] falha ao ler o GitHub:", error);
    return Response.json({ error: "unavailable" }, { status: 502 });
  }
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import {
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PROFILE_URL = "https://github.com/GabrielRossi01";
const LAST_YEAR = "last";

type Day = { date: string; count: number; level: number };

type ActivityData = {
  years: number[];
  total: number;
  from: string;
  to: string;
  currentStreak: number | null;
  longestStreak: number;
  weeks: Day[][];
};

type Tooltip = { x: number; y: number; title: string; subtitle: string };

const LEVEL_CLASSES = [
  "bg-black/6 dark:bg-white/6",
  "bg-orange-200 dark:bg-[#5c3517]",
  "bg-orange-300 dark:bg-[#8a5020]",
  "bg-orange-500 dark:bg-[#c4722b]",
  "bg-orange-700 dark:bg-[#f59340]",
];

const cardClasses =
  "relative rounded-3xl border border-black/10 bg-white/70 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-8 dark:border-white/10 dark:bg-[#0a0a0a] dark:shadow-none";

const profileLinkClasses =
  "inline-flex min-h-10 w-fit shrink-0 cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm font-normal text-gray-800 transition hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/10";

const parseDate = (date: string) => new Date(`${date}T00:00:00Z`);

export default function GithubActivity() {
  const { t, language } = useLanguage();
  const copy = t.githubActivity;

  const [period, setPeriod] = useState(LAST_YEAR);
  const [data, setData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const cache = useRef(new Map<string, ActivityData>());
  const rootRef = useRef<HTMLDivElement>(null);
  const heatmapScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cached = cache.current.get(period);
    if (cached) {
      setData(cached);
      setFailed(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setFailed(false);

    const query = period === LAST_YEAR ? "" : `?year=${period}`;
    fetch(`/api/github-activity${query}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<ActivityData>;
      })
      .then((result) => {
        cache.current.set(period, result);
        setData(result);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error("Erro ao carregar atividade do GitHub:", error);
        setFailed(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [period, attempt]);

  useLayoutEffect(() => {
    const scroller = heatmapScrollRef.current;
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, [data]);

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(language),
      decimal: new Intl.NumberFormat(language, { maximumFractionDigits: 1 }),
      month: new Intl.DateTimeFormat(language, {
        month: "short",
        timeZone: "UTC",
      }),
      weekday: new Intl.DateTimeFormat(language, {
        weekday: "short",
        timeZone: "UTC",
      }),
      date: new Intl.DateTimeFormat(language, {
        dateStyle: "medium",
        timeZone: "UTC",
      }),
    }),
    [language],
  );

  const shortLabel = (value: string) => {
    const text = value.replace(".", "");
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const view = useMemo(() => {
    if (!data) return null;

    const weekly = data.weeks.map((days) => ({
      date: days[0]?.date ?? "",
      count: days.reduce((sum, day) => sum + day.count, 0),
    }));

    let best = weekly[0];
    for (const week of weekly) if (week.count > best.count) best = week;

    const months: { index: number; label: string }[] = [];
    let previousMonth = -1;
    weekly.forEach((week, index) => {
      const date = parseDate(week.date);
      if (date.getUTCMonth() === previousMonth) return;
      previousMonth = date.getUTCMonth();
      months.push({ index, label: shortLabel(formats.month.format(date)) });
    });
    if (months.length > 1 && months[1].index - months[0].index < 3) {
      months.shift();
    }

    if (months.at(-1) && weekly.length - months.at(-1)!.index < 3) {
      months.pop();
    }

    return {
      weekly,
      best,
      months,
      max: Math.max(best.count, 1),
      average: data.total / Math.max(weekly.length, 1),
    };
  }, [data, formats]);

  const contributions = (count: number) =>
    `${formats.number.format(count)} ${
      count === 1 ? copy.contribution : copy.contributions
    }`;

  const handlePointerOver = (event: PointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-count]",
    );
    if (!root || !target) return;

    const { count, date, week } = target.dataset;
    const anchor = target.querySelector<HTMLElement>("[data-mark]") ?? target;
    const rect = anchor.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const formatted = formats.date.format(parseDate(date ?? ""));

    setTooltip({
      x: Math.min(
        Math.max(rect.left + rect.width / 2 - rootRect.left, 90),
        rootRect.width - 90,
      ),
      y: rect.top - rootRect.top - 8,
      title: contributions(Number(count)),
      subtitle: week === undefined ? formatted : `${copy.weekOf} ${formatted}`,
    });
  };

  const hideTooltip = () => setTooltip(null);

  const dayLabels = [1, 3, 5].map((weekday) => ({
    weekday,
    label: shortLabel(
      formats.weekday.format(new Date(Date.UTC(2024, 0, 7 + weekday))),
    ),
  }));

  const profileLink = (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={profileLinkClasses}
    >
      {copy.viewProfile}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );

  const eyebrow = (
    <p className="flex items-center gap-2 text-sm font-light text-gray-600 dark:text-gray-400">
      <Github
        className="h-4 w-4 text-gray-900 dark:text-white"
        aria-hidden="true"
      />
      GitHub
    </p>
  );

  const yearButton = (value: string, label: string) => {
    const selected = period === value;
    return (
      <button
        key={value}
        type="button"
        aria-pressed={selected}
        onClick={() => {
          hideTooltip();
          setPeriod(value);
        }}
        className={`min-h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-sm transition lg:w-full ${
          selected
            ? "bg-orange-500 font-medium text-black"
            : "font-normal text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <section
      id="github-activity"
      aria-label="GitHub"
      className="px-3 py-12 xs:px-4 sm:py-16 lg:px-6 lg:py-24"
    >
      <motion.div
        ref={rootRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl space-y-6"
      >
        {!data && (
          <div className={cardClasses} aria-busy={loading}>
            {eyebrow}
            {failed ? (
              <div className="mt-4 flex flex-col gap-4">
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                  {copy.error}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setAttempt((value) => value + 1)}
                    className={profileLinkClasses}
                  >
                    {copy.retry}
                  </button>
                  {profileLink}
                </div>
              </div>
            ) : (
              <div className="mt-4 animate-pulse space-y-6" role="status">
                <span className="sr-only">{copy.loading}</span>
                <div className="h-10 w-2/3 rounded-xl bg-black/6 dark:bg-white/6" />
                <div className="h-44 rounded-xl bg-black/6 dark:bg-white/6" />
              </div>
            )}
          </div>
        )}

        {data && view && (
          <>
            <div className={cardClasses}>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      {eyebrow}
                      <h2
                        aria-live="polite"
                        className="mt-2 text-2xl font-light tracking-tight text-gray-900 sm:text-4xl dark:text-white"
                      >
                        <span
                          className="gradient-orange-accent mr-2 inline-block pr-[0.08em]"
                          style={{ fontStyle: "italic" }}
                        >
                          {formats.number.format(data.total)}
                        </span>
                        {period === LAST_YEAR
                          ? copy.titleLastYear
                          : copy.titleYear.replace("{year}", period)}
                      </h2>
                    </div>
                    {profileLink}
                  </div>

                  {failed && (
                    <p
                      role="alert"
                      className="mt-4 text-sm font-light text-gray-700 dark:text-gray-300"
                    >
                      {copy.error}{" "}
                      <button
                        type="button"
                        onClick={() => setAttempt((value) => value + 1)}
                        className="cursor-pointer font-normal underline underline-offset-2"
                      >
                        {copy.retry}
                      </button>
                    </p>
                  )}

                  <div
                    ref={heatmapScrollRef}
                    onScroll={hideTooltip}
                    className={`mt-6 overflow-x-auto pb-2 transition-opacity ${
                      loading ? "opacity-50" : ""
                    }`}
                  >
                    <div className="min-w-[720px]" aria-hidden="true">
                      <div className="grid grid-cols-[2.25rem_1fr] gap-x-2">
                        <div />
                        <div className="relative mb-2 h-4 text-xs font-light text-gray-600 dark:text-gray-400">
                          {view.months.map((month) => (
                            <span
                              key={`${month.label}-${month.index}`}
                              className="absolute"
                              style={{
                                left: `${(month.index / view.weekly.length) * 100}%`,
                              }}
                            >
                              {month.label}
                            </span>
                          ))}
                        </div>

                        <div className="relative text-xs font-light text-gray-600 dark:text-gray-400">
                          {dayLabels.map(({ weekday, label }) => (
                            <span
                              key={weekday}
                              className="absolute left-0 -translate-y-1/2"
                              style={{ top: `${((weekday + 0.5) / 7) * 100}%` }}
                            >
                              {label}
                            </span>
                          ))}
                        </div>

                        <div
                          className="grid grid-flow-col grid-rows-7 gap-[3px]"
                          style={{
                            gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))`,
                          }}
                          onPointerOver={handlePointerOver}
                          onPointerLeave={hideTooltip}
                        >
                          {data.weeks.flatMap((days, weekIndex) =>
                            days.map((day) => (
                              <div
                                key={day.date}
                                data-count={day.count}
                                data-date={day.date}
                                className={`aspect-square rounded-[3px] ${LEVEL_CLASSES[day.level]}`}
                                style={{
                                  gridColumn: weekIndex + 1,
                                  gridRow: parseDate(day.date).getUTCDay() + 1,
                                }}
                              />
                            )),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 text-xs font-light text-gray-600 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
                    <p>
                      {formats.date.format(parseDate(data.from))} {copy.rangeTo}{" "}
                      {formats.date.format(parseDate(data.to))}
                    </p>
                    <div
                      className="flex items-center gap-1.5"
                      aria-hidden="true"
                    >
                      <span className="mr-1">{copy.less}</span>
                      {LEVEL_CLASSES.map((levelClass) => (
                        <span
                          key={levelClass}
                          className={`h-3 w-3 rounded-[3px] ${levelClass}`}
                        />
                      ))}
                      <span className="ml-1">{copy.more}</span>
                    </div>
                  </div>
                </div>

                <div
                  role="group"
                  aria-label={copy.filterLabel}
                  className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:w-32 lg:shrink-0 lg:flex-col lg:overflow-visible lg:p-0"
                >
                  {yearButton(LAST_YEAR, copy.lastYear)}
                  {data.years.map((year) =>
                    yearButton(String(year), String(year)),
                  )}
                </div>
              </div>
            </div>

            <div className={cardClasses}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  {eyebrow}
                  <h2 className="mt-2 text-2xl font-light tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                    {copy.weeklyTitle}
                  </h2>
                </div>
                {profileLink}
              </div>

              <dl className="mt-6 grid grid-cols-3 divide-x divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
                {[
                  { label: copy.totalLabel, value: data.total, unit: false },
                  {
                    label: copy.currentStreak,
                    value: data.currentStreak,
                    unit: true,
                  },
                  {
                    label: copy.longestStreak,
                    value: data.longestStreak,
                    unit: true,
                  },
                ].map(({ label, value, unit }) => (
                  <div
                    key={label}
                    className="py-4 pl-3 first:pl-0 sm:py-6 sm:pl-5"
                  >
                    <dt className="text-xs font-light text-gray-600 sm:text-sm dark:text-gray-400">
                      {label}
                    </dt>
                    <dd className="mt-1 text-2xl font-light text-gray-900 sm:text-3xl dark:text-white">
                      {value === null ? "—" : formats.number.format(value)}
                      {unit && value !== null && (
                        <span className="ml-1.5 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                          {value === 1 ? copy.day : copy.days}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div
                className={`relative mt-8 h-44 transition-opacity sm:h-56 ${
                  loading ? "opacity-50" : ""
                }`}
                aria-hidden="true"
              >
                <div
                  className="flex h-full items-stretch gap-0.5 sm:gap-1"
                  onPointerOver={handlePointerOver}
                  onPointerLeave={hideTooltip}
                >
                  {view.weekly.map((week) => {
                    const isBest =
                      week.date === view.best.date && week.count > 0;
                    return (
                      <div
                        key={week.date}
                        data-count={week.count}
                        data-date={week.date}
                        data-week=""
                        className="group flex min-w-0 flex-1 items-end"
                      >
                        <div
                          data-mark=""
                          className={`w-full rounded-t-lg transition-[height,background-color] duration-500 ${
                            isBest
                              ? "bg-linear-to-b from-orange-400 to-orange-600"
                              : "bg-orange-300 group-hover:bg-orange-400 dark:bg-[#7c4a21] dark:group-hover:bg-[#c4722b]"
                          }`}
                          style={{
                            height:
                              week.count === 0
                                ? 0
                                : `max(2px, ${(week.count / view.max) * 100}%)`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <div
                  className="pointer-events-none absolute inset-x-0 border-t border-dashed border-black/30 dark:border-white/30"
                  style={{ bottom: `${(view.average / view.max) * 100}%` }}
                >
                  <span className="absolute bottom-1 right-0 rounded bg-white/85 px-1 text-[11px] font-light text-gray-700 dark:bg-[#0a0a0a]/85 dark:text-gray-300">
                    {copy.averageShort} {formats.decimal.format(view.average)}
                  </span>
                </div>
              </div>

              <div
                className="relative mt-3 h-4 text-xs font-light text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              >
                {view.months
                  .filter((_, index) => index % 2 === 0)
                  .map((month) => (
                    <span
                      key={`${month.label}-${month.index}`}
                      className="absolute"
                      style={{
                        left: `${(month.index / view.weekly.length) * 100}%`,
                      }}
                    >
                      {month.label}
                    </span>
                  ))}
              </div>

              <div className="mt-6 flex flex-col gap-1 text-xs font-light text-gray-600 sm:flex-row sm:justify-between sm:gap-4 dark:text-gray-400">
                <p>{copy.weeklyNote}</p>
                {view.best.count > 0 && (
                  <p className="shrink-0">
                    {copy.bestWeek}: {contributions(view.best.count)},{" "}
                    {formats.date.format(parseDate(view.best.date))}
                  </p>
                )}
              </div>

              <table className="sr-only">
                <caption>{copy.weeklyTitle}</caption>
                <thead>
                  <tr>
                    <th scope="col">{copy.weekOf}</th>
                    <th scope="col">{copy.contributions}</th>
                  </tr>
                </thead>
                <tbody>
                  {view.weekly.map((week) => (
                    <tr key={week.date}>
                      <td>{formats.date.format(parseDate(week.date))}</td>
                      <td>{week.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tooltip && (
          <div
            role="presentation"
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-black/10 bg-white px-3 py-2 text-center text-xs shadow-lg dark:border-white/15 dark:bg-[#1a1a1a]"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <p className="font-medium text-gray-900 dark:text-white">
              {tooltip.title}
            </p>
            <p className="mt-0.5 font-light text-gray-600 dark:text-gray-400">
              {tooltip.subtitle}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}

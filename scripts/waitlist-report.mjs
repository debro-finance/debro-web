import pg from "pg";

const { Client } = pg;

const COUNT_SUBSCRIBED_SQL = `
  SELECT count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE status = 'subscribed'
`;

const COUNT_UNSUBSCRIBED_SQL = `
  SELECT count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE status = 'unsubscribed'
`;

const COUNT_NEW_REGISTRATIONS_SQL = `
  SELECT count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE ($1::timestamptz IS NULL OR created_at >= $1::timestamptz)
    AND ($2::timestamptz IS NULL OR created_at <= $2::timestamptz)
`;

const DAILY_REGISTRATION_COUNTS_SQL = `
  SELECT date_trunc('day', created_at)::date AS day,
         count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE ($1::timestamptz IS NULL OR created_at >= $1::timestamptz)
    AND ($2::timestamptz IS NULL OR created_at <= $2::timestamptz)
  GROUP BY 1
  ORDER BY 1
`;

const WEEKLY_REGISTRATION_COUNTS_SQL = `
  SELECT date_trunc('week', created_at)::date AS week,
         count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE ($1::timestamptz IS NULL OR created_at >= $1::timestamptz)
    AND ($2::timestamptz IS NULL OR created_at <= $2::timestamptz)
  GROUP BY 1
  ORDER BY 1
`;

const ACQUISITION_BREAKDOWN_SQL = `
  SELECT utm_source,
         utm_medium,
         utm_campaign,
         utm_content,
         count(*)::int AS count
  FROM public.waitlist_subscribers
  GROUP BY utm_source, utm_medium, utm_campaign, utm_content
  ORDER BY count DESC, utm_source NULLS LAST, utm_medium NULLS LAST,
           utm_campaign NULLS LAST, utm_content NULLS LAST
`;

function usage() {
  console.error(
    "Usage: npm run waitlist:report -- [--from ISO_DATE] [--to ISO_DATE] [--include-attribution]",
  );
}

function parseArgs(argv) {
  const args = { from: null, to: null, includeAttribution: false };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--from") {
      args.from = argv[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (arg === "--to") {
      args.to = argv[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (arg === "--include-attribution") {
      args.includeAttribution = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }

    console.error(`Unknown argument: ${arg}`);
    usage();
    process.exit(1);
  }

  return args;
}

function normalizeDate(value, name) {
  if (value == null) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    console.error(`Invalid ${name} date: ${value}`);
    process.exit(1);
  }

  return date.toISOString();
}

const args = parseArgs(process.argv.slice(2));
const from = normalizeDate(args.from, "--from");
const to = normalizeDate(args.to, "--to");

const connectionString =
  process.env.DATABASE_URL?.trim() || process.env.TEST_DATABASE_URL?.trim();

if (!connectionString) {
  console.error(
    "DATABASE_URL is not set. Set it in the environment or in .env.local. Never point this at a database you are not authorized to report on.",
  );
  process.exit(1);
}

const client = new Client({ connectionString });

function count(rows) {
  return Number(rows[0]?.count ?? 0);
}

try {
  await client.connect();

  const [subscribed, unsubscribed, recent, daily, weekly] = await Promise.all([
    client.query(COUNT_SUBSCRIBED_SQL),
    client.query(COUNT_UNSUBSCRIBED_SQL),
    client.query(COUNT_NEW_REGISTRATIONS_SQL, [from, to]),
    client.query(DAILY_REGISTRATION_COUNTS_SQL, [from, to]),
    client.query(WEEKLY_REGISTRATION_COUNTS_SQL, [from, to]),
  ]);

  const report = {
    range: { from, to },
    subscribedCount: count(subscribed.rows),
    unsubscribedCount: count(unsubscribed.rows),
    newRegistrationsCount: count(recent.rows),
    dailyCounts: daily.rows.map((row) => ({
      day:
        row.day instanceof Date
          ? row.day.toISOString().slice(0, 10)
          : String(row.day),
      count: Number(row.count ?? 0),
    })),
    weeklyCounts: weekly.rows.map((row) => ({
      week:
        row.week instanceof Date
          ? row.week.toISOString().slice(0, 10)
          : String(row.week),
      count: Number(row.count ?? 0),
    })),
  };

  if (args.includeAttribution) {
    const attribution = await client.query(ACQUISITION_BREAKDOWN_SQL);
    report.acquisitionBreakdown = attribution.rows.map((row) => ({
      utmSource: row.utm_source ?? null,
      utmMedium: row.utm_medium ?? null,
      utmCampaign: row.utm_campaign ?? null,
      utmContent: row.utm_content ?? null,
      count: Number(row.count ?? 0),
    }));
  }

  // Aggregate-only output: never includes emails or personal information.
  console.log(JSON.stringify(report, null, 2));
} finally {
  await client.end();
}

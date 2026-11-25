import pg from "pg";

import {
  getWaitlistReport,
  parseWaitlistReportArgs,
  WaitlistReportError,
  type WaitlistReportDb,
} from "../src/server/waitlist-report.ts";

const { Client } = pg;

function usage() {
  console.error(
    "Usage: npm run waitlist:report -- [--from ISO_DATE] [--to ISO_DATE] [--include-attribution]",
  );
}

function safeError(error: unknown): { code: string; message: string } {
  if (error instanceof WaitlistReportError) {
    return { code: error.code, message: error.message };
  }
  return {
    code: "report_failed",
    message: "Unable to produce the waitlist report.",
  };
}

const connectionString =
  process.env.DATABASE_URL?.trim() || process.env.TEST_DATABASE_URL?.trim();

if (!connectionString) {
  console.error(
    JSON.stringify(
      {
        error: {
          code: "database_not_configured",
          message: "No reporting database is configured.",
        },
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

let args;
try {
  args = parseWaitlistReportArgs(process.argv.slice(2));
} catch (error) {
  console.error(JSON.stringify({ error: safeError(error) }, null, 2));
  usage();
  process.exit(1);
}

if (args.help) {
  usage();
  process.exit(0);
}

const client = new Client({ connectionString });

try {
  await client.connect();
  await client.query("BEGIN READ ONLY");

  const reportDb: WaitlistReportDb = {
    async query(text, params = []) {
      const result = await client.query(text, params as unknown[]);
      return result.rows;
    },
  };

  const report = await getWaitlistReport(
    reportDb,
    { from: args.from, to: args.to },
    { includeAcquisitionBreakdown: args.includeAttribution },
  );

  await client.query("COMMIT");
  // Aggregate-only output: never subscriber emails or personal information.
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  try {
    await client.query("ROLLBACK");
  } catch {
    // Ignore rollback errors; the read-only transaction cannot write data.
  }
  console.error(JSON.stringify({ error: safeError(error) }, null, 2));
  process.exitCode = 1;
} finally {
  await client.end();
}

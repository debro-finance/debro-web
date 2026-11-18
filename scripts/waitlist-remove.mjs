import pg from "pg";

const { Client } = pg;

const args = process.argv.slice(2);
const emailFlag = args.indexOf("--email");
const email = (emailFlag >= 0 ? args[emailFlag + 1] : args[0])?.trim();
const shouldDelete = args.includes("--delete");

const connectionString =
  process.env.DATABASE_URL?.trim() || process.env.TEST_DATABASE_URL?.trim();

if (!email || !email.includes("@")) {
  console.error(
    "Usage: npm run waitlist:remove -- --email <address> [--delete]",
  );
  process.exit(1);
}

if (!connectionString) {
  console.error(
    "DATABASE_URL is not set. Set it in the environment or in .env.local.",
  );
  process.exit(1);
}

const normalized = email.toLowerCase();
const client = new Client({ connectionString });

try {
  await client.connect();

  const result = shouldDelete
    ? await client.query(
        "DELETE FROM waitlist_subscribers WHERE email = $1 RETURNING id",
        [normalized],
      )
    : await client.query(
        "UPDATE waitlist_subscribers SET status = 'unsubscribed' WHERE email = $1 AND status = 'subscribed' RETURNING id",
        [normalized],
      );

  const count = result.rowCount ?? 0;
  console.log(
    count > 0
      ? `Updated ${count} subscriber record.`
      : "No matching subscriber record.",
  );
} finally {
  await client.end();
}

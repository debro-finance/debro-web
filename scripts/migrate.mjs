import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

const connectionString =
  process.env.DATABASE_URL?.trim() || process.env.TEST_DATABASE_URL?.trim();

if (!connectionString) {
  console.error(
    "DATABASE_URL is not set. Set it in the environment or in .env.local.",
  );
  process.exit(1);
}

const migrationsDir = path.join(process.cwd(), "db", "migrations");
const client = new Client({ connectionString });

try {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  const files = (await readdir(migrationsDir))
    .filter((name) => name.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const alreadyApplied = await client.query(
      "SELECT 1 FROM schema_migrations WHERE name = $1",
      [file],
    );

    if (alreadyApplied.rowCount) {
      console.log(`Already applied: ${file}`);
      continue;
    }

    const sql = await readFile(path.join(migrationsDir, file), "utf8");
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [
        file,
      ]);
      await client.query("COMMIT");
      console.log(`Applied: ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }

  console.log("Migrations complete.");
} finally {
  await client.end();
}

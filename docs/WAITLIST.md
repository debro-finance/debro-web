# Waitlist functional & data specification

Status: **implemented and tested; owner reports the shared-database waitlist is currently accepting registrations. The owner-provided notice is implemented at `/waitlist-privacy`, and `privacy@debro.finance` is confirmed as a real, authorized contact (see `AGENTS.md`). Responsible-entity, service-provider disclosure, and legal review remain outstanding. Attribution schema/reporting foundation is additive and disabled by default pending owner approval.**

## Use and scope
- Single opt-in email signup; explicit consent to be contacted about **DeBro launch availability** only.
- No newsletters, progress marketing, promotional campaigns or verification email.
- English form with accessible consent text, loading, success, duplicate and error states.
- The signup form asks for an email address and consent only. It does not collect a name, account credentials, wallet details or financial information. A hidden `company` honeypot field is included for abuse prevention and is not stored. At submit time the client may also forward up to four approved UTM query parameters; they are best-effort metadata, are never stored client-side, and are ignored entirely while attribution is disabled.
- Duplicate and new submissions return the same generic success response, so membership is not exposed.

## Data model
Tracked migrations: `db/migrations/0001_waitlist.sql`, `db/migrations/0002_waitlist_attribution.sql` (additive, nullable UTM columns; collection disabled by default).

```sql
CREATE TABLE waitlist_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  status text NOT NULL DEFAULT 'subscribed',
  consent_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_subscribers_email_key UNIQUE (email),
  CONSTRAINT waitlist_subscribers_email_normalized CHECK (email = lower(btrim(email))),
  CONSTRAINT waitlist_subscribers_email_length CHECK (char_length(email) <= 254),
  CONSTRAINT waitlist_subscribers_status_valid CHECK (status IN ('subscribed', 'unsubscribed'))
);
```

`0002_waitlist_attribution.sql` adds nullable `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` columns with length constraints. The migration is additive and backwards-compatible; existing rows remain valid with `NULL` attribution.

`consent_at` is set by the database at insert time. `created_at` defaults to the database clock.

### Normalization policy
The server trims surrounding whitespace and lowercases the entire address before validation and insert. Local-part case is theoretically significant under RFC 5321, but mainstream providers treat it case-insensitively; whole-address lowercasing is the documented duplicate-prevention policy here. A database check constraint rejects any non-normalized row inserted by other means.

## API contract
`POST /api/waitlist` accepts JSON `{ email: string, consent: true, company?: string }`.

Optional attribution fields `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` are parsed only when `WAITLIST_ATTRIBUTION_ENABLED=true`. Values are trimmed, lowercased, length-limited and checked against approved allowlists. Unapproved, malformed or oversized values are discarded (`NULL`) and never prevent a valid registration. While attribution is disabled the fields are ignored entirely and no attribution is stored.

| Status | Meaning |
| --- | --- |
| `200 {ok:true}` | Successful insert, verified existing duplicate, or honeypot absorption (never reveals which) |
| `400 invalid_email` / `consent_required` / `invalid_request` | Safe validation failure |
| `413 invalid_request` | Body over 4 KB |
| `429 rate_limited` + `Retry-After` | More than 5 valid-route attempts per hashed key in 10 minutes |
| `503 disabled` / `unavailable` | Collection disabled or database unavailable |

The route never returns raw SQL, stack traces, emails or connection details. Insert-failure logs include only the error name, SQLSTATE, safe relation identifier when available, table and constraint; raw messages and SQL parameters are never logged.

## Anti-abuse
- Hidden `company` honeypot; filled submissions receive generic success and never reach the database.
- In-memory fixed-window limiter keyed by a SHA-256 hash of salted client IP.
- 4 KB body limit enforced from `Content-Length` and actual UTF-8 bytes.
- No persistent visitor IPs, device fingerprints or extra identifiers.
- Limitation: the limiter is per serverless instance and resets on recycle. It is an appropriate low-cost deterrent for this small prelaunch list, not a distributed abuse guarantee.

## Attribution (owner-gated)
- Supported fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
- The waitlist form reads only these four parameters from `window.location.search` at submit time. No cookies, localStorage/sessionStorage, persistent visitor identifiers, referrer URLs or browser fingerprints are created or stored.
- Collection is disabled by default (`WAITLIST_ATTRIBUTION_ENABLED=false`). When disabled, fields are ignored entirely.
- Approved initial vocabulary lives in `src/lib/waitlist/attribution.ts`:
  - `utm_source`: `x`, `instagram`, `linkedin`, `reddit`, `partner`, `newsletter`
  - `utm_medium`: `social`, `referral`, `email`
  - `utm_campaign`: `prelaunch`, `hackathon`, `launch`
  - `utm_content`: explicitly controlled, non-personal publication identifiers (`hero`, `footer`, `waitlist`)
- Values are trimmed, lowercased, length-limited (64 characters) and allowlisted. Invalid or unapproved values are discarded as `NULL`; a valid registration is never blocked by marketing metadata.
- Duplicate registrations preserve the original attribution record; conflicts do not overwrite attribution.
- Required privacy notice changes are prepared in `docs/PRIVACY-DRAFT.md` but the live notice and launch-only consent are unchanged. Do not activate collection before owner approval and notice publication.

## Reporting
- `npm run waitlist:report -- [--from ISO_DATE] [--to ISO_DATE] [--include-attribution]` runs in a PostgreSQL read-only transaction and outputs aggregate JSON only.
- `subscribedCount` is the number of currently subscribed records, independent of the reporting window. `newRegistrationsCount` counts registrations created inside the window; `unsubscribedCount`, `dailyCounts` and `weeklyCounts` are also reported.
- Reporting boundaries are UTC: inclusive start and exclusive end. Date-only `--from` starts at 00:00:00Z; date-only `--to` includes the whole UTC day by using the next day at 00:00:00Z as the exclusive end. Full timestamps with offsets are converted to UTC.
- Reversed ranges and missing CLI argument values are rejected with safe JSON errors.
- Acquisition breakdown is included only when `--include-attribution` is passed and respects the same range. Against the pre-migration schema it degrades gracefully (`attributionAvailable: false`, `acquisitionBreakdown: null`) without failing the rest of the report.
- The report never prints subscriber emails or other personal information.

## Consent, retention and deletion
- Consent is limited to one email announcing DeBro availability; no newsletters or recurring marketing.
- The owner-provided notice is implemented in the application at `/waitlist-privacy`. Its copy approval does not constitute legal approval. The owner has confirmed `privacy@debro.finance` as a real, authorized and monitored contact; it is preserved in the notice and footer. The responsible legal entity and formal legal review remain outstanding. See `AGENTS.md` for the canonical contact rule.
- `npm run waitlist:remove -- --email <address>` marks a subscriber unsubscribed.
- `npm run waitlist:remove -- --email <address> --delete` permanently removes the row.
- Both scripts print only an affected count, never the address or subscriber data.
- There is no automatic expiry, post-announcement deletion, bulk-delete operation, email sender or public removal-request interface. The removal script is an operator tool that deletes one address at a time.
- **Required after the single launch announcement:** an authorized operator must remove every waitlist row using the `--delete` operation, verify the affected-row count and confirm completion. Do not use the default unsubscribe operation when the notice requires deletion. Do not run this against the shared database as part of this copy change.
- **Backups and service copies:** the application does not control or verify Neon backup, point-in-time recovery, log, or provider-copy retention. Before publication/launch, the owner must confirm how long deleted records can persist in backups and service logs, arrange any required expiry/purge process, and ensure the published commitment is operationally accurate.
- The owner reports public collection is currently active. This local review did not access deployed settings or change collection. The owner should ensure the privacy contact, request handling, retention, backup treatment and any required provider disclosures are ready before relying on the notice.
- Email sending is not implemented. Any future sender must send only the single launch announcement to subscribers with the recorded consent and must not automatically create accounts or repurpose the waitlist.
- Vercel Analytics is mounted in the root layout. The owner/counsel must verify its actual data flows and whether the notice’s technical-information and service-provider language is sufficient; this review did not inspect provider-side telemetry or logs.

## Environment safety
- Reuse the Neon integration already attached to the Vercel project; do not create another production database.
- `main` and `development` must use the same existing Neon project, branch, database and `public` schema as explicitly configured in Vercel. Disable automatic Neon preview-branch overrides for these environments; do not create new databases or branches.
- Automated database tests accept only the local `debro_test` database and must never connect to the shared Neon database.
- Tests run against a disposable local PostgreSQL 16 service in CI.
- Never commit subscriber emails, connection strings or credentials.

## Production migration, verification, backup, and rollback procedure

**Owner approval required before any production database change.** Do not run migrations during development, CI, preview deployments, or automatic merges.

### Preconditions
- Owner approves privacy implications, privacy notice updates, approved UTM allowlist values, and attribution activation timing.
- Confirm target is the intended production Neon database/branch; never run against an unknown or shared dev target.
- Ensure application code with additive compatibility is deployed or ready: it must accept registrations against the pre-migration schema while attribution is disabled.
- Schedule a low-traffic window and have an operator ready to monitor.

### Backup
1. In Neon, create/confirm a point-in-time restore point or backup snapshot immediately before migration. Record timestamp, branch/database, and operator.
2. Export a schema-only backup and a minimal metadata verification snapshot (row counts by status, min/max created_at, total count) from an authorized operator session. Do not export or store subscriber emails in ad hoc files.
3. Confirm backup/restore retention and access controls per owner policy.

### Migration (manual, additive only)
1. Run the tracked migration against production only after backup confirmation:
   ```sh
   DATABASE_URL=<approved-production-connection> npm run db:migrate
   ```
2. The migration applies `db/migrations/0002_waitlist_attribution.sql`, adding nullable `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` columns and length constraints. It uses `IF NOT EXISTS`/guarded constraints scoped to `public.waitlist_subscribers`, and does not modify existing rows.
3. The migration sets bounded `lock_timeout = '2s'` and `statement_timeout = '15s'` for its session. If a lock or statement cannot complete in that window it fails and rolls back; retry only after confirming the cause and re-taking a backup. Do not remove or raise these limits without owner approval.

### Verification
1. Verify schema:
   ```sql
   SELECT column_name, is_nullable, data_type
   FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'waitlist_subscribers'
   ORDER BY ordinal_position;
   ```
2. Verify constraints are scoped to the intended table and include the four `waitlist_subscribers_utm_*_length` checks:
   ```sql
   SELECT conname
   FROM pg_constraint
   WHERE conrelid = 'public.waitlist_subscribers'::regclass
     AND conname LIKE 'waitlist_subscribers_utm_%_length'
   ORDER BY conname;
   ```
3. Verify data preservation:
   ```sql
   SELECT count(*) AS total,
          count(*) FILTER (WHERE status = 'subscribed') AS subscribed,
          count(*) FILTER (WHERE status = 'unsubscribed') AS unsubscribed,
          min(created_at) AS min_created_at,
          max(created_at) AS max_created_at
   FROM public.waitlist_subscribers;
   ```
   Compare totals/timestamps against pre-migration metadata.
4. Verify existing rows have `NULL` attribution and unchanged IDs/statuses/consent timestamps.
5. Verify app behavior with `WAITLIST_ATTRIBUTION_ENABLED=false` using read-only smoke checks and the isolated-local integration suite. Never submit synthetic signups to the shared Neon database or either deployed environment.
6. Run `npm run waitlist:report --` (no attribution flag) as a read-only production smoke check; then optionally run with `--include-attribution` after migration to confirm `attributionAvailable: true`. Both outputs must be aggregate-only.
7. Only after owner approval, deploy/configure approved allowlists and set `WAITLIST_ATTRIBUTION_ENABLED=true`.

### Rollback
- **Preferred rollback (no data loss):** keep the additive nullable columns in place and set `WAITLIST_ATTRIBUTION_ENABLED=false`. The application is backwards-compatible and ignores attribution when disabled. This avoids destructive schema changes on live data.
- **Code rollback:** revert to previous deployment; old code continues to work because migration is additive and columns are nullable.
- **Data restore (last resort):** if data integrity is compromised, use Neon point-in-time restore/backup restore approved by owner. This can lose records created after backup point; plan communication and reconciliation.
- **Do not drop columns** in production as part of routine rollback unless owner explicitly approves a separate reviewed destructive migration after confirming no dependency and full backup.

## Test coverage
`tests/unit/waitlist.test.ts`, `tests/unit/route.test.ts`, `tests/unit/attribution.test.ts`, `tests/unit/waitlist-form-attribution.test.tsx`, `tests/unit/waitlist-report.test.ts`, and `tests/integration/waitlist.db.test.ts` cover valid registration, invalid email, missing consent, duplicate registration, malformed and oversized requests, honeypot, rate limiting, database unavailable/failure, normalization, constraints, safe error output, end-to-end persistence, UTM capture/validation/discarding, migration 0001 -> 0002 data preservation, duplicate attribution preservation, UTC reporting ranges, time zones, CLI behavior, attribution breakdown, and aggregate-only reporting without PII.

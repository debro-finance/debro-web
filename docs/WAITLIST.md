# Waitlist functional & data specification

Status: **implemented and tested; owner reports the shared-database waitlist is currently accepting registrations. The owner-provided notice is implemented at `/waitlist-privacy`; responsible-entity and contact details, service-provider disclosures, and the legal review remain outstanding.**

## Use and scope
- Single opt-in email signup; explicit consent to be contacted about **DeBro launch availability** only.
- No newsletters, progress marketing, promotional campaigns or verification email.
- English form with accessible consent text, loading, success, duplicate and error states.
- The signup form asks for an email address and consent only. It does not collect a name, account credentials, wallet details or financial information. A hidden `company` honeypot field is included for abuse prevention and is not stored.
- Duplicate and new submissions return the same generic success response, so membership is not exposed.

## Data model
Tracked migration: `db/migrations/0001_waitlist.sql`.

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

`consent_at` is set by the database at insert time. `created_at` defaults to the database clock.

### Normalization policy
The server trims surrounding whitespace and lowercases the entire address before validation and insert. Local-part case is theoretically significant under RFC 5321, but mainstream providers treat it case-insensitively; whole-address lowercasing is the documented duplicate-prevention policy here. A database check constraint rejects any non-normalized row inserted by other means.

## API contract
`POST /api/waitlist` accepts JSON `{ email: string, consent: true, company?: string }`.

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

## Consent, retention and deletion
- Consent is limited to one email announcing DeBro availability; no newsletters or recurring marketing.
- The owner-provided notice is implemented in the application at `/waitlist-privacy`. Its copy approval does not constitute legal approval. The responsible legal entity and a real, monitored privacy contact still require owner confirmation; the notice currently refers to a “designated privacy contact” but no contact channel exists in the implementation.
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

## Test coverage
`tests/unit/waitlist.test.ts`, `tests/unit/route.test.ts` and `tests/integration/waitlist.db.test.ts` cover valid registration, invalid email, missing consent, duplicate registration, malformed and oversized requests, honeypot, rate limiting, database unavailable/failure, normalization, constraints, safe error output and end-to-end persistence.

# Waitlist functional & data specification

Status: **implemented and tested; owner reports the shared-database waitlist is currently accepting registrations. Privacy notice and handling details require owner/counsel review.**

## Use and scope
- Single opt-in email signup; explicit consent to be contacted about **DeBro launch availability** only.
- No newsletters, progress marketing, promotional campaigns or verification email.
- English form with accessible consent text, loading, success, duplicate and error states.
- No account, wallet or other personal data is collected.
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
- The website identifies that its privacy notice is not yet published and that the responsible entity, contact method, retention period, removal process and applicable disclosures still require confirmation. See `docs/PRIVACY-DRAFT.md`; it is not approved publication copy.
- `npm run waitlist:remove -- --email <address>` marks a subscriber unsubscribed.
- `npm run waitlist:remove -- --email <address> --delete` permanently removes the row.
- Both scripts print only an affected count, never the address or subscriber data.
- There is no automatic expiry or public removal-request interface. The removal script is an operator tool; the owner must establish and publish a monitored request channel, handler and retention/deletion policy.
- The owner reports public collection is currently active. This refinement did not inspect deployed environment settings or change them. The owner must decide promptly whether to pause further collection while disclosures and request handling are completed; only the owner should change the existing collection control.
- Announcement email sending is out of scope. Any future sending must honor the consent purpose and opt-outs.

## Environment safety
- Reuse the Neon integration already attached to the Vercel project; do not create another production database.
- `main` and `development` must use the same existing Neon project, branch, database and `public` schema as explicitly configured in Vercel. Disable automatic Neon preview-branch overrides for these environments; do not create new databases or branches.
- Automated database tests accept only the local `debro_test` database and must never connect to the shared Neon database.
- Tests run against a disposable local PostgreSQL 16 service in CI.
- Never commit subscriber emails, connection strings or credentials.

## Test coverage
`tests/unit/waitlist.test.ts`, `tests/unit/route.test.ts` and `tests/integration/waitlist.db.test.ts` cover valid registration, invalid email, missing consent, duplicate registration, malformed and oversized requests, honeypot, rate limiting, database unavailable/failure, normalization, constraints, safe error output and end-to-end persistence.

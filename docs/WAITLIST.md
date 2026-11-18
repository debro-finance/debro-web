# Waitlist functional & data specification
Status: APPROVED requirements; implementation pending.

## Use and scope
- Single opt-in email signup; explicit consent to be contacted about **DeBro launch availability** only.
- No newsletters, progress marketing, or promotional campaigns.
- English form, accessible consent copy and link to Privacy Policy.
- No verification emails or transactional email service at signup.
- After successful signup, show simple confirmation. Handle repeated registrations consistently without revealing whether an address exists to unauthenticated parties.

## Data model (illustrative SQL, migrate through tracked migrations)
```sql
CREATE TABLE waitlist_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'subscribed',
  consent_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT status_valid CHECK (status IN ('subscribed', 'unsubscribed'))
);
```
Before inserting, trim and normalize the address conservatively (e.g., lowercase domain; choose and document case-normalization policy); enforce uniqueness server-side. Store only required data. Avoid extra marketing-source tracking or persistent IP logs.

## API contract
POST server-only signup handler/action:
1. Validate request shape, email length/format and affirmative consent.
2. Apply low-cost bot/rate protections with minimal data retention.
3. Parameterized insert into Neon with conflict-safe behavior.
4. Return generic success for existing addresses; clear safe error states for invalid input, rate limit, database unavailability.
5. Never expose raw SQL/stack traces or PII in responses and analytics.

## Consent, retention and deletion
- The site must publish understandable privacy disclosures identifying project operator/contact, purposes, data processor, lawful basis (where applicable), retention and rights-request route; **legal identification/contact remain owner inputs before collection**.
- Provide a documented removal/unsubscribe request process. Do not invent a public contact address.
- Decide retention and lawful cross-border data handling before production activation; don't collect emails until these prerequisites are complete.
- Announcement email sending is explicitly **out of scope now**; future sending must honor prior consent and opt-outs.

## Environment safety
- Reuse already connected Neon integration in Vercel.
- Keep previews from writing to production subscriber data; test against non-production DB/configuration.
- Never commit actual subscriber emails, connection URLs or other credentials.
- Tests: valid signup, invalid email, missing consent, duplicate, bot/rate limit, Neon failure, safe error output.

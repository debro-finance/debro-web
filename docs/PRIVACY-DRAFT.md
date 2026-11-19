# Waitlist privacy notice — owner and counsel draft

**Status: DRAFT FOR OWNER/COUNSEL REVIEW — NOT APPROVED OR READY TO PUBLISH.**

This draft deliberately contains confirmation fields. Do not publish it, link to it as the privacy policy, or replace a placeholder with an assumption. Applicable privacy requirements depend on the responsible entity, where people are located, and the actual service and data flows; obtain appropriate legal review.

## Proposed notice copy

> **Waitlist privacy**
>
> **Who is responsible.** The controller/responsible entity is **[CONFIRM full legal entity name, legal form, and jurisdiction of registration]**. You can contact us about privacy or your waitlist information at **[CONFIRM monitored privacy contact method and any required postal address]**.
>
> **What we use your information for.** If you join the waitlist, we use your email address and signup/consent record to manage your request and send one email announcing DeBro's availability. We do not send newsletters or recurring marketing. Joining the waitlist does not create a product account or guarantee eligibility or access.
>
> **Information and service providers.** The waitlist database stores a normalized email address, consent timestamp, record timestamp, and subscription status. **[CONFIRM the legal identities, processing roles, locations, subprocessors, and contractual safeguards for the database, hosting, analytics, email delivery, and any other providers.]** The application also uses a short-lived, in-memory hashed request key for abuse prevention; confirm hosting and service logs and disclose any additional technical information those services process.
>
> **Legal basis and choices.** **[COUNSEL/OWNER TO CONFIRM the applicable legal basis, consent wording and withdrawal process for each relevant jurisdiction.]** You may withdraw consent using **[CONFIRM a working contact/request method]**. Withdrawal does not affect processing that occurred before withdrawal.
>
> **Retention and deletion.** We keep waitlist information for **[CONFIRM a specific period or objective retention criteria]**, then **[CONFIRM deletion or anonymization process and timing, including backups and provider copies]**. To request removal or exercise applicable rights, contact **[CONFIRM monitored channel and responsible handler]**. **[CONFIRM applicable rights, response process/deadlines, and regulator complaint information.]**
>
> **International processing and other disclosures.** **[CONFIRM whether information is processed or accessed outside the user's location, and disclose any required transfer safeguards.]** **[COUNSEL TO CONFIRM any other notices required for the markets in which the site collects information.]**

## Confirm before publication

- Responsible legal entity, its registration jurisdiction, and the required controller/operator identification.
- A monitored privacy contact and a practical, documented process for withdrawal, removal, access and other applicable requests. The existing removal script is an operator tool, not a public request channel.
- A retention period or objective criteria, including when a signup is considered stale and how deletion propagates to backups and service providers. The current schema has no automatic expiry.
- Applicable legal basis, consent and notice requirements, rights, complaint routes, and any jurisdiction- or age-related restrictions. Do not infer these from this draft.
- Actual provider identities, roles, data locations, subprocessors, terms, and transfer safeguards for Neon, Vercel, Vercel Analytics, and any future email delivery. Verify provider logs and any data beyond the waitlist table.
- The announcement-email workflow and unsubscribe/removal mechanism before promising a working option in an email. Email sending is not implemented in this repository.
- Whether any additional terms or operational disclosures are needed for the waitlist itself.

## Current status and owner decision

The owner reports that waitlist registration currently accepts signups and persists them to the existing shared Neon database. This local review did not access or independently verify the deployed services. The website now tells visitors that the privacy notice is not yet published and identifies the unresolved categories; it does not invent an entity, contact, retention period, or request route.

**Owner action:** promptly decide whether to pause further public collection while the notice and handling process are completed. If a pause is required, the owner must use the existing operational control and verify the resulting deployment. This change does not alter `WAITLIST_ENABLED`, the database, the API, or collection behavior.

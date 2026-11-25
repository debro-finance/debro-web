# Waitlist privacy — publication and operations checklist

**Status: The exact notice copy supplied by the owner is implemented at `/waitlist-privacy`. This is not a representation that the notice has received formal legal approval. Do not infer a responsible legal entity. The privacy contact `privacy@debro.finance` is confirmed by the owner; see `AGENTS.md`.**

## What the current implementation does

- The signup form requests an email address and explicit consent. Its hidden `company` field is an anti-abuse honeypot and is not stored.
- The API validates and normalizes the email. The database row contains an internal ID, email, subscription status, consent timestamp and record timestamp; there are no account credentials, names, wallet details or financial data in the waitlist schema.
- Additive nullable UTM attribution columns (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) exist in the migration for future approved attribution. Collection is disabled by default (`WAITLIST_ATTRIBUTION_ENABLED=false`). The client may forward the four UTM parameters from the current URL at submit time, but the server ignores them entirely while disabled; when enabled, values are normalized against strict allowlists/length limits and invalid values are discarded. No attribution is stored until owner approval and notice updates.
- New and duplicate signups receive the same generic response. A salted hash of the request IP is held only as a key in the in-memory rate limiter; the application does not persist that key. Provider-side access logs and telemetry were not inspected.
- The root layout includes Vercel Analytics. The owner/counsel must verify its actual data flows and determine whether the notice’s limited technical-information and service-provider statements adequately cover them.
- No email-sending system or account creation is implemented. The one-time launch email is an operational commitment, not an existing automated workflow.

## Notice changes required before attribution activation (prepared, not published)

The live notice and launch-only consent are intentionally unchanged. Before setting `WAITLIST_ATTRIBUTION_ENABLED=true`, the owner/counsel must approve and publish notice text that discloses:

- That approved, non-personal marketing attribution values (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) may be recorded with the waitlist registration.
- That these values come only from an explicit approved vocabulary, are normalized and length-limited, and that unapproved or invalid values are discarded.
- That attribution supports measuring which publication/channel drove waitlist registrations, and is retained with the corresponding waitlist record under the same deletion policy.
- That no cookies, persistent visitor identifiers, browser fingerprints, full referrer URLs, or arbitrary query strings are used for this purpose.
- That the existing consent remains limited to one launch-availability email; attribution activation does not expand marketing consent.

This documentation is preparation only. Do not activate collection, add a new consent checkbox, or change the launch-only email purpose before owner approval and publication of the revised notice.

## Required publication and operational decisions

- Confirm the responsible legal entity and jurisdiction. Do not add a name until the owner confirms the exact legal identity.
- Privacy contact: `privacy@debro.finance` is confirmed by the owner as a real, authorized and monitored mailbox. Keep the mailto links in `/waitlist-privacy` and the footer. There is still no in-app request route; removal requests are handled manually by an operator using the existing removal script. The confirmed contact does not establish a legal entity or formal legal approval.
- Obtain appropriate legal review for applicable jurisdictions, consent, request handling, service-provider disclosures and the notice as a whole. Owner approval of this provided copy is not legal approval.
- Confirm actual provider roles, locations, subprocessors and technical logs, including Neon, Vercel and Vercel Analytics.
- Establish and test the single launch-announcement process, limited to subscribers with recorded consent. There is no sender in this repository.
- After the announcement is sent, an authorized operator must permanently delete the waitlist records. The existing operator command permanently deletes one address at a time:

  ```sh
  npm run waitlist:remove -- --email <address> --delete
  ```

  Run it once for every record, then reconcile successful affected-row counts against the authorized pre-deletion inventory. The command without `--delete` only changes status to `unsubscribed` and does not satisfy the published deletion commitment. Do not use this command with production data until the owner authorizes the operation.
- There is no automated post-announcement cleanup or bulk-delete command. Neon backup, point-in-time recovery, provider log and service-copy retention are not established by this repository. Before relying on the deletion promise, the owner must confirm those retention periods and purge/expiry behavior with the providers, account for copies, and ensure the policy text and actual process agree.

## Release status

This local implementation did not inspect or change Neon, Vercel settings, deployed collection controls, provider-side analytics or subscriber data. The owner reports the existing waitlist accepts registrations. The notice page is implemented and the privacy contact is confirmed, but publication requirements above—including legal identity, service-provider/analytics review, legal review, attribution notice updates and deletion/backup operations—remain open. No changes were made to registration consent or collection activation.

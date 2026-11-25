# Waitlist privacy — publication and operations checklist

**Status: The exact notice copy supplied by the owner is implemented at `/waitlist-privacy`. This is not a representation that the notice has received formal legal approval. Do not infer a responsible entity or contact channel.**

## What the current implementation does

- The signup form requests an email address and explicit consent. Its hidden `company` field is an anti-abuse honeypot and is not stored.
- The API validates and normalizes the email. The database row contains an internal ID, email, subscription status, consent timestamp and record timestamp; there are no account credentials, names, wallet details or financial data in the waitlist schema.
- Additive nullable UTM attribution columns (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) exist in the migration for future approved attribution. Collection is disabled by default (`WAITLIST_ATTRIBUTION_ENABLED=false`), values are validated against strict allowlists/length limits, and no attribution is stored until owner approval and notice updates.
- New and duplicate signups receive the same generic response. A salted hash of the request IP is held only as a key in the in-memory rate limiter; the application does not persist that key. Provider-side access logs and telemetry were not inspected.
- The root layout includes Vercel Analytics. The owner/counsel must verify its actual data flows and determine whether the notice’s limited technical-information and service-provider statements adequately cover them.
- No email-sending system or account creation is implemented. The one-time launch email is an operational commitment, not an existing automated workflow.

## Required publication and operational decisions

- Confirm the responsible legal entity and jurisdiction. Do not add a name until the owner confirms the exact legal identity.
- Designate a real, monitored privacy contact and request handler. The notice refers to a designated privacy contact, but the site currently provides no contact channel and the API has no request route. Do not invent an email address or contact details.
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

This local implementation did not inspect or change Neon, Vercel settings, deployed collection controls, provider-side analytics or subscriber data. The owner reports the existing waitlist accepts registrations. The notice page is implemented, but publication requirements above—including legal identity, monitored contact, service-provider/analytics review, legal review and deletion/backup operations—remain open. No changes were made to registration behavior or collection settings.

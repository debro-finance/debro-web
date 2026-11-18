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

export const WAITLIST_TABLE = "waitlist_subscribers";

/**
 * Parameterized and conflict-safe. A duplicate is verified separately before
 * the caller treats it as a successful registration.
 */
export const INSERT_SUBSCRIBER_SQL = `
  INSERT INTO public.waitlist_subscribers (email, consent_at)
  VALUES ($1, now())
  ON CONFLICT (email) DO NOTHING
  RETURNING id
`;

export const FIND_SUBSCRIBER_SQL = `
  SELECT 1
  FROM public.waitlist_subscribers
  WHERE email = $1
  LIMIT 1
`;

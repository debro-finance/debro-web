export const WAITLIST_TABLE = "waitlist_subscribers";

/**
 * Parameterized and conflict-safe. A duplicate submission is reported as
 * `inserted: false` so callers can return the same generic success response.
 */
export const INSERT_SUBSCRIBER_SQL = `
  INSERT INTO waitlist_subscribers (email, consent_at)
  VALUES ($1, now())
  ON CONFLICT (email) DO NOTHING
  RETURNING id
`;

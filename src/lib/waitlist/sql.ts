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

/**
 * Additive insert path used only when approved attribution collection is enabled.
 * The conflict path does nothing, preserving the original attribution values for
 * duplicate registrations.
 */
export const INSERT_SUBSCRIBER_WITH_ATTRIBUTION_SQL = `
  INSERT INTO public.waitlist_subscribers (
    email,
    consent_at,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content
  )
  VALUES ($1, now(), $2, $3, $4, $5)
  ON CONFLICT (email) DO NOTHING
  RETURNING id
`;

export const COUNT_SUBSCRIBED_SQL = `
  SELECT count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE status = 'subscribed'
`;

export const COUNT_UNSUBSCRIBED_SQL = `
  SELECT count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE status = 'unsubscribed'
`;

export const COUNT_NEW_REGISTRATIONS_SQL = `
  SELECT count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE ($1::timestamptz IS NULL OR created_at >= $1::timestamptz)
    AND ($2::timestamptz IS NULL OR created_at <= $2::timestamptz)
`;

export const DAILY_REGISTRATION_COUNTS_SQL = `
  SELECT date_trunc('day', created_at)::date AS day,
         count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE ($1::timestamptz IS NULL OR created_at >= $1::timestamptz)
    AND ($2::timestamptz IS NULL OR created_at <= $2::timestamptz)
  GROUP BY 1
  ORDER BY 1
`;

export const WEEKLY_REGISTRATION_COUNTS_SQL = `
  SELECT date_trunc('week', created_at)::date AS week,
         count(*)::int AS count
  FROM public.waitlist_subscribers
  WHERE ($1::timestamptz IS NULL OR created_at >= $1::timestamptz)
    AND ($2::timestamptz IS NULL OR created_at <= $2::timestamptz)
  GROUP BY 1
  ORDER BY 1
`;

export const ACQUISITION_BREAKDOWN_SQL = `
  SELECT utm_source,
         utm_medium,
         utm_campaign,
         utm_content,
         count(*)::int AS count
  FROM public.waitlist_subscribers
  GROUP BY utm_source, utm_medium, utm_campaign, utm_content
  ORDER BY count DESC, utm_source NULLS LAST, utm_medium NULLS LAST,
           utm_campaign NULLS LAST, utm_content NULLS LAST
`;

// Backwards-compatible aliases for reporting consumers.
export const COUNT_SUBSCRIBED_WAITLIST_SQL = COUNT_SUBSCRIBED_SQL;
export const COUNT_UNSUBSCRIBED_WAITLIST_SQL = COUNT_UNSUBSCRIBED_SQL;
export const COUNT_NEW_REGISTRATIONS_RANGE_SQL = COUNT_NEW_REGISTRATIONS_SQL;
export const DAILY_WAITLIST_REGISTRATION_COUNTS_SQL = DAILY_REGISTRATION_COUNTS_SQL;
export const WEEKLY_WAITLIST_REGISTRATION_COUNTS_SQL = WEEKLY_REGISTRATION_COUNTS_SQL;
export const WAITLIST_ACQUISITION_BREAKDOWN_SQL = ACQUISITION_BREAKDOWN_SQL;

-- Additive, backwards-compatible attribution columns for waitlist registrations.
-- All columns are nullable so existing rows and the current insert path remain valid.
-- Collection remains disabled in application code until owner approval.

ALTER TABLE public.waitlist_subscribers
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_source_length'
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_source_length
      CHECK (utm_source IS NULL OR char_length(utm_source) <= 64);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_medium_length'
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_medium_length
      CHECK (utm_medium IS NULL OR char_length(utm_medium) <= 64);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_campaign_length'
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_campaign_length
      CHECK (utm_campaign IS NULL OR char_length(utm_campaign) <= 64);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_content_length'
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_content_length
      CHECK (utm_content IS NULL OR char_length(utm_content) <= 64);
  END IF;
END $$;

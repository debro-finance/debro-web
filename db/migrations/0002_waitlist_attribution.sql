-- Additive, backwards-compatible attribution columns for waitlist registrations.
-- All columns are nullable so existing rows and the current insert path remain valid.
-- Collection remains disabled in application code until owner approval.
--
-- Bounded timeouts prevent a production migration from waiting indefinitely on
-- table locks. If either timeout fires the statement is rolled back safely.
SET lock_timeout = '2s';
SET statement_timeout = '15s';

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
      AND conrelid = 'public.waitlist_subscribers'::regclass
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_source_length
      CHECK (utm_source IS NULL OR char_length(utm_source) <= 64);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_medium_length'
      AND conrelid = 'public.waitlist_subscribers'::regclass
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_medium_length
      CHECK (utm_medium IS NULL OR char_length(utm_medium) <= 64);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_campaign_length'
      AND conrelid = 'public.waitlist_subscribers'::regclass
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_campaign_length
      CHECK (utm_campaign IS NULL OR char_length(utm_campaign) <= 64);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'waitlist_subscribers_utm_content_length'
      AND conrelid = 'public.waitlist_subscribers'::regclass
  ) THEN
    ALTER TABLE public.waitlist_subscribers
      ADD CONSTRAINT waitlist_subscribers_utm_content_length
      CHECK (utm_content IS NULL OR char_length(utm_content) <= 64);
  END IF;
END $$;

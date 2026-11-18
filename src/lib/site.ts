export const SITE_NAME = "DeBro";

export const SITE_TITLE =
  "DeBro — A simpler way to invest in tokenized assets";

export const SITE_DESCRIPTION =
  "DeBro is building a modern investing platform that makes tokenized financial assets easier to understand and explore. Join the waitlist for launch news.";

export const SITE_LOCALE = "en";

const FALLBACK_SITE_URL = "https://debro.finance";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (configured || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

/**
 * Indexing stays off by default. It only turns on for a Vercel Production
 * deployment when the owner has explicitly set SITE_INDEXABLE=true.
 */
export function isIndexable(): boolean {
  return (
    process.env.SITE_INDEXABLE === "true" &&
    process.env.VERCEL_ENV === "production"
  );
}

/**
 * Waitlist writes are opt-in. Local development may use a configured database,
 * but Vercel Preview and Production require WAITLIST_ENABLED=true explicitly.
 */
export function isWaitlistEnabled(): boolean {
  if (process.env.WAITLIST_ENABLED === "false") {
    return false;
  }

  if (process.env.WAITLIST_ENABLED === "true") {
    return true;
  }

  return (
    process.env.NODE_ENV === "development" &&
    Boolean(process.env.DATABASE_URL)
  );
}

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-debro", label: "Why DeBro" },
  { href: "#security", label: "Security" },
  { href: "#faq", label: "FAQ" },
] as const;

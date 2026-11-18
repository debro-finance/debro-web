import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildMetadata, buildRobots, buildSitemap, buildStructuredData } from "@/lib/seo";
import { getSiteUrl, isIndexable, isWaitlistEnabled } from "@/lib/site";

beforeEach(() => {
  vi.stubEnv("SITE_INDEXABLE", "");
  vi.stubEnv("VERCEL_ENV", "");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  vi.stubEnv("WAITLIST_ENABLED", "");
  vi.stubEnv("DATABASE_URL", "");
  vi.stubEnv("NODE_ENV", "test");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("site configuration", () => {
  it("uses the approved canonical origin by default", () => {
    expect(getSiteUrl()).toBe("https://debro.finance");
  });

  it("trims a trailing slash from the configured origin", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://debro.finance/");
    expect(getSiteUrl()).toBe("https://debro.finance");
  });

  it("keeps indexing off by default and outside production", () => {
    expect(isIndexable()).toBe(false);

    vi.stubEnv("SITE_INDEXABLE", "true");
    expect(isIndexable()).toBe(false);

    vi.stubEnv("VERCEL_ENV", "preview");
    expect(isIndexable()).toBe(false);

    vi.stubEnv("VERCEL_ENV", "production");
    expect(isIndexable()).toBe(true);
  });

  it("gates waitlist writes behind explicit enablement", () => {
    expect(isWaitlistEnabled()).toBe(false);

    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("WAITLIST_ENABLED", "true");
    expect(isWaitlistEnabled()).toBe(true);

    vi.stubEnv("WAITLIST_ENABLED", "false");
    expect(isWaitlistEnabled()).toBe(false);
  });
});

describe("metadata", () => {
  it("marks non-production output as non-indexable", () => {
    const metadata = buildMetadata();

    expect(metadata.metadataBase?.toString()).toBe("https://debro.finance/");
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.openGraph?.images).toBeTruthy();
  });

  it("enables indexing only for approved production output", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_INDEXABLE", "true");

    const metadata = buildMetadata();
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("uses investing-first copy without Web3 framing", () => {
    const metadata = buildMetadata();
    const shareCopy = JSON.stringify({
      title: metadata.title,
      description: metadata.description,
      openGraph: metadata.openGraph,
      twitter: metadata.twitter,
    });

    expect(shareCopy).toMatch(/A simpler way to invest in tokenized assets/);
    expect(shareCopy).toMatch(/modern investing platform/);
    expect(shareCopy).not.toMatch(/Solana|self-custodial|on-chain/i);
  });
});

describe("structured data", () => {
  it("contains only substantiated organization and website facts", () => {
    const data = buildStructuredData();
    const serialized = JSON.stringify(data);

    expect(serialized).toContain('"@type":"Organization"');
    expect(serialized).toContain('"@type":"WebSite"');
    expect(serialized).toContain("https://debro.finance");
    expect(serialized).not.toMatch(/address|telephone|sameAs|aggregateRating/i);
  });
});

describe("robots and sitemap", () => {
  it("blocks crawling while the site is not approved for indexing", () => {
    expect(buildRobots()).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
    expect(buildSitemap()).toEqual([]);
  });

  it("publishes the canonical route when indexing is approved", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_INDEXABLE", "true");

    const robots = buildRobots();
    expect(robots).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://debro.finance/sitemap.xml",
    });

    const sitemap = buildSitemap();
    expect(sitemap).toHaveLength(1);
    expect(sitemap[0]?.url).toBe("https://debro.finance/");
  });
});

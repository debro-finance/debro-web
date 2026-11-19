import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  getSiteUrl,
  isIndexable,
} from "@/lib/site";

export function buildMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const indexable = isIndexable();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: SITE_TITLE,
      template: `%s · ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    category: "finance",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      locale: "en_US",
      images: [
        {
          url: "/branding/og-image.png",
          width: 1200,
          height: 630,
          alt: "DeBro — a simpler way to invest in tokenized assets.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: ["/branding/og-image.png"],
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        "max-image-preview": "large",
      },
    },
  };
}

export function buildStructuredData() {
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/branding/debro-icon-navy.svg`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: SITE_NAME,
        inLanguage: SITE_LOCALE,
        description: SITE_DESCRIPTION,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function buildRobots(): {
  rules: { userAgent: string; allow?: string; disallow?: string };
  sitemap?: string;
  host?: string;
} {
  if (!isIndexable()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}

export function buildSitemap(): MetadataRouteEntry[] {
  if (!isIndexable()) {
    return [];
  }

  return [
    {
      url: `${getSiteUrl()}/`,
      lastModified: new Date("2026-11-18T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

export type MetadataRouteEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "monthly";
  priority: number;
};

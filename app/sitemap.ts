import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/**
 * Every live route, including the four outside the UI refresh. /admin and
 * /login are omitted: neither is meant to be indexed, and neither is
 * /insights while it is unpublished.
 */
const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/board", priority: 0.8 },
  { path: "/events", priority: 0.8 },
  { path: "/sponsors", priority: 0.7 },
  { path: "/presidents-letter", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/certs", priority: 0.6 },
  { path: "/highlight", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified,
      priority: r.priority,
    })),
  ];
}

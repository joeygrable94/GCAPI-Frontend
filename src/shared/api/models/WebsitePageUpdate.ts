/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SitemapPageChangeFrequency } from './SitemapPageChangeFrequency';
export type WebsitePageUpdate = {
  url?: (string | null);
  status?: (number | null);
  priority?: (number | string | null);
  last_modified?: (string | null);
  change_frequency?: (SitemapPageChangeFrequency | null);
  is_active?: (boolean | null);
  sitemap_id?: (string | null);
};


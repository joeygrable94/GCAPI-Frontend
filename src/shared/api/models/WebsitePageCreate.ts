/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SitemapPageChangeFrequency } from './SitemapPageChangeFrequency';
export type WebsitePageCreate = {
  url: string;
  status: number;
  priority: (number | string);
  last_modified?: (string | null);
  change_frequency?: (SitemapPageChangeFrequency | null);
  is_active?: boolean;
  website_id: string;
  sitemap_id?: (string | null);
};


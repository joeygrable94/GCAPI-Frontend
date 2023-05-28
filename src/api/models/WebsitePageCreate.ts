/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SitemapPageChangeFrequency } from './SitemapPageChangeFrequency';

export type WebsitePageCreate = {
  url: string;
  status: number;
  priority: number;
  last_modified?: string;
  change_frequency?: SitemapPageChangeFrequency;
  website_id: string;
  sitemap_id?: string;
};


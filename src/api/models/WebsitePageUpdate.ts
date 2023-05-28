/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SitemapPageChangeFrequency } from './SitemapPageChangeFrequency';

export type WebsitePageUpdate = {
  url?: string;
  status?: number;
  priority?: number;
  last_modified?: string;
  change_frequency?: SitemapPageChangeFrequency;
  sitemap_id?: string;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SitemapPageChangeFrequency } from './SitemapPageChangeFrequency';
import type { WebsiteKeywordCorpusRead } from './WebsiteKeywordCorpusRead';
import type { WebsitePageSpeedInsightsRead } from './WebsitePageSpeedInsightsRead';

export type WebsitePageReadRelations = {
  id: string;
  created_on: string;
  updated_on: string;
  url: string;
  status: number;
  priority: number;
  last_modified?: string;
  change_frequency?: SitemapPageChangeFrequency;
  website_id: string;
  sitemap_id?: string;
  keywordcorpus?: Array<WebsiteKeywordCorpusRead>;
  pagespeedinsights?: Array<WebsitePageSpeedInsightsRead>;
};


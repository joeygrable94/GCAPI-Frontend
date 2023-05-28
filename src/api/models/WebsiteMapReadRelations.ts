/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WebsitePageRead } from './WebsitePageRead';

export type WebsiteMapReadRelations = {
  id: string;
  created_on: string;
  updated_on: string;
  url: string;
  website_id: string;
  pages?: Array<WebsitePageRead>;
};


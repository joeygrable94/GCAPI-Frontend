/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientRead } from './ClientRead';
import type { WebsiteMapRead } from './WebsiteMapRead';
import type { WebsitePageRead } from './WebsitePageRead';

export type WebsiteReadRelations = {
  id: string;
  created_on: string;
  updated_on: string;
  domain: string;
  is_secure?: boolean;
  clients?: Array<ClientRead>;
  sitemaps?: Array<WebsiteMapRead>;
  pages?: Array<WebsitePageRead>;
};


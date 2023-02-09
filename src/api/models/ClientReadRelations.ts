/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WebsiteRead } from './WebsiteRead';

export type ClientReadRelations = {
  id: string;
  created_on: string;
  updated_on: string;
  content?: string;
  title: string;
  websites?: Array<WebsiteRead>;
};


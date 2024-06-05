/* generated using openapi-typescript-codegen -- do not edit */
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
    website_id?: (string | null);
    sitemap_id?: (string | null);
};


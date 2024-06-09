import * as v from 'valibot';
import {
  IsValidWebsiteId,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsActiveOptional,
  IsValidWebsiteSitemapId,
  IsValidWebsiteSitemapUrl,
  IsValidWebsiteSitemapUrlOptional
} from '~/shared/db';

export const SchemaCreateWebsiteSitemap = v.object({
  url: IsValidWebsiteSitemapUrl,
  is_active: IsValidWebsiteIsActive,
  website_id: IsValidWebsiteId
});

export type SCreateWebsiteSitemap = v.InferInput<typeof SchemaCreateWebsiteSitemap>;

export const SchemaEditWebsiteSitemap = v.object({
  sitemapId: IsValidWebsiteSitemapId,
  url: IsValidWebsiteSitemapUrlOptional,
  is_active: IsValidWebsiteIsActiveOptional
});

export type SEditWebsiteSitemap = v.InferInput<typeof SchemaEditWebsiteSitemap>;

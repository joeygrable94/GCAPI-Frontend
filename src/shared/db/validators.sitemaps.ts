import * as v from 'valibot';
import { DB_STR_URLPATH_MAXLEN_INPUT } from './database.constants';

export const IsValidWebsiteSitemapId = v.pipe(
  v.string('sitemap id must be a string'),
  v.trim(),
  v.uuid('please enter a valid sitemap id')
);

export const IsValidWebsiteSitemapUrl = v.pipe(
  v.string('sitemap URL must be a string'),
  v.trim(),
  v.minLength(1, 'the URL must be 1 characters or more'),
  v.maxLength(
    DB_STR_URLPATH_MAXLEN_INPUT,
    `the URL must be ${DB_STR_URLPATH_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidWebsiteSitemapUrlOptional = v.pipe(
  v.optional(v.string('sitemap URL must be a string')),
  v.trim(),
  v.minLength(1, 'the URL must be 1 characters or more'),
  v.maxLength(
    DB_STR_URLPATH_MAXLEN_INPUT,
    `the URL must be ${DB_STR_URLPATH_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidWebsiteSitemapIsActive = v.boolean(
  'website sitemape active status must be a boolean'
);

export const IsValidWebsiteSitemapIsActiveOptional = v.optional(
  v.boolean('website sitemape active status must be a boolean')
);

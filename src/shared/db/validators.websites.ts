import * as v from 'valibot';
import { DB_STR_TINYTEXT_MAXLEN_INPUT } from './database.constants';

export const IsValidWebsiteId = v.pipe(
  v.string('website id must be a string'),
  v.trim(),
  v.uuid('please enter a valid website id')
);

export const IsValidWebsiteDomain = v.pipe(
  v.string('domain must be a string'),
  v.trim(),
  v.minLength(5, 'domain must be 5 characters or more'),
  v.maxLength(
    DB_STR_TINYTEXT_MAXLEN_INPUT,
    `domain must be ${DB_STR_TINYTEXT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidWebsiteDomainOptional = v.pipe(
  v.optional(v.string('domain must be a string')),
  v.trim(),
  v.minLength(5, 'domain must be 5 characters or more'),
  v.maxLength(
    DB_STR_TINYTEXT_MAXLEN_INPUT,
    `domain must be ${DB_STR_TINYTEXT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidWebsiteIsActive = v.boolean(
  'website active status must be a boolean'
);

export const IsValidWebsiteIsActiveOptional = v.optional(
  v.boolean('website active status must be a boolean')
);

export const IsValidWebsiteIsSecure = v.boolean(
  'website secure status must be a boolean'
);

export const IsValidWebsiteIsSecureOptional = v.optional(
  v.boolean('website secure status must be a boolean')
);

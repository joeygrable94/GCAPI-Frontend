import * as v from 'valibot';
import {
  DB_STR_64BIT_MAXLEN_INPUT,
  DB_STR_DESC_MAXLEN_INPUT,
  DB_STR_TINYTEXT_MAXLEN_INPUT
} from './database.constants';

export const IsValidClientId = v.pipe(
  v.string('client id must be a string'),
  v.trim(),
  v.uuid('please enter a valid client id')
);

export const IsValidSlug = v.pipe(
  v.string('slug must be a string'),
  v.trim(),
  v.minLength(3, 'slug must be 3 characters or more'),
  v.maxLength(
    DB_STR_64BIT_MAXLEN_INPUT,
    `slug must be ${DB_STR_64BIT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidTitle = v.pipe(
  v.string('title must be a string'),
  v.trim(),
  v.minLength(5, 'title must be 5 characters or more'),
  v.maxLength(
    DB_STR_TINYTEXT_MAXLEN_INPUT,
    `title must be ${DB_STR_TINYTEXT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidTitleOptional = v.pipe(
  v.optional(v.string('title must be a string')),
  v.trim(),
  v.minLength(5, 'title must be 5 characters or more'),
  v.maxLength(
    DB_STR_TINYTEXT_MAXLEN_INPUT,
    `title must be ${DB_STR_TINYTEXT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidDescription = v.pipe(
  v.optional(v.string('description must be a string')),
  v.trim(),
  v.maxLength(
    DB_STR_DESC_MAXLEN_INPUT,
    `description must be ${DB_STR_DESC_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidClientIsActive = v.boolean(
  'client active status must be a boolean'
);

export const IsValidClientIsActiveOptional = v.optional(
  v.boolean('client active status must be a boolean')
);

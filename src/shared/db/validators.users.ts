import * as v from 'valibot';
import {
  DB_STR_SHORTTEXT_MAXLEN_INPUT,
  DB_STR_TINYTEXT_MAXLEN_INPUT
} from './database.constants';

export const IsValidUserId = v.pipe(
  v.string('user id must be a string'),
  v.trim(),
  v.uuid('please enter a valid user id')
);

export const IsValidUsername = v.pipe(
  v.optional(v.string('username must be a string')),
  v.trim(),
  v.minLength(5, 'username must be 5 characters or more'),
  v.maxLength(
    DB_STR_TINYTEXT_MAXLEN_INPUT,
    `username must be ${DB_STR_TINYTEXT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidUserPicture = v.pipe(
  v.optional(v.string('username must be a string')),
  v.trim(),
  v.maxLength(
    DB_STR_SHORTTEXT_MAXLEN_INPUT,
    `username must be ${DB_STR_SHORTTEXT_MAXLEN_INPUT} characters or less`
  )
);

export const IsValidUserIsActive = v.boolean('user active status must be a boolean');

export const IsValidUserIsActiveOptional = v.optional(
  v.boolean('user active status must be a boolean')
);

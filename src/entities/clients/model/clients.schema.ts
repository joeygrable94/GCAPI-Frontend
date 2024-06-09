import * as v from 'valibot';
import {
  IsValidClientId,
  IsValidClientIsActive,
  IsValidClientIsActiveOptional,
  IsValidDescription,
  IsValidSlug,
  IsValidTitle,
  IsValidTitleOptional
} from '~/shared/db';

export const SchemaCreateClient = v.object({
  slug: IsValidSlug,
  title: IsValidTitle,
  description: IsValidDescription,
  is_active: IsValidClientIsActive
});

export type SCreateClient = v.InferInput<typeof SchemaCreateClient>;

export const SchemaEditClient = v.object({
  clientId: IsValidClientId,
  title: IsValidTitleOptional,
  description: IsValidDescription,
  is_active: IsValidClientIsActiveOptional
});

export type SEditClient = v.InferInput<typeof SchemaEditClient>;

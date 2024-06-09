import * as v from 'valibot';
import {
  IsValidClientId,
  IsValidWebsiteDomain,
  IsValidWebsiteDomainOptional,
  IsValidWebsiteId,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsActiveOptional,
  IsValidWebsiteIsSecure,
  IsValidWebsiteIsSecureOptional
} from '~/shared/db';

export const SchemaCreateWebsite = v.object({
  domain: IsValidWebsiteDomain,
  is_secure: IsValidWebsiteIsSecure,
  is_active: IsValidWebsiteIsActive,
  clientId: IsValidClientId
});

export type SCreateWebsite = v.InferInput<typeof SchemaCreateWebsite>;

export const SchemaEditWebsite = v.object({
  websiteId: IsValidWebsiteId,
  domain: IsValidWebsiteDomainOptional,
  is_secure: IsValidWebsiteIsSecureOptional,
  is_active: IsValidWebsiteIsActiveOptional,
  clientId: IsValidClientId
});

export type SEditWebsite = v.InferInput<typeof SchemaEditWebsite>;

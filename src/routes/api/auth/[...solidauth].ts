import { SolidAuth } from '@solid-mediakit/auth';
import { authOptions } from '~/providers/auth';

export const { GET, POST } = SolidAuth(authOptions);

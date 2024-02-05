import { cache } from '@solidjs/router';
import { getUser as gU, logout as lo } from './session';

export const getUser = cache(gU, 'getUser');
export const logout = cache(lo, 'logout');

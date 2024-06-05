import { UserReadAsAdmin } from '~/shared/api';
import { UserRole } from './auth.types';

/**
 * @summary Returns a boolean if the input user is a Super User Admin
 */
export const isSuperAdmin = (user: object) => {
  if (user === undefined || isUser(user) || isManager(user)) return false;
  if (Object.keys(user).includes('is_superuser')) {
    return (user as UserReadAsAdmin).is_superuser;
  }
  return false;
};

/**
 * @summary Returns a boolean if the input user is an Admin
 */
export const isAdmin = (user: object) => {
  if (user === undefined || isUser(user) || isManager(user)) return false;
  return Object.keys(user).includes('is_superuser');
};

/**
 * @summary Returns a boolean if the input user is a Manager
 */
export const isManager = (user: object) => {
  if (user === undefined || isUser(user)) return false;
  return (
    Object.keys(user).includes('scopes') && !Object.keys(user).includes('is_superuser')
  );
};

/**
 * @summary Returns a boolean if the input user is a Employee or User
 */
export const isUser = (user: object) => {
  if (user === undefined) return false;
  return (
    !Object.keys(user).includes('scopes') && !Object.keys(user).includes('is_superuser')
  );
};

/**
 * @summary Returns a boolean if the input user is a Guest
 */
export const isGuest = (user: object) => {
  if (user === undefined) return true;
  return false;
};

/**
 * @summary Returns the role of the user
 */
export const getUserRole = (user: unknown): UserRole => {
  if (user === undefined) return 'guest';
  else if (typeof user !== 'object') return 'guest';
  else if (isGuest(user as object)) return 'guest';
  else if (isUser(user as object)) return 'user';
  else if (isAdmin(user as object)) return 'admin';
  else if (isManager(user as object)) return 'manager';
  else return 'guest';
};

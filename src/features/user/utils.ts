import { CurrentUser } from '~/features/auth';
import { UserReadAsAdmin } from '~/shared/api';
import { UserRole } from './types';

/**
 * @summary Returns a boolean if the input user is a Super User Admin
 */
export const isSuperAdmin = (user: CurrentUser) => {
  if (isGuest(user) || isUser(user) || isManager(user)) return false;
  if (Object.keys(user).includes('is_superuser')) {
    return (user as UserReadAsAdmin).is_superuser;
  }
  return false;
};

/**
 * @summary Returns a boolean if the input user is an Admin
 */
export const isAdmin = (user: CurrentUser) => {
  if (isGuest(user) || isUser(user) || isManager(user)) return false;
  return Object.keys(user).includes('is_superuser');
};

/**
 * @summary Returns a boolean if the input user is a Manager
 */
export const isManager = (user: CurrentUser) => {
  if (isGuest(user) || isUser(user)) return false;
  return (
    Object.keys(user).includes('scopes') && !Object.keys(user).includes('is_superuser')
  );
};

/**
 * @summary Returns a boolean if the input user is a Employee or User
 */
export const isUser = (user: CurrentUser) => {
  if (isGuest(user)) return false;
  return (
    !Object.keys(user).includes('scopes') && !Object.keys(user).includes('is_superuser')
  );
};

/**
 * @summary Returns a boolean if the input user is a Guest
 */
export const isGuest = (user: CurrentUser) => {
  if (user === undefined) return false;
  return user.username === 'guest';
};

/**
 * @summary Returns the role of the user
 */
export const getUserRole = (user: CurrentUser): UserRole => {
  if (isGuest(user)) return 'guest';
  else if (isUser(user)) return 'user';
  else if (isAdmin(user)) return 'admin';
  else if (isManager(user)) return 'manager';
  else return 'guest';
};

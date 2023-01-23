import {
  ApiError,
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  OpenAPI,
  UserAdmin,
  UserCreate,
  UserRead,
  UsersService,
  UserUpdate
} from '~/api';
import { AppStoreState, IAppAgent, IAuthAgent, IUserAgent } from './types';
import { log } from './utils';

export default function createAgentService(
  actions: any,
  state: AppStoreState
): IAppAgent {
  const Auth: IAuthAgent = {
    login: async (
      email: string,
      password: string
    ): Promise<UserAdmin | UserRead | boolean> => {
      try {
        let access: BearerResponse = await AuthService.authAccessApiV1AuthAccessPost({
          formData: {
            username: email,
            password: password
          } as Body_auth_access_api_v1_auth_access_post
        });
        OpenAPI.TOKEN = access?.access_token;
        let user: UserAdmin | UserRead =
          await UsersService.usersCurrentUserApiV1UsersMeGet();
        return user;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    logout: async (): Promise<boolean> => {
      try {
        await AuthService.authLogoutApiV1AuthLogoutDelete();
        OpenAPI.TOKEN = '';
        return true;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    register: async (data: UserCreate): Promise<UserRead | boolean> => {
      try {
        let user: UserRead = await AuthService.authRegisterApiV1AuthRegisterPost({
          requestBody: data
        });
        return user;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    verify: async (email: string): Promise<boolean> => {
      try {
        await AuthService.authVerificationApiV1AuthVerificationPost({
          requestBody: { email: email }
        });
        return true;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    confirm: async (token: string, csrf: string): Promise<boolean> => {
      try {
        await AuthService.authConfirmationApiV1AuthConfirmationGet({
          token: token,
          csrf: csrf
        });
        return true;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    passwordForgot: async (email: string): Promise<boolean> => {
      try {
        await AuthService.authForgotPasswordApiV1AuthForgotPasswordPost({
          requestBody: { email: email }
        });
        return true;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    passwordReset: async (
      password: string,
      token: string,
      csrf: string
    ): Promise<UserRead | boolean> => {
      try {
        let user: UserRead =
          await AuthService.authResetPasswordApiV1AuthResetPasswordPost({
            requestBody: {
              password: password,
              token: token,
              csrf: csrf
            }
          });
        return user;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    }
  };
  const Users: IUserAgent = {
    list: async (page: number): Promise<UserAdmin[] | UserRead[] | null[]> => {
      try {
        if (page <= 0) page = 1;
        let users: UserAdmin[] | UserRead[] | null[] =
          await UsersService.usersListUsersApiV1UsersGet({ page: page });
        return users;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return [];
      }
    },
    create: async (data: UserCreate): Promise<UserAdmin | UserRead | boolean> => {
      try {
        let user: UserAdmin | UserRead =
          await UsersService.usersCreateUserApiV1UsersPost({
            requestBody: data
          });
        return user;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    read: async (id: any): Promise<UserAdmin | UserRead | boolean> => {
      try {
        let user: UserAdmin | UserRead = await UsersService.usersUserApiV1UsersIdGet({
          id: id
        });
        return user;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    update: async (
      id: any,
      data: UserUpdate
    ): Promise<UserAdmin | UserRead | boolean> => {
      try {
        let user: UserAdmin | UserRead =
          await UsersService.usersPatchUserApiV1UsersIdPatch({
            id: id,
            requestBody: data
          });
        return user;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    },
    delete: async (id: any): Promise<boolean> => {
      try {
        await UsersService.usersDeleteUserApiV1UsersIdDelete({
          id: id
        });
        return true;
      } catch (error: ApiError | any) {
        log(error?.body?.detail);
        return false;
      }
    }
  };
  return {
    Auth,
    Users
  };
}

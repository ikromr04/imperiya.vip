export const DEFAULT_AVATAR_PATH = '/images/default-avatar.png';

export const AppRoute = {
  Journal: '/journal',
  Auth: {
    Index: '/auth',
    Login: '/auth/login',
    ResetPassword: '/auth/reset-password',
    Profile: '/auth/profile',
  },
  NotFound: '*',
};

export const APIRoute = {
  Auth: {
    Login: '/auth/login',
  }
};

export enum SliceName {
  Auth = 'Auth',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

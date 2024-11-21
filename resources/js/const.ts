export const AppRoute = {
  Index: '/journal',
  Auth: {
    Index: '/auth',
    Login: '/auth/login',
    ResetPassword: '/auth/reset-password',
  },
  NotFound: '*',
};

export const APIRoute = {
  Places: {
    Index: '/places',
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

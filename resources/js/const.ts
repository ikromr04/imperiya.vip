export const AppRoute = {
  Journal: '/journal',
  Schedule: {
    Index: '/schedule',
  },
  Users: {
    Index: '/users',
  },
  Class: {
    Index: '/classes',
  },
  Monitoring: {
    Index: '/monitoring',
  },
  Settings: {
    Index: '/settings',
  },
  Auth: {
    Login: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ResetPassword: '/auth/reset-password/:token',
    Profile: '/auth/profile',
  },
  NotFound: '*',
};

export const APIRoute = {
  Auth: {
    Check: '/auth/check',
    Login: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ResetPassword: '/auth/reset-password',
    Logout: '/auth/logout',
  },
  Users: {
    Index: '/users',
  },
};

export enum SliceName {
  App = 'App',
  Auth = 'Auth',
  Users = 'Users',
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
};

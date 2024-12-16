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
  Genders: {
    Index: '/genders',
  },
  Roles: {
    Index: '/roles',
  },
  Grades: {
    Index: '/grades',
  },
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
};

export enum SliceName {
  App = 'App',
  Auth = 'Auth',
  Users = 'Users',
  Genders = 'Genders',
  Roles = 'Roles',
  Grades = 'Grades',
};

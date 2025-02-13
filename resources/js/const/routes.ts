export const AppRoute = {
  Journal: '/journal',
  Schedule: {
    Index: '/schedule',
  },
  Users: {
    Index: '/users',
    Show: '/users/:userId',
    Education: '/users/:userId/education',
    Work: '/users/:userId/work-experience',
    Schedule: '/users/:userId/schedule',
    Evaluations: '/users/:userId/evaluations',
  },
  Classes: {
    Index: '/classes',
    Show: '/classes/:classId',
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
    Show: '/users/:userId',
    Avatar: '/users/:userId/avatar',
    Role: '/users/:userId/role',
  },
  Grades: {
    Index: '/grades',
    Show: '/grades/:gradeId',
  },
  Nationalities: {
    Index: '/nationalities',
  }
};

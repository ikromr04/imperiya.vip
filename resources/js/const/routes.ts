export const AppRoute = {
  Auth: {
    Login: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ResetPassword: '/auth/reset-password/:token',
    Profile: '/auth/profile',
    Register: '/auth/register',
    RegisterLinks: '/auth/register/links',
  },
  Journal: '/journal',
  Schedules: {
    Index: '/schedules',
  },
  Users: {
    Index: '/users',
    Create: '/users/create',
    Show: '/users/:id',
    Education: '/users/:id/education',
    Work: '/users/:id/work-experience',
    Schedule: '/users/:id/schedule',
    Evaluations: '/users/:id/evaluations',
  },
  Classes: {
    Index: '/classes',
    Show: '/classes/:id',
  },
  Lessons: {
    Index: '/lessons',
  },
  Monitoring: {
    Index: '/monitoring',
  },
  Settings: {
    Index: '/settings',
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
    RegisterLinks: '/auth/register/links',
    RegisterLink: '/auth/register/links/:id',
  },
  Users: {
    Index: '/users',
    Show: '/users/:id',
    Avatar: '/users/:id/avatar',
    Role: '/users/:id/role',
    Login: '/users/login/:login',
  },
  Grades: {
    Index: '/grades',
    Show: '/grades/:id',
  },
  Lessons: {
    Index: '/lessons',
    Show: '/lessons/:id',
  },
  Schedules: {
    Index: '/schedules',
    Show: '/schedules/:id',
  },
  Journal: {
    Index: '/journal',
  },
  Evaluations: {
    Index: '/evaluations',
  },
};

export const AppRoute = {
  Auth: {
    Login: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ResetPassword: '/auth/reset-password/:token',
    Profile: '/auth/profile',
    Register: '/auth/register',
    RegisterLinks: '/auth/register/links',
    Lessons: '/auth/lessons',
  },
  Journal: '/journal',
  Lessons: {
    Index: '/lessons',
  },
  Users: {
    Index: '/users',
    Create: '/users/create',
    Show: '/users/:id',
    Lessons: '/users/:id/lessons',
  },
  Classes: {
    Index: '/classes',
    Show: '/classes/:id',
  },
  Subjects: {
    Index: '/subjects',
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
    Register: '/auth/register',
    RegisterLinks: '/auth/register/links',
    RegisterLink: '/auth/register/links/:id',
  },
  Users: {
    Index: '/users',
    Show: '/users/:id',
    Avatar: '/users/:id/avatar',
    Role: '/users/:id/role',
    Login: '/users/login/:login',
    Student: '/users/student',
  },
  Nationalities: {
    Index: '/nationalities',
  },
  Professions: {
    Index: '/professions',
  },
  Grades: {
    Index: '/grades',
    Show: '/grades/:id',
  },
  Lessons: {
    Index: '/lessons',
    Show: '/lessons/:id',
  },
  Subjects: {
    Index: '/subjects',
    Show: '/subjects/:id',
  },
  Journal: {
    Index: '/journal',
  },
  Marks: {
    Index: '/marks',
  },
};

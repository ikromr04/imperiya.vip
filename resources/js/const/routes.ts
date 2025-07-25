export const AppRoute = {
  Auth: {
    Index: '/auth',
    Login: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ResetPassword: '/auth/reset-password/:token',
    Profile: '/auth/profile',
    Register: '/auth/register',
    RegisterLinks: '/auth/register/links',
    Lessons: '/auth/lessons',
    Diary: '/auth/diary',
    Ratings: '/auth/ratings',
    MyClass: '/auth/class',
  },
  Journal: '/journal',
  Lessons: {
    Index: '/lessons',
    Types: '/lessons/types',
  },
  Diary: {
    Index: '/diary',
  },
  Users: {
    Index: '/users',
    Create: '/users/create',
    Show: '/users/:id',
    Lessons: '/users/:id/lessons',
    Diary: '/users/:id/diary',
    Ratings: '/users/:id/ratings',
    Leadership: '/users/:id/leadership',
  },
  Classes: {
    Index: '/classes',
    Show: '/classes/:id',
  },
  Subjects: {
    Index: '/subjects',
  },
  Nationalities: {
    Index: '/nationalities',
  },
  Professions: {
    Index: '/professions',
  },
  Ratings: {
    Dates: '/ratings/dates',
  },
  Settings: {
    Index: '/settings',
  },
  Reports: {
    Index: '/reports',
    Grades: '/reports/grades',
    Grade: '/reports/grades/:id',
  },
  Reasons: {
    Index: '/reasons'
  },
  Books: {
    Index: '/books',
    Show: '/books/:id',
    Categories: '/books-categories',
  },
  Leadership: {
    Index: '/leadership'
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
    Diary: '/auth/diary',
    Ratings: '/auth/ratings',
  },
  Users: {
    Index: '/users',
    Show: '/users/:id',
    Avatar: '/users/:id/avatar',
    Role: '/users/:id/role',
    Ratings: '/users/:id/ratings',
  },
  Grades: {
    Index: '/grades',
    Show: '/grades/:id',
  },
  Lessons: {
    Index: '/lessons',
    Show: '/lessons/:id',
    Topic: '/lessons/:id/topic',
    Types: '/lessons/types',
    TypesShow: '/lessons/types/:id',
  },
  Subjects: {
    Index: '/subjects',
    Show: '/subjects/:id',
  },
  Nationalities: {
    Index: '/nationalities',
    Show: '/nationalities/:id',
  },
  Professions: {
    Index: '/professions',
    Show: '/professions/:id',
  },
  Journal: {
    Index: '/journal',
  },
  Marks: {
    Index: '/marks',
    Show: '/marks/:id',
    Diary: '/marks/diary',
    Students: '/marks/students',
  },
  Ratings: {
    Index: '/ratings',
    Dates: '/ratings/dates',
  },
  Reasons: {
    Index: '/reasons',
    Show: '/reasons/:id',
  },
  Books: {
    Index: '/books',
    Show: '/books/:id',
    Categories: '/book-categories',
    CategoriesShow: '/book-categories/:id',
  },
  Leadership: {
    Index: '/leadership'
  },
};

export const AppRoute = {
  Journal: '/journal',
  Schedule: {
    Index: '/schedule',
  },
  Users: {
    Index: '/users',
    Show: '/users/:userId',
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
    Show: '/users/:userId',
    Avatar: '/users/:userId/avatar',
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
  Nationalities: {
    Index: '/nationalities',
  }
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
  Nationalities = 'Nationalities'
};

export const DAYS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
export const MONTHS = [
  { value: '01', label: 'Январь' },
  { value: '02', label: 'Февраль' },
  { value: '03', label: 'Март' },
  { value: '04', label: 'Апрель' },
  { value: '05', label: 'Май' },
  { value: '06', label: 'Июнь' },
  { value: '07', label: 'Июль' },
  { value: '08', label: 'Август' },
  { value: '09', label: 'Сентябрь' },
  { value: '10', label: 'Октябрь' },
  { value: '11', label: 'Ноябрь' },
  { value: '12', label: 'Декабрь' },
];

export const Role = {
   'super-admin': 'Супер-администратор',
   'admin': 'Администратор',
   'director': 'Директор',
   'teacher': 'Педагог',
   'student': 'Родитель',
   'parent': 'Ученик',
};

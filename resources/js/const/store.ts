export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
};

export enum SliceName {
  App = 'App',
  Auth = 'Auth',
  Lessons = 'Lessons',
  Users = 'Users',
  Grades = 'Grades',
  Subjects = 'Subjects',
  Nationalities = 'Nationalities',
  Professions = 'Professions',
  Ratings = 'Ratings',
  Marks = 'Marks',
  Reasons = 'Reasons',
  Books = 'Books',
};

export enum AsyncStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

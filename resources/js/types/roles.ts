import { Grade } from './grades';

export type RoleId =
  'super-admin' | 'admin' | 'director' | 'teacher' | 'parent' | 'student';

export type Role = {
  id: RoleId;
  name: string;
  grade: Grade;
};

export type Roles = Role[];

import { Grade } from './grades';
import { Educations, UserId } from './users';

export type RoleType = 'super-admin' | 'admin' | 'director' | 'teacher' | 'parent' | 'student';

export type Parent = {
  id: number;
  name: string;
}

export type Role = {
  type: RoleType;
  name: string;
  grade?: Grade;
  educations?: Educations;
  mother?: Parent;
  father?: Parent;
  children?: {
    id: UserId;
    name: string;
  }[];
};

export type Roles = Role[];

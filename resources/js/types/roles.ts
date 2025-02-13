import { RoleName } from '@/const/users';
import { ID } from '.';
import { Grade } from './grades';
import { UserId } from './users';

export type Role = keyof typeof RoleName;

export type Roles = Role[];

export type RoleId = ID;

export type Superadmin = {
  id: UserId;
  user: {
    id: UserId;
    name: string;
  };
};

export type Admin = {
  id: UserId;
  user: {
    id: UserId;
    name: string;
  };
};

export type Director = {
  id: UserId;
  user: {
    id: UserId;
    name: string;
  };
};

export type Teacher = {
  id: UserId;
  user: {
    id: UserId;
    name: string;
  };
};

export type Parent = {
  id: RoleId;
  children?: {
    id: UserId;
    name: string;
  }[];
  educations?: Educations;
};

export type Student = {
  id: RoleId;
  user: {
    id: UserId;
    name: string;
  };
  grade?: Grade;
  mother?: {
    id: UserId;
    name: string;
  };
  father?: {
    id: UserId;
    name: string;
  };
};

export type Students = Student[];

type Education = {
  institution: string;
  faculty: string;
  speciality: string;
  form: string;
  startedAt: string;
  graduatedAt: string;
};

type Educations = Education[];

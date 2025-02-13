import { ID } from '.';
import { GradeId } from './grades';
import { Nationality, NationalityId } from './nationalities';
import { Admin, Director, Parent, Role, Student, Superadmin, Teacher } from './roles';

export type UserId = ID;

export type Sex = 'male' | 'female';

export type User = {
  id: UserId;
  name: string;
  login: string;
  createdAt: Date;
  role: Role;
  sex: Sex;

  superadmin?: Superadmin;
  admin?: Admin;
  director?: Director;
  teacher?: Teacher;
  student?: Student;
  parent?: Parent;

  email?: string;
  avatar?: string;
  avatarThumb?: string;
  birthDate?: string;
  address?: string;
  nationality?: Nationality;
  socialLink?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    odnoklassniki?: string;
  };
  phoneNumbers?: {
    numbers: number;
    code: number;
  }[];
};

export type Users = User[];

export type UsersFilter = {
  searchKeyword: string;
  name: {
    query: string;
    visibility: boolean;
  },
  login: {
    query: string;
    visibility: boolean;
  },
  roles: {
    query: Role[];
    visibility: boolean;
  },
  email: {
    query: string;
    visibility: boolean;
  },
  birthDate: {
    day: string;
    month: string;
    year: string;
    visibility: boolean;
  },
  address: {
    query: string;
    visibility: boolean;
  },
  sex: {
    query: Sex | '';
    visibility: boolean;
  },
  nationalities: {
    query: NationalityId[];
    visibility: boolean;
  },
  socialLink: {
    query: string;
    visibility: boolean;
  },
  phoneNumber: {
    query: string;
    visibility: boolean;
  },
  grades: {
    query: GradeId[];
    visibility: boolean;
  },
};

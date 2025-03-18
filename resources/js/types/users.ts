import { RoleName } from '@/const/users';
import { ID } from '.';
import { GradeId } from './grades';

export type Role = keyof typeof RoleName;

export type Sex = 'male' | 'female';

export type EducationId = ID;

export type Education = {
  id: EducationId;
  institution: string;
  faculty: string;
  speciality: string;
  form: string;
  startedAt: string;
  graduatedAt: string;
};

export type UserId = ID;

export type User = {
  id: UserId;
  name: string;
  login: string;
  role: Role;
  sex: Sex;
  email?: string;
  avatar?: string;
  avatarThumb?: string;
  birthDate?: Date;
  address?: string;
  nationality?: string;
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
  updatedAt: Date;
  createdAt: Date;
  // superadmin?: Superadmin;
  // admin?: Admin;
  // director?: Director;
  teacher?: {
    educations?: Education[];
  };
  parent?: {
    children?: UserId[];
    educations?: Education[];
  };
  student?: {
    gradeId?: GradeId;
    motherId?: UserId;
    fatherId?: UserId;
  };
};

export type Users = User[];

export type UsersFilter = {
  name?: string,
  sex?: string,
  grade?: string,
  role?: string,
  phone?: string,
  email?: string,
  login?: string,
  birthDate?: {
    day: string;
    month: string;
    year: string;
  },
  address?: string;
  nationality?: string;
};

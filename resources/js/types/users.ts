import { ID } from '.';
import { Gender, GenderId } from './genders';
import { Role, RoleType } from './roles';
import { GradeId } from './grades';
import { Nationality, NationalityId } from './nationalities';

export type UserId = ID

export type User = {
  id: UserId;
  name: string;
  login: string;
  role: Role;
  email?: string;
  avatar?: string;
  avatarThumb?: string;
  birthDate?: string;
  address?: string;
  gender?: Gender;
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
  createdAt: Date;
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
    query: RoleType[];
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
  gender: {
    query: GenderId;
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

export type Education = {
  institution: string;
  faculty: string;
  speciality: string;
  form: string;
  startedAt: string;
  graduatedAt: string;
};

export type Educations = Education[];

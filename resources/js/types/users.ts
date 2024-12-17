import { ID } from '.';
import { Gender, GenderId } from './genders';
import { Role, RoleId } from './roles';
import { Grade, GradeId } from './grades';
import { Nationality, NationalityId } from './nationalities';
import { Phones } from './phones';

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
  facebook?: string;
  instagram?: string;
  telegram?: string;
  odnoklassniki?: string;
  gender?: Gender;
  grade?: Grade;
  phones?: Phones;
  nationality?: Nationality;
};

export type Users = User[];

export type UsersView = 'list' | 'grid';

export type UsersFilter = {
  searchKeyword: string;
  name: {
    query: string;
    visibility: boolean;
  },
  gender: {
    query: GenderId;
    visibility: boolean;
  },
  roles: {
    query: RoleId[];
    visibility: boolean;
  },
  grades: {
    query: GradeId[];
    visibility: boolean;
  },
  phone: {
    query: string;
    visibility: boolean;
  },
  email: {
    query: string;
    visibility: boolean;
  },
  login: {
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
  nationalities: {
    query: NationalityId[];
    visibility: boolean;
  },
  socials: {
    query: string[];
    visibility: boolean;
  },
};

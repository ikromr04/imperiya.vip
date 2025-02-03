import { UserId } from '@/types/users';
import { GenderId } from '../types/genders';
import { GradeId } from '../types/grades';
import { NationalityId } from '../types/nationalities';
import { RoleType } from '../types/roles';

export type UserFilterDTO = {
  query?: string;
};

export type UserStoreDTO = {
  name: string;
  login: string;
  role_type: RoleType;
  email: string;
  birth_date: string;
  address: string;
  facebook: string;
  instagram: string;
  telegram: string;
  odnoklassniki: string;
  gender_id: GenderId;
  grade_id: GradeId;
  nationality_id: NationalityId;
}

export type UserUpdateDTO = {
  id: UserId;
  name?: string;
  login?: string;
  email?: string;
  birth_date?: string;
  address?: string;
  gender_id?: GenderId;
  nationality_id?: NationalityId;
  social_link?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    odnoklassniki?: string;
  };
  phone_numbers?: {
    numbers: number;
    code: number;
  }[];
}

export type UserDeleteDTO = {
  user_id: UserId;
  parents_deletion?: boolean;
};

export type EducationStoreDTO = {
  institution: string;
  faculty: string;
  speciality: string;
  form: string;
  startedAt: string;
  graduatedAt: string;
};

import { Role, Sex, UserId } from '@/types/users';
import { GradeId } from '../types/grades';
import { NationalityId } from '@/types/nationalities';

export type UserStoreDTO = {
  name: string;
  surnname: string;
  patronymic?: string;
  login: string;
  role: Role;
  sex: Sex;
  email?: string;
  birth_date?: string;
  address?: string;
  nationality_id?: string;
  social_link?: {
    facebook: string;
    instagram: string;
    telegram: string;
    odnoklassniki: string;
  };
  phone_numbers?: {
    code: number;
    numbers: number;
  }[];
  whatsapp?: {
    code: number;
    numbers: number;
  };
}

export type UserUpdateDTO = {
  id: UserId;
  name?: string;
  surname?: string;
  patronymic?: string;
  login?: string;
  sex?: Sex;
  birth_date?: Date;
  nationality_id?: NationalityId;
  email?: string;
  address?: {
    physical_address: string;
    region: string;
  };
  social_link?: {
    facebook: string;
    instagram: string;
    telegram: string;
    odnoklassniki: string;
  };
  phone_numbers?: {
    numbers: number;
    code: number;
  }[];
  whatsapp?: {
    code: number;
    numbers: number;
  };
}

export type RoleUpdateDTO = {
  user_id: UserId;
  grade_id?: GradeId;
  mother_id?: UserId;
  father_id?: UserId;
  children?: UserId[];
};

export type EducationStoreDTO = {
  institution: string;
  faculty: string;
  speciality: string;
  form: string;
  startedAt: string;
  graduatedAt: string;
};

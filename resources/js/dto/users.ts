import { Role, Sex, UserId } from '@/types/users';
import { GradeId } from '../types/grades';

export type UserStoreDTO = {
  name: string;
  login: string;
  role: Role;
  sex: Sex;
  email?: string;
  birth_date?: Date;
  address?: string;
  nationality?: string;
  social_link?: {
    facebook: string;
    instagram: string;
    telegram: string;
    odnoklassniki: string;
  };
  phone_numbers: {
    numbers: number;
    code: number;
  }[];
  grade_id?: GradeId;
  mother_id?: UserId;
  father_id?: UserId;
  children?: UserId[];
}

export type UserUpdateDTO = {
  id: UserId;
  name?: string;
  login?: string;
  email?: string;
  birth_date?: Date;
  address?: string;
  sex?: Sex;
  nationality?: string;
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

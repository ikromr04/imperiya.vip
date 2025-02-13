import { Sex, UserId } from '@/types/users';
import { GradeId } from '../types/grades';
import { NationalityId } from '../types/nationalities';
import { Role } from '../types/roles';

export type UserFilterDTO = {
  query?: string;
};

export type UserStoreDTO = {
  name: string;
  login: string;
  role: Role;
  email: string;
  birth_date: string;
  address: string;
  facebook: string;
  instagram: string;
  telegram: string;
  odnoklassniki: string;
  sex: Sex;
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
  sex?: Sex;
  nationality_id?: NationalityId;
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

export type UserDeleteDTO = {
  user_id: UserId;
  parents_deletion?: boolean;
};

export type RoleUpdateDTO = {
  userId: UserId;
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

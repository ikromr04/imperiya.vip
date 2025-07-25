import { RoleName } from '@/const/users';
import { ID } from '.';
import { GradeId } from './grades';
import { NationalityId } from './nationalities';
import { ProfessionId } from './professions';

export type Role = keyof typeof RoleName;

export type Sex = 'male' | 'female';

export type UserId = ID;

export type User = {
  id: UserId;
  name: string;
  surname: string;
  patronymic?: string;
  login?: string;
  password?: string;
  role: Role;
  sex: Sex;
  birthDate?: Date;
  nationalityId?: NationalityId;
  email?: string;
  avatar?: string;
  avatarThumb?: string;
  address?: {
    physicalAddress: string;
    region: string;
  };
  socialLink?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    odnoklassniki?: string;
  };
  phoneNumbers?: {
    code: number;
    numbers: number;
  }[];
  whatsapp?: {
    code: number;
    numbers: number;
  };
  createdAt?: string;
  teacher?: {
    grades?: GradeId[];
    education?: string;
    achievements?: string;
    workExperience?: string;
  };
  parent?: {
    children?: UserId[];
    professionId: ProfessionId;
    workplace: string;
    position: string;
  };
  student?: {
    gradeId?: GradeId;
    motherId?: UserId;
    fatherId?: UserId;
    admissionDate: string;
    previousSchools: string;
    medicalRecommendations: string;
    talents: string;
  };
  blockedAt?: string;
};

export type Users = User[];

export type UsersFilter = {
  name?: string;
  sex?: string;
  grade?: string;
  role?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  login?: string;
  password?: string;
  birthDate?: {
    day: string;
    month: string;
    year: string;
  };
  address?: {
    physicalAddress: string;
    region: string;
  };
  blockedAt?: string;
  nationality?: string;
  professionId?: string;
  talents?: string;
};

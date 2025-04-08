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
  login: string;
  role: Role;
  sex: Sex;
  birthDate: Date;
  nationalityId: NationalityId;
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
  createdAt: string;
  // superadmin?: Superadmin;
  // admin?: Admin;
  // director?: Director;
  // teacher?: Teacher;
  parent?: {
    children?: UserId[];
    professionId: ProfessionId;
    workplace: string;
    position: string;
    whatsapp: {
      code: number;
      numbers: number;
    };
  };
  student?: {
    gradeId?: GradeId;
    motherId?: UserId;
    fatherId?: UserId;
    admissionDate: string;
    previousSchools: string;
    medicalRecommendations: string;
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

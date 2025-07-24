import { GradeId } from '@/types/grades';
import { NationalityId } from '@/types/nationalities';
import { ProfessionId } from '@/types/professions';
import { Ratings } from '@/types/ratings';
import { SubjectId } from '@/types/subjects';

export type LoginCredentials = {
  login: string;
  password: string;
};

export type ResetPasswordEmailDTO = {
  email: string;
};

export type ResetPasswordDTO = {
  token: string;
  password: string;
  password_confirmation: string;
  email: boolean;
};

export type RegisterDTO = {
  token: string;
  children: {
    name: string;
    surname: string;
    patronymic?: string;
    birth_date: string;
    sex: string;
    nationality_id: NationalityId;
    grade_id: GradeId;
    admission_date: string;
    previous_schools: string;
    medical_recommendations: string;
    talents: string;
  }[];
  parents: {
    name: string;
    surname: string;
    patronymic?: string;
    birth_date: string;
    sex: string;
    nationality_id: NationalityId;
    profession_id: ProfessionId;
    workplace: string;
    position: string;
    tel: {
      code: string;
      numbers: string;
    };
    whatsapp: {
      code: string;
      numbers: string;
    };
    email?: string;
    address: {
      physical_address: string;
      region: string;
    };
  }[];
};

export type UserRatings = {
  subjectIds: SubjectId[];
  ratings: Ratings;
};

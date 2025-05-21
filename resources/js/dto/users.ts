import { Sex, UserId } from '@/types/users';
import { NationalityId } from '@/types/nationalities';
import { GradeId } from '@/types/grades';
import { ProfessionId } from '@/types/professions';

export type UserStoreDTO = {
  name: string;
  surname: string;
  patronymic?: string;

  role: string;
  sex: string;
  birth_date: string;

  nationality_id: NationalityId;

  email?: string;

  address: {
    physical_address: string;
    region: string;
  };

  phone_numbers?: {
    code: string;
    numbers: string;
  }[];

  whatsapp?: {
    code: string;
    numbers: string;
  };

  teacher?: {
    grades?: GradeId[];
  };

  parent?: {
    children?: UserId[];
    profession_id: ProfessionId;
    workplace: string;
    position: string;
  };

  student?: {
    grade_id: GradeId;
    mother_id?: UserId;
    father_id?: UserId;
    admission_date: string;
    previous_schools: string;
    medical_recommendations: string;
  };
};

export type UserUpdateDTO = {
  name?: string;
  surname?: string;
  patronymic?: string;
  login?: string;
  password?: string;
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
  blocked_at?: string | null;
};

export type UserRoleUpdateDTO = {
  grades?: GradeId[];
  education?: string;
  achievements?: string;
  work_experience?: string;

  children?: UserId[];
  profession_id?: ProfessionId;
  workplace?: string;
  position?: string;

  grade_id?: GradeId;
  mother_id?: UserId;
  father_id?: UserId;
  admission_date?: string;
  previous_schools?: string;
  medical_recommendations?: string;
}

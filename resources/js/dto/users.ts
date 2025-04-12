import { Role, Sex, UserId } from '@/types/users';
import { NationalityId } from '@/types/nationalities';

export type UserStoreDTO = {
  name: string;
  surname: string;
  patronymic?: string;
  role: Role;
  sex: Sex;
  birth_date: string;
  nationality_id: NationalityId;
  email?: string;
  address: {
    physical_address: string;
    region: string;
  };
  phone_numbers: {
    code: string;
    numbers: string;
  };
  whatsapp: {
    code: string;
    numbers: string;
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

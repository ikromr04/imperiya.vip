import { ID } from '.';
import { Gender } from './genders';
import { Role } from './roles';
import { Grade } from './grades';
import { Nationality } from './nationalities';

export type UserId = ID

export type User = {
  id: UserId;
  name: string;
  surname?: string;
  role: Role;
  patronymic?: string;
  login: string;
  email?: string;
  avatar?: string;
  birthDate?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  odnoklassniki?: string;
  gender?: Gender;
  grade?: Grade;
  nationality?: Nationality;
};

export type Users = User[];

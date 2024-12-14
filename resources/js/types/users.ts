import { ID } from '.';
import { Gender } from './genders';
import { Role } from './roles';
import { Grade } from './grades';
import { Nationality } from './nationalities';
import { Phones } from './phones';

export type UserId = ID

export type User = {
  id: UserId;
  name: string;
  login: string;
  role: Role;
  email?: string;
  avatar?: string;
  avatarThumb?: string;
  birthDate?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  odnoklassniki?: string;
  gender?: Gender;
  grade?: Grade;
  phones?: Phones;
  nationality?: Nationality;
};

export type Users = User[];

export type UsersView = 'list' | 'grid';

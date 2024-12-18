import { GenderId } from '../types/genders';
import { GradeId } from '../types/grades';
import { NationalityId } from '../types/nationalities';
import { RoleId } from '../types/roles';

export type UserFilterDTO = {
  query?: string;
};

export type UserStoreDTO = {
  name: string;
  login: string;
  role_id: RoleId;
  email: string;
  birth_date: string;
  address: string;
  facebook: string;
  instagram: string;
  telegram: string;
  odnoklassniki: string;
  gender_id: GenderId;
  grade_id: GradeId;
  nationality_id: NationalityId;
}

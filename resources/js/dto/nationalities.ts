import { NationalityId } from '@/types/nationalities';

export type NationalityStoreDTO = {
  name: string;
};

export type NationalityUpdateDTO = {
  id: NationalityId;
  name: string;
};

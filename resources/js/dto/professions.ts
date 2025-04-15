import { ProfessionId } from '@/types/professions';

export type ProfessionStoreDTO = {
  name: string;
};

export type ProfessionUpdateDTO = {
  id: ProfessionId;
  name: string;
};

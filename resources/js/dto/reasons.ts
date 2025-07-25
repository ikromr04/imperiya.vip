import { ReasonId } from '@/types/reasons';

export type ReasonStoreDTO = {
  description: string;
};

export type ReasonUpdateDTO = {
  id: ReasonId;
  description: string;
};

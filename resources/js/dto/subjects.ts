import { SubjectId } from '@/types/subjects';

export type SubjectStoreDTO = {
  name: string;
};

export type SubjectUpdateDTO = {
  id: SubjectId;
  name: string;
};

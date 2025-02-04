import { ID } from '@/types';
import { GradeId } from '@/types/grades';

export type GradeStoreDTO = {
  level: number;
  group: string;
};

export type GradeUpdateDTO = {
  id: GradeId;
  level: number;
  group: string;
  students: ID[];
};

import { GradeId } from '@/types/grades';
import { UserId } from '@/types/users';

export type GradeStoreDTO = {
  level: number;
  group: string;
};

export type GradeUpdateDTO = {
  id: GradeId;
  level: number;
  group: string;
  students: UserId[];
};

import { LessonId } from '@/types/lessons';
import { MarkId } from '@/types/marks';
import { UserId } from '@/types/users';

export type MarkStoreDTO = {
  score_1?: number;
  score_2?: number;
  attendance?: boolean;
  comment?: string;
  student_id: UserId;
  lesson_id: LessonId;
};

export type MarkUpdateDTO = {
  id: MarkId;
  score_1?: number;
  score_2?: number;
  attendance?: boolean;
  comment?: string;
};

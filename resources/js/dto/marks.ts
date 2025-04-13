import { LessonId } from '@/types/lessons';
import { MarkId } from '@/types/marks';
import { UserId } from '@/types/users';

export type MarkStoreDTO = {
  student_id: UserId;
  lesson_id: LessonId;
  score1?: number;
  score2?: number;
  attendance?: boolean;
  comment?: string;
};

export type MarkUpdateDTO = {
  id: MarkId;
  value: string;
};

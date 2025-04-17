import { AttendanceAbbr } from '@/const/marks';
import { LessonId } from '@/types/lessons';
import { MarkId } from '@/types/marks';
import { UserId } from '@/types/users';

export type MarkStoreDTO = {
  score_1?: number;
  score_2?: number;
  attendance: string;
  comment?: string;
  student_id: UserId;
  lesson_id: LessonId;
};

export type MarkUpdateDTO = {
  id: MarkId;
  score_1?: number;
  score_2?: number;
  attendance?: keyof typeof AttendanceAbbr;
  comment?: string;
};

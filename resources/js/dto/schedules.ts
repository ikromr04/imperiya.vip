import { Hour } from '@/const/lessons';
import { GradeId } from '@/types/grades';
import { LessonId } from '@/types/lessons';
import { ScheduleId } from '@/types/schedules';
import { UserId } from '@/types/users';

export type ScheduleStoreDTO = {
  date: string;
  hour: keyof typeof Hour;
  grade_id: GradeId;
  lesson_id: LessonId;
  teacher_id?: UserId;
  all?: boolean;
};

export type ScheduleUpdateDTO = {
  id: ScheduleId;
  date?: string;
  hour?: keyof typeof Hour;
  grade_id?: GradeId;
  lesson_id?: LessonId;
  teacher_id?: UserId;
  topic?: string;
  homework?: string;
  all?: boolean;
};

export type ScheduleDeleteDTO = {
  id: ScheduleId;
  all?: boolean;
};

import { Hour } from '@/const/lessons';
import { GradeId } from '@/types/grades';
import { LessonId } from '@/types/lessons';
import { ScheduleId } from '@/types/schedules';
import { UserId } from '@/types/users';

export type ScheduleStoreDTO = {
  date: string;
  hour: keyof typeof Hour;
  grade_id: GradeId;
  topic?: string;
  homework?: string;
  all?: boolean;
  lesson_id?: LessonId;
  teacher_id?: UserId;
};

export type ScheduleUpdateDTO = {
  id: ScheduleId;
  date?: string;
  hour?: keyof typeof Hour;
  grade_id?: GradeId;
  topic?: string;
  homework?: string;
  all?: boolean;
  lesson_id?: LessonId;
  teacher_id?: UserId;
};

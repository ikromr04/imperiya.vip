import { Hour } from '@/const/lessons';
import { GradeId } from '@/types/grades';
import { LessonId } from '@/types/lessons';
import { SubjectId } from '@/types/subjects';
import { UserId } from '@/types/users';

export type LessonStoreDTO = {
  date: string;
  hour: keyof typeof Hour;
  grade_id: GradeId;
  subject_id: SubjectId;
  teacher_id?: UserId;
  all?: boolean;
};

export type LessonUpdateDTO = {
  id: LessonId;
  date?: string;
  hour?: keyof typeof Hour;
  grade_id?: GradeId;
  subject_id?: SubjectId;
  teacher_id?: UserId;
  topic?: string;
  homework?: string;
  all?: boolean;
};

export type LessonDeleteDTO = {
  id: LessonId;
  all?: boolean;
};

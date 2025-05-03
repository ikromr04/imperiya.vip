import { Hour } from '@/const/lessons';
import { ID } from '.';
import { GradeId } from './grades';
import { UserId } from './users';
import { SubjectId } from './subjects';
import { Marks } from './marks';

export type LessonId = ID;

export type LessonTypeId = ID;

export type LessonType = {
  id: LessonTypeId;
  name: string;
};

export type LessonTypes = LessonType[];

export type Lesson = {
  id: LessonId;
  date: string;
  hour: keyof typeof Hour;
  gradeId: GradeId;
  topic?: string;
  homework?: string;
  subjectId?: SubjectId;
  teacherId?: UserId;
  typeId?: LessonTypeId;
  marks?: Marks;
};

export type Lessons = Lesson[];

export type Journal = {
  id: UserId;
  name: string;
} & Record<string, object | string | number>;

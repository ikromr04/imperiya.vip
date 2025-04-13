import { ID } from '.';
import { LessonId } from './lessons';
import { UserId } from './users';

export type MarkId = ID;

export type Mark = {
  id: MarkId;
  studentId: UserId;
  lessonId: LessonId;
  score1?: number;
  score2?: number;
  attendance?: boolean;
  comment?: string;
};

export type Marks = Mark[];

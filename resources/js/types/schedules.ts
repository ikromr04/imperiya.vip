import { Hour } from '@/const/lessons';
import { ID } from '.';
import { GradeId } from './grades';
import { LessonId } from './lessons';
import { UserId } from './users';

export type ScheduleId = ID;

export type Schedule = {
  id: ScheduleId;
  date: string;
  hour: keyof typeof Hour;
  gradeId: GradeId;
  topic?: string;
  homework?: string;
  lessonId?: LessonId;
  teacherId?: UserId;
  evaluations?: Evaluations;
};

export type Journal = {
  id: UserId;
  name: string;
} & Record<string, object | string | number>;

export type Evaluation = {
  id: ID;
  value: string;
  user_id: UserId;
  schedule_id: ScheduleId;
};

export type Evaluations = Evaluation[];

export type Schedules = Schedule[];

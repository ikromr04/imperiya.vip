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
};

export type Schedules = Schedule[];

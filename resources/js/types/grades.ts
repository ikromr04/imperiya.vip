import { ID } from '.';
import { UserId } from './users';

export type GradeId = ID;

export type Grade = {
  id: GradeId;
  level: number;
  group: string;
  teacherId: UserId;
};

export type Grades = Grade[];

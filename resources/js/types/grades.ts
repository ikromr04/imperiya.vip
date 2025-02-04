import { Students } from './users';

export type GradeId = number;

export type Grade = {
  id: GradeId;
  level: number;
  group: string;
  students?: Students;
};

export type Grades = Grade[];

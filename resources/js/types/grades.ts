import { ID } from '.';

export type GradeId = ID;

export type Grade = {
  id: GradeId;
  level: number;
  group: string;
};

export type Grades = Grade[];

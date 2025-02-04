import { ID } from '.';
import { UserId } from './users';

export type GradeId = number;

export type Grade = {
  id: GradeId;
  level: number;
  group: string;
  students?: {
    id: ID;
    user: {
      id: UserId;
      name: string
    };
  }[];
};

export type Grades = Grade[];

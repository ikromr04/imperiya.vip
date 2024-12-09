export type GradeId = number;

export type Grade = {
  id: GradeId;
  level: string;
  group: string;
};

export type Grades = Grade[];

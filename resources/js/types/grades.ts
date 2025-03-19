export type GradeId = number;

export type Grade = {
  id: GradeId;
  level: number;
  group: string;
};

export type Grades = Grade[];

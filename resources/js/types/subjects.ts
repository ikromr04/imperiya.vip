import { ID } from '.';

export type SubjectId = ID;

export type Subject = {
  id: SubjectId;
  name: string;
};

export type Subjects = Subject[];

import { ID } from '.';

export type LessonId = ID;

export type Lesson = {
  id: LessonId;
  name: string;
};

export type Lessons = Lesson[];

import { LessonId } from '@/types/lessons';

export type LessonStoreDTO = {
  name: string;
};

export type LessonUpdateDTO = {
  id: LessonId;
  name: string;
};

import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getLessonsStatus = (state: State) => state[SliceName.Lessons].lessons.status;

export const getLessonTypesStatus = (state: State) => state[SliceName.Lessons].types.status;

export const getLessonTypes = (state: State) => state[SliceName.Lessons].types.data;

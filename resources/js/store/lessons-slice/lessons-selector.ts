import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getLessonsStatus = (state: State) => state[SliceName.Lessons].lessons.status;

export const getLessonsTypes = (state: State) => state[SliceName.Lessons].types.data;

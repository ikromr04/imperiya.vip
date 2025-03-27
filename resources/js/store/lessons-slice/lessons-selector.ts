import { SliceName } from '@/const/store';
import { Lessons } from '@/types/lessons';
import { State } from '@/types/state';

export const getLessons = (state: State): { data: Lessons | null; isFetching: boolean; } =>
  state[SliceName.Lessons].lessons;

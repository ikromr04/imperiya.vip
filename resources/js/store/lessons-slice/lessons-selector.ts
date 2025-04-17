import { SliceName } from '@/const/store';
import { Types } from '@/types/lessons';
import { State } from '@/types/state';

export const getLessonsTypes = (state: State): { data: Types | null; isFetching: boolean } =>
  state[SliceName.Lessons].types;

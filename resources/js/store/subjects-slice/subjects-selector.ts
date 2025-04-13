import { SliceName } from '@/const/store';
import { State } from '@/types/state';
import { Subjects } from '@/types/subjects';

export const getSubjects = (state: State): { data: Subjects | null; isFetching: boolean; } =>
  state[SliceName.Subjects].subjects;

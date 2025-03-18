import { SliceName } from '@/const/store';
import { Grades } from '@/types/grades';
import { State } from '@/types/state';

export const getGrades = (state: State): { data: Grades | null; isFetching: boolean; } =>
  state[SliceName.Grades].grades;

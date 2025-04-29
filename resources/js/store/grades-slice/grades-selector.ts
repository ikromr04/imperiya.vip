import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getGrades = (state: State) => state[SliceName.Grades].grades.data;

export const getGradesStatus = (state: State) => state[SliceName.Grades].grades.status;

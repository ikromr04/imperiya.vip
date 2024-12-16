import { SliceName } from '../../const';
import { Grades } from '../../types/grades';
import { State } from '../../types/state';

export const getGrades = (state: State): Grades | null =>
  state[SliceName.Grades].grades;

import { SliceName } from '../../const';
import { Genders } from '../../types/genders';
import { State } from '../../types/state';

export const getGenders = (state: State): Genders | null =>
  state[SliceName.Genders].genders;

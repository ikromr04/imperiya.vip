import { SliceName } from '../../const';
import { Nationalities } from '../../types/nationalities';
import { State } from '../../types/state';

export const getNationalities = (state: State): Nationalities | null =>
  state[SliceName.Nationalities].nationalities;

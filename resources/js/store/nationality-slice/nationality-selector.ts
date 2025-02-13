import { SliceName } from '@/const/store';
import { Nationalities } from '@/types/nationalities';
import { State } from '@/types/state';

export const getNationalities = (state: State): Nationalities | null =>
  state[SliceName.Nationalities].nationalities;

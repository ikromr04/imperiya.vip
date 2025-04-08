import { SliceName } from '@/const/store';
import { Nationalities } from '@/types/nationalities';
import { State } from '@/types/state';

export const getNationalities = (state: State): { data: Nationalities | null; isFetching: boolean } =>
  state[SliceName.Nationalities].nationalities;

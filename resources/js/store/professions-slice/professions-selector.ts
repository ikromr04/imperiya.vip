import { SliceName } from '@/const/store';
import { Professions } from '@/types/professions';
import { State } from '@/types/state';

export const getProfessions = (state: State): { data: Professions | null; isFetching: boolean } =>
  state[SliceName.Professions].professions;

import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getNationalities = (state: State) => state[SliceName.Nationalities].nationalities.data;

export const getNationalitiesStatus = (state: State) => state[SliceName.Nationalities].nationalities.status;

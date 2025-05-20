import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getRatingsStatus = (state: State) => state[SliceName.Ratings].ratings.status;

export const getRatingDatesStatus = (state: State) => state[SliceName.Ratings].dates.status;

export const getRatingDates = (state: State) => state[SliceName.Ratings].dates.data;

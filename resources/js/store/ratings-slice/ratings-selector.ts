import { SliceName } from '@/const/store';
import { RatingDates } from '@/types/ratings';
import { State } from '@/types/state';

export const getRatingDates = (state: State): { data: RatingDates | null; isFetching: boolean } =>
  state[SliceName.Ratings].dates;

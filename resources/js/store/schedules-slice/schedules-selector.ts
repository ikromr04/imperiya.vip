import { SliceName } from '@/const/store';
import { Schedules } from '@/types/schedules';
import { State } from '@/types/state';

export const getSchedules = (state: State): { data: Schedules | null; isFetching: boolean; } =>
  state[SliceName.Schedules].schedules;

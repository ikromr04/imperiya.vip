import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getReasons = (state: State) => state[SliceName.Reasons].reasons.data;

export const getReasonsStatus = (state: State) => state[SliceName.Reasons].reasons.status;

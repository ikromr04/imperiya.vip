import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getMarksStatus = (state: State) => state[SliceName.Marks].marks.status;

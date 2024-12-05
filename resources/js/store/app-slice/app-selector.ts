import { SliceName } from '../../const';
import { State } from '../../types/state';

export const getNavigationCollapsedState = (state: State): boolean =>
  state[SliceName.App].isNavigationCollapsed;

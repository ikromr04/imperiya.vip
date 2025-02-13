import { SliceName } from '@/const/store';
import { State } from '@/types/state';
import { UsersFilter } from '@/types/users';

export const getNavigationCollapsedState = (state: State): boolean =>
  state[SliceName.App].isNavigationCollapsed;

export const getUsersFilter = (state: State): UsersFilter =>
  state[SliceName.App].usersFilter;

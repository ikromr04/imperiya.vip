import { SliceName } from '../../const';
import { Roles } from '../../types/roles';
import { State } from '../../types/state';

export const getRoles = (state: State): Roles | null =>
  state[SliceName.Roles].roles;

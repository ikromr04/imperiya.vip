import { AuthorizationStatus, SliceName } from '../../const';
import { State } from '../../types/state';

export const getAuthStatus = (state: State): AuthorizationStatus =>
  state[SliceName.Auth].authStatus;

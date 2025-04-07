import { AuthorizationStatus, SliceName } from '@/const/store';
import { AuthUser, RegisterLinks } from '@/types/auth';
import { State } from '@/types/state';

export const getAuthStatus = (state: State): AuthorizationStatus =>
  state[SliceName.Auth].authStatus;

export const getAuthUser = (state: State): AuthUser | null =>
  state[SliceName.Auth].user;

export const getRegisterLinks = (state: State): {data: RegisterLinks | null, isFetching: boolean} =>
  state[SliceName.Auth].registerLinks;

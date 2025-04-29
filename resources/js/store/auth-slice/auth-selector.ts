import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getAuthStatus = (state: State) => state[SliceName.Auth].authStatus;

export const getAuthUser = (state: State) => state[SliceName.Auth].user;

export const getRegisterLinks = (state: State) => state[SliceName.Auth].registerLinks;

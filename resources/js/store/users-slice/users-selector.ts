import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getUsers = (state: State) => state[SliceName.Users].users.data;

export const getUsersStatus = (state: State) => state[SliceName.Users].users.status;

import { SliceName } from '@/const/store';
import { State } from '@/types/state';
import { Users } from '@/types/users';

export const getUsers = (state: State): { data: Users | null; isFetching: boolean } =>
  state[SliceName.Users].users;

export const getNationalities = (state: State): string[] =>
  state[SliceName.Users].nationalities;

import { SliceName } from '@/const/store';
import { Students } from '@/types/roles';
import { State } from '@/types/state';
import { Users } from '@/types/users';

export const getUsers = (state: State): Users | null =>
  state[SliceName.Users].users;

export const getStudents = (state: State): Students | null =>
  state[SliceName.Users].students;

import { SliceName } from '@/const';
import { State } from '@/types/state';
import { Students, Users } from '@/types/users';

export const getUsers = (state: State): Users | null =>
  state[SliceName.Users].users;

export const getStudents = (state: State): Students | null =>
  state[SliceName.Users].students;

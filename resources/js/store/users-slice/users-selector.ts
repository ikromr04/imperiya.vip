import { SliceName } from '@/const/store';
import { State } from '@/types/state';
import { Users } from '@/types/users';
import { Student } from './users-slice';

export const getUsers = (state: State): { data: Users | null; isFetching: boolean } =>
  state[SliceName.Users].users;

export const getStudent = (state: State): {
  grade: any; data: Student | null; isFetching: boolean
} =>
  state[SliceName.Users].student;

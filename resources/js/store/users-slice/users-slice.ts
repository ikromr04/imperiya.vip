import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUserAction,
  deleteUserAvatarAction,
  fetchUsersAction,
  storeUserAction,
  updateUserAction,
  updateUserAvatarAction,
} from './users-api-actions';
import { Students, Users } from '@/types/users';
import { SliceName } from '@/const';
import { deleteGradeAction, updateGradeAction } from '../grades-slice/grades-api-actions';

export type UsersSlice = {
  users: Users | null;
  students: Students | null;
}

const initialState: UsersSlice = {
  users: null,
  students: null,
};

export const usersSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
        state.students = action.payload
          .filter((user) => user.role.type === 'student')
          .map((user) => ({
            id: user.role.id,
            user: {
              id: user.id,
              name: user.name,
            }
          }));
      })
      .addCase(updateGradeAction.fulfilled, (state) => {
        state.users = null;
        state.students = null;
      })
      .addCase(deleteGradeAction.fulfilled, (state) => {
        state.users = null;
        state.students = null;
      })
      .addCase(storeUserAction.fulfilled, (state, action) => {
        state.users = [action.payload, ...(state.users || [])];
      })
      .addCase(updateUserAvatarAction.fulfilled, (state, action) => {
        if (state.users) {
          state.users = state.users.map((user) =>
            user.id === action.payload.id ? { ...user, ...action.payload } : user
          );
        }
      })
      .addCase(deleteUserAvatarAction.fulfilled, (state, action) => {
        if (state.users) {
          state.users = state.users.map((user) =>
            user.id === action.payload ? { ...user, avatar: '', avatarThumb: '' } : user
          );
        }
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        if (state.users) {
          state.users = state.users.map((user) =>
            user.id === action.payload.id ? { ...action.payload } : user
          );
        }
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        if (state.users) {
          state.users = state.users.filter(({ id }) => id !== action.payload);
        }
      });
  },
});

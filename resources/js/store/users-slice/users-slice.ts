import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUserAction,
  deleteUserAvatarAction,
  fetchUsersAction,
  storeUserAction,
  updateUserAction,
  updateUserAvatarAction,
  updateUserRoleAction,
} from './users-api-actions';
import { Users } from '@/types/users';
import { SliceName } from '@/const/store';
import { deleteGradeAction, storeGradeAction, updateGradeAction } from '../grades-slice/grades-api-actions';
import { Student, Students } from '@/types/roles';

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
          .filter((user) => user.student)
          .map((user) => user.student as Student);
      })
      .addCase(storeGradeAction.fulfilled, (state) => {
        state.users = null;
        state.students = null;
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
        state.students = state.users
          .filter((user) => user.student)
          .map((user) => user.student as Student);
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
      .addCase(updateUserRoleAction.fulfilled, (state, action) => {
        if (state.users) {
          state.users = state.users.map((user) =>
            user.id === action.payload.id ? { ...action.payload } : user
          );
        }
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

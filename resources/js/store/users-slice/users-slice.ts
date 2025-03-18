import { createSlice } from '@reduxjs/toolkit';
import { Users } from '@/types/users';
import { SliceName } from '@/const/store';
import {
  deleteGradeAction,
  storeGradeAction,
  updateGradeAction,
} from '../grades-slice/grades-api-actions';
import {
  deleteUserAction,
  deleteUserAvatarAction,
  fetchUsersAction,
  storeUserAction,
  updateUserAction,
  updateUserAvatarAction,
  updateUserRoleAction,
} from './users-api-actions';

export type UsersSlice = {
  users: {
    data: Users | null;
    isFetching: boolean;
  };
}

const initialState: UsersSlice = {
  users: {
    data: null,
    isFetching: false,
  },
};

export const usersSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.pending, (state) => {
        state.users.isFetching = true;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users.data = action.payload;
        state.users.isFetching = false;
      })
      .addCase(fetchUsersAction.rejected, (state) => {
        state.users.isFetching = true;
      })
      .addCase(storeUserAction.fulfilled, (state, action) => {
        state.users.data = state.users.data ? [action.payload, ...state.users.data] : [action.payload];
      })
      .addCase(updateUserAvatarAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload.id);
          if (userIndex !== -1) {
            state.users.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(deleteUserAvatarAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload);
          if (userIndex !== -1) {
            const updatedUser = { ...state.users.data[userIndex] };
            delete updatedUser.avatar;
            delete updatedUser.avatarThumb;
            state.users.data[userIndex] = updatedUser;
          }
        }
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload.id);
          if (userIndex !== -1) {
            state.users.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(updateUserRoleAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload.id);
          if (userIndex !== -1) {
            state.users.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        if (state.users.data) {
          state.users.data = state.users.data.filter(({ id }) => id !== action.payload);
        }
      })

      .addCase(storeGradeAction.fulfilled, (state) => {
        state.users.data = null;
      })
      .addCase(updateGradeAction.fulfilled, (state) => {
        state.users.data = null;
      })
      .addCase(deleteGradeAction.fulfilled, (state, action) => {
        if (state.users.data) {
          state.users.data = state.users.data.map((user) => {
            if (user.student?.gradeId === action.payload) {
              const updatedStudent = { ...user.student };
              delete updatedStudent.gradeId;
              return { ...user, student: updatedStudent };
            }
            return user;
          });
        }
      });
  },
});

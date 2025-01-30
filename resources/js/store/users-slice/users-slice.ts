import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUserAvatarAction,
  fetchUsersAction,
  storeUserAction,
  updateUserAction,
  updateUserAvatarAction,
} from './users-api-actions';
import { Users } from '@/types/users';
import { SliceName } from '@/const';

export type UsersSlice = {
  users: Users | null;
}

const initialState: UsersSlice = {
  users: null,
};

export const usersSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
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
      });
  },
});

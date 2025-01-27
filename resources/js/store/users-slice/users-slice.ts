import { createSlice } from '@reduxjs/toolkit';
import { deleteUserAvatarAction, fetchUsersAction } from './users-api-actions';
import { SliceName } from '../../const';
import { User, Users } from '../../types/users';

export type UsersSlice = {
  users: Users | null;
}

const initialState: UsersSlice = {
  users: null,
};

export const usersSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {
    addUserAction: (state, action: { payload: User }) => {
      state.users = [action.payload, ...(state.users || [])];
    },
    updateUserAction: (state, action: { payload: User }) => {
      if (state.users) {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUserAvatarAction.fulfilled, (state, action) => {
        if (state.users) {
          state.users = state.users.map((user) =>
            user.id === action.payload ? { ...user, avatar: '', avatarThumb: '' } : user
          );
        }
      });
  },
});

export const {
  addUserAction,
  updateUserAction,
} = usersSlice.actions;

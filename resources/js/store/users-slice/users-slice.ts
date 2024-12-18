import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersAction } from './users-api-actions';
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const {
  addUserAction,
} = usersSlice.actions;

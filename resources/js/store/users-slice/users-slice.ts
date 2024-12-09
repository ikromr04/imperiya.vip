import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersAction } from './users-api-actions';
import { SliceName } from '../../const';
import { Users } from '../../types/users';

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
      });
  },
});

import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { authSlice } from './auth-slice/auth-slice';
import { appSlice } from './app-slice/app-slice';
import { usersSlice } from './users-slice/users-slice';

export const rootReducer = combineReducers({
  [SliceName.App]: appSlice.reducer,
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Users]: usersSlice.reducer,
});

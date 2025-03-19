import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice/auth-slice';
import { usersSlice } from './users-slice/users-slice';
import { gradesSlice } from './grades-slice/grades-slice';
import { SliceName } from '@/const/store';

export const rootReducer = combineReducers({
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Users]: usersSlice.reducer,
  [SliceName.Grades]: gradesSlice.reducer,
});

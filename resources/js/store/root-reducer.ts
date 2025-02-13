import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice/auth-slice';
import { appSlice } from './app-slice/app-slice';
import { usersSlice } from './users-slice/users-slice';
import { gradesSlice } from './grades-slice/grades-slice';
import { nationalitiesSlice } from './nationality-slice/nationality-slice';
import { SliceName } from '@/const/store';

export const rootReducer = combineReducers({
  [SliceName.App]: appSlice.reducer,
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Users]: usersSlice.reducer,
  [SliceName.Grades]: gradesSlice.reducer,
  [SliceName.Nationalities]: nationalitiesSlice.reducer,
});

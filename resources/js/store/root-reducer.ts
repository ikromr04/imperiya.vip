import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { authSlice } from './auth-slice/auth-slice';
import { appSlice } from './app-slice/app-slice';
import { usersSlice } from './users-slice/users-slice';
import { gendersSlice } from './genders-slice/genders-slice';
import { rolesSlice } from './roles-slice/roles-slice';
import { gradesSlice } from './grades-slice/grades-slice';
import { nationalitiesSlice } from './nationality-slice/grades-slice';

export const rootReducer = combineReducers({
  [SliceName.App]: appSlice.reducer,
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Users]: usersSlice.reducer,
  [SliceName.Genders]: gendersSlice.reducer,
  [SliceName.Roles]: rolesSlice.reducer,
  [SliceName.Grades]: gradesSlice.reducer,
  [SliceName.Nationalities]: nationalitiesSlice.reducer,
});

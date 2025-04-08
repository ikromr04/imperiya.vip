import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice/auth-slice';
import { usersSlice } from './users-slice/users-slice';
import { gradesSlice } from './grades-slice/grades-slice';
import { SliceName } from '@/const/store';
import { lessonsSlice } from './lessons-slice/lessons-slice';
import { schedulesSlice } from './schedules-slice/schedules-slice';
import { nationalitiesSlice } from './nationalities-slice/nationalities-slice';
import { professionsSlice } from './professions-slice/professions-slice';

export const rootReducer = combineReducers({
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Users]: usersSlice.reducer,
  [SliceName.Grades]: gradesSlice.reducer,
  [SliceName.Lessons]: lessonsSlice.reducer,
  [SliceName.Schedules]: schedulesSlice.reducer,
  [SliceName.Nationalities]: nationalitiesSlice.reducer,
  [SliceName.Professions]: professionsSlice.reducer,
});

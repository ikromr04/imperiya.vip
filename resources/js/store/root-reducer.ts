import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice/auth-slice';
import { usersSlice } from './users-slice/users-slice';
import { gradesSlice } from './grades-slice/grades-slice';
import { SliceName } from '@/const/store';
import { nationalitiesSlice } from './nationalities-slice/nationalities-slice';
import { professionsSlice } from './professions-slice/professions-slice';
import { subjectsSlice } from './subjects-slice/subjects-slice';
import { lessonsSlice } from './lessons-slice/lessons-slice';
import { ratingsSlice } from './ratings-slice/ratings-slice';
import { marksSlice } from './marks-slice/marks-slice';
import { reasonsSlice } from './reasons-slice/reasons-slice';
import { booksSlice } from './books-slice/books-slice';

export const rootReducer = combineReducers({
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Users]: usersSlice.reducer,
  [SliceName.Grades]: gradesSlice.reducer,
  [SliceName.Lessons]: lessonsSlice.reducer,
  [SliceName.Subjects]: subjectsSlice.reducer,
  [SliceName.Nationalities]: nationalitiesSlice.reducer,
  [SliceName.Professions]: professionsSlice.reducer,
  [SliceName.Ratings]: ratingsSlice.reducer,
  [SliceName.Marks]: marksSlice.reducer,
  [SliceName.Reasons]: reasonsSlice.reducer,
  [SliceName.Books]: booksSlice.reducer,
});

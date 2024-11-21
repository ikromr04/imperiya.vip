import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { authSlice } from './auth-slice/auth-slice';

export const rootReducer = combineReducers({
  [SliceName.Auth]: authSlice.reducer,
});

import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction } from './auth-api-actions';
import { AuthorizationStatus, SliceName } from '../../const';

export type AuthSlice = {
  authStatus: AuthorizationStatus;
  user: any;
}

const initialState: AuthSlice = {
  authStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const authSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  },
});

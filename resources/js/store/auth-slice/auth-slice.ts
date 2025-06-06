import { createSlice } from '@reduxjs/toolkit';
import {
  checkAuthAction,
  deleteRegisterLinkAction,
  fetchRegisterLinksAction,
  generateRegisterLinkAction,
  loginAction,
  logoutAction,
  updateRegisterLinkAction,
} from './auth-api-actions';
import { AuthorizationStatus, SliceName } from '@/const/store';
import { RegisterLinks } from '@/types/auth';
import { User } from '@/types/users';
import {
  deleteUserAvatarAction,
  updateUserAction,
  updateUserAvatarAction,
} from '../users-slice/users-api-actions';

export type AuthSlice = {
  authStatus: AuthorizationStatus;
  user?: User;
  registerLinks: {
    data?: RegisterLinks;
    isFetching: boolean;
  };
}

const initialState: AuthSlice = {
  authStatus: AuthorizationStatus.Unknown,
  registerLinks: {
    isFetching: false,
  },
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
        state.user = undefined;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        if (action.payload.id === state.user?.id) {
          state.user = action.payload;
        }
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(fetchRegisterLinksAction.pending, (state) => {
        state.registerLinks.isFetching = true;
      })
      .addCase(fetchRegisterLinksAction.fulfilled, (state, action) => {
        state.registerLinks.isFetching = false;
        state.registerLinks.data = action.payload;
      })
      .addCase(fetchRegisterLinksAction.rejected, (state) => {
        state.registerLinks.isFetching = false;
      })
      .addCase(generateRegisterLinkAction.fulfilled, (state, action) => {
        state.registerLinks.data = state.registerLinks.data ? [action.payload, ...state.registerLinks.data] : [action.payload];
      })
      .addCase(updateRegisterLinkAction.fulfilled, (state, action) => {
        if (state.registerLinks.data) {
          const index = state.registerLinks.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.registerLinks.data[index] = action.payload;
          }
        }
      })
      .addCase(deleteRegisterLinkAction.fulfilled, (state, action) => {
        if (state.registerLinks.data) {
          state.registerLinks.data = state.registerLinks.data.filter(({ id }) => id !== action.payload);
        }
      })
      .addCase(updateUserAvatarAction.fulfilled, (state, action) => {
        if (state.user?.id === action.payload.id) {
          state.user = action.payload;
        }
      })
      .addCase(deleteUserAvatarAction.fulfilled, (state, action) => {
        if (state.user?.id === action.payload) {
          state.user.avatar = undefined;
          state.user.avatarThumb = undefined;
        }
      });
  },
});

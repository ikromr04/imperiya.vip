import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { defaultUsersFilter, getAppSettings, saveAppSettings } from '../../services/app-settings';
import { UsersFilter } from '../../types/users';

export type AppSlice = {
  isNavigationCollapsed: boolean;
  usersFilter: UsersFilter;
}

const initialState: AppSlice = {
  isNavigationCollapsed: getAppSettings().isNavigationCollapsed,
  usersFilter: getAppSettings().usersFilter,
};

export const appSlice = createSlice({
  name: SliceName.App,
  initialState,
  reducers: {
    toggleNavigationAction: (state) => {
      const settings = getAppSettings();
      saveAppSettings({ ...settings, isNavigationCollapsed: !settings.isNavigationCollapsed });
      state.isNavigationCollapsed = !settings.isNavigationCollapsed;
    },
    collapseNavigationAction: (state) => {
      const settings = getAppSettings();
      saveAppSettings({ ...settings, isNavigationCollapsed: true });
      state.isNavigationCollapsed = true;
    },
    setUsersFilterAction: (state, action: { payload: UsersFilter }) => {
      const settings = getAppSettings();
      saveAppSettings({ ...settings, usersFilter: action.payload });
      state.usersFilter = action.payload;
    },
    resetUsersFilterAction: (state) => {
      const settings = getAppSettings();
      saveAppSettings({ ...settings, usersFilter: defaultUsersFilter });
      state.usersFilter = defaultUsersFilter;
    },
  },
});

export const {
  toggleNavigationAction,
  collapseNavigationAction,
  setUsersFilterAction,
  resetUsersFilterAction,
} = appSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { getAppSettings, saveAppSettings } from '../../services/app-settings';

export type AppSlice = {
  isNavigationCollapsed: boolean,
}

const initialState: AppSlice = {
    isNavigationCollapsed: getAppSettings().isNavigationCollapsed,
  };

export const appSlice = createSlice({
  name: SliceName.App,
  initialState,
  reducers: {
    toggleNavigationAction: (state) => {
      const settings = getAppSettings();
      saveAppSettings({
        ...settings,
        isNavigationCollapsed: !settings.isNavigationCollapsed,
      });
      state.isNavigationCollapsed = !settings.isNavigationCollapsed;
    },
  },
});

export const {
  toggleNavigationAction,
} = appSlice.actions;

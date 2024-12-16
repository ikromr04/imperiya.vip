import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { Roles } from '../../types/roles';
import { fetchRolesAction } from './roles-api-actions';

export type RolesSlice = {
  roles: Roles | null;
}

const initialState: RolesSlice = {
  roles: null,
};

export const rolesSlice = createSlice({
  name: SliceName.Roles,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRolesAction.fulfilled, (state, action) => {
        state.roles = action.payload;
      });
  },
});

import { createSlice } from '@reduxjs/toolkit';
import { deleteGradeAction, fetchGradesAction, storeGradeAction, updateGradeAction } from './grades-api-actions';
import { Grades } from '@/types/grades';
import { SliceName } from '@/const/store';
import { deleteUserAction, storeUserAction, updateUserAction, updateUserRoleAction } from '../users-slice/users-api-actions';

export type GradesSlice = {
  grades: Grades | null;
}

const initialState: GradesSlice = {
  grades: null,
};

export const gradesSlice = createSlice({
  name: SliceName.Grades,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGradesAction.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(storeGradeAction.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(updateGradeAction.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(deleteUserAction.fulfilled, (state) => {
        state.grades = null;
      })
      .addCase(storeUserAction.fulfilled, (state) => {
        state.grades = null;
      })
      .addCase(updateUserAction.fulfilled, (state) => {
        state.grades = null;
      })
      .addCase(updateUserRoleAction.fulfilled, (state) => {
        state.grades = null;
      })
      .addCase(deleteGradeAction.fulfilled, (state, action) => {
        state.grades = action.payload;
      });
  },
});

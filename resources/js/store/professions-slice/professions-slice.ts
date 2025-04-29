import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { Professions } from '@/types/professions';
import {
  deleteProfessionAction,
  fetchProfessionsAction,
  storeProfessionAction,
  updateProfessionAction,
} from './professions-api-actions';

export type ProfessionsSlice = {
  professions: {
    data: Professions;
    status: AsyncStatus,
  };
}

const initialState: ProfessionsSlice = {
  professions: {
    data: [],
    status: AsyncStatus.Idle,
  },
};

export const professionsSlice = createSlice({
  name: SliceName.Professions,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfessionsAction.pending, (state) => {
        state.professions.status = AsyncStatus.Loading;
      })
      .addCase(fetchProfessionsAction.fulfilled, (state, action) => {
        state.professions.status = AsyncStatus.Succeeded;
        state.professions.data = action.payload;
      })
      .addCase(fetchProfessionsAction.rejected, (state) => {
        state.professions.status = AsyncStatus.Failed;
      })

      .addCase(storeProfessionAction.fulfilled, (state, action) => {
        if (state.professions.data) {
          state.professions.data = [action.payload, ...state.professions.data];
        }
      })
      .addCase(updateProfessionAction.fulfilled, (state, action) => {
        if (state.professions.data) {
          const index = state.professions.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.professions.data[index] = action.payload;
          }
        }
      })
      .addCase(deleteProfessionAction.fulfilled, (state, action) => {
        if (state.professions.data) {
          state.professions.data = state.professions.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});

import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { Nationalities } from '@/types/nationalities';
import {
  deleteNationalityAction,
  fetchNationalitiesAction,
  storeNationalityAction,
  updateNationalityAction
} from './nationalities-api-actions';

export type NationalitiesSlice = {
  nationalities: {
    data?: Nationalities;
    status: AsyncStatus;
  };
}

const initialState: NationalitiesSlice = {
  nationalities: {
    status: AsyncStatus.Idle,
  },
};

export const nationalitiesSlice = createSlice({
  name: SliceName.Nationalities,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNationalitiesAction.pending, (state) => {
        state.nationalities.status = AsyncStatus.Loading;
      })
      .addCase(fetchNationalitiesAction.fulfilled, (state, action) => {
        state.nationalities.status = AsyncStatus.Succeeded;
        state.nationalities.data = action.payload;
      })
      .addCase(fetchNationalitiesAction.rejected, (state) => {
        state.nationalities.status = AsyncStatus.Failed;
      })

      .addCase(storeNationalityAction.fulfilled, (state, action) => {
        if (state.nationalities.data) {
          state.nationalities.data = [action.payload, ...state.nationalities.data];
        }
      })
      .addCase(updateNationalityAction.fulfilled, (state, action) => {
        if (state.nationalities.data) {
          const index = state.nationalities.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.nationalities.data[index] = action.payload;
          }
        }
      })

      .addCase(deleteNationalityAction.fulfilled, (state, action) => {
        if (state.nationalities.data) {
          state.nationalities.data = state.nationalities.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});

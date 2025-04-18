import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Rating, RatingDate, RatingDates, Ratings } from '@/types/ratings';
import { GradeId } from '@/types/grades';
import { RatingDateUpdateDTO, RatingStoreDTO, RatingUpdateDTO } from '@/dto/ratings';
import { ValidationError } from '@/types/validation-error';
import { SubjectId } from '@/types/subjects';

export const fetchRatingDatesAction = createAsyncThunk<RatingDates, undefined, {
  extra: AxiosInstance;
}>(
  'ratings/fetchRatingDates',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<RatingDates>(APIRoute.Ratings.Dates);

    return data;
  },
);

export const updateRatingDatesAction = createAsyncThunk<void, {
  dto: RatingDateUpdateDTO,
  onSuccess?: (ratingDate: RatingDate) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'ratings/updateDate',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<RatingDate>(APIRoute.Ratings.Dates, dto);
      if (onSuccess) onSuccess(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchRatingsAction = createAsyncThunk<void, {
  dto: {
    years: string;
    gradeId: GradeId;
    subjectId: SubjectId;
  };
  onSuccess: (ratings: Ratings) => void,
}, {
  extra: AxiosInstance;
}>(
  'ratings/fetchRatings',
  async ({ dto, onSuccess }, { extra: api }) => {
    const { data } = await api.get<Ratings>(`${APIRoute.Ratings.Index}?years=${dto.years}&grade_id=${dto.gradeId}&subject_id=${dto.subjectId}`);

    onSuccess(data);
  },
);

export const storeRatingAction = createAsyncThunk<void, {
  dto: RatingStoreDTO,
  onSuccess?: (rating: Rating) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'ratings/store',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Rating>(APIRoute.Ratings.Index, dto);
      if (onSuccess) onSuccess(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateRatingAction = createAsyncThunk<void, {
  dto: RatingUpdateDTO,
  onSuccess?: (rating: Rating) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'ratings/update',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Rating>(APIRoute.Ratings.Index, dto);
      if (onSuccess) onSuccess(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

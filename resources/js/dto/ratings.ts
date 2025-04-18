import { RatingName } from '@/const/ratings';
import { GradeId } from '@/types/grades';
import { RatingDateId, RatingId } from '@/types/ratings';
import { SubjectId } from '@/types/subjects';
import { UserId } from '@/types/users';

export type RatingStoreDTO = {
  years: string;
  rating: keyof typeof RatingName;
  score: number;
  student_id: UserId;
  grade_id: GradeId;
  subject_id: SubjectId;
};

export type RatingUpdateDTO = {
  id: RatingId;
  score: number;
};

export type RatingDateUpdateDTO = {
  id: RatingDateId;
  years: string;
  quarter1?: string;
  quarter2?: string;
  semester1?: string;
  quarter3?: string;
  quarter4?: string;
  semester2?: string;
  annual?: string;
  assessment?: string;
  final?: string;
};

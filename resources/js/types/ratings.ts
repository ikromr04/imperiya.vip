import { RatingName } from '@/const/ratings';
import { ID } from '.';
import { UserId } from './users';
import { GradeId } from './grades';
import { SubjectId } from './subjects';

export type RatingDateId = ID;

export type RatingDate = {
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

export type RatingDates = RatingDate[];

export type RatingId = ID;

export type Rating = {
  id: RatingId;
  rating: keyof typeof RatingName;
  score: number;
  studentId: UserId;
  gradeId: GradeId;
  subjectId: SubjectId;
};

export type Ratings = Rating[];

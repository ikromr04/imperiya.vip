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

export type RatingSlug = 'quarter1' | 'quarter2' | 'semester1' | 'quarter3' | 'quarter4' | 'semester2' | 'annual' | 'assessment' | 'final';

export type RatingCode = 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99;

export type Rating = {
  id: RatingId;
  rating: RatingSlug;
  score: number;
  studentId: UserId;
  gradeId: GradeId;
  subjectId: SubjectId;
};

export type Ratings = Rating[];

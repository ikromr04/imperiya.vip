import { GradeId, Grades } from '@/types/grades';

export const getNextGradeId = (grades: Grades, currentGradeId: GradeId): GradeId => {
  const gradeIds = grades.map(({ id }) => id);

  const currentIndex = gradeIds.indexOf(currentGradeId);

  if (currentIndex === -1) {
    throw new Error('Current grade ID not found in the list of grades');
  }

  const nextIndex = (currentIndex + 1) % gradeIds.length;

  return gradeIds[nextIndex];
};

export const getPreviousGradeId = (grades: Grades, currentGradeId: GradeId): GradeId => {
  const gradeIds = grades.map(({ id }) => id);
  const currentIndex = gradeIds.indexOf(currentGradeId);

  if (currentIndex === -1) {
    throw new Error('Current grade ID not found in the list of grades');
  }

  const previousIndex = (currentIndex - 1 + gradeIds.length) % gradeIds.length;
  return gradeIds[previousIndex];
};

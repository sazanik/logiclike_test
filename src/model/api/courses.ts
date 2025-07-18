import type { ICourse } from '@/model/types/course.ts';

export const fetchCourses = async (): Promise<ICourse[]> => {
  const response = await fetch('https://logiclike.com/docs/courses.json');

  if (!response.ok) {
    throw new Error(`HTTP error, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

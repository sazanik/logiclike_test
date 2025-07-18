import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchCourses } from '@/model/api/courses.ts';
import { ALL_CATEGORIES } from '@/model/constants/categories.ts';
import { QUERY } from '@/model/constants/query.ts';
import type { ICourse } from '@/model/types/course.ts';

export const useCourses = (category?: string) => {
  const filterCourses = useCallback(async (): Promise<ICourse[]> => {
    const courses = await fetchCourses();

    if (!category || category === ALL_CATEGORIES) {
      return courses;
    }

    return courses.filter((course) => course.tags.includes(category));
  }, [category]);

  return useQuery({
    queryKey: [QUERY.COURSES, { category }],
    queryFn: filterCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

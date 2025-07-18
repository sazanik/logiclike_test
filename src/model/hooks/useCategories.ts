import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchCourses } from '@/model/api/courses.ts';
import { ALL_CATEGORIES } from '@/model/constants/categories.ts';
import { QUERY } from '@/model/constants/query.ts';

export const useCategories = () => {
  const getCategories = useCallback(async () => {
    const courses = await fetchCourses();
    const categories = new Set<string>([ALL_CATEGORIES]);

    courses.forEach((course) => {
      course.tags.forEach((category) => {
        categories.add(category);
      });
    });

    return [...Array.from(categories)];
  }, []);

  return useQuery({
    queryKey: [QUERY.CATEGORIES],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

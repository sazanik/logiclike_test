import { useQuery } from '@tanstack/react-query';

import { fetchCourses } from '@/model/api/courses.ts';
import type { Category } from '@/shared/constants/categories.ts';

export const useCourses = (category?: Category) => {
  const filterCourses = async (category?: Category) => {
    const courses = await fetchCourses();

    if (!category || category === 'Все темы') {
      return courses;
    }

    const filteredCourses = courses.filter((course) => {
      return course.tags.includes(category);
    });

    return filteredCourses;
  };

  return useQuery({
    queryKey: ['courses', { category }],
    queryFn: () => filterCourses(category),
  });
};

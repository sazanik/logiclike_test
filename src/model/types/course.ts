import type { Category } from '@/shared/constants/categories.ts';

export interface ICourse {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  tags: Category[];
}

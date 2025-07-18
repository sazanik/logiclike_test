import { ROUTES } from '@/navigation/routes.ts';
import type { Category } from '@/shared/constants/categories.ts';

import type { Option } from './component';

export type RootStackParamList = {
  [ROUTES.CATEGORIES]: {
    categoryOption: Option<Category>;
  };
  [ROUTES.COURSES]: {
    categoryOption: Option<Category>;
  };
};

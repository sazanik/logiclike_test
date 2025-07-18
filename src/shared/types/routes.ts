import { ROUTES } from '@/navigation/routes.ts';

export type RootStackParamList = {
  [ROUTES.CATEGORIES]: {
    category: string;
  };
  [ROUTES.COURSES]: {
    category: string;
  };
};

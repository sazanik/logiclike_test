import type { Option } from '@/shared/types/component.ts';

// it is better to avoid using enum, especially you have shared typed with backend
export type Category =
  | 'Все темы'
  | 'Логика и мышление'
  | 'Загадки'
  | 'Шахматы'
  | 'Головоломки'
  | 'Окружающий мир'
  | 'Страны и столицы';

export const CATEGORIES: Option<Category>[] = [
  {
    value: 'Все темы',
    label: 'Все темы',
  },
  {
    value: 'Логика и мышление',
    label: 'Логика и мышление',
  },
  {
    value: 'Загадки',
    label: 'Загадки',
  },
  {
    value: 'Шахматы',
    label: 'Шахматы',
  },
  {
    value: 'Головоломки',
    label: 'Головоломки',
  },
  {
    value: 'Окружающий мир',
    label: 'Окружающий мир',
  },
  {
    value: 'Страны и столицы',
    label: 'Страны и столицы',
  },
];

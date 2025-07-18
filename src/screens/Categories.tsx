import { type FC, useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ALL_CATEGORIES } from '@/model/constants/categories.ts';
import { useCategories } from '@/model/hooks/useCategories.ts';
import { ROUTES } from '@/navigation/routes.ts';
import { COLORS } from '@/shared/constants/colors.ts';
import {
  ACTIVE_OPACITY,
  ANIMATION_DURATION,
  HIT_SLOP,
} from '@/shared/constants/ui.ts';
import type { RootStackParamList } from '@/shared/types/routes.ts';
import ErrorMessage from '@/shared/ui/ErrorMessage.tsx';
import CrossIcon from '@/shared/ui/Icons/Cross.tsx';
import LoadingIndicator from '@/shared/ui/LoadingIndicator.tsx';
import OptionsPressable from '@/shared/ui/OptionsPressable';
import TextBase from '@/shared/ui/Text/TextBase.tsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: COLORS.screens.categories.bg,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    marginTop: 60,
  },
  closeActionIcon: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
  options: {
    marginTop: 16,
  },
});

type RouteProps = RouteProp<RootStackParamList, typeof ROUTES.CATEGORIES>;

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  typeof ROUTES.CATEGORIES
>;

const NAVIGATION_DELAY = ANIMATION_DURATION.OPTION_PRESSABLE + 100;

const CategoriesScreen: FC = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const paddingBottom = useMemo(() => (bottomInset || 20) + 40, [bottomInset]);

  const route = useRoute<RouteProps>();
  const { navigate, goBack } = useNavigation<NavigationProps>();
  const { category = ALL_CATEGORIES } = route.params ?? {};

  const { data = [], isError, isLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(category);

  const handleClosePress = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleOptionPress = useCallback(
    (newCategory: string) => {
      setSelectedCategory(newCategory);

      setTimeout(() => {
        navigate(ROUTES.COURSES, { category: newCategory }, { pop: true });
      }, NAVIGATION_DELAY);
    },
    [navigate]
  );

  if (isLoading) {
    return <LoadingIndicator backgroundColor={COLORS.screens.categories.bg} />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message='Произошла ошибка при загрузке тем'
        backgroundColor={COLORS.screens.categories.bg}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewContent, { paddingBottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TextBase>Выбор темы</TextBase>
        </View>
        <OptionsPressable
          style={styles.options}
          options={data}
          onOptionPress={handleOptionPress}
          selectedOption={selectedCategory}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.closeActionIcon}
        activeOpacity={ACTIVE_OPACITY}
        hitSlop={HIT_SLOP}
        onPress={handleClosePress}
      >
        <CrossIcon color={COLORS.shared.border} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesScreen;

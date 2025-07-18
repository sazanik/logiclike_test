import { type FC, useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES } from '@/navigation/routes.ts';
import { CATEGORIES, type Category } from '@/shared/constants/categories.ts';
import { COLORS } from '@/shared/constants/colors.ts';
import { ACTIVE_OPACITY, HIT_SLOP } from '@/shared/constants/ui.ts';
import type { Option } from '@/shared/types/component.ts';
import type { RootStackParamList } from '@/shared/types/routes.ts';
import CrossIcon from '@/shared/ui/Icons/Cross.tsx';
import OptionsPressable from '@/shared/ui/OptionsPressable';
import TextBase from '@/shared/ui/Text/TextBase.tsx';

const styles = StyleSheet.create({
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

const CategoriesScreen: FC = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const route = useRoute<RouteProps>();
  const { categoryOption = CATEGORIES[0] } = route.params ?? {};
  const { navigate, goBack } = useNavigation<NavigationProps>();

  const paddingBottom = useMemo(() => (bottomInset || 20) + 40, [bottomInset]);

  const [selectedOption, setSelectedOption] = useState(categoryOption);

  const handleClosePress = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleOptionPress = useCallback(
    (option: Option<Category>) => {
      setSelectedOption(option);

      setTimeout(() => {
        navigate(
          ROUTES.COURSES,
          {
            categoryOption: option,
          },
          { pop: true }
        );
      }, 400);
    },
    [navigate]
  );

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContent, { paddingBottom }]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.closeActionIcon}
        activeOpacity={ACTIVE_OPACITY}
        hitSlop={HIT_SLOP}
        onPress={handleClosePress}
      >
        <CrossIcon color={COLORS.shared.border} />
      </TouchableOpacity>
      <View style={styles.header}>
        <TextBase>Выбор темы</TextBase>
      </View>
      <OptionsPressable<Category>
        style={styles.options}
        options={CATEGORIES}
        onOptionPress={handleOptionPress}
        selectedOption={selectedOption}
      />
    </ScrollView>
  );
};

export default CategoriesScreen;

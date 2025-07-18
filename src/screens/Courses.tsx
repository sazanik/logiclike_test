import { type FC, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCourses } from '@/model/hooks/useCourses.ts';
import type { ICourse } from '@/model/types/course.ts';
import { ROUTES } from '@/navigation/routes.ts';
import { CATEGORIES } from '@/shared/constants/categories.ts';
import { COLORS } from '@/shared/constants/colors.ts';
import { ACTIVE_OPACITY } from '@/shared/constants/ui.ts';
import type { RootStackParamList } from '@/shared/types/routes.ts';
import ChevronIcon from '@/shared/ui/Icons/Chevron.tsx';
import TextBase from '@/shared/ui/Text/TextBase.tsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: COLORS.screens.courses.bg,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.screens.courses.empty.text,
  },
  errorText: {
    color: COLORS.screens.courses.error.text,
  },
  header: {
    borderRadius: 40,
    height: 28,

    paddingLeft: 10,
    paddingRight: 4,

    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,

    backgroundColor: COLORS.screens.courses.header.bg,
  },
  headerText: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.screens.courses.header.text,
  },
  courses: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 16,
  },
  courseContainer: {
    overflow: 'hidden',
    borderRadius: 24,

    height: 204,
    width: 210,

    backgroundColor: COLORS.shared.border,
  },
  courseImageContainer: {
    height: 162,
    width: 210,

    alignItems: 'center',
    justifyContent: 'center',
  },
  courseImage: {
    height: 144,
    width: 144,
  },
  courseTitleContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 36,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLORS.shared.bg,
  },
  courseTitle: {
    fontSize: 12,
    lineHeight: 18,
  },
});

type RouteProps = RouteProp<RootStackParamList, typeof ROUTES.COURSES>;

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  typeof ROUTES.COURSES
>;

const CoursesScreen: FC = () => {
  const { top: topOffset, left: leftOffset } = useSafeAreaInsets();

  const route = useRoute<RouteProps>();
  const { categoryOption = CATEGORIES[0] } = route.params ?? {};

  const { navigate } = useNavigation<NavigationProps>();

  const { data, isLoading, isError } = useCourses(categoryOption?.value);

  const handleNavigateToCategories = useCallback(() => {
    navigate(ROUTES.CATEGORIES, {
      categoryOption,
    });
  }, [navigate, categoryOption]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <ActivityIndicator size='large' color='white' />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <TextBase style={styles.errorText}>
          Произошла ошибка при загрузке курсов
        </TextBase>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <TextBase style={styles.emptyText}>
          Курсы не найдены для категории "{categoryOption?.label}"
        </TextBase>
      </View>
    );
  }

  const renderCourseItem = ({ item }: { item: ICourse }) => (
    <View style={styles.courseContainer}>
      <View
        style={[styles.courseImageContainer, { backgroundColor: item.bgColor }]}
      >
        <Image style={styles.courseImage} source={{ uri: item.image }} />
      </View>
      <View style={styles.courseTitleContainer}>
        <TextBase style={styles.courseTitle}>{item.name}</TextBase>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: topOffset || 20 }]}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={ACTIVE_OPACITY}
        onPress={handleNavigateToCategories}
      >
        <TextBase style={styles.headerText}>{categoryOption.label}</TextBase>
        <ChevronIcon color={COLORS.screens.courses.header.icon} />
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={[
          styles.courses,
          { paddingHorizontal: leftOffset },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CoursesScreen;

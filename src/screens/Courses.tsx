import { type FC, useCallback } from 'react';
import {
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

import { ALL_CATEGORIES } from '@/model/constants/categories.ts';
import { useCourses } from '@/model/hooks/useCourses.ts';
import type { ICourse } from '@/model/types/course.ts';
import { ROUTES } from '@/navigation/routes.ts';
import { COLORS } from '@/shared/constants/colors.ts';
import { ACTIVE_OPACITY } from '@/shared/constants/ui.ts';
import type { RootStackParamList } from '@/shared/types/routes.ts';
import ErrorMessage from '@/shared/ui/ErrorMessage.tsx';
import ChevronIcon from '@/shared/ui/Icons/Chevron.tsx';
import LoadingIndicator from '@/shared/ui/LoadingIndicator.tsx';
import TextBase from '@/shared/ui/Text/TextBase.tsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.screens.courses.bg,
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
  const { navigate } = useNavigation<NavigationProps>();
  const { category = ALL_CATEGORIES } = route.params ?? {};

  const { data = [], isLoading, isError } = useCourses(category);

  const handleNavigateToCategories = useCallback(() => {
    navigate(ROUTES.CATEGORIES, {
      category,
    });
  }, [navigate, category]);

  const renderCourseItem = useCallback(
    ({ item }: { item: ICourse }) => (
      <View style={styles.courseContainer}>
        <View
          style={[
            styles.courseImageContainer,
            { backgroundColor: item.bgColor },
          ]}
        >
          <Image
            style={styles.courseImage}
            source={{ uri: item.image }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.courseTitleContainer}>
          <TextBase style={styles.courseTitle}>{item.name}</TextBase>
        </View>
      </View>
    ),
    []
  );

  if (isLoading) {
    return <LoadingIndicator backgroundColor={COLORS.screens.courses.bg} />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message='Произошла ошибка при загрузке курсов'
        backgroundColor={COLORS.screens.courses.bg}
      />
    );
  }

  if (data.length === 0) {
    return (
      <ErrorMessage
        message={`Курсы не найдены для категории "${category}"`}
        backgroundColor={COLORS.screens.courses.bg}
        textColor={COLORS.screens.courses.empty.text}
      />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: topOffset || 20 }]}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={ACTIVE_OPACITY}
        onPress={handleNavigateToCategories}
      >
        <TextBase style={styles.headerText}>{category}</TextBase>
        <ChevronIcon color={COLORS.screens.courses.header.icon} />
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={[
          styles.courses,
          { paddingHorizontal: leftOffset },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        windowSize={5}
        data={data}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CoursesScreen;

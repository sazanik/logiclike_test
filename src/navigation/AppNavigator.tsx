import { type FC, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation-locker';

import { ROUTES } from '@/navigation/routes';
import CategoriesScreen from '@/screens/Categories.tsx';
import CoursesScreen from '@/screens/Courses.tsx';
import type { RootStackParamList } from '@/shared/types/routes.ts';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  // lock orientation to landscape when app starts
  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ROUTES.COURSES}
      >
        <Stack.Screen name={ROUTES.CATEGORIES} component={CategoriesScreen} />
        <Stack.Screen name={ROUTES.COURSES} component={CoursesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

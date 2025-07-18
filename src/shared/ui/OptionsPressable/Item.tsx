import { useLayoutEffect } from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';

import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '@/shared/constants/colors.ts';
import { ANIMATION_DURATION } from '@/shared/constants/ui.ts';
import { PressableAnimated } from '@/shared/ui/Animated/PressableAnimated.tsx';
import { TextBaseAnimated } from '@/shared/ui/Animated/TextBaseAnimated.tsx';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    width: '100%',

    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const Item = ({ label, selected, onPress }: Props) => {
  const sharedValue = useSharedValue(+selected);

  const animatedPressableStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        sharedValue.value,
        [0, 1],
        [
          COLORS.screens.categories.optionsPressable.default.bg,
          COLORS.screens.categories.optionsPressable.selected.bg,
        ]
      ),
      borderColor: interpolateColor(
        sharedValue.value,
        [0, 1],
        [
          COLORS.screens.categories.optionsPressable.default.border,
          COLORS.screens.categories.optionsPressable.selected.border,
        ]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        sharedValue.value,
        [0, 1],
        [
          COLORS.screens.categories.optionsPressable.default.text,
          COLORS.screens.categories.optionsPressable.selected.text,
        ]
      ),
    };
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: we don't need to add shared value to dependency array
  useLayoutEffect(() => {
    sharedValue.value = withTiming(+selected, {
      duration: ANIMATION_DURATION.OPTION_PRESSABLE,
    });
  }, [selected]);

  return (
    <PressableAnimated
      style={[styles.container, animatedPressableStyle]}
      onPress={onPress}
    >
      <TextBaseAnimated style={animatedTextStyle}>{label}</TextBaseAnimated>
    </PressableAnimated>
  );
};

export default Item;

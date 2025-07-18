import { useCallback } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import type { Option } from '@/shared/types/component.ts';

import Item from './Item';

const styles = StyleSheet.create({
  root: {
    width: 336,
    rowGap: 6,
  },
});

interface Props<T = string> {
  selectedOption: Option;
  options: Option<T>[];
  onOptionPress: (option: Option<T>) => void;
  style?: StyleProp<ViewStyle>;
}

const OptionsPressable = <T,>({
  selectedOption,
  options,
  onOptionPress,
  style,
}: Props<T>) => {
  const handleOptionPress = useCallback(
    (option: Option<T>) => {
      onOptionPress(option);
    },
    [onOptionPress]
  );

  return (
    <View style={[styles.root, style]}>
      {options.map((option) => (
        <Item
          key={option.value as string}
          label={option.label}
          onPress={() => handleOptionPress(option)}
          selected={option.value === selectedOption.value}
        />
      ))}
    </View>
  );
};

export default OptionsPressable;

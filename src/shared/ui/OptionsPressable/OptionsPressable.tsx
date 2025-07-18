import { type FC, useCallback } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import Item from './Item';

const styles = StyleSheet.create({
  root: {
    width: 336,
    rowGap: 6,
  },
});

interface Props {
  selectedOption: string;
  options: string[];
  onOptionPress: (option: string) => void;
  style?: StyleProp<ViewStyle>;
}

const OptionsPressable: FC<Props> = ({
  selectedOption,
  options,
  onOptionPress,
  style,
}) => {
  const handleOptionPress = useCallback(
    (option: string) => {
      onOptionPress(option);
    },
    [onOptionPress]
  );

  return (
    <View style={[styles.root, style]}>
      {options.map((option) => (
        <Item
          key={option}
          label={option}
          onPress={() => handleOptionPress(option)}
          selected={option === selectedOption}
        />
      ))}
    </View>
  );
};

export default OptionsPressable;

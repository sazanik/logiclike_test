import type { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { COLORS } from '@/shared/constants/colors.ts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.shared.bg,
  },
});

type Props = {
  backgroundColor?: string;
  color?: string;
};

const LoadingIndicator: FC<Props> = ({
  backgroundColor = COLORS.shared.bg,
  color = COLORS.shared.text,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size='large' color={color} />
    </View>
  );
};

export default LoadingIndicator;

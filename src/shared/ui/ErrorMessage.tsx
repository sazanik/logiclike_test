import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '@/shared/constants/colors.ts';
import TextBase from '@/shared/ui/Text/TextBase.tsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.shared.bg,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 60,
  },
});

type Props = {
  message: string;
  backgroundColor?: string;
  textColor?: string;
};

const ErrorMessage: FC<Props> = ({
  message,
  backgroundColor = COLORS.shared.bg,
  textColor = COLORS.screens.courses.error.text,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextBase style={[styles.text, { color: textColor }]}>{message}</TextBase>
    </View>
  );
};

export default ErrorMessage;

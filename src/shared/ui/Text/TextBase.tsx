import type { FC } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { COLORS } from '@/shared/constants/colors.ts';
import { FONTS } from '@/shared/constants/fonts';

const styles = StyleSheet.create({
  root: {
    fontFamily: FONTS.NUNITO.EXTRA_BOLD,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontWeight: 'bold',
    color: COLORS.shared.text,
  },
});

const TextBase: FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.root, style]} {...props}>
      {children}
    </Text>
  );
};

export default TextBase;

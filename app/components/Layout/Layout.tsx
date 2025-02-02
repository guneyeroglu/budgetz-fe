import { FC, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, TYPOGRAPHY } from '@/theme';

interface IProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const Layout: FC<IProps> = ({ children, style = {} }) => {
  const { top } = useSafeAreaInsets();

  return <View style={[styles.container, { paddingTop: top }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
});

import { FC, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@/theme';

import { Header } from '../Header';

interface IProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  showHeader?: boolean;
}

export const Layout: FC<IProps> = ({ children, style = {}, showHeader = true }) => {
  return (
    <View style={[styles.container, style]}>
      {showHeader && <Header />}
      {children}
    </View>
  );
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

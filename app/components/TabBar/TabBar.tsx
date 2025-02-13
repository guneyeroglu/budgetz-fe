import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

import { Button } from '../Button';

export const TabBar: FC<BottomTabBarProps> = ({ descriptors, insets, navigation, state }) => {
  return (
    <BlurView intensity={20} style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route: NavigationRoute<ParamListBase, string>, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused: boolean = state.index === index;
        const onPress = (): void => navigation.navigate(route.name);

        return (
          <Button key={route.key} style={styles.tabBar} onPress={onPress}>
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? COLORS.accent : COLORS.disabledText,
                size: TYPOGRAPHY.fontSize.xxl,
              })}
          </Button>
        );
      })}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabBar: {
    flex: 1,
    paddingVertical: SPACING.lg,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

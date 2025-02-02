import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export const TabBar: FC<BottomTabBarProps> = ({ descriptors, insets, navigation, state }) => {
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route: NavigationRoute<ParamListBase, string>, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused: boolean = state.index === index;
        const onPress = (): void => navigation.navigate(route.name);

        return (
          <TouchableOpacity key={route.key} style={styles.tabBar} activeOpacity={1} onPress={onPress}>
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? COLORS.accent : COLORS.disabledText,
                size: TYPOGRAPHY.fontSize.xxl,
              })}
          </TouchableOpacity>
        );
      })}
    </View>
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

import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';
import Animated, { Easing, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

import { Button } from '../Button';
import { Text } from '../Text';

export const TabBar: FC<BottomTabBarProps> = ({ descriptors, insets, navigation, state }) => {
  const shadowOpacity: SharedValue<number> = useSharedValue<number>(0);
  const animatedShadowOpacity: {
    shadowOpacity: number;
  } = useAnimatedStyle(() => ({
    shadowOpacity: shadowOpacity.value,
  }));

  const shadowOpacityWithTiming = () => {
    shadowOpacity.value = withTiming(0.75, {
      duration: 350,
      easing: Easing.linear,
    });
  };

  useEffect(() => {
    shadowOpacityWithTiming();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressToNavigate = (navFunc: () => void): void => {
    navFunc();
    shadowOpacity.value = 0;
    shadowOpacityWithTiming();
  };

  return (
    <View style={[styles.container, { marginBottom: insets.bottom !== 0 ? SPACING.none : SPACING.md }]}>
      {state.routes.map((route: NavigationRoute<ParamListBase, string>, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused: boolean = state.index === index;
        const title: string = options.title ?? '';
        const onPress = (): void => {
          if (!isFocused) {
            onPressToNavigate(() => navigation.navigate(route.name));
          }
        };

        return (
          <Button key={route.key} style={styles.tabBar} onPress={onPress}>
            <Animated.View
              style={[
                styles.animatedView,
                { shadowColor: isFocused ? COLORS.accent : COLORS.transparent },
                animatedShadowOpacity,
              ]}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? COLORS.accent : COLORS.disabledText,
                  size: TYPOGRAPHY.fontSize['2xl'],
                })}
              <Text fontSize='xs' variant='medium' color={isFocused ? 'accent' : 'disabledText'}>
                {title}
              </Text>
            </Animated.View>
          </Button>
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
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginHorizontal: SPACING.md,
    borderRadius: SPACING.md,
  },
  tabBar: {
    position: 'relative',
    flex: 1,
    paddingVertical: SPACING.lg,
  },
  animatedView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 4,
  },
});

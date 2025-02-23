import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/theme';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    ['Poppins-300']: require('../assets/fonts/Poppins-Light.ttf'),
    ['Poppins-400']: require('../assets/fonts/Poppins-Regular.ttf'),
    ['Poppins-500']: require('../assets/fonts/Poppins-Medium.ttf'),
    ['Poppins-800']: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <StatusBar style='light' backgroundColor={COLORS.primary} />
        <Stack
          screenOptions={{
            navigationBarColor: COLORS.primary,
          }}
        >
          <Stack.Screen
            name='(tabs)'
            options={{
              headerShown: false,
              contentStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  gestureContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

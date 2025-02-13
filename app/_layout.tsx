import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import axios from 'axios';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

    console.log(axios);
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <StatusBar style='light' />
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='+not-found' />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
});

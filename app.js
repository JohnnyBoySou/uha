import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useCallback, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import dark from './src/theme/dark';
import light from './src/theme/light';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, useColorScheme } from 'react-native';
import Router from './src/router/index';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const theme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try{
        await Font.loadAsync({
          Font_Book: require('./assets/fonts/Inter_Book.ttf'),
          Font_Medium: require('./assets/fonts/Inter_Medium.ttf'),
          Font_Bold: require('./assets/fonts/Inter_Bold.ttf'),
          Font_Black: require('./assets/fonts/Inter_Black.ttf'),
        });
      }catch (e) {
        console.warn(e);
      }finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  //theme === 'dark' ? dark : light // toggle theme
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={light}>
        <StatusBar style="dark" translucent />
        <Router />
      </ThemeProvider>
    </View>
  );
}

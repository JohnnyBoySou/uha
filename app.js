import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, LogBox } from 'react-native';
import Router from './src/router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import light from './src/theme/light';
preventAutoHideAsync();
import { OneSignal, LogLevel } from 'react-native-onesignal';
import Constants  from 'expo-constants';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {

    const handleNotification = () => {
      //LogBox.ignoreAllLogs(true);
      const key = process.env.ONESIGNAL_KEY || Constants.expoConfig.extra.oneSignalAppId;
      if(key != null){
        OneSignal.initialize(key);
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      }
    }

    handleNotification();

    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          Font_Book: require('./assets/fonts/Inter_Book.ttf'),
          Font_Medium: require('./assets/fonts/Inter_Medium.ttf'),
          Font_Bold: require('./assets/fonts/Inter_Bold.ttf'),
          Font_Black: require('./assets/fonts/Inter_Black.ttf'),
        });
        // Carregamento das fontes concluído
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={light}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </ThemeProvider>
    </View>
  );
}

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
import { OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { initialize } from 'react-native-clarity';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const handleNotification = async () => {
      LogBox.ignoreAllLogs(true);
      const key = process.env.EXPO_PUBLIC_KEY || Constants.expoConfig.extra.oneSignalAppId;
      const keyClarify = process.env.EXPO_PRIVATE_CLARIFY || Constants.expoConfig.extra.clarifyAppId;
      if (key != null) {
        OneSignal.initialize(key);
        initialize(keyClarify);
      }
      let { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        status = newStatus;
        console.log('status', status)
      }
      if (status !== 'granted') {
        console.log('permitido')
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

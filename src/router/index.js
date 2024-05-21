import React from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { NavigationContainer  } from '@react-navigation/native';
import HomeScreen from '@screens/home';
import OnboardingScreen from '@screens/onboarding/index';
import AsyncStatic from '@screens/async';
import AccountScreen from '@screens/account';
import LoginScreen from '@screens/auth/login';
import NotifyScreen from '@screens/notify';
import RedeemScreen from '@screens/redeem';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  ,  backBehavior: 'none',}}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Account" component={AccountScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
            <Stack.Screen name="Notify" component={NotifyScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Redeem" component={RedeemScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
        </Stack.Navigator>
    </NavigationContainer>
   );
  }
  /**
  <Stack.Screen name="AsyncStatic" component={AsyncStatic} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
  <Stack.Screen name="Account" component={AccountScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
  */
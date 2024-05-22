import React from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { NavigationContainer  } from '@react-navigation/native';

import HomeScreen from '@screens/home';
import OnboardingScreen from '@screens/onboarding/index';
import AccountScreen from '@screens/account';
import LoginScreen from '@screens/auth/login';
import NotifyScreen from '@screens/notify';
import RedeemScreen from '@screens/redeem';

import BuyServiceScreen from '@screens/buyservice';
import BuyServiceSuccessScreen from '@screens/buyservice/success';
import BuyServiceErrorScreen from '@screens/buyservice/error';
import BuyServiceGiftCardScreen from '@screens/buyservice/gift_card';

import DonateScreen from '@screens/donate';
import DonateValueScreen from '@screens/donate/value';
import NotafiscalScreen from '@screens/notafiscal';
import NotafiscalSendScreen from '@screens/notafiscal/send';
import DevScreen from '@screens/dev';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='Dev'>
            <Stack.Screen name="Home" component={HomeScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  ,  backBehavior: 'none',}}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Account" component={AccountScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
            <Stack.Screen name="Notify" component={NotifyScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Redeem" component={RedeemScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyService" component={BuyServiceScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceSuccess" component={BuyServiceSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceError" component={BuyServiceErrorScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceGiftCard" component={BuyServiceGiftCardScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
           
            <Stack.Screen name="Donate" component={DonateScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateValue" component={DonateValueScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Notafiscal" component={NotafiscalScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="NotafiscalSend" component={NotafiscalSendScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Dev" component={DevScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
        </Stack.Navigator>
    </NavigationContainer>
   );
  }
  /**
  <Stack.Screen name="AsyncStatic" component={AsyncStatic} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
  <Stack.Screen name="Account" component={AccountScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
  */
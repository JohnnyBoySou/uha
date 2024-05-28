import React from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '@screens/home';
import OnboardingScreen from '@screens/onboarding/index';
import LoginScreen from '@screens/auth/login';
import NotifyScreen from '@screens/notify';
import RedeemScreen from '@screens/redeem';
import ShareScreen from '@screens/share';

import DevScreen from '@screens/dev';

import BuyServiceScreen from '@screens/buyservice';
import BuyServiceSuccessScreen from '@screens/buyservice/success';
import BuyServiceErrorScreen from '@screens/buyservice/error';
import BuyServiceSuccessHideScreen from '@screens/buyservice/success_hide';
import BuyServiceGiftCardScreen from '@screens/buyservice/gift_card';
import BuyServiceRifaScreen from '@screens/buyservice/rifa';

import DonateScreen from '@screens/donate';
import DonateValueScreen from '@screens/donate/value';
import DonateHideScreen from '@screens/donate/hide';
import DonateValueHideScreen from '@screens/donate/value_hide';

import NotafiscalScreen from '@screens/notafiscal';
import NotafiscalSendScreen from '@screens/notafiscal/send';
import NotafiscalSuccessScreen from '@screens/notafiscal/success';
import NotafiscalErrorScreen from '@screens/notafiscal/error';

import ExtractScreen from '@screens/extract';
import ExtractSingleScreen from '@screens/extract/single';

import AccountScreen from '@screens/account';
import AccountNotifyScreen from '@screens/account/notify';
import AccountDetailsScreen from '@screens/account/details';
import AccountAccessInfoScreen from '@screens/account/access';

import CampaignsRifasScreen from '@screens/campaigns/rifa';
import CampaignsScreen from '@screens/campaigns';
import CampaignsGiftCardScreen from '@screens/campaigns/gift_card';

import ONGSingleScreen from '@screens/ong/single';

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
            <Stack.Screen name="Dev" component={DevScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="Share" component={ShareScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
           

            <Stack.Screen name="BuyService" component={BuyServiceScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceSuccess" component={BuyServiceSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceError" component={BuyServiceErrorScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceGiftCard" component={BuyServiceGiftCardScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceRifa" component={BuyServiceRifaScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceSuccessHide" component={BuyServiceSuccessHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Donate" component={DonateScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateValue" component={DonateValueScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateHide" component={DonateHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateValueHide" component={DonateValueHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Notafiscal" component={NotafiscalScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="NotafiscalSend" component={NotafiscalSendScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="NotafiscalSuccess" component={NotafiscalSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="NotafiscalError" component={NotafiscalErrorScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Extract" component={ExtractScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ExtractSingle" component={ExtractSingleScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="AccountNotify" component={AccountNotifyScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="AccountAccessInfo" component={AccountAccessInfoScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="CampaignsRifas" component={CampaignsRifasScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="Campaigns" component={CampaignsScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="CampaignsGiftCard" component={CampaignsGiftCardScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            
            <Stack.Screen name="ONGSingle" component={ONGSingleScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

        </Stack.Navigator>
    </NavigationContainer>
   );
  }
  /**
   Transitions:
    ModalSlideFromBottomIOS
    SlideFromRightIOS
    ModalPresentationIOS
    FadeFromBottomAndroid 
    RevealFromBottomAndroid
    ScaleFromCenterAndroid 
    DefaultTransition 
    ModalTransition

  */
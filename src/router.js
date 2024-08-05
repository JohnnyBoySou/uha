import React from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute, useLinking } from '@react-navigation/native';
//import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';

import OnboardingScreen from '@screens/auth/onboarding';
import AuthLoginScreen from '@screens/auth/login';
import AsyncStaticScreen from '@screens/auth/async';

import HomeScreen from '@screens/tabs/home';

import RaspadinhasScreen from '@screens/raspadinhas';
import RaspadinhasSingleScreen from '@screens/raspadinhas/single';
import RaspadinhasShopScreen from '@screens/raspadinhas/shop';

import RifasScreen from '@screens/rifas';
import RifasSingleScreen from '@screens/rifas/single';
import RifasBuyScreen from '@screens/rifas/buy';

import NotifyScreen from '@screens/geral/notify';
import ShareScreen from '@screens/geral/share';
import FavoritesScreen from '@screens/geral/favorites';
import ReciboScreen from '@screens/geral/recibo';

import CategorySingleScreen from '@screens/tabs/search/category';
import SearchScreen from '@screens/tabs/search';

import DonateScreen from '@screens/donate';
import DonateValueScreen from '@screens/donate/value';
import DonateSuccessScreen from '@screens/donate/success';

import DonateHideScreen from '@screens/donate/hide/hide';
import DonateValueHideScreen from '@screens/donate/hide/value_hide';
import DonateSuccessHideScreen from '@screens/donate/hide/success_hide';

import DonateCertificadoScreen from '@screens/donate/certificado';

import PayBoletoScreen from '@screens/donate/pay_boleto';

import NotafiscalScreen from '@screens/tabs/notafiscal';
import NotafiscalSendScreen from '@screens/tabs/notafiscal/send';
import NotafiscalSuccessScreen from '@screens/tabs/notafiscal/success';
import NotafiscalErrorScreen from '@screens/tabs/notafiscal/error';
import NotafiscalONGS from '@screens/tabs/notafiscal/ongs';
import NotafiscalSelectScreen from '@screens/tabs/notafiscal/select';

import NotafiscalErrorAnonimoScreen from '@screens/tabs/notafiscal/anonimo/error_anonimo';
import NotafiscalSendAnonimoScreen from '@screens/tabs/notafiscal/anonimo/send_anonimo';
import NotafiscalONGSAnonimoScreen from '@screens/tabs/notafiscal/anonimo/ongs_anonimo';
import NotafiscalSuccessAnonimoScreen from '@screens/tabs/notafiscal/anonimo/success_anonimo';

import ExtractScreen from '@screens/tabs/extract';
import ExtractSingleScreen from '@screens/tabs/extract/single';
import ExtractPaymentScreen from '@screens/tabs/extract/payment';
import CertificateScreen from '@screens/tabs/extract/certificate';

import AccountScreen from '@screens/tabs/account';
import AccountNotifyScreen from '@screens/tabs/account/notify';
import AccountDetailsScreen from '@screens/tabs/account/details';
import AccountAccessInfoScreen from '@screens/tabs/account/access';
import AccountFAQScreen from '@screens/tabs/account/faq';
import TermsScreen from '@screens/geral/terms';
import AccountResetScreen from '@screens/tabs/account/reset'

import ONGSingleScreen from '@screens/ong/single';
import ONGListScreen from '@screens/ong/list';
import ONGSScreen from '@screens/ong';
import ONGCategoryScreen from '@screens/ong/category';

import ShopScreen from '@screens/shop';
import ShopSingleScreen from '@screens/shop/shop_single';
import ShopServiceSingleScreen from '@screens/shop/service_single';
import ShopQRCodeScreen from '@screens/shop/qrcode';
import ShopOffersScreen from '@screens/shop/offers';

import QuestionsScreen from '@screens/questions';
import QuestionsSuccessScreen from '@screens/questions/success';


import RankingScreen from '@screens/ranking';
import ComunidadeScreen from '@screens/comunidade';
import StickersScreen from '@screens/comunidade/stickers';
import StickerSingleScreen from '@screens/comunidade/sticker_single';
import AboutScreen from '@screens/geral/about';

//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//ICONS
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const linking = {
  prefixes: ['uha://'],
  config: {
    screens: {
      Notify: {
        path: 'notify',
        parse: {
          message: (message) => `${message}`,
        },
      },
    },
  },
};


export default function Router() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='Questions'>

        <Stack.Screen name="Async" component={AsyncStaticScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Tabs" component={Tabs} options={{ backBehavior: 'none', }} />

        <Stack.Screen name="Notify" component={NotifyScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Share" component={ShareScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Recibo" component={ReciboScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="About" component={AboutScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="CategorySingle" component={CategorySingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Shop" component={ShopScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ShopServiceSingle" component={ShopServiceSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ShopSingle" component={ShopSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ShopQRCode" component={ShopQRCodeScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ShopOffers" component={ShopOffersScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Ranking" component={RankingScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Comunidade" component={ComunidadeScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="Stickers" component={StickersScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="StickerSingle" component={StickerSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Donate" component={DonateScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="DonateValue" component={DonateValueScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="DonateHide" component={DonateHideScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="DonateSuccessHide" component={DonateSuccessHideScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="DonateSuccess" component={DonateSuccessScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="DonateValueHide" component={DonateValueHideScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="DonateCertificado" component={DonateCertificadoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="PayBoleto" component={PayBoletoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Notafiscal" component={NotafiscalScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="NotafiscalSend" component={NotafiscalSendScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="NotafiscalSendAnonimo" component={NotafiscalSendAnonimoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="NotafiscalONGSAnonimo" component={NotafiscalONGSAnonimoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="NotafiscalSuccessAnonimo" component={NotafiscalSuccessAnonimoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="NotafiscalErrorAnonimo" component={NotafiscalErrorAnonimoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />


        <Stack.Screen name="NotafiscalSelect" component={NotafiscalSelectScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="NotafiscalSuccess" component={NotafiscalSuccessScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="NotafiscalError" component={NotafiscalErrorScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="NotafiscalONGS" component={NotafiscalONGS} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Extract" component={ExtractScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ExtractSingle" component={ExtractSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ExtractPayment" component={ExtractPaymentScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Certificate" component={CertificateScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Account" component={AccountScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="AccountNotify" component={AccountNotifyScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="AccountAccess" component={AccountAccessInfoScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="AccountFAQ" component={AccountFAQScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="AccountReset" component={AccountResetScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="ONGSingle" component={ONGSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ONGList" component={ONGListScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ONGS" component={ONGSScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="ONGCategory" component={ONGCategoryScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Raspadinhas" component={RaspadinhasScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="RaspadinhasSingle" component={RaspadinhasSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="RaspadinhasShop" component={RaspadinhasShopScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Rifas" component={RifasScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="RifasSingle" component={RifasSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="RifasBuy" component={RifasBuyScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />

        <Stack.Screen name="Questions" component={QuestionsScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="QuestionsSuccess" component={QuestionsSuccessScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function Tabs() {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        backBehavior: 'none',
        tabBarActiveTintColor: '#FF26BD',
        tabBarInactiveTintColor: '#5C0D4580',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderWidth: 2,
          borderTopWidth: 2,
          borderColor: '#F0F0F0',
          height: 68,
          paddingBottom: 12,
          paddingTop: 10,
          position: 'absolute',
          bottom: 10,
          borderRadius: 16,
          elevation: 0,
          left: 15, right: 15,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        backBehavior: 'initialRoute',
        tabBarLabel: 'Início',
        tabBarLabelStyle: {
          fontFamily: routeName === 'Home' ? 'Font_Bold' : 'Font_Book',
        },
        tabBarIcon: ({ color, size }) => (
          <Octicons name="home" size={routeName === 'Home' ? size + 3 : size} color={color} />
        ),
      }} />
      <Tab.Screen name="Notafiscal" component={NotafiscalScreen} options={{
        tabBarLabel: 'Nota Fiscal',
        tabBarLabelStyle: {
          fontFamily: routeName === 'Notafiscal' ? 'Font_Bold' : 'Font_Book',
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clipboard-edit-outline" size={routeName === 'Notafiscal' ? size + 3 : size} color={color} />
        ),
      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarLabel: 'Buscar',
        tabBarLabelStyle: {
          fontFamily: routeName === 'Search' ? 'Font_Bold' : 'Font_Book',
        },
        tabBarIcon: ({ color, size }) => (
          <Octicons name="search" size={routeName === 'Seach' ? size + 3 : size} color={color} />
        ),
      }} />
      <Tab.Screen name="Extract" component={ExtractScreen}
        options={{
          tabBarLabel: 'Histórico',
          tabBarLabelStyle: {
            fontFamily: routeName === 'Extract' ? 'Font_Bold' : 'Font_Book',
            lineHeight: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <Octicons name="clock" size={routeName === 'Extract' ? size + 3 : size} color={color} />
          ),
        }} />
      <Tab.Screen name="Account" component={AccountScreen}
        options={{
          tabBarLabel: 'Conta',
          tabBarLabelStyle: {
            fontFamily: routeName === 'Account' ? 'Font_Bold' : 'Font_Book',
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" size={routeName === 'Account' ? size + 3 : size} color={color} />
          ),
        }} />
    </Tab.Navigator>
  )
}


/*
fade
fade_from_bottom
flip: flip the screen, requires presentation: "modal" (iOS only)
simple_push
slide_from_bottom
slide_from_right
slide_from_left
*/
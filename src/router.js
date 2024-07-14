import React from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';

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

import ExtractScreen from '@screens/tabs/extract';
import ExtractSingleScreen from '@screens/tabs/extract/single';

import AccountScreen from '@screens/tabs/account';
import AccountNotifyScreen from '@screens/tabs/account/notify';
import AccountDetailsScreen from '@screens/tabs/account/details';
import AccountAccessInfoScreen from '@screens/tabs/account/access';
import AccountFAQScreen from '@screens/tabs/account/faq';
import AccountTermsScreen from '@screens/tabs/account/terms';
import AccountResetScreen from '@screens/tabs/account/reset'

import ONGSingleScreen from '@screens/ong/single';
import ONGListScreen from '@screens/ong/list';
import ONGSScreen from '@screens/ong';

import ShopScreen from '@screens/shop';
import ShopSingleScreen from '@screens/shop/shop_single';
import ShopServiceSingleScreen from '@screens/shop/service_single';
import ShopQRCodeScreen from '@screens/shop/qrcode';
import ShopOffersScreen from '@screens/shop/offers';

import QuestionsScreen from '@screens/questions';
import QuestionListScreen from '@screens/questions/list';
import QuestionsChatScreen from '@screens/questions/chat';
import QuestionsChatStatusScreen from '@screens/questions/chat_status';

import RankingScreen from '@screens/ranking';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//ICONS
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='Async'>
          
            <Stack.Screen name="Async" component={AsyncStaticScreen} options={{...TransitionPresets.RevealFromBottomAndroid   , }}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{...TransitionPresets.SlideFromRightIOS  , }}/>
            <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{...TransitionPresets.SlideFromRightIOS  , }}/>

            <Stack.Screen name="Tabs" component={Tabs} options={{...TransitionPresets.SlideFromRightIOS  ,  backBehavior: 'none',}}/>

            <Stack.Screen name="Notify" component={NotifyScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="Share" component={ShareScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
            <Stack.Screen name="Recibo" component={ReciboScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            
            <Stack.Screen name="CategorySingle" component={CategorySingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Shop" component={ShopScreen} options={{...TransitionPresets.SlideFromRightIOS  , }}/>
            <Stack.Screen name="ShopServiceSingle" component={ShopServiceSingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ShopSingle" component={ShopSingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ShopQRCode" component={ShopQRCodeScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ShopOffers" component={ShopOffersScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Ranking" component={RankingScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Donate" component={DonateScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="DonateValue" component={DonateValueScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="DonateHide" component={DonateHideScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="DonateValueHide" component={DonateValueHideScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="DonateSuccessHide" component={DonateSuccessHideScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="DonateCertificado" component={DonateCertificadoScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="PayBoleto" component={PayBoletoScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Notafiscal" component={NotafiscalScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="NotafiscalSend" component={NotafiscalSendScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="NotafiscalSuccess" component={NotafiscalSuccessScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="NotafiscalError" component={NotafiscalErrorScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="NotafiscalONGS" component={NotafiscalONGS} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Extract" component={ExtractScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ExtractSingle" component={ExtractSingleScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Account" component={AccountScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
            <Stack.Screen name="AccountNotify" component={AccountNotifyScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="AccountAccess" component={AccountAccessInfoScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="AccountFAQ" component={AccountFAQScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="AccountTerms" component={AccountTermsScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="AccountReset" component={AccountResetScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>


            <Stack.Screen name="ONGSingle" component={ONGSingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ONGList" component={ONGListScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ONGS" component={ONGSScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Raspadinhas" component={RaspadinhasScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="RaspadinhasSingle" component={RaspadinhasSingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="RaspadinhasShop" component={RaspadinhasShopScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Rifas" component={RifasScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="RifasSingle" component={RifasSingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="RifasBuy" component={RifasBuyScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>


            <Stack.Screen name="Questions" component={QuestionsScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="QuestionList" component={QuestionListScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="QuestionsChat" component={QuestionsChatScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="QuestionsChatStatus" component={QuestionsChatStatusScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
        </Stack.Navigator>
    </NavigationContainer>
   );
  }

function Tabs (){
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
                <Octicons name="home" size={routeName === 'Home' ? size+3 : size} color={color} />
              ),
          }}/>
              <Tab.Screen name="Notafiscal" component={NotafiscalScreen}  options={{
              tabBarLabel: 'Nota Fiscal',
              tabBarLabelStyle: {
                fontFamily: routeName === 'Notafiscal' ? 'Font_Bold' : 'Font_Book',
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-edit-outline" size={routeName === 'Notafiscal' ? size+3 : size} color={color}/>
              ),
          }}/>
             <Tab.Screen name="Search" component={SearchScreen}  options={{
              tabBarLabel: 'Buscar',
              tabBarLabelStyle: {
                fontFamily: routeName === 'Search' ? 'Font_Bold' : 'Font_Book',
              },
              tabBarIcon: ({ color, size }) => (
                <Octicons name="search" size={routeName === 'Seach' ? size+3 : size} color={color} />
              ),
          }}/>
           <Tab.Screen name="Extract" component={ExtractScreen}  
              options={{
              tabBarLabel: 'Histórico',
              tabBarLabelStyle: {
                fontFamily: routeName === 'Extract' ? 'Font_Bold' : 'Font_Book',
                lineHeight: 10,
              },
              tabBarIcon: ({ color, size }) => (
                <Octicons name="clock" size={routeName === 'Extract' ? size+3 : size} color={color} />
              ),
          }}/>
           <Tab.Screen name="Account" component={AccountScreen}  
              options={{
              tabBarLabel: 'Conta',
              tabBarLabelStyle: {
                fontFamily: routeName === 'Account' ? 'Font_Bold' : 'Font_Book',
              },
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="user" size={routeName === 'Account' ? size+3 : size} color={color} />
              ),
          }}/>
          </Tab.Navigator>
      )
  }
  

  /**
   Transitions:
      ModalSlideFromBottomIOS
      SlideFromRightIOS
      SlideFromRightIOS
      FadeFromBottomAndroid 
      RevealFromBottomAndroid
      ScaleFromCenterAndroid 
      DefaultTransition 
      ModalTransition


  */
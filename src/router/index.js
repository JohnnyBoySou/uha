import React from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';

import HomeScreen from '@screens/home';
import OnboardingScreen from '@screens/onboarding/index';

import AuthLoginScreen from '@screens/auth/login';
import AuthRegisterScreen from '@screens/auth/register';
import AuthResetScreen from '@screens/auth/reset';

import NotifyScreen from '@screens/notify';
import RedeemScreen from '@screens/redeem';
import ShareScreen from '@screens/share';
import AsyncStaticScreen from '@screens/async';
import ReciboScreen from '@screens/recibo';
import SearchScreen from '@screens/search';

import DevScreen from '@screens/dev';

import BuyServiceScreen from '@screens/buyservice';
import BuyServiceSuccessScreen from '@screens/buyservice/success';
import BuyServiceGiftSuccessScreen from '@screens/buyservice/success_gift';
import BuyServiceErrorScreen from '@screens/buyservice/error';
import BuyServiceGiftErrorScreen from '@screens/buyservice/error_gift';
import BuyServiceSuccessHideScreen from '@screens/buyservice/success_hide';
import BuyServiceRifaSuccessScreen from '@screens/buyservice/success_rifa';

import BuyServiceGiftCardScreen from '@screens/buyservice/gift_card';
import BuyServiceRifaScreen from '@screens/buyservice/rifa';
import BuyServiceReceiveGiftScreen from '@screens/buyservice/receive_gift';

import DonateScreen from '@screens/donate';
import DonateValueScreen from '@screens/donate/value';
import DonateHideScreen from '@screens/donate/hide';
import DonateValueHideScreen from '@screens/donate/value_hide';
import DonateSuccessHideScreen from '@screens/donate/success_hide';
import DonateCertificadoScreen from '@screens/donate/certificado';

import PayBoletoScreen from '@screens/donate/pay_boleto';
import NotafiscalScreen from '@screens/notafiscal';
import NotafiscalSendScreen from '@screens/notafiscal/send';
import NotafiscalSuccessScreen from '@screens/notafiscal/success';
import NotafiscalErrorScreen from '@screens/notafiscal/error';
import NotafiscalONGS from '@screens/notafiscal/ongs';

import ExtractScreen from '@screens/extract';
import ExtractSingleScreen from '@screens/extract/single';
import ExtractSingleMoedasScreen from '@screens/extract/single_moedas';
import ExtractSingleRifasScreen from '@screens/extract/single_rifas';

import AccountScreen from '@screens/account';
import AccountNotifyScreen from '@screens/account/notify';
import AccountDetailsScreen from '@screens/account/details';
import AccountAccessInfoScreen from '@screens/account/access';
import AccountFAQScreen from '@screens/account/faq';
import AccountTermsScreen from '@screens/account/terms';

import CampaignsRifasScreen from '@screens/campaigns/rifa';
import CampaignsScreen from '@screens/campaigns';
import CampaignsGiftCardScreen from '@screens/campaigns/gift_card';
import CampaignsProgressScreen from '@screens/campaigns/progress';
import CampaignsPontosScreen from '@screens/campaigns/points';
import CampaignsSingleScreen from '@screens/campaigns/single';
import CampaignsSingleFinishScreen from '@screens/campaigns/finish';

import ONGSingleScreen from '@screens/ong/single';
import ONGListScreen from '@screens/ong/list';
import FavoritesScreen from '@screens/favorites';

import ShopScreen from '@screens/shop';
import ShopSingleScreen from '@screens/shop/shop_single';
import ShopServiceSingleScreen from '@screens/shop/service_single';
import ShopQRCodeScreen from '@screens/shop/qrcode';
import ShopSingleSearchScreen from '@screens/shop/search_shop_single';
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
        <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName='Extract'>
            <Stack.Screen name="Tabs" component={Tabs} options={{...TransitionPresets.ModalSlideFromBottomIOS  ,  backBehavior: 'none',}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  ,  backBehavior: 'none',}}/>
            <Stack.Screen name="Notify" component={NotifyScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Redeem" component={RedeemScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Dev" component={DevScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="Share" component={ShareScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
            <Stack.Screen name="Async" component={AsyncStaticScreen} options={{...TransitionPresets.RevealFromBottomAndroid   , }}/>
            <Stack.Screen name="Recibo" component={ReciboScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="SearchModal" component={SearchScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="AuthReset" component={AuthResetScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>

            <Stack.Screen name="Shop" component={ShopScreen} options={{...TransitionPresets.SlideFromRightIOS  , }}/>
            <Stack.Screen name="ShopServiceSingle" component={ShopServiceSingleScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ShopSingle" component={ShopSingleScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS   , }}/>
            <Stack.Screen name="ShopQRCode" component={ShopQRCodeScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ShopSingleSearch" component={ShopSingleSearchScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ShopOffers" component={ShopOffersScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="Ranking" component={RankingScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>

            <Stack.Screen name="BuyServiceSuccess" component={BuyServiceSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceGiftSuccess" component={BuyServiceGiftSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceError" component={BuyServiceErrorScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceGiftError" component={BuyServiceGiftErrorScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceRifaSuccess" component={BuyServiceRifaSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="BuyService" component={BuyServiceScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceGiftCard" component={BuyServiceGiftCardScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceRifa" component={BuyServiceRifaScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceSuccessHide" component={BuyServiceSuccessHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="BuyServiceReceiveGift" component={BuyServiceReceiveGiftScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Donate" component={DonateScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateValue" component={DonateValueScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateHide" component={DonateHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateValueHide" component={DonateValueHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateSuccessHide" component={DonateSuccessHideScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="DonateCertificado" component={DonateCertificadoScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="PayBoleto" component={PayBoletoScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Notafiscal" component={NotafiscalScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="NotafiscalSend" component={NotafiscalSendScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="NotafiscalSuccess" component={NotafiscalSuccessScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="NotafiscalError" component={NotafiscalErrorScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="NotafiscalONGS" component={NotafiscalONGS} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="Extract" component={ExtractScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="ExtractSingle" component={ExtractSingleScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ExtractSingleMoedas" component={ExtractSingleMoedasScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ExtractSingleRifas" component={ExtractSingleRifasScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>


            <Stack.Screen name="Account" component={AccountScreen} options={{...TransitionPresets.SlideFromRightIOS, }}/>
            <Stack.Screen name="AccountNotify" component={AccountNotifyScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="AccountAccess" component={AccountAccessInfoScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="AccountFAQ" component={AccountFAQScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="AccountTerms" component={AccountTermsScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="CampaignsRifas" component={CampaignsRifasScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="Campaigns" component={CampaignsScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="CampaignsGiftCard" component={CampaignsGiftCardScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="CampaignsProgress" component={CampaignsProgressScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="CampaignsPontos" component={CampaignsPontosScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="CampaignsSingle" component={CampaignsSingleScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="CampaignsSingleFinish" component={CampaignsSingleFinishScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>

            <Stack.Screen name="ONGSingle" component={ONGSingleScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ONGList" component={ONGListScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>


            <Stack.Screen name="Questions" component={QuestionsScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="QuestionList" component={QuestionListScreen} options={{...TransitionPresets.SlideFromRightIOS   , }}/>
            <Stack.Screen name="QuestionsChat" component={QuestionsChatScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="QuestionsChatStatus" component={QuestionsChatStatusScreen} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
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
                <MaterialCommunityIcons name="note-edit-outline" size={routeName === 'Notafiscal' ? size+3 : size} color={color}/>
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
      ModalPresentationIOS
      FadeFromBottomAndroid 
      RevealFromBottomAndroid
      ScaleFromCenterAndroid 
      DefaultTransition 
      ModalTransition




  */
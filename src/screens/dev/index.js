import React, { useContext, useState, } from 'react';
import { Main, Scroll, Column, Title, Label, ButtonOut, Button, Row } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { FlatList } from 'react-native';

export default function DevScreen({navigation, }){
    const { color, font, margin, } = useContext(ThemeContext);
    const routes = ['Home', 'Onboarding', 'Account', 'Login', 'Notify', 'Redeem', 'BuyService', 'BuyServiceSuccess', 'BuyServiceError', 'BuyServiceGiftCard', 'Donate', 'DonateValue', 'Notafiscal', 'NotafiscalSend',
    'Extract', 'ExtractSingle (in Extract)', 'BuyServiceRifa', 'Share', 'AccountNotify', 'AccountDetails', ]
    

    const buyservice =[ 'BuyService', 'BuyServiceSuccess', 'BuyServiceError', 'BuyServiceGiftCard', 'BuyServiceRifa', 'BuyServiceSuccessHide', 'BuyServiceReceiveGift']
    const donate = ['Donate', 'DonateValue', 'DonateHide', 'DonateValueHide']
    const notafiscal = ['Notafiscal', 'NotafiscalSend', 'NotafiscalSuccess', 'NotafiscalError']
    const extract = ['Extract','Single (In Extract)' ]
    const account = ['AccountNotify', 'AccountDetails', 'AccountAccessInfo', 'Account']
    const campaigns = ['Campaigns', 'CampaignsRifas', 'CampaignsGiftCard']
    const others = ['Home', 'Onboarding', 'Login', 'Notify', 'Redeem', 'Share',]

    const [cache, setcache] = useState(buyservice);
    const [route, setroute] = useState('buyservice');
    const paths = [
        {
        name: 'buyservice',
        paths: buyservice,
        },
        {
        name: 'donate',
        paths: donate,
        },
        {
        name: 'notafiscal',
        paths: notafiscal,
        },
        {
        name: 'extract',
        paths: extract,
        },
        {
        name: 'account',
        paths: account,
        },
        {
        name: 'campaigns',
        paths: campaigns,
        },
        {
        name: 'others',
        paths: others,
        }
    ]

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{  }}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v,  }}>
                    <Title style={{ marginVertical: 32, textAlign: 'center' }}>Development Menu</Title>

                        <FlatList
                            numColumns={2}
                            data={paths}
                            keyExtractor={(path) => path.name}
                            renderItem={
                                ( {item : path} ) => (
                                <Button onPress={() => {setcache(path?.paths);setroute(path?.name)}}  style={{ paddingVertical: 12,paddingHorizontal: 24, margin: 6,  backgroundColor: route === path?.name ? color.primary : color.background,  borderRadius: 32, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, }}>
                                    <Title style={{ fontSize: 18,  color: route === path?.name ? "#fff" : color.primary, }}>{path?.name} </Title>
                                </Button>)}
                        />
                  

                  <Title style={{ marginTop: 24, textAlign: 'center', marginBottom: 12, }}>Routes ({cache.length})</Title>

                {cache.map((route, index) => {
                    return(
                        <ButtonOut key={index} onPress={() => {navigation.navigate(route)}}  style={{ borderColor: color.secundary, marginVertical: 8,  }}>
                            <Label style={{ color: color.secundary, }}>{route}</Label>
                        </ButtonOut>
                        )
                    })}
                </Column>
            </Scroll>

        </Main>
    )
    }


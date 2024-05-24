import React, { useContext } from 'react';
import { Main, Scroll, Column, Title, Label, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';

export default function DevScreen({navigation, }){
    const { color, font, margin, } = useContext(ThemeContext);
    const routes = ['Home', 'Onboarding', 'Account', 'Login', 'Notify', 'Redeem', 'BuyService', 'BuyServiceSuccess', 'BuyServiceError', 'BuyServiceGiftCard', 'Donate', 'DonateValue', 'Notafiscal', 'NotafiscalSend',
    'Extract', 'ExtractSingle (in Extract)', 'BuyServiceRifa', 'Share', 'AccountNotify', 'AccountDetails', ]
    
    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                <Title style={{  }}>Dev</Title>
                {routes.map((route, index) => {
                    return(
                        <ButtonOut key={index} onPress={() => {navigation.navigate(route)}}  style={{ borderColor: color.secundary, marginVertical: 8, }}>
                        <Label style={{ color: color.secundary, }}>{route}</Label>
                    </ButtonOut>
                        )
                    })}
                </Column>
            </Scroll>

        </Main>
    )
    }


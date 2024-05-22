import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, ScrollView, View, Animated, Pressable } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage,  } from 'moti';
import { Bell , Search} from 'lucide-react-native';
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import Header from '@components/header';


export default function DevScreen({navigation, }){
    const { color, font, margin, } = useContext(ThemeContext);

    const routes = ['Home', 'Onboarding', 'Account', 'Login', 'Notify', 'Redeem', 'BuyService', 'BuyServiceSuccess', 'BuyServiceError', 'BuyServiceGiftCard', 'Donate', 'DonateValue', 'Notafiscal', 'NotafiscalSend', ]
    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                <Title style={{  }}>Dev</Title>
                {routes.map((route, index) => {
                    return(
                        <ButtonOut onPress={() => {navigation.navigate(route)}}  style={{ borderColor: color.secundary, marginVertical: 8, }}>
                        <Label style={{ color: color.secundary, }}>{route}</Label>
                    </ButtonOut>
                        )
                    })}
                </Column>
            </Scroll>

        </Main>
    )
    }


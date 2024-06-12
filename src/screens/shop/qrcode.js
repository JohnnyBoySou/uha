import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';
import  Header   from '@components/header';
import { MotiImage } from 'moti';
import QRCode from 'react-native-qrcode-svg';

export default function ShopQRCodeScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const code = 'https://i.pinimg.com/564x/6b/36/7f/6b367f53e5df858d867aa45ab0ea93ca.jpg'
     
    return (
        <Main style={{ backgroundColor: color.primary,  }}>
            <Scroll>
            
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: margin.h, }}>
                <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                    <ArrowLeft color={color.secundary}/>
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center',  }}>
                    <Info color="#fff" size={32}/>
                </Column>
            </Row>

            <Column style={{ justifyContent: 'center', alignItems: 'center',   flex: 1, }}>
                <Title style={{ textAlign: 'center', color: "#fff", marginBottom: 50, }}>QR Code Pontos</Title>
                <Column style={{width: 42, height: 42 , borderRadius: 100, backgroundColor: color.primary, borderWidth: 4, marginBottom: -24, zIndex: 99, borderColor: "#fff",}} />
                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',  borderRadius: 32, padding: 32, width: '80%', }}>
                    <Title style={{ marginVertical: 20, fontSize: 24, }}>Aponte a camera</Title>
                    <QRCode
                        size={200}
                        value={code}
                        logo={require('@imgs/logo.png')}
                        logoSize={30}
                        logoBackgroundColor='transparent'
                        />
                </Column>
                <Row style={{ marginVertical: 40, }}>
                    <Title style={{ color: "#fff", fontFamily: font.medium, }}>Ou digite o </Title>
                    <Title style={{ color: "#fff", fontFamily: font.bold, }}>código manual</Title>
                </Row>
            </Column>
            </Scroll>

        </Main>
    )
}

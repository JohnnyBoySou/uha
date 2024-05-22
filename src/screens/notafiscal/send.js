import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';
import { MotiImage } from 'moti';
import Header from '@components/header';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ButtonOut } from './../../theme/global';


export default function NotafiscalSendScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const bottomEnviar = useRef(null);
    const [value, setvalue] = useState('');

    return (
        <Main style={{  }}>
            <Header title="Enviar nota fiscal"/>

            <Label style={{  alignSelf: 'center', textAlign: 'center', marginTop: 100, marginBottom: 30,}}>Aponte sua camerâ para o {'\n'}QR Code da nota fiscal</Label>

            <Column style={{ justifyContent: 'center', alignItems: 'center',  marginHorizontal: margin.h,}}>
                <MotiImage source={require('@imgs/qrcode.png')} style={{ width: 300, height: 300, borderRadius: 12, }} />


                <Button onPress={() => {bottomEnviar.current?.expand()}} >
                <Row style={{ marginVertical: 20, }}>
                    <Title style={{ color: "#111", fontFamily: font.medium, }}>Ou digite o </Title>
                    <Title style={{ color: "#111", fontFamily: font.bold, }}>código manual</Title>
                </Row>
                </Button>

                <Button  style={{ borderRadius: 8, borderColor: color.primary, borderWidth: 2, width: '100%', marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                    <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Minhas notas</Label>
                </Button>

                <Label>Sequência de 44 números</Label>
            </Column>

            <BottomSheet ref={bottomEnviar} snapPoints={[1, 400]}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ textAlign: 'center', marginVertical: 12,}}>Digite o código da nota fiscal</Title>
                    <TextInput value={value} onChangeText={e => setvalue(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard' 
                        style={{ borderWidth: 2, width: 300, alignSelf: 'center', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 24,  }} numberOfLines={4} multiline
                        placeholder='12345678909876543212345678909876543211234'
                        maxLength={44}
                    />
                    <Label style={{ marginTop: -40, marginBottom: 20, alignSelf: 'flex-end', marginRight: 45, fontSize: 16,  fontFamily: font.bold, color: "#111", }}>{value.length}/44</Label>
                    <Label style={{ textAlign: 'center', }}>Sequência de 44 números</Label>
                <ButtonOut onPress={() => {bottomEnviar.current?.close()}}  style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Cadastrar nota</Label>
                </ButtonOut>
                 </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}

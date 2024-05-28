import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button , ButtonOut, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';
import { MotiImage } from 'moti';
import Header from '@components/header';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Clipboard from 'expo-clipboard';


export default function BuyServiceReceiveGiftScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const bottomEnviar = useRef(null);
    const [value, setvalue] = useState('09876543212345');

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(`${value}`);
    };




    return (
        <Main style={{  }}>
            <Scroll>

            <Header title="Gift Card"/>

            <Title style={{ fontSize: 52, lineHeight: 56,  textAlign: 'center', marginTop: 40,}}>Parabéns!</Title>
            <Label style={{  alignSelf: 'center', textAlign: 'center', }}>Alguém especial te mandou um {'\n'}Gift Card virtual para utilizar nos {'\n'}estabelecimentos parceiros </Label>

            <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                <Label>Seu saldo é de:</Label>
                <SubLabel>250 pontos</SubLabel>
            </Column>


            <Column style={{ justifyContent: 'center', alignItems: 'center',  marginHorizontal: margin.h,}}>
                <Column style={{ borderRadius: 32, padding: 32, backgroundColor:"#fff", borderWidth: 2, borderColor: color.primary, }}>
                    <MotiImage source={require('@imgs/qrcode.png')} style={{ width: 250, height: 250,  }} />
                </Column>


                    <Row style={{ marginVertical: 20, }}>
                        <Title style={{ color: "#111", fontFamily: font.medium, }}>Ou digite </Title>
                <Button onPress={() => {bottomEnviar.current?.expand()}} >
                        <Title style={{ color: color.primary, fontFamily: font.bold, textDecorationStyle: 'underline',textDecorationLine: 'underline', textDecorationColor: color.primary, }}>a chave manual</Title>
                </Button>
                    </Row>

                <Button  style={{ borderRadius: 108, borderColor: color.secundary, borderWidth: 2, width: '100%', paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                    <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Conhecer estabelecimentos parceiros</Label>
                </Button>
                <Button  style={{ borderRadius: 108, borderColor: color.secundary, borderWidth: 2, width: '100%',  paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                    <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Saber mais sobre meu Gift Card</Label>
                </Button>
                <ButtonPR style={{ width: '100%',  paddingVertical: 16, marginVertical: 6,}}>
                    <Label style={{ color: "#fff", fontFamily: font.bold, }}>Fazer uma doação para a instutuição</Label>
                </ButtonPR>

            </Column>
            </Scroll>

            <BottomSheet ref={bottomEnviar} snapPoints={[1, 340]}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ textAlign: 'center', marginVertical: 12,}}>Resgatar Gift Card</Title>
                   <Column style={{ width: 300, alignSelf: 'center', }}>
                    <TextInput value={value} onChangeText={e => setvalue(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard' 
                        style={{ borderWidth: 2, width: 300, height: 100, alignSelf: 'center', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18,  }} numberOfLines={3} multiline
                        placeholder='12345678909876543212345678909876543211234'
                        maxLength={44}
                        />
                    <Label style={{ marginTop: -40, marginBottom: 24, marginRight: 10, alignSelf: 'flex-end',  fontSize: 16,  fontFamily: font.bold, color: "#111", }}>{value.length}/14</Label>
                    </Column>
                    <Label style={{ textAlign: 'center',  }}>Sequência de 14 números</Label>
                <ButtonOut onPress={() => {bottomEnviar.current?.close(); copyToClipboard()}}  style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Copiar</Label>
                </ButtonOut>
                 </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}


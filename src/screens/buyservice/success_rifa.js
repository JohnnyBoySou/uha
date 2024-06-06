import React, { useContext, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native';
import SucessAnim from '@anim/sucess';



export default function BuyServiceRifaSuccessScreen({ navigation, route}) {
    const { color, font, margin } = useContext(ThemeContext);
    const type = route.params?.type
    return (
        <Main style={{ backgroundColor: color.green+20, paddingTop: 20,}}>
           <Scroll>

           <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: margin.h, }}>
                <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: "#ffffff80", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                    <ArrowLeft color={color.secundary}/>
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center',  }}>
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                <SucessAnim />
                <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 12, }}>Pontos {'\n'}trocados com {'\n'}sucesso!</Title>
                <Label style={{ textAlign: 'center',   }}>Boa sorte!</Label>
            </Column>

            <Row style={{  padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32,  justifyContent: 'center', alignItems: 'center',   paddingBottom: 18,   }}>
                  <ButtonOut onPress={() => {navigation.goBack()}}  style={{ paddingHorizontal: 24, borderColor: "#111", }}>
                    <Label style={{ color: "#111", fontFamily: font.bold, }}>Comprar mais</Label>
                  </ButtonOut>
                  <Column style={{width: 12, }} />
                  <ButtonOut onPress={() => {navigation.navigate('BuyServiceReceiveGift')}}  style={{ paddingHorizontal: 24, borderColor: color.primary, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, }}>Exportar recibo</Label>
                  </ButtonOut>
                </Row>
                <ButtonOut onPress={() => {navigation.goBack()}}  style={{ paddingHorizontal: 24, borderColor: "#111", marginHorizontal: margin.h, }}>
                    <Label style={{ color: "#111", fontFamily: font.bold, }}>Acompanhar progresso de fichas</Label>
                  </ButtonOut>
           </Scroll>
        </Main>
    )
}


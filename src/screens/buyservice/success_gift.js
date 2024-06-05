import React, { useContext, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native';
import SucessAnim from '@anim/sucess';



export default function BuyServiceGiftSuccessScreen({ navigation, route}) {
    const { color, font, margin } = useContext(ThemeContext);
    const type = route.params?.type
    return (
        <Main style={{ backgroundColor: color.green+20, paddingTop: 20,}}>
           
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
                <Label style={{ textAlign: 'center',   }}>Desfrute de serviços em estabelecimentos parceiros {'\n'}acumulando mais pontos!</Label>
            </Column>

            <Row style={{  padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32,  justifyContent: 'center', alignItems: 'center',   }}>
                  <ButtonOut style={{ paddingHorizontal: 24, borderColor: color.primary, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, }}>Enviar</Label>
                  </ButtonOut>
                  <Column style={{width: 24, }} />
                  <ButtonOut onPress={() => {navigation.navigate('BuyServiceReceiveGift')}}  style={{ paddingHorizontal: 24, borderColor: "#111", }}>
                    <Label style={{ color: "#111", fontFamily: font.bold, }}>Visualizar</Label>
                  </ButtonOut>
                </Row>
        </Main>
    )
}


import React, { useContext, } from 'react';
import { Main, Column, Label, Title, Row, Button, ButtonOut, Scroll } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native';
import SucessAnim from '@anim/sucess';

export default function DonateSuccessHideScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Main style={{ backgroundColor: "#fff", }}>
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
                <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>Doação anônima {'\n'}realizada!</Title>
                <Label style={{ textAlign: 'center',   }}>Agradecemos por se juntar a causa, o {'\n'}mundo precisa de pessoas como você!</Label>
            </Column>

            <Row style={{  padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32,  justifyContent: 'center', alignItems: 'center',   }}>
                  <ButtonOut style={{ paddingHorizontal: 24, borderColor: color.primary, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, }}>Fazer doação</Label>
                  </ButtonOut>
                  <Column style={{width: 24, }} />
                  <ButtonOut style={{ paddingHorizontal: 24, borderColor: "#111", }}>
                    <Label style={{ color: "#111", fontFamily: font.bold, }}>Exportar recibo</Label>
                  </ButtonOut>
                </Row>
            </Scroll>
        </Main>
    )
}


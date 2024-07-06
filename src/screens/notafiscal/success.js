import React, { useContext, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonOut, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native';


import SucessAnim from '@anim/sucess';

export default function NotafiscalSuccessScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const status = route.params?.status;
    return (
        <Main style={{ backgroundColor: "#fff", paddingTop: 15,  }}>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#ffffff80", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                <SucessAnim />
                <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>{status}</Title>
                <Label style={{ textAlign: 'center', }}>Desfrute de serviços em estabelecimentos parceiros acumulando mais pontos!</Label>

            </Column>

            <Column style={{ padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', alignItems: 'center', }}>
                <ButtonPR onPress={() => {navigation.navigate('NotafiscalSend', {type: 'clean'})}}  style={{ paddingHorizontal: 24, borderColor: color.primary, }}>
                    <LabelPR style={{  fontFamily: font.bold, }}>Nova nota fiscal</LabelPR>
                </ButtonPR>
                <Column style={{ height: 12, }} />
                <ButtonOut onPress={() => {navigation.navigate('Extract', {type: 'Notas fiscais'})}} style={{ paddingHorizontal: 24, borderColor: color.secundary, }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Ver minhas notas</Label>
                </ButtonOut>
            </Column>

        </Main>
    )
}


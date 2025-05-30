import React, { useContext, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonOut, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native';
import SucessAnim from '@anim/sucess';

import { excludeAllNotas } from '../hook';

export default function NotafiscalSuccessAnonimoScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const status = route.params?.status;

    const clearNotas = async () => {
        try {
            await excludeAllNotas();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        clearNotas();
    }, [])
    return (
        <Main style={{ backgroundColor: "#fff",}}>
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.secundary, width: 46, height: 34, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color="#fff" />
                    </Button>
                    <Column >
                    </Column>
                    <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                    </Column>
                </Row>

                <Column style={{ marginHorizontal: margin.h,  justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    <SucessAnim />
                    <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>{status}</Title>
                    <Label style={{ textAlign: 'center', }}>Desfrute de serviços em estabelecimentos parceiros acumulando mais pontos!</Label>

                </Column>

                <Column style={{ padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', alignItems: 'center', }}>
                    <ButtonPR onPress={() => { navigation.navigate('NotafiscalSendAnonimo', { type: 'clean' }) }} style={{ paddingHorizontal: 24, borderColor: color.primary, }}>
                        <LabelPR style={{ fontFamily: font.bold, }}>Nova nota fiscal</LabelPR>
                    </ButtonPR>
                </Column>
            </Scroll>

        </Main>
    )
}


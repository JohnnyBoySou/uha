import React, { useContext, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, LabelPR, Button, ButtonOut, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft } from 'lucide-react-native';

import SucessAnim from '@anim/sucess';

export default function QuestionsSuccessScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
   
    return (
        <Main style={{ backgroundColor: "#fff", }}>
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
                    <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>Seu registro foi {'\n'}salvo com sucesso!</Title>
                    <Label style={{ textAlign: 'center', }}>Responderemos em breve via e-mail.</Label>

                </Column>

                <Column style={{ padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', alignItems: 'center', }}>
                    <ButtonPR onPress={() => { navigation.navigate('Questions') }} style={{ paddingHorizontal: 24, borderColor: color.primary, }}>
                        <LabelPR style={{ fontFamily: font.bold, }}>Novo registro</LabelPR>
                    </ButtonPR>
                    <Column style={{ height: 12, }} />
                    <ButtonOut onPress={() => { navigation.navigate('Tabs', { screen: 'Home'}) }} style={{ paddingHorizontal: 24, paddingVertical: 12, borderColor: color.secundary, }}>
                        <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Voltar para o início</Label>
                    </ButtonOut>
                </Column>
            </Scroll>
        </Main>
    )
}


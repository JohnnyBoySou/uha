import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Column, Row, Title, Label,  ButtonPR, ButtonSE, LabelSE, ButtonLI, LabelLI, LineL } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus } from 'lucide-react-native';

export default function OnboardingScreen({ navigation, }){
    const { color, font, margin } = useContext(ThemeContext);
    return (
    <Main>
        <Column style={{ flex:1, }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center',  height: '60%', }}>
                <ImagePlus color={color.secundary} size={52}/>
            </Column>

            <Column style={{ paddingHorizontal: margin.h, width: '100%', position: 'absolute', bottom: 0,  backgroundColor: color.primary, paddingBottom: 50, borderTopLeftRadius: 32, borderTopRightRadius: 32, }}>
                <Column style={{ width: 70, height: 8, backgroundColor: color.light+40, marginTop: 12, marginBottom: 30,  borderRadius: 50, alignSelf: 'center',}} />
                <Title style={{ color: color.secundary, fontFamily: font.bold, fontSize: 52, lineHeight: 56, }}>Olá!</Title>
                <LineL style={{ marginVertical: 12, }} />
                <Label style={{ color: color.secundary+99, fontFamily: font.medium,  }}>Seja bem-vindo! Está pronto para começar? Escolha entre entrar ou se cadastrar para avançar para os próximos passos</Label>

                <ButtonSE onPress={() => {navigation.navigate('Login')}}  style={{ marginTop:24, }} rippleColor="#fff">
                    <LabelSE>ENTRAR</LabelSE>
                </ButtonSE>
                <ButtonLI style={{  marginTop: 12, }} rippleColor={color.primary}>
                    <LabelLI style={{   }}>REGISTRAR</LabelLI>
                </ButtonLI>
            </Column>
        </Column>
    </Main>
    )
    }
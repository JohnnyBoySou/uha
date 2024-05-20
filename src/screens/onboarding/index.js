import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Column, Row, Title, Label,  ButtonPR, ButtonSE, LabelSE, ButtonLI, LabelLI, LineL } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus } from 'lucide-react-native';

export default function OnboardingScreen({ navigation, }){
    const { color, font, margin } = useContext(ThemeContext);
    return (
    <Main>
    
        <Column>
            <ImagePlus />
        </Column>

        <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.primary, }}>
            <Title style={{ color: color.secundary, fontFamily: font.bold, fontSize: 52, }}>Olá!</Title>
            <Label style={{ color: color.secundary+99, fontFamily: font.medium,  }}>Seja bem-vindo! Está pronto para começar? Escolha entre entrar ou se cadastrar para avançar para os próximos passos</Label>

            <ButtonSE style={{ marginTop:24, }} rippleColor="#fff">
                <LabelSE>ENTRAR</LabelSE>
            </ButtonSE>
            <ButtonLI style={{  marginTop: 12, }} rippleColor={color.primary}>
                <LabelLI style={{   }}>REGISTRAR</LabelLI>
            </ButtonLI>
        </Column>

    </Main>
    )
    }
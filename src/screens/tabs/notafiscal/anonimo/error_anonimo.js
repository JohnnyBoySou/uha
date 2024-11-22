import React, { useContext,useEffect } from 'react';
import { Main, Column, Label, Title, Row, Button, ButtonOut, Scroll } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info } from 'lucide-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';

import { excludeAllNotas } from '../hook';

export default function NotafiscalErrorAnonimoScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const status = route.params?.status
    
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
        <Main style={{ backgroundColor: "#fff", justifyContent: 'center',  }}>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.secundary, width: 42, height: 28, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <ArrowLeft color="#fff" />
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                    <Info color={color.secundary} size={32} />
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                <MotiView delay={300} from={{ opacity: 0, rotate: '90deg', scale: 0 }} animate={{ opacity: 1, rotate: '0deg', scale: 1, }}>
                    <MaterialCommunityIcons name="close-circle" size={100} color={color.red} />
                </MotiView>
                <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>{status}</Title>
                <Label style={{ textAlign: 'center', color: color.secundary+99, }}>Verifique sua nota fiscal</Label>
                <ButtonOut onPress={() => { navigation.navigate('NotafiscalSendAnonimo') }} style={{ paddingHorizontal: 24, borderColor: color.secundary, marginTop: 32, }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Tentar novamente</Label>
                </ButtonOut>
            </Column>

        </Main>
    )
}


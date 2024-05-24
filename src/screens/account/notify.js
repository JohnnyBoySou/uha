import React, { useContext, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import Check from '@components/check';

import { MotiView, AnimatePresence } from 'moti';
import { ActivityIndicator } from 'react-native-paper';

export default function AccountNotifyScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    
    const [promocionais, setpromocionais] = useState(true);
    
    return (
        <Main style={{ marginTop: -10, }}>
                <Header title='Notificações' />
                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Title style={{ marginTop: 20, }}>Escolha quais deseja receber</Title>
                    <Row style={{ marginVertical: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Column style={{ width: 300, }}>
                            <Title style={{ fontSize: 20, }}>Promocionais</Title>
                            <Label style={{ fontSize: 16, }}>Receba descontos, alertas de novas campanhas e encerramentos</Label>
                        </Column>
                        <Button onPress={() => {setpromocionais(!promocionais)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                            <Check status={promocionais}/>
                        </Button>
                    </Row>
                </Column>
        </Main>
    )
}

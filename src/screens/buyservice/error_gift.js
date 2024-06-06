import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI , ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function BuyServiceGiftCardErrorScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
   
    return (
        <Main style={{ backgroundColor: color.red+20, paddingTop: 30,}}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: margin.h, }}>
                <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: "#ffffff80", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                    <ArrowLeft color={color.secundary}/>
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center',  }}>
                    <Info color="#111" size={32}/>
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                <MaterialCommunityIcons name="close-circle" size={100} color={color.red} />
                <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>Ops... Ocorreu um {'\n'}erro na transação</Title>
                <Label style={{ textAlign: 'center',   }}>Verifique se sua conexão com {'\n'}a internet está estável</Label>
                <ButtonOut onPress={() => {navigation.goBack()}}  style={{ paddingHorizontal: 24, borderColor: "#111", marginTop: 32, }}>
                    <Label style={{ color: "#111", fontFamily: font.bold, }}>Tentar novamente</Label>
                </ButtonOut>

            </Column>

           
        </Main>
    )
}


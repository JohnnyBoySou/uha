import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI , ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';
import  Header   from '@components/header';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function BuyServiceSuccessHideScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
   
    return (
        <Main style={{ backgroundColor: "#fff", }}>
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
                <MaterialIcons name="check-circle" size={100} color={color.green} />
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
        </Main>
    )
}


import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, ButtonOut, ButtonLI, LineL, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';
import { MotiImage } from 'moti';

export default function ShareScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);


    return (
        <Main >
            <Scroll style={{ paddingBottom: 30,  }}>
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Label>Campanha</Label>
                    <Title>Indique e ganhe</Title>
                   
                </Column>         
                <Row style={{ marginVertical: 20, marginLeft: 28, }}>
                        <Column style={{ marginRight: 18, }}>
                            <Column style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: "#fff", }}></Column>
                            <Column style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: color.primary, marginTop: 10, }}></Column>
                        </Column>
                        <Column style={{ width: 180, borderRadius: 12, backgroundColor: color.secundary, }}></Column>
                        <Column style={{ width: 150, marginLeft: 18, flex: 1, borderRadius: 12, backgroundColor: "#EFBBE0", }}></Column>
                    </Row>   

                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title  style={{ marginTop: 24, marginBottom: 8, }}>Conheça a campanha</Title>
                    <Label style={{ fontSize: 16, }}>A cada 5 amigos que se cadastrarem e doarem  você recebe 50 Pontos e seu amigo 30 para usar no serviço ou produto que quiser </Label>

                    <Title style={{ marginTop: 24, marginBottom: 8, }}>Como participar</Title>
                    <Label style={{ fontSize: 16, }}>Envie o link abaixo para 5 amigos ou mais, eles baixam o aplicativo, utilizam seu código pessoal  no cadastro e realizam uma doação, assim que a doação for confirmada você recebe 50 Pontos e seu amigo 30 Pontos bônus acrescentadas ao valor da doação!</Label>

                    <Title style={{ marginTop: 24, marginBottom: 8, }}>Link de indicação</Title>
                    <Label style={{ paddingVertical: 12, marginBottom: 18, marginTop: 12, paddingHorizontal: 24, borderWidth: 2, borderColor: '#000', borderStyle: 'dashed', color: '#000', fontFamily: font.bold, borderRadius: 12, textAlign: 'center', }}>institutocarameloappnotafiscal...</Label>
                    
                    <Row style={{ marginVertical: 12, }}>
                        <Title>Código pessoal: 0086AFH989</Title>
                    </Row>

                    <Column style={{ backgroundColor: color.secundary, paddingHorizontal: 24, paddingVertical: 24, borderRadius: 24, marginVertical: 12, }}>
                        <Label style={{ color: color.background, fontSize: 14, }}>Suas Pontos recebidas na campanha</Label>
                        <Title style={{ color: color.background, marginTop: 12, }}>500</Title>
                        <LineL style={{ marginVertical: 12, height: 4, }}/>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Label style={{ color: color.background, fontSize: 14,}}>Pontos que seus amigos receberam</Label>
                            <Title style={{ color: color.background, }}>300</Title>
                        </Row>
                    </Column>


                    <Row style={{marginVertical: 12, justifyContent: 'center', alignItems: 'center',     }}>
                        <ButtonLI style={{ paddingHorizontal: 24, }} onPress={() => {navigation.navigate('BuyServiceSuccess')}} >
                            <LabelLI>Central de ajuda</LabelLI>
                        </ButtonLI>
                        <Column style={{width: 24, }} />
                        <ButtonOut onPress={() => {navigation.navigate('BuyServiceError')}} style={{ borderColor: color.primary, }}>
                            <LabelLI style={{ color: color.primary, }}>Termos e regras</LabelLI>
                        </ButtonOut>
                    </Row>

                    <Title style={{ marginTop: 14, fontSize: 18, marginBottom: 8, textAlign: 'center', }}>Você também pode nos encontrar em</Title>

                </Column>
            </Scroll>
        </Main>
    )
}

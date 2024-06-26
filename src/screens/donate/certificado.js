import React, { useContext } from 'react';
import { Column, Label, Title, Row, SubLabel, Button, LabelLI, ButtonOut, U, ButtonPR, Main, Scroll } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Clipboard as Clip, CircleDashed,   } from 'lucide-react-native';
import { MotiImage } from 'moti';
import * as Clipboard from 'expo-clipboard';
import Header from '@components/header';

export default function DonateCertificadoScreen({ navigation, route }) {
        const { color, font, margin } = useContext(ThemeContext);
        const item = { codigo: '0987643212345678909876543212345678900987654321', value: 100, vencimento: '10/10/2024', email: 'user@mail.com', points: 420, }
        const copyToClipboard = async () => {
            await Clipboard.setStringAsync(item.codigo);
        };


        return(
            <Main style={{ backgroundColor: '#fff', }}>
                <Scroll  >
                <Header title="Certificado" rose />
                <Column style={{ marginHorizontal: margin.h, }}>

                    <Column style={{ marginTop: 20,  }}>
                        <Title style={{ marginBottom: 12, fontSize: 20, }}>CERTIFICADO DE DOAÇÃO GERADO</Title>
                        <Label>Uma cópia foi enviada para:</Label>
                        <Label><U>{item?.email}</U></Label>
                        <SubLabel style={{ marginTop: 12, }}>Valor a receber em pontos: {item?.points}</SubLabel>
                    </Column>
                
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12, }}>

                        <Column  style={{ borderStyle: 'solid', borderWidth: 2, borderColor: color.secundary, borderRadius: 12, flexGrow: 1, paddingHorizontal: 20, paddingVertical: 12, }}>
                            <Label style={{ fontSize: 16, textAlign: 'center', }}>Valor</Label>
                            <Title style={{ fontSize: 20, textAlign: 'center', }}>R$ {item?.value},00 </Title>
                        </Column>
                        <Column style={{width: 12, }} />
                        <Column  style={{ borderStyle: 'solid', borderWidth: 2,  borderColor: color.secundary, borderRadius: 12, flexGrow: 1, paddingHorizontal: 20, paddingVertical: 12, }}>
                            <Label style={{ fontSize: 16, textAlign: 'center', }}>Data de doação</Label>
                            <Title style={{ fontSize: 20, textAlign: 'center', }}>{item?.vencimento}</Title>
                        </Column>

                    </Row>
                   
                    <ButtonPR style={{ paddingHorizontal: 24, marginTop: 40, }}  onPress={() => {navigation.navigate('BuyServiceSuccess')}} >
                            <LabelLI style={{ color: '#fff', }}>Exportar certificado em PDF</LabelLI> 
                    </ButtonPR>

                    <Row style={{ padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center',     }}>
                        <ButtonOut style={{ borderColor: color.primary, }} onPress={() => {navigation.navigate('Donate')}} >
                            <LabelLI style={{ color: color.primary,  }}>Fazer doação</LabelLI>
                        </ButtonOut>
                        <Column style={{width: 24, }} />
                        <ButtonOut style={{ borderColor:"#111", }} onPress={() => {navigation.navigate('Recibo')}} >
                            <LabelLI style={{ color: "#111",  }}>Exportar recibo</LabelLI>
                        </ButtonOut>
                    </Row>

                    </Column>
                </Scroll>
            </Main>
            )
        }

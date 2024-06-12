import React, { useContext } from 'react';
import { Column, Label, Title, Row, SubLabel, Button, LabelLI, ButtonOut, U, ButtonPR, Main, Scroll } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Clipboard as Clip, CircleDashed,   } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { MotiImage } from 'moti';
import Header from '@components/header';

export default function PayBoletoScreen({ navigation, route }) {
        const { color, font, margin } = useContext(ThemeContext);
        const item = { codigo: '0987643212345678909876543212345678900987654321', value: 100, vencimento: '10/10/2024', email: 'user@mail.com', points: 420, }
        const copyToClipboard = async () => {
            await Clipboard.setStringAsync(item.codigo);
        };


        return(
            <Main>
                <Scroll style={{ paddingTop: 20, }}>
                <Header title="Pagar boleto"  />
                <Column style={{ marginHorizontal: margin.h, }}>

                    <Column style={{ marginTop: 20,  }}>
                        <Title style={{ marginBottom: 12, }}>BOLETO GERADO</Title>
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
                            <Label style={{ fontSize: 16, textAlign: 'center', }}>Vencimento</Label>
                            <Title style={{ fontSize: 20, textAlign: 'center', }}>{item?.vencimento}</Title>
                        </Column>

                    </Row>
                    <Button onPress={copyToClipboard} style={{ borderStyle: 'dashed',  borderWidth: 2, borderColor: color.secundary, borderRadius: 12, flexGrow: 1, paddingHorizontal: 30, }}>
                        <Column style={{ padding: 6, }}>
                            <Label style={{ textAlign: 'center', color: "#111", marginTop: 12, }}>Código de pagamento</Label>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Title style={{ paddingTop: 14, paddingBottom: 10, textAlign: 'center', fontSize: 18, lineHeight: 18, }}>{item?.codigo}</Title>
                                <Clip size={16} color="#000" style={{ marginLeft: 12, }} />
                            </Row>
                        </Column>
                    </Button>
                    <ButtonPR style={{ paddingHorizontal: 24, marginTop: 40, }}  onPress={() => {navigation.navigate('BuyServiceSuccess')}} >
                            <LabelLI style={{ color: '#fff', }}>Exportar boleto em PDF</LabelLI> 
                    </ButtonPR>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10,  marginBottom: 30, }}>
                        <Title style={{ marginRight: 6, fontSize: 18, }}>Status: pagamento pendente</Title>   
                        <CircleDashed color={color.primary} size={24} />
                    </Row>

                    <Title style={{ fontSize: 18,}}>Formas para pagar seu boleto</Title>
                    <Column style={{  marginTop: 12, }}>
                        <Row style={{  alignItems: 'center', width: 270,  }}>
                            <MotiImage  style={{ width: 64, height: 64, backgroundColor: '#fff', borderRadius: 12, }} />
                            <Label style={{ marginLeft: 12, fontSize: 14, flexGrow: 1,}}>No aplicativo de seu banco utilize o código de pagamento descrito abaixo do código de barras</Label>
                        </Row>
                        <Row style={{ marginVertical: 12, width: 270,  alignItems: 'center',}}>
                            <MotiImage  style={{ width: 64, height: 64, backgroundColor: '#fff', borderRadius: 12, }} />
                            <Label style={{ marginLeft: 12, fontSize: 14,}}>Exporte seu boleto, escaneie o código de barras ou abra o PDF no aplicativo do banco.</Label>
                        </Row>
                        <Row style={{  alignItems: 'center', width: 270, }}>
                            <MotiImage  style={{ width: 64, height: 64, backgroundColor: '#fff', borderRadius: 12, }} />
                            <Label style={{ marginLeft: 12, fontSize: 14,}}>Imprima seu boleto e pague em uma casa lotérica, banco ou caixa eletrônico.</Label>
                        </Row>
                    
                    </Column>

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

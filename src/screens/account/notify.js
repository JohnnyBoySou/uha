import React, { useContext, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import Check from '@components/check';

import { MotiView, AnimatePresence } from 'moti';
import { ActivityIndicator } from 'react-native-paper';

export default function AccountNotifyScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    
    const [promocionais, setpromocionais] = useState(true);
    const [alertas, setalertas] = useState(false);
    const [aplicativo, setaplicativo] = useState();
    const [email, setemail] = useState();
    const [sms, setsms] = useState();
    const [whatsapp, setwhatsapp] = useState();

    return (
        <Main style={{ backgroundColor: '#fff', }}>
                <Scroll style={{ paddingTop: 20, }}>
                    <Header title='Notificações' />
                    <Column style={{ paddingHorizontal: margin.h, }}>
                        <Title style={{ marginTop: 30, marginBottom: 30, fontSize: 22,}}>Escolha quais deseja receber</Title>
                        <Row style={{ marginBottom: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column style={{ width: 250, }}>
                                <Title style={{ fontSize: 18, }}>Promocionais</Title>
                                <Label style={{ fontSize: 14, color: color.secundary+99, }}>Receba descontos, alertas de novas campanhas e encerramentos</Label>
                            </Column>
                            <Button onPress={() => {setpromocionais(!promocionais)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                                <Check status={promocionais}/>
                            </Button>
                        </Row>

                        <Row style={{ marginBottom: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column style={{ width: 250, }}>
                                <Title style={{ fontSize: 18, }}>Alertas</Title>
                                <Label style={{ fontSize: 14, color: color.secundary+99,}}>Receba alertas exclusivos de ofertas relâmpago e campanhas promocionais</Label>
                            </Column>
                            <Button onPress={() => {setalertas(!alertas)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                                <Check status={alertas}/>
                            </Button>
                        </Row>

                        <Row style={{ marginBottom: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column style={{ width: 250, }}>
                                <Title style={{ fontSize: 18, }}>Aplicativo</Title>
                                <Label style={{ fontSize: 14, color: color.secundary+99,}}>Receba as notificações do aplicativo e fique por dentro de cada processo</Label>
                            </Column>
                            <Button onPress={() => {setaplicativo(!aplicativo)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                                <Check status={aplicativo}/>
                            </Button>
                        </Row>

                        <Row style={{ marginBottom: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column style={{ width: 250, }}>
                                <Title style={{ fontSize: 18, }}>E-mail</Title>
                                <Label style={{ fontSize: 14, color: color.secundary+99,}}>Receba nossos e-mails promocionais e novidades em primeira mão</Label>
                            </Column>
                            <Button onPress={() => {setemail(!email)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                                <Check status={email}/>
                            </Button>
                        </Row>
                    
                        <Row style={{ marginBottom: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column style={{ width: 250, }}>
                                <Title style={{ fontSize: 18, }}>SMS</Title>
                                <Label style={{ fontSize: 14, color: color.secundary+99, }}>Receba atualizações, promoções e novidades em seu SMS</Label>
                            </Column>
                            <Button onPress={() => {setsms(!sms)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                                <Check status={sms}/>
                            </Button>
                        </Row>

                        <Row style={{ marginBottom: 20,  justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column style={{ width: 250, }}>
                                <Title style={{ fontSize: 18, }}>WhatsApp</Title>
                                <Label style={{ fontSize: 14, color: color.secundary+99, }}>Receba atualizações, promoções e novidades em seu WhatsApp</Label>
                            </Column>
                            <Button onPress={() => {setwhatsapp(!whatsapp)}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                                <Check status={whatsapp}/>
                            </Button>
                        </Row>


                        <Label style={{ backgroundColor: color.primary+20, marginVertical: 20, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, textAlign: 'center', color: color.primary, fontSize: 18, }}>
                        As alterações podem levar alguns minutos para serem processadas.
                        </Label>
                    </Column>
                </Scroll>

        </Main>
    )
}

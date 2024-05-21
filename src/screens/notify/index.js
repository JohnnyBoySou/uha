import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';

import { ArrowLeft, ArrowRight, TriangleAlert, Mail, ArrowLeftRight, X } from 'lucide-react-native';
import { Moti, MotiView, AnimatePresence } from 'moti';

export default function NotifyScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(null);
    return (
        <Main>
            <Header title='Notificações' />

                <Row style={{ paddingHorizontal: margin.h, }}>
                <AnimatePresence>
                    {type != null && <MotiView transition={{duration: 400,}} from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0}} exit={{opacity: 0, translateY: 20,}}><Button onPress={() => {settype(null)}} rippleColor={color.secundary}  style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#F6E9C5", marginTop: 12,  borderRadius: 100,}} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <Title style={{ color: color.primary, fontSize: 18, }}>{type}</Title>
                                <X color={color.primary}/>
                            </Row>
                        </Button></MotiView>}
                </AnimatePresence>
                </Row>
                <AnimatePresence>
            {type == null && <MotiView  from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0}} exit={{opacity: 0, translateY: 20,}}><Column style={{ marginHorizontal: margin.h, marginVertical: 24, }}>
                <Button onPress={() => {settype('Alertas')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ backgroundColor: color.primary,padding: 18, borderRadius: 12,  marginRight: 20,}}>
                                <TriangleAlert color="#fff" size={38}/>
                            </Column>
                            <Column>
                                <Title style={{ fontSize: 20, }}>Alertas</Title>
                                <Label style={{ fontSize: 16, }}>Fique de olho em alterações</Label>
                            </Column>
                        </Row>
                        <ArrowRight size={24} color={color.title} />
                    </Row>
                </Button>
                <Button onPress={() => {settype('Mensagens')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ backgroundColor: color.secundary,padding: 18, borderRadius: 12, marginRight: 20, }}>
                                <Mail  color={color.primary} size={38}/>
                            </Column>
                            <Column>
                                <Title style={{ fontSize: 20, }}>Mensagens</Title>  
                                <Label style={{ fontSize: 16, }}>Todas as novidades estão aqui</Label>
                            </Column>
                        </Row>

                        <ArrowRight size={24} color={color.title} />
                    </Row>
                </Button>
                <Button onPress={() => {settype('Movimentações')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ backgroundColor: "#F6E9C5",padding: 18, borderRadius: 12, marginRight: 20, }}>
                                <ArrowLeftRight color={color.secundary} size={38}/>
                            </Column>
                            <Column>
                                <Title style={{ fontSize: 20, }}>Movimentações</Title>
                                <Label style={{ fontSize: 16, }}>Acompanhe suas transações</Label>
                            </Column>
                        </Row>

                        <ArrowRight size={24} color={color.title} />
                    </Row>
                </Button>
            </Column></MotiView>}
            </AnimatePresence>

        </Main>
    )
}

const Card = ({ item }) => {
    return (
        <Row>
            <Column></Column>
            <Column></Column>
        </Row>
    )
}
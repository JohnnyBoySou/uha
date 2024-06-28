import React, { useContext } from 'react';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleAlert } from 'lucide-react-native';
import { MotiImage, MotiView } from 'moti';
import Header from '@components/header';
import raspadinha_single from '@data/raspadinhas/raspadinha_single';


export default function RaspadinhasSingleScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);

    const item = raspadinha_single[0]
    const value_raspadinha = item.type === 'Básica' ? 5 : item.type === 'Pro' ? 10 : item.type === 'Premium' ? 15 : 0

    const Ball = () => { return (<Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.primary, }} />) }
    const Line = () => { return (<Column style={{ width: 24, height: 8, borderRadius: 100, backgroundColor: color.primary, }} />) }
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header rose title="Seu pedido" />

                <MotiView from={{opacity:0, translateY: 40}} animate={{opacity:1, translateY: 0}} transition={{type: 'timing', duration: 500}} style={{ backgroundColor: "#f7f7f7", flexDirection: 'row', borderRadius: 12, marginHorizontal: margin.h, padding: 20, marginTop: 24, marginBottom: 20, }}>
                    <Column style={{ width: 80, }}>
                        <Label style={{ fontSize: 12, lineHeight: 14, }}>Valor</Label>
                        <Column style={{ width: 36, height: 36, marginTop: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFBBE0', }}>
                            <Title style={{ fontSize: 8, lineHeight: 8, }}>R$</Title>
                            <Title style={{ fontSize: 10, lineHeight: 10, }}>{value_raspadinha},00</Title>
                        </Column>
                    </Column>
                    <Column style={{ width: 120, justifyContent: 'center',  }}>
                        <Label style={{ fontSize: 12, lineHeight: 14, }}>Tipo de cartela</Label>

                        <Title style={{ fontSize: 14, lineHeight: 14, marginTop: 14, }}>{item.value} | {item?.type}</Title>
                        <Label style={{ fontSize: 12, lineHeight: 12, marginTop: 2, }}>{item.finish} tentativas</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', }}>
                        <Label style={{ fontSize: 12, lineHeight: 14, }}>Status</Label>
                        <Title style={{ fontSize: 16, lineHeight: 18, marginTop: 14, color: color.primary, }}>{item?.status}</Title>
                    </Column>
                </MotiView>

                <MotiView from={{opacity:0, translateY: 40}} animate={{opacity:1, translateY: 0}} transition={{type: 'timing', duration: 500}} style={{ marginHorizontal: margin.h, backgroundColor: color.primary, borderRadius: 24, }}>
                    <Row style={{ marginBottom: -13, justifyContent: 'center', alignItems: 'center', marginTop: 30, zIndex: 9, }}>
                        <Ball />
                    </Row>
                    <Column style={{ backgroundColor: '#fff', marginHorizontal: 30, borderRadius: 12, paddingVertical: 28, paddingHorizontal: 20, }}>
                        <Title>Seu pedido</Title>
                        <Row style={{ alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
                            <SubLabel>Número: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.id}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Data: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.date}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Valor: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>R$ {item?.name},00</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: -40, marginVertical: 12, }}>
                            <Ball />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Ball />
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Cliente: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.user?.name}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>CPF: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.user?.cpf}</Label>
                        </Row>
                    </Column>

                    <Row style={{ marginTop: -10, zIndex: 2, marginBottom: 30, marginHorizontal: margin.h + 16, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                    </Row>
                </MotiView>

                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ marginVertical: 12, marginTop: 24, fontSize: 22, }}>Prêmios possíveis</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                        {item?.prizes?.map((prize) => <Column key={prize.id} style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ backgroundColor: "#FFE0F6", justifyContent: 'center', alignItems: 'center', borderRadius: 12, }}>
                                <MotiImage source={{ uri: prize?.img }} style={{ width: 64, height: 64, borderRadius: 6, }} />
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop: 6, }}>{prize.name.length > 12 ? prize?.name.slice(0, 10) + '...' : prize?.name}</SubLabel>
                        </Column>)}
                    </Row>

                    <ButtonPR style={{ marginTop: 30, }} onPress={() => { navigation.navigate('RaspadinhasRaspar', { id: item.id, }) }} >
                        <LabelPR style={{}}>Abrir ({item.value - item.finish})</LabelPR>
                    </ButtonPR>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, }}>
                        <CircleAlert color={color.label + 90} size={18} />
                        <Label style={{ fontSize: 14, textAlign: 'center', marginLeft: 4, }}>Você tem {item.value - item.finish} raspadinhas para abrir.</Label>
                    </Row>

                </Column>

                <Column style={{ height: 100, }} />
            </Scroll>
        </Main>
    )
}


import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleAlert, Clock, X } from 'lucide-react-native';
import { MotiImage, MotiView } from 'moti';
import Header from '@components/header';
import raspadinha_single from '@data/raspadinhas/raspadinha_single';
import { getRaspadinhaSingle } from '@api/request/raspadinha';


export default function RaspadinhasSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);

    const [item, setitem] = useState(raspadinha_single[0]);
    const id = route.params.id ? route.params.id : 'ras-1';
    const type = route.params?.type
    const value_raspadinha = type === 'Básica' ? 5 : type === 'Pro' ? 9 : type === 'Premium' ? 13 : type === 'Plus' ? 17 : 0

    useEffect(() => {
        const fetchData = () => {
            getRaspadinhaSingle(id).then(res => {
                setitem(res)
            })
        }
        fetchData()
    }, [])





    const Ball = () => { return (<Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.primary, }} />) }
    const Line = () => { return (<Column style={{ width: 24, height: 8, borderRadius: 100, backgroundColor: color.primary, }} />) }
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header rose title="Seu pedido" />

                <MotiView from={{ opacity: 0, translateY: 40 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 500 }} style={{ backgroundColor: "#f7f7f7", flexDirection: 'row', borderRadius: 12, marginHorizontal: margin.h, padding: 20, marginTop: 24, marginBottom: 20, }}>
                    <Column style={{ width: 80, }}>
                        <Label style={{ fontSize: 12, lineHeight: 14, }}>Valor</Label>
                        <Column style={{ width: 36, height: 36, marginTop: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFBBE0', }}>
                            <Title style={{ fontSize: 8, lineHeight: 8, }}>R$</Title>
                            <Title style={{ fontSize: 10, lineHeight: 10, }}>{value_raspadinha},00</Title>
                        </Column>
                    </Column>

                    <Column style={{ width: 120, justifyContent: 'center', }}>
                        <Label style={{ fontSize: 12, lineHeight: 14, }}>Tipo de cartela</Label>

                        <Title style={{ fontSize: 14, lineHeight: 14, marginTop: 14, }}>{item.value} | {item?.type}</Title>
                        <Label style={{ fontSize: 12, lineHeight: 12, marginTop: 2, }}>{item.finish} tentativas</Label>
                    </Column>

                    <Column style={{ justifyContent: 'center', }}>
                        <Label style={{ fontSize: 12, lineHeight: 14, }}>Status</Label>
                        <Title style={{ fontSize: 16, lineHeight: 18, marginTop: 14, color: color.primary, }}>{item?.status}</Title>
                    </Column>
                </MotiView>

                <MotiView from={{ opacity: 0, translateY: 40 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 500 }} style={{ marginHorizontal: margin.h, backgroundColor: color.primary, borderRadius: 24, }}>
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



                <MotiView from={{ opacity: 0, translateY: 40 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 500 }} delay={300}><>
                {item?.status == 'Disponível' && <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ marginVertical: 12, marginTop: 24, fontSize: 22, }}>Prêmios possíveis</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                        {item?.prizes?.map((prize) => <Column key={prize.id} style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ backgroundColor: "#FFE0F6", justifyContent: 'center', alignItems: 'center', borderRadius: 12, }}>
                                <MotiImage source={{ uri: prize?.img }} style={{ width: 64, height: 64, borderRadius: 6, }} />
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop: 6, }}>{prize.name.length > 12 ? prize?.name.slice(0, 10) + '...' : prize?.name}</SubLabel>
                        </Column>)}
                    </Row>

                    <ButtonPR style={{ marginTop: 30, }} onPress={() => { navigation.navigate('RaspadinhasRaspar', { id: item.id, type: item.type}) }} >
                        <LabelPR style={{}}>Abrir ({item.value - item.finish})</LabelPR>
                    </ButtonPR>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, }}>
                        <CircleAlert color={color.label + 90} size={18} />
                        <Label style={{ fontSize: 14, textAlign: 'center', marginLeft: 4, }}>Você tem {item.value - item.finish} raspadinhas para abrir.</Label>
                    </Row>

                </Column>}

                {item?.status == 'Já utilizada' && <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, marginVertical: 40, borderWidth: 1, borderColor: color.off, borderRadius: 16, padding: 12, paddingVertical: 20, }}>
                        <Column style={{ width: 64, height: 64, borderRadius: 100, backgroundColor: color.red + 20, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={32} color={color?.red} />
                        </Column>
                        <Title style={{ marginTop: 12, textAlign: 'center', fontSize: 20, lineHeight: 22, }}>Não foi dessa vez</Title>
                        <Label style={{ textAlign: 'center', fontSize: 15, lineHeight: 16, marginTop: 6, marginBottom: 12, color: color.secundary + 99, marginHorizontal: 40, }}>Mas você pode tentar de novo! Compre mais raspadinhas para ter mais chances de ganhar.</Label>
                        <ButtonPR onPress={() => { navigation.navigate('Raspadinhas') }} >
                            <LabelPR>Raspadinhas</LabelPR>
                        </ButtonPR>
                </Column>}

                {item?.status == 'Em espera' && <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40, marginHorizontal: margin.h, borderWidth: 1, borderColor: color.off, borderRadius: 16, padding: 12, paddingVertical: 20, }}>
                    <Column style={{ width: 64, height: 64, borderRadius: 100, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                        <Clock size={24} color={color?.primary} />
                    </Column>
                    <Title style={{ marginTop: 12, textAlign: 'center', fontSize: 20, lineHeight: 22, }}>Aguardando o pagamento</Title>
                    <Label style={{ textAlign: 'center', fontSize: 15, lineHeight: 16, marginTop: 6, marginBottom: 12, color: color.secundary + 99, marginHorizontal: 30, }}>Estamos aguardando o pagamento para essa raspadinha, pague agora mesmo para jogar.</Label>
                    <ButtonPR onPress={() => { navigation.navigate('Raspadinhas') }} >
                        <LabelPR>Pagar</LabelPR>
                    </ButtonPR>
                </Column>}

                {item?.status == 'Expirada' && <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40, marginHorizontal: margin.h, borderWidth: 1, borderColor: color.off, borderRadius: 16, padding: 12, paddingVertical: 20, }}>
                    <Column style={{ width: 64, height: 64, borderRadius: 100, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                        <Clock size={24} color={color?.primary} />
                    </Column>
                    <Title style={{ marginTop: 12, textAlign: 'center', fontSize: 20, lineHeight: 22, }}>Raspadinha expiradas</Title>
                    <Label style={{ textAlign: 'center', fontSize: 15, lineHeight: 16, marginTop: 6, marginBottom: 12, color: color.secundary + 99, marginHorizontal: 30, }}>Essas raspadinhas expiraram, mas você pode comprar outras agora mesmo.</Label>
                    <ButtonPR onPress={() => { navigation.navigate('Raspadinhas') }} >
                        <LabelPR>Raspadinhas</LabelPR>
                    </ButtonPR>
                </Column>}
                </></MotiView>

                <Column style={{ height: 100, }} />
            </Scroll>
        </Main>
    )
}


import React, { useContext, useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { FlatList, ScrollView } from 'react-native';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import { CircleCheck, CircleX, AlarmClock, Info, Trophy, CheckCheck, ShoppingCart, Search } from 'lucide-react-native';
import Feather from '@expo/vector-icons/Feather';
import raspadinhas from '@data/raspadinhas/raspadinhas'
import { MotiView } from 'moti';
import BottomSheet, {  BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RaspadinhasShopScreen from './shop';

export default function RaspadinhasScreen({ navigation, }) {
    const { margin, color, font } = useContext(ThemeContext);

    const shop = useRef()
    const bts = ['Tudo', 'Disponível', 'Em espera', 'Já utilizada', 'Expirada',]
    const [page, setpage] = useState('Tudo');
    
    const data = raspadinhas.filter((item) => item.status === page)

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header rose title='Raspadinhas' />
                <Column style={{ marginVertical: 12, marginHorizontal: margin.h, }}>
                    <Button onPress={() => navigation.navigate('Tabs', { screen: 'Search', })} style={{ borderRadius: 100, backgroundColor: "#30303020", paddingVertical: 10, paddingHorizontal: 20, opacity: 0.6, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Label>Pesquisar</Label>
                            <Search color={color.label} size={18} style={{ marginLeft: 8, }} />
                        </Row>
                    </Button>
                    <Title style={{ fontSize: 22, lineHeight: 22, marginTop: 30, marginBottom: 2, }}>Tipos de cartela</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, }}>
                        <Column style={{ flexGrow: 1, marginRight: 12, }}>
                            <Button style={{ backgroundColor: color.background, flexGrow: 1, borderRadius: 100, marginBottom: 12, }}>
                                <Row style={{ alignItems: 'center', flexGrow: 1, }}>
                                    <Column style={{ width: 45, height: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFBBE0', }}>
                                        <Title style={{ fontSize: 8, lineHeight: 8, }}>R$</Title>
                                        <Title style={{ fontSize: 10, lineHeight: 10, }}>05,00</Title>
                                    </Column>
                                    <Title style={{ fontSize: 18, marginHorizontal: 12, }}>Básica</Title>
                                </Row>
                            </Button>
                            <Button style={{ backgroundColor: color.background, flexGrow: 1, borderRadius: 100, }}>
                                <Row style={{ alignItems: 'center', flexGrow: 1, }}>
                                    <Column style={{ width: 45, height: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}>
                                        <Title style={{ fontSize: 8, lineHeight: 8, color: '#fff', }}>R$</Title>
                                        <Title style={{ fontSize: 10, lineHeight: 10, color: '#fff', }}>13,00</Title>
                                    </Column>
                                    <Title style={{ fontSize: 18, marginHorizontal: 12, }}>Premium</Title>
                                </Row>
                            </Button>
                        </Column>
                        <Column style={{ flexGrow: 2, marginLeft: 12, }}>
                            <Button style={{ backgroundColor: color.background, flexGrow: 1, borderRadius: 100, marginBottom: 12, }}>
                                <Row style={{ alignItems: 'center', flexGrow: 1, }}>
                                    <Column style={{ width: 45, height: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary, }}>
                                        <Title style={{ fontSize: 8, lineHeight: 8, color: '#fff', }}>R$</Title>
                                        <Title style={{ fontSize: 10, lineHeight: 10, color: '#fff', }}>09,00</Title>
                                    </Column>
                                    <Title style={{ fontSize: 18, marginHorizontal: 12, }}>Pro</Title>
                                </Row>
                            </Button>
                            <Button style={{ backgroundColor: color.background, flexGrow: 1, borderRadius: 100, }}>
                                <Row style={{ alignItems: 'center', flexGrow: 1, }}>
                                    <Column style={{ width: 45, height: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: color.blue, }}>
                                        <Title style={{ fontSize: 8, lineHeight: 8, color: '#fff', }}>R$</Title>
                                        <Title style={{ fontSize: 10, lineHeight: 10, color: '#fff', }}>17,00</Title>
                                    </Column>
                                    <Title style={{ fontSize: 18, marginHorizontal: 12, }}>Plus</Title>
                                </Row>
                            </Button>
                        </Column>
                    </Row>
                </Column>
                <Scroll horizontal style={{ paddingTop: 10, paddingHorizontal: margin.h, paddingBottom: 30, }} showsHorizontalScrollIndicator={false}>
                    <Column style={{ width: 140, height: 180, borderRadius: 16, backgroundColor: '#EFBBE0', marginRight: 12, }}></Column>
                    <Column style={{ width: 140, height: 180, borderRadius: 16, backgroundColor: '#FF26BD', marginRight: 12, }}></Column>
                    <Column style={{ width: 140, height: 180, borderRadius: 16, backgroundColor: '#5C0D45', marginRight: 12, }}></Column>
                    <Column style={{ width: 140, height: 180, borderRadius: 16, backgroundColor: '#00A3FF', marginRight: 12, }}></Column>
                    <Column style={{ width: 30, }}></Column>
                </Scroll>

                <Title style={{ fontSize: 22, lineHeight: 22, marginHorizontal: margin.h, }}>Histórico de raspadinhas</Title>
                <ScrollView horizontal style={{ paddingHorizontal: margin.h, marginVertical: 12, }} showsHorizontalScrollIndicator={false}>
                    {bts.map((bt, index) => (
                        <Button key={index} onPress={() => setpage(bt)}
                            style={{  backgroundColor: bt === page ? color.primary : color.primary+20, paddingVertical: 8, borderRadius: 100, marginRight: 10, paddingHorizontal: 12, }}>
                            <Label style={{ color: bt === page ? "#fff" : color.primary, fontFamily: font.bold, fontSize: 16, textAlign: 'center', }}>{bt}</Label>
                        </Button>
                    ))}
                    <Column style={{ width: 60, height: 12, }} />
                </ScrollView>

                <Column style={{ marginHorizontal: 12, }}>
                    <FlatList
                        style={{ marginBottom: 50, }}
                        data={page === 'Tudo' ? raspadinhas : data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CardRaspadinha item={item} />
                        )}
                        keyExtractor={item => item.id}
                    />

                </Column>
                <Column style={{ height: 60, }} />
            </Scroll>
            <MotiView from={{ opacity: 0, scale: .6, }} animate={{ opacity: 1, scale: 1, }} transition={{ type: 'timing' }} exit={{ opacity: 0, scale: .7, }} style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <Button onPress={() => { shop.current.expand() }} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}><ShoppingCart size={26} color="#fff" /></Button>
            </MotiView>
            <BottomSheet snapPoints={[0.5, 600]} index={0} ref={shop} backgroundStyle={{ backgroundColor: "#f7f7f7" }} handleStyle={{ backgroundColor: "#f7f7f7" }} handleIndicatorStyle={{ backgroundColor: "#30303040", width: 60, height: 6, borderRadius: 100, }}>
                <RaspadinhasShopScreen />
            </BottomSheet>
        </Main>
    )
}



const CardRaspadinha = ({ item, index, onLong, type }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.green :
        item?.icon === 'await' ? color.blue :
            item?.icon === 'uncheck' ? color.red :
                item.icon === 'dimiss' ? '#000000' :
                    item?.icon === 'lucky' ? color.primary :
                        item?.icon === 'used' ? color.primary : '#303030'
    const icon = item?.icon === 'check' ? <Feather color={color.green} name='check' size={24} /> :
        item?.icon === 'await' ? <Info color={color.blue} size={24} /> :
            item?.icon === 'uncheck' ? <Feather name='x' size={24} color={color.red} /> :
                item.icon === 'used' ? <CheckCheck size={24} color={color.primary} /> :
                    item.icon === 'dimiss' ? <Feather name='x' size={24} color={'#000000'} /> :

                        <Feather name='loader' color="#000000" size={24} />
    return (
        <Button onLongPress={onLong} onPress={() => { navigation.navigate('RaspadinhasSingle', { id: item.id, type: item.type, }) }} style={{ paddingHorizontal: margin.h, }}>
            <Row style={{ marginBottom: 16, justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ backgroundColor: cl + 20, width: 54, height: 54, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        {icon}
                    </Column>
                    <SubLabel style={{ marginTop: 6, fontSize: 12, fontFamily: 'Font_Medium', }}>{item?.date}</SubLabel>
                </Column>

                <Column style={{ borderRightWidth: 2, borderRightColor: cl + 50, paddingRight: 20, }}>
                    <Title style={{
                        color: cl,
                        fontSize: 24, lineHeight: 24, textAlign: 'right',
                        textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',
                    }}>R$ {item?.name},00</Title>
                    <Label style={{ fontSize: 14, textAlign: 'right', lineHeight: 14, marginVertical: 3, }}>{item?.value} | {item?.type}</Label>
                    <Label style={{ fontSize: 14, textAlign: 'right', lineHeight: 16, color: cl, fontFamily: 'Font_Medium', }}>{item?.status}</Label>
                </Column>
            </Row>
        </Button>
    )
}

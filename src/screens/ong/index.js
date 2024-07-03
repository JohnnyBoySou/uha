import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Button, LabelLI, Row, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { MotiImage, MotiView } from 'moti';
import { FlatList, ScrollView } from 'react-native';

import ongs from '@data/ongs'
import { useNavigation } from '@react-navigation/native';

export default function ONGSScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const item = route?.params?.item
    const [fixedMenu, setFixedMenu] = useState(false);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll onScroll={(event) => {const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 80) {setFixedMenu(true);} else {setFixedMenu(false);} }} scrollEventThrottle={16}>
                <Header rose />
                <Column style={{ justifyContent: 'center', marginVertical: 24, marginHorizontal: margin.h, }}>
                        <Title style={{ fontSize: 28, lineHeight: 28, }}>ONGs parceiras </Title>
                        <Label style={{ marginVertical: 6, fontSize: 16, }}>Encontre a ONG que mais combina com você! </Label>
                    </Column>
                    <Cards />

                    <Title style={{ marginHorizontal: margin.h, }}>Mais pertos de você</Title>
                <ONGSList data={ongs}/>
                <Column style={{height: 80, }} />
            </Scroll>
        </Main>
    )
}


const ONGSList = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Scroll horizontal showsHorizontalScrollIndicator={false} pagingEnabled >
            <FlatList
                data={data?.slice(0, 3)}
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 28, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                        <Row style={{}}>
                            <Column style={{ width: 220, justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
                                <Label style={{ fontSize: 14, lineHeight: 16, }}>{item?.desc.length > 80 ? item?.desc.slice(0, 80) + '...' : item?.desc }</Label>

                            </Column>
                            <MotiImage source={{ uri: item?.img }} style={{ width: 112, height: 112, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item?.id}
            />
            <FlatList
                data={data?.slice(3, 6)}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 28,  }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}  >
                        <Row style={{}}>
                            <Column style={{ width: 220, justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
                                <Label style={{ fontSize: 14, lineHeight: 16, }}>{item?.desc}</Label>
                               

                            </Column>
                            <MotiImage source={{ uri: item?.img }} style={{ width: 112, height: 112, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item?.id}
            />
            <FlatList
                data={data?.slice(6, 9)}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 28, marginRight: 22, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}  >
                        <Row style={{}}>
                            <Column style={{ width: 220, justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
                                <Label style={{ fontSize: 14, lineHeight: 16, }}>{item?.desc}</Label>

                            </Column>
                            <MotiImage source={{ uri: item?.img }} style={{ width: 112, height: 112, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item?.id}
            />
        </Scroll>
    )
}

const Cards = () => {
    const { color, margin, } = useContext(ThemeContext);
    const navigation = useNavigation()
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 40, }}>
            <Button onPress={() => {navigation.navigate('NotafiscalSend')}} >
            <MotiView from={{ opacity: 0, translateX: 40, }} animate={{ opacity: 1, translateX: 0, }} transition={{ type: 'timing', delay: 1200, }} style={{ width: 240, height: 300, backgroundColor: color.primary, borderRadius: 18, marginRight: 20, marginLeft: 28, overflow: 'hidden', }}>
                <Column style={{ margin: 20, }}>
                    <Title style={{ color: '#FFF2E3', fontSize: 32, lineHeight: 36, marginTop: 10, }}>Ganhe +</Title>
                    <Title style={{ fontSize: 32, lineHeight: 34, marginTop: -5, }}>Moedas</Title>
                    <Label style={{ color: "#FFF2E3", marginTop: 30, fontFamily: 'Font_Medium', alignSelf: 'flex-start', paddingHorizontal: 6, fontSize: 24, lineHeight: 28, }}>Cadastre suas</Label>
                    <Title style={{ backgroundColor: '#fff', marginTop: 8, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, fontSize: 20, alignSelf: 'flex-start', marginBottom: 20, }}>Notas fiscais</Title>
                </Column>
                <MotiImage from={{ opacity: 0, translateY: 30, scale: 0, }} animate={{ opacity: 1, translateY: -20, scale: 1.3, }} source={require('@imgs/nt.png')} style={{ width: 140, zIndex: 9, height: 130, alignSelf: 'flex-end', objectFit: 'cover', }} />
                <MotiImage from={{ opacity: 0, translateY: 30, scale: 0, }} animate={{ opacity: 1, translateY: 0, scale: 1.3, }} source={require('@imgs/nt4.png')} style={{ width: 140, height: 130, position: 'absolute', left: -20, bottom: -40, }} />
            </MotiView>
            </Button>

            <Button onPress={() => {navigation.navigate('ShopOffers')}} >
            <MotiView from={{ opacity: 0, translateX: 40, }} animate={{ opacity: 1, translateX: 0, }} transition={{ type: 'timing', delay: 1600, }} style={{ width: 240, height: 300, backgroundColor: color.secundary, borderRadius: 18, marginRight: 20, overflow: 'hidden', }}>
                <Column style={{ margin: 20, }}>
                    <Title style={{ color: '#FFF2E3', fontSize: 32, lineHeight: 36, marginTop: 10, }}>Ofertas</Title>
                    <Title style={{ fontSize: 32, lineHeight: 34, marginTop: -5, color: color.primary, }}>relâmpago</Title>
                    <Row>
                        <Label style={{ color: "#FFF2E3", marginTop: 40, fontFamily: 'Font_Medium', paddingHorizontal: 6, fontSize: 24, lineHeight: 28, }}>Atualizado {'\n'}a cada <Title style={{ backgroundColor: '#fff', marginTop: 8, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, fontSize: 20, zIndex: 99, }}> 6 horas </Title></Label>
                    </Row>
                </Column>
                <MotiImage from={{ opacity: 0, translateY: 30, scale: 0, }} animate={{ opacity: 1, translateY: -50, scale: 1.2, }} source={require('@imgs/nt7.png')} style={{ width: 140, height: 120, zIndex: -9, alignSelf: 'flex-end', objectFit: 'contain', marginRight: -20, }} />
                <MotiImage from={{ opacity: 0, translateY: 30, scale: 0, }} animate={{ opacity: 1, translateY: 0, scale: 1.1, }} source={require('@imgs/nt5.png')} style={{ width: 140, height: 130, position: 'absolute', left: -20, bottom: -40, }} />
            </MotiView>
            </Button>

        </ScrollView>
    )
}
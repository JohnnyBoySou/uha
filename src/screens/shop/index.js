import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import {  FlatList, Dimensions, Animated } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage } from 'moti';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useIsFocused, useNavigation, } from '@react-navigation/native';

import { getShops, getOffers } from '@request/shop/index';
import { getCategory } from '@request/category';
import { StatusBar } from 'expo-status-bar'
import Header from '@components/header';

import { ExpandingDot } from "react-native-animated-pagination-dots";
const { width, height } = Dimensions.get('window');

import { ScrollView } from 'react-native-gesture-handler';
import CardOffers from '@components/cardOffers';

export default function ShopScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(route.params?.type);
    const [data, setdata] = useState();
    const [offers, setoffers] = useState();
    const a = false;

    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fecthData = async = () => {
            setloading(true);
            getShops().then((res) => {
                setdata(res)
                setloading(false);
            }).catch(err => {
                console.log(err)
            })
            getOffers().then((res) => {
                setoffers(res)
                setloading(false);
            }).catch(err => {
                console.log(err)
            })
        }

        fecthData()
    }, [])
    const [fixedMenu, setFixedMenu] = useState(false);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style='dark' backgroundColor="#fff" />
            <Scroll onScroll={(event) => {
                const scrolling = event.nativeEvent.contentOffset.y;
                if (scrolling > 80) {
                    setFixedMenu(true);
                } else {
                    setFixedMenu(false);
                }
            }} scrollEventThrottle={16}>


                <Header rose />

                {type == null &&
                    <><Column style={{ justifyContent: 'center', marginVertical: 24, marginHorizontal: margin.h, }}>
                        <Title style={{ fontSize: 28, lineHeight: 28, }}>Estabelecimentos parceiros </Title>
                        <Label style={{ marginVertical: 6, fontSize: 16, }}>Encontre seus serviços favoritos e troque-os por pontos! </Label>
                    </Column>
                        <Cards />
                    </>}


                {type != null && <Result value={type} />}

                {!loading && <MotiView from={{ translateX: -20, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ type: 'timing' }}>
                    <Promos data={data} title="Promos incríveis" />
                    <Title style={{ marginHorizontal: margin.h, marginBottom: 10, marginTop: 20, }}>Ofertas relâmpago</Title>
                    <Offers data={offers} />
                    <Promos data={data} title="Lojas da sua região" />
                </MotiView>}

                <Column style={{ height: 100, }} />
            </Scroll>

            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <AnimatePresence>
                    {fixedMenu &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ scale: 1, opacity: 1, }} exit={{ scale: 0, opacity: 0, }} transition={{ type: 'timing' }} >
                            <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Search' },) }} style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Search size={24} color="#fff" />
                            </Button>
                        </MotiView>}
                </AnimatePresence>
            </Column>
        </Main>
    )
}

const Result = ({ value }) => {
    const [type, settype] = useState(value);
    const [data, setdata] = useState();
    const { isFocused } = useIsFocused();
    const { color, margin } = useContext(ThemeContext);
    useEffect(() => {
        const fecthData = async () => {
            getCategory(value.id).then((res) => {
                setdata(res)
            })
        }
        fecthData()
    }, [value])
    if (type == null) return null;
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0, }} style={{ marginBottom: 0, }}>
            <Title style={{ marginHorizontal: margin.h, marginVertical: 12, }}>Estabelecimentos que oferecem</Title>
            <Row style={{ marginHorizontal: margin.h, marginBottom: -40, }}>
                <AnimatePresence>
                    {type != null &&
                        <Button onPress={() => settype(null)} rippleColor={color.secundary} style={{ paddingVertical: 8, paddingHorizontal: 16, backgroundColor: color.primary + 20, marginTop: -4, marginBottom: 14, borderRadius: 8, }} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Title style={{ color: color.primary, fontSize: 18, marginRight: 6, }}>{type?.name}</Title>
                                <X color={color.primary} />
                            </Row>
                        </Button>}
                </AnimatePresence>
            </Row>
            {data?.length > 0 && <Promos data={data} />}
            {data?.length == 0 && <Column style={{ marginHorizontal: margin.h, marginTop: 50, marginBottom: 20, }}>
                <Title style={{ fontSize: 22, lineHeight: 22, marginBottom: 6, }}>Não conseguimos encontrar nada...</Title>
                <Label style={{ fontSize: 16, }}>Tente buscar por outro termo</Label>
            </Column>}
        </MotiView>
    )
}

const Offers = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <FlatList
            data={data}
            ListFooterComponent={<Column style={{ width: 24 }} />}
            ListHeaderComponent={<Column style={{ width: 24 }} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginVertical: 12, }}
            renderItem={({ item }) =>  <CardOffers item={item} />}
            keyExtractor={item => item.id}
        />
    )
}

const Promos = ({ data, title }) => {
    const { color, margin } = useContext(ThemeContext);
    const navigation = useNavigation();

    const scrollX = useRef(new Animated.Value(0)).current;
    const CardList = useMemo(() => {
        return ({ item }) => (
            <Column style={{ width: width, paddingHorizontal: 28, }}>
                <Button style={{ marginBottom: 12, borderRadius: 12, backgroundColor: '#f7f7f7', }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ justifyContent: 'center', paddingLeft: 20, height: 124, width: width * 0.5, }}>
                            <Title style={{ marginTop: 6, fontSize: 16, lineHeight: 18, }}>{item?.name?.length > 18 ? item.name.slice(0, 18) + '...' : item?.name.slice(0, 18)}</Title>
                            <Label style={{ fontSize: 12, lineHeight: 14, marginTop: 2, color: color.secundary+99, }}>{item?.descri?.length > 40 ? item?.descri?.slice(0, 40) + '...' : item?.descri}</Label>
                            <Row style={{ marginTop: 8, }}>
                                {item?.categories?.slice(0, 2).map((cat) => (
                                    <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                ))}
                            </Row>
                        </Column>
                        <MotiImage source={{ uri: item?.img }} style={{ width: 108, height: 108, marginRight: 8, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                    </Row>
                </Button>
            </Column>

        )
    }, [color, navigation, width]);
    return (
        <>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                <Title>{title}</Title>
                <Column style={{ backgroundColor: color.secundary + 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 3, }}>
                    <ExpandingDot
                        data={[1, 2, 3]}
                        expandingDotWidth={20}
                        scrollX={scrollX}
                        containerStyle={{ position: 'relative', marginTop: 0, top: 0, }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 2,
                        }}
                        activeDotColor={color.secundary}
                        inActiveDotColor={color.secundary + 50}
                    />
                </Column>
            </Row>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled style={{ marginTop: 16, }} snapToAlignment='center'
                decelerationRate={'fast'}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
            >
                <FlatList
                    data={data?.slice(0, 3)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CardList item={item} />}
                    keyExtractor={item => item?.id}
                />
                <FlatList
                    data={data?.slice(3, 6)}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CardList item={item} />}
                    keyExtractor={item => item?.id}
                />
                <FlatList
                    data={data?.slice(6, 9)}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CardList item={item} />}
                    keyExtractor={item => item?.id}
                />
            </ScrollView>
        </>
    )
}

const Cards = () => {
    const { color, margin, } = useContext(ThemeContext);
    const navigation = useNavigation()
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 40, }}>
            <Button onPress={() => { navigation.navigate('NotafiscalSend') }} >
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

            <Button onPress={() => { navigation.navigate('ShopOffers') }} >
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
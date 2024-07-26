import React, { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FlatList, Dimensions, Animated, Image, } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Search, } from 'lucide-react-native';
import { useIsFocused, useNavigation, } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image';
import Header from '@components/header';

import { ExpandingDot } from "react-native-animated-pagination-dots";
import { ScrollView } from 'react-native-gesture-handler';

import { getShops, getOffers, getServices } from '@request/shop/index';
import { Skeleton } from 'moti/skeleton';

import CardOffers from '@components/cardOffers';
import CardServices from '@components/cardServices';
import LoadOffers from '@components/loadOffers';
import LoadServices from '@components/loadServices';

const { width } = Dimensions.get('window');

export default function ShopScreen({ navigation}) {
    const { color, margin } = useContext(ThemeContext);

    const [data, setData] = useState(null);
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState(null);
    const isFocused = useIsFocused();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [shops, offer, service] = await Promise.all([getShops(), getOffers(), getServices()]);
            setData(shops);
            setOffers(offer);
            setServices(service);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                fetchData();
            }, 500);
        }
    }, [isFocused, fetchData]);

    const [fixedMenu, setFixedMenu] = useState(false);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style='dark' backgroundColor="#fff" />
            <Scroll onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 80) { setFixedMenu(true); } else { setFixedMenu(false); } }} scrollEventThrottle={16}>
                <Header rose />
                <Column style={{ justifyContent: 'center', marginVertical: 24, marginHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 28, lineHeight: 28, letterSpacing: -1, }}>Estabelecimentos parceiros </Title>
                    <Label style={{ marginVertical: 6, fontSize: 16, }}>Encontre seus serviços favoritos e troque-os por pontos! </Label>
                </Column>
                <Cards />
                <Column>
                    <Promos data={data} loading={loading} title="Promos incríveis" />
                    <Offers data={offers} loading={loading} />
                    <Services data={services} title="Veja mais serviços" loading={loading} />
                </Column>
                <Column style={{ height: 100, }} />
            </Scroll>
            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                {fixedMenu &&
                    <Column>
                        <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Search' },) }} style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Search size={24} color="#fff" />
                        </Button>
                    </Column>}
            </Column>
        </Main>
    )
}

const Offers = ({ data, loading }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation();
    if (loading) { return <Column style={{ marginTop: 40, marginHorizontal: 28, }}><LoadOffers /></Column> }
    return (
        <Column>
            <Row style={{ justifyContent: 'space-between', marginBottom: 16, marginTop: 20, alignItems: 'center', marginHorizontal: margin.h, }}>
                <Title style={{ fontSize: 22, }}>Ofertas relâmpago</Title>
                <Button onPress={() => { navigation.navigate('ShopOffers') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 8, paddingHorizontal: 16, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14, }}>Ver mais</Label>
                </Button>
            </Row>
            <FlatList
                data={data}
                ListFooterComponent={<Column style={{ width: 28 }} />}
                ListHeaderComponent={<Column style={{ width: 28 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => <CardOffers item={item} />}
                keyExtractor={item => item.id}
            />
        </Column>
    )
}

const Promos = ({ data, title, loading }) => {
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
                            <Label style={{ fontSize: 12, lineHeight: 14, marginTop: 2, color: color.secundary + 99, }}>{item?.descri?.length > 40 ? item?.descri?.slice(0, 40) + '...' : item?.descri}</Label>
                            <Row style={{ marginTop: 8, }}>
                                {item?.categories?.slice(0, 2).map((cat) => (
                                    <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                ))}
                            </Row>
                        </Column>
                        <Image contentFit="cover" source={{ uri: item?.img }} style={{ width: 108, height: 108, marginRight: 8, marginLeft: 20, borderRadius: 12, backgroundColor: "#fff", }} />
                    </Row>
                </Button>
            </Column>
        )
    }, []);

    if (loading) { return <Column style={{ marginTop: 10, marginHorizontal: 28,  }}>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 12,  }}>
            <Skeleton colorMode='light' width={140} height={40} radius={8} />
            <Skeleton colorMode='light' width={50} height={30} radius={120} />
        </Row>
        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Skeleton colorMode='light' width={width - 58} height={140} radius={12} />
        <Column style={{ height: 12, }} />
        <Skeleton colorMode='light' width={width - 58} height={140} radius={12} />
        <Column style={{ height: 12, }} />
        <Skeleton colorMode='light' width={width - 58} height={140} radius={12} />
        </Column>

    </Column> }
    else {
        return (
            <>
                <Row style={{ justifyContent: 'space-between', marginTop: 20, alignItems: 'center', marginHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 22, letterSpacing: -1 }}>{title}</Title>
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
}

const Cards = () => {
    const { color, margin, } = useContext(ThemeContext);
    const navigation = useNavigation()
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10, }}>
            <Button onPress={() => { navigation.navigate('NotafiscalSend') }} >
                <Column from={{ opacity: 0, translateX: 40, }} animate={{ opacity: 1, translateX: 0, }} transition={{ type: 'timing', delay: 1200, }} style={{ width: 240, height: 300, backgroundColor: color.primary, borderRadius: 18, marginRight: 20, marginLeft: 28, overflow: 'hidden', }}>
                    <Column style={{ margin: 20, }}>
                        <Title style={{ color: '#FFF2E3', fontSize: 32, lineHeight: 36, marginTop: 10, }}>Ganhe +</Title>
                        <Title style={{ fontSize: 32, lineHeight: 34, marginTop: -5, }}>Moedas</Title>
                        <Label style={{ color: "#FFF2E3", marginTop: 30, fontFamily: 'Font_Medium', alignSelf: 'flex-start', paddingHorizontal: 6, fontSize: 24, lineHeight: 28, }}>Cadastre suas</Label>
                        <Title style={{ backgroundColor: '#fff', marginTop: 8, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, fontSize: 20, alignSelf: 'flex-start', marginBottom: 20, }}>Notas fiscais</Title>
                    </Column>
                    <Image contentFit="cover" source={require('@imgs/nt.png')} style={{ width: 140, zIndex: 9, height: 130, alignSelf: 'flex-end', }} />
                    <Image contentFit="cover" source={require('@imgs/nt4.png')} style={{ width: 140, height: 130, position: 'absolute', left: -20, bottom: -40, }} />
                </Column>
            </Button>

            <Button onPress={() => { navigation.navigate('ShopOffers') }} >
                <Column from={{ opacity: 0, translateX: 40, }} animate={{ opacity: 1, translateX: 0, }} transition={{ type: 'timing', delay: 1600, }} style={{ width: 240, height: 300, backgroundColor: color.secundary, borderRadius: 18, marginRight: 20, overflow: 'hidden', }}>
                    <Column style={{ margin: 20, }}>
                        <Title style={{ color: '#FFF2E3', fontSize: 32, lineHeight: 36, marginTop: 10, }}>Ofertas</Title>
                        <Title style={{ fontSize: 32, lineHeight: 34, marginTop: -5, color: color.primary, }}>relâmpago</Title>
                        <Row>
                            <Label style={{ color: "#FFF2E3", marginTop: 40, fontFamily: 'Font_Medium', paddingHorizontal: 6, fontSize: 24, lineHeight: 28, }}>Atualizado {'\n'}a cada <Title style={{ backgroundColor: '#fff', marginTop: 8, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, fontSize: 20, zIndex: 99, }}> 6 horas </Title></Label>
                        </Row>
                    </Column>
                    <Image contentFit="contain" source={require('@imgs/nt7.png')} style={{ width: 140, height: 120, zIndex: -9, alignSelf: 'flex-end', marginRight: -20, }} />
                    <Image contentFit="contain" source={require('@imgs/nt5.png')} style={{ width: 140, height: 130, position: 'absolute', left: -20, bottom: -40, }} />
                </Column>
            </Button>

        </ScrollView>
    )
}

const Services = ({ data, title, loading }) => {
    if (loading) { return <Column style={{ marginTop: 20, }}><LoadServices /></Column> }
    return (
        <Column>
            <Title style={{ marginHorizontal: 28, marginTop: 12, marginBottom: 12, fontSize: 22, lineHeight: 22, letterSpacing: -1 }}>{title}</Title>
            <FlatList
                data={data}
                ListFooterComponent={<Column style={{ width: 28 }} />}
                ListHeaderComponent={<Column style={{ width: 28 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => <CardServices item={item} />}
                keyExtractor={item => item.id}
            />
        </Column>
    )
}
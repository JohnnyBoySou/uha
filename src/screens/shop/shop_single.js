import React, { useContext, useState, useEffect, } from 'react';
import { FlatList, Image, Platform, Linking, Dimensions} from 'react-native';
import { Main, Column, Label, Scroll, Title, Row, SubLabel, Button } from '@theme/global';

import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiView,  } from 'moti';
import { Skeleton } from 'moti/skeleton';
//icons
import { ArrowLeft, MapPin,} from 'lucide-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

//request
import { getSingleShop } from '@request/shop/index';

import { StatusBar } from 'expo-status-bar';
import CardOffers from '@components/cardOffers';
import CardServices from '@components/cardServices';

const { width } = Dimensions.get('window');

export default function ShopSingleScreen({ navigation, route }) {
    const { color, margin } = useContext(ThemeContext);
    const id = route.params?.id ? route.params?.id : 1;

    const [item, setitem] = useState();
    const [offers, setoffers] = useState();
    const [services, setservices] = useState();

    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const shop = await getSingleShop(id);
                setitem(shop);
                setoffers(shop?.offers);
                setservices(shop.services);
            } catch (err) {
                console.log(err)
                seterror(err);
            } finally {
                setloading(false);
            }
        };
        setTimeout(() => {
            fetchData();
        }, 300);
    }, []);

    const [fixedMenu, setFixedMenu] = useState(false);
    const openMapWithCep = () => {
        const cep = item?.cep;
        const url = Platform.select({
            ios: `http://maps.apple.com/?q=${cep}`,
            android: `geo:0,0?q=${cep}`
        });
        Linking.openURL(url)
            .catch(err => console.error('An error occurred', err));
    };

    if (loading) return <Main style={{ backgroundColor: '#fff', }}><SkeletonLoading /></Main>;

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="light" translucent />
            <Column style={{ position: 'absolute', top: 20, zIndex: 99, }}>
                <AnimatePresence >
                    {fixedMenu &&
                        <MotiView from={{ opacity: 0, translateY: -120, }} animate={{ translateY: -20, opacity: 1, }} exit={{ translateY: -120, opacity: 0, }} transition={{ type: 'timing' }} style={{ flexDirection: 'row', paddingTop: 50, paddingBottom: 18, paddingHorizontal: margin.h, alignItems: 'center', backgroundColor: color.secundary, width: '100%', justifyContent: 'space-between', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Column style={{ padding: 2, borderRadius: 100, backgroundColor: '#fff', }}>
                                    <Image source={{ uri: item?.img }} style={{ borderRadius: 100, width: 56, height: 56, }} />
                                </Column>
                                <Column style={{ width: 26, height: 26, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 32, marginLeft: -20, }}>
                                    <MaterialIcons style={{}} name="verified" size={24} color={color.blue} />
                                </Column>
                                <Column style={{ marginLeft: 18, }} >
                                    <Title style={{ fontSize: 18, color: "#fff" }}>{item?.name}</Title>
                                    <Label style={{ fontSize: 12, color: "#f7f7f7" }}>{item?.address?.length > 24 ? item?.address.slice(0, 24) + '...' : item?.address}</Label>
                                </Column>
                            </Row>
                            <Button onPress={openMapWithCep} style={{ backgroundColor: color.primary, marginRight: 6, width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <MapPin color='#fff' />
                            </Button>
                        </MotiView>}
                </AnimatePresence>
            </Column>
            <Scroll onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 160) { setFixedMenu(true); } else { setFixedMenu(false); } }} scrollEventThrottle={16} style={{ paddingTop: 0, }}>
                <Column>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 28, position: 'absolute', top: 40, borderRadius: 100, left: 28, justifyContent: 'center', alignItems: 'center', zIndex: 99, }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Image
                        source={{ uri: item?.capa }}
                        style={{
                            height: 300,
                            width: '100%',
                            borderBottomLeftRadius: 32,
                            borderBottomRightRadius: 32,
                            marginBottom: -72,
                            zIndex: -2,
                            marginTop: 0,
                        }}
                    />
                    <Column style={{ padding: 6, backgroundColor: '#fff', borderRadius: 100, alignSelf: 'center', zIndex: -2, }}>
                        <Image
                            source={{ uri: item?.img }}
                            style={{ borderRadius: 100, zIndex: 99, width: 132, height: 132, }}
                        />
                    </Column>
                </Column>
                <Column style={{ flex: 1, marginTop: 12, }} >
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>
                        <Row>
                            <Title>{item?.name} </Title>
                            <MaterialIcons style={{ marginLeft: 5, }} name="verified" size={24} color={color.blue} />
                        </Row>
                        <Label style={{ textAlign: 'center', marginVertical: 5, fontSize: 14, color: color.secundary + 99, lineHeight: 16, }}>{item?.desc}</Label>
                        <Button style={{ borderRadius: 100, }} onPress={openMapWithCep}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE0F6', borderRadius: 100, paddingHorizontal: 12, marginVertical: 6, }}>
                                <MapPin color={color?.primary} size={16} />
                                <SubLabel style={{ textAlign: 'center', fontSize: 14, marginVertical: 5, marginHorizontal: 6, fontFamily: 'Font_Medium', color: color.primary, }}>{item?.address}</SubLabel>
                            </Row>
                        </Button>
                    </Column>
                    <Offers data={offers} />
                    <Banners data={item?.banners} />
                    <Services data={services} />
                </Column>
                <Column style={{ height: 70, }} />
            </Scroll>
    </Main>)
}

const Banners = ({ data }) => {
    if (data?.length == 0) return
    const { margin, color } = useContext(ThemeContext);
    return (
        <Column>
            <Column style={{ marginHorizontal: margin.h, marginTop: 0, marginBottom: 10, }}>
                <Title style={{ letterSpacing: -1, fontSize: 22, }}>Promocionais</Title>
            </Column>
        <FlatList
            decelerationRate={'fast'}
            scrollEventThrottle={16}
            data={data}
            renderItem={({ item }) => <Image source={{ uri: item }} style={{ width: 240, height: 300, borderRadius: 24, marginRight: 18, objectFit: 'cover', }} />}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<Column style={{ width: 34 }} />}
            style={{ paddingHorizontal: 24, marginBottom: 32, }}
            snapToAlignment='center'
            snapToOffsets={[0, 300, 600]}
        />
        </Column>
    )
}

const Services = ({ data }) => {
    if (data?.length == 0) return
    const { margin, color } = useContext(ThemeContext);
    return (
        <Column>
            <Column style={{ marginHorizontal: margin.h, marginTop: 0, marginBottom: 10, }}>
                <Title style={{ letterSpacing: -1, fontSize: 22, }}>Serviços</Title>
            </Column>
            <FlatList
                data={data}
                horizontal
                ListHeaderComponent={<Column style={{ width: margin.h, }} />}
                ListFooterComponent={<Column style={{ width: margin.h }} />}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => <CardServices item={item} />}
            />
        </Column>
    )
}

const Offers = ({ data }) => {
    if (data?.length == 0) return
    const { margin, color } = useContext(ThemeContext);
    return (
        <Column>
            <Column style={{ marginHorizontal: margin.h, }}>
                <Title style={{ letterSpacing: -1, fontSize: 22, }}>Ofertas do momento</Title>
            </Column>
            <FlatList
                horizontal
                data={data}
                style={{ marginVertical: margin.v, marginBottom: 30, }}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<Column style={{ width: margin.h, }} />}
                ListFooterComponent={<Column style={{ width: margin.h }} />}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item }) => <CardOffers item={item} />}
            />
        </Column>
    )
}

const SkeletonLoading = () => {
    return (
        <Column>
            <Skeleton colorMode='light' width={width} height={300} radius={24} />
            <Row style={{ alignSelf: 'center', marginTop: -76, padding: 12, backgroundColor: '#fff', borderRadius: 100, }}>
                <Skeleton colorMode='light' width={132} height={132} radius={100} />
            </Row>
            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Skeleton colorMode='light' width={200} height={34} radius={8} />
                <Column style={{ height: 14, }} />
                <Skeleton colorMode='light' width={240} height={20} radius={8} />
                <Column style={{ height: 4, }} />
                <Skeleton colorMode='light' width={220} height={20} radius={8} />

                <Column style={{ height: 14, }} />
                <Skeleton colorMode='light' width={280} height={36} radius={100} />
            </Column>
            <Column style={{ marginHorizontal: 28, marginTop: 30, }}>
                <Skeleton colorMode='light' width={140} height={34} radius={8} />
                <Row style={{ marginVertical: 12, }}>
                    <Column style={{ marginRight: 14, }}>
                        <Skeleton colorMode='light' width={124} height={124} radius={8} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode='light' width={100} height={28} radius={6} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode='light' width={80} height={20} radius={4} />
                    </Column>
                    <Column style={{ marginRight: 14, }}>
                        <Skeleton colorMode='light' width={124} height={124} radius={8} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode='light' width={100} height={28} radius={6} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode='light' width={80} height={20} radius={4} />
                    </Column>
                    <Column style={{ marginRight: 14, }}>
                        <Skeleton colorMode='light' width={124} height={124} radius={8} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode='light' width={100} height={28} radius={6} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode='light' width={80} height={20} radius={4} />
                    </Column>
                </Row>
            </Column>
            <Column style={{height: 70, }} />
        </Column>
    )
}
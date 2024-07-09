import React, { useContext, useEffect, useState, useRef } from 'react';
import { Vibration, FlatList, Animated, Dimensions, Pressable } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button, ButtonOut, LabelLI, U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState } from 'moti';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '@components/header';
import { ExpandingDot } from "react-native-animated-pagination-dots";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

import HeartAnim from '@anim/heart';

import { getSingleService, } from '@request/shop/index';
import { sendCodeService } from '@api/request/shop/qrcode';
import { veriFav, addFav, delFav } from '@api/user/favorites';
import { Skeleton } from 'moti/skeleton';
import { X } from 'lucide-react-native';

const { width,  } = Dimensions.get('window');


export default function ShopServiceSingleScreen({ navigation, route }) {
    const { color, margin } = useContext(ThemeContext);
    const [item, setitem] = useState();
    const [shop, setshop] = useState();
    const id = route.params?.id
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = await getSingleService(id);
                const fav = await veriFav(service?.id)
                setlike(fav)
                setitem(service);
                setshop(service.shop);
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

    const nowdate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const itm = {
        date: nowdate,
        shop: {
            name: shop?.name,
            id: shop?.id,
            img: shop?.img,
        },
        product: {
            name: item?.name,
            value: item?.value,
            img: item?.imgs[0],
            id: item?.id,
        },
    }
    const [like, setlike] = useState();
    const toggleLike = async () => {
        if (like) {
            setlike(false)
            await delFav(item.id).then((res) => { }).catch((err) => { console.log(err) })
        } else {
            setlike(true)
            await addFav(itm?.product).then((res) => { }).catch((err) => { console.log(err) })
        }

    }
    const handleBuyService = async () => {
        setloading(true)
        sendCodeService(item?.id).then(res => {
            const itm = {
                date: res.create,
                code: res?.token,
                gerador: res?.gerador,
                shop: {
                    name: shop?.name,
                    id: shop?.id,
                },
                product: {
                    name: item?.name,
                    value: item?.value,
                    img: item?.imgs[0],
                    id: item?.id,
                },
            }
            setloading(false)
            navigation.navigate('ShopQRCode', { item: itm })
        }).catch((err) => {
            seterror(err.message)
            Vibration.vibrate(300);
            setloading(false)
        })
        setloading(false)
    }
    if (loading) return <Main style={{ backgroundColor: '#fff', }}><Scroll><SkeletonList /></Scroll></Main>
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll scrollEventThrottle={16}  >
                <Header title="Detalhes" rose />

                <Carrousel data={item?.imgs} />

                <Column style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ width: '80%' }}>
                            <Title>{item?.name}</Title>
                            <Label style={{ marginVertical: 5, lineHeight: 20, fontSize: 16, }}>{item?.desc}</Label>
                        </Column>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                            <Column style={{ marginTop: 0, justifyContent: 'center', alignItems: 'center', }}>
                                <Title style={{ color: color.primary }}>{item?.value.slice(0, -3)}</Title>
                                <Label style={{ color: color.primary, fontSize: 14, marginTop: -6, }}>pontos</Label>
                            </Column>
                        </Column>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 12, }}>
                        <FlatList
                            data={item?.categories}
                            style={{ marginVertical: 6, }}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            horizontal
                            renderItem={({ item }) => (
                                <Button key={item.id} onPress={() => { navigation.navigate('Shop', { type: item }) }} style={{ marginRight: 6, }}>
                                    <Label key={item.name} style={{ fontSize: 14, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 6, paddingHorizontal: 14, backgroundColor: color.primary + 20, borderRadius: 8, alignSelf: 'flex-start', }}>{item?.name}</Label>
                                </Button>
                            )}

                        />

                        <Button onPress={toggleLike} style={{ alignSelf: 'center', width: 42, height: 42, marginRight: 12, borderRadius: 12, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                            <AnimatePresence>
                                {like ? <HeartAnim w={52} h={52} play={like} />
                                    :
                                    <AntDesign name="hearto" size={24} color={color.primary} />}
                            </AnimatePresence>
                        </Button>
                    </Row>
                </Column>

                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 20, }}>Estabelecimento</Title>
                    <Column style={{ borderRadius: 12, padding: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#50505020', marginVertical: 12, zIndex: 9, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Row>
                                <Button onPress={() => { navigation.navigate('ShopSingle', { id: shop?.id }) }} >
                                    <MotiImage source={{ uri: shop?.img }} style={{ width: 54, height: 54, borderRadius: 12, }} />
                                </Button>
                                <Column style={{ justifyContent: 'center', marginLeft: 20, }}>
                                    <SubLabel style={{ color: color.secundary, fontSize: 16, }}>{shop?.name}</SubLabel>
                                    <Label style={{ fontSize: 12, lineHeight: 16, }}>{shop?.address.slice(0, 24)}</Label>
                                </Column>
                            </Row>
                            <Button onPress={() => navigation.navigate('ShopSingle', { id: shop?.id })} style={{ backgroundColor: '#FFE0F6', marginRight: 6, width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Feather name="map-pin" size={24} color={color.primary} />
                            </Button>
                        </Row>
                    </Column>

                </Column>

                <Column style={{ height: 100, }} />
            </Scroll>

            <MotiView style={{ position: 'absolute', bottom: 0, alignSelf: 'center', zIndex: 99, }}>
                <Row style={{ marginVertical: 20, }}>
                    <Button onPress={handleBuyService} disabled={loading || error?.length > 0} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: error?.length > 0 ? color.red : color.primary, justifyContent: 'center', alignItems: 'center', }}>
                        <Row>
                            {error ? <X size={32} color="#fff" /> : <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />}
                        </Row>
                    </Button>
                    <MotiView style={{ backgroundColor: error?.length > 0 ? "#850505" : '#bf0d8a', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, textAlign: 'right', marginLeft: 18, }}>{error ? error.slice(5) : 'Gerar QRCODE'}    </Label>
                    </MotiView>
                </Row>
            </MotiView>
        </Main>
    )
}

const Carrousel = ({ data }) => {
    const { margin, color, } = useContext(ThemeContext);
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <>
            <FlatList
                horizontal
                data={data}
                style={{ marginVertical: margin.v, marginBottom: 20, }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                snapToAlignment='center'
                decelerationRate={'fast'}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
                pagingEnabled
                renderItem={({ item, index }) => <CardImage item={item} index={index} />}
            />
            {data?.length > 1 &&
                <Column style={{ backgroundColor: color.secundary + 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 3, alignSelf: 'center', marginTop: -14, marginBottom: 10, }}>
                    <ExpandingDot
                        data={data}
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
                </Column>}
        </>
    )
}

const CardImage = ({ item }) => {
    const [open, setopen] = useState(false);
    const scaleIn = useAnimationState({
        from: {
            width: width * 0.8, height: 284,
        },
        to: {
            width: width, height: 484,
        },
    });

    const handleImg = () => {
        if (open) {
            scaleIn.transitionTo('to');
            setopen(false);
        } else {
            scaleIn.transitionTo('from');
            setopen(true);
        }
    }

    useEffect(() => {
        handleImg();
    }, [])

    return (
        <Pressable onLongPress={handleImg} style={{ width: width, justifyContent: 'center', alignItems: 'center', }}>
            <MotiImage state={scaleIn} source={{ uri: item }} style={{ borderRadius: 24, }} />
        </Pressable>
    )
}

const SkeletonList = () => {
    return (
        <Column style={{ marginHorizontal: 28, marginTop: 50,}}>
            <Column style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                <Skeleton height={300} width={width * 0.86} radius={24} colorMode='light' />
            </Column>
            <Column style={{ height: 12, }} />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Column>
                    <Skeleton height={40} width={width * 0.56} radius={6} colorMode='light' />
                    <Column style={{ height: 6, }} />
                    <Skeleton height={24} width={width * 0.4} radius={6} colorMode='light' />
                </Column>
                <Skeleton height={72} width={72} radius={12} colorMode='light' />
            </Row>

            <Row style={{ marginTop: 12, }}>
                <Skeleton height={42} width={120} radius={100} colorMode='light' />
                <Column style={{ width: 12, }} />
                <Skeleton height={42} width={80} radius={100} colorMode='light' />
                <Column style={{ width: 12, }} />
                <Skeleton height={42} width={100} radius={100} colorMode='light' />
            </Row>
            <Column style={{ height: 26, }} />
            <Skeleton height={34} width={width * 0.46} radius={8} colorMode='light' />
            <Column style={{ height: 12, }} />
            <Skeleton height={74} width={width * 0.86} radius={12} colorMode='light' />
            <Column style={{ height: 32, }} />
            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Skeleton height={74} width={width * 0.6} radius={100} colorMode='light' />
            </Column>
        </Column>
    )
}
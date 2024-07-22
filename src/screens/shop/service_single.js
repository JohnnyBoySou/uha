import React, { useContext, useEffect, useState, useRef } from 'react';
import { Vibration, FlatList, Dimensions, ActivityIndicator, Animated as RAnimated } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiView, } from 'moti';
import Header from '@components/header';
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { Image } from 'expo-image'

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import HeartAnim from '@anim/heart';

import { getSingleService, } from '@request/shop/index';
import { sendCodeService } from '@api/request/shop/qrcode';
import { veriFav, addFav, delFav } from '@api/user/favorites';
import { Skeleton } from 'moti/skeleton';
import { Check, X } from 'lucide-react-native';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');


export default function ShopServiceSingleScreen({ navigation, route }) {
    const { color, margin } = useContext(ThemeContext);
    const { id } = route.params;
    const [item, setItem] = useState(null);
    const [shop, setShop] = useState(null);
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [success, setsuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = await getSingleService(id);
                const fav = await veriFav(service?.id);
                setLike(fav);
                setItem(service);
                setShop(service.shop);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleToggleLike = async () => {
        const product = {
            name: item?.name,
            value: item?.value,
            img: item?.imgs[0],
            id: item?.id,
            type: 'product'
        }
        try {
            if (like) {
                setLike(false);
                await delFav(item.id);
            } else {
                setLike(true);
                await addFav(product);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleBuyService = async () => {
        try {
            setLoadingBuy(true);
            setError()
            const res = await sendCodeService(item.id);
            const itm = {
                date: res.create,
                code: res.token,
                gerador: res.gerador,
                shop: {
                    name: shop.name,
                    id: shop.id,
                },
                product: {
                    name: item.name,
                    value: item.value,
                    img: item.imgs[0],
                    id: item.id,
                },
            };

            setTimeout(() => {
                setLoadingBuy(false);
                setsuccess(true);
            }, 1000);
            setTimeout(() => {
                navigation.navigate('ShopQRCode', { item: itm, })
            }, 3000);
        } catch (err) {
            setLoadingBuy(false);
            setsuccess(false);
            setError(err?.message);
            Vibration.vibrate(300);
        } finally {
            setTimeout(() => {
                setLoadingBuy(false);
            }, 1000);
        }
    };

    if (loading) {
        return (
            <Main style={{ backgroundColor: '#fff' }}>
                <Scroll>
                    <SkeletonList />
                </Scroll>
            </Main>
        );
    }

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
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
                                <Button key={item.id} onPress={() => { navigation.navigate('CategorySingle', { item: item, id: item?.id }) }} style={{ marginRight: 6, }}>
                                    <Label key={item.name} style={{ fontSize: 14, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 6, paddingHorizontal: 14, backgroundColor: color.primary + 20, borderRadius: 8, alignSelf: 'flex-start', }}>{item?.name}</Label>
                                </Button>
                            )}
                        />

                        <Button onPress={handleToggleLike} style={{ alignSelf: 'center', width: 42, height: 42, marginRight: 12, borderRadius: 12, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
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
                                    <Image contentFit='cover' transition={500} cachePolicy="disk" source={{ uri: shop?.img }} style={{ width: 54, height: 54, borderRadius: 12, }} />
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
                <Column style={{height: 170, }} />
            </Scroll>

            <BuyService item={item} handleBuyService={handleBuyService} loading={loadingBuy} error={error} success={success} />
        </Main>
    )
}

const BuyService = ({ handleBuyService, loading, error, success, item }) => {
    const { color } = useContext(ThemeContext);
    const widthValue = useSharedValue(162);
    const heightValue = useSharedValue(62);
    const radiusValue = useSharedValue(100);
    const bottomValue = useSharedValue(20);
    const backgroundValue = useSharedValue(error ? '#850505' : '#bf0d8a');


    useEffect(() => {
        if (success && !loading) {
            // Sucesso
            widthValue.value = withTiming(width, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            heightValue.value = withTiming(height, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            bottomValue.value = withSpring(0);
            radiusValue.value = withTiming(0, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            backgroundValue.value = withSpring(color.green);

        } else if (error && !loading) {
            // Erro
            bottomValue.value = withTiming(20, { duration: 300 });
            widthValue.value = withTiming(264, { duration: 300 });
            heightValue.value = withTiming(62, { duration: 300 });
            radiusValue.value = withTiming(100, { duration: 300 });
            backgroundValue.value = withTiming('#f55353');
        }
        else if (loading && !error && !success) {
            // loading
            radiusValue.value = withTiming(100, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            widthValue.value = withTiming(62, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            heightValue.value = withTiming(62, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            bottomValue.value = withSpring(20);
        } else if (!loading && !error && !success) {
            // Normal
            bottomValue.value = withTiming(20, { duration: 300 });
            widthValue.value = withTiming(214, { duration: 300 });
            heightValue.value = withTiming(62, { duration: 300 });
            radiusValue.value = withTiming(100, { duration: 300 });
            backgroundValue.value = withTiming('#bf0d8a', { duration: 300 });
        }
    }, [success, error, loading]);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: widthValue.value,
            height: heightValue.value,
            backgroundColor: backgroundValue.value,
            bottom: bottomValue.value,
            borderRadius: radiusValue.value,
        };
    });

    return (
        <Animated.View style={[{ position: 'absolute', bottom: 20, borderRadius: 100, alignSelf: 'center', zIndex: 99, backgroundColor: 'red', }, animatedStyle]}>
            {!success && <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Button onPress={() => handleBuyService()} disabled={loading || error?.length > 0} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: error?.length > 0 ? color.red : color.primary, justifyContent: 'center', alignItems: 'center', }}>
                    <Row>
                        {loading && <ActivityIndicator size="large" color="#fff" />}
                        {!loading && <>
                            {!error && <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />}
                            {error && <Feather name="x" size={24} color="#fff" />}
                        </>}
                    </Row>
                </Button>
                {!loading && <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing', delay: 200, }}><Label style={{ color: '#fff', fontFamily: 'Font_Medium', lineHeight: 16, marginRight: 20, fontSize: 16, }}>{error?.length > 0 ? error : 'Gerar QRCODE '}</Label></MotiView>}
            </Row>}

            {success &&
                <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing', duration: 500, }} delay={500} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: "#ffffff50", justifyContent: 'center', alignItems: 'center', }}>
                        <Check size={60} color="#fff" />
                    </MotiView>
                    <Title style={{ color: '#fff', textAlign: 'center', fontSize: 28, lineHeight: 28, marginTop: 20, }}>Troca realizada com sucesso!</Title>
                    <Title style={{ color: '#fff', textAlign: 'center', fontFamily: 'Font_Medium', fontSize: 22, lineHeight: 22, marginTop: 12, }}>Redirecionando {'\n'}ao resgatar...</Title>
                </MotiView>}
        </Animated.View>
    );
};

const Carrousel = ({ data }) => {
    const { margin, color } = useContext(ThemeContext);
    const scrollX = useRef(new RAnimated.Value(0)).current;
    return (
        <>
            <FlatList
                horizontal
                data={data}
                style={{ marginVertical: margin.v, marginBottom: 20 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                snapToAlignment='center'
                decelerationRate='fast'
                onScroll={RAnimated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                pagingEnabled
                renderItem={({ item }) => (
                    <Column style={{ width }}>
                        <Image
                            source={{ uri: item }}
                            transition={500}
                            cachePolicy='disk'
                            contentFit='cover'
                            style={{
                                borderRadius: 24,
                                width: 0.86 * width,
                                alignSelf: 'center',
                                height: 320,
                            }}
                        />
                    </Column>
                )}
            />
            {data?.length > 1 && (
                <Column style={{ backgroundColor: `${color.secundary + 20}`, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 3, alignSelf: 'center', marginTop: -14, marginBottom: 10 }}>
                    <ExpandingDot
                        data={data}
                        expandingDotWidth={20}
                        scrollX={scrollX}
                        containerStyle={{ position: 'relative', marginTop: 0, top: 0 }}
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
            )}
        </>
    );
};

const SkeletonList = () => {
    return (
        <Column style={{ marginHorizontal: 28, marginTop: 50, }}>
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
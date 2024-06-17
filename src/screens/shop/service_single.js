import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, FlatList, Animated, Dimensions } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button, ButtonOut, LabelLI, U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState } from 'moti';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '@components/header';
import { getSingleService, getSingleShop} from '@request/service';
import { ExpandingDot } from "react-native-animated-pagination-dots";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

import { removeLike, verifyLiked, addLike } from '@api/user/preferences';
import HeartAnim from '../../assets/anim/heart';
const { width, height } = Dimensions.get('window');


export default function ShopServiceSingleScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [item, setitem] = useState();
    const [shop, setshop] = useState();
    const [others, setothers] = useState();
    const id = route.params?.id ? route.params?.id : 1;
    useEffect(() => {
        getSingleService(id).then((res) => {
            setitem(res)
            console.log(res.shop.id)
            getSingleShop(res.shop.id).then((res) => {
                console.log(res)
                setshop(res)
            })
            setothers(res?.others)
        }).catch((err) => {
            console.log(err)
        })

        verifyLiked(item?.id).then((res) => {
            setlike(res)
        }).catch((err) => {
            console.log(err)
        })

        map.transitionTo('from')
    }, [item])

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const digit = useAnimationState({
        from: { opacity: 0, width: 0, },
        to: { opacity: 1, width: 180, },
    })

    const map = useAnimationState({
        from: { height: 12, translateY: -24, },
        to: { height: 180, borderRadius: 12, traslateY: -10, },
    })

    const itm = {
        code: '091722209593',
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
            await removeLike(item.id).then((res) => { }).catch((err) => { console.log(err) })
        } else {
            setlike(true)
            await addLike(itm?.product).then((res) => { }).catch((err) => { console.log(err) })
        }

    }

    const [showmap, setshowmap] = useState(false);
    const toggleMap = () => {
        if (showmap) {
            map.transitionTo('from')
            setshowmap(false)
        } else {
            map.transitionTo('to')
            setshowmap(true)
        }
    }

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll scrollEventThrottle={16} onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 120) { digit.transitionTo('to') } else { digit.transitionTo('from') } }} style={{ paddingTop: 15, }} >
                <Header title="Detalhes" rose />

                <FlatList
                    horizontal
                    data={item?.imgs}
                    style={{ marginVertical: margin.v, marginBottom: 20, }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    snapToAlignment='center'
                    decelerationRate={'fast'}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                        })}
                    pagingEnabled
                    renderItem={({ item, index }) => (
                        <Column style={{ width: width, justifyContent: 'center', alignItems: 'center', }}>
                            <MotiImage source={{ uri: item }} style={{ width: width * 0.8, height: 284, borderRadius: 24, backgroundColor: '#fff', }} />
                        </Column>
                    )}
                />

                <ExpandingDot
                    data={[1, 2, 3]}
                    expandingDotWidth={20}
                    scrollX={scrollX}
                    containerStyle={{ position: 'relative', marginTop: 12, alignSelf: 'center' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 5
                    }}
                    activeDotColor={color.primary}
                    inActiveDotColor={color.primary + 50}
                />
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ width: '80%' }}>
                            <Title>{item?.name}</Title>
                            <Label style={{ marginVertical: 5, lineHeight: 20, fontSize: 16, }}>{item?.desc}</Label>
                        </Column>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                            <Column style={{ marginTop: 0, justifyContent: 'center', alignItems: 'center', }}>
                                <Title style={{ color: color.primary }}>{item?.value}</Title>
                                <Label style={{ color: color.primary, fontSize: 14, marginTop: -6, }}>pontos</Label>
                            </Column>
                        </Column>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 12,}}>
                        <Row>
                            {item?.categories?.map((cat) => (
                                <Button key={cat.id} onPress={() => { navigation.navigate('Shop', { type: cat }) }} style={{ marginRight: 6, }}>
                                    <Label key={cat.name} style={{ fontSize: 14, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 6, paddingHorizontal: 14, backgroundColor: color.primary + 20, borderRadius: 8, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                </Button>
                            ))}
                        </Row>
                        <Button onPress={toggleLike} style={{ alignSelf: 'center', width: 42, height: 42, borderRadius: 12, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                            <Row>
                                <AnimatePresence>
                                    {like ? <HeartAnim w={52} h={52} play={like} />
                                        :
                                        <AntDesign name="hearto" size={24} color={color.primary} />}
                                </AnimatePresence>
                            </Row>
                        </Button>
                    </Row>
                </Column>
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 20, }}>Onde encontrar</Title>
                    <Column style={{ borderRadius: 12, padding: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#50505020', marginVertical: 12, zIndex: 9, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Row>
                                <Button onPress={() => { navigation.navigate('ShopSingle', { id: shop?.id }) }} >
                                    <MotiImage source={{ uri: shop?.img }} style={{ width: 54, height: 54, borderRadius: 12, }} />
                                </Button>
                                <Column style={{ justifyContent: 'center', marginLeft: 20, }}>
                                    <SubLabel style={{ color: color.secundary, fontSize: 16, }}>{shop?.name}</SubLabel>
                                    <Label style={{ fontSize: 12, lineHeight: 16, }}>{shop?.address.slice(0, 32)}</Label>
                                </Column>
                            </Row>
                            <Button onPress={toggleMap} style={{ backgroundColor: showmap ? color.primary : '#FFE0F6', marginRight: 6, width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Feather name="map-pin" size={24} color={showmap ? "#fff" : color.primary} />
                            </Button>
                        </Row>
                    </Column>
                    <MotiView state={map} style={{ backgroundColor: '#f7f7f7', borderRadius: 12, marginHorizontal: 12, }} transition={{ type: 'timing' }}>
                        <MotiImage source={require('@imgs/map.png')} style={{ width: '100%', height: '100%', borderRadius: 12, }} />
                    </MotiView>
                    <Title style={{ fontSize: 20, marginTop: -8, }}>Aproveite também</Title>
                    <FlatList
                        data={others}
                        style={{ marginTop: 6, marginBottom: 30, marginHorizontal: -8, }}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        columnWrapperStyle={{  }}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <Button onPress={() => navigation.navigate('Home')} style={{ borderRadius: 8, padding: 4, backgroundColor: '#f5f5f5', marginVertical: 6, flexGrow: 1, margin: 8, }}>
                                <Row style={{  alignItems: 'center', }}>
                                    <MotiImage source={{ uri: item.img }} style={{ width: 54, height: 54, borderRadius: 6, }} />
                                    <Column style={{ marginLeft: 8, justifyContent: 'center', marginRight: 12, }}>
                                        <SubLabel style={{ fontFamily: 'Font_Medium', fontSize: 14, }}>{item?.name.slice(0, 14)}</SubLabel>
                                        <SubLabel style={{ color: color.primary, fontSize: 12, lineHeight: 16, }}>{item?.value} pontos</SubLabel>
                                    </Column>
                                </Row>
                            </Button>
                        )}
                    />
                </Column>
                <Column style={{ height: 100, }} />
            </Scroll>
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ position: 'absolute', bottom: 0, left: 20, zIndex: 99, }}>
                <Row style={{ marginVertical: 20, }}>
                    <Button onPress={() => { navigation.navigate('ShopQRCode', { item: itm }) }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />
                    </Button>
                    <MotiView transition={{ type: 'timing' }} state={digit} style={{ backgroundColor: '#bf0d8a', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Gerar QR CODE</Label>
                    </MotiView>
                </Row>
            </MotiView>
        </Main>
    )
}


const Comments = ({ id }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
            <Title>Avaliações</Title>
            {comments.map((comment) => (
                <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, marginTop: 24, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <MotiImage source={comment.user.avatar} style={{ width: 46, height: 46, borderRadius: 100, marginRight: 12, backgroundColor: color.primary + 20, }} />
                            <Label style={{ fontFamily: 'Font_Bold', }}>{comment.user.name}</Label>
                        </Row>
                        <Rate rate={comment.rate} />
                    </Row>
                    <Label style={{ fontSize: 16, lineHeight: 18, marginVertical: 6, }}>{comment?.message}</Label>

                    <FlatList
                        horizontal
                        data={comment.imgs}
                        style={{ marginVertical: 12, }}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <MotiImage source={item} style={{ width: 64, height: 64, borderRadius: 12, marginRight: 12, backgroundColor: '#d7d7d7', }} />
                        )}
                    />

                    <Label style={{ fontSize: 12, lineHeight: 16, alignSelf: 'flex-end', }}>{comment.date}</Label>
                </Column>
            ))}
        </Column>
    )
}


const Rate = ({ rate }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const ar = Array.from({ length: rate }, (_, i) => i + 1);
    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center', }}>
            {ar.map((i) => (
                <AntDesign key={i} name="star" size={24} color={color.primary} />
            ))}
        </Row>
    )
}



const comments = [
    {
        user: {
            name: 'Nome do usuário',
            avatar: 'url',
        },
        rate: 4,
        message: 'Avaliação do cliente lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        date: '10/10/2024',
        imgs: [
            'url1', 'url2', 'url3'
        ]
    },
    {
        user: {
            name: 'Nome do usuário',
            avatar: 'url',
        },
        rate: 4,
        message: 'Avaliação do cliente lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        date: '10/10/2024',
        imgs: [
            'url1', 'url2', 'url3'
        ]
    }
]
import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, ScrollView, View, Animated, Pressable } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState, } from 'moti';
import { Bike, Bone, Brush, Hospital, Minus, Plus, Search, Shirt, BadgeInfo } from 'lucide-react-native';
import { SlidingDot } from "react-native-animated-pagination-dots";
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import { useNavigation } from '@react-navigation/native';

import services from '@data/services';
import { getOffers } from '@request/service';

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);

    const campanhas = [
        {
            id: 1,
            title: 'Troque Pontos por serviços ou produtos',
            label: 'Acumule Pontos através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
            img: require('@imgs/dog1.png'),
        },
        {
            id: 2,
            title: 'Troque Pontos por serviços ou produtos',
            label: 'Acumule Pontos através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
            img: require('@imgs/dog2.png'),
        },

    ]
    const ofertas = [
        {
            id: 1,
            img: require('@imgs/amazon.png'),
            title: 'Amazon',
            label: 'A partir de 40 Pontos',
            color: '#',
        },
        {
            id: 2,
            img: require('@imgs/petiko.png'),
            title: 'Petiko',
            label: 'A partir de 40 Pontos',
            color: '#',
        },
        {
            id: 3,
            img: require('@imgs/cobasi.png'),
            title: 'Cobasi',
            label: 'A partir de 40 Pontos',
            color: '#',
        },
    ]

    const estabelecimentos = [
        {
            id: 1,
            title: 'Petlove',
            label: 'Produtos para pets',
            img: require('@imgs/petlove.png')
        },
        {
            id: 2,
            title: 'Petz',
            label: 'Produtos para pets',
            img: require('@imgs/petz.png')
        }
    ]


    const a = false

    const [showMenu, setShowMenu] = useState(false);
    const menu = useAnimationState({
        open: { height: 260, },
        close: { height: 120, },
    })

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        showMenu ? menu.transitionTo('close') : menu.transitionTo('open')
    }



    const [offers, setoffers] = useState();
    useEffect(() => {
        getOffers().then((res) => {
            setoffers(res)
        })
    }, [])

    return (
        <Main style={{ backgroundColor: "#fff" }}>
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <MotiImage delay={300} from={{ opacity: 0, translateX: -40, scale: 0, }} animate={{ opacity: 1, translateX: 0, scale: 1, }} transition={{ type: 'spring' }} source={require('@imgs/logo_black_nobg.png')} style={{ width: 100, height: 40, objectFit: 'contain', }} />

                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Notify />
                        <Column style={{ width: 16, }} />
                        <Avatar />
                    </Row>
                </Row>
                <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing' }}>
                    <Button onPress={() => { navigation.navigate('SearchModal', { type: 'ONG' }) }} style={{ borderRadius: 30, opacity: .7, borderWidth: 2, marginVertical: 24, borderColor: color.secundary + 20, backgroundColor: color.secundary + 20, paddingVertical: 12, paddingHorizontal: 8, marginHorizontal: margin.h, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, }}>
                            <Title style={{ fontSize: 20, fontFamily: font.medium, color: color.secundary, }}>Pesquisar</Title>
                            <Search strokeWidth={2} color={color.secundary} />
                        </Row>
                    </Button>
                </MotiView>

                <MotiView state={menu} transition={{ type: 'timing', duration: 500, }}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('Notafiscal') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/nota.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Nota fiscal</Label>
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('CampaignsPontos') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/pontos.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Pontos</Label>
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('CampaignsGiftCard') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/gift.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Gift Card</Label>
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={toggleMenu} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <Row>
                                    {showMenu ? <Minus size={32} color={color.primary} /> : <Plus size={32} color={color.primary} />}
                                </Row>
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>{showMenu ? 'Menos' : 'Mais'}</Label>
                        </Column>
                    </Row>


                    <AnimatePresence>

                        {showMenu &&
                            <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} exit={{ opacity: 0, translateY: 20, }} transition={{ type: 'timing', duration: 300, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Notafiscal') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                            <MotiImage source={require('@icons/nota.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Nota fiscal</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('CampaignsPontos') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                            <MotiImage source={require('@icons/pontos.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Pontos</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('CampaignsGiftCard') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                            <MotiImage source={require('@icons/gift.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Gift Card</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Ranking') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                            <MotiImage source={require('@icons/rank.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Ranking</Label>
                                    </Column>
                                </Row>
                            </MotiView>
                        }
                    </AnimatePresence>

                </MotiView>



                <Carrousel color={color} type="home" />

                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 20, borderTopLeftRadius: 32, }}>
                    <Title style={{ marginTop: 8, fontSize: 22, }}>Campanhas</Title>

                    <FlatList
                        style={{ marginVertical: 12, marginHorizontal: - margin.h, }}
                        data={campanhas}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => (
                            <Button style={{ backgroundColor: "#fff", borderRadius: 24, marginRight: 12, }} onPress={() => { navigation.navigate('Shop') }}>
                                <Column>
                                    <MotiImage source={item?.img} style={{ width: 300, height: 400, borderRadius: 24, }} />
                                    <Column style={{ backgroundColor: '#fff', marginHorizontal: 24, padding: 12, borderRadius: 24, position: 'absolute', bottom: 20, }}>
                                        <Title style={{ textAlign: 'center', marginTop: 6, }}>{item.title}</Title>
                                        <Label style={{ textAlign: 'center', marginTop: 12, color: color.title, fontFamily: font.medium, fontSize: 16, marginBottom: 12, }}>{item.label}</Label>
                                        <Title style={{ backgroundColor: color.primary, borderRadius: 100, fontSize: 12, paddingVertical: 4, paddingHorizontal: 12, textAlign: 'center', alignSelf: 'center', color: '#fff', }}>Ver estabelecimentos parceiros</Title>
                                    </Column>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />

                </Column>

                
                
                <OffersCards data={offers} />





                <Column style={{ paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 15, backgroundColor: color.background, }}>
                    <Title style={{ fontSize: 22, }}>Estabelecimentos queridinhos</Title>
                </Column>

                <FlatList style={{ backgroundColor: color.background, }}
                    data={estabelecimentos}
                    ListFooterComponent={<Column style={{ width: 24 }} />}
                    ListHeaderComponent={<Column style={{ width: 24 }} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item }) => (
                        <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopSingle', { item: item }) }} >
                            <Column>
                                <MotiImage source={item.img} style={{ width: 200, height: 60, objectFit: 'cover', borderRadius: 8, }} />
                                <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 18, }}>{item.title}</Title>
                                <Label style={{ textAlign: 'center', color: color.title, fontFamily: font.medium, fontSize: 14, }}>{item.label}</Label>
                            </Column>
                        </Button>
                    )}
                    keyExtractor={item => item.id}
                />



                <Column style={{ backgroundColor: color.background, paddingTop: 10, }}>
                    <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, fontSize: 22, }}>Serviços em oferta</Title>
                    <FlatList
                        data={services}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => (
                            <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { item: item }) }}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <MotiImage source={{ uri: item.img }} style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                    <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 15, lineHeight: 18, }}>{item.title.length > 10 ? item.title.slice(0, 11) + '...' : item.title}</Title>
                                    <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 14, marginTop: 3, color: color.title, fontFamily: font.medium, marginBottom: 12, }}>{item.label}</Label>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />
                </Column>

                {a && <Column style={{ backgroundColor: color.background, paddingTop: 20, }} >
                    <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, }}>Gift Card com cashback</Title>
                    <Carrousel type="gift" />
                </Column>}



                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingTop: 20, }}>
                    <Title style={{ fontSize: 22, }}>Categorias</Title>
                    <FlatList
                        data={categories}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        keyExtractor={item => item.id}
                        style={{ marginVertical: margin.v, marginTop: 0, }}
                        renderItem={({ item }) => (
                            <Button style={{ borderBottomWidth: 1, borderColor: color.off, paddingVertical: 12, borderRadius: 6, }} onPress={() => { navigation.navigate('Shop', { type: item, }) }}>
                                <Row style={{ alignItems: 'center', }}>
                                    <Column style={{ width: 62, height: 62, borderRadius: 10, marginRight: 12, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                                        {item.icon}
                                    </Column>
                                    <Column style={{ justifyContent: 'center', }}>
                                        <Title style={{ fontSize: 18, lineHeight: 20, }}>{item.title}</Title>
                                        <Label style={{ marginTop: 2, color: color.title, fontFamily: font.medium, fontSize: 14, }}>{item.desc}</Label>
                                    </Column>
                                </Row>
                            </Button>
                        )}
                    />
                </Column>


                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, backgroundColor: color.background, paddingBottom: 100, paddingTop: 10, }}>
                    <Button onPress={() => { navigation.navigate('AccountFAQ') }} style={{ borderWidth: 2, borderColor: '#111', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, }}>
                        <Label style={{ fontFamily: font.bold, color: '#111', fontSize: 16, }}>Central de ajuda</Label>
                    </Button>
                    <Button onPress={() => { navigation.navigate('Donate',) }} style={{ borderWidth: 2, borderColor: color.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, }}>
                        <Label style={{ fontFamily: font.bold, color: color.primary, fontSize: 16, }}>Fazer doação</Label>
                    </Button>
                </Row>
                <Column style={{ height: 50, }} />
            </Scroll>

        </Main>
    )
}

const categories = [
    {
        id: 12,
        title: 'Serviços Pet',
        desc: '30 estabelecimentos parceiros',
        icon: <Bone size={28} color="#FFF2E3" />,
    },
    {
        id: 2,
        title: 'Vestuário',
        desc: '43 estabelecimentos parceiros',
        icon: <Shirt size={28} color="#FFF2E3" />,
    },
    {
        id: 3,
        title: 'Esportivo',
        desc: '15 estabelecimentos parceiros',
        icon: <Bike size={28} color="#FFF2E3" />,
    },
    {
        id: 4,
        title: 'Farmácia',
        desc: '27 estabelecimentos parceiros',
        icon: <Hospital size={28} color="#FFF2E3" />,
    },
    {
        id: 5,
        title: 'Cuidados estéticos',
        desc: '29 estabelecimentos parceiros',
        icon: <Brush size={28} color="#FFF2E3" />,
    },
]


export const Carrousel = ({ type }) => {
    const flat = useRef();
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const route = type === 'doe' ? 'DonateHide' : type === 'gift' ? 'CampaignsGiftCard' : 'ShopSingle'
    const { color, font, margin } = useContext(ThemeContext)
    const render = ({ item }) => {
        const link = item.img
        return (
            <Button onPress={() => { navigation.navigate(route) }}  >
                <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12 }} />
            </Button>
        )
    }

    const data = type == 'gift' ? gift : type == 'doe' ? doe : type == 'home' ? home : home

    const home = [
        { id: 1, title: '1', img: require('@imgs/carrousel1.png') },
        { id: 2, title: '2', img: require('@imgs/carrousel2.png') },
        { id: 3, title: '3', img: require('@imgs/carrousel3.png') },
    ]
    const gift = [
        { id: 1, title: '1', img: require('@imgs/gift1.png') },
        { id: 2, title: '2', img: require('@imgs/gift2.png') },
        { id: 3, title: '2', img: require('@imgs/gift2.png') },
    ]
    const doe = [
        { id: 1, title: '1', img: require('@imgs/doe1.png') },
        { id: 2, title: '2', img: require('@imgs/doe2.png') },
        { id: 3, title: '2', img: require('@imgs/doe2.png') },
    ]

    const [scrollPosition, setScrollPosition] = useState(0);

   
    const a = false;

    return (

        <Column>

            <FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
                ref={flat}
                decelerationRate={'fast'}
                scrollEventThrottle={16}
                data={type == 'gift' ? gift : type == 'doe' ? doe : type == 'home' ? home : home}
                renderItem={render}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<View style={{ width: 28 }} />}
                ListFooterComponent={<View style={{ width: 28 }} />}
                style={{ marginBottom: 32, }}
                snapToAlignment='center'
                pagingEnabled

            />
            {a &&
            <SlidingDot
                data={[1,2,3]}
                expandingDotWidth={30}
                scrollX={scrollX}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 5
                }}
                activeDotColor={color.secundary}
                inActiveDotColor={color.secundary+90}
                />
            }
        </Column>
    )
}


const OffersCards = ({ data }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <>
            <Row style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ fontSize: 22, }}>Ofertas relâmpago</Title>
                <Pressable onPress={() => {navigation.navigate('Shop')}} >
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 16, }}>Ver mais</Label>
                </Pressable>
            </Row>
            <FlatList
                data={data}
                ListFooterComponent={
                    <Column style={{marginRight: 28, backgroundColor: color.primary+20, paddingBottom: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20,}} >
                        <Button onPress={() => { navigation.navigate('Shop') }} style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, backgroundColor: color.primary, width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20,   }}>
                            <Label style={{ color: '#fff', fontFamily: font.bold, fontSize: 16, textAlign: 'center', }}>Ver mais {'\n'}Ofertas</Label>
                        </Button>
                    </Column>
                }
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ backgroundColor: color.background, }}
                renderItem={({ item }) => (
                    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                        <Column style={{ justifyContent: 'center', width: 124, }}>
                            <MotiImage source={{ uri: item.img }} style={{ width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, objectFit: 'cover', backgroundColor: "#fff", }} />
                            <Row style={{ backgroundColor: '#d7d7d7', }}>
                                <Column style={{ backgroundColor: color.primary, height: 4, width: item?.sell_porcentage + '%', }} />
                            </Row>
                            <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item.name.slice(0, 42)}</Title>
                            <Row style={{}}>
                                <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>

                            <Title style={{ color: "#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                        </Column>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
        </>
    )
}







/*

*/
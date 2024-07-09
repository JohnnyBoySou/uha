import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList,  Dimensions, Pressable, Animated } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState, } from 'moti';
import { Bike, Bone, Brush, Car, Hospital, Indent, Minus, Pizza, Plus, Search, Shirt, ShoppingBag, Ticket } from 'lucide-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Avatar from '@components/avatar';
import Notify from '@components/notify';

import { getOffers, getShops, getServices, } from '@request/shop/index';
import { getListCategory } from '@api/request/category';

import { MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { Skeleton } from 'moti/skeleton';
import { ExpandingDot } from "react-native-animated-pagination-dots";

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
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
    const [shops, setshops] = useState();
    const [services, setservices] = useState();
    const [loading, setloading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const offer = await getOffers();
                const shop = await getShops();
                const service = await getServices(); 
                setoffers(offer);
                setshops(shop);
                setservices(service);

            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Main style={{ backgroundColor: "#fff" }}>
            <StatusBar style="dark" backgroundColor="#fff" animated={true} />
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <MotiImage source={require('@imgs/logo_black_nobg.png')} style={{ width: 100, height: 40, objectFit: 'contain', }} />
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Notify />
                        <Column style={{ width: 16, }} />
                        <Avatar />
                    </Row>
                </Row>

                <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Search' }) }} style={{ borderRadius: 100, marginVertical: 24, backgroundColor: color.primary + 20, paddingVertical: 12, paddingHorizontal: 8, marginHorizontal: margin.h, }}>
                    <Row style={{ alignItems: 'center', paddingHorizontal: 4, }}>
                        <Column from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 48, height: 48, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                            <Search strokeWidth={2} color="#fff" size={24} />
                        </Column>
                        <Column style={{ justifyContent: 'center', marginLeft: 16, }}>
                            <Title style={{ fontSize: 18, fontFamily: font.medium, marginTop: 4, marginBottom: -2, lineHeight: 18, color: color.secundary, }}>Pesquisar</Title>
                            <Label style={{ fontSize: 12, color: color.secundary + 99, }}>Ofertas - Estabelecimentos - ONGs</Label>
                        </Column>
                    </Row>
                </Button>

                <MotiView state={menu} style={{ overflow: 'hidden' }} transition={{type: 'timing'}}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('Notafiscal') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <MaterialCommunityIcons name="clipboard-edit-outline" size={34} color={color.primary} />
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Nota fiscal</Label>
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('Donate') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/pontos.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Doação</Label>
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('Shop') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <ShoppingBag color={color.primary} size={32} strokeWidth={2} />
                            </Button>
                            <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Shop</Label>
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
                                        <Button onPress={() => { navigation.navigate('Raspadinhas') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                            <FontAwesome5 name="hand-sparkles" size={30} color={color.primary} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Raspadinhas</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Ranking') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                            <AntDesign name="staro" size={32} color={color.primary} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Ranking</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Favorites') }} rippleColor={color.secundary} style={{ padding: 18, borderRadius: 12, backgroundColor: color.primary + 20, }}>
                                            <AntDesign name="hearto" size={32} color={color.primary} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Favoritos</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Rifas') }} rippleColor={color.secundary} style={{ padding: 18, borderRadius: 12, backgroundColor: color.primary + 20, }}>
                                            <Ionicons name="ticket-outline" size={28} color={color.primary} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Rifas</Label>
                                    </Column>
                                </Row>
                            </MotiView>
                        }
                    </AnimatePresence>

                </MotiView>

                <Carrousel color={color} type="home" />

                <OffersCards data={offers} loading={loading} />

                <Queridinhos data={shops} loading={loading} />

                <Donate />

                <Servicos data={services} loading={loading} />

                <Categorias />

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, backgroundColor: color.background, paddingBottom: 100, paddingTop: 10, }}>
                    <Button onPress={() => { navigation.navigate('AccountFAQ') }} style={{ borderWidth: 2, borderColor: color.secundary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, }}>
                        <Label style={{ fontFamily: font.bold, color: color.secundary, fontSize: 16, }}>Central de ajuda</Label>
                    </Button>
                    <Button onPress={() => { navigation.navigate('Donate',) }} style={{ backgroundColor: color.primary + 20, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, }}>
                        <Label style={{ fontFamily: font.bold, color: color.primary, fontSize: 16, }}>Fazer doação</Label>
                    </Button>
                </Row>

                <Column style={{ height: 50, }} />
            </Scroll>
        </Main>
    )
}


const Categorias = () => {
    const iconComponents = {
        "<Bone size={28} color=\"#FFF2E3\" />": <Bone size={28} color="#FFF2E3" />,
        "<Brush size={28} color=\"#FFF2E3\" />": <Brush size={28} color="#FFF2E3" />,
        "<Pizza size={28} color=\"#FFF2E3\" />": <Pizza size={28} color="#FFF2E3" />,
        "<Car size={28} color=\"#FFF2E3\" \/>": <Car size={28} color="#FFF2E3" />,
        "<Shirt size={28} color=\"#FFF2E3\" />": <Shirt size={28} color="#FFF2E3" />,
        "<Bike size={28} color=\"#FFF2E3\" />": <Bike size={28} color="#FFF2E3" />,
        "<Hospital size={28} color=\"#FFF2E3\" \/>": <Hospital size={28} color="#FFF2E3" />
    };

    const transformIcon = (iconString) => {
        return iconComponents[iconString] || null;
    };

    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    const { color, margin, font } = useContext(ThemeContext);
    const isFocused = useIsFocused();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getListCategory();
                const transformedData = res.map(item => ({
                    ...item,
                    icon: transformIcon(item.icon)
                }));
                setCategories(transformedData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused]);

    return (
        <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingTop: 20, }}>
            <Title style={{ fontSize: 22, }}>Categorias</Title>
            <FlatList
                data={categories}
                ListFooterComponent={<Column style={{ width: 24 }} />}
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                keyExtractor={item => item.id}
                style={{ marginVertical: margin.v, marginTop: 0, }}
                renderItem={({ item }) => (
                    <Button style={{ borderBottomWidth: 1, borderColor: color.off, paddingVertical: 12, borderRadius: 6, }} onPress={() => { navigation.navigate('CategorySingle', { item: item, id: item.id, icon: item.icon, }) }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Column style={{ width: 62, height: 62, borderRadius: 10, marginRight: 12, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                                {item?.icon}
                            </Column>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title style={{ fontSize: 18, lineHeight: 20, }}>{item.name}</Title>
                                <Label style={{ marginTop: 2, color: color.title, fontFamily: font.medium, fontSize: 14, }}>{item.estabelecimentos} estabelecimentos parceiros</Label>
                            </Column>
                        </Row>
                    </Button>
                )}
            />
        </Column>
    )
}

export const Carrousel = () => {
    const navigation = useNavigation();
    const { color, margin, font, } = useContext(ThemeContext);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;


    const render = ({ item }) => {
        const link = item.img;
        return (
            <Column style={{ width: width, justifyContent: 'center', alignItems: 'center', }}>
                <Button onPress={() => { navigation.navigate(item?.route) }} style={{ borderRadius: 24, }}>
                    <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12 }} />
                </Button>
            </Column>
        );
    };

    const home = [
        { id: '2', title: '2', img: require('@imgs/carrousel2.png'), route: 'Notafiscal' },
        { id: '3', title: '3', img: require('@imgs/carrousel3.png'), route: 'ShopOffers' },
    ];

    return (
        <Column>
            <FlatList
                ref={flatListRef}
                decelerationRate={'fast'}
                scrollEventThrottle={16}
                data={home}
                renderItem={render}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment='center'
                pagingEnabled
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
            />
            <Column style={{ backgroundColor: color.secundary + 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 3, alignSelf: 'center', marginTop: 10, marginBottom: 14, }}>
                <ExpandingDot
                    data={home}
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
        </Column>
    );
};

const OffersCards = ({ data, loading }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Column style={{ backgroundColor: color.background, borderTopLeftRadius: 32, }}>
            <Row style={{ paddingHorizontal: margin.h, paddingVertical: 16, justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ fontSize: 22, }}>Ofertas relâmpago</Title>
                <Button onPress={() => { navigation.navigate('ShopOffers') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 8, paddingHorizontal: 16, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14, }}>Ver mais</Label>
                </Button>
            </Row>

            {loading ?
                <Row style={{ marginHorizontal: margin.h, }}>
                    <Column style={{ marginRight: 12, }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={18} width={80} />
                    </Column>
                    <Column style={{ marginRight: 12, }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={18} width={80} />
                    </Column>
                    <Column style={{ marginRight: 12, }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={18} width={80} />
                    </Column>
                </Row>
                :
                <FlatList
                    data={data}
                    ListFooterComponent={
                        <Column style={{ marginRight: 28, backgroundColor: color.primary + 20, paddingBottom: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20, }} >
                            <Button onPress={() => { navigation.navigate('ShopOffers') }} style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, backgroundColor: color.primary, width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                                <Label style={{ color: '#fff', fontFamily: font.bold, fontSize: 16, textAlign: 'center', }}>Ver mais {'\n'}Ofertas</Label>
                            </Button>
                        </Column>
                    }
                    ListHeaderComponent={<Column style={{ width: 24 }} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{ backgroundColor: color.background, }}
                    renderItem={({ item }) => (
                        <Button style={{ marginRight: 12, borderRadius: 8, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                            <Column style={{ justifyContent: 'center', width: 124, }}>
                                <MotiImage source={{ uri: item.img }} style={{ width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, objectFit: 'cover', backgroundColor: "#fff", }} />
                                <Row style={{ backgroundColor: '#d7d7d7', }}>
                                    <Column style={{ backgroundColor: color.primary, height: 4, width: item?.sell_porcentage + '%', }} />
                                </Row>
                                <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item.name.length > 32 ? item?.name.slice(0, 42) + '...' : item?.name}</Title>
                                <Row style={{}}>
                                    <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value.slice(0, -3)}</Title>
                                    <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                                </Row>
                                <Row>
                                    <Title style={{ color: "#000", fontSize: 12, marginTop: -6, marginRight: 4, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value?.slice(0, -3)}</Title>
                                    <Title style={{ color: "#000", fontSize: 8, lineHeight: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>pontos</Title>
                                </Row>
                            </Column>
                        </Button>
                    )}
                    keyExtractor={item => item.id}
                />}
        </Column>
    )
}

const Queridinhos = ({ data, loading }) => {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Column style={{ backgroundColor: color.background, }}>
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 15, backgroundColor: color.background, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title style={{ fontSize: 22, }}>Estabelecimentos</Title>
                    <Button onPress={() => { navigation.navigate('Shop') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 8, paddingHorizontal: 16, }}>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14, }}>Ver mais</Label>
                    </Button>
                </Row>
            </Column>

            {loading ?
                <Row style={{ marginHorizontal: margin.h, }}>
                    <Column style={{ marginRight: 12, justifyContent: 'center', alignItems: 'center', }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={240} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                    </Column>
                    <Column style={{ marginRight: 12, justifyContent: 'center', alignItems: 'center', }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={240} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                    </Column>
                </Row> :
                <FlatList style={{ backgroundColor: color.background, }}
                    data={data}
                    ListFooterComponent={<Column style={{ width: 24 }} />}
                    ListHeaderComponent={<Column style={{ width: 24 }} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item }) => (
                        <Button style={{ marginRight: 12, borderRadius: 8, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }} >
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <MotiImage source={{ uri: item.img }} style={{ width: 200, height: 100, objectFit: 'cover', borderRadius: 8, }} />
                                <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 18, }}>{item?.name}</Title>
                                <Label style={{ textAlign: 'center', color: color.secundary + 99, fontFamily: font.medium, fontSize: 14, lineHeight: 15, width: 180, marginTop: 0, }}>{item?.descri?.length > 42 ? item?.descri.slice(0, 42) + '...' : item?.descri}</Label>
                            </Column>
                        </Button>
                    )}
                    keyExtractor={item => item.id}
                />}
        </Column>
    )
}

const Servicos = ({ data, loading }) => {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Column style={{ backgroundColor: color.background, paddingTop: 10, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, fontSize: 22, }}>Troque seus pontos</Title>
                <Pressable onPress={() => { navigation.navigate('Shop') }} style={{ marginRight: 28, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 16, }}>Ver mais</Label>
                </Pressable>
            </Row>
            {loading ?
                <Row style={{ marginHorizontal: margin.h, }}>
                    <Column style={{ marginRight: 12, }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={18} width={80} />
                    </Column>
                    <Column style={{ marginRight: 12, }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={18} width={80} />
                    </Column>
                    <Column style={{ marginRight: 12, }}>
                        <Skeleton colorMode="light" radius={12} height={120} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={24} width={120} />
                        <Column style={{ height: 6, }} />
                        <Skeleton colorMode="light" radius={6} height={18} width={80} />
                    </Column>
                </Row>
                :
                <FlatList
                    data={data}
                    ListFooterComponent={<Column style={{ width: 24 }} />}
                    ListHeaderComponent={<Column style={{ width: 24 }} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item }) => (
                        <Button style={{ marginRight: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <MotiImage source={{ uri: item.img }} style={{ width: 112, height: 112, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, lineHeight: 18, }}>{item.title?.length > 10 ? item?.title?.slice(0, 11) + '...' : item?.title}</Title>
                                <Label style={{ textAlign: 'center', width: 84, fontSize: 14, lineHeight: 15, marginTop: 3, color: color.secundary + 99, fontFamily: font.medium, marginBottom: 12, }}>{item.label}</Label>
                            </Column>
                        </Button>
                    )}
                    keyExtractor={item => item.id}
                />}
        </Column>
    )
}

const Donate = () => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const windowWidth = 300;
    const scrollX = useRef(new Animated.Value(0)).current;

    const activyColor = '#5C0D45';
    const inactivyColor = '#5C0D4570';

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const index = Math.round(value / windowWidth);
            setActiveIndex(index);
        });

        return () => {
            scrollX.removeListener(listener);
        };
    }, [scrollX, windowWidth]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const render = ({ item }) => {
        const link = item.img;
        return (
            <Column style={{ width: width, justifyContent: 'center', alignItems: 'center', }}>
                <Button onPress={() => { navigation.navigate(item?.route) }} style={{ borderRadius: 24, marginRight: 12 }}>
                    <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, }} />
                </Button>
            </Column>
        );
    };

    const home = [
        { id: '1', title: '1', img: require('@imgs/doe1.png'), route: 'DonateHide' },
        { id: '2', title: '2', img: require('@imgs/doe2.png'), route: 'DonateHide' },
    ];

    return (
        <Column style={{ backgroundColor: color.background, paddingTop: 30, }}>
            <Title style={{ marginLeft: 28, marginBottom: 14, fontSize: 22, }}>Doe anonimamente</Title>
            <FlatList
                ref={flatListRef}
                decelerationRate={'fast'}
                scrollEventThrottle={16}
                data={home}
                renderItem={render}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment='center'
                pagingEnabled
                onScroll={handleScroll}
            />

            <Column style={{ backgroundColor: color.secundary + 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 3, alignSelf: 'center', marginTop: 10, }}>
                <ExpandingDot
                    data={[1, 2]}
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
        </Column>
    );
};
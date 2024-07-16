import React, { useState, useContext, useRef, useEffect, useCallback, useMemo } from 'react';
import { FlatList, Dimensions, Animated, ActivityIndicator, } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';

//icons
import { MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { Bike, Bone, Brush, Car, Hospital, Minus, Pizza, Plus, Search, Shirt, ShoppingBag, } from 'lucide-react-native';

//expo
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

//components
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import { ServicesCards } from '@components/servicesCards';
import { OffersCards } from '@components/offersCards';
import { ShopsCards } from '@components/shopCards';
import { ONGSCards } from '@components/ongsCards';

//apis
import { getOffers, getShops, getServices, } from '@request/shop/index';
import { getListCategory } from '@api/request/category';
import { getONGs } from '@api/request/ongs/ongs';

//libs
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { AnimatePresence, MotiView, useAnimationState, } from 'moti';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);

    const [offerS, setOffers] = useState([]);
    const [shopS, setShops] = useState([]);
    const [serviceS, setServices] = useState([]);
    const [ongs, setongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [offer, shop, service, ongs] = await Promise.all([getOffers(), getShops(), getServices(), getONGs()]);
                setOffers(offer);
                setShops(shop);
                setServices(service);
                setongs(ongs);
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        fetchData();
    }, []);

    const offers = useMemo(() => offerS, [offerS]);
    const shops = useMemo(() => shopS, [shopS]);
    const services = useMemo(() => serviceS, [serviceS]);

    return (
        <Main style={{ backgroundColor: "#fff" }}>
            <StatusBar style="dark" backgroundColor="#fff" animated={true} />
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <Image source={require('@imgs/logo_black_nobg.png')} transition={1000} contentFit="contain" style={{ width: 100, height: 40,   }} />
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
                <MenuHandle />
                <Carrousel />
                <Column style={{ backgroundColor: color.background, borderTopLeftRadius: 32, borderTopRightRadius: 32, }}>
                    <OffersCards data={offers} loading={loading} />
                    <ShopsCards data={shops} loading={loading} />
                    <Donate />
                    <ServicesCards data={services} loading={loading} />
                    <ONGSCards data={ongs} loading={loading} />
                    <Categorias />
                </Column>

                <Row style={{ justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: margin.h, backgroundColor: color.background, paddingBottom: 100, paddingTop: 10, }}>
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
    const iconComponents = useMemo(() => ({
        "<Bone size={28} color=\"#FFF2E3\" />": <Bone size={28} color="#FFF2E3" />,
        "<Brush size={28} color=\"#FFF2E3\" />": <Brush size={28} color="#FFF2E3" />,
        "<Pizza size={28} color=\"#FFF2E3\" />": <Pizza size={28} color="#FFF2E3" />,
        "<Car size={28} color=\"#FFF2E3\" \/>": <Car size={28} color="#FFF2E3" />,
        "<Shirt size={28} color=\"#FFF2E3\" />": <Shirt size={28} color="#FFF2E3" />,
        "<Bike size={28} color=\"#FFF2E3\" />": <Bike size={28} color="#FFF2E3" />,
        "<Hospital size={28} color=\"#FFF2E3\" \/>": <Hospital size={28} color="#FFF2E3" />
    }), []);

    const transformIcon = useCallback((iconString) => {
        return iconComponents[iconString] || null;
    }, [iconComponents]);
    const [loading, setloading] = useState(true);
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    const { color, margin, font } = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const res = await getListCategory();
                const transformedData = res.map(item => ({
                    ...item,
                    icon: transformIcon(item.icon)
                }));
                setCategories(transformedData);
            } catch (error) {
                console.error(error);
            } finally { setTimeout(() => setloading(false), 2000); }
        };
        fetchData();
    }, [transformIcon]);
    if(loading) return <ActivityIndicator size="large" color={color.primary} />;
    return (
        <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingTop: 20 }}>
            <Title style={{ fontSize: 22 }}>Categorias</Title>
            <FlatList
                data={categories}
                ListFooterComponent={<Column style={{ width: 24 }} />}
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                keyExtractor={item => item.id}
                style={{ marginVertical: margin.v, marginTop: 0 }}
                renderItem={({ item }) => (
                    <Button style={{ borderBottomWidth: 1, borderColor: color.off, paddingVertical: 12, borderRadius: 12 }} onPress={() => { navigation.navigate('CategorySingle', { item: item, id: item.id, icon: item.icon }) }}>
                        <Row style={{ alignItems: 'center',  paddingHorizontal: 4, }}>
                            <Column style={{ width: 62, height: 62, borderRadius: 10, marginRight: 12, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center' }}>
                                {item?.icon}
                            </Column>
                            <Column style={{ justifyContent: 'center' }}>
                                <Title style={{ fontSize: 18, lineHeight: 20 }}>{item.name}</Title>
                                <Label style={{ marginTop: 2, color: color.secundary + 99, fontFamily: font.medium, fontSize: 14 }}>{item.estabelecimentos} estabelecimentos parceiros</Label>
                            </Column>
                        </Row>
                    </Button>
                )}
            />
        </Column>
    );
};

export const Carrousel = () => {
    const navigation = useNavigation();
    const { color } = useContext(ThemeContext);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const render = useCallback(({ item }) => {
        const link = item.img;
        return (
            <Column style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => { navigation.navigate(item?.route) }} style={{ borderRadius: 24 }}>
                    <Image source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12 }} />
                </Button>
            </Column>
        );
    }, [navigation]);

    const home = useMemo(() => [
        { id: '2', title: '2', img: require('@imgs/carrousel2.png'), route: 'Notafiscal' },
        { id: '3', title: '3', img: require('@imgs/carrousel3.png'), route: 'ShopOffers' },
    ], []);

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
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
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

const Donate = () => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const render = useCallback(({ item }) => {
        const link = item.img;
        return (
            <Column style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => { navigation.navigate('DonateHide') }} style={{ borderRadius: 24, }}>
                    <Image source={link} style={{ width: width * 0.86, height: 170,   borderRadius: 24 }} />
                </Button>
            </Column>
        );
    }, [navigation]);

    const home = useMemo(() => [
        { id: '1', title: '1', img: require('@imgs/doe1.png') },
        { id: '2', title: '2', img: require('@imgs/doe2.png') },
    ], []);

    return (
        <Column style={{ backgroundColor: color.background, paddingTop: 30, paddingBottom: 2, marginBottom: -2 }}>
            <Title style={{ marginLeft: 28, marginBottom: 14, fontSize: 22 }}>Doe anonimamente</Title>
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

const MenuHandle = () => {
    const navigation = useNavigation();
    const { color, margin, font } = useContext(ThemeContext);
    const [showMenu, setShowMenu] = useState(false);
    const menu = useAnimationState({
        open: { height: 260, },
        close: { height: 120, },
    })
    const toggleMenu = useCallback(() => {
        setShowMenu(prevShowMenu => !prevShowMenu);
        showMenu ? menu.transitionTo('close') : menu.transitionTo('open');
    }, [showMenu, menu]);

    const mainMenuItems = useMemo(() => [
        {
            onPress: () => navigation.navigate('Notafiscal'),
            icon: <MaterialCommunityIcons name="clipboard-edit-outline" size={34} color={color.primary} />,
            label: 'Nota fiscal',
        },
        {
            onPress: () => navigation.navigate('Donate'),
            icon: <Image source={require('@icons/pontos.png')} resizeMode='contain' style={{ width: 34, height: 34 }} />,
            label: 'Doação',
        },
        {
            onPress: () => navigation.navigate('Shop'),
            icon: <ShoppingBag color={color.primary} size={32} strokeWidth={2} />,
            label: 'Shop',
        },
    ], [navigation, color]);

    const extraMenuItems = useMemo(() => [
        {
            onPress: () => navigation.navigate('Raspadinhas'),
            icon: <FontAwesome5 name="hand-sparkles" size={30} color={color.primary} />,
            label: 'Raspadinhas',
        },
        {
            onPress: () => navigation.navigate('Ranking'),
            icon: <AntDesign name="staro" size={32} color={color.primary} />,
            label: 'Ranking',
        },
        {
            onPress: () => navigation.navigate('Favorites'),
            icon: <AntDesign name="hearto" size={32} color={color.primary} />,
            label: 'Favoritos',
        },
        {
            onPress: () => navigation.navigate('Rifas'),
            icon: <Ionicons name="ticket-outline" size={28} color={color.primary} />,
            label: 'Rifas',
        },
    ], [navigation, color]);
    return (
        <MotiView state={menu} style={{ overflow: 'hidden' }} transition={{ type: 'timing' }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24 }}>
                {mainMenuItems.map((item, index) => (
                    <Column key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button onPress={item.onPress} rippleColor={color.secundary} style={{ backgroundColor: `${color.primary}20`, padding: 18, borderRadius: 12 }}>
                            {item.icon}
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.secundary, textAlign: 'center' }}>{item.label}</Label>
                    </Column>
                ))}
                <Column style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={toggleMenu} rippleColor={color.secundary} style={{ backgroundColor: `${color.primary}20`, padding: 18, borderRadius: 12 }}>
                        <Row>
                            {showMenu ? <Minus size={32} color={color.primary} /> : <Plus size={32} color={color.primary} />}
                        </Row>
                    </Button>
                    <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.secundary, textAlign: 'center' }}>{showMenu ? 'Menos' : 'Mais'}</Label>
                </Column>
            </Row>

            <AnimatePresence>
                {showMenu && (
                    <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: 20 }} transition={{ type: 'timing', duration: 300 }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24 }}>
                            {extraMenuItems.map((item, index) => (
                                <Column key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={item.onPress} rippleColor={color.secundary} style={{ backgroundColor: `${color.primary}20`, padding: 18, borderRadius: 12 }}>
                                        {item.icon}
                                    </Button>
                                    <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.secundary, textAlign: 'center' }}>{item.label}</Label>
                                </Column>
                            ))}
                        </Row>
                    </MotiView>
                )}
            </AnimatePresence>
        </MotiView>
    )
}
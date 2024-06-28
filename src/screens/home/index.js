import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, View, Dimensions, Pressable, Animated } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState, } from 'moti';
import { Bike, Bone, Brush, Car, Hospital, Indent, Minus, Pizza, Plus, Search, Shirt, ShoppingBag, Ticket } from 'lucide-react-native';
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import Internet from '@components/internet';
import { useNavigation } from '@react-navigation/native';
import { getOffers, getShops, getServices, getCampaigns } from '@request/service';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import campanhas from '@data/campanhas';
import { StatusBar } from 'expo-status-bar';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


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
    useEffect(() => {
        getOffers().then((res) => {
            setoffers(res)
        })
        getShops().then((res) => {
            setshops(res)
        })
        getServices().then((res) => {
            setservices(res)
        })
    }, [])

    return (
        <Main style={{ backgroundColor: "#fff" }}>
            <Internet />
            <StatusBar style="dark"  backgroundColor="#fff" animated={true}/>
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <MotiImage delay={300} from={{ opacity: 0, translateX: -40, scale: 0, }} animate={{ opacity: 1, translateX: 0, scale: 1, }} transition={{ type: 'spring' }} source={require('@imgs/logo_black_nobg.png')} style={{ width: 100, height: 40, objectFit: 'contain', }} />
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Notify />
                        <Column style={{ width: 16, }} />
                        <Avatar />
                    </Row>
                </Row>

                <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing' }} delay={300}>
                    <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Search'}) }} style={{ borderRadius: 100, marginVertical: 24, backgroundColor: color.primary + 20, paddingVertical: 12, paddingHorizontal: 8, marginHorizontal: margin.h, }}>
                        <Row style={{ alignItems: 'center', paddingHorizontal: 4, }}>

                            <MotiView from={{opacity: 0, scale: 0,}} animate={{opacity: 1, scale: 1,}} style={{ width: 48, height: 48, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Search strokeWidth={2} color="#fff" size={24} />
                            </MotiView>

                            <Column style={{ justifyContent: 'center', marginLeft: 16, }}>
                                <Title style={{ fontSize: 18, fontFamily: font.medium, marginTop: 4, marginBottom: -2, lineHeight: 18, color: color.secundary, }}>Pesquisar</Title>
                                <Label style={{ fontSize: 12, color: color.secundary + 99, }}>Serviços - Estabelecimentos - ONGs</Label>
                            </Column>
                        </Row>
                    </Button>
                </MotiView>

                <MotiView state={menu} transition={{ type: 'timing', duration: 500, }} from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ overflow: 'hidden' }}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Button onPress={() => { navigation.navigate('Notafiscal') }} rippleColor={color.secundary} style={{ backgroundColor: color.primary + 20, padding: 18, borderRadius: 12, }}>
                                <MaterialCommunityIcons name="note-edit-outline" size={34} color={color.primary} />
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
                                <ShoppingBag color={color.primary} size={32}  strokeWidth={2}/>
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
                                            <MotiImage source={require('@icons/rank.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Ranking</Label>
                                    </Column>
                                    
                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Favorites') }} rippleColor={color.secundary} style={{  padding: 18, borderRadius: 12, backgroundColor: color.primary + 20,}}>
                                            <MotiImage source={require('@icons/heart.png')} style={{ width: 34, objectFit: 'contain', height: 34, }} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Favoritos</Label>
                                    </Column>

                                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Button onPress={() => { navigation.navigate('Rifas') }} rippleColor={color.secundary} style={{ padding: 18, borderRadius: 12,  backgroundColor: color.primary + 20, }}>
                                            <Ionicons name="ticket-outline" size={28} color={color.primary} />
                                        </Button>
                                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 12, color: color.title, textAlign: 'center' }}>Rifas</Label>
                                    </Column>
                                </Row>
                            </MotiView>
                        }
                    </AnimatePresence>

                </MotiView>

                <MotiView from={{ opacity: 0, translateX: 40 }} animate={{ opacity: 1, translateX: 0, }} delay={800}>
                    <Carrousel color={color} type="home" />
                </MotiView>

                <MotiView from={{ opacity: 0, translateY: 40 }} animate={{ opacity: 1, translateY: 0, }} delay={1000}>
                    <Campanhas data={campanhas} />
                </MotiView>

                <OffersCards data={offers} />

                <Queridinhos data={shops} />

                <Donate/>

                <Servicos data={services} />

                <Categorias />

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

const Campanhas = ({ data }) => {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 20, borderTopLeftRadius: 32, }}>
            <Title style={{ marginTop: 8, fontSize: 22, }}>Campanhas</Title>
            <FlatList
                style={{ marginVertical: 12, marginHorizontal: - margin.h, }}
                data={data}
                ListFooterComponent={<Column style={{ width: 24 }} />}
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <Button style={{ backgroundColor: "#fff", borderRadius: 24, marginRight: 12, }} onPress={() => { navigation.navigate('Shop') }}>
                        <Column>
                            <MotiImage source={item?.img} style={{ width: 300, height: 400, borderRadius: 24, }} />
                            <Column style={{ backgroundColor: '#fff', marginHorizontal: 24, padding: 12, borderRadius: 24, position: 'absolute', bottom: 20, }}>
                                <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 20, lineHeight: 20, }}>{item.title}</Title>
                                <Label style={{ textAlign: 'center', marginTop: 6,  color: color.secundary+99, fontFamily: font.medium, fontSize: 14, marginBottom: 12, }}>{item.label}</Label>
                                <Title style={{ backgroundColor: color.primary, borderRadius: 100, fontSize: 14, paddingVertical: 4, paddingHorizontal: 12, textAlign: 'center', alignSelf: 'center', color: '#fff', }}>Ver estabelecimentos</Title>
                            </Column>
                        </Column>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />

        </Column>
    )
}

const Categorias = () => {
    const categories = [
        {
            id: 12,
            name: 'Serviços Pet',
            desc: '30 estabelecimentos parceiros',
            icon: <Bone size={28} color="#FFF2E3" />,
        },
        {
            id: 2,
            name: 'Vestuário',
            desc: '43 estabelecimentos parceiros',
            icon: <Shirt size={28} color="#FFF2E3" />,
        },
        {
            id: 3,
            name: 'Esportivo',
            desc: '15 estabelecimentos parceiros',
            icon: <Bike size={28} color="#FFF2E3" />,
        },
        {
            id: 4,
            name: 'Farmácia',
            desc: '27 estabelecimentos parceiros',
            icon: <Hospital size={28} color="#FFF2E3" />,
        },
        {
            id: 5,
            name: 'Cuidados estéticos',
            desc: '29 estabelecimentos parceiros',
            icon: <Brush size={28} color="#FFF2E3" />,
        },
        {
            id: 15,
            name: 'Comida',
            desc: '12 estabelecimentos parceiros',
            icon: <Pizza size={28} color="#FFF2E3" />,
        },
        {
            id: 16,
            name: 'Veículos',
            desc: '8 estabelecimentos parceiros',
            icon: <Car size={28} color="#FFF2E3" />,
        },
    ]
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
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
                    <Button style={{ borderBottomWidth: 1, borderColor: color.off, paddingVertical: 12, borderRadius: 6, }} onPress={() => { navigation.navigate('Shop', { type: item, }) }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Column style={{ width: 62, height: 62, borderRadius: 10, marginRight: 12, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                                {item.icon}
                            </Column>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title style={{ fontSize: 18, lineHeight: 20, }}>{item.name}</Title>
                                <Label style={{ marginTop: 2, color: color.title, fontFamily: font.medium, fontSize: 14, }}>{item.desc}</Label>
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
            <Button onPress={() => { navigation.navigate(item?.route) }} >
                <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12 }} />
            </Button>
        );
    };

    const home = [
        { id: '1', title: '1', img: require('@imgs/carrousel1.png'), route: 'Share' },
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
                ListHeaderComponent={<View style={{ width: 28 }} />}
                ListFooterComponent={<View style={{ width: 0 }} />}
                snapToAlignment='center'
                pagingEnabled
                onScroll={handleScroll}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 24, }}>
                {home.map((_, index) => {
                    const inputRange = [
                        (index - 1) * windowWidth,
                        index * windowWidth,
                        (index + 1) * windowWidth
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 30, 8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <>
                            <Animated.View
                                key={index}
                                style={{
                                    width: dotWidth,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: index == activeIndex ? activyColor : inactivyColor,
                                    marginHorizontal: 4,
                                }}
                            />
                        </>
                    );
                })}
            </View>
        </Column>
    );
};

const OffersCards = ({ data }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <>
            <Row style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 16, justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ fontSize: 22, }}>Ofertas relâmpago</Title>
                <Pressable onPress={() => { navigation.navigate('ShopOffers') }} >
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 16, }}>Ver mais</Label>
                </Pressable>
            </Row>
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

const Queridinhos = ({ data }) => {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <>
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 15, backgroundColor: color.background, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title style={{ fontSize: 22, }}>Estabelecimentos</Title>
                    <Pressable onPress={() => { navigation.navigate('Shop') }} style={{}}>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 16, }}>Ver mais</Label>
                    </Pressable>
                </Row>
            </Column>

            <FlatList style={{ backgroundColor: color.background, }}
                data={data}
                ListFooterComponent={<Column style={{ width: 24 }} />}
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }} >
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <MotiImage source={{ uri: item.img }} style={{ width: 200, height: 100, objectFit: 'cover', borderRadius: 8, }} />
                            <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 18, }}>{item?.name}</Title>
                            <Label style={{ textAlign: 'center', color: color.secundary + 99, fontFamily: font.medium, fontSize: 14, lineHeight: 15, width: 180, marginTop: 0, }}>{item?.desc.length > 42 ? item?.desc.slice(0, 42) + '...' : item?.desc}</Label>
                        </Column>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
        </>
    )
}

const Servicos = ({ data }) => {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Column style={{ backgroundColor: color.background, paddingTop: 10, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, fontSize: 22, }}>Serviços</Title>
                <Pressable onPress={() => { navigation.navigate('Shop') }} style={{ marginRight: 28, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 16, }}>Ver mais</Label>
                </Pressable>
            </Row>
            <FlatList
                data={data}
                ListFooterComponent={<Column style={{ width: 24 }} />}
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <MotiImage source={{ uri: item.img }} style={{ width: 112, height: 112, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                            <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, lineHeight: 18, }}>{item.title.length > 10 ? item.title.slice(0, 11) + '...' : item.title}</Title>
                            <Label style={{ textAlign: 'center', width: 84, fontSize: 14, lineHeight: 15, marginTop: 3, color: color.secundary + 99, fontFamily: font.medium, marginBottom: 12, }}>{item.label}</Label>
                        </Column>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
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
            <Button onPress={() => { navigation.navigate(item?.route) }} >
                <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12 }} />
            </Button>
        );
    };

    const home = [
        { id: '1', title: '1', img: require('@imgs/doe1.png'), route: 'DonateHide' },
        { id: '2', title: '2', img: require('@imgs/doe2.png'), route: 'DonateHide' },
    ];

    return (
        <Column style={{ backgroundColor: color.background, paddingTop: 30,}}>
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
                ListHeaderComponent={<View style={{ width: 28 }} />}
                ListFooterComponent={<View style={{ width: 0 }} />}
                snapToAlignment='center'
                pagingEnabled
                onScroll={handleScroll}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 14, marginBottom: 0, }}>
                {home.map((_, index) => {
                    const inputRange = [
                        (index - 1) * windowWidth,
                        index * windowWidth,
                        (index + 1) * windowWidth
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 30, 8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <>
                            <Animated.View
                                key={index}
                                style={{
                                    width: dotWidth,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: index == activeIndex ? activyColor : inactivyColor,
                                    marginHorizontal: 4,
                                }}
                            />
                        </>
                    );
                })}
            </View>
        </Column>
    );
};
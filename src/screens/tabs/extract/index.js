//main
import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { View, ScrollView, Dimensions, BackHandler, StyleSheet, PanResponder, ActivityIndicator } from 'react-native';
import { Main, Column, Label, Title, Row, SubLabel, Button, ButtonPR, LabelLI } from '@theme/global';

//utils
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

//components
import { AnimatePresence, MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '@components/avatar';
import TopSheet from '@components/topsheet';
import { StatusBar } from 'expo-status-bar';
import { Skeleton } from 'moti/skeleton';
import BottomSheet, { BottomSheetScrollView, } from '@gorhom/bottom-sheet';
import ExtractSingleScreen from './single';


//icons
import { Info, QrCode, Smartphone, BadgePercent, ArrowUp, } from 'lucide-react-native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

//requests
import { getExtractNotas, getExtractTransacao, getExtractDonate, getExtractRifas } from '@request/extract/gets';
import { listUser } from '@api/request/user/user';


import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    ZoomOut,
} from 'react-native-reanimated';


import refreshIcon from '@imgs/logo_u.png';

const { width, height } = Dimensions.get('window');

export default function ExtractScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const type = route.params?.type
    const [page, setpage] = useState(type || 'Notas fiscais');
    const [dateSelect, setdateSelect] = useState('Hoje');
    const scrollTags = useRef(null);
    const bts = ['Notas fiscais', 'Transações', 'Doações', 'Rifas',]
    const dates = ['Hoje', '15 dias', 'Mensal', 'Anual']

    const isFocused = useIsFocused();
    const [select, setselect] = useState();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(page);
    const [transacao, settransacao] = useState([]);
    const [notas, setnotas] = useState([]);
    const [doacoes, setdoacoes] = useState([]);
    const [rifas, setrifas] = useState([]);
    const [user, setuser] = useState();

    const selectData = page === 'Doações' ? doacoes : page === 'Transações' ? transacao : page === 'Notas fiscais' ? notas : page === 'Rifas' ? rifas : []

    const [isOpen, setisOpen] = useState(false);

    const modalSelect = useRef(null);
    const handleSelect = (value) => {
        setselect(value)
        setisOpen(true)
        modalSelect.current?.expand()
    }

    useEffect(() => {
        const fetchData = async () => {
            modalSelect.current?.snapToIndex(0);
            try {
                const us = await listUser();
                const tr = await getExtractTransacao();
                const nt = await getExtractNotas();
                const dn = await getExtractDonate();
                setdoacoes(dn)
                setuser(us)
                setnotas(nt)
                settransacao(tr)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (type != currentPage) {
            setCurrentPage(type);
        }

        if (isFocused) {
            setLoading(true);
            fetchData();
        }
    }, [type, currentPage]);


    const [actionButton, setactionButton] = useState(false);
    const scrollMain = useRef()

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (isOpen) {
                    modalSelect.current?.snapToIndex(0);
                    return true;
                }
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    const handleAnimate = (index) => {
        if (index === 0) {
            setisOpen(false);
        } else if (index === 1) {
            setisOpen(true);
        }
    };

    const scrollPosition = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollPosition.value = event.contentOffset.y;
        },
    });
   
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        setLoading(true);
        try {
            const us = await listUser();
            const tr = await getExtractTransacao();
            const nt = await getExtractNotas();
            const dn = await getExtractDonate();
            setdoacoes(dn)
            setuser(us)
            setnotas(nt)
            settransacao(tr)
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setRefreshing(false);
                setLoading(false);
                pullDownPosition.value = withTiming(0, { duration: 180 });
            }, 2000);
        }
    }

    const isReadyToRefresh = useSharedValue(false);
    const pullDownPosition = useSharedValue(0);
    const onPanRelease = () => {
        pullDownPosition.value = withTiming(isReadyToRefresh.value ? 100 : 0, {
            duration: 180,
        });

        if (isReadyToRefresh.value) {
            isReadyToRefresh.value = false;
            onRefresh()
        }
    };
    const panResponderRef = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) =>
                scrollPosition.value <= 0 && gestureState.dy >= 0,
            onPanResponderMove: (event, gestureState) => {
                const maxDistance = 100;
                pullDownPosition.value = Math.max(Math.min(maxDistance, gestureState.dy), 0);
                pullDownPosition.value = Math.max(gestureState.dy, 0);

                if (
                    pullDownPosition.value >= maxDistance / 2 &&
                    isReadyToRefresh.value === false
                ) {
                    isReadyToRefresh.value = true;
                    console.log('Ready to refresh');
                }

                if (
                    pullDownPosition.value < maxDistance / 2 &&
                    isReadyToRefresh.value === true
                ) {
                    isReadyToRefresh.value = false;
                    console.log('Will not refresh on release');
                }
            },
            onPanResponderRelease: onPanRelease,
            onPanResponderTerminate: onPanRelease,
        })
    );

    const refreshContainerStyles = useAnimatedStyle(() => {
        return {
            height: pullDownPosition.value,
        };
    });

    const refreshIconStyles = useAnimatedStyle(() => {
        const scale = Math.min(1, Math.max(0, pullDownPosition.value / 75));
        const rotateValue = Math.min(pullDownPosition.value * 3, 360);
        return {
            opacity: refreshing
                ? withDelay(100, withTiming(0, { duration: 20 }))
                : Math.max(0, pullDownPosition.value - 25) / 50,
            transform: [
                {
                    scaleX: refreshing ? withTiming(0.15, { duration: 120 }) : scale,
                },
                {
                    scaleY: scale,
                },
                {
                    rotate: `${rotateValue}deg`,
                },
            ],
        };
    }, [refreshing]);



    return (
        <Main style={{ backgroundColor: '#fff', }} pointerEvents={refreshing ? 'none' : 'auto'}>
            {isFocused && <StatusBar style="light" backgroundColor={color.primary} animated={true} duration={100} />}
            <TopSheet
                valueMin={150}
                valueNormal={300}
                valueMax={730}
                min={
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title style={{ color: "#fff", fontSize: 14, fontFamily: 'Font_Medium', }}>Notas fiscais</Title>
                                <Title style={{ color: "#fff" }}>{user?.NotasDoadas}</Title>
                            </Column>
                            <Column>
                                <Title style={{ color: "#fff", textAlign: 'right', fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                                <Title style={{ color: "#fff", textAlign: 'right' }}>{user?.PontosAtuais}</Title>
                            </Column>
                        </Row>
                    </MotiView>
                }
                normal={
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Column style={{ marginTop: 20, }}>
                            <Row style={{ justifyContent: 'space-between', }}>
                                <Column style={{ borderWidth: 1, borderColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1, }}>
                                    <Title style={{ color: "#fff", fontSize: 14, fontFamily: 'Font_Medium', }}>Notas fiscais</Title>
                                    <Title style={{ color: "#fff", fontSize: 28, lineHeight: 32, }}>{user?.NotasDoadas}</Title>
                                </Column>
                                <Column style={{ width: 16, }} />
                                <Column style={{ backgroundColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1, }}>
                                    <Title style={{ color: color.secundary, fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                                    <Title style={{ color: color.secundary, }}>{user?.PontosAtuais}</Title>
                                </Column>
                            </Row>
                            <Row style={{ marginTop: 16, justifyContent: 'space-between', alignItems: 'center', }}>

                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ backgroundColor: "#ffffff40", borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                                        <MaterialCommunityIcons name="clipboard-edit-outline" size={24} color="#fff" />
                                    </Button>
                                    <Label style={{ fontSize: 16, color: "#fff", fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Nota fiscal</Label>
                                </Column>
                                <Column>
                                    <Button onPress={() => { navigation.navigate('Account') }} style={{ backgroundColor: "#ffffff40", borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                                        <AntDesign name="user" size={24} color="#fff" />
                                    </Button>
                                    <Label style={{ fontSize: 16, color: "#fff", fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Conta</Label>
                                </Column>
                                <Column>
                                    <Button onPress={() => { navigation.navigate('AccountFAQ') }} style={{ backgroundColor: "#ffffff40", borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                                        <Feather name="help-circle" size={24} color="#fff" />
                                    </Button>
                                    <Label style={{ fontSize: 16, color: "#fff", fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Ajuda</Label>
                                </Column>

                            </Row>
                        </Column>
                    </MotiView>
                }
                max={
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Column style={{}}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                                <Avatar />
                                <Button onPress={() => { navigation.navigate('NotafiscalSend') }} >
                                    <MaterialCommunityIcons name="qrcode-scan" size={24} color={color.secundary} />
                                </Button>
                            </Row>
                            <Title style={{ fontSize: 52, lineHeight: 68, fontFamily: font.book, color: color.primary, textAlign: 'center', letterSpacing: -3, marginTop: 24, }}>Resumo</Title>

                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 40, }}>
                                <Column style={{}}>
                                    <Label>Notas fiscais</Label>
                                    <Title style={{ fontSize: 62, lineHeight: 68, fontFamily: font.book, }}>{user?.NotasDoadas}</Title>
                                </Column>
                                <Column style={{}}>
                                    <Label style={{ textAlign: 'right' }}>Pontos</Label>
                                    <Title style={{ fontSize: 62, lineHeight: 68, fontFamily: font.book, textAlign: 'right' }}>{user?.PontosAtuais}</Title>
                                </Column>
                            </Row>

                            <Column>
                                <SubLabel style={{ color: color.secundary, marginTop: 12, marginBottom: 12, fontSize: 18, }}>Acesso rapído</SubLabel>
                                <Row>
                                    <Button onPress={() => { navigation.navigate('Shop') }} style={{ flexGrow: 2, }}>
                                        <Column style={{ flexGrow: 2, height: 160, borderWidth: 1, borderColor: '#30303030', borderRadius: 12, padding: 12, justifyContent: 'space-between' }}>
                                            <Column style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                                                <MaterialCommunityIcons name="shopping-outline" size={24} color={color.primary} />
                                            </Column>
                                            <Label style={{ fontSize: 24, lineHeight: 24, color: color.secundary, }}>Trocar {'\n'}pontos</Label>
                                        </Column>
                                    </Button>
                                    <Column style={{ width: 24, }} />
                                    <Button onPress={() => { navigation.navigate('ShopOffers') }} style={{ flexGrow: 1, }}>
                                        <Column style={{ flexGrow: 1, height: 160, borderWidth: 1, borderColor: '#30303030', borderRadius: 12, padding: 12, justifyContent: 'space-between' }}>
                                            <Column style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                                                <BadgePercent size={24} color={color.primary} />
                                            </Column>
                                            <Label style={{ fontSize: 24, lineHeight: 24, color: color.secundary, }}>Ofertas {'\n'}relâmpago</Label>
                                        </Column>
                                    </Button>

                                </Row>
                            </Column>

                        </Column>
                    </MotiView>
                }
            />
            <AnimatePresence>
                {actionButton &&
                    <MotiView from={{ opacity: 0, scale: .6, }} animate={{ opacity: 1, scale: 1, }} transition={{ type: 'timing' }} exit={{ opacity: 0, scale: .7, }} style={{ position: 'absolute', bottom: 100, right: 30, zIndex: 99, }}>
                        <Button onPress={() => { scrollMain.current.scrollToOffset({ offset: 0, animated: true, }) }} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: "#ffcff1", justifyContent: 'center', alignItems: 'center', }}><ArrowUp size={26} color={color.primary} /></Button>
                    </MotiView>
                }
            </AnimatePresence>

            <NavBar bts={bts} page={page} setpage={setpage} scrollTags={scrollTags} margin={margin} color={color} font={font} />

            <Animated.View style={[{maxHeight: 100, borderTopLeftRadius: 12, borderTopRightRadius: 12, marginHorizontal: 28,  marginBottom: refreshing ? 50 : 0, backgroundColor: refreshing ? color.blue : color.primary}, refreshContainerStyles]}>
                {refreshing ?
                    <Column style={{height: 100,  borderRadius: 12, }}>
                        <Column style={{ height: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 12, borderTopRightRadius: 12, }}>
                            <ActivityIndicator size="large" color="#fff" />
                        </Column>
                        <Column style={{height: 40,  backgroundColor: '#f7f7f7', flexGrow: 1, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, }} />
                    </Column>
                    :
                    <Column style={{ height: 100, justifyContent: 'center', alignItems: 'center',  }}>
                        <Animated.Image
                            source={refreshIcon}
                            exiting={ZoomOut}
                            style={[{ width: 74, height: 74, objectFit: 'contain', backgroundColor: "#FE25BD", borderRadius: 100,}, refreshIconStyles]}
                        />
                    </Column>
                }
            </Animated.View>
            {loading ?
                <SkeletonList /> :
                <Animated.FlatList
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    data={selectData}
                    ListHeaderComponent={<Animated.View {...panResponderRef.current.panHandlers}>
                        <Header dates={dates} dateSelect={dateSelect} setdateSelect={setdateSelect} />
                    </Animated.View>}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Empty type={page} />}
                    ref={scrollMain}
                    initialNumToRender={5}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<Column style={{ height: 100, }} />}
                    renderItem={({ item, index }) => <CardExtrato type={page} item={item} index={index} handleSelect={handleSelect} />}
                />}

            <BottomSheet onChange={handleAnimate} ref={modalSelect} index={0} snapPoints={[0.1, 0.99 * height]} containerStyle={{ zIndex: 99, }} handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <BottomSheetScrollView style={{ marginHorizontal: margin.h, }}>
                    {isOpen && <ExtractSingleScreen id={select?.id} type={select?.type} />}
                </BottomSheetScrollView>
            </BottomSheet>
        </Main>
    )
}


const NavBar = ({ bts, page, setpage, scrollTags, margin, color, font }) => {
    return (
        <Column>
            <Column style={{ height: 150, }} />
            <ScrollView ref={scrollTags} horizontal style={{ paddingHorizontal: margin.h, marginVertical: 12, }} showsHorizontalScrollIndicator={false}>
                {bts.map((bt, index) => (
                    <Button disabled={bt === page} key={index} onPress={() => { setpage(bt) }}
                        style={{ backgroundColor: bt === page ? color.primary : 'transparent', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 100, margin: 0, }}>
                        <Label style={{ color: bt === page ? "#fff" : color.secundary, fontFamily: font.bold, fontSize: 16, textAlign: 'center', alignSelf: 'center', }}>{bt}</Label>
                    </Button>
                ))}
                <Column style={{ width: 60, height: 12, }} />
            </ScrollView>
        </Column>
    )
}

const Empty = ({ type }) => {
    const { color, margin } = useContext(ThemeContext);
    const navigation = useNavigation();
    const msg = type === 'Doações' ? 'Começe a doar \nagora mesmo!' : type === 'Transações' ? 'Começe a utilizar seus \npontos agora mesmo!' : type === 'Rifas' ? 'Participe de nossas \nrifas e ganhe prêmios!' : type === 'Moedas' ? 'Começe a utilizar suas \nmoedas agora mesmo!' : 'Nada por aqui, cadastre \numa nota fiscal!'
    const screen = type === 'Doações' ? 'Donate' : type === 'Transações' ? 'Shop' : type === 'Rifas' ? 'Rifas' : type === 'Moedas' ? 'Shop' : 'NotafiscalSend'
    const btmessage = type === 'Doações' ? 'Fazer doação' : type === 'Transações' ? 'Ver ofertas' : type === 'Rifas' ? 'Participar' : type === 'Moedas' ? 'Comprar' : 'Cadastrar'
    return (
        <Column style={{ backgroundColor: '#f9f9f9', marginHorizontal: margin.h, marginVertical: 20, borderRadius: 24, overflow: 'hidden', }}>
            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, }}>
                <Column style={{ backgroundColor: color.secundary, width: 54, height: 54, borderRadius: 100, borderWidth: 3, borderColor: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <QrCode size={24} color="#fff" />
                </Column>
                <Column style={{ backgroundColor: color.primary, width: 54, height: 54, borderRadius: 100, borderWidth: 3, borderColor: "#fff", justifyContent: 'center', alignItems: 'center', zIndex: 2, marginLeft: -10, }}>
                    <Smartphone size={24} color="#fff" />
                </Column>
            </Row>
            <Title style={{ fontSize: 20, textAlign: 'center', marginTop: 8, }}>{msg}</Title>

            <ButtonPR style={{ marginHorizontal: 24, marginVertical: 12, alignSelf: 'center', paddingHorizontal: 32, }} onPress={() => { navigation.navigate(screen) }} >
                <LabelLI style={{ color: '#fff', }}>{btmessage}</LabelLI>
            </ButtonPR>

            <LinearGradient
                colors={['#f7f7f7', color.primary + 20,]}
                style={{ flexGrow: 1, height: 100, marginTop: -80, zIndex: -1, }} />
        </Column>
    )
}

const CardExtrato = ({ item, onLong, type, handleSelect }) => {
    const { value, status, label, name, date, created_at, Status } = item
    const { color, margin } = useContext(ThemeContext);

    const formatValue = (val) => {
        return parseInt(val).toLocaleString('pt-BR');
    };
    const hour = created_at.slice(11, 16)
    const cl = status === 'Confirmado' ? color.green : status === 'Aguardando' ? color.blue : status === 'Cancelado' ? color.red : status === 'Expirado' ? '#000000' : Status === 'aprovado' ? color.green : Status === 'aguardando' ? color.blue : '#ffffff'
    const icon = status === 'Confirmado' ? <Feather color={color.green} name='check' size={24} /> : status === 'Aguardando' ? <Info color={color.blue} size={24} /> : status === 'Cancelado' ? <Feather name='x' size={24} color={color.red} /> : status === 'Expirado' ? <Feather name='loader' color="#000000" size={24} /> : Status === 'aprovado' ? <Feather color={color.green} name='check' size={24} /> : Status === 'aguardando' ? <Info color={color.blue} size={24} /> : null;
    return (
        <Button onLongPress={onLong} onPress={() => { handleSelect({ id: item.id, type: type, }) }} style={{ paddingHorizontal: margin.h, }}>
            <Row style={{ marginBottom: 16, justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ backgroundColor: cl + 20, width: 54, height: 54, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        {icon}
                    </Column>
                    <SubLabel style={{ marginTop: 6, fontSize: 12, fontFamily: 'Font_Medium', textAlign: 'center' }}>{date}</SubLabel>
                </Column>

                <Column style={{ borderRightWidth: 2, borderRightColor: cl + 50, paddingRight: 20, }}>
                    <Title style={{
                        color: cl,
                        fontSize: 24, lineHeight: 24, textAlign: 'right',
                        textDecoration: status === 'Expirado' ? 'underline' : 'none',
                        textDecorationLine: status === 'Expirado' ? "line-through" : "none",
                        textDecorationStyle: status === 'Expirado' ? "solid" : "none",
                        textDecorationColor: status === 'Expirado' ? "#000" : 'transparent',
                    }}>
                        {type == 'Notas fiscais' && value}
                        {type == 'Transações' && value + ' pontos'}
                        {type == 'Doações' && 'R$ ' + formatValue(value.slice(0, -3)) + ',00'}
                    </Title>
                    <SubLabel style={{ color: cl, fontSize: 14, textAlign: 'right', marginTop: -2, }}>{label}</SubLabel>
                    <Row style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                        {name?.length > 0 &&
                            <Label style={{ fontSize: 14, marginVertical: 4, textAlign: 'right', fontFamily: 'Font_Bold', color: color.secundary, }}>{name.slice(0, 24)} - </Label>
                        }<Label style={{ fontSize: 14, marginVertical: 4, textAlign: 'right' }}>{hour}</Label>
                    </Row>
                </Column>
            </Row>
        </Button>
    )
}

const Header = ({ dates, dateSelect, setdateSelect, }) => {
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Column>
            <Row style={{ justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "#f7f7f7", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, marginHorizontal: margin.h, paddingHorizontal: 12, }}>
                {dates.map((date, i) => (
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} key={i}>
                        <Button onPress={() => { setdateSelect(date) }} style={{ paddingVertical: 10, paddingHorizontal: 6, borderRadius: 100, }}>
                            <Label style={{ color: date === dateSelect ? color.primary : color.secundary + 99, fontFamily: font.medium, fontSize: 14, }}>{date}</Label>
                        </Button>
                    </MotiView>
                ))}
            </Row>
        </Column>
    )
}

const SkeletonList = () => {
    return (
        <Column style={{ marginHorizontal: 28, marginVertical: 12, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Skeleton colorMode="light" radius="round" height={75} width={75} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={85} />
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Skeleton colorMode="light" radius={8} height={42} width={180} />
                    <Column style={{ height: 10, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={150} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={120} />
                </Column>
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 24, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Skeleton colorMode="light" radius="round" height={75} width={75} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={85} />
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Skeleton colorMode="light" radius={8} height={42} width={180} />
                    <Column style={{ height: 10, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={150} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={120} />
                </Column>
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Skeleton colorMode="light" radius="round" height={75} width={75} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={85} />
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Skeleton colorMode="light" radius={8} height={42} width={180} />
                    <Column style={{ height: 10, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={150} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={120} />
                </Column>
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 24, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Skeleton colorMode="light" radius="round" height={75} width={75} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={85} />
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Skeleton colorMode="light" radius={8} height={42} width={180} />
                    <Column style={{ height: 10, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={150} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={120} />
                </Column>
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Skeleton colorMode="light" radius="round" height={75} width={75} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={85} />
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Skeleton colorMode="light" radius={8} height={42} width={180} />
                    <Column style={{ height: 10, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={150} />
                    <Column style={{ height: 4, }} />
                    <Skeleton colorMode="light" radius={6} height={24} width={120} />
                </Column>
            </Row>
        </Column>
    )
}



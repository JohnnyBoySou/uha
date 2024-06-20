import React, { useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FlatList, ScrollView, Dimensions, View, Pressable } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, LineL, ButtonPR, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, CircleX, AlarmClock, Plus, Car, QrCode, Smartphone, TicketPercent, BadgePercent, ArrowUp } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import doacoes from '@data/doacoes';
import extrato from '@data/extrato';
import coins from '@data/coins';
import moedas from '@data/moedas';
import rifas from '@data/rifas';
import user from '@data/user';

import TopSheet from '@components/topsheet';
import Avatar from '@components/avatar';

const Header = React.memo(({ dates, dateSelect, setdateSelect, color }) => (
    <Column>
        <Row style={{ justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "#f7f7f7", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, marginHorizontal: 28, paddingHorizontal: 12, }}>
            {dates.map((date, i) => (
                <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} key={i}>
                    <Button onPress={() => setdateSelect(date)} style={{ paddingVertical: 10, paddingHorizontal: 6, borderRadius: 100, }}>
                        <Label style={{ color: date === dateSelect ? color.primary : color.secundary + 99, fontFamily: 'Font_Medium', fontSize: 14, }}>{date}</Label>
                    </Button>
                </MotiView>
            ))}
        </Row>
    </Column>
));

const Empty = React.memo(() => {
    const { color, margin } = useContext(ThemeContext);
    const navigation = useNavigation();
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
            <Title style={{ fontSize: 20, textAlign: 'center', marginTop: 8, }}>Comece a utilizar {'\n'}seus pontos</Title>
            <ButtonPR style={{ marginHorizontal: 24, marginVertical: 12, }} onPress={() => { navigation.navigate('Shop') }} >
                <LabelLI style={{ color: '#fff', }}>Ver estabelecimentos</LabelLI>
            </ButtonPR>
            <LinearGradient colors={['#f7f7f7', color.primary + 20,]} style={{ flexGrow: 1, height: 100, marginTop: -80, zIndex: -1, }} />
        </Column>
    );
});

const CardExtrato = React.memo(({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = useMemo(() => item?.icon === 'check' ? color.green : item?.icon === 'await' ? color.blue : item?.icon === 'uncheck' ? color.red : item.icon === 'dimiss' ? '#000000' : '#ffffff', [item?.icon, color]);
    const icon = useMemo(() => item?.icon === 'check' ? <Feather color={color.green} name='check' size={24} /> : item?.icon === 'await' ? <Info color={color.blue} size={24} /> : item?.icon === 'uncheck' ? <Feather name='x' size={24} color={color.red} /> : <Feather name='loader' color="#000000" size={24} />, [item?.icon, color]);

    return (
        <Button onPress={() => { navigation.navigate('ExtractSingleRifas', { id: item.id }) }} style={{ paddingHorizontal: margin.h, }}>
            <Row style={{ marginBottom: 16, justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ backgroundColor: cl + 20, width: 54, height: 54, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        {icon}
                    </Column>
                    <SubLabel style={{ marginTop: 6, fontSize: 12, fontFamily: 'Font_Medium', }}>{item?.date}</SubLabel>
                </Column>
                <Column style={{ borderRightWidth: 2, borderRightColor: cl + 50, paddingRight: 20, }}>
                    <Title style={{
                        color: cl,
                        fontSize: 24, lineHeight: 24, textAlign: 'right',
                        textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',
                    }}>R$ {item?.value},00</Title>
                    <SubLabel style={{ color: cl, fontSize: 14, textAlign: 'right', marginTop: -4, }}>{item?.status}</SubLabel>
                    <Label style={{ fontSize: 14, marginVertical: 4, textAlign: 'right' }}>{item?.type}</Label>
                </Column>
            </Row>
        </Button>
    );
});

export default function ExtractScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const type = route.params?.type || 'Extrato';
    const [page, setpage] = useState(type);

    const [dateSelect, setdateSelect] = useState('Hoje');
    const [actionButton, setactionButton] = useState(false);

    const scrollTags = useRef(null);
    const scrollMain = useRef(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (type !== page) setpage(type);
    }, [isFocused, type]);

    useEffect(() => {
        const handleScroll = () => {
            if (page === 'Moedas' || page === 'Rifas') {
                scrollTags.current.scrollToEnd({ animated: true });
            } else if (page === 'Extrato' || page === 'Doações') {
                scrollTags.current.scrollTo({ x: 0, y: 0, animated: true });
            }
        };
        handleScroll();
    }, [page]);


    const bts = useMemo(() => ['Extrato', 'Doações', 'Pontos', 'Rifas', 'Moedas'], []);
    const dates = useMemo(() => ['Hoje', '15 dias', 'Mensal', 'Anual'], []);

    const data = useMemo(() => {
        switch (page) {
            case 'Doações':
                return doacoes;
            case 'Pontos':
                return coins;
            case 'Rifas':
                return rifas;
            case 'Moedas':
                return moedas;
            default:
                return extrato;
        }
    }, [page]);

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    const getItemLayout = useCallback((data, index) => (
        { length: 20, offset: 20 * index, index }
    ), []);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <TopSheet
                min={
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title style={{ color: "#fff", fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Moedas</Title>
                                <Title style={{ color: "#fff" }}>R$ {user.moedas}</Title>
                            </Column>
                            <Column>
                                <Title style={{ color: "#fff", textAlign: 'right', fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                                <Title style={{ color: "#fff", textAlign: 'right' }}>{user.points}</Title>
                            </Column>
                        </Row>
                    </MotiView>
                }
                normal={
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Column style={{ marginTop: 20, }}>
                            <Row style={{ justifyContent: 'space-between', }}>
                                <Column style={{ borderWidth: 1, borderColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1, }}>
                                    <Title style={{ color: "#fff", fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Moedas</Title>
                                    <Title style={{ color: "#fff", fontSize: 28, lineHeight: 32, }}>R$ {user.moedas}</Title>
                                </Column>
                                <Column style={{ width: 16, }} />
                                <Column style={{ backgroundColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1, }}>
                                    <Title style={{ color: color.secundary, fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                                    <Title style={{ color: color.secundary, }}>{user.points}</Title>
                                </Column>
                            </Row>
                            <Row style={{ marginTop: 16, justifyContent: 'space-between', alignItems: 'center', }}>
                                <Column>
                                    <Button onPress={() => { navigation.navigate('Shop') }} style={{ backgroundColor: "#ffffff40", borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                                        <MaterialCommunityIcons name="shopping-outline" size={24} color="#fff" />
                                    </Button>
                                    <Label style={{ fontSize: 16, color: "#fff", fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Comprar</Label>
                                </Column>
                                <Column>
                                    <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ backgroundColor: "#ffffff40", borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />
                                    </Button>
                                    <Label style={{ fontSize: 16, color: "#fff", fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>QR Code</Label>
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
                            <Title style={{ fontSize: 52, lineHeight: 68, fontFamily: font.book, color: color.primary, textAlign: 'center', letterSpacing: -3, marginTop: 24, }}>Balanço total</Title>

                            <Column style={{ marginTop: 70, }}>
                                <Label>Moedas</Label>
                                <Title style={{ fontSize: 62, lineHeight: 68, fontFamily: font.book, }}>R$ {user?.moedas}</Title>
                            </Column>
                            <Column style={{ marginTop: 30, }}>
                                <Label style={{ textAlign: 'right' }}>Pontos</Label>
                                <Title style={{ fontSize: 62, lineHeight: 68, fontFamily: font.book, textAlign: 'right' }}>{user?.points}</Title>
                            </Column>


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

            <Column style={{ height: 115, }} />
            <Column>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollTags}>
                    <Row style={{ marginHorizontal: margin.h, paddingBottom: 20, paddingTop: 10, }}>
                        {bts.map((bt, index) => (
                            <Button key={index} onPress={() => setpage(bt)} 
                            style={{ backgroundColor: bt === page ? color.primary : 'transparent', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 100, margin: 0,}}>
                                <Label style={{ color: bt === page ? "#fff" : color.secundary, fontFamily: font.bold, fontSize: 16,  textAlign: 'center', alignSelf: 'center', }}>{bt}</Label>
                            </Button>
                        ))}
                    </Row>
                </ScrollView>
            </Column>

            <FlatList
                ListHeaderComponent={<Header dates={dates} dateSelect={dateSelect} setdateSelect={setdateSelect} margin={margin} color={color} font={font} />}
                data={data.filter((item) => item.date.includes(dateSelect))}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => <CardExtrato item={item} />}
                contentContainerStyle={{ paddingBottom: 80, }}
                ListEmptyComponent={<Empty />}
                ref={scrollMain}
                initialNumToRender={20}
                getItemLayout={getItemLayout}
            />


        </Main>
    );
}

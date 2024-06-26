import React, { useContext, useState, useRef, useEffect, useMemo } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Column, Label, Title, Row, SubLabel, Button, ButtonPR, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Info, QrCode, Smartphone, BadgePercent, ArrowUp, } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import TopSheet from '@components/topsheet';
import Avatar from '@components/avatar';

import BottomSheet, {  BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { getExtractDonate, getExtractMoedas, getExtractPontos, getExtractRifas, getExtract } from '@request/extract/gets';
import { getUser } from '@api/request/user';
import { StatusBar } from 'expo-status-bar';


export default function ExtractScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    let type = route.params?.type

    const [page, setpage] = useState('Extrato');
    const [dateSelect, setdateSelect] = useState('Hoje');

    //bottomsheet
    const edit = useRef(null);
    const [cache, setcache] = useState();
    const snapPoints = useMemo(() => ["1%", "50%"], []);

    const scrollTags = useRef(null);
    const bts = ['Extrato', 'Doações', 'Pontos', 'Rifas', 'Moedas']
    const dates = ['Hoje', '15 dias', 'Mensal', 'Anual']

    const isFocused = useIsFocused();

    useEffect(() => {
        if (type === page) {
            return
        } else if (type?.length > 0) {
            setpage(type);
        } 
    }, [isFocused]);

    useEffect(() => {
        const handleScroll = () => {
            if (page === 'Moedas' || page === 'Rifas') { scrollTags.current.scrollToEnd({ animated: true }); }
            else if (page === 'Extrato' || page === 'Doações') { scrollTags.current.scrollTo({ x: 0, y: 0, animated: true }); }
        }
        handleScroll()
    }, [page]);


    const [extrato, setextrato] = useState();
    const [doacoes, setdoacoes] = useState();
    const [pontos, setpontos] = useState();
    const [moedas, setmoedas] = useState();
    const [rifas, setrifas] = useState();
    const [user, setuser] = useState();

    useEffect(() => {
        const fetchData  = async () => {
            getUser().then((res) => {
                setuser(res)
            });
            getExtract().then((res) => {
                setextrato(res)
            });
            getExtractRifas().then((res) => {
                setrifas(res)
            });
            getExtractMoedas().then((res) => {
                setmoedas(res)
            });
            getExtractPontos().then((res) => {
                setpontos(res)
            });
            getExtractDonate().then((res) => {
                setdoacoes(res)
            });
        };
        fetchData();
    }, []);




    const Header = () => {
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

    const [actionButton, setactionButton] = useState(false);
    const scrollMain = useRef()
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            {isFocused  && <StatusBar style="light"  backgroundColor={color.primary} animated={true}/>}

            <TopSheet
                min={
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title style={{ color: "#fff", fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Moedas</Title>
                                <Title style={{ color: "#fff" }}>R$ {user?.moedas}</Title>
                            </Column>
                            <Column>
                                <Title style={{ color: "#fff", textAlign: 'right', fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                                <Title style={{ color: "#fff", textAlign: 'right' }}>{user?.points}</Title>
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
                                    <Title style={{ color: "#fff", fontSize: 28, lineHeight: 32, }}>R$ {user?.moedas}</Title>
                                </Column>
                                <Column style={{ width: 16, }} />
                                <Column style={{ backgroundColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1, }}>
                                    <Title style={{ color: color.secundary, fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                                    <Title style={{ color: color.secundary, }}>{user?.points}</Title>
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

            <Column style={{ height: 150, }} />
            <Column>
                <ScrollView ref={scrollTags} horizontal style={{ paddingHorizontal: margin.h, marginVertical: 12,  }} showsHorizontalScrollIndicator={false}>
                    {bts.map((bt, index) => (
                        <Button key={index} onPress={() => setpage(bt)} 
                        style={{ backgroundColor: bt === page ? color.primary : 'transparent', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 100, margin: 0,}}>
                            <Label style={{ color: bt === page ? "#fff" : color.secundary, fontFamily: font.bold, fontSize: 16,  textAlign: 'center', alignSelf: 'center', }}>{bt}</Label>
                        </Button>
                    ))}
                    <Column style={{ width: 60, height: 12, }} />
                </ScrollView>
            </Column>

            <FlatList
                ListHeaderComponent={Header}
                data={page === 'Doações' ? doacoes : page === 'Pontos' ? pontos : page === 'Rifas' ? rifas : page === 'Moedas' ? moedas : page === 'Extrato' ? extrato : []}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Empty />}
                ref={scrollMain}
                initialNumToRender={5}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 20) { setactionButton(true); } else { setactionButton(false); } }}
                ListFooterComponent={<Column style={{ height: 100, }} />}
                renderItem={({ item, index }) => <CardExtrato type={page} item={item} index={index} onLong={(item) => {setcache(item); edit.current?.expand()}}/>}
            />

            <BottomSheet ref={edit} snapPoints={snapPoints} 
                modalStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, }} >
                <BottomSheetScrollView style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, }}>
                    <Column style={{ padding: 24, }}>
                    </Column>
                </BottomSheetScrollView>
            </BottomSheet>
        </Main>
    )
}

const Empty = () => {
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

            <LinearGradient
                colors={['#f7f7f7', color.primary + 20,]}
                style={{ flexGrow: 1, height: 100, marginTop: -80, zIndex: -1, }} />
        </Column>
    )
}

const CardExtrato = ({ item, index, onLong, type }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.green : item?.icon === 'await' ? color.blue : item?.icon === 'uncheck' ? color.red : item.icon === 'dimiss' ? '#000000' : '#ffffff'
    const icon = item?.icon === 'check' ? <Feather color={color.green} name='check' size={24} /> : item?.icon === 'await' ? <Info color={color.blue} size={24} /> : item?.icon === 'uncheck' ? <Feather name='x' size={24} color={color.red} /> : <Feather name='loader' color="#000000" size={24} />
    return (
        <Button onLongPress={onLong} onPress={() => { navigation.navigate('ExtractSingle', { id: item.id, type: type, }) }} style={{ paddingHorizontal: margin.h, }}>
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
                    }}>
                        {type == 'Pontos' ? item?.value : `R$ ${item?.value},00` }
                        </Title>
                    <SubLabel style={{ color: cl, fontSize: 14, textAlign: 'right', marginTop: -4, }}>{item?.status}</SubLabel>
                    <Label style={{ fontSize: 14, marginVertical: 4, textAlign: 'right' }}>{item?.type}</Label>
                </Column>
            </Row>
        </Button>
    )
}

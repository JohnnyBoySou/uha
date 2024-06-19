import React, { useContext, useState, useRef, useEffect } from 'react';
import { FlatList, ScrollView, Dimensions, View } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, LineL, ButtonPR, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, CircleX, AlarmClock, Plus, Car, QrCode, Smartphone,  } from 'lucide-react-native';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';

import doacoes from '@data/doacoes';
import extrato from '@data/extrato';
import coins from '@data/coins';
import moedas from '@data/moedas';
import rifas from '@data/rifas';
import user from '@data/user';

import TopSheet from '@components/topsheet';
import Avatar from '@components/avatar';


export default function ExtractScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    let type = route.params?.type ? route.params?.type : 'Rifas';
    const [page, setpage] = useState(type);
    const [dateSelect, setdateSelect] = useState('Hoje');
    const scrollTags = useRef(null);

    const bts = ['Extrato', 'Doações', 'Pontos', 'Rifas', 'Moedas']
    const dates = ['Hoje', '15 dias', 'Mensal', 'Anual']

    const isFocused = useIsFocused();

    useEffect(() => {
        if (type === page) {
            return
        } else if (type?.length > 0) {
            setpage(type);
        } else {
            setpage('Extrato');
        }
    }, [isFocused]);

    useEffect(() => {
        const selectType = () => {
            if (page === 'Extrato') { Card.transitionTo('open'); }
        }
        const handleScroll = () => {
            if (page === 'Moedas' || page === 'Rifas') { scrollTags.current.scrollToEnd({ animated: true }); }
            else if (page === 'Extrato' || page === 'Doações') { scrollTags.current.scrollTo({ x: 0, y: 0, animated: true }); }
        }
        handleScroll()
        selectType()
    }, [page]);

    const [actionButton, setactionButton] = useState(false);
    const Card = useAnimationState({
        open: {
            opacity: 1,
            height: 110,
        },
        close: {
            opacity: 1,
            height: 260,
        },
    });

    const handleToggle = (pg) => {
        if (pg === 'Extrato') {
            Card.transitionTo('open');
            setcardOpen(false)
        }
        else {
            setcardOpen(true)
            Card.transitionTo('close');
        }
    }
    const [cardOpen, setcardOpen] = useState(false);
    //borderBottomLeftRadius: 24, borderBottomRightRadius: 16,
    const [isOpen, setisOpen] = useState(true);
    const toggleSheet = () => { setisOpen((prevState) => !prevState) }

    return (
        <Main style={{ backgroundColor: '#fff', }}>

            <TopSheet onClose={toggleSheet}
                min={
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1, }}>
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
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1, }}>
                    <Column style={{  marginTop: 20, }}>
                       <Row style={{ justifyContent: 'space-between',  }}>
                        <Column style={{ borderWidth: 1, borderColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1,}}>
                            <Title style={{ color: "#fff", fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Moedas</Title>
                            <Title style={{ color: "#fff", fontSize: 28, lineHeight: 32, }}>R$ {user.moedas}</Title>
                        </Column>
                        <Column style={{width: 16, }} />
                        <Column style={{ backgroundColor: '#ffffff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexGrow: 1,}}>
                            <Title style={{ color:color.secundary,  fontSize: 14, fontFamily: 'Font_Medium', }}>Saldo em Pontos</Title>
                            <Title style={{ color: color.secundary,  }}>{user.points}</Title>
                        </Column>
                       </Row>
                       <Row style={{ marginTop: 16, justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Button style={{ backgroundColor: "#ffffff90", borderRadius: 12, padding: 16, }}>
                                <Column style={{ width: 32, height: 32, backgroundColor: '#000', }}></Column>
                            </Button>
                            <Button style={{ backgroundColor: "#ffffff90", borderRadius: 12, padding: 16, }}>
                                <Column style={{ width: 32, height: 32, backgroundColor: '#000', }}></Column>
                            </Button>
                            <Button style={{ backgroundColor: "#ffffff90", borderRadius: 12, padding: 16, }}>
                                <Column style={{ width: 32, height: 32, backgroundColor: '#000', }}></Column>
                            </Button>
                            <Button style={{ backgroundColor: "#ffffff90", borderRadius: 12, padding: 16, }}>
                                <Column style={{ width: 32, height: 32, backgroundColor: '#000', }}></Column>
                            </Button>
                       </Row>
                    </Column>
                </MotiView>
                }
                max={
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1, }}>
                        <Column style={{  }}>
                            <Row>
                                <Avatar />
                            </Row>

                            <Column style={{ marginTop: 70, }}>
                                <Label>Balanço total</Label>
                                <Title style={{ fontSize: 62, lineHeight: 68, fontFamily: font.book, }}>R$ {user?.moedas}</Title>
                            </Column>

                        <Row style={{ marginTop: 20, marginBottom: 30, }}>
                            <Column style={{ marginRight: 12, }}>
                                <Label>Moedas</Label>
                                <Label>R$ {user?.moedas}</Label>
                            </Column>
                            <Column>
                                <Label>Pontos</Label>
                                <Label>{user?.points}</Label>
                            </Column>
                        </Row>

                        <Column>
                            <SubLabel>Acesso rapído</SubLabel>
                            <Row>
                                <Column style={{ width: 140, height: 160, borderWidth: 1, borderColor: '#303030',  borderRadius: 12,}}> 
                                
                                </Column>

                            </Row>      
                        </Column>

                        </Column>
                    </MotiView>
                }



            />



            <AnimatePresence>
                {actionButton &&
                    <MotiView from={{ opacity: 0, scale: .6, rotate: '32deg', }} animate={{ opacity: 1, rotate: '0deg', scale: 1, }} transition={{ type: 'timing' }} exit={{ opacity: 0, rotate: '32deg', scale: .7, }} style={{ position: 'absolute', bottom: 100, right: 30, zIndex: 99, }}>
                        <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}><Plus size={32} color="#fff" /></Button>
                    </MotiView>
                }
            </AnimatePresence>


            <Scroll style={{ paddingTop: 115, }} onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 20) { setactionButton(true); } else { setactionButton(false); } }}>


                <ScrollView ref={scrollTags} horizontal style={{ paddingHorizontal: margin.h, marginTop: 20, }} showsHorizontalScrollIndicator={false}>
                    {bts.map((bt, i) => (
                        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} key={i}>
                            <Button onPress={() => { setpage(bt); handleToggle(bt); }} style={{ backgroundColor: bt === page ? color.primary : 'transparent', padding: 8, paddingHorizontal: 12, borderRadius: 100, }}>
                                <Label style={{ color: bt === page ? "#fff" : color.secundary, fontFamily: font.bold, fontSize: 16, }}>{bt}</Label>
                            </Button>
                        </MotiView>
                    ))}
                    <Column style={{ width: 60, height: 12, }} />
                </ScrollView>

                <Row style={{ justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: margin.h, }}>
                    {dates.map((date, i) => (
                        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} key={i}>
                            <Button onPress={() => { setdateSelect(date) }} style={{ padding: 8, paddingHorizontal: 6, borderRadius: 100, margin: 8, }}>
                                <Label style={{ color: date === dateSelect ? color.primary : color.title, fontFamily: font.medium, fontSize: 14, }}>{date}</Label>
                            </Button>
                        </MotiView>
                    ))}
                </Row>

                {page === 'Extrato' && (
                    <MotiView from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing' }}>
                        <FlatList
                            style={{ marginTop: 12, marginHorizontal: margin.h, }}
                            data={extrato}
                            ListEmptyComponent={<Empty />}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <CardExtrato item={item} />}
                        />
                    </MotiView>
                )}

                {page === 'Doações' && (
                    <MotiView from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing' }}>
                        <FlatList
                            style={{ marginTop: 12, marginHorizontal: margin.h, }}
                            data={doacoes}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <CardDoacao item={item} />}
                        />
                    </MotiView>
                )}

                {page === 'Rifas' && (
                    <FlatList
                        style={{ marginTop: 12, marginHorizontal: margin.h, }}
                        data={rifas}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <CardRifas item={item} index={index} />}
                    />
                )}

                {page === 'Pontos' && (
                    <MotiView from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing' }}>
                        <FlatList
                            style={{ marginTop: 12, marginHorizontal: margin.h, }}
                            data={coins}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <CardPontos item={item} />}
                        />
                    </MotiView>
                )}

                {page === 'Moedas' && (
                    <MotiView from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing' }}>
                        <FlatList
                            style={{ marginTop: 12, marginHorizontal: margin.h, }}
                            data={moedas}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <CardMoedas item={item} />}
                        />
                    </MotiView>
                )}

                <Column style={{ height: 100, }} />
            </Scroll>


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

const CardRifas = ({ item, index }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.status === 'Pagamento confirmado' ? color.green : item?.status === 'Pagamento em análise' ? color.blue : item?.status === 'Pagamento expirado' ? '#000000' : color.red;
    const icon = item?.status === 'Pagamento confirmado' ? <Feather color={color.green} name='check' size={24} /> : item?.status === 'Pagamento em análise' ? <Info color={color.blue} size={24} /> : item?.status === 'Pagamento expirado' ? <Feather name='loader' size={24} color="#000"/>  :  <Feather name='x' color={color.red} size={24} />

    return (
        <MotiView from={{ opacity: 0, translateX: 50, }} animate={{ opacity: 1, translateX: 0, }} delay={index * 200} transition={{ type: 'timing', duration: 300, }}>

            <Button onPress={() => { navigation.navigate('ExtractSingleRifas', { id: item.id }) }} style={{ borderBottomWidth: 0.5, borderColor: '#d7d7d7' }}>
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
                            fontSize: 24, lineHeight: 24,  textAlign: 'right',
                            textDecorationLine: item?.status === 'Pagamento expirado' ? "line-through" : "none",
                            textDecorationStyle: item?.status === 'Pagamento expirada' ? "solid" : "none",
                            textDecorationColor: item?.status === 'Pagamento expirada' ? "#000" : 'transparent',
                        }}>R$ {item?.value},00</Title>
                        <SubLabel style={{ color: cl, fontSize: 14,  textAlign: 'right', marginTop: -4,}}>{item?.status}</SubLabel>
                        <Label style={{ fontSize: 14, marginVertical: 4, textAlign: 'right'}}>{item?.name}</Label>
                    </Column>

                </Row></Button>
        </MotiView>
    )
}

const CardExtrato = ({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;
    return (
        <Button onPress={() => { navigation.navigate('ExtractSingle', { item: item }) }} >
            <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20, }}>
                    <Title style={{
                        fontSize: 28, lineHeight: 28, textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',

                    }}>R$ {item?.value},00</Title>
                    <Label style={{ fontSize: 16, marginVertical: 4, }}>{item?.type}</Label>
                    <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
                </Column>
                <Column style={{ alignItems: 'flex-end', }}>
                    {icon}
                    <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
                </Column>
            </Row>
        </Button>

    )
}

const CardPontos = ({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;
    return (
        <Button onPress={() => { navigation.navigate('ExtractSingle', { item: item }) }} >
            <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20, }}>
                    <Title style={{
                        fontSize: 28, lineHeight: 28, textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',

                    }}>{item?.value}</Title>
                    <Label style={{ fontSize: 16, marginVertical: 4, }}>{item?.type}</Label>
                    <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
                </Column>
                <Column style={{ alignItems: 'flex-end', }}>
                    {icon}
                    <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
                </Column>
            </Row></Button>
    )
}

const CardMoedas = ({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;
    return (
        <Button onPress={() => { navigation.navigate('ExtractSingleMoedas', { item: item }) }} >
            <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20, }}>
                    <Title style={{
                        fontSize: 28, lineHeight: 28, textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',

                    }}>{item?.value}</Title>
                    <Label style={{ fontSize: 16, marginVertical: 4, }}>{item?.type}</Label>
                    <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
                </Column>
                <Column style={{ alignItems: 'flex-end', }}>
                    {icon}
                    <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
                </Column>
            </Row></Button>
    )
}

const CardDoacao = ({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.status === 'Pagamento confirmado' ? color.blue : item?.status === 'Pagamento em análise' ? color.primary : item?.status === 'Campanha expirada' ? '#000' : color.red;
    const icon = item?.status === 'Pagamento confirmado' ? <CircleCheck color={color.blue} size={24} /> : item?.status === 'Pagamento em análise' ? <Info color={color.primary} size={24} /> : <CircleX color={color.red} size={24} />;
    return (
        <Button onPress={() => { navigation.navigate('ExtractSingle', { item: item }) }} >
            <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20, }}>
                    <Title style={{
                        fontSize: 28, lineHeight: 28,
                        textDecorationLine: item?.status === 'Campanha expirada' ? "line-through" : "none",
                        textDecorationStyle: item?.status === 'Campanha expirada' ? "solid" : "none",
                        textDecorationColor: item?.status === 'Campanha expirada' ? "#000" : 'transparent',
                    }}>R$ {item?.value},00</Title>
                    <Label style={{ fontSize: 16, marginVertical: 4, }}>{item?.type}</Label>
                    <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
                </Column>
                <Column style={{ alignItems: 'flex-end', }}>
                    {icon}
                    <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
                </Column>
            </Row></Button>
    )
}


/** <MotiView state={Card} transition={{ duration: 800, type: 'timing', }} style={{ backgroundColor: color.primary, paddingVertical: 20, paddingHorizontal: margin.h, paddingTop: 50, }}>
                <Column style={{ width: 72, height: 8, backgroundColor: '#FFFfff80', borderRadius: 100, alignSelf: 'center', position: 'absolute', bottom: 8, }} />
            </MotiView> */

/**
 *   <Column>
<AnimatePresence>
    {cardOpen ?

        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 400, }} exit={{ opacity: 0, translateY: 30, }} >
            <Label style={{ color: "#fff", }}>Saldo em pontos</Label>
            <Title style={{ fontSize: 28, fontFamily: font.bold, lineHeight: 36, marginBottom: 6, color: "#fff", }}>{user?.points}</Title>
            <LineL />
            <Label style={{ color: "#fff", marginTop: 12, marginBottom: 4, }}>Saldo em moedas resgatadas</Label>
            <Label style={{ color: "#fff", }}>R$ {user?.moedas}</Label>
            <ButtonSE onPress={() => { navigation.navigate('Shop') }} style={{ marginTop: 24, alignSelf: 'flex-end', paddingHorizontal: 26, }} >
                <LabelSE style={{ fontSize: 16, }}>Utilizar pontos</LabelSE>
            </ButtonSE>
        </MotiView>

        :
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing' }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <Column>

                <Title style={{ fontSize: 28, fontFamily: font.bold, lineHeight: 36, marginBottom: 6, color: "#fff", }}>{user?.points} pontos</Title>
            </Column>
        </MotiView>
    }
</AnimatePresence>
</Column>
 */
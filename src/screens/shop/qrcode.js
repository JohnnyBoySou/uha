import React, { useContext, useEffect, useState, } from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info, ArrowRight } from 'lucide-react-native';
import { MotiImage, MotiView, useAnimationState } from 'moti';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { Clipboard as Clip, } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function ShopQRCodeScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const item = route.params.item;

    const [clip, setclip] = useState(false);
    const handleClipboard = async () => { await Clipboard.setStringAsync(item.code); setclip(true)};

    return (
        <Main style={{ backgroundColor: color.primary, }}>
            <StatusBar style="light" backgroundColor={color.primary}/>
            <Scroll scrollEventThrottle={16} style={{  borderRadius: 12 }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Title style={{ color: '#fff', marginTop: 8, }}>Resgatar</Title>
                    <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Info color="#fff" size={32} />
                    </Column>
                </Row>

                <MotiView from={{ opacity: 0, translateY: -40, }} animate={{ opacity: 1, translateY: 0, }} delay={200} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 12, backgroundColor: '#ffffff', marginHorizontal: margin.h, marginTop: 20, display: 'flex' }} >
                    <Row style={{ padding: 8, }}>
                        <MotiImage source={{ uri: item.product.img }} style={{ width: 56, height: 56, borderRadius: 8,  }} />
                        <Column style={{ justifyContent: 'center', marginLeft: 20, }}>
                            <Title style={{ fontSize: 18, }}>{item?.product?.name?.length > 14 ? item?.product?.name?.slice(0, 14) + '...' : item?.product?.name} </Title>
                            <Title style={{ fontSize: 14, color: color.primary, marginTop: -5, }}>{item?.product?.value?.slice(0, -3)} pontos</Title>
                        </Column>
                    </Row>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, marginRight: 12, }}>
                        <ArrowRight color={color.primary} />
                    </Button>
                </MotiView>

                <MotiView delay={500} transition={{ type: 'spring' }} from={{ opacity: 0, translateY: 100, }} animate={{ opacity: 1, translateY: 0, }} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 20, }}>

                        <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -24, zIndex: 99, }} />
                        <Column style={{ backgroundColor: '#fff', borderRadius: 32, padding: 32, }}>
                            <Column style={{ alignSelf: 'center', marginTop: 12, }}>
                                <QRCode
                                    size={250}
                                    quietZone={10}
                                    value={item.code}
                                    logo={require('@imgs/logo_u_black.png')}
                                    logoSize={52}
                                    color={color.secundary}
                                    logoBorderRadius={0}
                                    logoBackgroundColor='#fff'
                                    logoMargin={6}
                                />
                            </Column>
                            <Title style={{ marginVertical: 10, fontSize: 18, textAlign: 'center' }}>Apresente o QRCode no estabelecimento</Title>

                            <Row style={{ marginHorizontal: - 64, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                    <Column style={{ width: '100%', height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed', }} />
                                </Column>
                                <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                            </Row>
                            <Title style={{ fontFamily: font.medium, fontSize: 18, textAlign: 'center', marginBottom: 12, }}>Ou apresente o <Title style={{ fontFamily: font.bold, fontSize: 18, }}>código abaixo</Title>{'\n'}para o atendente</Title>
                              

                            <Button onPress={handleClipboard} >
                                <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary, }}>
                                    <Title style={{ marginBottom: -3, marginRight: 12, color: clip ? color.green : color.secundary, }}>{item.code}</Title>
                                    <Clip size={22} color={color.primary} />
                                </Row>
                            </Button>
                            <Column style={{ width: 260, alignSelf: 'center', height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed', marginTop: 20, }} />
                            <Column style={{ marginTop: 12, marginBottom: 20, }}>
                                <Title style={{ fontSize: 18, }}>Detalhes</Title>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{ fontSize: 14, }}>Criado em:</Label>
                                    <Label style={{ fontSize: 14, }}>{item?.date}</Label>
                                </Row>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{ fontSize: 14, }}>Gerador:</Label>
                                    <Label style={{ fontSize: 14, }}>{item?.gerador}</Label>
                                </Row>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{ fontSize: 14, }}>Estabelecimento:</Label>
                                    <Label style={{ fontSize: 14, }}>{item?.shop?.name}</Label>
                                </Row>
                            </Column>
                            <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -52, zIndex: 99, alignSelf: 'center', }} />
                        </Column>
                    </Column>
                </MotiView>

                <Column style={{ height: 50, }} />
            </Scroll>

        </Main>
    )
}

import React, { useContext, useState, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, LabelLI, ButtonOut, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Clipboard as Clip, CircleDashed, Edit } from 'lucide-react-native';
import { Dimensions } from 'react-native';
import CheckBox from '@components/checkbox';
import Avatar from '@components/avatar';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { Snackbar } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DonateONGS from './ongs';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image'


import PaymentCredito from '@components/payments/credito';
import PaymentPix from '@components/payments/pix';
import PaymentBoleto from '@components/payments/boleto';

const { width, height } = Dimensions.get('window');

export default function DonateValueScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const valor = route?.params?.valor ? route?.params?.valor : 30;
    const [value, setvalue] = useState(valor ? valor : 30);
    const [type, settype] = useState(null);
    const [visible, setVisible] = useState(false);
    const moedas = parseInt(value) * 15;

    const bottomONGS = useRef(null);
    const [ong, setong] = useState(null);
    const handleOng = (vl) => {
        setong(vl)
        bottomONGS.current.close()
    }

    const item = {
        value: value,
        moedas: moedas,
        type: type,
        ong: ong?.id,
    }

    return (
        <Main style={{ backgroundColor: color.primary, }}>
            <StatusBar style="light" backgroundColor={color.primary} animated={true} />
            <Scroll >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 28, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Title style={{ color: '#fff', marginTop: 8, }}>Doação</Title>
                    <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Avatar />
                    </Column>
                </Row>

                <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -44, zIndex: 99, alignSelf: 'center' }} />
                <Column style={{ marginHorizontal: 16, marginTop: 24, backgroundColor: '#fff', paddingTop: 40, borderRadius: 24, paddingBottom: 12, }}>
                    <Column style={{ marginHorizontal: 20, }}>
                        <Label style={{ textAlign: 'center', }}>Você está fazendo {'\n'}uma doação de</Label>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8, marginBottom: 6, }}>
                            <Title style={{ fontSize: 32, lineHeight: 36, }}>R$ {value},00</Title>
                            <Button onPress={() => { navigation.goBack() }} style={{ justifyContent: 'center', marginLeft: 12, alignItems: 'center', width: 32, height: 32, backgroundColor: color.secundary + 20, borderRadius: 100, }}>
                                <Edit size={18} color={color.secundary} />
                            </Button>
                        </Row>
                    </Column>

                    {ong ? <Button onPress={() => { bottomONGS.current.expand() }} style={{ backgroundColor: color.blue + 30, padding: 10, marginHorizontal: 20, borderRadius: 12, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                            <Row style={{ alignItems: 'center', }}>
                                <Button>
                                    <Image transition={500} style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: ong?.img }} />
                                </Button>
                                <Column style={{ marginLeft: 14, }}>
                                    <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', }}>{ong?.name?.length >= 18 ? ong?.name.slice(0, 15) + '...' : ong?.name}</Title>
                                    <Label style={{ fontSize: 12, marginTop: -2, }}>{ong?.desc?.length >= 26 ? ong?.desc.slice(0, 20) + '...' : ong?.desc}</Label>
                                </Column>
                            </Row>
                            <CheckBox status={true} />
                        </Row>

                    </Button> : <ButtonOut onPress={() => { bottomONGS.current.expand() }} style={{ borderColor: color.primary, marginTop: 12, alignSelf: 'flex-start', paddingVertical: 8, alignSelf: 'center', borderStyle: 'dashed', }}><LabelLI style={{ color: color.primary, fontSize: 18, }}>Escolher ONG *</LabelLI></ButtonOut>}

                    <Row style={{ marginHorizontal: - 24, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                            <Column style={{ width: '100%', borderBottomWidth: 4, borderColor: '#d7d7d7', borderStyle: 'dashed', }} />
                        </Column>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                    </Row>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginHorizontal: 24, }}>
                        <Title style={{ fontSize: 20, lineHeight: 24, }}>Pagar com</Title>
                        {type != null && <Button onPress={() => { settype(null) }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, backgroundColor: color.secundary + 20, paddingHorizontal: 12, borderRadius: 8, }}>
                            <Label style={{ color: color.secundary, fontFamily: 'Font_Bold', fontSize: 15, }}>Trocar</Label>
                        </Button>}
                    </Row>

                    {type == null &&
                        <Column style={{ marginHorizontal: 24, marginBottom: 20, }}>
                            <Button disabled={ong == null} onPress={() => { settype('pix') }} style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                                <Row>
                                    <Column style={{ padding: 20, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                                        <MotiImage source={require('@icons/pix.png')} style={{ width: 32, height: 32, objectFit: 'contain', }} />
                                    </Column>
                                    <Column style={{ justifyContent: 'center', marginHorizontal: 20, }}>
                                        <Title style={{ fontSize: 18, }}>Pix</Title>
                                        <Label style={{ fontSize: 16, }}>Pagamento instantâneo</Label>
                                    </Column>
                                </Row>
                            </Button>

                            <Button disabled={ong == null} onPress={() => { settype('credito') }} style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                                <Row>
                                    <Column style={{ padding: 20, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                                        <MotiImage source={require('@icons/credit.png')} style={{ width: 32, height: 32, objectFit: 'contain', }} />
                                    </Column>
                                    <Column style={{ justifyContent: 'center', marginHorizontal: 20, }}>
                                        <Title style={{ fontSize: 18, }}>Cartão de crédito</Title>
                                        <Label style={{ fontSize: 16, }}>Adicionar cartão</Label>
                                    </Column>
                                </Row>
                            </Button>

                            <Button disabled={ong == null} onPress={() => { navigation.navigate('PayBoleto', { item }) }} style={{ marginTop: 12, paddingBottom: 12, }}>
                                <Row>
                                    <Column style={{ padding: 20, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                                        <MotiImage source={require('@icons/boleto.png')} style={{ width: 32, height: 32, objectFit: 'contain', }} />
                                    </Column>
                                    <Column style={{ justifyContent: 'center', marginHorizontal: 20, }}>
                                        <Title style={{ fontSize: 18, }}>Boleto</Title>
                                        <Label style={{ fontSize: 16, }}>Pagamento com validação</Label>
                                    </Column>
                                </Row>
                            </Button>
                        </Column>
                    }

                    {type == 'pix' && <PaymentPix item={item} navigation={navigation} />}

                    {type == 'credito' && <PaymentCredito item={item} navigation={navigation} />}

                </Column>

                <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginTop: -20, marginBottom: 50, zIndex: 99, alignSelf: 'center' }} />
            </Scroll>

            <BottomSheet ref={bottomONGS} snapPoints={[0.4, height]} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 0, }} handleIndicatorStyle={{ backgroundColor: "#30303030", width: 80, height: 10, borderRadius: 100, }}>
                <BottomSheetScrollView>
                    <DonateONGS handleOng={handleOng} value={value} />
                </BottomSheetScrollView>
            </BottomSheet>
            <Snackbar style={{ backgroundColor: "#fff", marginVertical: 12, marginHorizontal: margin.h, }} visible={visible} onDismiss={() => setVisible(false)} action={{ label: 'Pronto', onPress: () => setVisible(false), }}><Label>Copiado para a área de transferência</Label></Snackbar>
        </Main>
    )
}
//<Label style={{ paddingVertical: 8, fontSize: 15, paddingHorizontal: 16, marginBottom: 24, backgroundColor: color.primary + 30, color: color.primary, borderRadius: 100, alignSelf: 'center', fontFamily: 'Font_Bold', }}>{moedas} moedas</Label>
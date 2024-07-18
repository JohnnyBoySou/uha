import React, { useContext, useState, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, LabelLI, LabelPR, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Clipboard as Clip, CircleDashed, Edit, CreditCard, Banknote, ScrollText } from 'lucide-react-native';
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
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function DonateValueScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const valor = route?.params?.valor ? route?.params?.valor : 30;
    const [visible, setVisible] = useState(false);

    const [type, settype] = useState();

    const modalONGs = useRef(null);
    const modalPix = useRef(null);
    const modalCredit = useRef(null)
    const modalBoleto = useRef(null)

    const [ong, setong] = useState(null);
    const handleOng = (vl) => {
        setong(vl)
        modalONGs.current.close()
    }

    const item = {
        value: valor,
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
                    <Column style={{ marginHorizontal: 20, marginBottom: 16, }}>
                        <Label style={{ textAlign: 'center', color: color.secundary + 99, fontSize: 16, lineHeight: 16, }}>Você está fazendo {'\n'}uma doação de</Label>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8, marginBottom: 6, }}>
                            <Title style={{ fontSize: 32, lineHeight: 36, }}>R$ {valor},00</Title>
                            <Button onPress={() => { navigation.goBack() }} style={{ justifyContent: 'center', marginLeft: 12, alignItems: 'center', width: 32, height: 32, backgroundColor: color.secundary + 20, borderRadius: 100, }}>
                                <Edit size={18} color={color.secundary} />
                            </Button>
                        </Row>
                    </Column>

                    {ong ? <Button onPress={() => { modalONGs.current.expand() }} style={{ backgroundColor: color.blue + 30, padding: 10,marginHorizontal: 20, borderRadius: 12, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                            <Row style={{ alignItems: 'center', }}>
                                <Button>
                                    <Image transition={500} style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: ong?.img }} />
                                </Button>
                                <Column style={{ marginLeft: 14, }}>
                                    <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', lineHeight: 18, }}>{ong?.name?.length >= 18 ? ong?.name.slice(0, 15) + '...' : ong?.name}</Title>
                                    <Label style={{ fontSize: 12, lineHeight: 14, }}>{ong?.descri?.length >= 26 ? ong?.descri.slice(0, 20) + '...' : ong?.descri}</Label>
                                </Column>
                            </Row>
                            <CheckBox status={true} />
                        </Row>

                    </Button> : <ButtonPR onPress={() => { modalONGs.current.expand(); }} style={{  alignSelf: 'center', }}><LabelPR style={{ fontSize: 18, }}>Escolher ONG *</LabelPR></ButtonPR>}

                    <Row style={{ marginHorizontal: - 24, justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                            <Column style={{ width: '100%', borderBottomWidth: 4, borderColor: '#d7d7d7', borderStyle: 'dashed', }} />
                        </Column>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                    </Row>
                    {ong ? <Metodos settype={settype} value={valor} ong={ong} modalCredit={modalCredit} modalPix={modalPix} modalBoleto={modalBoleto}/> : <Help />}

                </Column>

                <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginTop: -20, marginBottom: 50, zIndex: 99, alignSelf: 'center' }} />
            </Scroll>

            <BottomSheet ref={modalONGs} snapPoints={[0.4, 0.99 * height]} backgroundStyle={{ backgroundColor: '#fff', }} handleIndicatorStyle={{ backgroundColor: "#30303030", width: 80, height: 10, borderRadius: 100, }}>
                <BottomSheetScrollView>
                    <DonateONGS handleOng={handleOng} value={valor} />
                </BottomSheetScrollView>
            </BottomSheet>

            <BottomSheet ref={modalPix} snapPoints={[0.4, 0.99 * height]} backgroundStyle={{ backgroundColor: '#fff', }} handleIndicatorStyle={{ backgroundColor: "#30303030", width: 80, height: 10, borderRadius: 100, }}>
                <BottomSheetScrollView>
                   {type == 'Pix' && <PaymentPix item={item} navigation={navigation} modalPix={modalPix} />}
                </BottomSheetScrollView>
            </BottomSheet>

            <BottomSheet ref={modalCredit} keyboardBehavior={'fillParent'} snapPoints={[0.4, 0.99 * height]} backgroundStyle={{ backgroundColor: '#fff', }} handleIndicatorStyle={{ backgroundColor: "#30303030", width: 80, height: 10, borderRadius: 100, }}>
                <BottomSheetScrollView>
                {type == 'Credito' &&  <PaymentCredito item={item} navigation={navigation} modalCredit={modalCredit} />}
                </BottomSheetScrollView>
            </BottomSheet>

            <BottomSheet ref={modalBoleto} keyboardBehavior={'fillParent'} snapPoints={[0.4, 0.99 * height]} backgroundStyle={{ backgroundColor: '#fff', }} handleIndicatorStyle={{ backgroundColor: "#30303030", width: 80, height: 10, borderRadius: 100, }}>
                <BottomSheetScrollView>
                {type == 'Boleto' &&  <PaymentBoleto item={item} navigation={navigation} modalBoleto={modalBoleto} />}
                </BottomSheetScrollView>
            </BottomSheet>

            <Snackbar style={{ backgroundColor: "#fff", marginVertical: 12, marginHorizontal: margin.h, }} visible={visible} onDismiss={() => setVisible(false)} action={{ label: 'Pronto', onPress: () => setVisible(false), }}><Label>Copiado para a área de transferência</Label></Snackbar>
        </Main>
    )
}

const Metodos = ({  modalPix, modalCredit, modalBoleto, settype }) => {
    const { color } = useContext(ThemeContext);
    return (
        <Column style={{ marginHorizontal: 28, paddingVertical: 24,}}>
            <Title style={{ fontSize: 18, lineHeight: 18, }}>Metodos de pagamento</Title>
            <Label style={{ fontSize: 15, color: color.secundary+99, lineHeight: 18, }}>Escolha um para prosseguir</Label>
            <Column style={{ marginVertical: 12, }}>
                <Button onPress={() => { modalPix.current.expand(); settype('Pix') }} style={{ justifyContent: 'center', borderColor: '#d7d7d790', borderWidth: 1, padding: 12, borderRadius:12, }}>
                    <Row>
                        <Column style={{ padding: 12, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <MotiImage source={require('@icons/pix.png')} style={{ width: 24, height: 24, objectFit: 'contain', }} />
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20, }}>
                            <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', lineHeight: 18, }}>Pix</Title>
                            <Label style={{ fontSize: 13, lineHeight: 14, color: color.secundary+99, }}>Pagamento instantâneo</Label>
                        </Column>
                        <Label style={{ fontSize: 11, backgroundColor: color.primary, fontFamily: 'Font_Bold', color: '#fff', padding: 4, paddingHorizontal: 12, position: 'absolute', top: -12, right: -12, borderBottomLeftRadius: 12, }}>POPULAR</Label>
                    </Row>
                </Button>

                <Button  onPress={() => { modalCredit.current.expand(); settype('Credito') }} style={{ borderWidth: 1, borderColor: '#d7d7d790', marginTop: 12, padding: 12, borderRadius: 12,}}>
                    <Row>
                        <Column style={{ padding: 12, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <CreditCard size={24} color={color.primary} />
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20, }}>
                            <Title style={{ fontSize: 16, lineHeight: 18, }}>Cartão de crédito</Title>
                            <Label style={{ fontSize: 13, lineHeight: 14, color: color.secundary+99, }}>Pagamento instantâneo</Label>
                        </Column>
                    </Row>
                </Button>

                <Button onPress={() => { modalBoleto.current?.expand(); settype('Boleto') }} style={{ borderWidth: 1, borderRadius: 12, borderColor: '#d7d7d790', marginTop: 12, padding: 12, }}>
                    <Row>
                        <Column style={{ padding: 12, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <ScrollText size={24} color={color.primary} />
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20, }}>
                            <Title style={{ fontSize: 16, lineHeight: 18,  }}>Boleto</Title>
                            <Label style={{ fontSize: 13, lineHeight: 14, color: color.secundary+99, }}>Pagamento com validação</Label>
                        </Column>
                    </Row>
                </Button>

            </Column></Column>
    )
}

export const Help = () => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 300 }} style={{ justifyContent: 'center', alignItems: 'center', padding: 12, }}>
            <Column style={{ backgroundColor: color.primary + 20, padding: 20, borderRadius: 100, }}>
                <FontAwesome5 name="hands-helping" size={32} color={color.primary} />
            </Column>
            <Title style={{ textAlign: 'center', lineHeight: 20, fontSize: 20, marginTop: 12, }}>Como fazer uma doação</Title>

            <Column style={{ marginBottom: 20, marginTop: 6,}}>
                <Row style={{ alignItems: 'center', marginVertical: 12, }}>
                    <Column style={{ width: 42, height: 42, marginRight: 20, backgroundColor: color.primary + 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}><Title style={{ color: color.primary, }}>1</Title></Column>
                    <Column>
                        <Title style={{ fontSize: 15, lineHeight: 18, marginBottom: 3, }}>Defina um valor</Title>
                        <Label style={{ fontSize: 12, lineHeight: 13, width: 220, }}>Digite o valor que deseja doar e clique em continuar.</Label>
                    </Column>
                </Row>
                <Row style={{ alignItems: 'center', marginVertical: 12, }}>
                    <Column style={{ width: 42, height: 42, marginRight: 20, backgroundColor: color.primary + 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}><Title style={{ color: color.primary, }}>2</Title></Column>
                    <Column>
                        <Title style={{ fontSize: 15, lineHeight: 18, marginBottom: 3, }}>Escolha uma ONG</Title>
                        <Label style={{ fontSize: 12, lineHeight: 13, width: 220, }}>Selecione a ONG em que deseja beneficiar com a doação.</Label>
                    </Column>
                </Row>
                <Row style={{ alignItems: 'center', marginVertical: 12, }}>
                    <Column style={{ width: 42, height: 42, marginRight: 20, backgroundColor: color.primary + 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}><Title style={{ color: color.primary, }}>3</Title></Column>
                    <Column>
                        <Title style={{ fontSize: 15, lineHeight: 18, marginBottom: 3, }}>Realize o pagamento</Title>
                        <Label style={{ fontSize: 12, lineHeight: 13, width: 220, }}>Ao finalizar o pagamento, os pontos serão adicionados ao seu saldo automaticamente.</Label>
                    </Column>
                </Row>
            </Column>
        </MotiView>
    )
}
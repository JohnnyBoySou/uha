import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI, ButtonOut, U, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, CircleCheck, CheckCircle, Info, ScrollText, Moon, CircleX, LogOut, Delete, Clipboard as Clip, CircleDashed, Edit } from 'lucide-react-native';
import CheckBox from '@components/checkbox';
import Check from '@components/check';
import Avatar from '@components/avatar';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DonateONGS from './ongs';
import QRCode from 'react-native-qrcode-svg';

export default function DonateValueScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState(false);
    const valor = route?.params?.valor ? route?.params?.valor : 30;
    const [value, setvalue] = useState(valor ? valor : 30);
    const [type, settype] = useState(null);
    const [visible, setVisible] = useState(false);
    const moedas = parseInt(value) * 6;

    const bottomONGS = useRef(null);
    const [ong, setong] = useState(false);
    const handleOng = (vl) => {
        setong(vl)
        bottomONGS.current.close()
    }

    const item = {
        value: value,
        moedas: moedas,
        type: type,
        ong: 'ONG 1',
    }

    return (
        <Main style={{ backgroundColor: color.primary, }}>
            <Scroll >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Title style={{ color: '#fff', marginTop: 8, }}>Doação</Title>
                    <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Avatar />
                    </Column>
                </Row>

                <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -44, zIndex: 99, alignSelf: 'center' }} />
                <Column style={{ marginHorizontal: 16, marginTop: 24, backgroundColor: '#fff', paddingTop: 40, borderRadius: 24, paddingBottom:12,  }}>

                    <Column style={{ marginHorizontal: 20, }}>
                        <Label style={{ textAlign: 'center', }}>Você está fazendo {'\n'}uma doação de</Label>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8, marginBottom: 6, }}>
                            <Title style={{ fontSize: 32, lineHeight: 36, }}>R$ {value},00</Title>
                            <Button onPress={() => { navigation.goBack() }} style={{ justifyContent: 'center', marginLeft: 12, alignItems: 'center', width: 32, height: 32, backgroundColor: color.secundary + 20, borderRadius: 100, }}>
                                <Edit size={18} color={color.secundary} />
                            </Button>
                        </Row>
                        <Label style={{ paddingVertical: 8, fontSize: 15, paddingHorizontal: 16, marginBottom: 24, backgroundColor: color.primary + 30, color: color.primary, borderRadius: 100, alignSelf: 'center', fontFamily: 'Font_Bold', }}>{moedas} moedas</Label>
                    </Column>

                    {ong && <Button onPress={() => { bottomONGS.current.expand() }} style={{ backgroundColor: color.blue + 30, padding: 10, marginHorizontal: 20, borderRadius: 12, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                            <Row style={{ alignItems: 'center', }}>
                                <Button>
                                    <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: ong?.img }} />
                                </Button>
                                <Column style={{ marginLeft: 14, }}>
                                    <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', }}>{ong?.name.length >= 20 ? ong?.name.slice(0, 15) + '...' : ong?.name}</Title>
                                    <Label style={{ fontSize: 12, marginTop: -2, }}>{ong?.desc.length >= 26 ? ong?.desc.slice(0, 20) + '...' : ong?.desc}</Label>
                                </Column>
                            </Row>
                            <CheckBox status={true} />
                        </Row>

                    </Button>}


                    {!ong && <ButtonOut onPress={() => { bottomONGS.current.expand() }} style={{ borderColor: color.primary, alignSelf: 'flex-start', paddingVertical: 8, alignSelf: 'center', borderStyle: 'dashed', }}>
                        <LabelLI style={{ color: color.primary, fontSize: 18, }}>Escolher ONG</LabelLI>
                    </ButtonOut>
                    }

                    <Row style={{ marginHorizontal: - 24, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                            <Column style={{ width: '100%', height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed', }} />
                        </Column>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                    </Row>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginHorizontal: 24, }}>
                        <Title style={{ fontSize: 20, lineHeight: 24, }}>Pagar com</Title>
                        {type != null && <Button onPress={() => { settype(null) }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, backgroundColor: color.secundary + 20, paddingHorizontal: 12, borderRadius: 8, }}>
                            <Label style={{ color: color.secundary, fontFamily: 'Font_Bold', fontSize: 15, }}>Trocar</Label>
                        </Button>}
                    </Row>


                    <AnimatePresence>


                        {type == null && <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} style={{ marginHorizontal: 24, marginBottom: 20, }}>
                            <Button onPress={() => { settype('pix') }} style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
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

                            <Button onPress={() => { settype('credito') }} style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
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

                            <Button onPress={() => { navigation.navigate('PayBoleto', { item }) }} style={{ marginTop: 12, paddingBottom: 12, }}>
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
                        </MotiView>
                        }
                    </AnimatePresence>

                    {type == 'pix' &&
                        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} style={{ marginHorizontal: 24, }}>
                            <Button onPress={() => { settype('pix') }} style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
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
                            <ContextPix navigation={navigation} />
                        </MotiView>}

                    {type == 'credito' &&
                        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} style={{ marginHorizontal: 24, marginBottom: 20, }}>
                            <Button style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
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
                            <ContextCredit item={item} navigation={navigation} />
                        </MotiView>}

                </Column>

                <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginTop: -20 , marginBottom: 50, zIndex: 99, alignSelf: 'center' }} />
            </Scroll>
            <BottomSheet ref={bottomONGS} snapPoints={[0.4, 600]} backgroundStyle={{ backgroundColor: '#f7f7f7' }}>
                <BottomSheetScrollView>
                    <DonateONGS handleOng={handleOng} value={value} />
                </BottomSheetScrollView>
            </BottomSheet>


            <Snackbar style={{ backgroundColor: "#fff", marginVertical: 12, marginHorizontal: margin.h, }} visible={visible} onDismiss={() => setVisible(false)} action={{ label: 'Pronto', onPress: () => setVisible(false), }}><Label>Copiado para a área de transferência</Label></Snackbar>

        </Main>
    )
}

const ContextPix = ({ item, navigation }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const data = { pix: 'chavepix09876543456789087' }
    const [clip, setclip] = useState();
    const handleClipboard = async () => {
        await Clipboard.setStringAsync(data.pix);
        setclip(true)
    };

    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Column style={{ borderWidth: 1, borderColor: color.primary, borderRadius: 32, padding: 32, backgroundColor: "#fff", marginVertical: 20, }}>
                <QRCode
                    size={230}
                    quietZone={10}
                    value={data?.pix}
                    logo={require('@imgs/logo_u_black.png')}
                    logoSize={52}
                    color={color.secundary}
                    logoBorderRadius={0}
                    logoBackgroundColor='#fff'
                    logoMargin={6}
                />
            </Column>
            <Label style={{ marginVertical: 20, }}>Ou copie o código para pagamento</Label>
            <Button onPress={handleClipboard} >
                <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary, }}>
                    <Title style={{ marginBottom: -3, marginRight: 12, color: clip ? color.green : color.secundary, fontSize: 16, }}>{data.pix}</Title>
                    <Clip size={22} color={color.primary} />
                </Row>
            </Button>
            <Row style={{ alignItems: 'center', marginTop: 30, }}>
                <Title style={{ marginRight: 6, fontSize: 18, fontFamily: 'Font_Medium', }}>Status:</Title>
                <Title style={{ marginRight: 6, fontSize: 18, }}>Aguardando pagamento</Title>
                <CircleDashed color={color.blue} size={24} />
            </Row>

            <Row style={{ paddingVertical: 20, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', }}>
                <ButtonPR style={{ paddingHorizontal: 24, }} onPress={() => { navigation.navigate('BuyServiceSuccess') }} >
                    <LabelLI style={{ color: '#fff', }}>Transferir</LabelLI>
                </ButtonPR>
            </Row>
        </Column>
    )
}

const ContextCredit = ({ item, navigation }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const data = { codigo: '0987643212345678909876543212345678900987654321', value: item?.value, vencimento: '10/10/2024', email: 'user@mail.com', points: 120, }
    const [remember, setremember] = useState(true);

    const [number, setnumber] = useState();
    const [cvv, setcvv] = useState();
    const [val, setval] = useState();
    return (
        <Column style={{ justifyContent: 'center', }}>



            <Column style={{ marginTop: 20, }}>
                <SubLabel style={{ fontSize: 14, color: color.secundary, }}>NÚMERO DO CARTÃO</SubLabel>
                <TextInput value={number} onChangeText={(e) => setnumber(e)} style={{ borderBottomWidth: 2, borderBottomColor: color.off, fontFamily: 'Font_Medium', marginTop: 10, fontSize: 20, flexGrow: 1, }} placeholder='0000 0000 0000 0000' />
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 12, }}>
                <Column>
                    <SubLabel style={{ fontSize: 14, color: color.secundary, }}>DATA DE EXPIRAÇÃO</SubLabel>
                    <TextInput value={val} onChangeText={(e) => setval(e)} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 10, fontFamily: 'Font_Medium', fontSize: 20, width: 150, }} placeholder='MM/AA' />
                </Column>
                <Column>
                    <SubLabel style={{ fontSize: 14, color: color.secundary, }}>CVV</SubLabel>
                    <TextInput value={cvv} onChangeText={(e) => setcvv(e)} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 10, fontFamily: 'Font_Medium', fontSize: 20, flexGrow: 1, width: 150, }} placeholder='000' />
                </Column>
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                <Label style={{ fontSize: 14, fontFamily: 'Font_Bold', marginRight: 10, }}>Lembrar deste cartão para uso futuro</Label>
                <Button onPress={() => { setremember(!remember) }} style={{ alignSelf: 'center', }} >
                    <Check status={remember} />
                </Button>
            </Row>

            <ButtonPR style={{ paddingHorizontal: 24, marginTop: 40, }} onPress={() => { navigation.navigate('BuyServiceSuccess') }} >
                <LabelLI style={{ color: '#fff', }}>Continuar</LabelLI>
            </ButtonPR>




        </Column>
    )
}



const listOngs = [
    {
        id: 1,
        name: 'ONG 1',
        desc: 'Descrição da ONG 1',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'

    },
    {
        id: 2,
        name: 'ONG 2',
        desc: 'Descrição da ONG 2',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'

    },
    {
        id: 3,
        name: 'ONG 3',
        desc: 'Descrição da ONG 3',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'

    },
]
const ONGS = ({ navigation }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(false);
    return (
        <Column style={{ paddingHorizontal: margin.h, paddingVertical: margin.v, }}>
            <Title style={{ fontSize: 36, lineHeight: 40, marginBottom: 12, }}>Escolha qual ONG {'\n'}deseja beneficiar</Title>
            <Label>Ao cadastrar sua nota o valor de R$00,00 será doado para a ONG abaixo de sua escolha</Label>
            <ButtonOut onPress={() => { settype(!type) }} style={{ borderColor: type ? '#fff' : color.primary, paddingVertical: 8, marginVertical: 18, backgroundColor: type ? color.primary : 'transparent' }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <LabelLI style={{ color: type ? '#fff' : color.primary }}>Deixar escolha em aberto</LabelLI>
                    <CheckCircle size={20} color='#fff' style={{ marginLeft: 12, }} />
                </Row>
            </ButtonOut>

            <FlatList
                data={listOngs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Button onPress={() => { navigation.navigate('ONGSingle', { item: item, }) }} key={item.id} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginBottom: 12, paddingBottom: 12, }}>
                        <Row style={{ alignItems: 'center', }}>
                            <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} />
                            <Column style={{ marginLeft: 20, }}>
                                <Title>{item?.name}</Title>
                                <Label>{item?.desc}</Label>
                            </Column>
                        </Row>
                    </Button>
                )}
            />
        </Column>
    )
}
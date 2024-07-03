import React, { useContext, useState, useRef } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, LabelLI, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, ArrowLeft, Info, Clipboard as Clip, CheckCircle, Edit, CircleDashed } from 'lucide-react-native';
import CheckBox from '@components/checkbox';
import { MotiImage, MotiView } from 'moti';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { StatusBar } from 'expo-status-bar'
import QRCode from 'react-native-qrcode-svg';
import DonateONGS from './ongs';


export default function DonateValueHideScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const value = route.params?.value;
    const item = { code: '122131313', }

    const [visible, setVisible] = useState(false);
    const data = { pix: 'chavepix09876543456789087' }
    const [clip, setclip] = useState(false);
    const handleClipboard = async () => {
        await Clipboard.setStringAsync(data.pix);
        setclip(true)
    };

    const bottomONGS = useRef(null);
    const [ong, setong] = useState();
    const handleOng = (vl) => {
        setong(vl)
        bottomONGS.current.close()
    }


    return (
        <Main style={{ backgroundColor: color.primary, }}>
            
            <StatusBar style="dark" backgroundColor={color.primary} animated={true}/>
            <Scroll >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Title style={{ color: '#fff', marginTop: 8, }}>Doação anônima</Title>
                    <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Info color="#fff" size={32} />
                    </Column>
                </Row>

                <MotiView from={{opacity: 0, translateY: 150,}} animate={{opacity: 1, translateY: 0,}} delay={500} transition={{type: 'timing'}}>
                <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -44, zIndex: 99, alignSelf: 'center' }} />
                <Column style={{ marginHorizontal: 16, marginTop: 24, backgroundColor: '#fff', paddingTop: 40, borderRadius: 24,  marginBottom: 50,}}>

                    <Column style={{ marginHorizontal: 20, }}>
                        <Label style={{ textAlign: 'center', }}>Você está fazendo {'\n'}uma doação de</Label>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8, marginBottom: 12, }}>
                            <Title style={{ fontSize: 32, lineHeight: 36, }}>R$ {value},00</Title>
                            <Button onPress={() => { navigation.goBack() }} style={{ justifyContent: 'center', marginLeft: 12, alignItems: 'center', width: 32, height: 32, backgroundColor: color.secundary + 20, borderRadius: 100, }}>
                                <Edit size={18} color={color.secundary} />
                            </Button>
                        </Row>
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


                    {!ong && <ButtonOut onPress={() => { bottomONGS.current.expand() }} style={{ borderColor: color.primary, alignSelf: 'flex-start', paddingVertical: 8,  alignSelf: 'center', borderStyle: 'dashed', }}>
                        <LabelLI style={{ color: color.primary }}>Escolher ONG</LabelLI>
                    </ButtonOut>
                    }
                    <Row style={{ marginHorizontal: - 24, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                            <Column style={{ width: '100%', height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed', }} />
                        </Column>
                        <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                    </Row>
                    <Title style={{ textAlign: 'center', }}>Aponte a câmera</Title>
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ borderWidth: 1, borderColor: color.primary, borderRadius: 32, padding: 32, backgroundColor: "#fff", marginVertical: 20, }}>
                                <QRCode
                                    size={230}
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
                            <Row style={{ marginHorizontal: - 24, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                    <Column style={{ width: '100%', height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed', }} />
                                </Column>
                                <Column style={{ width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                            </Row>
                            <Label style={{ marginVertical: 20, }}>Ou copie o código para pagamento</Label>
                            <Button onPress={handleClipboard} >
                                <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary, }}>
                                    <Title style={{ marginBottom: -3, marginRight: 12, color: clip ? color.green : color.secundary, }}>{item.code}</Title>
                                    <Clip size={22} color={color.primary} />
                                </Row>
                            </Button>

                            <Row style={{ alignItems: 'center', marginTop: 30, marginBottom: 30, }}>

                                <Title style={{ marginRight: 6, fontSize: 18, fontFamily: 'Font_Medium', }}>Status:</Title>
                                <Title style={{ marginRight: 6, fontSize: 18, }}>Aguardando pagamento</Title>
                                <CircleDashed color={color.blue} size={24} />
                            </Row>


                        </Column>
                    </MotiView>

                </Column>
                </MotiView>
                <Column style={{height: 40, }} />

            </Scroll>

            <BottomSheet ref={bottomONGS} snapPoints={[0.4, 800]} backgroundStyle={{backgroundColor: '#f7f7f7'}}>
                <BottomSheetScrollView>
                    <DonateONGS handleOng={handleOng} value={value} />
                </BottomSheetScrollView>
            </BottomSheet>

        </Main>
    )
}

/**
 *     <Row style={{ padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', }}>
                                <ButtonPR style={{ paddingHorizontal: 24, }} onPress={() => { navigation.navigate('BuyServiceSuccess') }} >
                                    <LabelLI style={{ color: '#fff', }}>Fazer doação</LabelLI>
                                </ButtonPR>
                            </Row>
 * 
 */

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
const ONGS = ({ navigation, value }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(false);
    return (
        <Column style={{ paddingHorizontal: margin.h, paddingVertical: margin.v, }}>
            <Title style={{ fontSize: 36, lineHeight: 40, marginBottom: 12, }}>Escolha qual ONG {'\n'}deseja beneficiar</Title>
            <Label>Ao cadastrar sua nota o valor de R$ {value},00 será doado para a ONG abaixo de sua escolha</Label>
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
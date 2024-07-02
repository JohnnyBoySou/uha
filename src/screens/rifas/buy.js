import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI, ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, Clipboard as Clip, ArrowLeft, Info, ScrollText, Moon, CircleDashed, Minus, Plus, X } from 'lucide-react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { MotiView } from 'moti';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';

export default function RifasBuyScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState(5);
    const [loading, setloading] = useState(false);
    const sheetRifa = useRef();

    const item = route.params?.camp







    const handleClick = (digit) => {
        if (value + digit <= values.total) {
            setvalue(value + digit);
        } else {
            return
        }
    }
    const handleAdd = () => {
        if (value * 15 >= values.total) {
            return
        }
        else if (value < values.total) {
            setvalue(`${parseInt(value) + 1}`);
        } else {
            return
        }
    }

    const handleRemove = () => {
        if (value > 0) {
            setvalue(`${parseInt(value) - 1}`);
        } else {
            return
        }
    }
    const values = {
        total: 300,
    }

    const handleFinish = () => {
        if (value.length == 0) {
            return
        }
        else if (value > values.total) {
            return
        }
        else if (value == '0') {
            return
        }
        else {
            setloading(true);
            setTimeout(() => {
                sheetRifa.current.expand()
                setloading(false)
            }, 1500);
        }
    }

    const handleTotalValue = () => {
        setvalue(values.total / 15)
    }

    const bottomEnviar = useRef(null);
    const [codigo, setcodigo] = useState();
    const Pontos = value * 15;
    const a = false;


    
    const [visible, setVisible] = useState(false);
    const data = { pix: 'chavepix09876543456789087' }
    const [clip, setclip] = useState(false);
    const handleClipboard = async () => {
        await Clipboard.setStringAsync(data.pix);
        setclip(true)
    };

    return (
        <Main style={{ backgroundColor: color.secundary, paddingTop: 60, }}>
            
            <StatusBar style="light"  backgroundColor={color.secundary} animated={true}/>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#ffffff20", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <ArrowLeft color="#fff" />
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                    <Info color="#fff" size={32} />
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                <Label style={{ color: '#fff', textAlign: 'center', }}>Campanha</Label>
                <Title style={{ fontSize: 28, lineHeight: 34, color: '#fff', textAlign: 'center', }}>{item?.name}</Title>
            </Column>

            <Column style={{ justifyContent: 'center', alignItems: 'center', marginTop: 120, }}>
                <Label style={{ textAlign: 'center', color: '#fff', }}>Quantidade de rifas</Label>
                <Keyboard handleClick={handleClick} handleAdd={handleAdd} handleRemove={handleRemove} value={value} disabled={loading} />
                <Label style={{ color: '#fff', }}>Pontos recebidos: {Pontos}</Label>

                {a && <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: '#fff', }}>Pontos disponíveis: </Label>
                    <Button disabled={loading} onPress={handleTotalValue} style={{ borderRadius: 100, }} >
                        <Label style={{ fontFamily: font.bold, color: '#fff', backgroundColor: color.primary + 40, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 12, }}>{values.total}</Label>
                    </Button>
                </Row>}
                <Label style={{ color: '#fff', marginTop: 100, }}>1 ficha = 15 Pontos</Label>
            </Column>
            <Column style={{ position: 'absolute', bottom: 0, backgroundColor: "#fff", padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, width: '100%', }}>
                <Column style={{ width: 80, height: 8, backgroundColor: color.secundary + 40, borderRadius: 100, alignSelf: 'center', marginTop: -18, }}/>
                <ButtonLI onPress={handleFinish} disabled={loading} style={{ backgroundColor: color.primary, paddingHorizontal: 24, flexGrow: 1, marginTop: 20, }}>
                    <>
                        {loading ? <ActivityIndicator color={color.light} size={24} style={{ marginHorizontal: 31, marginVertical: 1 }} /> : <LabelLI style={{ color: '#fff', }}>Transferir</LabelLI>}
                    </>
                </ButtonLI>
            </Column>

            <BottomSheet ref={sheetRifa} snapPoints={[0.5, 700]} backgroundStyle={{ backgroundColor: "#fff",  borderRadius: 24, }}  handleIndicatorStyle={{ backgroundColor: color.secundary + 40, width: 80, height: 8, borderRadius: 100, }}>
                <BottomSheetView style={{ paddingHorizontal: margin.h, flex: 1, }}>
                    <Title style={{ textAlign: 'center', fontFamily: 'Font_Medium', fontSize: 22,marginTop: 12, }}>Você está comprando <Title style={{ fontFamily: 'Font_Bold' }}>{value}</Title> rifas</Title>
                    
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
                            <Title style={{ textAlign: 'center', fontSize: 16, marginTop: -10, marginBottom: 12, }}>Aponte a câmera</Title>

                            
                            <Label style={{ marginVertical: 20, }}>Ou copie o código para pagamento</Label>
                            <Button onPress={handleClipboard} >
                                <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary, }}>
                                    <Title style={{ marginBottom: -3, marginRight: 12, fontSize: 16, color: clip ? color.green : color.secundary, }}>chavepix09876543456789087</Title>
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

                </BottomSheetView>
            </BottomSheet>

            <BottomSheet ref={bottomEnviar} snapPoints={[1, 340]}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ textAlign: 'center', marginVertical: 12, }}>Digite o código</Title>
                    <Column style={{ width: 300, alignSelf: 'center', }}>
                        <TextInput value={codigo} onChangeText={e => setcodigo(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard'
                            style={{ borderWidth: 2, width: 300, height: 100, alignSelf: 'center', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18, }} numberOfLines={3} multiline
                            placeholder='12345678909876543212345678909876543211234'
                            maxLength={44}
                        />
                        <Label style={{ marginTop: -40, marginBottom: 24, marginRight: 10, alignSelf: 'flex-end', fontSize: 16, fontFamily: font.bold, color: "#111", }}>{value.length}/44</Label>
                    </Column>
                    <Label style={{ textAlign: 'center', }}>Sequência de 44 números</Label>
                    <ButtonOut onPress={() => { bottomEnviar.current?.close() }} style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                        <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Verificar</Label>
                    </ButtonOut>
                </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}


const Keyboard = ({ handleRemove, handleAdd, handleClean, value, disabled }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 24, }}>
                <Button onPress={handleRemove} disabled={disabled} style={{ width: 64, height: 64, color: "#fff", borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                    <Minus color="#ffffff" size={32} />
                </Button>
                <Button onPress={() => { }} disabled={disabled} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", fontSize: 42, lineHeight: 48, }}>{value}</Digit>
                </Button>
                <Button onPress={handleAdd} disabled={disabled} style={{ width: 64, height: 64, color: "#fff", borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                    <Plus color="#ffffff" size={32} />
                </Button>
            </Row>

        </Column>
    )
}
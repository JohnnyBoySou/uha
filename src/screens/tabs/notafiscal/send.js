import React, { useEffect, useContext, useState, useRef, } from 'react';

import { TextInput, Dimensions, Keyboard, Platform } from 'react-native';
import { Main, Column, Label, Title, Row, Button, ButtonPR, LabelPR, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiView, } from 'moti';

import Avatar from '@components/avatar';
import Header from '@components/header';
import BottomSheet, { BottomSheetView, } from '@gorhom/bottom-sheet';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NotepadText, X, } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = 1.2 * height;
const SCREEN_WIDTH = width;

import { Camera, CameraView } from 'expo-camera';
// navigation.navigate('NotafiscalONGSAnonimo', { notas: notas, origin: origin, });

//const type = route.params?.type;
//const origin = route.params?.origin;

export default function NotafiscalSendScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState(null);

    const modalDigitNota = useRef(null);
    const [focusInput, setfocusInput] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [flash, setflash] = useState(false);

    useEffect(() => {
        const getCameraPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getCameraPermission();
    }, []);

    if (hasPermission === null) {
        return <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Title align="center">Solicitando permissão para usar a câmera...</Title>
        </Column>
    }
    if (hasPermission === false) {
        return <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Title align="center" >Permissão para acessar a câmera foi negada</Title>
        </Column>
    }

    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <StatusBar style="light" translucent />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 28, zIndex: 999, top: Platform.OS == 'ios' ? 10 : 50,  }}>
                <Header />
                <Avatar />
            </Row>
            <Column>
                <CameraView
                    barcodeScannerSettings={{ barcodeTypes: ["qr"], }}
                    style={{ flex: 1, borderRadius: 12, overflow: 'hidden', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, position: 'absolute', top: -50, backgroundColor: '#f7f7f7' }}
                    facing="back"
                    autoFocus='on'
                    enableTorch={flash}
                    zoom={0}
                    onBarcodeScanned={(data) => {
                        navigation.navigate('NotafiscalVerify', { nota: data.data })
                    }}>
                </CameraView>

                <Column style={{ position: 'absolute', top: -50, left: 0, right: 0, bottom: 0, width: SCREEN_WIDTH, height: 1.1 * SCREEN_HEIGHT, zIndex: 0, }}>
                    <Column style={{ width: SCREEN_WIDTH, height: 200, backgroundColor: '#00000080', marginBottom:-0.2, }}></Column>
                    <Row>
                        <Column style={{ flexGrow: 1, height: 250, backgroundColor: '#00000080', }}></Column>
                        <Column style={{ width: 250, height: 250, }}></Column>
                        <Column style={{ flexGrow: 1, height: 250, backgroundColor: '#00000080', }}></Column>
                    </Row>
                    <Column style={{ width: SCREEN_WIDTH, height: 500, backgroundColor: '#00000080', }}></Column>
                </Column>
            </Column>



            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ position: 'absolute', justifyContent: 'space-between', bottom: 35, left: 35, right: 35, }}>
                <Row style={{ backgroundColor: '#ffffff40', borderRadius: 8, marginHorizontal: margin.h, marginTop: 440, marginBottom: 20, paddingVertical: 10, paddingHorizontal: 18, alignItems: 'center', alignSelf: 'center', }}>
                    <Label style={{ color: "#fff", fontSize: 15, }}>Aponte sua câmera para o {'\n'}QR Code da nota fiscal</Label>
                    <Column style={{ width: 1, height: 30, marginHorizontal: 12, backgroundColor: "#ffffff90", }} />
                    <Octicons name="question" size={22} color="#fff" />
                </Row>
                
                <Button onPress={() => { setflash(!flash) }} style={{ borderRadius: 100, alignSelf: 'flex-start' }}>
                    <Row style={{ alignItems: 'center', backgroundColor: '#400930', borderRadius: 100, paddingRight: 24, }}>
                        <Column style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.secundary, justifyContent: 'center', alignItems: 'center', }}>
                            <MaterialCommunityIcons name={flash ? "flashlight-off" : "flashlight"} size={32} color="#FFF" />
                        </Column>
                        <Title style={{ fontSize: 18, color: '#fff', marginLeft: 12, }}>{flash ? 'Desligar' : 'Ligar'} lanterna</Title>
                    </Row>
                </Button>
                <Button onPress={() => { navigation.navigate('NotafiscalList') }} style={{ borderRadius: 100, marginVertical: 12,  alignSelf: 'flex-start'}}>
                    <Row style={{ alignItems: 'center', backgroundColor: "#ed18ad", borderRadius: 100, paddingRight: 24, }}>
                        <Column style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                            <NotepadText size={32} color="#fff" />
                        </Column>
                        <Title style={{ fontSize: 18, color: '#fff', marginLeft: 12, }}>Minhas notas</Title>
                    </Row>
                </Button>
                <Button onPress={() => { modalDigitNota?.current?.expand() }} style={{ borderRadius: 100, alignSelf: 'flex-start' }}>
                    <Row style={{ alignItems: 'center', backgroundColor: "#0f93db", borderRadius: 100, paddingRight: 24, }}>
                        <Column style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center', }}>
                            <MaterialCommunityIcons name="keyboard-outline" size={32} color="#fff" />
                        </Column>
                        <Title style={{ fontSize: 18, color: '#fff', marginLeft: 12, }}>Digitar nota</Title>
                    </Row>
                </Button>
            </MotiView>

            <BottomSheet ref={modalDigitNota} snapPoints={[0.1, 360]} keyboardBlurBehavior handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ alignSelf: 'flex-end', position: 'absolute', top: 0, zIndex: 99, }}>
                        <Button onPress={() => { modalDigitNota.current.close() }} style={{ width: 42, backgroundColor: color.secundary, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={24} color="#fff" />
                        </Button>
                    </Row>
                    <Title style={{ textAlign: 'center', marginVertical: 12, }}>Digitar o código</Title>
                    <Column style={{ width: 300, alignSelf: 'center', }}>
                        <TextInput
                            onFocus={() => setfocusInput(true)}
                            onBlur={() => setfocusInput(false)}
                            value={value}
                            onChangeText={e => setvalue(e)}
                            style={{ color: focusInput ? color.primary : color.secundary, height: 150, borderWidth: 2, width: 300, paddingTop: 14, alignSelf: 'center', textAlignVertical: 'top', borderColor: focusInput ? color.primary : color.secundary + 20, borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18, }}
                            numberOfLines={3}
                            multiline
                            placeholder='Escreva aqui sua nota fiscal...'
                        />
                    </Column>
                    <ButtonPR onPress={() => { navigation.navigate('NotafiscalVerify', { nota: value }); Keyboard.dismiss(); modalDigitNota?.current?.close() }} style={{ marginVertical: 12, marginHorizontal: 32, }}>
                        <LabelPR>Enviar nota</LabelPR>
                    </ButtonPR>
                </Column>
            </BottomSheet>
        </Main>
    )
}



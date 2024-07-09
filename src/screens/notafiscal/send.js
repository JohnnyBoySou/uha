import React, { useEffect, useContext, useState, useRef, } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

import * as Haptics from 'expo-haptics';
import { TextInput, Dimensions,  } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonOut, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState } from 'moti';

import Header from '@components/header';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Check, NotepadText, Trash, } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = 1.2 * height;

export default function NotafiscalSendScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const bottomEnviar = useRef(null);
    const [value, setvalue] = useState(null);
    const type = route.params?.type;

    const isFocused = useIsFocused();
    const digit = useAnimationState({
        from: { opacity: 0, width: 0, },
        to: { opacity: 1, width: 180, },
    })
    const [permission, requestPermission] = useCameraPermissions();
    useEffect(() => {
        if (permission === 'granted') {
            return;
        } else {
            requestPermission();
        }
    }, [isFocused]);


    const handleSend = (data) => {
        setvalue(data); 
        Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success)
        navigation.navigate('NotafiscalONGS', { value: data }); 
    }
 
    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <StatusBar style="light" translucent />
            <MotiView style={{ flex: 1, }}>
                <CameraView
                    barcodeScannerSettings={{ barcodeTypes: ["qr"], }}
                    style={{ flex: 1, borderRadius: 12, overflow: 'hidden', height: SCREEN_HEIGHT, width: width, position: 'absolute', top: 0, zIndex: -2, backgroundColor: '#f7f7f7' }}
                    facing="back"
                    onBarcodeScanned={(data) => {
                        if (data.data !== value) {
                            handleSend(data.data);
                        }
                    }}>
                </CameraView>

                <Scroll >
                    <Header />
                    <Button onPress={() => { setvalue(null) }} style={{ position: 'absolute', top: 0, right: 20, padding: 12, borderRadius: 12, width: 44, height: 44, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                        <Trash size={24} color={color.secundary} />
                    </Button>

                    <Row style={{ backgroundColor: '#ffffff40', borderRadius: 8, marginHorizontal: margin.h, marginTop: 20, marginBottom: 20, paddingVertical: 10, paddingHorizontal: 18, alignItems: 'center', alignSelf: 'center', }}>
                        <Label style={{ color: "#fff", fontSize: 15, }}>Aponte sua camerâ para o {'\n'}QR Code da nota fiscal</Label>
                        <Column style={{ width: 1, height: 30, marginHorizontal: 12, backgroundColor: "#ffffff90", }} />
                        <Octicons name="question" size={22} color="#fff" />
                    </Row>

                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, flex: 1, }}>
                        <Column style={{ width: 250, height: 250, justifyContent: 'space-between', marginTop: 100, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Column>
                                    <Column style={{ width: 80, height: 6, backgroundColor: '#fff', }} />
                                    <Column style={{ width: 6, height: 80, backgroundColor: '#fff', }} />
                                </Column>
                                <Column>
                                    <Column style={{ width: 80, height: 6, backgroundColor: '#fff', }} />
                                    <Column style={{ width: 6, height: 80, backgroundColor: '#fff', alignSelf: 'flex-end' }} />
                                </Column>
                            </Row>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Column>
                                    <Column style={{ width: 6, height: 80, backgroundColor: '#fff', }} />
                                    <Column style={{ width: 80, height: 6, backgroundColor: '#fff', }} />
                                </Column>
                                <Column>
                                    <Column style={{ width: 6, height: 80, backgroundColor: '#fff', alignSelf: 'flex-end' }} />
                                    <Column style={{ width: 80, height: 6, backgroundColor: '#fff', }} />
                                </Column>
                            </Row>
                        </Column>
                    </Column>
                </Scroll>

                <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ position: 'absolute', bottom: 30, left: 30, }}>
                    <Column style={{}}>
                        <Row style={{ marginVertical: 20, }}>
                            <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Extract', type: 'Notas fiscais' }) }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                                <NotepadText size={32} color="#fff" />
                            </Button>
                            <MotiView transition={{ type: 'timing' }} state={digit} style={{ backgroundColor: '#bf0d8a', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Minhas notas</Label>
                            </MotiView>
                        </Row>
                        <Row>
                            <Button onPress={() => { bottomEnviar.current.expand() }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center', }}>
                                <MaterialCommunityIcons name="keyboard-outline" size={32} color="#fff" />
                            </Button>
                            <MotiView transition={{ type: 'timing' }} state={digit} style={{ backgroundColor: '#0d8cd4', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                                <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Digitar o código</Label>
                            </MotiView>
                        </Row>
                    </Column>
                </MotiView>

                <BottomSheet ref={bottomEnviar} snapPoints={[0.1, 280]}>
                    <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                        <Title style={{ textAlign: 'center', marginVertical: 12, }}>Digite o código da nota fiscal</Title>
                        <Column style={{ width: 300, alignSelf: 'center', }}>
                            <TextInput value={value} onChangeText={e => setvalue(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard'
                                style={{ borderWidth: 2, width: 300, paddingTop: 14, alignSelf: 'center', textAlignVertical: 'top', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18, }} numberOfLines={3} multiline
                                placeholder='12345678909876543212345678909876543211234'
                                maxLength={44}
                            />
                        </Column>
                        <ButtonOut onPress={handleSend} style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                            <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Cadastrar nota</Label>
                        </ButtonOut>
                    </BottomSheetView>
                </BottomSheet>
            </MotiView>
        </Main>
    )
}
/**
 *                            
 */
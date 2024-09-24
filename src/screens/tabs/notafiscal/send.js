import React, { useEffect, useContext, useState, useRef, } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

import * as Haptics from 'expo-haptics';
import { TextInput, Dimensions, FlatList, Keyboard } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonPR, LabelPR,  } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiView, } from 'moti';

import Avatar from '@components/avatar';
import Header from '@components/header';
import BottomSheet, { BottomSheetView, BottomSheetScrollView, } from '@gorhom/bottom-sheet';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NotepadText, X, } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { verifyNota } from '@api/request/notafiscal/nota';
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = 1.2 * height;

import { ListNotas, EmptyNota, MessageSuccess, MessageError, MessageAwait } from './anonimo/send_anonimo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function NotafiscalSendScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState(null);

    const type = route.params?.type;
    const [notas, setNotas] = useState([]);

    const modalDigitNota = useRef(null);
    const modalListNotas = useRef(null);

    const [focusInput, setfocusInput] = useState(false);

    const isFocused = useIsFocused();
    const [permission, requestPermission] = useCameraPermissions();
    useEffect(() => {
        if (permission === 'granted') {
            return;
        } else {
            requestPermission();
        } if (type === 'clean') {
            setNotas([]);
            setloading(false);
            seterror();
            setsuccess();
            setfocusInput(false);
            setvalue(null);
        }
    }, [isFocused]);


    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const handleSend = async (nota) => {
        setloading(true)
        setsuccess();
        seterror();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        try {
            const res = await verifyNota({ nota: nota })
            if (res) {
                if (notas?.includes(nota)) {
                    setTimeout(() => {
                        seterror('Nota fiscal repetida');
                        setloading(false);
                    }, 1500);
                } else {
                    setNotas((prevNotas) => [...prevNotas, nota]);
                    setTimeout(() => {
                        setloading(false);
                        setsuccess(true)
                    }, 1500);
                }
            } else {
                seterror('Nota fiscal inválida');
            }
        } catch (error) {
            seterror(error.message);
        } finally {
            setTimeout(() => {
                setloading(false);
            }, 1000);
        }
    }

    const handleFinish = () => {
        navigation.navigate('NotafiscalONGS', { notas: notas });
    }

    const handleRemove = (item) => {
        setNotas((prevNotas) => prevNotas.filter((nota) => nota !== item));
    };

    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <StatusBar style="light" translucent />

            <CameraView
                barcodeScannerSettings={{ barcodeTypes: ["qr"], }}
                style={{ flex: 1, borderRadius: 12, overflow: 'hidden', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, position: 'absolute', top: 0, zIndex: -2, backgroundColor: '#f7f7f7' }}
                facing="back"
                onBarcodeScanned={(data) => {
                    if (value === data.data) return;
                    else { setvalue(data.data); handleSend(data.data); }
                }}>
            </CameraView>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 28, zIndex: 999, top: 50, }}>
                <Header />
                <Avatar />
            </Row>
            <Scroll>

                <Row style={{ backgroundColor: '#ffffff40', borderRadius: 8, marginHorizontal: margin.h, marginTop: 30, marginBottom: 20, paddingVertical: 10, paddingHorizontal: 18, alignItems: 'center', alignSelf: 'center', }}>
                    <Label style={{ color: "#fff", fontSize: 15, }}>Aponte sua câmera para o {'\n'}QR Code da nota fiscal</Label>
                    <Column style={{ width: 1, height: 30, marginHorizontal: 12, backgroundColor: "#ffffff90", }} />
                    <Octicons name="question" size={22} color="#fff" />
                </Row>
                <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, flex: 1, marginTop: -20, }}>
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




            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ backgroundColor: error || success ? '#00000080' : 'transparent', position: 'absolute', top: 0, width: width, height: 1.1 * height, justifyContent: 'center', alignItems: 'center', }}>
                <AnimatePresence >
                    {loading ? <MessageAwait /> : <>
                        {error && <MessageError setvalue={setvalue} error={error} seterror={seterror} />}
                        {success && <MessageSuccess handleFinish={handleFinish} setvalue={setvalue} setsuccess={setsuccess} />}</>}
                </AnimatePresence>
            </MotiView>

            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ position: 'absolute', justifyContent: 'space-between', bottom: 35, left: 35, }}>



                <Button onPress={() => { modalListNotas.current.expand() }} style={{ borderRadius: 100, }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#ed18ad", borderRadius: 100, paddingRight: 24, }}>
                        <Row>
                            {notas?.length >= 1 && <MotiView from={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 24, height: 24, borderRadius: 100, position: 'absolute', top: 42, left: 40, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
                                <Title style={{ fontSize: 14, lineHeight: 16, }}>{notas?.length}</Title>
                            </MotiView>}
                            <Column style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                                <NotepadText size={32} color="#fff" />
                            </Column>
                        </Row>
                        <Title style={{ fontSize: 18, color: '#fff', marginLeft: 12, }}>Minha{notas.length > 1 ? 's' : ''} nota{notas.length > 1 ? 's' : ''}</Title>
                    </Row>
                </Button>
                <Button onPress={() => { modalDigitNota.current.expand() }} style={{ borderRadius: 100, marginVertical: 12, }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#0f93db", borderRadius: 100, paddingRight: 24, }}>
                        <Column style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center', }}>
                            <MaterialCommunityIcons name="keyboard-outline" size={32} color="#fff" />
                        </Column>
                        <Title style={{ fontSize: 18, color: '#fff', marginLeft: 12, }}>Digitar nota</Title>
                    </Row>
                </Button>

                <Button disabled={notas.length == 0} onPress={handleFinish} style={{ opacity: notas.length === 0 ? 0.5 : 1, borderRadius: 100, }}>

                    <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#22a868", borderRadius: 100, paddingRight: 24, }}>
                        <Column style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.green, justifyContent: 'center', alignItems: 'center', }}>
                            <MaterialCommunityIcons name="check" size={32} color="#fff" />
                        </Column>
                        <Title style={{ fontSize: 18, color: '#fff', marginLeft: 12, }}>Enviar nota{notas.length > 1 ? 's' : ''}</Title>
                    </Row>

                </Button>




            </MotiView>



            <BottomSheet ref={modalListNotas} snapPoints={[0.1, 0.7 * height]} handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <BottomSheetScrollView style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title style={{ textAlign: 'center', marginVertical: 12, }}>Minhas notas</Title>
                        <Button onPress={() => { modalListNotas.current.close() }} style={{ width: 42, backgroundColor: color.secundary, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={24} color="#fff" />
                        </Button>
                    </Row>

                    <FlatList
                        data={notas}
                        keyExtractor={index => index.toString()}
                        maxToRenderPerBatch={6}
                        initialNumToRender={6}
                        windowSize={6}
                        ListEmptyComponent={<EmptyNota />}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <ListNotas index={index} item={item} onRemove={handleRemove} />}
                    />
                    {notas?.length >= 1 && <Row style={{ padding: 12, borderRadius: 12, marginTop: 30, backgroundColor: color.secundary + 20, justifyContent: 'center', alignItems: 'center', }}>
                        <AntDesign name="questioncircleo" size={24} color={color.secundary} />
                        <Column style={{ marginLeft: 12, marginRight: 12, width: '80%' }}>
                            <Label style={{ fontSize: 14, lineHeight: 16, marginTop: 5, color: color.secundary, }}>Envie várias de uma única vez. Escaneie todas as notas fiscais que desejar e clique em enviar logo abaixo.</Label>
                        </Column>
                    </Row>}
                </BottomSheetScrollView>
                {notas?.length >= 1 && <ButtonPR disabled={notas?.length === 0} style={{ paddingHorizontal: 24, backgroundColor: notas?.length === 0 ? color.secundary : color.primary, position: 'absolute', bottom: 30, alignSelf: 'center', }} onPress={handleFinish} >
                    <LabelPR style={{ fontSize: 16, }}>Enviar nota{notas.length > 1 ? 's' : ''}</LabelPR>
                </ButtonPR>}
            </BottomSheet>

            <BottomSheet ref={modalDigitNota} snapPoints={[0.1, 360]} keyboardBlurBehavior handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
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
                            onSubmitEditing={() => handleSend(value)}
                            style={{ color: focusInput ? color.primary : color.secundary, height: 150, borderWidth: 2, width: 300, paddingTop: 14, alignSelf: 'center', textAlignVertical: 'top', borderColor: focusInput ? color.primary : color.secundary + 20, borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18, }}
                            numberOfLines={3}
                            multiline
                            placeholder='Escreva aqui sua nota fiscal...'
                        />
                    </Column>
                    <ButtonPR onPress={() => { handleSend(value); Keyboard.dismiss(); modalDigitNota.current.close() }} style={{ marginVertical: 12, marginHorizontal: 32, }}>
                        <LabelPR>Cadastrar nota</LabelPR>
                    </ButtonPR>
                </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}



import React, { useEffect, useContext, useState, useRef, } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { TextInput, Dimensions, FlatList, Keyboard, } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonOut, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiView,  } from 'moti';

import { ProgressBar } from 'react-native-paper';

import Header from '@components/header';
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NotepadText, Trash2, X, } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { verifyNota } from '@api/request/notafiscal/nota';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = 1.2 * height;

export default function NotafiscalSendAnonimoScreen({ navigation, route }) {
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
        navigation.navigate('NotafiscalONGSAnonimo', { notas: notas });
    };

    const handleRemove = (item) => {
        setNotas((prevNotas) => prevNotas.filter((nota) => nota !== item));
    };

    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <StatusBar style="light" translucent />
            <CameraView
                barcodeScannerSettings={{ barcodeTypes: ["qr"], }}
                style={{ flex: 1, borderRadius: 12, overflow: 'hidden', height: SCREEN_HEIGHT, width: width, position: 'absolute', top: 0, zIndex: -2, backgroundColor: '#f7f7f7' }}
                facing="back"
                onBarcodeScanned={(data) => {
                    if (value === data.data) return;
                    else { setvalue(data.data); handleSend(data.data); }
                }}>
            </CameraView>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 28, zIndex: 999, top: 50, }}>
                    <Header />
                    <Button style={{ position: 'absolute', top: 0, right: 0, padding: 12, borderRadius: 12, width: 44, height: 44, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={require('@icons/private.png')} style={{ width: 38, height: 38, }} />
                    </Button>
                </Row>
            <Scroll>
               
                <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, flex: 1, marginTop: 40, }}>
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
                <Row style={{ backgroundColor: '#ffffff40', borderRadius: 8, marginHorizontal: margin.h, marginTop: 20, marginBottom: 20, paddingVertical: 10, paddingHorizontal: 18, alignItems: 'center', alignSelf: 'center', }}>
                    <Label style={{ color: "#fff", fontSize: 15, }}>Aponte sua câmera para o {'\n'}QR Code da nota fiscal</Label>
                    <Column style={{ width: 1, height: 30, marginHorizontal: 12, backgroundColor: "#ffffff90", }} />
                    <Octicons name="question" size={22} color="#fff" />
                </Row>
            </Scroll>

            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ backgroundColor: error || success ? '#00000080' : 'transparent', position: 'absolute', top: 0, width: width, height: 1.1 * height, justifyContent: 'center', alignItems: 'center', }}>
                <AnimatePresence >
                    {loading ? <MessageAwait /> : <>
                        {error && <MessageError setvalue={setvalue} error={error} seterror={seterror} />}
                        {success && <MessageSuccess handleFinish={handleFinish} setvalue={setvalue} setsuccess={setsuccess} />}</>}
                </AnimatePresence>
            </MotiView>

            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ position: 'absolute', justifyContent: 'space-between', alignItems: 'center', bottom: 35, left: 35, right: 35, flexGrow: 1, flexDirection: 'row', }}>
                <Row>
                    {notas?.length >= 1 && <MotiView from={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 24, height: 24, borderRadius: 100, position: 'absolute', top: 42, left: 40, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
                        <Title style={{ fontSize: 14, lineHeight: 16, }}>{notas?.length}</Title>
                    </MotiView>}
                    <Button onPress={() => { modalListNotas.current.expand() }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', }}>
                        <NotepadText size={32} color="#fff" />
                    </Button>
                </Row>

                <Button onPress={() => { modalDigitNota.current.expand() }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="keyboard-outline" size={32} color="#fff" />
                </Button>

                {notas?.length == 0 && <MotiView from={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 62, height: 62, borderRadius: 100, }} />}
                {notas?.length >= 1 && <MotiView from={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} delay={500}><Button onPress={handleFinish} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.green, justifyContent: 'center', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="check" size={32} color="#fff" />
                </Button></MotiView>}
            </MotiView>

            <BottomSheet ref={modalListNotas} snapPoints={[0.1, 0.7 * height]} handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <BottomSheetScrollView style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title style={{ textAlign: 'center', marginVertical: 12, }}>Minhas notas</Title>
                        <Button onPress={() => { modalListNotas.current.close() }} style={{ backgroundColor: color.red + 20, width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={24} color={color.red} />
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

            <BottomSheet ref={modalDigitNota} snapPoints={[0.1, 340]} keyboardBlurBehavior handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
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
                    <ButtonPR disabled={value?.length > 1 ? false : true} onPress={() => { handleSend(value); Keyboard.dismiss(); modalDigitNota.current.close() }} style={{ marginVertical: 12, marginHorizontal: 32, }}>
                        <LabelPR>Cadastrar nota </LabelPR>
                    </ButtonPR>
                </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}

export const ListNotas = ({ item, onRemove, index }) => {
    const { color } = useContext(ThemeContext);
    return (
        <Row style={{ borderColor: '#d7d7d799', borderWidth: 2, borderRadius: 12, padding: 12, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', }}>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Title>#{index + 1}</Title>
                <Label style={{ fontSize: 14, marginLeft: 12, }}>{item?.toString().slice(0, 20) + '...'}</Label>
            </Row>
            <Button onPress={() => onRemove(item)} style={{ backgroundColor: color.red + 20, width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                <Trash2 size={24} color={color.red} />
            </Button>
        </Row>
    )
}

export const EmptyNota = () => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 300 }} style={{ justifyContent: 'center', alignItems: 'center', padding: 12, }}>
            <Column style={{ backgroundColor: color.primary + 20, padding: 20, borderRadius: 100, }}>
                <MaterialCommunityIcons name="qrcode-scan" size={32} color={color.primary} />
            </Column>
            <Title style={{ textAlign: 'center', lineHeight: 20, fontSize: 20, marginTop: 12, }}>Você ainda não registrou nenhuma nota</Title>

            <Column style={{ width: '80%', marginVertical: 12, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                    <Column style={{ width: 42, height: 42, marginRight: 20, backgroundColor: color.primary + 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}><Title style={{ color: color.primary, }}>1</Title></Column>
                    <Column>
                        <Title style={{ fontSize: 16, lineHeight: 18, }}>Pegue sua nota fiscal</Title>
                        <Label style={{ fontSize: 13, lineHeight: 15, }}>Coloque-a em uma superfície plana e bem iluminada.</Label>
                    </Column>
                </Row>
                <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                    <Column style={{ width: 42, height: 42, marginRight: 20, backgroundColor: color.primary + 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}><Title style={{ color: color.primary, }}>2</Title></Column>
                    <Column>
                        <Title style={{ fontSize: 16, lineHeight: 18, }}>Centralize sua câmera</Title>
                        <Label style={{ fontSize: 13, lineHeight: 15, }}>Posicione a câmera sobre o QRCode da nota, centralizando-a na tela.</Label>
                    </Column>
                </Row>
                <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                    <Column style={{ width: 42, height: 42, marginRight: 20, backgroundColor: color.primary + 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}><Title style={{ color: color.primary, }}>3</Title></Column>
                    <Column>
                        <Title style={{ fontSize: 16, lineHeight: 18, }}>Aguarde ser escaneado</Title>
                        <Label style={{ fontSize: 13, lineHeight: 15, }}>Ao concluir o escaneamento, o celular vibrará, sinalizando que a nota foi registrada.</Label>
                    </Column>
                </Row>
            </Column>
        </MotiView>
    )
}

export const MessageError = ({ error, seterror, setvalue }) => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ marginTop: -100, justifyContent: 'center', width: 280, alignItems: 'center', alignSelf: 'center', backgroundColor: "#fff", padding: 20, borderRadius: 12, }}>
            <Column style={{ backgroundColor: color.red + 20, padding: 12, borderRadius: 100, }}>
                <MaterialCommunityIcons name="alert-circle-outline" size={32} color={color.red} />
            </Column>

            <Title style={{ textAlign: 'center', fontSize: 20, lineHeight: 21, marginTop: 12, }}>{error}</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, color: color.secundary + 99, lineHeight: 16, marginTop: 4, }}>Você pode tentar novamente com outra nota fiscal.</Label>
            <ButtonPR onPress={() => { seterror(null); setvalue(); }} style={{ paddingVertical: 8, paddingHorizontal: 16, marginTop: 12, }}>
                <LabelPR style={{ fontSize: 16, }}>Tentar novamente</LabelPR>
            </ButtonPR>
        </MotiView>
    )
}

export const MessageAwait = () => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ marginTop: -100, justifyContent: 'center', width: 280, alignItems: 'center', alignSelf: 'center', backgroundColor: "#fff", padding: 20, borderRadius: 12, }}>
            <Column style={{ backgroundColor: color.primary + 20, padding: 20, borderRadius: 100, }}>
                <MaterialCommunityIcons name="qrcode-scan" size={32} color={color.primary} />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 22, marginTop: 4, }}>Analisando nota fiscal</Title>
            <Label style={{ textAlign: 'center', fontSize: 16, color: color.secundary + 99, lineHeight: 16, marginTop: 4, }}>Estamos analisando sua {'\n'}nota fiscal.</Label>

            <ProgressBar indeterminate={true} style={{ height: 8, width: 100, borderRadius: 100, backgroundColor: color.primary + 20, marginTop: 12, }} color={color.primary} />
        </MotiView>
    )
}

export const MessageSuccess = ({ setvalue, setsuccess, handleFinish }) => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ justifyContent: 'center', marginTop: -100, width: 280, alignItems: 'center', alignSelf: 'center', backgroundColor: "#fff", padding: 20, borderRadius: 12, }}>
            <Column style={{ backgroundColor: color.green + 20, padding: 20, borderRadius: 100, }}>
                <MaterialCommunityIcons name="check" size={32} color={color.green} />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 22, marginTop: 4, }}>Nota fiscal válida</Title>
            <Label style={{ textAlign: 'center', fontSize: 16, color: color.secundary + 99, lineHeight: 16, marginTop: 4, marginBottom: 16, }}>Nota fiscal verificada e confirmada.</Label>
            <ButtonPR onPress={() => { setvalue(null); setsuccess(null) }} style={{ paddingVertical: 8, paddingHorizontal: 16, backgroundColor: color.primary + 30, marginBottom: 10, }}>
                <LabelPR style={{ fontSize: 16, color: color.primary, }}>Continuar cadastrando</LabelPR>
            </ButtonPR>
            <ButtonPR onPress={handleFinish} style={{ paddingVertical: 8, paddingHorizontal: 16, }}>
                <LabelPR style={{ fontSize: 16, }}>Enviar nota fiscal</LabelPR>
            </ButtonPR>
        </MotiView>
    )
}
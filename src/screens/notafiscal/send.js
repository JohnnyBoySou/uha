import React, { useEffect, useContext, useState, useRef, } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { TextInput, Dimensions, Vibration } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonOut, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView, useAnimationState } from 'moti';

import Header from '@components/header';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Check, NotepadText, Trash, } from 'lucide-react-native';
const { width, height } = Dimensions.get('window');


export default function NotafiscalSendScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const bottomEnviar = useRef(null);
    const [value, setvalue] = useState(null);


    const itm = {
        id: value,
        name: 'Nota Fiscal',
        value: 100,
    }

    useEffect(() => {
        if (value?.length > 0) {
            bg.transitionTo('from');
            digit.transitionTo('from');
        }
        else if(value == null){
            digit.transitionTo('to');
            bg.transitionTo('to');
        }
    }, [value]);

    const bg = useAnimationState({
        from: { backgroundColor: color.green,  },
        to: { backgroundColor: color.secundary,  },
    });

    const digit = useAnimationState({
        from: { opacity: 0, width: 0, },
        to: { opacity: 1, width: 180, },
    })

    return (
        <Main style={{ backgroundColor: "transparent", }}>
            <MotiView state={bg} style={{ flex: 1,  }}>
            {value == null && 
                <CameraView
                    barcodeScannerSettings={{ barcodeTypes: ["qr"], }}
                    style={{ flex: 1, borderRadius: 12, overflow: 'hidden', height: 1.2 * height, width: width, position: 'absolute', top: 0, zIndex: -2, }}
                    facing="back"
                    onBarcodeScanned={(data) => { setvalue(data.data); Vibration.vibrate(200) }}  >
                </CameraView>}
            <Scroll>
                <Header />
                <Button onPress={() => {setvalue(null)}}  style={{ position: 'absolute', top: 0, right: 20, padding: 12, borderRadius: 12, }}>
                    <Trash size={24} color="#fff" />
                </Button>
                <AnimatePresence>

                {value == null &&
                <MotiView from={{opacity: 0, translateX: 20}} animate={{opacity: 1, translateX: 0,}} exit={{opacity: 0, translateX: 20, display: 'none',}}>
                    <Row style={{ backgroundColor: '#ffffff40', borderRadius: 8, marginHorizontal: margin.h, marginTop: 20, marginBottom: 20, paddingVertical: 10, paddingHorizontal: 18, alignItems: 'center', alignSelf: 'center', }}>
                        <Label style={{ color: "#fff",fontSize: 15, }}>Aponte sua camerâ para o {'\n'}QR Code da nota fiscal</Label>
                        <Column style={{width: 1, height: 30, marginHorizontal: 12, backgroundColor: "#ffffff90", }} />
                        <Octicons name="question" size={22} color="#fff" />
                    </Row>
                </MotiView>}
                
                </AnimatePresence>
                
                <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, flex: 1, }}>
                    
                    
                    {value == null &&
                    <Column style={{ width: 250, height: 250, justifyContent: 'space-between', marginTop: 100, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column>
                                <Column style={{ width: 80, height: 6 ,backgroundColor: '#fff', }} />
                                <Column style={{ width: 6, height: 80 ,backgroundColor: '#fff', }} />
                            </Column>
                            <Column>
                                <Column style={{ width: 80, height: 6 ,backgroundColor: '#fff', }} />
                                <Column style={{ width: 6, height: 80 ,backgroundColor: '#fff', alignSelf: 'flex-end' }} />
                            </Column>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Column>
                                <Column style={{ width: 6, height: 80 ,backgroundColor: '#fff', }} />
                                <Column style={{ width: 80, height: 6 ,backgroundColor: '#fff', }} />
                            </Column>
                            <Column>
                                <Column style={{ width: 6, height: 80 ,backgroundColor: '#fff', alignSelf: 'flex-end' }} />
                                <Column style={{ width: 80, height: 6 ,backgroundColor: '#fff', }} />
                            </Column>
                        </Row>
                    </Column>}

                    <AnimatePresence >
                        <MotiView from={{opacity: 0, scale: 0,}} animate={{opacity: 1, scale: 1,}} exit={{opacity: 0, scale: 0,}} style={{  flex: 1, borderRadius: 12, }}>
    
                            {value != null && <MotiView delay={200} from={{ opacity: 0, translateY: 120,  }} animate={{ opacity: 1, translateY: 0, }} style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 200, backgroundColor: "#0c8a4e90", borderRadius: 100, position: 'absolute', top: 50, alignSelf: 'center',}}>
                                <Check size={130} color="#fff" style={{ alignSelf: 'center', textAlign: 'center' }} />
                            </MotiView>}

                        </MotiView>
                    </AnimatePresence>

                    {value != null &&
                            <MotiView style={{  borderRadius: 12, overflow: 'hidden', marginTop: 270, marginBottom: 50,  }} from={{opacity: 0, translateY:-30, }} animate={{opacity: 1,  translateY: 0, }} exit={{opacity: 0,  translateY: -30,}}>
                                <Title style={{ color: '#fff', padding: 20, textAlign: 'center' }}>Quem você deseja beneficiar?</Title>
                                <Row>
                                <Button onPress={() => {navigation.navigate('NotafiscalONGS', {item:itm})}}  style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff', borderRadius: 100, }}>
                                    <LabelLI style={{ color: '#fff', }}>ONG</LabelLI>
                                </Button>
                                <Column style={{width: 12, }} />
                                <Button style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center',  paddingVertical: 12, borderWidth: 2, borderColor: '#fff', borderRadius: 100, }}>
                                    <LabelLI style={{ color: '#fff', }}>Causa</LabelLI>
                                </Button>
                                </Row>
                            </MotiView>}
                

               

                </Column>
            </Scroll>

        <AnimatePresence>

    {value === null &&
        <MotiView from={{opacity: 0,}} animate={{opacity: 1,}} exit={{opacity: 0,}} style={{ position: 'absolute', bottom: 30, left: 30, }}>
            <Column style={{  }}>
                <Row style={{ marginVertical: 20, }}> 
                    <Button onPress={() => { navigation.navigate('Extract', { type: 'Cashback' }) }}  style={{ width: 62,  height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',  }}>
                        <NotepadText size={32} color="#fff" />
                    </Button>
                    <MotiView state={digit} style={{ backgroundColor: '#bf0d8a', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center',  borderRadius: 10,  }}>
                        <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Minhas notas</Label>
                    </MotiView>
                </Row>
                <Row> 
                    <Button onPress={() => { bottomEnviar.current.expand() }} style={{ width: 62,  height: 62, borderRadius: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center',  }}>
                        <MaterialCommunityIcons name="keyboard-outline" size={32} color="#fff" />
                    </Button>
                    <MotiView state={digit} style={{ backgroundColor: '#0d8cd4', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center',  borderRadius: 10,  }}>
                        <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Digitar o código</Label>
                    </MotiView>
                </Row>
            </Column>
            </MotiView>}
        </AnimatePresence>

            <BottomSheet ref={bottomEnviar} snapPoints={[0.1, 340]}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ textAlign: 'center', marginVertical: 12, }}>Digite o código da nota fiscal</Title>
                    <Column style={{ width: 300, alignSelf: 'center', }}>
                        <TextInput value={value} onChangeText={e => setvalue(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard'
                            style={{ borderWidth: 2, width: 300, paddingTop: 14, alignSelf: 'center', textAlignVertical: 'top', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18, }} numberOfLines={3} multiline
                            placeholder='12345678909876543212345678909876543211234'
                            maxLength={44}
                        />
                        <Label style={{ marginTop: -40, marginBottom: 24, marginRight: 10, alignSelf: 'flex-end', fontSize: 16, fontFamily: font.bold, color: "#111", }}>{value?.length}/44</Label>
                    </Column>
                    <Label style={{ textAlign: 'center', }}>Sequência de 44 números</Label>
                    <ButtonOut onPress={() => { bottomEnviar.current?.close() }} style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                        <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Cadastrar nota</Label>
                    </ButtonOut>
                </BottomSheetView>
            </BottomSheet>
            </MotiView>

        </Main>
    )
}

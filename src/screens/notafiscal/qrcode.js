import React, { useContext, useState, useRef } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, TextInput, View , Text} from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';
import { MotiImage } from 'moti';
import Header from '@components/header';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ButtonOut } from '../../theme/global';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QRCodeScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const bottomEnviar = useRef(null);
    const [value, setvalue] = useState('');

    const [permission, requestPermission] = useCameraPermissions();
    if (!permission) { return <View />; }
    if (!permission.granted) {
      return (
        <View >
          <Title style={{ textAlign: 'center' }}>Precisamos da permisão para acessar sua câmera</Title>
          <Button onPress={requestPermission}  >
            <Title style={{ textAlign: 'center' }}>Condeder permissão.</Title>
        </Button>
        </View>
      );
    }
  


    return (
        <Main style={{  }}>
            <Scroll>
            <Header title="Enviar nota fiscal"/>
            <Label style={{  alignSelf: 'center', textAlign: 'center', marginTop: 100, marginBottom: 30,}}>Aponte sua camerâ para o {'\n'}QR Code da nota fiscal</Label>
            <Column style={{ justifyContent: 'center', alignItems: 'center',  marginHorizontal: margin.h,}}>
            <Column style={{ width: 300, height: 300, backgroundColor: '#303030', borderRadius: 12, overflow: 'hidden', }}>
                <CameraView barcodeScannerSettings={{ barcodeTypes: ["qr"], }}  style={{ flex: 1, borderRadius: 12, overflow: 'hidden',}} facing="back"  onBarcodeScanned={(data) => {setvalue(data.data)}}  >
                </CameraView>
            </Column>

                <Row style={{ marginVertical: 20, }}>
                    <Title style={{ color: "#111", fontFamily: font.medium, fontSize: 18, }}>Ou digite o </Title>
                    <Button onPress={() => {bottomEnviar.current?.expand()}} >
                            <Title style={{ color: color.primary,fontSize: 18, fontFamily: font.bold, textDecorationStyle: 'underline',textDecorationLine: 'underline', textDecorationColor: color.primary, }}>código da nota fiscal</Title>
                    </Button>
                </Row>

                <Button onPress={() => {navigation.navigate('Extract', { type: 'Cashback'})}}  style={{ borderRadius: 8, borderColor: color.secundary, borderWidth: 2, width: '100%', marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                    <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Minhas notas</Label>
                </Button>

            </Column>
            </Scroll>

            <BottomSheet ref={bottomEnviar} snapPoints={[1, 340]}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ textAlign: 'center', marginVertical: 12,}}>Digite o código da nota fiscal</Title>
                   <Column style={{ width: 300, alignSelf: 'center', }}>
                    <TextInput value={value} onChangeText={e => setvalue(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard' 
                        style={{ borderWidth: 2, width: 300, height: 100, alignSelf: 'center', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18,  }} numberOfLines={3} multiline
                        placeholder='12345678909876543212345678909876543211234'
                        maxLength={44}
                        />
                    <Label style={{ marginTop: -40, marginBottom: 24, marginRight: 10, alignSelf: 'flex-end',  fontSize: 16,  fontFamily: font.bold, color: "#111", }}>{value.length}/44</Label>
                    </Column>
                    <Label style={{ textAlign: 'center',  }}>Sequência de 44 números</Label>
                <ButtonOut onPress={() => {bottomEnviar.current?.close()}}  style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Cadastrar nota</Label>
                </ButtonOut>
                 </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}

 
import React, { useContext, useState, useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Main, Scroll, Column, Label, Title, Row, Button, LabelLI, ButtonOut, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Clipboard as Clip, CircleDashed, Edit } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

export default function PaymentBoleto({ item, navigation }) { 
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

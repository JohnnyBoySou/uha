import React, { useContext, useEffect, useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native'
import { Column, Label, Title, Row, Button, ButtonPR, LabelPR  } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Clipboard as Clip, X } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { payPix, getStatusPay } from '@api/request/payment/pay';
import { MotiImage } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

export default function PaymentPixList({ item,}) {
    const { color, } = useContext(ThemeContext);
    const [loading, setloading] = useState(true);
    const [clip, setclip] = useState(false);
    const [status, setstatus] = useState('Aguardando pagamento');
    const navigation = useNavigation();
    const intervalId = useRef(null);

    const handleClipboard = async () => {
        await Clipboard.setStringAsync(item.qrcodetext);
        setclip(true)
    };
    const statusPay = async () => {
        try {
            const res = await getStatusPay(item.id);
            //const res = {status: 'aprovado'}
            if (res.status === 'aprovado') {
                setstatus('Pagamento aprovado');
                clearInterval(intervalId.current);
                navigation.navigate('DonateSuccess');
            } else {
                setstatus('Aguardando pagamento');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        statusPay()
        return () => clearInterval(intervalId.current);
    }, [item]);

    if (loading) return <Column style={{ height: 300, justifyContent: 'center', alignItems: 'center', }}>
        <ActivityIndicator size="large" color={color.primary} />
    </Column>
    return (
        <Column style={{ justifyContent: 'center', paddingHorizontal: 28, }}>
            <Title style={{ textAlign: 'center',  }}>Realize o pagamento</Title>
            <Title style={{ fontSize: 16, lineHeight: 16, marginBottom: 24, marginTop: 8, textAlign: 'center', fontFamily: 'Font_Medium', }}>Status: {status}</Title>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Row>
                    <Column style={{ padding: 12, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                        <Image transition={400} source={require('@icons/pix.png')} style={{ width: 24, height: 24, }} contentFit='contain' />
                    </Column>
                    <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                        <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', lineHeight: 18, }}>Pix</Title>
                        <Label style={{ fontSize: 13, lineHeight: 14, color: color.secundary + 99, }}>Pagamento instantâneo</Label>
                    </Column>
                </Row>
                <Button onPress={() => { navigation.goBack()}} style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.secundary + 20, justifyContent: 'center', alignItems: 'center', }}>
                    <X color={color.secundary} size={22} />
                </Button>
            </Row>

            <Column style={{ borderRadius: 18, backgroundColor: "#f7f7f7", paddingVertical: 28, justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                <Image transition={500} contentFit='contain' source={{ uri: item?.qrcode }} style={{ width: 250, marginBottom: 12, height: 250, borderRadius: 12, }} />
                <Row style={{ justifyContent: 'center', paddingVertical: 8, alignItems: 'center', position: 'absolute', bottom: 0, paddingHorizontal: 12, backgroundColor: color.blue, borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
                    <Title style={{ fontSize: 16, lineHeight: 16, color: '#fff', marginLeft: 6, }}>{item?.Message?.slice(0, -1)}</Title>
                </Row>
            </Column>

            <Label style={{ marginBottom: 20, textAlign: 'center', color: color.secundary + 99, }}>Ou copie o código para pagamento</Label>
            <Button onPress={handleClipboard} style={{ alignSelf: 'center', }} >
                <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 10, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: clip ? color.green + 20 : 'transparent', borderColor: clip ? color.green : color.secundary, }}>
                    <Title style={{ marginBottom: -3, marginRight: 12, marginLeft: 6, color: clip ? color.green : color.secundary, fontSize: 16, lineHeight: 18, }}>{item?.qrcodetext?.slice(0, 20)}...</Title>
                    <Column style={{ width: 32, height: 32, backgroundColor: color.primary + 20, borderRadius: 6, justifyContent: 'center', alignItems: 'center', }}>
                        <Clip size={22} color={color.primary} />
                    </Column>
                </Row>
            </Button>
            <ButtonPR style={{ marginTop: 20, alignSelf: 'center', }} onPress={statusPay} >
                <LabelPR>Já realizei o pagamento</LabelPR>
            </ButtonPR>
            <Column style={{ height: 50, }} />
        </Column>
    )
}

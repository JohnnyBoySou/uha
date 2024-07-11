import React, { useContext, useEffect, useState } from 'react';
import { Image, ActivityIndicator } from 'react-native'
import { Column, Label, Title, Row, Button, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Clipboard as Clip, CircleDashed } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { payPix } from '@api/request/payment/pix'; 

export default function PaymentPix ({ item, navigation }) { 
    const { color, font, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState();
    const [clip, setclip] = useState();
    const handleClipboard = async () => {
        await Clipboard.setStringAsync(data.pix);
        setclip(true)
    };
    const fetchData = async () => {
        const params = { ong: item.ong, value: item.value }
        try {
            const res = await payPix(params)
            console.log(res)
            setdata(res)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [item])

    if(loading) return <Column style={{ height: 300, justifyContent: 'center', alignItems: 'center',  }}>
    <ActivityIndicator size="large" color={color.primary} />
    </Column>
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Column style={{  borderRadius: 32,  backgroundColor: "#fff", marginVertical: 20, }}>
               <Image source={{uri: data?.qrcode}} style={{ width: 250, height: 250, }} />
            </Column>
            <Label style={{ marginBottom: 20, }}>Ou copie o código para pagamento</Label>
            <Button onPress={handleClipboard} >
                <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary, }}>
                    <Title style={{ marginBottom: -3, marginRight: 12, color: clip ? color.green : color.secundary, fontSize: 16, }}>{data?.qrcodetext.slice(0, 20)}...</Title>
                    <Clip size={22} color={color.primary} />
                </Row>
            </Button>
                <Title style={{ marginRight: 6, fontSize: 18, fontFamily: 'Font_Medium', marginTop: 20, }}>Status:</Title>
                <Title style={{ marginRight: 6, fontSize: 18, }}>{data?.status_detail}</Title>
            <Column style={{height: 50, }} />
        </Column>
    )
}

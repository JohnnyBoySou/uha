import React, { useContext, useEffect, useState, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, LineL, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti';
import QRCode from 'react-native-qrcode-svg';
import Header from '@components/header';
import { indicacaoUser } from '@request/user/user';
import * as Clipboard from 'expo-clipboard';
import { Clipboard as Clip, } from 'lucide-react-native';
import { ActivityIndicator } from 'react-native';

export default function ShareScreen({ navigation, }) {
    const { color, font, margin, background } = useContext(ThemeContext);
    const [item, setitem] = useState();
    const [loading, setloading] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const res = await indicacaoUser();
                setitem(res);
            } catch (error) {
                console.log(error)
            } finally{
                setloading(false)
            }
        }

        fetchData()
    }, [])

    
    const [clip, setclip] = useState(false);
    const handleClipboard = async () => { await Clipboard.setStringAsync(item?.codigo); setclip(true)};
    if(loading){<Main style={{ flex: 1, justifyContent: 'center', alignItems: 'center',   }}> <ActivityIndicator size="large" color={color.primary} /></Main>}
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{}}>
                <Header rose />
                <Column style={{ marginHorizontal: margin.h, marginTop: 12, }}>
                    <Title>Indique e ganhe</Title>
                </Column>
                <Row style={{ marginVertical: 20, marginLeft: 28, }}>
                    <Column style={{ marginRight: 18, backgroundColor: background, padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                        <QRCode
                            size={180}
                            quietZone={10}
                            value={item?.codigo}
                            backgroundColor={background}
                            color={color.secundary}
                        />
                    </Column>
                    <Column style={{ width: 180, borderRadius: 12, backgroundColor: color.secundary, }}>
                        <MotiImage source={require('@imgs/share1.png')} style={{ width: 170, height: 200, borderRadius: 12, position: 'absolute', bottom: 0, left: 10, }} />
                    </Column>
                    <Column style={{ width: 150, marginLeft: 18, flex: 1, borderRadius: 12, backgroundColor: "#EFBBE0", }}></Column>
                </Row>
                <Button onPress={handleClipboard} style={{ alignSelf: 'center', marginBottom: 12, }}>
                    <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary, }}>
                        <Title style={{ marginTop: 0, marginRight: 12, color: clip ? color.green : color.secundary, }}>{item?.codigo}</Title>
                        <Clip size={22} color={color.primary} />
                    </Row>
                </Button>
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ marginTop: 0, fontSize: 22, marginBottom: 8, }}>Como participar</Title>
                    <Label style={{ fontSize: 16, color: color.secundary + 99, }}>Para cada amigo que se cadastrar utilizando o seu código de indicação, você receberá 10 pontos, e o amigo também receberá 10 pontos para usar no serviço ou produto de sua escolha!</Label>

                    <Column style={{ backgroundColor: color.secundary, marginTop: 20, paddingHorizontal: 24, paddingVertical: 24, borderRadius: 24, marginVertical: 12, }}>
                        <Label style={{ color: color.background, fontSize: 14, }}>Seus pontos recebidos na campanha</Label>
                        <Title style={{ color: color.background, marginTop: 6, }}>{item?.meusPontosRecebidos}</Title>
                        <LineL style={{ marginVertical: 12, height: 4, }} />
                        <Label style={{ color: color.background, fontSize: 14, }}>Pontos que seus amigos receberam</Label>
                        <Title style={{ color: color.background, textAlign: 'right', marginTop: 6, }}>{item?.PontosRecebidosAmigos}</Title>
                    </Column>




                </Column>
                <Column style={{ height: 70 }} />
            </Scroll>
        </Main>
    )
}

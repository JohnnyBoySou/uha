import React, { useEffect, useContext, useState, } from 'react';

import * as Haptics from 'expo-haptics';
import { Dimensions, FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonPR, LabelPR, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiView, } from 'moti';

import Avatar from '@components/avatar';
import Header from '@components/header';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { verifyNota } from '@api/request/notafiscal/nota';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import { Trash2, X, QrCode, CircleHelp } from 'lucide-react-native';

import { excludeNota, listNotas, addNota } from '../hook';

export default function NotafiscalVerifyAnonimoScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);

    const nota = route?.params?.nota ? route.params.nota : null;
    const type = route.params?.type;
    const origin = route.params?.origin;

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    const handleFinish = () => {
        navigation.navigate('NotafiscalONGS', { notas: notas, origin: origin, type: type, });
    }

    const [notas, setNotas] = useState([]);
    const fetchNotas = async () => {
        try {
            const res = await listNotas()
            setNotas(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async (item) => {
        try {
            await excludeNota(item);
        } catch (error) {
            console.log(error)
        }
        finally {
            fetchNotas();
        }
    };

    const handleVerify = async (nota) => {
        setloading(true)
        setsuccess();
        seterror();
        if (!nota) {
            setloading(false);
            seterror('Você não escaneou \nnenhuma nota fiscal.');
            return
        }
        else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            try {
                const res = await verifyNota({ nota });
                if (res) {
                    await addNota(nota);
                    setsuccess(true);
                    fetchNotas();
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
    }

    useEffect(() => {
        fetchNotas();
        if (nota) {
            handleVerify(nota)
        } else {
            seterror('Você não escaneou \nnenhuma nota fiscal.');
        }
    }, []);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
                <StatusBar style="light" translucent />
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 28, zIndex: 999, top: 50, }}>
                    <Header />
                    <Avatar />
                </Row>
                <Column style={{ paddingVertical: 20, paddingHorizontal: 30, marginTop: 30, }}>
                    {!error && !success ? <MessageAwait /> : <></>}
                    {error && <MessageError error={error} seterror={seterror} />}
                    {success && <MessageSuccess handleFinish={handleFinish} setsuccess={setsuccess} />}
                </Column>
                {notas?.length >= 1 && <Column style={{ flex: 1, marginHorizontal: margin.h,}}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title style={{ textAlign: 'center', marginTop: 12, }}>Notas escaneadas</Title>
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
                    <Button disabled={notas?.length === 0} style={{ paddingHorizontal: 32, paddingVertical: 18, borderRadius: 100, backgroundColor: color.primary, position: 'absolute', bottom: 50, alignSelf: 'center', }} onPress={handleFinish} >
                        <LabelPR style={{ fontSize: 16, }}>Enviar nota{notas?.length > 1 ? 's' : ''}</LabelPR>
                    </Button>
                </Column>}
        </Main>
    )
}

export const ListNotas = ({ item, onRemove, index }) => {
    const { color } = useContext(ThemeContext);
    return (
        <Row style={{ borderColor: color.secundary+40, borderRadius: 8, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 12, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', }}>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Title>#{index + 1}</Title>
                <Label style={{ fontSize: 14, marginLeft: 12, }}>{item?.toString().slice(0, 20) + '...'}</Label>
            </Row>
            <Button onPress={() => onRemove(item)} style={{ borderWidth: 1.5, borderColor: color.secundary, width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                <Trash2 size={18} color={color.secundary} />
            </Button>
        </Row>
    )
}

export const MessageError = ({ error, }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Column style={{ backgroundColor: color.secundary, width: 64, height: 64, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <MaterialCommunityIcons name="alert-circle-outline" size={32} color='#fff' />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 18, lineHeight: 21, marginTop: 12, marginBottom: 20, }}>{error}</Title>
            <Button onPress={() => { navigation.goBack() }}  style={{ borderWidth: 2, borderColor: color.secundary, borderRadius: 100, paddingHorizontal: 45, paddingVertical: 12, }}>
                <LabelPR style={{ color: color.secundary, }}>Tentar novamente</LabelPR>
            </Button>
        </MotiView>
    )
}

export const MessageAwait = () => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Column style={{ borderRadius: 100, backgroundColor: color.secundary + 20, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', }}>
                <MaterialCommunityIcons name="qrcode-scan" size={24} color={color.secundary} />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 18, marginTop: 12, }}>Aguarde</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, }}>Estamos analisando sua nota fiscal.</Label>
            <ProgressBar indeterminate={true} style={{ height: 12, width: 140, borderRadius: 100, backgroundColor: color.secundary+20, marginTop: 12, }} color={color.secundary} />
        </MotiView>
    )
}

export const MessageSuccess = () => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Column style={{ backgroundColor: '#2ECA6F', width: 64, height: 64, marginBottom: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                <MaterialCommunityIcons name="check" size={32} color='#ffffff' />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 18, marginTop: 4, }}>Nota fiscal válida</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, lineHeight: 16, }}>Nota fiscal verificada e confirmada.</Label>
            <Button onPress={() => { navigation.goBack() }}  style={{ paddingVertical: 18, borderRadius: 100, paddingHorizontal: 24, marginTop: 16, backgroundColor: color.secundary, }}>
                <LabelPR style={{ fontSize: 16, color: '#fff' }}>Escanear mais notas</LabelPR>
            </Button>
        </MotiView>
    )
}

export const EmptyNota = () => {
    const { color } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing', duration: 300 }} style={{ justifyContent: 'center', alignItems: 'center', padding: 12, }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, backgroundColor: color.secundary + 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>
                    <Column style={{ width: 72, height: 72, borderRadius: 100, backgroundColor: color.secundary, justifyContent: 'center', alignItems: 'center', }}>
                        <QrCode size={34} color="#fff" />
                    </Column>
                </MotiView>
                <Title align='center' style={{ lineHeight: 20, fontSize: 18, }}>Você ainda não {'\n'}registrou nenhuma {'\n'}nota fiscal.</Title>
            </Column>
        </MotiView>
    )
}
import React, { useEffect, useContext, useState, } from 'react';

import { FlatList } from 'react-native';
import { Main, Column, Label, Title, Row, Button, LabelPR, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiView, } from 'moti';

import Avatar from '@components/avatar';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Trash2, QrCode, ArrowLeft } from 'lucide-react-native';

import { excludeNota, listNotas } from './hook';

export default function NotafiscalListScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [notas, setNotas] = useState([]);

    const handleFinish = () => {
        navigation.navigate('NotafiscalONGS', { notas: notas });
    }

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

    useEffect(() => {
        fetchNotas();
    }, []);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" translucent />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 28, top: 50, }}>
                <Button onPress={() => { navigation.goBack(); }} >
                    <ArrowLeft size={24} color={color.secundary}/>
                </Button>
                <Title style={{ textAlign: 'center', marginTop: 12, }}>Minhas notas</Title>
                <Avatar />
            </Row>
            <Column style={{ flex: 1, marginHorizontal: margin.h, marginTop: 50, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
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
                {notas?.length >= 1 && <Button disabled={notas?.length === 0} style={{ paddingHorizontal: 32, paddingVertical: 18, borderRadius: 100, backgroundColor: color.primary, position: 'absolute', bottom: 50, alignSelf: 'center', }} onPress={handleFinish} >
                    <LabelPR style={{ fontSize: 16, }}>Enviar nota{notas?.length > 1 ? 's' : ''}</LabelPR>
                </Button>}
            </Column>
        </Main>
    )
}

export const ListNotas = ({ item, onRemove, index }) => {
    const { color } = useContext(ThemeContext);
    return (
        <Row style={{ borderColor: color.secundary + 40, borderRadius: 8, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 12, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', }}>
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


export const EmptyNota = () => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing', duration: 300 }} style={{ justifyContent: 'center', alignItems: 'center', padding: 12, }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, backgroundColor: color.secundary + 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>
                    <Column style={{ width: 72, height: 72, borderRadius: 100, backgroundColor: color.secundary, justifyContent: 'center', alignItems: 'center', }}>
                        <QrCode size={34} color="#fff" />
                    </Column>
                </MotiView>
                <Title style={{ lineHeight: 20, fontSize: 18, textAlign: 'center', }}>Você não escaneou nenhuma {'\n'}nota fiscal nesta ação.</Title>
                <Button  style={{ paddingHorizontal: 32, marginTop: 30, paddingVertical: 18, borderRadius: 100, backgroundColor: color.secundary,  alignSelf: 'center', }} onPress={() => navigation.navigate('NotafiscalSend')} >
                    <LabelPR style={{ fontSize: 16, }}>Continuar Escaneando</LabelPR>
                </Button>
            </Column>
        </MotiView>
    )
}
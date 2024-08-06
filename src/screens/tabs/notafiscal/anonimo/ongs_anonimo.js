import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Main, Button, ButtonOut, Scroll, Column, Label, Row, Title, LabelPR, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { StatusBar } from 'expo-status-bar';
import { getONGs } from '@api/request/ongs/ongs';
import { sendNotafiscalAnonima } from '@api/request/notafiscal/nota';
import CardOngs from '@components/cardOngs';
import { Skeleton } from 'moti/skeleton';

export default function NotafiscalONGSAnonimoScreen({ navigation, route, }){

    const { color, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState(true);
    const [loadingLoad, setloadingLoad] = useState();
    const notas = route.params?.notas ? route.params?.notas : '';
    const origin = route.params?.origin ? route.params?.origin : '';
    const [selectOng, setselectOng] = useState();
    const [ongs, setongs] = useState();

    const handleFinish = async () => {
        setloadingLoad(true)
        const params = {
            notas: notas,
            id: selectOng,
            origin: origin,
        }
        sendNotafiscalAnonima(params).then((res) => {
            if (res) {
                setloadingLoad(false)
                navigation.navigate('NotafiscalSuccessAnonimo', { status: res })
            }
        }).catch(err => {
            navigation.navigate('NotafiscalErrorAnonimo', { status: err.message })
            setloadingLoad(false)
        })
    }

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const ong = await getONGs();
                setongs(ong)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false);
            }
        }
        fecthData();
    }, []);


    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll >
                <StatusBar style='dark' />
                <Header rose />
                <Column style={{ paddingHorizontal: margin.h, paddingTop: 5, }}>
                    <Title style={{ fontSize: 24, lineHeight: 26, marginBottom: 8, }}>Escolha qual ONG deseja beneficiar</Title>
                    <Label style={{ color: color.secundary + 99, fontSize: 16, lineHeight: 18, }}>Ao cadastrar sua nota, o valor será doado para a ONG abaixo de sua escolha.</Label>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12, }}>
                        <SubLabel style={{ fontSize: 22, color: color.secundary, }}>ONGs parceiras</SubLabel>
                        <Button onPress={() => { navigation.navigate('ONGList') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12, }}>
                            <Label style={{ color: color.primary, fontFamily: 'Font_Bold', fontSize: 14, }}>Ver mais</Label>
                        </Button>
                    </Row>

                    {loading ?
                        <Column>
                            <Row style={{ marginBottom: 12, alignItems: 'center', }}>
                                <Skeleton width={70} height={70} radius={12} colorMode='light' />
                                <Column style={{ marginLeft: 12, marginRight: 20, }}>
                                    <Skeleton width={170} height={36} radius={5} colorMode='light' />
                                    <Column style={{ height: 8, }} />
                                    <Skeleton width={130} height={20} radius={5} colorMode='light' />
                                </Column>
                                <Skeleton width={40} height={40} radius={8} colorMode='light' />
                            </Row>
                            <Row style={{ marginBottom: 12, alignItems: 'center', }}>
                                <Skeleton width={70} height={70} radius={12} colorMode='light' />
                                <Column style={{ marginLeft: 12, marginRight: 20, }}>
                                    <Skeleton width={170} height={36} radius={5} colorMode='light' />
                                    <Column style={{ height: 8, }} />
                                    <Skeleton width={130} height={20} radius={5} colorMode='light' />
                                </Column>
                                <Skeleton width={40} height={40} radius={8} colorMode='light' />
                            </Row>
                            <Row style={{ marginBottom: 12, alignItems: 'center', }}>
                                <Skeleton width={70} height={70} radius={12} colorMode='light' />
                                <Column style={{ marginLeft: 12, marginRight: 20, }}>
                                    <Skeleton width={170} height={36} radius={5} colorMode='light' />
                                    <Column style={{ height: 8, }} />
                                    <Skeleton width={130} height={20} radius={5} colorMode='light' />
                                </Column>
                                <Skeleton width={40} height={40} radius={8} colorMode='light' />
                            </Row>
                            <Row style={{ marginBottom: 12, alignItems: 'center', }}>
                                <Skeleton width={70} height={70} radius={12} colorMode='light' />
                                <Column style={{ marginLeft: 12, marginRight: 20, }}>
                                    <Skeleton width={170} height={36} radius={5} colorMode='light' />
                                    <Column style={{ height: 8, }} />
                                    <Skeleton width={130} height={20} radius={5} colorMode='light' />
                                </Column>
                                <Skeleton width={40} height={40} radius={8} colorMode='light' />
                            </Row>
                        </Column>
                        :
                        <FlatList
                            data={ongs}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <CardOngs item={item} setselectOng={setselectOng} selectOng={selectOng} />}
                        />}

                    <ButtonOut onPress={handleFinish} disabled={!selectOng} style={{ borderColor: selectOng ? color.primary : color.blue, marginTop: 20, backgroundColor: selectOng ? color.primary : "transparent" }}>
                        <Row>
                            {loadingLoad ? <ActivityIndicator size={28} color="#fff" /> : <LabelPR style={{ color: selectOng ? "#fff" : color.blue, }}>{selectOng ? 'Concluir' : 'Escolha uma ONG'}</LabelPR>}
                        </Row>
                    </ButtonOut>
                </Column>
            </Scroll>
        </Main>
    )
}


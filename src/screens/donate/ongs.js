import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Pressable, Image } from 'react-native';
import { Button, ButtonOut, Scroll, Column, Label, Row, Title, B, LabelPR, SubLabel, Main } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import CheckBox from '@components/checkbox';
import { getONGs } from '@api/request/ongs/ongs';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function DonateONGS({ item, handleOng }) {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    const [loading, setloading] = useState();
    const [selectOng, setselectOng] = useState();
    const [ongs, setongs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const list = await getONGs()
                setongs(list);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData();
    }, []);

    return (
        <Main style={{ paddingTop: 10, backgroundColor: "transparent", paddingBottom: 30, }} >
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 5, }}>
                <Title style={{ fontSize: 24, lineHeight: 24, marginBottom: 12, }}>Escolha qual ONG deseja beneficiar</Title>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <SubLabel style={{ fontSize: 18, color: color.secundary, marginVertical: 12, marginTop: 20, }}>ONGs</SubLabel>
                    <Button onPress={() => { navigation.navigate('ONGList') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12 }}>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14 }}>Ver mais</Label>
                    </Button>
                </Row>

                <FlatList
                    data={ongs}
                    keyExtractor={item => item?.id}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => (
                        <Button onPress={() => { setselectOng(item) }} disabled={selectOng?.id === item?.id} key={item?.id} style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12,  backgroundColor: item?.id === selectOng?.id ? color.blue + 30 : 'transparent', }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Row style={{ alignItems: 'center', }}>
                                    <Button onPress={() => { navigation.navigate('ONGSingle', { id: item.id, }) }} >
                                        <Image style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item?.img }} />
                                    </Button>
                                    <Column style={{ marginLeft: 20, }}>
                                        <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', }}>{item?.name.length >= 18 ? item?.name.slice(0, 15) + '...' : item?.name}</Title>
                                        <Label style={{ fontSize: 12, marginTop: -2, }}>{item?.descri?.length >= 26 ? item?.descri?.slice(0, 26) + '...' : item?.descri}</Label>
                                    </Column>
                                </Row>
                                <Button onPress={() => { setselectOng(item) }} style={{ marginRight: 6, borderRadius: 5, }} >
                                    <CheckBox status={item?.id === selectOng?.id} />
                                </Button>
                            </Row>
                        </Button>
                    )}
                />

                <ButtonOut onPress={() => handleOng(selectOng)} disabled={!selectOng} style={{ borderColor: selectOng ? color.primary : color.blue, marginTop: 20, backgroundColor: selectOng ? color.primary : "transparent" }}>
                    <Row>
                        {loading ? <ActivityIndicator size={28} color="#fff" /> : <LabelPR style={{ color: selectOng ? "#fff" : color.blue, }}>{selectOng ? 'Concluir' : 'Escolha uma ONG'}</LabelPR>}
                    </Row>
                </ButtonOut>
            </Column>
        </Main>
    )
}



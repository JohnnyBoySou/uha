import React, { useContext, useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Button, Row, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image'
import { getONGs } from '@api/request/ongs/ongs';

export default function ONGListScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [ongs, setongs] = useState([]);
    const [loading, setloading] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const list = await getONGs()
                setongs(list);
                console.log(list)
            } catch (error) {
                console.log(error)
            } finally{
                setloading(false)
            }
        }
        fetchData();
    }, []);
    return (
        <Main style={{ backgroundColor: '#fff', }}>

            <Scroll>
                <Header title="Lista de ONGs" rose />


                {loading ? <Column style={{ height: 300, justifyContent: 'center', alignItems: 'center',  }}>
                    <ActivityIndicator size="large" color={color.primary} />
                </Column> :
                <FlatList
                    data={ongs}
                    keyExtractor={item => item?.id}
                    renderItem={({ item }) => (
                        <Button onPress={() => { navigation.navigate('ONGSingle', { id: item.id, }) }} >
                            <Row key={item?.id} style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between', }}>
                                <Row style={{ alignItems: 'center', }}>
                                    <Column style={{ marginLeft: 20, flexGrow: 2, }}>
                                        <Title style={{ fontSize: 18, fontFamily: 'Font_Bold', width: 180, }}>{item?.name.length >= 20 ? item?.name.slice(0, 20) + '...' : item?.name}</Title>
                                        <Label style={{ fontSize: 12, marginTop: -2, }}>{item?.descri?.length >= 26 ? item?.descri?.slice(0, 26) + '...' : item?.descri}</Label>
                                    </Column>
                                    <Column>
                                        <Image transition={500} contentFit="cover" style={{ width: 124, height: 82, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item?.img }} />
                                    </Column>
                                </Row>
                            </Row>
                        </Button>
                    )}
                />}
            </Scroll>
        </Main>
    )
}

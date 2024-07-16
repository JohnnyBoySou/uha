import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Button, LabelLI, Row } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { AnimatePresence, MotiImage } from 'moti';
import { FlatList } from 'react-native';
import { getONGSingle } from '@api/request/ongs/ongs';

import AntDesign from '@expo/vector-icons/AntDesign';
import { veriFav, addFav, delFav } from '@api/user/favorites';
import HeartAnim from '@anim/heart';

export default function ONGSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const id = route?.params?.id
    const [loading, setLoading] = useState();
    const [item, setitem] = useState();
    const [like, setLike] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getONGSingle(id)
                const fav = await veriFav(id);
                setLike(fav);
                setitem(res);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData();

    }, []);

    const handleToggleLike = async () => {
        const product = {
            name: item?.name,
            img: item?.img,
            id: item?.id,
            type: 'ong'
        }
        try {
            if (like) {
                setLike(false);
                await delFav(item.id);
            } else {
                setLike(true);
                await addFav(product);
            }
        } catch (err) {
            console.log(err);
        }
    };


    const [showDesc, setshowDesc] = useState(false);
    if (loading) return <></>
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll >
                <Header title="Detalhes" rose />
                <MotiImage source={{ uri: item?.img }} from={{ opacity: 0, scale: 0.6, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 200, marginTop: 20, alignSelf: 'center', height: 200, borderRadius: 12, backgroundColor: '#FFE0F6', marginBottom: 30, }} />
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>

                <Column style={{ justifyContent: 'center', width: '80%' }}>
                    <Title style={{ fontSize: 22, lineHeight: 22, }}>{item?.name}</Title>
                    <Label style={{ marginTop: 6, fontSize: 16, lineHeight: 16, }}>{item?.desc}</Label>
                </Column>
                <Button onPress={handleToggleLike} style={{ alignSelf: 'center',  width: 42, height: 42,  borderRadius: 12, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
                    <AnimatePresence>
                        {like ? <HeartAnim w={52} h={52} play={like} />
                            :
                            <AntDesign name="hearto" size={24} color={color.primary} />}
                    </AnimatePresence>
                </Button>
                </Row>

                {item?.about?.length > 1 &&
                    <Column style={{ marginHorizontal: margin.h, }}>
                        <Title style={{ marginBottom: 6, fontSize: 18, }}>Sobre nós</Title>
                        {showDesc ? <Label style={{ fontSize: 14, }}>{item?.about}</Label> : <Label style={{ fontSize: 14, }}>{item?.about?.slice(0, 200)}...</Label>}
                        <Button onPress={() => { setshowDesc(!showDesc) }} style={{ alignSelf: 'flex-start', marginVertical: 12, backgroundColor: '#FFE0F6', paddingVertical: 8, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, borderRadius: 100, }}>
                            <LabelLI style={{ color: color.primary, fontSize: 15, }}>{showDesc ? 'Mostrar menos' : 'Ver mais'}</LabelLI>
                        </Button>
                    </Column>}
                <Banners data={item?.imgs} />
                <Column style={{ height: 60, }} />
            </Scroll>
        </Main>
    )
}


const Banners = ({ data }) => {
    const render = ({ item }) => {
        return (
            <Button onPress={() => { }}  >
                <MotiImage source={{ uri: item }} style={{ width: 240, height: 300, borderRadius: 24, marginRight: 18, objectFit: 'cover', }} />
            </Button>
        )
    }
    return (
        <FlatList
            decelerationRate={'fast'}
            scrollEventThrottle={16}
            data={data}
            renderItem={render}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<Column style={{ width: 34 }} />}
            style={{ paddingHorizontal: 24, marginBottom: 32, }}
            snapToOffsets={[0, 200, 420]}
        />
    )
}
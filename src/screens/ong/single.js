import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Button, LabelLI, Row } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { AnimatePresence, } from 'moti';
import { FlatList } from 'react-native';
import { getONGSingle } from '@api/request/ongs/ongs';

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image'
import AntDesign from '@expo/vector-icons/AntDesign';
import { veriFav, addFav, delFav } from '@api/user/favorites';
import HeartAnim from '@anim/heart';
import { Skeleton } from 'moti/skeleton';

export default function ONGSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const id = route?.params?.id
    const [loading, setLoading] = useState(true);
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
            desc: item?.desc,
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
    if (loading) return <SkeletonList />
    return (
        <Main style={{ backgroundColor: '#fff', }}>
             <StatusBar style="dark" backgroundColor="#fff" animated />
            <Scroll >
                <Header title="Detalhes" rose />
                <Image transition={500} contentFit='cover' source={{ uri: item?.img }} style={{ width: 200, marginTop: 20, alignSelf: 'center', height: 200, borderRadius: 12, backgroundColor: '#FFE0F6', marginBottom: 30, }} />
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>

                    <Column style={{ justifyContent: 'center', width: '80%' }}>
                        <Title style={{ fontSize: 22, lineHeight: 22, }}>{item?.name}</Title>
                        <Label style={{ marginTop: 6, fontSize: 16, lineHeight: 16, }}>{item?.desc}</Label>
                    </Column>
                    <Button onPress={handleToggleLike} style={{ alignSelf: 'center', width: 42, height: 42, borderRadius: 12, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', }}>
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


const SkeletonList = () => {
    return (
        <Column style={{ paddingTop: 70, backgroundColor: '#fff',  }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
            <Skeleton height={200} width={200} radius={12} colorMode='light' />
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 28, marginVertical: 32, }}>
                <Column>
                    <Skeleton height={40} width={200} radius={8} colorMode='light' />
                    <Column style={{height: 8, }} />
                    <Skeleton height={30} width={160} radius={8} colorMode='light' />
                </Column>
                <Skeleton height={70} width={70} radius={18} colorMode='light' />
            </Row>

            <Column style={{ marginHorizontal: 28, marginBottom: 16, }}>
                <Skeleton height={40} width={160} radius={8} colorMode='light' />
            </Column>
            <Row style={{ marginHorizontal: 28, }}>
                <Skeleton height={300} width={240} radius={12} colorMode='light' />
                <Column style={{width: 18 }} />
                <Skeleton height={300} width={240} radius={12} colorMode='light' />
                <Column style={{width: 18 }} />
                <Skeleton height={300} width={240} radius={12} colorMode='light' />
            </Row>
            <Column style={{height: 80, }} />
        </Column>
    )
}

const Banners = ({ data }) => {
    const render = ({ item }) => {
        return (
            <Image transition={500} contentFit='cover' source={{ uri: item }} style={{ width: 240, height: 300, borderRadius: 24, marginRight: 18, }} />
        )
    }
    return (
        <Column>
        <Title style={{ marginHorizontal: 28, marginBottom: 12, marginTop: 30,}}>Fotos</Title>
        <FlatList
            decelerationRate={'fast'}
            scrollEventThrottle={16}
            data={data}
            renderItem={render}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<Column style={{ width: 34 }} />}
            style={{ paddingHorizontal: 28, marginBottom: 32,  }}
            snapToOffsets={[0, 200, 420]}
            />
        </Column>
    )
}
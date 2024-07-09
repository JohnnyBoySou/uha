import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage } from 'moti';
import { ArrowLeft, Cpu, Search } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useIsFocused, useNavigation, } from '@react-navigation/native';
import { getOffers, getServices } from '@request/shop/index';
import { Skeleton } from 'moti/skeleton';

export default function ShopOffersScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [offers, setoffers] = useState();
    const [loading, setloading] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
        const fecthData = () => {
            setloading(true)
            getOffers().then((res) => {
                setoffers(res)
            }).finally(() => {
                setloading(false)
            });
        }
        fecthData()
    }, [isFocused])
    const [fixedMenu, setFixedMenu] = useState(false);
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll onScroll={(event) => {
                const scrolling = event.nativeEvent.contentOffset.y;
                if (scrolling > 80) {
                    setFixedMenu(true);
                } else {
                    setFixedMenu(false);
                }
            }} scrollEventThrottle={16}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#FFE0F6", borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 42, height: 28, }}>
                        <ArrowLeft color={color.secundary} size={24} />
                    </Button>
                </Row>
                <Column style={{ justifyContent: 'center', marginVertical: 24, marginHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 28, lineHeight: 28, }}>Ofertas fresquinhas</Title>
                    <Label style={{ marginVertical: 6, fontSize: 16, }}>Encontre as melhores ofertas dos seus serviços favoritos</Label>
                </Column>

                <Title style={{ marginHorizontal: margin.h, marginBottom: 5, marginTop: 0, }}>⚡ Relâmpago</Title>
                <Rain data={offers} loading={loading} />
                
            </Scroll>

            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <AnimatePresence>
                    {fixedMenu && <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Search' }) }} style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}><Search size={24} color="#fff" /></Button>}
                </AnimatePresence>
            </Column>
        </Main>
    )
}

const Rain = ({ data, loading }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();

    const CardOffer = ({ item }) => {
        return (
            <Button style={{ borderRadius: 6, backgroundColor: "#f7f7f7", marginBottom: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                <Column style={{ justifyContent: 'center', width: 164, }}>
                    <MotiImage source={{ uri: item.img }} style={{ width: 164, height: 154, marginBottom: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, objectFit: 'cover', }} />
                    <Column style={{ paddingHorizontal: 12, paddingBottom: 14, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                            <Row>
                                <Title style={{ color: color.primary, fontSize: 22, marginRight: 3, lineHeight: 24, marginLeft: 0, }}>{item?.value.slice(0, -3)}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>
                            <Row>
                                <Title style={{ color: "#000", fontSize: 10, marginTop: -6, marginRight: 2, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value?.slice(0, -3)}</Title>
                                <Title style={{ color: "#000", fontSize: 8, lineHeight: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>pontos</Title>
                            </Row>
                        </Row>

                        <Column style={{ width: '100%', marginTop: 6, }} >
                            <Row style={{ backgroundColor: '#d7d7d7', borderRadius: 100, }}>
                                <Column style={{ backgroundColor: color.primary, height: 6, width: item?.sell_porcentage + '%', borderRadius: 100, }} />
                            </Row>
                            <Title style={{ fontSize: 10, marginTop: -3, fontFamily: 'Font_Medium' }}>{item?.sell_porcentage}% vendido</Title>
                        </Column>
                    </Column>
                    <Title style={{ fontSize: 14, lineHeight: 16, width: 154, marginHorizontal: 12, marginTop: -12, marginBottom: 12, }}>{item.name.slice(0, 42)}</Title>

                </Column>
            </Button>
        )
    }
    return (
        <>
            {loading ? <SkeletonList /> :
                <FlatList
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly', marginHorizontal: 12, }}
                    style={{ marginVertical: 12, }}
                    renderItem={({ item }) => <CardOffer item={item} />}
                    keyExtractor={item => item.id}
                />}
        </>
    )
}

const Offers = ({ data, loading }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    const CardHide = ({ item }) => {
        return (
            <Button style={{ borderRadius: 6, backgroundColor: "#f7f7f7", marginBottom: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                <Column style={{ justifyContent: 'center', width: 164, }}>
                    <MotiImage source={{ uri: item.img }} style={{ width: 164, height: 154, marginBottom: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, objectFit: 'cover', }} />
                    <Column style={{ paddingHorizontal: 12, paddingBottom: 14, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                            <Row>
                                <Title style={{ color: color.primary, fontSize: 22, marginRight: 3, lineHeight: 24, marginLeft: 0, }}>{item?.value.slice(0, -3)}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>
                            <Row>
                                <Title style={{ color: "#000", fontSize: 10, marginTop: -6, marginRight: 2, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value?.slice(0, -3)}</Title>
                                <Title style={{ color: "#000", fontSize: 8, lineHeight: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>pontos</Title>
                            </Row>
                        </Row>
                    </Column>
                    <Title style={{ fontSize: 14, lineHeight: 16, width: 154, marginHorizontal: 12, marginTop: -8, marginBottom: 12, }}>{item.name.slice(0, 42)}</Title>

                </Column>
            </Button>
        )
    }
    return (
        <>
            {loading ? <SkeletonList /> :
                <FlatList
                    data={data}
                    ListFooterComponent={<Column style={{ width: 24 }} />}
                    ListHeaderComponent={<Column style={{ width: 24 }} />}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly', marginHorizontal: 12, }}
                    style={{ marginVertical: 12, }}
                    renderItem={({ item }) => <CardHide item={item} />}
                    keyExtractor={item => item.id}
                />}
        </>
    )
}


const SkeletonList = () => {
    return (
        <Column>
            <Row style={{ marginHorizontal: 28, justifyContent: 'space-between', alignItems: 'center', marginTop: 16, }}>
                <Column>
                    <Skeleton height={160} width={160} radius={12} colorMode='light' />
                    <Column style={{height: 8 }} />
                    <Skeleton height={32} width={160} radius={8} colorMode='light' />
                    <Column style={{height: 6 }} />
                    <Skeleton height={24} width={100} radius={8} colorMode='light' />
                </Column>
                <Column>
                    <Skeleton height={160} width={160} radius={12} colorMode='light' />
                    <Column style={{height: 8 }} />
                    <Skeleton height={32} width={160} radius={8} colorMode='light' />
                    <Column style={{height: 6 }} />
                    <Skeleton height={24} width={100} radius={8} colorMode='light' />
                </Column>
            </Row>
            <Row style={{ marginHorizontal: 28, justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 20,  }}>
                <Column>
                    <Skeleton height={160} width={160} radius={12} colorMode='light' />
                    <Column style={{height: 8 }} />
                    <Skeleton height={32} width={160} radius={8} colorMode='light' />
                    <Column style={{height: 6 }} />
                    <Skeleton height={24} width={100} radius={8} colorMode='light' />
                </Column>
                <Column>
                    <Skeleton height={160} width={160} radius={12} colorMode='light' />
                    <Column style={{height: 8 }} />
                    <Skeleton height={32} width={160} radius={8} colorMode='light' />
                    <Column style={{height: 6 }} />
                    <Skeleton height={24} width={100} radius={8} colorMode='light' />
                </Column>
            </Row>
        </Column>
    )
}
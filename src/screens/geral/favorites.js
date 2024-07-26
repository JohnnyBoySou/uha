import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { HeartHandshake, Search, ShoppingBag } from 'lucide-react-native';
import {MotiView } from 'moti';
import Octicons from '@expo/vector-icons/Octicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getFavs } from '@api/user/favorites';
import Header from '@components/header';
import { Image } from 'expo-image';
import { Skeleton } from 'moti/skeleton';

export default function FavoritesScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [ongs, setongs] = useState([]);
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
    const [type, settype] = useState('Produtos');
    const isFocused = useIsFocused();
    useEffect(() => {
        async function fetchFavorites() {
            try {
                const favs = await getFavs();
                const ongslist = favs.filter(item => item.type === 'ong');
                const productlist = favs.filter(item => item.type === 'product');
                setongs(ongslist);
                setproducts(productlist);

            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setloading(false)
                }, 1000);
            }
        }
        fetchFavorites();
    }, [isFocused]);


    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll >
                <Header title="Favoritos" rose />
                <Row style={{ marginBottom: 12, marginHorizontal: 28, marginTop: 20, }}>
                    <MotiView delay={400} from={{ opacity: 0, translateX: -20, }} animate={{ opacity: 1, translateX: 0, }} style={{ width: '46%', }}>
                        <Button onPress={() => { settype('Produtos') }} style={{ backgroundColor: type === 'Produtos' ? color.primary + 20 : color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                {products?.length >= 1 && <MotiView from={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 32, height: 32, position: 'absolute', top: 20, right: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: type === 'Produtos' ? color.primary : color.secundary, }}>
                                    <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>{products?.length}</Title>
                                </MotiView>}
                                <ShoppingBag color={type === 'Produtos' ? color.primary : color.secundary} size={36} strokeWidth={2} />
                                <Title style={{ fontSize: 16, lineHeight: 16, color: type === 'Produtos' ? color.primary : color.secundary, marginTop: 12, }}>Produtos {'\n'}ou serviços</Title>
                            </Column>
                        </Button>
                    </MotiView>
                    <Column style={{ width: 12, }} />
                    <MotiView delay={800} from={{ opacity: 0, translateX: 20, }} animate={{ opacity: 1, translateX: 0, }} style={{ width: '48%', }}>
                        <Button onPress={() => { settype('ONGs') }} style={{ backgroundColor: type === 'ONGs' ? color.primary + 20 : color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                {ongs?.length >= 1 && <MotiView from={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 32, height: 32, position: 'absolute', top: 20, right: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: type === 'ONGs' ? color.primary : color.secundary, }}>
                                    <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>{ongs?.length}</Title>
                                </MotiView>}
                                <HeartHandshake color={type === 'ONGs' ? color.primary : color.secundary} size={36} strokeWidth={2} />
                                <Title style={{ fontSize: 16, lineHeight: 16, color: type === 'ONGs' ? color.primary : color.secundary, marginTop: 12, }}>ONGs {'\n'}favoritas</Title>
                            </Column>
                        </Button>
                    </MotiView>
                </Row>

                {loading ? <SkeletonList /> : <>
                    {products?.length > 0 && type == 'Produtos' && <Products data={products} />}
                    {ongs?.length > 0 && type == 'ONGs' && <Ongs data={ongs} />}
                    {products?.length === 0 && ongs?.length === 0 && <Empty />}
                </>}

            </Scroll>
            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Search' },) }} style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <Search size={24} color="#fff" />
                </Button>
            </Column>
        </Main>
    )
}

const Empty = () => {
    const { color, margin } = useContext(ThemeContext);
    return (
        <Column>
            <Octicons name="heart" size={32} color={color.primary} style={{ textAlign: 'center', marginTop: 50, marginBottom: 20, }} />
            <Title style={{ fontSize: 22, textAlign: 'center' }}>Ops, parece que você {'\n'}ainda não favoritou nada..</Title>
            <Label style={{ textAlign: 'center', fontSize: 16, marginTop: 10, marginHorizontal: margin.h, }}>Clique nos corações ao lado direito para favoritar os estabelecimentos e serviços que mais gostar!</Label>
        </Column>
    )
}


const SkeletonList = () => {
    return (<Column style={{ paddingTop: 15, backgroundColor: '#fff', marginHorizontal: 28, }}>
        <Skeleton height={40} width={200} radius={12} colorMode='light' />
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 14, }}>
            <Column>
                <Skeleton height={30} width={200} radius={8} colorMode='light' />
                <Column style={{ height: 8, }} />
                <Skeleton height={20} width={160} radius={8} colorMode='light' />
            </Column>
            <Skeleton height={70} width={70} radius={18} colorMode='light' />
        </Row>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 14, }}>
            <Column>
                <Skeleton height={30} width={200} radius={8} colorMode='light' />
                <Column style={{ height: 8, }} />
                <Skeleton height={20} width={160} radius={8} colorMode='light' />
            </Column>
            <Skeleton height={70} width={70} radius={18} colorMode='light' />
        </Row>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 14, }}>
            <Column>
                <Skeleton height={30} width={200} radius={8} colorMode='light' />
                <Column style={{ height: 8, }} />
                <Skeleton height={20} width={160} radius={8} colorMode='light' />
            </Column>
            <Skeleton height={70} width={70} radius={18} colorMode='light' />
        </Row>
    </Column>
    )
}


const Products = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Column style={{}}>
            <Title style={{ marginHorizontal: 28, fontSize: 22, lineHeight: 22, letterSpacing: -1, marginTop: 16, }}>Produtos ou serviços</Title>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                columnWrapperStyle={{ marginHorizontal: 28, columnGap: 12, }}

                numColumns={2}
                maxToRenderPerBatch={4}
                updateCellsBatchingPeriod={100}
                style={{ marginVertical: 12, }}
                renderItem={({ item }) => (
                    <Button style={{ borderRadius: 12, backgroundColor: '#f7f7f7', flexGrow: 1, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                        <Column style={{ justifyContent: 'center', padding: 6, }}>
                            <Image contentFit='cover' source={{ uri: item.img }} style={{ height: 140, borderRadius: 8, backgroundColor: "#fff", }} />
                            <Column style={{ paddingHorizontal: 6, paddingVertical: 2, }}>
                                <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 2, width: 100, }}>{item.name.slice(0, 42)}</Title>
                                <Row style={{}}>
                                    <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value.slice(0, -3)}</Title>
                                    <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                                </Row>
                            </Column>
                        </Column>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
        </Column>
    )
}


const Ongs = ({ data }) => {
    const navigation = useNavigation();
    return (
        <Column style={{}}>
            <Title style={{ marginHorizontal: 28, fontSize: 22, lineHeight: 22, letterSpacing: -1, marginTop: 20, marginBottom: 12, }}>ONGs favoritas</Title>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                windowSize={3}
                maxToRenderPerBatch={3}
                updateCellsBatchingPeriod={100}
                renderItem={({ item }) => (
                    <Button onPress={() => { navigation.navigate('ONGSingle', { id: item.id, }) }} style={{ backgroundColor: '#f7f7f7', marginBottom: 12, borderRadius: 12, marginHorizontal: 28, }}>
                        <Row key={item?.id} style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between', }}>
                            <Row style={{ alignItems: 'center', }}>
                                <Column style={{ flexGrow: 2, }}>
                                    <Title style={{ fontSize: 18, lineHeight: 20, fontFamily: 'Font_Bold', width: 180, }}>{item?.name.length >= 20 ? item?.name.slice(0, 20) + '...' : item?.name}</Title>
                                    <Label style={{ fontSize: 12, marginTop: -2, }}>{item?.descri?.length >= 26 ? item?.desc?.slice(0, 26) + '...' : item?.desc}</Label>
                                </Column>
                                <Image transition={500} contentFit="cover" style={{ width: 84, height: 82, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item?.img }} />
                            </Row>
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
        </Column>

    )
}
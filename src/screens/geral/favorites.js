import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Search } from 'lucide-react-native';
import { MotiImage } from 'moti';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { getFavs } from '@api/user/favorites';
import Header from '@components/header';
import { Image } from 'expo-image';

export default function FavoritesScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [ongs, setongs] = useState([]);
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
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
                setloading(false)
            }
        }
        fetchFavorites();
    }, []);


    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll >
                <Header title="Favoritos" rose />

                {loading ? <ActivityIndicator size="large" color={color.primary} /> : <>
                    {products?.length > 0 && <Products data={products} />}
                    {ongs?.length > 0 && <Ongs data={ongs} />}
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



const Products = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Column style={{}}>
            <Title style={{ marginHorizontal: 28, fontSize: 22, lineHeight: 22, letterSpacing: -1, marginTop: 16, }}>Serviços ou Produtos</Title>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 28, }}
                numColumns={3}
                windowSize={3}
                maxToRenderPerBatch={3}
                updateCellsBatchingPeriod={100}
                style={{ marginVertical: 12, }}
                renderItem={({ item }) => (
                    <Button style={{ borderRadius: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                        <Column style={{ justifyContent: 'center', width: 100, }}>
                            <MotiImage source={{ uri: item.img }} style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                            <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 100, }}>{item.name.slice(0, 42)}</Title>
                            <Row style={{}}>
                                <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value.slice(0, -3)}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>

                            <Title style={{ color: "#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
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
            <Title style={{ marginHorizontal: 28, fontSize: 22, lineHeight: 22, letterSpacing: -1, }}>ONGs favoritas</Title>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                windowSize={3}
                maxToRenderPerBatch={3}
                updateCellsBatchingPeriod={100}
                renderItem={({ item }) => (
                    <Button onPress={() => { navigation.navigate('ONGSingle', { id: item.id, }) }} >
                        <Row key={item?.id} style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between', }}>
                            <Row style={{ alignItems: 'center', }}>
                                <Column style={{ marginLeft: 20, flexGrow: 2, }}>
                                    <Title style={{ fontSize: 18, fontFamily: 'Font_Bold', width: 180, }}>{item?.name.length >= 20 ? item?.name.slice(0, 20) + '...' : item?.name}</Title>
                                    <Label style={{ fontSize: 12, marginTop: -2, }}>{item?.descri?.length >= 26 ? item?.descri?.slice(0, 26) + '...' : item?.descri}</Label>
                                </Column>
                                <Image transition={500} contentFit="cover" style={{ width: 124, marginRight: 12, height: 82, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item?.img }} />
                            </Row>
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
        </Column>

    )
}
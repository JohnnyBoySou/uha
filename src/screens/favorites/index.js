import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Search } from 'lucide-react-native';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { getFavs } from '@api/user/favorites';

export default function FavoritesScreen({ navigation, }) {
    const { color, font, margin} = useContext(ThemeContext);
    const [data, setdata] = useState();

    useEffect(() => {
        async function fetchFavorites() {
          const favs = await getFavs();
          setdata(favs.reverse());
        }
        fetchFavorites();
      }, []);
    

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{ paddingTop: 50, }}>
                <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Title>Favoritos</Title>
                        <Button onPress={() => navigation.navigate('Tabs', { screen: 'Search'})} style={{ borderRadius: 100, backgroundColor: "#30303020", paddingVertical: 10, paddingHorizontal: 20, opacity: 0.6,  }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Label>Pesquisar</Label>
                                <Search color={color.label} size={18} style={{ marginLeft: 8, }}/>
                            </Row>
                        </Button>
                    </Row>
                    {data?.length > 0 ? <Offers data={data} /> : 
                <Empty />}

            </Scroll>
        </Main>
    )
}

const Empty = () => {
    const {color, margin } = useContext(ThemeContext);
    return(
    <Column>
        <Octicons name="heart" size={32} color={color.primary} style={{ textAlign: 'center', marginTop: 50, marginBottom: 20,}} />
        <Title style={{ fontSize: 22, textAlign: 'center' }}>Ops, parece que você {'\n'}ainda não favoritou nada..</Title>
        <Label style={{ textAlign: 'center', fontSize: 16, marginTop: 10, marginHorizontal: margin.h, }}>Clique nos corações ao lado direito para favoritar os estabelecimentos e serviços que mais gostar!</Label>
    </Column>
)}



const Offers = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 28, }}
        numColumns={3}
        style={{ marginVertical: 24, }}
        renderItem={({ item }) => (
            <Button style={{  borderRadius: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                <Column style={{ justifyContent: 'center', width: 100, }}>
                    <MotiImage source={{ uri: item.img }} style={{ width: 100, height: 100, borderRadius: 12,  objectFit: 'cover', backgroundColor: "#fff", }} />
                    <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 100, }}>{item.name.slice(0, 42)}</Title>
                    <Row style={{}}>
                        <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value}</Title>
                        <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                    </Row>

                    <Title style={{ color: "#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                </Column>
            </Button>
        )}
        keyExtractor={item => item.id}
    />
)}


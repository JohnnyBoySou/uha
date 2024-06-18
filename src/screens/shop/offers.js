import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage } from 'moti';
import { ArrowLeft, Search } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useNavigation, } from '@react-navigation/native';

import { getOffers } from '@request/service';

export default function ShopOffersScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [offers, setoffers] = useState();

    useEffect(() => {
        getOffers().then((res) => {
            setoffers(res)
        })
    }, [])
    const [fixedMenu, setFixedMenu] = useState(false);

    return (
        <Main >
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
                <Rain data={offers} />
                <Title style={{ marginHorizontal: margin.h, marginBottom: 5, marginTop: 10, }}>Todas as ofertas</Title>
                <Offers data={offers} />


             
                <Column style={{ height: 50, }} />
            </Scroll>

            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <AnimatePresence>
                    {fixedMenu &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ scale: 1, opacity: 1, }} exit={{ scale: 0, opacity: 0, }} transition={{ type: 'timing' }} >
                            <Button onPress={() => { navigation.navigate('SearchModal',) }} style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Search size={24} color="#fff" />
                            </Button>
                        </MotiView>}
                </AnimatePresence>
            </Column>
        </Main>
    )
}


const Rain = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-evenly', marginHorizontal: 12, }}
            style={{ marginVertical: 12, }}
            renderItem={({ item }) => (
                <Button style={{ borderRadius:  6, backgroundColor: "#fff", marginBottom: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                    <Column style={{ justifyContent: 'center', width: 164,  }}>
                        <MotiImage source={{ uri: item.img }} style={{ width: 164, height: 154,  marginBottom: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, objectFit: 'cover',  }} />
                      
                        <Title style={{ marginTop: 6, fontSize: 16, lineHeight: 18, marginVertical: 8, width: 154, marginHorizontal: 12, }}>{item.name.slice(0, 42)}</Title>

                        <Row style={{ paddingHorizontal: 12, paddingBottom: 14, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column >
                                <Row>
                                    <Title style={{ color: color.primary, fontSize: 18, marginRight: 4, lineHeight: 20, marginLeft: 0,  }}>{item?.value}</Title>
                                    <Title style={{ color: "#000", fontSize: 10, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                                </Row>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Column>


                        <Column style={{ width: 76, marginTop: 12,}} >
                            <Row style={{ backgroundColor: '#d7d7d7', borderRadius: 100, }}>
                                <Column style={{ backgroundColor: color.primary, height: 5, width: item?.sell_porcentage + '%', borderRadius: 100, }} />
                            </Row>
                            <Title style={{ fontSize: 10, marginTop: -3, fontFamily: 'Font_Medium' }}>{item?.sell_porcentage}% vendido</Title>
                            </Column>
                        </Row>

                    </Column>
                </Button>
            )}
            keyExtractor={item => item.id}
        />
    )
}



const Offers = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <FlatList
            data={data}
            ListFooterComponent={<Column style={{ width: 24 }} />}
            ListHeaderComponent={<Column style={{ width: 24 }} />}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-evenly', marginHorizontal: 12, }}
            style={{ marginVertical: 12, }}
            renderItem={({ item }) => (
                <Button style={{ borderRadius: 8, backgroundColor: "#fff", marginBottom: 12,   }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                    <Column style={{ justifyContent: 'center', width: 164, }}>
                        <MotiImage source={{ uri: item.img }} style={{ width: 164, height: 154, borderTopLeftRadius: 8, borderTopRightRadius: 8, objectFit: 'cover', backgroundColor: "#fff", }} />
                     
                        <Column style={{ marginHorizontal: 12, marginVertical: 5, }}>
                            <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 154,  }}>{item.name.slice(0, 42)}</Title>
                            <Row style={{}}>
                                <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>
                            <Title style={{ color: "#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                        </Column>

                    </Column>
                </Button>
            )}
            keyExtractor={item => item.id}
        />
    )
}
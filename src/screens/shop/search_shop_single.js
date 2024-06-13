import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, U, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { TextInput, FlatList } from 'react-native';
import { Search, CircleHelp, X } from 'lucide-react-native';
import { MotiView, AnimatePresence, MotiImage } from 'moti';
import { getSingleShopServices } from '@request/service';

export default function ShopSingleSearchScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState('');
    const [focus, setfocus] = useState();
    const [type, settype] = useState();
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState();
    const [empty, setempty] = useState(false);
    const shop = route.params?.shop
    const services = route.params?.services
    const id = shop.id;

    useEffect(() => {
        if (id != null) {
            settype(id);
        }
    }, [id])

    const handleSearch = async () => {
        setloading(true)
        settype(null)
        await getSingleShopServices(id, query).then((res) => {
            if (res?.length == 0) {
                setempty(true)
                setdata([])
                setloading(false)
            } else {
                setempty(false)
                setdata(res)
                setloading(false)
            }
        })
    }

    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <Scroll>
                <Header title={`${shop.name}`} rose />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>

                    <Row style={{ marginBottom: 24, justifyContent: 'center', alignItems: 'center', }}>
                        <TextInput
                            value={query}
                            onChangeText={e => setquery(e)}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            onSubmitEditing={handleSearch}
                            disabled={loading}
                            placeholderTextColor={color.title + 60}
                            style={{ backgroundColor: '#f7f7f7', borderRadius: 12, padding: 12, width: '100%', fontFamily: font.bold, fontSize: 16, color: color.dark, borderWidth: 2, borderColor: focus ? color.primary : 'transparent' }}
                        />
                        <Column style={{ padding: 8, borderRadius: 100, position: 'absolute', right: 6, }}>
                            <Search size={24} color={color.primary} style={{ zIndex: 99, }} />
                        </Column>
                    </Row>

                    <AnimatePresence>

                        {empty &&
                            <MotiView from={{ opacity: 0, translateX: 20, }} animate={{ opacity: 1, translateX: 0, }} exit={{ opacity: 0, translateX: 20, }}>
                                <Row style={{ alignItems: 'center', marginTop: -15, marginBottom: 20, backgroundColor: color.red + 20, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, }}>
                                    <CircleHelp color={color.red} size={16} />
                                    <Label style={{ fontSize: 13, marginLeft: 4, color: color.red, }}>Não encontramos resultados para esse termo.</Label>
                                </Row>
                            </MotiView>
                        }
                    </AnimatePresence>



                    <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }}>
                        {data?.length == 0 ?
                            <><Title style={{ marginBottom: -10, }}>Serviços</Title>
                                <FlatList
                                    numColumns={2}
                                    data={services}
                                    style={{ marginVertical: margin.v, marginBottom: 30, marginHorizontal: -8, }}
                                    showsHorizontalScrollIndicator={false}
                                    ListHeaderComponent={<Column style={{ width: margin.h - 8, }} />}
                                    ListFooterComponent={<Column style={{ width: margin.h - 8, }} />}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <Button onPress={() => navigation.navigate('ShopServiceSingle', { id: item.id, })} style={{ borderRadius: 12, padding: 4, flexGrow: 1, backgroundColor: '#f7f7f7', marginVertical: 8, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', }}>
                                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <MotiImage source={{ uri: item.img }} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 8, overflow: 'hidden', marginBottom: 8, }} />
                                                <SubLabel style={{ fontFamily: 'Font_Medium', width: 100, textAlign: 'center', fontSize: 15, lineHeight: 16, }}>{item.name.slice(0, 32)}</SubLabel>
                                                <Label style={{ width: 100, textAlign: 'center', fontSize: 12, lineHeight: 16, color: color.primary, fontFamily: 'Font_Bold', }}>{item.value} pontos</Label>
                                            </Column>
                                        </Button>
                                    )}
                                /></>
                            :
                            <><Title style={{ marginBottom: -10, }}>Resultados</Title>
                                <FlatList
                                    numColumns={2}
                                    data={data}
                                    style={{ marginVertical: margin.v, marginBottom: 30, marginHorizontal: -8, }}
                                    showsHorizontalScrollIndicator={false}
                                    ListHeaderComponent={<Column style={{ width: margin.h - 8, }} />}
                                    ListFooterComponent={<Column style={{ width: margin.h - 8, }} />}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <Button onPress={() => navigation.navigate('ShopServiceSingle', { id: item.id, })} style={{ borderRadius: 12, padding: 4, flexGrow: 1, backgroundColor: '#f7f7f7', marginVertical: 8, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center', }}>
                                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <MotiImage source={{ uri: item.img }} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 8, overflow: 'hidden', marginBottom: 8, }} />
                                                <SubLabel style={{ fontFamily: 'Font_Medium', width: 100, textAlign: 'center', fontSize: 15, lineHeight: 16, }}>{item.name.slice(0, 32)}</SubLabel>
                                                <Label style={{ width: 100, textAlign: 'center', fontSize: 12, lineHeight: 16, color: color.primary, fontFamily: 'Font_Bold', }}>{item.value} pontos</Label>
                                            </Column>
                                        </Button>
                                    )}
                                /></>}
                    </MotiView>


                </Column>
            </Scroll>
        </Main>
    )
}


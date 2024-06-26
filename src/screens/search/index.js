import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from './../../components/header';
import { TextInput, FlatList } from 'react-native';
import { Search, CircleHelp, X } from 'lucide-react-native';
import { MotiView, AnimatePresence, MotiImage } from 'moti';
import { getSearch } from '../../api/request/search';

export default function SearchScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState('');
    const [focus, setfocus] = useState();
    const [type, settype] = useState();
    const [shops, setshops] = useState([]);
    const [services, setservices] = useState([]);
    const value = route.params?.type;
    useEffect(() => {
        if (value != null) {
            settype('ONGs');
        }
    }, [value])

    const handleClean = () => {
        settype(null)
    }

    const handleSearch = async () => {
        await getSearch(query).then(res => {
            setshops(res.shop);
            setservices(res.service);
        })
    }

    return (
        <Main style={{ backgroundColor: "#fff", paddingTop: 50, }}>
                <Header title="Pesquisar" rose />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>
                    <Row style={{ marginBottom: 24, justifyContent: 'center', alignItems: 'center', }}>
                        <TextInput value={query} onChangeText={e => setquery(e)}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            placeholderTextColor={color.title + 60}
                            onSubmitEditing={handleSearch}
                            style={{ backgroundColor: '#f7f7f7', borderRadius: 12, padding: 12, width: '100%', fontFamily: font.bold, fontSize: 16, color: color.title, borderWidth:2, borderColor: focus ? color.primary : '#f7f7f7'}}
                        />
                        <Button onPress={handleSearch} style={{ padding: 8, backgroundColor: color.primary, borderRadius: 100, position: 'absolute', right: 6, }}>
                            <Search size={24} color="#fff" style={{ zIndex: 99, }} />
                        </Button>
                    </Row>

                    <Row style={{ alignItems: 'center', marginTop: -15, marginBottom: 20, }}>
                        <CircleHelp color={color.label} size={16} />
                        <Label style={{ fontSize: 14, marginLeft: 4, }}>Busque por <U>estabelecimentos</U>, <U>serviços</U> ou <U>ONGs</U>.</Label>
                    </Row>

                    <Row>
                        <AnimatePresence>
                            {type != null && <MotiView transition={{ duration: 300, }} from={{ opacity: 0, translateX: -30, }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, }}><Button onPress={handleClean} rippleColor={color.secundary} style={{ paddingVertical: 8, paddingHorizontal: 16, backgroundColor: color.primary + 20, marginTop: -4, marginBottom: 14, borderRadius: 8, }} >
                                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Title style={{ color: color.primary, fontSize: 18, marginRight: 6, }}>{type}</Title>
                                    <X color={color.primary} />
                                </Row>
                            </Button></MotiView>}
                        </AnimatePresence>
                    </Row>

                    {shops?.length > 0 && <>
                        <Title>Estabelecimentos</Title>
                        <FlatList
                            data={shops}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            style={{ marginVertical: 14, }}
                            renderItem={({ item }) => (
                                <Button style={{ marginBottom: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                                    <Row style={{}}>
                                        <Column style={{ width: 220, justifyContent: 'center', }}>
                                            <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item?.name?.slice(0, 24)}</Title>
                                            <Label style={{ fontSize: 14, lineHeight: 16, }}>{item?.desc}</Label>
                                            <Row style={{ marginTop: 8, }}>
                                                {item.categories.map((cat) => (
                                                    <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                                ))}
                                            </Row>

                                        </Column>
                                        <MotiImage source={{ uri: item?.img }} style={{ width: 112, height: 112, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                    </Row>
                                </Button>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </>}
                    {services?.length > 0 && <>
                        <Title>Serviços</Title>
                        <FlatList
                            data={services}
                            ListFooterComponent={<Column style={{ width: 24, height: 40, }} />}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            style={{ marginVertical: 14, }}
                            renderItem={({ item }) => (
                                <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                                    <Column style={{ justifyContent: 'center', width: 124, }}>
                                        <MotiImage source={{ uri: item.img }} style={{ width: 124, height: 124, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                        <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item?.title?.slice(0, 42)}</Title>
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
                    </>}
                </Column>
        </Main>
    )
}

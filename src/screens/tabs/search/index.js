import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { TextInput, FlatList,  ActivityIndicator } from 'react-native';
import { Search, CircleHelp } from 'lucide-react-native';
import { getSearch } from '@api/request/search'; 
import { Image } from 'expo-image';

export default function SearchScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState('');
    const [focus, setfocus] = useState();

    const [shops, setshops] = useState([]);
    const [services, setservices] = useState([]);
    const [ongs, setongs] = useState([]);
    const [loading, setloading] = useState(false);

    const handleSearch = async () => {
        if (query?.length === 0) return;
        try {
            setloading(true)
            const res = await getSearch(query);
            setshops(res.shop);
            setservices(res.service);
            setongs(res.ongs);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    return (
        <Main style={{ backgroundColor: color.background, }}>
            <Scroll>
                <Header title="Pesquisar" rose />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>
                    <Row style={{ marginBottom: 24, justifyContent: 'center', alignItems: 'center', }}>
                        <TextInput
                            value={query}
                            onChangeText={e => { setquery(e); query?.length > 3 ? handleSearch() : null }}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            placeholderTextColor={color.title + 60}
                            onSubmitEditing={handleSearch}
                            style={{ backgroundColor: '#f7f7f7', borderRadius: 12, padding: 12, width: '100%', fontFamily: font.bold, fontSize: 16, color: color.secundary, borderWidth: 2, borderColor: focus ? color.primary : '#f7f7f7' }}
                        />
                        <Button disabled={loading} onPress={handleSearch} style={{ padding: 8, backgroundColor: color.primary, borderRadius: 8, position: 'absolute', right: 6, }}>
                            <Search size={24} color="#fff" style={{ zIndex: 99, }} />
                        </Button>
                    </Row>
                    <Row style={{ alignItems: 'center', marginTop: -15, marginBottom: 20, }}>
                        <CircleHelp color={color.label} size={18} />
                        <Label style={{ fontSize: 14, marginLeft: 8, lineHeight: 16, }}>Busque por <U>ofertas</U>, <U>serviços</U> ou <U>ONGs</U>.</Label>
                    </Row>
                </Column>

                <ShopsList data={shops} />
                <ServicesList data={services} />
                <ONGSList data={ongs} />

                {loading ? <ActivityIndicator size="large" color={color.primary} style={{ marginTop: 24, }} /> : <>
                </>}

                <Column style={{ height: 70, }}></Column>
            </Scroll>
        </Main>
    )
}


const ServicesList = ({ data }) => {
    const { color, font, margin } = useContext(ThemeContext);
    if (data?.length == 0) return <></>
    return (
        <Column style={{ marginHorizontal: 28, }}>
            <Title>Serviços</Title>
            <FlatList
                data={data}
                ListFooterComponent={<Column style={{ width: 24, height: 40, }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ marginVertical: 14, }}
                renderItem={({ item }) =>
                    <Button style={{ marginRight: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                        <Column style={{ justifyContent: 'center', width: 124, }}>
                            <Image  contentFit='cover' source={{ uri: item.Avatar }} style={{ width: 124, height: 124, borderTopLeftRadius: 12, borderTopRightRadius: 12,  backgroundColor: "#fff", }} />
                            {item?.sell_porcentage && <Row style={{ backgroundColor: '#d7d7d7', }}>
                                <Column style={{ backgroundColor: color.primary, height: 4, width: item?.sell_porcentage + '%', }} />
                            </Row>}
                            <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item?.Nome?.length > 28 ? item?.Nome?.slice(0, 28) + '...' : item?.Nome}</Title>
                            <Row style={{}}>
                                <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.Valor?.slice(0, -3)}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>
                            <Row>
                                <Title style={{ color: "#000", fontSize: 12, marginTop: -6, marginRight: 4, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.OldValor?.slice(0, -3)}</Title>
                                <Title style={{ color: "#000", fontSize: 8, lineHeight: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>pontos</Title>
                            </Row>
                        </Column>
                    </Button>}
                keyExtractor={item => item.id}
            />
        </Column>
    )
}

const ShopsList = ({ data }) => {
    const { color, font, margin } = useContext(ThemeContext);
    if (data?.length == 0) return <></>
    return (
        <Column style={{ marginHorizontal: 28, }}>
            <Title>Estabelecimentos</Title>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 14, }}
                renderItem={({ item }) => <Button style={{ marginBottom: 12, height: 134, borderRadius: 12, backgroundColor: '#f7f7f7', }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                    <Row style={{ paddingLeft: 12, height: 134, paddingRight: 12, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ width: 140, justifyContent: 'center', }}>
                            <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item?.name?.slice(0, 24)}</Title>
                            <Label style={{ fontSize: 12, lineHeight: 14, color: color.secundary + 99, }}>{item?.infomacoes?.length > 72 ? item?.infomacoes?.slice(0, 72) + '...' : item?.infomacoes}</Label>
                        </Column>
                        <Image  contentFit='cover' source={{ uri: item?.avatar }} style={{ width: 112, height: 112, borderRadius: 12,   backgroundColor: "#fff", }} />
                    </Row>
                </Button>}
                keyExtractor={item => item.id}
            />
        </Column>
    )
}


const ONGSList = ({ data }) => {
    const { color, font, margin } = useContext(ThemeContext);
    if (data?.length == 0) return <></>
    return (
        <Column style={{ marginHorizontal: 28, }}>
            <Title>ONGs</Title>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 14, }}
                renderItem={({ item }) => <Button style={{ marginBottom: 12, height: 134, borderRadius: 12, backgroundColor: '#f7f7f7', }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                    <Row style={{ paddingLeft: 12, height: 134, paddingRight: 12, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ width: 140, justifyContent: 'center', }}>
                            <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item?.name?.slice(0, 24)}</Title>
                            <Label style={{ fontSize: 12, lineHeight: 14, color: color.secundary + 99, }}>{item?.infomacoes?.length > 72 ? item?.infomacoes.slice(0, 72) + '...' : item?.infomacoes}</Label>
                        </Column>
                        <Image  contentFit='cover' source={{ uri: item?.avatar }} style={{ width: 112, height: 112, borderRadius: 12,   backgroundColor: "#fff", }} />
                    </Row>
                </Button>}
                keyExtractor={item => item.id}
            />
        </Column>
    )
}
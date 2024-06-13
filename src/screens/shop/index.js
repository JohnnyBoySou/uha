import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, FlatList, Pressable, ScrollViewComponent } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage } from 'moti';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ArrowLeft, Search } from 'lucide-react-native';
import Header from '@components/header';
import { Carrousel } from '../home';
import { MotiView } from 'moti';
import { useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { getShops, getOffers } from '@request/service';

export default function ShopScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(route.params?.type);
    const cat = route.params?.cat;
    const [data, setdata] = useState();
    const [offers, setoffers] = useState();

    useEffect(() => {
        getShops().then((res) => {
            setdata(res)
        })
        getOffers().then((res) => {
            setoffers(res)
        })
    }, [])
    const [fixedMenu, setFixedMenu] = useState(false);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll onScroll={(event) => {
                    const scrolling = event.nativeEvent.contentOffset.y;
                    if (scrolling > 120) {
                        setFixedMenu(true);
                    } else {
                        setFixedMenu(false);
                    }
                }} scrollEventThrottle={16}>

 

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                <Button  style={{ backgroundColor: "#FFE0F6",  borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 42, height: 28, }}>
                    <ArrowLeft color={color.secundary} size={24}/>
                </Button>
                <Button  style={{ backgroundColor: "#FFE0F6",  borderRadius: 100, justifyContent: 'center', alignItems: 'center',  paddingHorizontal: 12, paddingVertical: 8,  }}>
                    <Title style={{ fontSize: 16, }}>100 pontos</Title>
                </Button>

                </Row>





                <Column style={{ justifyContent: 'center',  marginVertical: 24, marginHorizontal: margin.h, }}>
                    <Title style={{  fontSize: 28, lineHeight: 28, }}>Estabelecimentos parceiros </Title>
                    <Label style={{  marginVertical: 6, fontSize: 16, }}>Encontre seus serviços favoritos e troque-os por pontos! </Label>
                </Column>
              
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

                <Cards />
                <Title style={{ marginHorizontal: margin.h, marginBottom: -20,}}>Promos incríveis</Title>
                <Promos data={data} />
                <Title style={{ marginHorizontal: margin.h, marginBottom: 10, marginTop: 20, }}>Ofertas relâmpago</Title>
                <Offers data={offers} />
                <Title style={{ marginHorizontal: margin.h, marginTop: 20, marginBottom: -20, }}>Lojas da sua região</Title>
                <Promos data={data?.reverse()} />
                <Column style={{ marginHorizontal: margin.h, }}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 24, }}>
                        <Title>Beleza</Title>
                        <Button>
                            <Label style={{ color: color.primary, fontFamily: 'Font_Bold' }}>Ver mais</Label>
                        </Button>
                    </Row>
                    <FlatList
                        data={produtos}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={{ marginHorizontal: - margin.h, marginVertical: 12, }}
                        renderItem={({ item }) => (
                            <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopSingle', { item: item }) }}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <MotiImage source={item.img} style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                    <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.name}</Title>
                                    <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium, marginBottom: 12, }}>{item.desc}</Label>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                        <Title>Pets</Title>
                        <Button>
                            <Label style={{ color: color.primary, fontFamily: 'Font_Bold' }}>Ver mais</Label>
                        </Button>
                    </Row>
                    <FlatList
                        data={produtos}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={{ marginHorizontal: - margin.h, marginVertical: 12, }}
                        renderItem={({ item }) => (
                            <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopSingle', { item: item }) }}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <MotiImage source={item.img} style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                    <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.name}</Title>
                                    <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium, marginBottom: 12, }}>{item.desc}</Label>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                        <Title>Gerais</Title>
                        <Button>
                            <Label style={{ color: color.primary, fontFamily: 'Font_Bold' }}>Ver mais</Label>
                        </Button>
                    </Row>
                    <FlatList
                        data={produtos}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={{ marginHorizontal: - margin.h, marginVertical: 12, marginBottom: 70, }}
                        renderItem={({ item }) => (
                            <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopSingle', { item: item }) }}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <MotiImage source={item.img} style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                    <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.name}</Title>
                                    <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium, marginBottom: 12, }}>{item.desc}</Label>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />
                </Column>
            </Scroll>

            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <AnimatePresence>
                    {fixedMenu &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ scale: 1, opacity: 1, }} exit={{ scale: 0, opacity: 0, }} transition={{ type: 'timing' }} >
                            <Button onPress={() => {navigation.navigate('SearchModal', )}}  style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Search size={24} color="#fff" />
                            </Button>
                        </MotiView>}
                </AnimatePresence>
            </Column>
        </Main>
    )
}

const Rate = ({ rate }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const ar = Array.from({ length: rate }, (_, i) => i + 1);
    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center', }}>
            {ar.map((i) => (
                <AntDesign key={i} name="star" size={24} color={color.primary} />
            ))}
        </Row>
    )
}


const produtos = [
    {
        name: 'Natura',
        desc: 'A partir de 40 Pontos',
        product: 'Eudora',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Americanas',
        desc: 'A partir de 40 Pontos',
        product: '23ed',
        img: require('@imgs/americanas.png'),
    },
    {
        name: 'Oboticário',
        product: '23e5',
        desc: 'A partir de 40 Pontos',
        img: require('@imgs/oboticario.png'),
    },
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/casas_bahia.png'),
    },
    {
        name: 'Amazon',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/amazon.png'),
    },

    {
        name: 'Petiko',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/petiko.png'),
    },

]

const Offers = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <FlatList
        data={data}
        ListFooterComponent={<Column style={{ width: 24 }} />}
        ListHeaderComponent={<Column style={{ width: 24 }} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ marginVertical: 12, }}
        renderItem={({ item }) => (
            <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                <Column style={{ justifyContent: 'center', width: 124, }}>
                    <MotiImage source={{ uri: item.img }} style={{ width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, objectFit: 'cover', backgroundColor: "#fff", }} />
                    <Row style={{ backgroundColor: '#d7d7d7', }}>
                        <Column style={{ backgroundColor: color.primary, height: 4, width: item?.sell_porcentage + '%', }} />
                    </Row>
                    <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item.name.slice(0, 42)}</Title>
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

const Promos = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Scroll horizontal showsHorizontalScrollIndicator={false} pagingEnabled >
            <FlatList
                data={data?.slice(0, 3)}
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 28, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                        <Row style={{}}>
                            <Column style={{ width: 220, justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
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
                keyExtractor={item => item?.id}
            />
            <FlatList
                data={data?.slice(3, 6)}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 28, marginRight: 28, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12,  borderRadius: 12,}} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}  >
                        <Row style={{}}>
                            <Column style={{ width: 220, justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
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
                keyExtractor={item => item?.id}
            />
        </Scroll>
    )
}

const Cards = () => {
    const {color, margin, } = useContext(ThemeContext);
return(
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 40, }}>
        <MotiView from={{opacity: 0, translateX: 40, }} animate={{ opacity: 1, translateX: 0, }} transition={{type: 'timing', delay: 600,}} style={{ width: 240, height: 300, backgroundColor: color.primary, borderRadius: 18, marginRight: 20, marginLeft: 28, overflow: 'hidden', }}>
            <Column style={{ margin: 20,  }}>
                <Title style={{ color: '#FFF2E3', fontSize: 32, lineHeight: 36, marginTop: 10, }}>Ganhe +</Title>
                <Title style={{ fontSize: 32, lineHeight: 34, marginTop: -5, }}>Moedas</Title>
                <Label style={{ color: "#FFF2E3", marginTop: 30, fontFamily: 'Font_Medium', alignSelf: 'flex-start', paddingHorizontal: 6, fontSize: 24, lineHeight: 28,  }}>Cadastre suas</Label>
                <Title style={{ backgroundColor: '#fff', marginTop: 8, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, fontSize: 20, alignSelf: 'flex-start', marginBottom: 20,}}>Notas fiscais</Title>
            </Column>
            <MotiImage from={{opacity: 0, translateY: 30, scale: 0,}} animate={{ opacity: 1, translateY: -20, scale: 1.3,}} source={require('@imgs/nt.png')} style={{ width: 140, zIndex: 9, height: 130, alignSelf: 'flex-end', objectFit: 'cover',  }}/>
            <MotiImage from={{opacity: 0, translateY: 30, scale: 0,}} animate={{ opacity: 1, translateY: 0, scale: 1.3,}} source={require('@imgs/nt4.png')} style={{ width: 140, height: 130, position: 'absolute', left: -20, bottom: -40,   }}/>
        </MotiView>
        <MotiView from={{opacity: 0, translateX: 40, }} animate={{ opacity: 1, translateX: 0, }} transition={{type: 'timing', delay: 600,}} style={{ width: 240, height: 300, backgroundColor: color.secundary, borderRadius: 18,   marginRight: 20, overflow: 'hidden',}}>
            <Column style={{ margin: 20,  }}>
                <Title style={{ color: '#FFF2E3', fontSize: 32, lineHeight: 36, marginTop: 10, }}>Ofertas</Title>
                <Title style={{ fontSize: 32, lineHeight: 34, marginTop: -5, color: color.primary, }}>relâmpago</Title>
                <Row>
                    <Label style={{ color: "#FFF2E3", marginTop: 40, fontFamily: 'Font_Medium',  paddingHorizontal: 6, fontSize: 24, lineHeight: 28,  }}>Atualizado {'\n'}a cada <Title style={{ backgroundColor: '#fff', marginTop: 8, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, fontSize: 20,  zIndex: 99,}}> 6 horas </Title></Label>
                </Row>
            </Column>
            <MotiImage from={{opacity: 0, translateY: 30, scale: 0,}} animate={{ opacity: 1, translateY: -50, scale: 1.2,}} source={require('@imgs/nt7.png')} style={{ width: 140, height: 120, zIndex: -9, alignSelf: 'flex-end', objectFit: 'contain', marginRight: -20,  }}/>
            <MotiImage from={{opacity: 0, translateY: 30, scale: 0,}} animate={{ opacity: 1, translateY: 0, scale: 1.1,}} source={require('@imgs/nt5.png')} style={{ width: 140, height: 130, position: 'absolute', left: -20, bottom: -40,   }}/>
        </MotiView>
     
    </ScrollView>
)}
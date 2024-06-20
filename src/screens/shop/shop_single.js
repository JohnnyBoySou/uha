import React, { useContext, useState, useEffect, useRef } from 'react';

import { FlatList, View, Image, Text, Dimensions, Platform, Linking } from 'react-native';
import { Main, Column, Label, Title, Row, SubLabel, Button } from '@theme/global';

import { ThemeContext } from 'styled-components/native';

import { AnimatePresence, MotiImage, MotiView, } from 'moti';

//icons
import { ArrowLeft, ArrowRight, MapPin, Search } from 'lucide-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

//component 
import BottomSheet from '@gorhom/bottom-sheet'

//request
import { getSingleShop } from '@request/service';

import { ScrollView } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

export default function ShopSingleScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const id = route.params?.id ? route.params?.id : 12345;
    const [item, setitem] = useState();
    const [offers, setoffers] = useState();
    const [services, setservices] = useState();
    const map = useRef(null)
    useEffect(() => {
        getSingleShop(id).then((res) => {
            setitem(res)
            setoffers(res?.offers)
            setservices(res?.services)
        })
    }, [])

    const [fixedMenu, setFixedMenu] = useState(false);

    const openMapWithCep = () => {
        const cep = item?.cep;
        const url = Platform.select({
          ios: `http://maps.apple.com/?q=${cep}`,
          android: `geo:0,0?q=${cep}`
        });
        Linking.openURL(url)
          .catch(err => console.error('An error occurred', err));
      };
    


    //borderBottomLeftRadius: 18, borderBottomRightRadius: 18,

    return (
        <Main style={{ backgroundColor: '#fff', }}>

            <Column style={{ position: 'absolute', top: 0, zIndex: 99, }}>
                <AnimatePresence >
                    {fixedMenu &&
                        <MotiView from={{ opacity: 0, translateY: -120, }} animate={{ translateY: 0, opacity: 1, }} exit={{ translateY: -120, opacity: 0, }} transition={{ type: 'timing' }} style={{ flexDirection: 'row', paddingTop: 40, paddingBottom: 18, paddingHorizontal: margin.h, alignItems: 'center', backgroundColor: color.secundary, width: width, justifyContent: 'space-between' }}>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Column style={{ padding: 2, borderRadius: 100, backgroundColor: '#fff', }}>
                                    <MotiImage source={{ uri: item?.img }} style={{ borderRadius: 100, width: 56, height: 56, }} />
                                </Column>   
                                <MaterialIcons style={{ marginLeft: -20, marginTop: 34,  }} name="verified" size={24} color={color.blue} />
                                
                                
                                <MotiView style={{ marginLeft: 18, }} >
                                    <Title style={{ fontSize: 18, color: "#fff" }}>{item?.name}</Title>
                                    <Label style={{ fontSize: 14, color: "#f7f7f7" }}>{item?.address.length >= 32 ? item?.address.slice(0, 32) + '...' : item?.address}</Label>
                                </MotiView>
                            </Row>
                            <Button onPress={() => { }} style={{ backgroundColor: color.primary, marginRight: 6, width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <MapPin color='#fff' />
                            </Button>
                        </MotiView>}
                </AnimatePresence>
            </Column>


            <ScrollView style={{ paddingTop: 0 }}
                onScroll={(event) => {
                    const scrolling = event.nativeEvent.contentOffset.y;
                    if (scrolling > 280) {
                        setFixedMenu(true);
                    } else {
                        setFixedMenu(false);
                    }
                }} scrollEventThrottle={16} > 
                <Column>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 28, position: 'absolute', top: 40, borderRadius: 100, left: 28, justifyContent: 'center', alignItems: 'center', zIndex: 99, }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Image
                        source={{ uri: item?.capa }}
                        style={{
                            height: 300,
                            borderBottomLeftRadius: 32,
                            borderBottomRightRadius: 32,
                            marginBottom: -72,
                            zIndex: -2,
                        }}
                    />
                    <Column style={{ padding: 6, backgroundColor: '#fff', borderRadius: 100, alignSelf: 'center', zIndex: -2, }}>
                        <MotiImage
                            transition={{ type: 'timing' }}
                            source={{ uri: item?.img }}
                            style={{ borderRadius: 100, zIndex: 99, width: 132, height: 132, }}
                        />
                    </Column>
                </Column>


                <Column style={{ flex: 1, marginTop: 12, }} >

                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>
                        <Row>
                            <Title>{item?.name}</Title>
                            <MaterialIcons style={{ marginLeft: 5, }} name="verified" size={24} color={color.blue} />
                        </Row>
                        <Label style={{ textAlign: 'center', marginVertical: 5, }}>{item?.desc}</Label>
                        <Button style={{ borderRadius: 100,  }} onPress={() => {map.current?.expand()}} >
                        <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE0F6', borderRadius: 100, paddingHorizontal: 12, marginVertical: 6,}}>
                            <MapPin color={color?.primary} size={16}/>
                            <SubLabel style={{ textAlign: 'center', marginVertical: 5, marginHorizontal: 6, fontFamily: 'Font_Medium', color: color.primary, }}>{item?.address}</SubLabel>
                        </Row>
                        </Button>
                    </Column>

                    <Column style={{ marginHorizontal: margin.h, }}>
                        <Title>Ofertas relâmpago</Title>
                    </Column>
                    <FlatList
                        horizontal
                        data={offers}
                        style={{ marginVertical: margin.v, marginBottom: 30, }}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<Column style={{ width: margin.h, }} />}
                        ListFooterComponent={<Column style={{ width: margin.h  }} />}
                        keyExtractor={(item) => item?.id.toString()}
                        renderItem={({ item }) => (
                            <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                                <Column style={{ justifyContent: 'center', width: 124, }}>
                                    <MotiImage source={{ uri: item?.img }} style={{ width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, objectFit: 'cover', backgroundColor: "#fff", }} />
                                    <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item?.name?.slice(0, 42)}</Title>
                                    <Row style={{}}>
                                        <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value}</Title>
                                        <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                                    </Row>
        
                                    <Title style={{ color: "#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                                </Column>
                            </Button>
                        )}
                    />
                    {item?.banners?.length > 0 && <Banners data={item?.banners} />}


                    <Column style={{ marginHorizontal: margin.h, marginTop: 0, }}>
                        <Title>Serviços</Title>
                    </Column>
                    <FlatList
                        data={services}
                        style={{ marginVertical: margin.v, marginBottom: 30, }}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<Column style={{ width: margin.h - 8, }} />}
                        ListFooterComponent={<Column style={{ width: margin.h - 8, }} />}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => (
                            <Button onPress={() => navigation.navigate('ShopServiceSingle', {id: item?.id})} style={{ borderRadius: 0, paddingBottom: 4, borderBottomWidth: 1, borderColor: '#60606020', marginHorizontal: margin.h, marginVertical: 6, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Row>
                                        <MotiImage source={{ uri: item.img }} style={{ width: 54, height: 54, borderRadius: 12, }} />
                                        <Column style={{ justifyContent: 'center', marginLeft: 15, }}>
                                            <SubLabel style={{ fontFamily: 'Font_Medium', color: color.secundary, }}>{item?.name}</SubLabel>
                                            <Label style={{ width: 100, fontSize: 12, lineHeight: 16, color: color.primary, fontFamily: 'Font_Bold', }}>{item.value} pontos</Label>

                                        </Column>
                                    </Row>
                                    <SubLabel style={{ marginRight: 12, width: 80, fontSize: 12, lineHeight: 16, textAlign: 'right' }}>{item?.desc}</SubLabel>
                                </Row>
                            </Button>
                        )}
                    />
                </Column>

            </ScrollView>

            <Column style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                <AnimatePresence>
                    {fixedMenu &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ scale: 1, opacity: 1, }} exit={{ scale: 0, opacity: 0, }} transition={{ type: 'timing' }} >
                            <Button onPress={() => {navigation.navigate('ShopSingleSearch', { shop: item, services: services })}}  style={{ backgroundColor: color.primary, width: 52, height: 52, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Search size={24} color="#fff" />
                            </Button>
                        </MotiView>}
                </AnimatePresence>
            </Column>

            <BottomSheet ref={map} snapPoints={[0.1, 180,]}>
                <Column style={{ padding: 0, justifyContent: 'center', alignItems: 'center', }}>
                    <Title style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, }}>Horario de funcionamento</Title>
                    <Label>Seguda à Sexta</Label>
                    <SubLabel>{item?.open} - {item?.close}</SubLabel>
                    <Button onPress={openMapWithCep} style={{ backgroundColor: color.primary, marginTop: 20, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center',  }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Title style={{ fontSize: 18, color: '#fff', marginRight: 8, }}>Abrir no mapa</Title>
                            <MapPin size={18} color="#fff"/>
                        </Row>
                    </Button>
                </Column>
            </BottomSheet>
        </Main>
    )
}

const Banners = ({ data }) => {
    const render = ({ item }) => {
        return (
            <Button onPress={() => { }}  >
                <MotiImage source={{ uri: item }} style={{ width: 240, height: 300, borderRadius: 24, marginRight: 18, objectFit: 'cover', }} />
            </Button>
        )
    }

    return (
        <FlatList
            decelerationRate={'fast'}
            scrollEventThrottle={16}
            data={data}
            renderItem={render} 
            keyExtractor={(index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<Column style={{ width: 34 }} />}
            style={{ paddingHorizontal: 24, marginBottom: 32, }}
            snapToAlignment='center'
            snapToOffsets={[0, 300, 600]}
        />
    )
}

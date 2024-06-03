import React, { useContext, useState } from 'react';
import { ScrollView, FlatList, Pressable } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { Search } from 'lucide-react-native';
import Header from '@components/header';
import { Carrousel } from '../home';

export default function ShopScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(route.params?.type); 

    return (
        <Main>
            <Scroll >
                <Header rose/>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  marginVertical: 24,}}>
                        <Title style={{ textAlign: 'center', fontSize: 26, lineHeight: 28, }}>Estabelecimentos parceiros </Title>
                        <Label style={{ textAlign: 'center', marginVertical: 6, fontSize: 16, }}>Encontre seus serviços e produtos {'\n'}favoritos e troque-os por pontos! </Label>
                    </Column>
                    <Button onPress={() => {navigation.navigate('Search')}}  style={{ borderRadius: 30,  marginBottom: 30, opacity: .7, borderWidth: 2, borderColor: "#30303030", backgroundColor: "#12121220", paddingVertical: 12, paddingHorizontal: 8, marginHorizontal: margin.h, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18,  }}>
                            <Title style={{ fontSize: 20, fontFamily: font.medium, }}>Pesquisar</Title>
                            <Search strokeWidth={2} color="#11111190"/>
                        </Row>
                    </Button>
                    <Carrousel />



                    <Title style={{ marginHorizontal: margin.h, }}>Promos incríveis</Title>
                    <Promos />

                    <Title style={{ marginHorizontal: margin.h, marginBottom: 10, marginTop: 20, }}>Ofertas relâmpago</Title>
                    <FlatList 
                            data={offers}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            ListHeaderComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{ marginVertical: 12, }}
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}  onPress={() => {navigation.navigate('ShopSingle', {item: item})}}>
                                        <Column style={{ justifyContent: 'center',  width: 112, }}>
                                            <MotiImage source={ item.img } style={{  width: 112, height: 112, borderTopLeftRadius: 20, borderTopRightRadius: 20, objectFit: 'cover', backgroundColor: "#fff", }} />
                                            <Row style={{ backgroundColor: '#d7d7d7', }}>
                                                <Column style={{backgroundColor: color.primary, height: 4, width: item.porcentage,  }} />
                                            </Row>
                                            <Title style={{ marginTop: 6, fontSize: 15, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0,12)}</Title>
                                            <Row style={{  }}>
                                                <Title style={{ color: color.primary, fontSize: 18, marginRight: 4, lineHeight: 20, }}>{item?.value}</Title>
                                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                                            </Row>
                                            
                                            <Title style={{ color:"#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                                        </Column>
                                </Button>
                            )}
                            keyExtractor={item => item.id}
                        />

                    <Title style={{ marginHorizontal: margin.h,  marginTop: 20, }}>A partir de 10 pontos</Title>
                    <Promos />
                    <Column style={{ marginHorizontal: margin.h, }}>





                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 24,  }}>
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
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}  onPress={() => {navigation.navigate('ShopSingle', {item: item})}}>
                                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                        <MotiImage source={ item.img } style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                            <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.name}</Title>
                                            <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium,  marginBottom: 12, }}>{item.desc}</Label>
                                    </Column>
                                </Button>
                            )}
                            keyExtractor={item => item.id}
                        />
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  marginTop: 12,}}>
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
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}  onPress={() => {navigation.navigate('ShopSingle', {item: item})}}>
                                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                        <MotiImage source={ item.img } style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                            <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.name}</Title>
                                            <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium,  marginBottom: 12, }}>{item.desc}</Label>
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
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}  onPress={() => {navigation.navigate('ShopSingle', {item: item})}}>
                                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                        <MotiImage source={ item.img } style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                            <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.name}</Title>
                                            <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium,  marginBottom: 12, }}>{item.desc}</Label>
                                    </Column>
                                </Button>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </Column>
            </Scroll>
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
        desc: 'A partir de 40 UhaCoins',
        product: 'Eudora',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Americanas',
        desc: 'A partir de 40 UhaCoins',
        product: '23ed',
        img: require('@imgs/americanas.png'),
    },
    {
        name: 'Oboticário',
        product: '23e5',
        desc: 'A partir de 40 UhaCoins',
        img: require('@imgs/oboticario.png'),
    },
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/casas_bahia.png'),
    },
    {
        name: 'Amazon',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/amazon.png'),
    },
    
    {
        name: 'Petiko',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/petiko.png'),
    },
   
]

const offers = [
    {
    "uid": "12345",
    "name": "Banho e tosa",
    "old_value": 60,
    "value": 40,
    "img": "url",
    "porcentage": '30%'
},
{
    "uid": "123456",
    "name": "Descricao do servico",
    "old_value": 50,
    "value": 35,
    "img": "url",
    "porcentage": '40%'
},
{
    "uid": "12345677",
    "name": "Descricao do servico",
    "old_value": 40,
    "value": 25,
    "img": "url",
    "porcentage": '90%'
},{
    "uid": "1234568",
    "name": "Descricao do servico",
    "old_value": 50,
    "value": 35,
    "img": "url",
    "porcentage": '5%'
},
{
    "uid": "12345679",
    "name": "Descricao do servico",
    "old_value": 40,
    "value": 25,
    "img": "url",
    "porcentage": '12%'
}


]

const services = [
    {
        "uid": "12345de",
        "name": "Nome da loja",
        "category": ["Beleza"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345dfe",
        "name": "Nome da loja",
        "category": ["Pets"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345deg",
        "name": "Nome da loja",
        "category": ["Gerais"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345de",
        "name": "Nome da loja",
        "category": ["Beleza"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345dfe",
        "name": "Nome da loja",
        "category": ["Pets"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345deg",
        "name": "Nome da loja",
        "category": ["Gerais"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345de",
        "name": "Nome da loja",
        "category": ["Beleza"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345dfe",
        "name": "Nome da loja",
        "category": ["Pets"],
        "desc": "Descricao do servico",
        "img": "url"
    },
    {
        "uid": "12345deg",
        "name": "Nome da loja",
        "category": ["Gerais"],
        "desc": "Descricao do servico",
        "img": "url"
    },
]


const Promos = () => {
    const { color } = useContext(ThemeContext);
    return(
        <Scroll horizontal showsHorizontalScrollIndicator={false} pagingEnabled style={{ marginTop: -15, }}>
                        <FlatList 
                            data={services.slice(0, 3)}
                            showsHorizontalScrollIndicator={false}
                            style={{   marginLeft: 28, }}
                            renderItem={({item}) => (
                                <Button style={{ marginBottom: 12,  }}  onPress={() => {navigation.navigate('ShopSingle', {item: item})}}>
                                       <Row style={{ flexGrow: 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}>
                                        <Column>
                                            <Label style={{  fontSize: 12, marginRight: 4,  fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, marginBottom: 4, paddingHorizontal: 10, backgroundColor: color.primary+20, borderRadius: 100, alignSelf: 'flex-start', }}>{item?.category}</Label>
                                            <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0,24)}</Title>
                                            <Label style={{  fontSize: 15, lineHeight: 18, }}>{item?.desc}</Label>
                                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: 220, marginVertical: 8, }}>
                                                <Label style={{ color: color.primary, fontSize: 14, fontFamily: 'Font_Bold',  }}>Ver ofertas</Label>
                                                <Pressable>
                                                    <AntDesign name="hearto" size={16} color="black" />
                                                </Pressable>
                                            </Row>
                                        </Column>
                                        <MotiImage source={ item.img } style={{  width: 112, height: 112, marginLeft: 20, borderRadius: 12, alignSelf: 'flex-end', objectFit: 'cover', backgroundColor: "#fff", }} />
                                        </Row>
                                
                                </Button>
                            )}
                            keyExtractor={item => item.id}
                        />
                        <FlatList 
                            data={services.slice(3, 6)}
                            showsHorizontalScrollIndicator={false}
                            style={{    marginLeft: 28, marginRight: 28,}}
                            renderItem={({item}) => (
                                <Button style={{ marginBottom: 12,  }}  onPress={() => {navigation.navigate('ShopSingle', {item: item})}}>
                                       <Row style={{ flexGrow: 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}>
                                        <Column>
                                            <Label style={{  fontSize: 12, marginRight: 4,  fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, marginBottom: 4, paddingHorizontal: 10, backgroundColor: color.primary+20, borderRadius: 100, alignSelf: 'flex-start', }}>{item?.category}</Label>
                                            <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0,24)}</Title>
                                            <Label style={{  fontSize: 15, lineHeight: 18, }}>{item?.desc}</Label>
                                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: 220, marginVertical: 8, }}>
                                                <Label style={{ color: color.primary, fontSize: 14, fontFamily: 'Font_Bold',  }}>Ver ofertas</Label>
                                                <Pressable>
                                                    <AntDesign name="hearto" size={16} color="black" />
                                                </Pressable>
                                            </Row>
                                        </Column>
                                        <MotiImage source={ item.img } style={{  width: 112, height: 112, marginLeft: 20, borderRadius: 12, alignSelf: 'flex-end', objectFit: 'cover', backgroundColor: "#fff", }} />
                                        </Row>
                                
                                </Button>
                            )}
                            keyExtractor={item => item.id}
                        />

                        </Scroll>
    )
}
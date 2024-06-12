import React, { useContext, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { Search } from 'lucide-react-native';
import { Carrousel } from '../home';
import Header from '@components/header';

export default function ShopSingleScreen({ navigation, route}) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState();
    const id = route.params.id
    console.log(id)
    return (
        <Main>
            <Scroll style={{ paddingTop: 0, }}>
                <Column >
                    <Column style={{ position: 'absolute', top: 40, zIndex: 99,}} >
                        <Header />
                    </Column>
                    <MotiImage  style={{ backgroundColor: color.primary+20,flexGrow: 1, height: 300, paddingTop: 20, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, }}/>
                    <MotiImage style={{ width: 132, height: 132, borderRadius: 100, backgroundColor: color.primary, marginTop: -75, borderWidth: 6, borderColor: color.background, alignSelf: 'center', }}/>

                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h,  }}>
                        <Title>Mc Donalds</Title>
                        <Rate rate={3} />
                        <Label style={{ textAlign: 'center', marginVertical: 5, }}>Breve descrição sobre os serviços ou produtos que a loja vende lorem ipsum</Label>
                        <Row>
                            <SubLabel style={{ textAlign: 'center', marginVertical: 5, }}>Rua dos Bobos, 0 - São Paulo - SP</SubLabel>
                        </Row>
                    </Column>
                    <Button onPress={() => settype('Pesquisar')} style={{ borderRadius: 100, alignSelf: 'flex-end', marginHorizontal: margin.h, marginVertical: 10, backgroundColor: "#30303020", paddingVertical: 10, paddingHorizontal: 20, opacity: 0.6,  }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Label>Pesquisar</Label>
                            <Search color={color.label} size={18} style={{ marginLeft: 8, }}/>
                        </Row>
                    </Button>

                    <Column style={{ marginHorizontal: margin.h, }}>
                        <Title>Ofertas relâmpago</Title>
                    </Column>
                    <FlatList
                        horizontal
                        data={produtos}
                        style={{ marginVertical: margin.v, marginBottom: 30, }}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<Column style={{ width: margin.h -  8, }}/>}
                        ListFooterComponent={<Column style={{ width: margin.h -  8, }}/>}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Button onPress={() => navigation.navigate('Home')} style={{  borderRadius: 12, padding: 4,  }}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <MotiImage source={item.img} style={{ width: 84, height: 92, borderRadius: 12, marginBottom: 4, }}/>
                                    <SubLabel>{item.name}</SubLabel>
                                    <Label style={{ width: 100, textAlign: 'center', fontSize: 12, lineHeight: 16, }}>{item.desc}</Label>
                                </Column>
                            </Button>
                        )}
                    />
                    <Carrousel />

                    <Column style={{ marginHorizontal: margin.h, marginTop: -20, }}>
                        <Title>Gerais</Title>
                    </Column>
                    <FlatList
                        horizontal
                        data={produtos}
                        style={{ marginVertical: margin.v, marginBottom: 30, }}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<Column style={{ width: margin.h -  8, }}/>}
                        ListFooterComponent={<Column style={{ width: margin.h -  8, }}/>}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Button onPress={() => navigation.navigate('Home')} style={{  borderRadius: 12, padding: 4,  }}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <MotiImage source={item.img} style={{ width: 84, height: 92, borderRadius: 12, marginBottom: 4, }}/>
                                    <SubLabel>{item.name}</SubLabel>
                                    <Label style={{ width: 100, textAlign: 'center', fontSize: 12, lineHeight: 16, }}>{item.desc}</Label>
                                </Column>
                            </Button>
                        )}
                    />
                    <Column style={{ marginHorizontal: margin.h, marginTop: -20, }}>
                        <Title>Recomendados para você</Title>
                    </Column>
                    <FlatList
                        data={produtos.slice(0,3)}
                        style={{ marginVertical: margin.v, marginBottom: 30, }}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<Column style={{ width: margin.h -  8, }}/>}
                        ListFooterComponent={<Column style={{ width: margin.h -  8, }}/>}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Button onPress={() => navigation.navigate('Home')} style={{  borderRadius: 12, padding: 4, backgroundColor: '#FFE0F6', marginHorizontal: margin.h, marginVertical: 6,  }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Row>
                                        <MotiImage source={item.img} style={{ width: 54, height: 54, borderRadius: 12, marginBottom: 4, }}/>
                                        <Column style={{ justifyContent: 'center',  marginLeft: 20, }}>
                                            <SubLabel>Loja {item?.name}</SubLabel>
                                            <Label style={{  fontSize: 12, lineHeight: 16, }}>{item?.product}</Label>
                                        </Column>
                                    </Row>
                                    <SubLabel style={{ marginRight: 12, width: 80, fontSize: 12, lineHeight: 16, textAlign:'right' }}>{item?.desc}</SubLabel>
                                </Row>
                            </Button>
                        )}
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
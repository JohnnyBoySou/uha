import React, { useContext } from 'react';
import {   FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Search } from 'lucide-react-native';
import { MotiImage, MotiView } from 'moti';

export default function FavoritesScreen({ navigation, }) {
    const { color, font, margin} = useContext(ThemeContext);
    return (
        <Main>
            <Scroll>
                <Column style={{  }}>
                    <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Title>Favoritos</Title>
                        <Button onPress={() => navigation.navigate('Home')} style={{ borderRadius: 100, backgroundColor: "#30303020", paddingVertical: 10, paddingHorizontal: 20,  }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Label>Pesquisar</Label>
                            <Search color={color.label} size={18} style={{ marginLeft: 8, }}/>
                            </Row>
                        </Button>
                    </Row>

                    <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', marginTop: 20,  }}>
                        <Title>Produtos</Title>
                        <Button onPress={() => navigation.navigate('Home')} style={{  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100,  }}>
                            <SubLabel style={{ color: color.primary, }}>Ver mais</SubLabel>
                        </Button>
                    </Row>
                    <FlatList
                        horizontal
                        data={produtos}
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

                    <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', marginTop:20,  }}>
                        <Title>Serviços</Title>
                        <Button onPress={() => navigation.navigate('Home')} style={{  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100,  }}>
                            <SubLabel style={{ color: color.primary, }}>Ver mais</SubLabel>
                        </Button>
                    </Row>
                    <FlatList
                        horizontal
                        data={servicos}
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

                    <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center',  marginTop:20,  }}>
                        <Title>Estabelecimentos</Title>
                        <Button onPress={() => navigation.navigate('Home')} style={{  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100,  }}>
                            <SubLabel style={{ color: color.primary, }}>Ver mais</SubLabel>
                        </Button>
                    </Row>
                    <FlatList
                        horizontal
                        data={estabelecimentos}
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
                    <Title style={{ textAlign: 'center', marginTop: 30, }}>Recomendados</Title>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: margin.h, marginVertical: 24, }}>
                        <Column style={{ marginRight: 12, }}>
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, }} />
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, marginVertical: 12, }} />
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, }} />
                        </Column>
                        <Column style={{ marginRight: 12, }}>
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, }} />
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, marginVertical: 12, }} />
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, }} />
                        </Column>
                        <Column style={{ marginRight: 12, }}>
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, }} />
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, marginVertical: 12, }} />
                            <MotiView style={{ width: 250, height: 70, backgroundColor: color.off, borderRadius: 12, }} />
                        </Column>
                        <Column style={{width: 32, }} />
                    </ScrollView>

                </Column>
            </Scroll>
        </Main>
    )
}


const produtos = [
    {
        name: 'Natura',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Americanas',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/americanas.png'),
    },
    {
        name: 'Oboticário',
        desc: 'a partir de 40 UhaCoins',
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
const servicos = [
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
    {
        name: 'Cobasi',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/cobasi.png'),
    },
    {
        name: 'Magalu',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/magalu.png'),
    }, 
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/casas_bahia.png'),
    },
]

const estabelecimentos = [
    {
        name: 'Natura',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Magalu',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/magalu.png'),
    },
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/casas_bahia.png'),
    },
    {
        name: 'Oboticário',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/oboticario.png'),
    },
    {
        name: 'Amazon',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/amazon.png'),
    },
]
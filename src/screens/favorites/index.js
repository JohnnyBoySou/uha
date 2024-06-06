import React, { useContext, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Search } from 'lucide-react-native';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import Octicons from '@expo/vector-icons/Octicons';

export default function FavoritesScreen({ navigation, }) {
    const { color, font, margin} = useContext(ThemeContext);
    const [type, settype] = useState('all');
    const selectChose = type == 'Produtos' ? produtos : type == 'Serviços' ? servicos : type == 'Estabelecimentos' ? estabelecimentos : null;
    return (
        <Main>
            <Scroll>
                <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Title>Favoritos</Title>
                        <Button onPress={() => settype('Pesquisar')} style={{ borderRadius: 100, backgroundColor: "#30303020", paddingVertical: 10, paddingHorizontal: 20, opacity: 0.6,  }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Label>Pesquisar</Label>
                            <Search color={color.label} size={18} style={{ marginLeft: 8, }}/>
                            </Row>
                        </Button>
                    </Row>
                <AnimatePresence>

                <Empty />

                {type == 'all' &&
                <MotiView from={{opacity: 0, translateY: -50}} animate={{opacity:1, translateY: 0,}}>
                    <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', marginTop: 20,  }}>
                        <Title>Produtos</Title>
                        <Button onPress={() =>settype('Produtos')} style={{  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100,  }}>
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
                        <Button onPress={() => settype('Serviços')} style={{  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100,  }}>
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
                        <Button onPress={() =>settype('Estabelecimentos')} style={{  paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100,  }}>
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

                </MotiView>}
                </AnimatePresence>


            <AnimatePresence>
            {type != null && 
            <MotiView from={{opacity: 0, translateY: -50}} animate={{opacity: 1, translateY: 20,}} style={{ marginHorizontal: margin.h, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,  }}>
                    <Title>{type}</Title>
                    <Button onPress={() => {settype('all')}} style={{ backgroundColor: '#30303030', borderRadius: 100, paddingHorizontal: 20, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', opacity: 0.6,  }}>
                        <Label>Fechar</Label>
                    </Button>
                </Row>
                <FlatList
                        data={selectChose}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<Column style={{ width: margin.h -  8, }}/>}
                        ListFooterComponent={<Column style={{ width: margin.h -  8, }}/>}
                        keyExtractor={(item) => item.name}
                        columnWrapperStyle={{ justifyContent: 'space-between', }}
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
            </MotiView>
        }
            </AnimatePresence>

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
        <Label style={{ textAlign: 'center', fontSize: 16, marginTop: 10, marginHorizontal: margin.h, }}>Clique nos corações ao lado direito para favoritar os estabelecimentos, serviços e produtos que mais gostar!</Label>
    </Column>
)}



const produtos = [
    {
        name: 'Natura',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Americanas',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/americanas.png'),
    },
    {
        name: 'Oboticário',
        desc: 'a partir de 40 Pontos',
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
const servicos = [
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
    {
        name: 'Cobasi',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/cobasi.png'),
    },
    {
        name: 'Magalu',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/magalu.png'),
    }, 
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/casas_bahia.png'),
    },
]
const estabelecimentos = [
    {
        name: 'Natura',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Magalu',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/magalu.png'),
    },
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/casas_bahia.png'),
    },
    {
        name: 'Oboticário',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/oboticario.png'),
    },
    {
        name: 'Amazon',
        desc: 'a partir de 40 Pontos',
        img: require('@imgs/amazon.png'),
    },
]
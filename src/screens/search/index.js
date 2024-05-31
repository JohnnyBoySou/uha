import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from './../../components/header';
import { TextInput, FlatList } from 'react-native';
import { MotiImage } from 'moti';
import { Search, CircleHelp } from 'lucide-react-native';

export default function SearchScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState('');
    const [focus, setfocus] = useState();
    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <Scroll>
                <Header title="Pesquisar" rose/>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1,}}>
                
                    <Row style={{ marginBottom: 24, justifyContent: 'center', alignItems: 'center',  }}>
                        <TextInput value={query} onChangeText={e => setquery(e)}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            placeholderTextColor={color.title+60}
                            style={{ backgroundColor: '#f7f7f7', borderRadius: 12, padding: 12, width: '100%', fontFamily: font.bold, fontSize: 16, color: color.dark,}}
                            />
                            <Column style={{  padding: 8, borderRadius: 100,  position: 'absolute', right: 6,  }}>
                                <Search size={24} color={color.primary} style={{ zIndex: 99, }} />
                            </Column>
                    </Row>
                    <Row style={{ alignItems: 'center',  marginTop: -15, marginBottom: 20,}}>
                        <CircleHelp color={color.label} size={16}/>
                        <Label style={{ fontSize: 14, marginLeft: 4, }}>Busque por <U>estabelecimentos</U>, <U>serviços</U> ou <U>produtos</U></Label>
                    </Row>

                    <Title>Recentes</Title>
                    <FlatList 
                            data={ofertas}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{ marginVertical: 14, }}
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}>
                                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                        <MotiImage source={ item.img } style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                                            <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 16, }}>{item.title}</Title>
                                            <Label style={{ textAlign: 'center', width: 84, fontSize: 12, lineHeight: 16, color: color.title, fontFamily: font.medium,  marginBottom: 12, }}>{item.label}</Label>
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


const ofertas = [
    {
        id: 1,
        img: require('@imgs/amazon.png'),
        title: 'Amazon',
        label: 'A partir de 40 UhaCoins',
        color: '#',
    },
    {
        id: 2,
        img: require('@imgs/petiko.png'),
        title: 'Petiko',
        label: 'A partir de 40 UhaCoins',
        color: '#',
    },
    {
        id: 3,
        img: require('@imgs/cobasi.png'),
        title: 'Cobasi',
        label: 'A partir de 40 UhaCoins',
        color: '#',
    },
]

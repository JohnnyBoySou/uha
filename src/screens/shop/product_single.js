import React, { useContext, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button, ButtonOut, LabelLI , U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { Search } from 'lucide-react-native';
import Header from '@components/header';

export default function ShopProductSingleScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState();
    const item = product
    return (
        <Main>
            <Scroll style={{  }}>
                    <Header />
                    <FlatList 
                        horizontal
                        data={item?.imgs}
                        style={{ marginVertical: margin.v, marginBottom: 20,  }}
                        ListHeaderComponent={<Column style={{ width: margin.h, }}/>}
                        ListFooterComponent={<Column style={{ width: margin.h, }}/>}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        snapToOffsets={[0, 250, 500]}
                        renderItem={({ item }) => (
                            <MotiImage source={item} style={{ width: 284, height: 284, borderRadius: 24, marginRight: 14, backgroundColor: '#fff', }}/>
                        )}
                    />

                    <Column style={{  marginHorizontal: margin.h,  }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Title>{item?.name}</Title>
                            <AntDesign name="hearto" size={24} color="black" />
                        </Row>
                        <Label style={{marginVertical: 5, lineHeight: 24, }}>{item?.desc}</Label>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, }}>
                            <Row>
                            {item?.categories.map((cat) => (
                                <Label style={{  fontSize: 12, marginRight: 4,  fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, marginBottom: 4, paddingHorizontal: 10, backgroundColor: color.primary+20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                ))}
                            </Row>
                            <Rate rate={item?.rate} /> 
                                           
                        </Row>
                    </Column>
                            

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginVertical: 12,  }}>
                        <ButtonOut style={{ borderColor: color.primary, paddingVertical: 6, }}>
                            <LabelLI style={{ color: color.primary, fontSize: 16, }}>QR CODE</LabelLI>
                        </ButtonOut>
                        <Label>ou digite o <U style={{ color: color.primary, fontFamily: 'Font_Medium', }}>código manual</U></Label>
                    </Row>

                    <Comments/>

                    <Column style={{ marginHorizontal: margin.h, marginTop: 20, }}>
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

                    <Column style={{height: 100, }} />

            </Scroll>
        </Main>
    )
}


const Comments = ({ id }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v,}}>
            <Title>Avaliações</Title>
            {comments.map((comment) => (
                <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, marginTop: 24, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <MotiImage source={comment.user.avatar} style={{ width: 46, height: 46, borderRadius: 100, marginRight: 12,backgroundColor: color.primary+20, }}/>
                            <Label style={{ fontFamily: 'Font_Bold', }}>{comment.user.name}</Label>
                        </Row>
                        <Rate rate={comment.rate} />
                    </Row>
                    <Label style={{ fontSize: 16, lineHeight: 18, marginVertical: 6, }}>{comment?.message}</Label>

                    <FlatList
                        horizontal
                        data={comment.imgs}
                        style={{ marginVertical: 12, }}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <MotiImage source={item} style={{ width: 64, height: 64, borderRadius: 12, marginRight: 12, backgroundColor: '#d7d7d7', }}/>
                        )}
                    />

                    <Label style={{ fontSize: 12, lineHeight: 16, alignSelf: 'flex-end',}}>{comment.date}</Label>
                </Column>
                ))}
        </Column>
    )}


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


const product = {
    "uid": "12345",
    "name": "Descricao do servico",
    "desc": "Breve descrição sobre os serviços ou produtos que a loja vende lorem ipsum",
    "categories": [
        {
            "id": "12345",
            "name": "Categoria 1"
        },
        {
            "id": "12345",
            "name": "Categoria 2"
        }
    ],
    "rate": 4.5,
    "old_value": 60,
    "value": 40,
    "imgs": ["url1", "url2", "url3"],
    "share_id": "9876543456789",
    "comments_id": "9876543456789",
    "recomendations_id": ["12345", "12345", "12345"]
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

const comments = [
    {
        user: {
            name: 'Nome do usuário',
            avatar: 'url',
        },
        rate: 4,
        message: 'Avaliação do cliente lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        date: '10/10/2024',
        imgs: [
            'url1', 'url2', 'url3'
        ]
    },
    {
        user: {
            name: 'Nome do usuário',
            avatar: 'url',
        },
        rate: 4,
        message: 'Avaliação do cliente lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        date: '10/10/2024',
        imgs: [
            'url1', 'url2', 'url3'
        ]
    }
]
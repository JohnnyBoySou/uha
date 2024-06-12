import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, FlatList, Animated, Dimensions } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button, ButtonOut, LabelLI , U } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView, useAnimationState } from 'moti'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '@components/header';
import { getSingleService } from '@request/service';
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { NotepadText } from 'lucide-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

export default function ShopProductSingleScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState();
    const [item, setitem] = useState();

    useEffect(() => {
        getSingleService(1).then((res) => {
            setitem(res)
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [item])

    const scrollX = React.useRef(new Animated.Value(0)).current;
    
    const digit = useAnimationState({
        from: { opacity: 0, width: 0, },
        to: { opacity: 1, width: 180, },
    })

    return (
        <Main>
            <MotiView  from={{opacity: 0,}} animate={{opacity: 1,}} exit={{opacity: 0,}} style={{ position: 'absolute', bottom: 30, left: 30, zIndex: 99, }}>
                    <Column style={{  }}>
                        <Row style={{ marginVertical: 20, }}> 
                            <Button onPress={() => { navigation.navigate('Extract', { type: 'Cashback' }) }}  style={{ width: 62,  height: 62, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',  }}>
                                <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />
                            </Button>
                            <MotiView transition={{type: 'timing'}} state={digit} style={{ backgroundColor: '#bf0d8a', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center',  borderRadius: 10,  }}>
                                <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Gerar QR CODE</Label>
                            </MotiView>
                        </Row>
                        <Row> 
                            <Button  style={{ width: 62,  height: 62, borderRadius: 100, backgroundColor: color.blue, justifyContent: 'center', alignItems: 'center',  }}>
                                <MaterialCommunityIcons name="keyboard-outline" size={32} color="#fff" />
                            </Button>
                            <MotiView transition={{type: 'timing'}} state={digit} style={{ backgroundColor: '#0d8cd4', paddingLeft: 24, marginLeft: -36, height: 62, zIndex: -1, justifyContent: 'center', alignItems: 'center',  borderRadius: 10,  }}>
                                <Label style={{ color: '#fff', fontFamily: 'Font_Medium', fontSize: 16, }}>Digitar o código</Label>
                            </MotiView>
                        </Row>
                    </Column>
            </MotiView>

            <Scroll   onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 120) { digit.transitionTo('to')  } else {  digit.transitionTo('from')  } }} style={{ paddingTop: 15, }} >
                    <Header />
                    <Button style={{ position: 'absolute', top: 0, right: 20, alignSelf: 'flex-end', width: 42, height:42, borderRadius: 12, backgroundColor: color.primary+20, justifyContent: 'center', alignItems: 'center',  }}>
                        <AntDesign name="hearto" size={18} color={color.secundary} />
                    </Button>



                    
                    <FlatList 
                        horizontal
                        data={item?.imgs}
                        style={{ marginVertical: margin.v, marginBottom: 20,  }} 
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        snapToAlignment='center'
                        decelerationRate={'fast'}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            {
                              useNativeDriver: false,
                        })}
                        pagingEnabled
                        renderItem={({ item, index }) => (
                            <Column style={{ width: width, justifyContent: 'center', alignItems: 'center',   }}>
                                <MotiImage source={{uri: item}} style={{ width: width * 0.8, height: 284, borderRadius: 24,  backgroundColor: '#fff', }}/>
                            </Column>
                        )}
                    />
                        <ExpandingDot
                            data={[1,2,3]}
                            expandingDotWidth={20}
                            scrollX={scrollX}
                            containerStyle={{ position: 'relative', marginTop: 12, alignSelf: 'center'}}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 5
                            }}
                            activeDotColor={color.primary}
                            inActiveDotColor={color.primary+50}
                            />
                    <Column style={{  marginHorizontal: margin.h,  }}>
                        
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Column style={{ width: '80%' }}>
                            <Title>{item?.name}</Title>
                            <Label style={{marginVertical: 5, lineHeight: 20, fontSize: 16, }}>{item?.desc}</Label>
                        </Column>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', width: '20%'  }}>
                            <Title style={{ color: color.primary }}>{item?.value}</Title>
                            <Label style={{ color: color.primary, fontSize: 14, marginTop: -6, }}>pontos</Label>
                        </Column>

                        </Row>




                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, }}>
                            <Row>
                            {item?.categories?.map((cat) => (
                                <Button onPress={() => {navigation.navigate('Shop', { cat: item})}} >
                                <Label key={cat.name} style={{  fontSize: 14, marginRight: 4,  fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 6, marginBottom: 4, paddingHorizontal: 14, backgroundColor: color.primary+20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                </Button>
                                ))}
                            </Row>
                        </Row>
                    </Column>
                            

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginVertical: 12,  }}>
                        <ButtonOut style={{ borderColor: color.primary, paddingVertical: 6, }}>
                            <LabelLI style={{ color: color.primary, fontSize: 16, }}>QR CODE</LabelLI>
                        </ButtonOut>
                        <Label>ou digite o <U style={{ color: color.primary, fontFamily: 'Font_Medium', }}>código manual</U></Label>
                    </Row>


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




                    <Column style={{height: 400, }} />

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
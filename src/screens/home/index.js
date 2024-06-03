import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, ScrollView, View, Animated, Pressable } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage,  } from 'moti';
import { Bike, Bone , Brush, Hospital, Search, Shirt} from 'lucide-react-native';
import { SlidingDot } from "react-native-animated-pagination-dots";
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen({navigation, }){
    const { color, font, margin, } = useContext(ThemeContext);

    const campanhas = [
        {
            id: 1,
            title: 'Troque UhaCoins por serviços ou produtos',
            label: 'Acumule UhaCoins através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
            img: 'https://s3-alpha-sig.figma.com/img/5434/cab6/b4252e09af75aa2c6a770207a05e73e2?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pEjGmMV~nMRsGN1ifAc1Q5BpNd1MolpTMMu9QsZzk9isEd8yRQP5Uoka0tcU2JMWbLCbHe891vrGUTmKPUh7mJOL1L-bus0bw6HpX-rfPuo64cnHlZlw1XVduEzeCaTu4err0pkDu4f8lp-ESa0rDz6aAk9MSBm0Frq~sIM~IBWzmBPhDohbq04YnYFNB~IydaDcyR1yhP0~TuWkFquEfTdVx76VwgJv00cyG8BAU7Jm-K2TEOT8G1ghSp4vxUjyJw2y3QbCApbJTAEinlO2t5dwZIrZPtrrBxP7mbf6~hnac1ykdbWmEGaWD4UqkY3TBqdlRXvBHZba4zcaIdNjmg__',
        },
        {
            id: 2,
            title: 'Troque UhaCoins por serviços ou produtos',
            label: 'Acumule UhaCoins através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
            img: 'https://s3-alpha-sig.figma.com/img/cd97/5f11/248b1d913a7ba72e095ee6c4be8f8b89?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oeFbAPQO5QRtjZ~UqFLXaaxFL7aIs0ztuihHJuYRHddCTiXTLkcQ5F0c-MIl79Czc0N-jQM6YwelJ1GimC7zSWDdgSF3XQg0RLF4-IRiHqsSEl-ikLJXM8fsMCgGc6kIHvviNDtT4P21S5gBBl94A23q0osyduNe-3Cfsb6~f-BG4fVqm4CFNmn~Lom-nzOkUGm3MuFts5~ZyWMfRql26o6q8-a9cfrh2E72lnAr3McTV1~OKa~F35sXJeGbE9BMNPL5S4jae1aJjAt2S6iFcJgXnO7DVt8H-ofet~PCbWRTy~URVUwH0wq-GBcDKghxe3QZ9jZkhBCdugljKFOWkw__',
        },
         
    ]
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

    const estabelecimentos = [
        {
            id: 1,
            title: 'Petlove',
            label: 'Produtos para pets',
            img: require('@imgs/petlove.png')
        },
        {
            id: 2,
            title: 'Petz',
            label: 'Produtos para pets',
            img: require('@imgs/petz.png')
        }
    ]

    return (
        <Main style={{ backgroundColor: "#fff" }}>
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h }}>
                    <MotiImage source={require('@imgs/logo_black_nobg.png')} style={{ width: 100, height: 40,  objectFit: 'contain', }} />

                    <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Notify />
                        <Column style={{width:16, }} />
                        <Avatar />
                    </Row>
                </Row>
                <Button onPress={() => {navigation.navigate('Search')}}  style={{ borderRadius: 30,  opacity: .7, borderWidth: 2, marginVertical: 24, borderColor: "#30303030", backgroundColor: "#12121220", paddingVertical: 12, paddingHorizontal: 8, marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18,  }}>
                        <Title style={{ fontSize: 20, fontFamily: font.medium, }}>Pesquisar</Title>
                        <Search strokeWidth={2} color="#11111190"/>
                    </Row>
                </Button>
                
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>
                    
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('Notafiscal')}}  rippleColor={color.secundary} style={{ backgroundColor:  color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@icons/nota.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Nota fiscal</Label>
                    </Column>
                    
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('CampaignsUhaCoins')}}  rippleColor={color.secundary} style={{ backgroundColor: color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@icons/pontos.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Pontos</Label>
                    </Column>
                    
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('CampaignsGiftCard')}} rippleColor={color.secundary} style={{ backgroundColor: color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@icons/gift.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Gift Card</Label>
                    </Column>

                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('Ranking')}}  rippleColor={color.secundary} style={{ backgroundColor: color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@icons/rank.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Ranking</Label>
                    </Column>
                </Row>

                <Carrousel color={color} type="home"/>

                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 20, borderTopLeftRadius: 32,  }}>
                    <Title style={{ marginTop: 8, }}>Campanhas</Title>

                    <FlatList
                        style={{ marginVertical: 12, marginHorizontal: - margin.h, }}
                        data={campanhas}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item}) => (
                            <Button style={{ backgroundColor: "#fff", borderRadius: 24,  marginRight: 12, }} onPress={() => {navigation.navigate('Shop')}}>
                                <Column>
                                    <MotiImage source={{uri: item.img}} style={{ width: 300, height: 400, borderRadius: 24,  }} />
                                    <Column style={{ backgroundColor: '#fff', marginHorizontal: 24, padding: 12, borderRadius: 24, position: 'absolute', bottom: 20, }}>
                                        <Title style={{ textAlign: 'center', marginTop: 6, }}>{item.title}</Title>
                                        <Label style={{ textAlign: 'center', marginTop: 12, color: color.title, fontFamily: font.medium, fontSize: 16, marginBottom: 12, }}>{item.label}</Label>
                                    </Column>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />            

                </Column>

                <Row style={{ paddingHorizontal: margin.h,  backgroundColor: color.background, paddingVertical: 20,  justifyContent: 'space-between', alignItems: 'center',   }}>
                    <Title>Ofertas relâmpago</Title>
                    <Pressable>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 18, }}>Ver mais</Label>
                    </Pressable>
                </Row>
                
                <Column style={{ backgroundColor: color.background, }}>
                        <FlatList 
                            data={ofertas}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            ListHeaderComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }} onPress={() => {navigation.navigate('ShopProductSingle', {item: item})}}>
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

                <Column style={{ paddingHorizontal: margin.h,  paddingVertical: 20, backgroundColor: color.background,   }}>
                    <Title>Estabelecimentos queridinhos</Title>
                </Column>

                <FlatList style={{ backgroundColor: color.background, }}
                        data={estabelecimentos}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item}) => (
                            <Button style={{marginRight: 12, }} onPress={() => {navigation.navigate('ShopSingle', {item: item})}} >
                                <Column>
                                    <MotiImage source={item.img} style={{ width: 200, height: 60, objectFit: 'cover', borderRadius: 8, }} />
                                    <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 18, }}>{item.title}</Title>
                                    <Label style={{ textAlign: 'center',  color: color.title, fontFamily: font.medium, fontSize: 14, marginBottom: 12, }}>{item.label}</Label>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />
                            

                <Column style={{ backgroundColor: color.background, paddingTop: 20, }}>
                    <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, }}>Doe anônimamente</Title>
                    <Carrousel type="doe"/>
                </Column>
                <Column style={{ backgroundColor: color.background, marginTop: -30,  }}>
                    <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, }}>Produtos em oferta</Title>
                    <FlatList 
                            data={ofertas}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            ListHeaderComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}  onPress={() => {navigation.navigate('ShopProductSingle', {item: item})}}>
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
                <Column style={{ backgroundColor: color.background, paddingTop: 10,  }}>
                    <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, }}>Serviços em oferta</Title>
                    <FlatList 
                            data={ofertas}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            ListHeaderComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({item}) => (
                                <Button style={{   marginRight: 12, }}  onPress={() => {navigation.navigate('ShopProductSingle', {item: item})}}>
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
                
                <Column style={{ backgroundColor: color.background, paddingTop: 20, }} >
                    <Title style={{ paddingHorizontal: margin.h, paddingVertical: 12, }}>Gift Card com cashback</Title>
                    <Carrousel type="gift"/>
                </Column>
                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, marginTop: -20,  }}>
                    <Title>Categorias</Title>
                    <FlatList 
                        data={categories}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        keyExtractor={item => item.id}
                        style={{ marginVertical: margin.v, }}
                        renderItem={({item}) => (
                            <Button style={{ marginBottom: 12, borderBottomWidth: 1, borderColor: color.off, paddingBottom: 12,}}  onPress={() => {navigation.navigate('Shop', {type: item.title})}}>
                                <Row style={{  alignItems: 'center',  }}>
                                    <Column style={{ width: 62, height: 62, borderRadius: 10, marginRight: 12, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',  }}>
                                        {item.icon}
                                    </Column>
                                    <Column style={{ justifyContent: 'center', }}>
                                        <Title style={{ fontSize: 20, lineHeight: 20,  }}>{item.title}</Title>
                                        <Label style={{  marginTop: 2, color: color.title, fontFamily: font.medium, fontSize: 16, }}>{item.desc}</Label>
                                    </Column>
                                </Row>
                            </Button>
                        )}
                    />
                </Column>

                
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, backgroundColor: color.background, paddingBottom: 100,}}>
                        <Button style={{ borderWidth: 2, borderColor: '#111', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, }}>
                            <Label style={{ fontFamily: font.bold, color: '#111', }}>Central de ajuda</Label>
                        </Button>
                        <Button  onPress={() => {navigation.navigate('Donate',)}} style={{ borderWidth: 2, borderColor: color.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, }}>
                            <Label style={{ fontFamily: font.bold, color: color.primary, }}>Fazer doação</Label>
                        </Button>
                </Row>

            </Scroll>

        </Main>
    )
    }

const categories = [
    {
        id: 1, 
        title: 'Serviços Pet',
        desc: '30 estabelecimentos parceiros',
        icon: <Bone size={28} color="#FFF2E3"/>,
    },
    {
        id: 2, 
        title: 'Vestuário',
        desc: '43 estabelecimentos parceiros',
        icon: <Shirt size={28} color="#FFF2E3"/>,
    },
    {
        id: 3, 
        title: 'Esportivo',
        desc: '15 estabelecimentos parceiros',
        icon: <Bike size={28} color="#FFF2E3"/>,
    },
    {
        id: 4, 
        title: 'Farmácia',
        desc: '27 estabelecimentos parceiros',
        icon: <Hospital size={28} color="#FFF2E3"/>,
    },
    {
        id: 5, 
        title: 'Cuidados estéticos',
        desc: '29 estabelecimentos parceiros',
        icon: <Brush size={28} color="#FFF2E3"/>,
    },
]


export const Carrousel = ({ type }) => {
    const flat = useRef();
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const route = type === 'doe' ? 'DonateHide' : type === 'gift' ? 'BuyServiceGiftCard' : 'ShopSingle'

    const render = ({item}) => {
        const link = item.img
        return(
            <Button onPress={() => {navigation.navigate(route)}}  >
                <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24,  marginRight: 12}} />
            </Button>
        )
    }


    const data = type == 'gift' ? gift : type == 'doe' ? doe : type == 'home' ? home : home

    const home = [
        {id: 1, title: '1', img: require('@imgs/carrousel1.png')},
        {id: 2, title: '2', img: require('@imgs/carrousel2.png') },
        {id: 3, title: '3', img: require('@imgs/carrousel3.png') },
    ]
    const gift = [
        {id: 1, title: '1', img: require('@imgs/gift1.png')},
        {id: 2, title: '2', img: require('@imgs/gift2.png') },
        {id: 3, title: '2', img: require('@imgs/gift2.png') },
    ]
    const doe = [
        {id: 1, title: '1', img: require('@imgs/doe1.png')},
        {id: 2, title: '2', img: require('@imgs/doe2.png') },
        {id: 3, title: '2', img: require('@imgs/doe2.png') },
    ]

    const [scrollPosition, setScrollPosition] = useState(0);
    
   /*  useEffect(() => {
        const scrollInterval = setInterval(() => {
          setScrollPosition((prevPosition) => {
            const newPosition = (prevPosition + 320) % (320 * data?.length);
            flat.current?.scrollToOffset({ offset: newPosition, animated: true });
            return newPosition;
          });
        }, 4000);
    
        return () => clearInterval(scrollInterval);
      }, [data?.length]);
*/



    return(

        <Column>
        
    <FlatList 
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
                useNativeDriver: false,
            }
        )}
        ref={flat}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        data={ type == 'gift' ? gift : type == 'doe' ? doe : type == 'home' ? home : home}
        renderItem={render}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={<View style={{ width: 34 }} />}
        style={{ paddingHorizontal: 24, marginBottom: 32,}}
        snapToAlignment='center'
        snapToOffsets={[0, 300, 600]}
        
        />
      
        </Column>
        )
}  

/*
<SlidingDot
data={[1,2,3]}
expandingDotWidth={30}
scrollX={scrollX}
inActiveDotOpacity={0.6}
dotStyle={{
    width: 10,
    height: 10,
    backgroundColor: "#ECAD01",
    borderRadius: 5,
    marginHorizontal: 5
}}
/> 
*/
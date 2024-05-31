import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, ScrollView, View, Animated, Pressable } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView,  } from 'moti';
import { Bike, Bone , Brush, Hospital, Search, Shirt, Filter } from 'lucide-react-native';
import { SlidingDot } from "react-native-animated-pagination-dots";
import Avatar from '@components/avatar';
import Header from '@components/header';


export default function CampaignsUhaCoinsScreen({navigation, }){
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

    const bts = ['Estabelecimentos', 'Serviços', 'Produtos',]
    const [page, setpage] = useState('Estabelecimentos');
    const [type, settype] = useState();
    
    return (
        <Main style={{  }}>
            <Scroll>
                <Header />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Label style={{ }}>Campanha</Label>
                    <Title style={{ fontSize: 32, lineHeight: 38, }}>UhaCoins</Title>
                </Column>

                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 0, borderTopLeftRadius: 32,  }}>
                    <FlatList
                        style={{ marginVertical: 12, marginHorizontal: - margin.h, }}
                        data={campanhas}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item}) => (
                            <Button style={{ backgroundColor: "#fff", borderRadius: 24,  marginRight: 12, }}>
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

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop:20,  marginHorizontal: margin.h,}}>
                    <Button>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Filter color={color.label} size={18} />
                            <SubLabel style={{ color: color.label, }}>Filtro</SubLabel>
                        </Row>
                    </Button>
                    <Button onPress={() => settype('Pesquisar')} style={{ borderRadius: 100, backgroundColor: "#30303020", paddingVertical: 10, paddingHorizontal: 20, opacity: 0.6,  }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Label>Pesquisar</Label>
                            <Search color={color.label} size={18} style={{ marginLeft: 8, }}/>
                            </Row>
                        </Button>
                </Row>

                <ScrollView  horizontal style={{  paddingHorizontal: margin.h, marginTop: 10,}} showsHorizontalScrollIndicator={false}>
                {bts.map((bt, i) => (
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}  key={i}> 
                    <Button onPress={() => {setpage(bt)}}  style={{ backgroundColor: bt===page?color.primary:'transparent', padding: 8, paddingHorizontal: 12, borderRadius: 100, }}>
                        <Label style={{ color: bt===page?"#fff":color.title, fontFamily: font.bold, fontSize: 16,}}>{bt}</Label>
                    </Button>
                    </MotiView>
                ))}
                </ScrollView>

            {page == 'Estabelecimentos' && 
            <MotiView from={{opacity: 0, translateY: 30}} animate={{opacity: 1, translateY: 0}} transition={{type:'timing'}}>
                <Row style={{ paddingHorizontal: margin.h,  backgroundColor: color.background, paddingVertical: 20,  justifyContent: 'space-between', alignItems: 'center',   }}>
                    <Title>Estabelecimentos gerais</Title>
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

                <Row style={{ paddingHorizontal: margin.h,  backgroundColor: color.background, paddingVertical: 20,  justifyContent: 'space-between', alignItems: 'center',   }}>
                    <Title>Com ofertas relâmpago</Title>
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
                            

                <Column style={{ backgroundColor: color.background, marginTop: -30,  }}>
                    <Row style={{ paddingHorizontal: margin.h,  backgroundColor: color.background, paddingVertical: 20,  justifyContent: 'space-between', alignItems: 'center',   }}>
                        <Title>Casa e decoração</Title>
                        <Pressable>
                            <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 18, }}>Ver mais</Label>
                        </Pressable>
                    </Row>
                    <FlatList 
                            data={ofertas}
                            ListFooterComponent={<Column style={{ width: 24 }} />}
                            ListHeaderComponent={<Column style={{ width: 24 }} />}
                            showsHorizontalScrollIndicator={false}
                            horizontal
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
            </MotiView>}
                
                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, marginTop: 20, marginBottom: 20, }}>
                    <Title>Lojas em destaque hoje</Title>
                    <FlatList 
                        data={categories}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        keyExtractor={item => item.id}
                        style={{ marginVertical: margin.v, }}
                        renderItem={({item}) => (
                            <Button style={{ marginBottom: 12, borderBottomWidth: 1, borderColor: color.off, paddingBottom: 12,}}>
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
               
            </Scroll>

        </Main>
    )
    }

const categories = [
    {
        id: 1, 
        title: 'Starbucks',
        desc: 'Compre apartir de 50 UhaCoins',
        icon: <Bone size={28} color="#FFF2E3"/>,
    },
    {
        id: 2, 
        title: 'MC Donalds',
        desc: 'Compre apartir de 50 UhaCoins',
        icon: <Shirt size={28} color="#FFF2E3"/>,
    },
    {
        id: 3, 
        title: 'Lego',
        desc: 'Compre apartir de 50 UhaCoins',
        icon: <Bike size={28} color="#FFF2E3"/>,
    },
    {
        id: 4, 
        title: 'Posto Ipiranga',
        desc: 'Compre apartir de 50 UhaCoins',
        icon: <Hospital size={28} color="#FFF2E3"/>,
    },
   
]


const Carrousel = (  ) => {
    const flat = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;

    const render = ({item}) => {
        const link = item.img
        return(
            <Button>
                <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24,  marginRight: 12}} />
            </Button>
        )
    }
    const data = [
        {id: 1, title: '1', img: require('@imgs/scroll1.png')},
        {id: 2, title: '2', img: require('@imgs/scroll2.png') },
        {id: 3, title: '3', img: require('@imgs/scroll3.png') },
    ]

    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const scrollInterval = setInterval(() => {
          setScrollPosition((prevPosition) => {
            const newPosition = (prevPosition + 320) % (320 * data.length);
            flat.current?.scrollToOffset({ offset: newPosition, animated: true });
            return newPosition;
          });
        }, 4000);
    
        return () => clearInterval(scrollInterval);
      }, [data.length]);

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
        data={data}
        renderItem={render}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={<View style={{ width: 34 }} />}
        style={{ paddingHorizontal: 24, marginBottom: 56,}}
        snapToAlignment='center'
        snapToOffsets={[320, 640]}
        
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
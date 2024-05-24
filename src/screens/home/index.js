import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, ScrollView, View, Animated, Pressable } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage,  } from 'moti';
import { Bell , Search} from 'lucide-react-native';
import { SlidingDot } from "react-native-animated-pagination-dots";
import Avatar from '@components/avatar';
import Notify from '@components/notify';


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
            img: 'https://s3-alpha-sig.figma.com/img/4c66/0867/6c84334565a589145097476dc01670cb?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IfUJfPsjJcQ5slRuOudFAmk-9ylSTuHlN8yFtfVyukVUp~62v5Pigic1FN~UXcUsjaF3uBrbL~FOhKnUjgSnEMQ3O0wbhQCSzOKlLAUdXhzvjo-AbuEhd4ArufjPFLIWfKiIO0Um~Y0DgBpQjCQtirFeG9a2fGsrGG6~VhGk9tEm-YEzbSWyyPhdfLK1xzcj28f4ig7jb8E6mFsJmIvJ6B6C1kobwxFpYbGzVOzcsSIk6qwfp0dpTkYRSgihThIFFwWIqT1XEbvOTx2BJ2s9qd6PZ8Y2BbkjWMjw~ya18culyoEW8J2sTvAPr7r7rH7ErOOJ8kgw16oA6BUIb43xrQ__',
            title: 'Amazon',
            label: 'A partir de 40 UhaCoins',
            color: '#',
        },
        {
            id: 2,
            img: 'https://s3-alpha-sig.figma.com/img/683a/c80e/c9779a5a76b8d506a2530eb53b15946a?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AZW8DbGmjQhp-7TknKs1VqolzwZV5basJQ4pKuOPMfTarDDnhY5GKDzu9obl61L6SbJOJhXVf4o~GNFwfMCjkoaoehXKhvzTKjxLMZeDnb-OEsfGS96BYkKmkTORdhNDFilvNw52K1K3lJuETLVymEoWdb3VRG57i1sbO-WsvlJYSczVeVsEyXRAMSHWaR1FFgmphZLNuqoP1P3hhCbSdSLpYARwwPapIxt4bNvi7DX2VOLl2PwGpN7tNRYMy~1gtO6walGeSB5C~I8P1Ry89ceUDXwu3adniKbQgXfyhrYyCJy-0-LHvVGNNLtncVX8KfdCtkvZdP19yVkg2xBlmw__',
            title: 'Petiko',
            label: 'A partir de 40 UhaCoins',
            color: '#',
        },
        {
            id: 3,
            img: 'https://s3-alpha-sig.figma.com/img/bff7/7c8b/4316eb39bec33a2159778f1a0a432b4c?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oinykAGdXGlxaw2hTL4RoJacXL24i-7Q7-zObgl8MGNnTj6XtlXLGort8YWxx44KJZPlYdXO-ejztyKAXMJ6KbXhf14t4wCiRGdtxUGn8VDgJDwbLbuBCnf0tRNPsuJirdu3y4benVJ4hYcc4qLCtOUVodRKa0q2ltaMZL15rKf~g3ef2xDy7SSlDuBna~LvOTbKHSWco9lxVmQkfSsbFmd43PvUn9aK1lkJB~fSDvrhYzstYByP~wG2OzLcXV~hVsOAfmAd6lsfR59rT6EL0zPVsJB~AEh~hUbFY3PPHHHmeBeCY8JLUcLXKt~EUImo94O8rRfF0eLbBZZmYL4hMw__',
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
            img: 'https://s3-alpha-sig.figma.com/img/a196/95c7/a0392246afa51ad99465778e4944981b?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iGWRFym2RE5NskPEesbnCHdHjatERaoKAylAceVJWYB4mfKACXjyo-pUHb3L4a6B93YZ7qlNiLCztZ8U6bhQRunB~gzYWTMSLlci41r-sH7ShTL2kFUui3BHbrRRtRZkO0L-oGFf0XUDBRIBsVfN~r7U0NcpP9rmCK5lH27udZLWN0tAW-JOvdNMXjhOaloPr53fvqyO8mwtpUIH~RAxrhVb95G2J~NQO6Ost9MEZYq3-qJENcXXtuido8xmx-fuqfNl900e3j2O0UoXNnNEvbrf7owS0asOiU5cCueaFlIfb6F9mHi8m9m0ypXnwIgvDNGLicD0Z3xF3ErWqmaLrg__',
        },
        {
            id: 2,
            title: 'Petz',
            label: 'Produtos para pets',
            img: 'https://s3-alpha-sig.figma.com/img/aad2/2bcf/05aaad067e4c51be08492dfe129ff979?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qOjXeBvpe0RD-hgWWSL4mIhMEGUDNg3TB~O-AQHxwHjngcGTIEF~LmnmntyvYHyjDsCWh8OF7MueJpS27MuxM818Z~tFqJh-uepsLkXMXbmU-Pi1njX6-wdUBBqiZIlL2wrkoHa9f~zugrXYVIfgHb9a05rkgEirBnKqYWlpfSb~353HTSmVHKRhtVhQw-ZBgZuqxIRX1LrnzHR05xdSlxRWgb20SMbm9V2pW3s-UCMQQqhuE7IYIuWDRS5DUwV~cFMTb7v0-R2wdBkmAk~d7T35dk-xP9U~IDSjyY9sesiq4O~APT~sucV9i6TFfA~aAEtEwP~Aw5-cz7IJaQchHQ__',
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
                <Button style={{ borderRadius: 30,  opacity: .7, borderWidth: 2, marginVertical: 24, borderColor: "#30303030", backgroundColor: "#12121220", paddingVertical: 12, paddingHorizontal: 8, marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18,  }}>
                        <Title style={{ fontSize: 20, fontFamily: font.medium, }}>Pesquisar</Title>
                        <Search strokeWidth={2} color="#11111190"/>
                    </Row>
                </Button>
                
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginBottom: 24, }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('Redeem')}}  rippleColor={color.secundary} style={{ backgroundColor:  color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/recarga.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Resgate</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('Notafiscal')}}  rippleColor={color.secundary} style={{ backgroundColor: color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/nota.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Nota fiscal</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('BuyService')}} rippleColor={color.secundary} style={{ backgroundColor: color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/patinhas.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Patinhas</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('BuyServiceGiftCard')}}  rippleColor={color.secundary} style={{ backgroundColor: color.primary+20, padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/gift.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Gift Card</Label>
                    </Column>
                </Row>

                <Carrousel color={color}/>

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
                                <Button style={{  borderRadius: 24,  marginRight: 12, }}>
                                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                        <MotiImage source={{uri: item.img}} style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
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
                            <Button style={{  borderRadius: 24,  marginRight: 12, }}>
                                <Column>
                                    <MotiImage source={{uri: item.img}} style={{ width: 200, height: 60, borderRadius: 6, objectFit: 'cover',  }} />
                                    <Title style={{ textAlign: 'center', marginTop: 6, fontSize: 18, }}>{item.title}</Title>
                                    <Label style={{ textAlign: 'center',  color: color.title, fontFamily: font.medium, fontSize: 14, marginBottom: 12, }}>{item.label}</Label>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />
                            

                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 20,   }}>
                    <Title>Doe anônimamente</Title>
                    <Title>Produtos em oferta</Title>
                    <Title>Serviços em oferta</Title>
                    <Title>Gift Card com cashback</Title>
                    <Title>Categorias</Title>
                </Column>

                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 20,  borderBottomRightRadius: 32,   }}/>
                
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, backgroundColor: color.background,}}>
                        <Button style={{ borderWidth: 2, borderColor: '#111', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, }}>
                            <Label style={{ fontFamily: font.bold, color: '#111', }}>Central de ajuda</Label>
                        </Button>
                        <Button style={{ borderWidth: 2, borderColor: color.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, }}>
                            <Label style={{ fontFamily: font.bold, color: color.primary, }}>Fazer doação</Label>
                        </Button>
                </Row>

            </Scroll>

        </Main>
    )
    }


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
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
    return (
        <Main>
            <Scroll>
                
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h }}>
                    <MotiImage source={require('@imgs/logo_black_nobg.png')} style={{ width: 200,  height: 60, }} />

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
                        <Button onPress={() => {navigation.navigate('Redeem')}}  rippleColor={color.secundary} style={{ backgroundColor:"#F6E9C5", padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/recarga.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Resgate</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('Notafiscal')}}  rippleColor={color.secundary} style={{ backgroundColor:"#F6E9C5", padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/nota.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Nota fiscal</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('BuyService')}} rippleColor={color.secundary} style={{ backgroundColor:"#F6E9C5", padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/patinhas.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Patinhas</Label>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Button onPress={() => {navigation.navigate('BuyServiceGiftCard')}}  rippleColor={color.secundary} style={{ backgroundColor:"#F6E9C5", padding: 18, borderRadius: 12, }}>
                            <MotiImage source={require('@imgs/gift.png')} resizeMode='contain' style={{ width: 34, height: 34, }} />
                        </Button>
                        <Label style={{ marginTop: 4, fontFamily: font.medium, fontSize: 14, color: color.title, textAlign: 'center' }}>Gift Card</Label>
                    </Column>
                </Row>

                <Carrousel color={color}/>

                <Column style={{ paddingHorizontal: margin.h, backgroundColor: "#fff", paddingVertical: 20, borderTopLeftRadius: 32,  }}>
                    <Title>Campanhas</Title>
                </Column>

                <Row style={{ paddingHorizontal: margin.h, backgroundColor: "#fff", paddingVertical: 20,  justifyContent: 'space-between', alignItems: 'center',   }}>
                    <Title>Ofertas relâmpago</Title>
                    <Pressable>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 18, }}>Ver mais</Label>
                    </Pressable>
                </Row>


                <Column style={{ paddingHorizontal: margin.h, backgroundColor: "#fff", paddingVertical: 20,   }}>
                    <Title>Estabelecimentos queridinhos</Title>
                </Column>
                <Column style={{ paddingHorizontal: margin.h, backgroundColor: "#fff", paddingVertical: 20,   }}>
                    <Title>Doe anônimamente</Title>
                    <Title>Produtos em oferta</Title>
                    <Title>Serviços em oferta</Title>
                    <Title>Gift Card com cashback</Title>
                    <Title>Categorias</Title>
                </Column>
                <Column style={{ paddingHorizontal: margin.h, backgroundColor: "#fff", paddingVertical: 20,  borderBottomRightRadius: 32, marginBottom: 20, }}/>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
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
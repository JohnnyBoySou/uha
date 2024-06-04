import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, ScrollView, View, Animated, Pressable } from 'react-native';
import { Main, Scroll, Row, Column, Title, Label, Button, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage,  } from 'moti';
import { Bell , Search} from 'lucide-react-native';
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import Header from '@components/header';


export default function NotafiscalScreen({navigation, }){
    const { color, font, margin, } = useContext(ThemeContext);
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                 <Header title="Cadastrar nota fiscal"/>
                <Column style={{height: 24, }} />
                <Carrousel color={color}/>

                <Column style={{ paddingHorizontal: margin.h,   }}>
                    <Title style={{ fontSize: 20, marginTop: -20, }}>Como cadastrar</Title>
                    <Label style={{ marginVertical: 8, }}>Selecione a página de cadastro de nota fiscal, abra sua câmera e aponte para o QR Code em sua nota fiscal, simples, rápido e prático.</Label>

                    <Button onPress={() => {navigation.navigate('NotafiscalSend')}} style={{ borderRadius: 8, marginTop: 24, backgroundColor: color.primary, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                        <Label style={{ fontFamily: font.bold, color: "#fff", textAlign: 'center', }}>Cadastrar nota fiscal</Label>
                    </Button>
                    <Button onPress={() => {navigation.navigate('Extract', { type: 'Cashback'})}}  style={{ borderRadius: 8, borderColor: color.secundary, borderWidth: 2, marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                        <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Minhas notas</Label>
                    </Button>

                    <Title style={{ marginBottom: 12, fontSize: 20, }}>Regras de validação de notas</Title>

                    <Label style={{ fontSize: 16, }}> - Não existe de limite de notas fiscais, você pode cadastrar quantas quiser no tempo quiser.</Label>
                    <Label style={{ fontSize: 16, marginTop: 10, }}> - Independente do valor da nota fiscal ela valerá 1 patinha da sorte.</Label>


                    <Title style={{ marginTop: 24, fontSize: 20, }}>Compre a partir de 15 notas fiscais</Title>
                   
                </Column>
                <Scroll horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: margin.h, marginBottom: 24, marginTop: 16, }}>
                        <Column style={{ marginBottom: 12,  }}>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, }}/>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, marginVertical: 16, }}/>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, }}/>
                        </Column>
                        <Column style={{ marginBottom: 12, }}>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, }}/>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, marginVertical: 16, }}/>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, }}/>
                        </Column>
                        <Column style={{ marginBottom: 12, marginRight: 40, }}>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, }}/>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, marginVertical: 16, }}/>
                            <MotiImage style={{ width: 250, height: 70, backgroundColor: '#30303030', borderRadius: 16, marginRight: 24, }}/>
                        </Column>

                    </Scroll>

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
                <MotiImage source={link}  style={{ width: 320, height: 170, borderRadius: 24,  marginRight: 12, backgroundColor:"#FFF2E3",}} />
            </Button>
        )
    }
    const data = [
        {id: 1, title: '1', img: require('@imgs/nota1.png')},
        {id: 2, title: '2', img: require('@imgs/nota2.png') },
        {id: 3, title: '3', img: require('@imgs/nota3.png') },
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
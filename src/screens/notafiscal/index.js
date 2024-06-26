import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, View, Animated } from 'react-native';
import { Main, Scroll, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, } from 'moti';
import Header from '@components/header';
import { StatusBar } from 'expo-status-bar';


export default function NotafiscalScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark"  backgroundColor="#fff" animated/>
            <Scroll>
                <Header title="Nota fiscal" rose />
                <Column style={{ height: 24, }} />
                <Carrousel color={color} />

                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 20, marginTop: 0, }}>Como cadastrar</Title>
                    <Label style={{ marginVertical: 8, }}>Selecione a página de cadastro de nota fiscal, abra sua câmera e aponte para o QR Code em sua nota fiscal, simples, rápido e prático.</Label>

                    <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ borderRadius: 8, marginTop: 24, backgroundColor: color.primary, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6, }}>
                        <Label style={{ fontFamily: font.bold, color: "#fff", textAlign: 'center', }}>Cadastrar nota fiscal</Label>
                    </Button>
                    <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Extract', params: { type: 'Moedas' } }) }} style={{ borderRadius: 8, borderColor: color.secundary, borderWidth: 2, marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6, }}>
                        <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Minhas notas</Label>
                    </Button>

                    <Title style={{ marginBottom: 12, fontSize: 20, }}>Regras de validação de notas</Title>

                    <Label style={{ fontSize: 16, }}> - Não existe de limite de notas fiscais, você pode cadastrar quantas quiser no tempo quiser.</Label>
                    <Label style={{ fontSize: 16, marginTop: 10, }}> - Independente do valor da nota fiscal ela valerá 1 ponto.</Label>

                </Column>

                <Column style={{ height: 140, }} />
            </Scroll>

        </Main>
    )
}


const Carrousel = () => {

    const render = ({ item }) => {
        const link = item.img
        return (
            <Button>
                <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12, backgroundColor: "#FFF2E3", }} />
            </Button>
        )
    }
    const data = [
        { id: 1, title: '1', img: require('@imgs/nota1.png') },
        { id: 2, title: '2', img: require('@imgs/nota2.png') },
        { id: 3, title: '3', img: require('@imgs/nota3.png') },
    ]
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const windowWidth = 300;
    const scrollX = useRef(new Animated.Value(0)).current;

    const activyColor = '#5C0D45';
    const inactivyColor = '#5C0D4570';

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const index = Math.round(value / windowWidth);
            setActiveIndex(index);
        });

        return () => {
            scrollX.removeListener(listener);
        };
    }, [scrollX, windowWidth]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    return (
        <Column>
            <FlatList
                ref={flatListRef}
                scrollEventThrottle={16}
                data={data}
                renderItem={render}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={{ width: 34 }} />}
                style={{ paddingHorizontal: 24, marginBottom: 12, }}
                snapToAlignment='center'
                pagingEnabled
                onScroll={handleScroll}

            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 14, marginBottom: 20, }}>
                {data.map((_, index) => {
                    const inputRange = [
                        (index - 1) * windowWidth,
                        index * windowWidth,
                        (index + 1) * windowWidth
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 30, 8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <>
                            <Animated.View
                                key={index}
                                style={{
                                    width: dotWidth,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: index == activeIndex ? activyColor : inactivyColor,
                                    marginHorizontal: 4,
                                }}
                            />
                        </>
                    );
                })}
            </View>
        </Column>
    )
}


import React, { useState, useContext, useRef, useEffect } from 'react';
import { FlatList, View, Animated, Dimensions } from 'react-native';
import { Main, Scroll, Column, Title, Label, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, } from 'moti';
import Header from '@components/header';
import { StatusBar } from 'expo-status-bar';
import { ExpandingDot } from "react-native-animated-pagination-dots";

const { width, height } = Dimensions.get('window');

export default function NotafiscalScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor="#fff" animated />
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
                    <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Extract', params: { type: 'Notas fiscais' } }) }} style={{ borderRadius: 8, borderColor: color.secundary, borderWidth: 2, marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6, }}>
                        <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Minhas notas</Label>
                    </Button>

                    <Title style={{ marginBottom: 12, fontSize: 20, }}>Regras de validação de notas</Title>

                    <Label style={{ fontSize: 16, }}> - Não existe de limite de notas fiscais, você pode cadastrar quantas quiser no tempo quiser.</Label>
                    <Label style={{ fontSize: 16, marginTop: 10, }}> - Independente do valor da nota fiscal ela valerá 1 ponto.</Label>

                </Column>

                <Column style={{ height: 180, }} />
            </Scroll>

        </Main>
    )
}

const Carrousel = () => {
    const { color, margin, font, } = useContext(ThemeContext);
    const render = ({ item }) => {
        const link = item.img
        return (
            <Column style={{ width: width }}>
                <Button>
                    <MotiImage source={link} style={{ width: 320, height: 170, borderRadius: 24, marginRight: 12, backgroundColor: "#FFF2E3", }} />
                </Button>
            </Column>
        )
    }
    const data = [
        { id: 1, title: '1', img: require('@imgs/nota1.png') },
        { id: 2, title: '2', img: require('@imgs/nota2.png') },
        { id: 3, title: '3', img: require('@imgs/nota3.png') },
    ]
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Column>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={render}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={{ width: 34 }} />}
                style={{ paddingHorizontal: 24, marginBottom: 12, }}
                pagingEnabled
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
            />
            <Column style={{ backgroundColor: color.secundary + 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 3, alignSelf: 'center', marginTop: 0, marginBottom: 14, }}>
                <ExpandingDot
                    data={data}
                    expandingDotWidth={20}
                    scrollX={scrollX}
                    containerStyle={{ position: 'relative', marginTop: 0, top: 0, }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 2,
                    }}
                    activeDotColor={color.secundary}
                    inActiveDotColor={color.secundary + 50}
                />
            </Column>
        </Column>
    )
}
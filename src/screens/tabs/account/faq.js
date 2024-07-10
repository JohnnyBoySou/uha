import React, { useContext, } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonOut, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';

export default function AccountFAQScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{  }}>
                <Header title="Dúvidas frequentes" rose/>
                <Title style={{ marginHorizontal: margin.h, marginTop: 30, marginBottom: -12, }}>Categoria</Title>
                <FlatList
                            style={{ marginTop: 24, marginHorizontal: margin.h, }}
                            data={Configs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <Card item={item} />}
                        />
                <Title style={{ marginHorizontal: margin.h, marginTop: 20, marginBottom: -12, }}>Categoria</Title>
                <FlatList
                            style={{ marginTop: 24, marginHorizontal: margin.h, }}
                            data={Configs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <Card item={item} />}
                        />
                <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop:20, }}>
                    <ButtonOut onPress={() => {navigation.navigate('Questions')}} style={{ borderColor: "#111", }}>
                        <LabelLI style={{ fontSize: 16, }}>Registrar dúvida</LabelLI>
                    </ButtonOut>
                    <Column style={{width: 12, }} />
                    <ButtonOut onPress={() => {navigation.navigate('Questions')}}  style={{ borderColor: color.primary, }}>
                        <LabelLI style={{ fontSize: 16, color: color.primary, }}>Registrar feedback</LabelLI>
                    </ButtonOut>
                </Row>
                <Column style={{ height: 100, }} />
            </Scroll>
        </Main>
    )
}

const Card = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);

    return(
        <Column style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginBottom: 12,   paddingBottom: 12, }}>
            <Title style={{ fontSize: 18, marginRight: 6, }}>{item?.q}</Title>
            <Label style={{ fontSize: 14, }}>{item?.r}</Label>
        </Column>
)}


const Configs = [
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    
]

import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Button, LabelLI, Row, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { MotiImage, MotiView } from 'moti';
import { FlatList } from 'react-native';

import ongs from '@data/ongs' 

export default function ONGListScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);

    return (
        <Main style={{ backgroundColor: '#fff', }}>

            <Scroll>
                <Header title="Lista de ONG's" rose />

                <FlatList
                    data={ongs}
                    keyExtractor={item => item?.id}
                    renderItem={({ item }) => (
                        <Button onPress={() => { navigation.navigate('ONGSingle', { item: item, }) }} >
                            <Row key={item?.id} style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between', }}>
                                <Row style={{ alignItems: 'center', }}>
                                    <Column style={{ marginLeft: 20, flexGrow: 2, }}>
                                        <Title style={{ fontSize: 18, fontFamily: 'Font_Bold', width: 180, }}>{item?.name.length >= 20 ? item?.name.slice(0, 20) + '...' : item?.name}</Title>
                                        <Label style={{ fontSize: 12, marginTop: -2, }}>{item?.desc.length >= 26 ? item?.desc.slice(0, 26) + '...' : item?.desc}</Label>
                                    </Column>
                                    <Column>
                                        <MotiImage style={{ width: 124, height: 82, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item?.img }} />
                                    </Column>
                                </Row>
                            </Row>
                        </Button>
                    )}
                />
            </Scroll>
        </Main>
    )
}

/**
 * 
                    <ButtonPR style={{borderRadius: 100, }} onPress={() => {navigation.goBack()}} >
                        <LabelLI style={{ color: '#fff', }}>Escolher ONG</LabelLI>
                    </ButtonPR>
 */
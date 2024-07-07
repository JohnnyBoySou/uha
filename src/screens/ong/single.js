import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Button, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { MotiImage, MotiView } from 'moti';

import { FlatList, Pressable } from 'react-native';
import ongs from '@data/ongs';

export default function ONGSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const id = route?.params?.id
    const item = route?.params?.item || ongs.find((item) => item.id === id);  
    ongs.find((item) => item.id === id);
     
    const [showDesc, setshowDesc] = useState(false);
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll >
                <Header title="Detalhes" rose />
                
                <Column style={{ justifyContent: 'center', alignItems: 'center',  marginVertical: 24,  }}>
                    <MotiImage source={{uri: item?.img}} from={{opacity: 0, scale: 0.6,}} animate={{opacity: 1, scale: 1,}} style={{ width: 200, height: 200, borderRadius: 12, backgroundColor: '#FFE0F6', marginBottom: 30,}}/>
                    <Title>{item?.name}</Title>
                    <Label style={{ marginTop: 6, }}>{item?.desc}</Label>
                </Column>  
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ marginBottom: 6, fontSize: 18, }}>Sobre nós</Title>

                   {showDesc ? <Label style={{ fontSize: 14, }}>{item?.about}</Label> : <Label style={{ fontSize: 14, }}>{item?.about?.slice(0, 200)}...</Label>}
                
                    <Button onPress={() => {setshowDesc(!showDesc)}} style={{ alignSelf: 'flex-start', marginVertical: 12, backgroundColor:'#FFE0F6', paddingVertical: 8, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, borderRadius: 100,  }}>
                        <LabelLI style={{ color: color.primary, fontSize: 15,  }}>{showDesc ? 'Mostrar menos' : 'Ver mais'}</LabelLI>
                    </Button>

                </Column>
                <Banners data={item?.imgs} />
                <Column style={{height: 60, }} />
            </Scroll>
        </Main>
    )
} 


const Banners = ({ data }) => {
    const render = ({ item }) => {
        return (
            <Button onPress={() => { }}  >
                <MotiImage source={{ uri: item }} style={{ width: 240, height: 300, borderRadius: 24, marginRight: 18, objectFit: 'cover', }} />
            </Button>
        )
    }
    return (
        <FlatList
            decelerationRate={'fast'}
            scrollEventThrottle={16}
            data={data}
            renderItem={render}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<Column style={{ width: 34 }} />}
            style={{ paddingHorizontal: 24, marginBottom: 32, }}
            snapToOffsets={[0, 200, 420]}
        />
    )
}
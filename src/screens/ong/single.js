import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Button, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { MotiImage, MotiView } from 'moti';
import { Pressable } from 'react-native';
export default function ONGSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const item = route?.params?.item
     
    const [showDesc, setshowDesc] = useState(false);
    return (
        <Main>
            <Scroll>
                <Header title="Detalhes" />
                
                <Column style={{ justifyContent: 'center', alignItems: 'center',  marginVertical: 24,  }}>
                    <MotiImage from={{opacity: 0, scale: 0.6,}} animate={{opacity: 1, scale: 1,}} style={{ width: 200, height: 200, borderRadius: 12, backgroundColor: '#FFE0F6', marginBottom: 30,}}/>
                    <Title>{item?.name}</Title>
                    <Label>{item?.desc}</Label>
                </Column> 
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ marginBottom: 12, }}>Quem somos</Title>
                
                   {showDesc ? <Label>{item?.about}</Label> : <Label>{item?.about.slice(0, 200)}...</Label>}
                
                    <Button onPress={() => {setshowDesc(!showDesc)}} style={{ alignSelf: 'flex-start', marginVertical: 12, backgroundColor:'#FFE0F6', paddingVertical: 8, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, borderRadius: 100,  }}>
                        <LabelLI style={{ color: color.primary,  }}>{showDesc ? 'Mostrar menos' : 'Ver mais'}</LabelLI>
                    </Button>

                    <ButtonPR style={{borderRadius: 100, }} onPress={() => {navigation.goBack()}} >
                        <LabelLI style={{ color: '#fff', }}>Escolher ONG</LabelLI>
                    </ButtonPR>
                </Column>
            </Scroll>

        </Main>
    )
}
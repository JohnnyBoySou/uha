import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Pressable } from 'react-native';
import { Button, ButtonOut, Scroll, Column, Label, Row, Title, B, LabelPR, SubLabel, Main } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti';
import { ArrowUpRight } from 'lucide-react-native';
import CheckBox from '@components/checkbox';
import { getONGs } from '@api/request/ongs';
import ongs from '@data/ongs'
import { useNavigation } from '@react-navigation/native';

export default function DonateONGS ({ item, handleOng }){
    const navigation = useNavigation()
    const { color,  margin } = useContext(ThemeContext);
    const [loading, setloading] = useState();
    const [selectOng, setselectOng] = useState();
    //const [ongs, setongs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
           getONGs().then((res) => {
            //    setongs(res);
              });
        }
        fetchData();
    }, []);

    return (
        <Main style={{ paddingTop: 10, backgroundColor: "#f7f7f7", paddingBottom: 30,}} >
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 5, }}>
                <Title style={{ fontSize: 28, lineHeight: 28, marginBottom: 12, }}>Escolha qual ONG deseja beneficiar</Title>
                
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                    <SubLabel style={{ fontSize: 24, color: color.secundary, marginVertical: 12, marginTop: 20, }}>ONGs</SubLabel>
                    <Pressable onPress={() => {navigation.navigate('ONGList')}} >
                        <Label style={{ fontFamily: 'Font_Bold', color: color.primary, }}>Ver todas</Label>
                    </Pressable>
                </Row>
                <FlatList
                    data={ongs}
                    keyExtractor={item => item?.id}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => (
                        <Row  key={item?.id} style={{  marginVertical: 3, paddingHorizontal: 12, borderRadius:12, paddingVertical:12, alignItems: 'center', justifyContent: 'space-between', backgroundColor: item?.id === selectOng?.id ? color.blue+30 : 'transparent',}}>
                               <Row style={{  alignItems: 'center',  }}>
                                <Button onPress={() => { navigation.navigate('ONGSingle', { item: item, }) }} >
                                    <Column>
                                        <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item?.img }} />
                                        <ArrowUpRight size={18} color="#fff" style={{ marginTop: -20, alignSelf: 'flex-end', backgroundColor: color.primary,  borderTopLeftRadius: 4, borderBottomRightRadius: 6, }}/>
                                    </Column>
                                </Button>
                                <Column style={{ marginLeft: 20, }}>
                                    <Title style={{ fontSize: 16, fontFamily: 'Font_Bold', }}>{item?.name.length >= 20 ? item?.name.slice(0, 18) + '...' : item?.name}</Title>
                                    <Label style={{ fontSize: 12, marginTop: -2, }}>{item?.desc.length >= 26 ? item?.desc.slice(0, 26) + '...' : item?.desc}</Label>
                                </Column>
                               </Row>
                               <Button onPress={() => {setselectOng(item)}} style={{ marginRight: 6, borderRadius: 5, }} >
                                <CheckBox status={item?.id === selectOng?.id}/>
                               </Button>
                            </Row>
                    )}
                />
                <ButtonOut onPress={() => handleOng(selectOng)} disabled={!selectOng}  style={{ borderColor: selectOng ? color.primary : color.blue, marginTop: 20, backgroundColor : selectOng ? color.primary : "transparent" }}>
                   <Row>
                      {loading ? <ActivityIndicator size={28} color="#fff" /> : <LabelPR style={{ color: selectOng ? "#fff" : color.blue, }}>{selectOng ? 'Concluir' : 'Escolha uma ONG'}</LabelPR>}
                   </Row>
                </ButtonOut>
            </Column>
        </Main>
    )
}



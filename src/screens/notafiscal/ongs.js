import React, { useContext, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Button, ButtonOut, Scroll, Column, Label, LabelLI, Row, Title, B, ButtonPR, LabelPR, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Ongs from '@data/ongs';
import { MotiImage } from 'moti';
import { ArrowBigDown, ArrowUpRight, CheckCircle } from 'lucide-react-native';
import Header from '@components/header';
import CheckBox from '@components/checkbox';
import { StatusBar } from 'expo-status-bar';


const NotafiscalONGS = ({ navigation, route, }) => {

    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(false);
    const [loading, setloading] = useState();
    const item = route.params?.item
    const [selectOng, setselectOng] = useState();

    const handleFinish = () => {
        setloading(true)
        console.log(item)
        console.log(selectOng)
        setTimeout(() => {
            setloading(false)
            navigation.navigate('NotafiscalSuccess', { item: item, ong: selectOng })
        }, 1000);
    }




    return (
        <Scroll >
            <StatusBar style='dark' />
            <Header rose />
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 5, }}>
                <Title style={{ fontSize: 24, lineHeight: 26, marginBottom: 8, }}>Escolha qual ONG deseja beneficiar</Title>
                <Label style={{ color: color.secundary+99, }}>Ao cadastrar sua nota, o valor será doado para a ONG abaixo de sua escolha.</Label>
               
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                    <SubLabel style={{ fontSize: 24, color: color.secundary, marginVertical: 12, marginTop: 20, }}>ONGs recentes</SubLabel>
                    <Button>
                        <Title style={{ color: color.primary, fontSize: 18, }}>Ver todas</Title>
                    </Button>
                </Row>
                
                <FlatList
                    data={Ongs}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Row style={{  marginVertical: 3, paddingHorizontal: 12, borderRadius:12, paddingVertical:12, alignItems: 'center', justifyContent: 'space-between', backgroundColor: item.id === selectOng ? color.blue+30 : 'transparent',}}>
                               <Row style={{  alignItems: 'center',  }}>
                                <Button onPress={() => { navigation.navigate('ONGSingle', { item: item, }) }} key={item.id} >
                                    <Column>
                                        <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item.img }} />
                                        <ArrowUpRight size={18} color="#fff" style={{ marginTop: -20, alignSelf: 'flex-end', backgroundColor: color.primary,  borderTopLeftRadius: 4, borderBottomRightRadius: 6, }}/>
                                    </Column>
                                </Button>
                                <Column style={{ marginLeft: 20, }}>
                                    <Title style={{ fontSize: 18, }}>{item?.name.length >= 20 ? item?.name.slice(0, 20) + '...' : item?.name}</Title>
                                    <Label style={{ fontSize: 14, }}>{item?.desc.length >= 26 ? item?.desc.slice(0, 26) + '...' : item?.desc}</Label>
                                </Column>
                               </Row>
                               <Button onPress={() => {setselectOng(item.id)}} style={{ marginRight: 6, borderRadius: 5, }} >
                                <CheckBox status={item.id === selectOng}/>
                               </Button>
                            </Row>
                    )}
                />
                <ButtonOut onPress={handleFinish} disabled={!selectOng}  style={{ borderColor: selectOng ? color.primary : color.blue, marginTop: 20, backgroundColor : selectOng ? color.primary : "transparent" }}>
                   <Row>
                      {loading ? <ActivityIndicator size={28} color="#fff" /> : <LabelPR style={{ color: selectOng ? "#fff" : color.blue, }}>{selectOng ? 'Concluir' : 'Escolha uma ONG'}</LabelPR>}
                   </Row>
                </ButtonOut>
            </Column>
        </Scroll>
    )
}
export default NotafiscalONGS;


/**
 *  <ButtonOut onPress={() => { settype(!type) }} style={{ borderColor: type ? '#fff' : color.primary, paddingVertical: 8, marginVertical: 18, backgroundColor: type ? color.primary : 'transparent' }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <LabelLI style={{ color: type ? '#fff' : color.primary }}>Deixar escolha em aberto</LabelLI>
                        <CheckCircle size={20} color='#fff' style={{ marginLeft: 12, }} />
                    </Row>
                </ButtonOut>

 */
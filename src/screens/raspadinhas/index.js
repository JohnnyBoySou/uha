import React, { useContext, useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { FlatList , ScrollView} from 'react-native';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import { CircleCheck, CircleX, AlarmClock, Info, Trophy } from 'lucide-react-native';
import Feather from '@expo/vector-icons/Feather';

import rifas from '@data/rifas/rifas'

export default function RaspadinhasScreen({ navigation, }) {
    const { margin, color, font } = useContext(ThemeContext);


    const bts = ['Todas', 'Vencidas', 'Em andamento', 'Concluídas', ]
    const [page, setpage] = useState('Todas');
    
    const progress = rifas.filter(rifa => rifa.icon === 'await');
    const finish = rifas.filter(rifa => rifa.icon === 'check');
    const win = rifas.filter(rifa => rifa.icon === 'lucky');
    const all = rifas

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll  >
                <Header rose title='Seus pedidos' />
                <ScrollView  horizontal style={{ paddingHorizontal: margin.h, marginVertical: 12,  }} showsHorizontalScrollIndicator={false}>
                    {bts.map((bt, index) => (
                        <Button key={index} onPress={() => setpage(bt)} 
                        style={{ backgroundColor: bt === page ? color.primary : 'transparent', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 100, margin: 0,}}>
                            <Label style={{ color: bt === page ? "#fff" : color.secundary, fontFamily: font.bold, fontSize: 16,  textAlign: 'center', alignSelf: 'center', }}>{bt}</Label>
                        </Button>
                    ))}
                    <Column style={{ width: 60, height: 12, }} />
                </ScrollView>

                <Column style={{ marginHorizontal: 12, }}>


                    <FlatList
                        style={{ marginVertical: 12, marginBottom: 50, }}
                        data={page === 'Todas' ? all : page === 'Em andamento' ? progress : page === 'Concluídas' ? finish : page === 'Vencidas' ? win : all}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CardExtrato2 item={item} />
                        )}
                        keyExtractor={item => item.id}
                    />

                </Column>
            </Scroll>
        </Main>
    )
}





const CardExtrato2 = ({ item, index, onLong, type }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.green : item?.icon === 'await' ? color.blue : item?.icon === 'uncheck' ? color.red : item.icon === 'dimiss' ? '#000000' : item?.icon === 'lucky' ? color.primary : '#303030'
    const icon = item?.icon === 'check' ? <Feather color={color.green} name='check' size={24} /> : item?.icon === 'await' ? <Info color={color.blue} size={24} /> : item?.icon === 'uncheck' ? <Feather name='x' size={24} color={color.red} /> : item.icon === 'lucky' ? <Trophy size={24} color={color.primary} /> : <Feather name='loader' color="#000000" size={24} />
    return (
        <Button onLongPress={onLong} onPress={() => { navigation.navigate('RifasSingle', { id: item.id, type: type, }) }} style={{ paddingHorizontal: margin.h, }}>
            <Row style={{ marginBottom: 16, justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ backgroundColor: cl + 20, width: 54, height: 54, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        {icon}
                    </Column>
                    <SubLabel style={{ marginTop: 6, fontSize: 12, fontFamily: 'Font_Medium', }}>{item?.date}</SubLabel>
                </Column>

                <Column style={{ borderRightWidth: 2, borderRightColor: cl + 50, paddingRight: 20, }}>
                    <Title style={{
                        color: cl,
                        fontSize: 24, lineHeight: 24, textAlign: 'right',
                        textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',
                    }}>{item?.value} rifa{item?.value > 1 ? 's' : ''} </Title>
                    <SubLabel style={{ color: cl, }}>{item?.result} {item.icon === 'lucky' ? '- Parabéns' : item.icon != 'lucky' ? '' : '- Sem sorte'}</SubLabel>
                    <Label style={{ fontSize: 12,  textAlign: 'right', lineHeight:12, marginTop:5, }}>N. {item?.id}</Label>
                </Column>
            </Row>
        </Button>
    )
}

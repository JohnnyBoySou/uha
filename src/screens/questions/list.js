import React, { useContext, useState, useRef, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, LineL } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, CircleX, AlarmClock, Plus, Car, Check } from 'lucide-react-native';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { useNavigation } from '@react-navigation/native';

import Header from '@components/header';

export default function QuestionListScreen({ navigation, route}) {
    const { color, font, margin } = useContext(ThemeContext);
    let type = route.params?.type;

    const [page, setpage] = useState(type ? type : 'Todos');
    const [dateSelect, setdateSelect] = useState('Hoje');
    const scrollTags = useRef(null);

    const bts = ['Todos', 'Dúvidas', 'Reclamações', 'Sugestões',]
    const dates = ['Hoje', '15 dias', 'Mensal', 'Anual']

    useEffect(() => {
        const selectType = () => {
            if(type?.lenght > 0) {
                setpage(type)
            }
        }
        const handleScroll = () => {
            if(page === 'Reclamações' || page === 'Sugestões') {scrollTags.current.scrollToEnd({ animated: true });}
            else if(page === 'Todos' || page === 'Dúvidas' ) {scrollTags.current.scrollTo({ x: 0, y: 0, animated: true });}
        }
        handleScroll()
        selectType()
        
    }, [page]);
    

    const data = [
        {
            id: 'N. 1234567890',
            type: 'Reclamação',
            status: 'Em análise',
        },
        {
            id: 'N. 1234567890',
            type: 'Dúvida',
            status: 'Em análise',
        },
        {
            id: 'N. 1234567890',
            type: 'Reclamação',
            status: 'Solucionada',
        },
        {
            id: 'N. 1234567890',
            type: 'Sugestão',
            status: 'Recebida',
        },
    ]

    const sugestao = data.filter((item) => item.type === 'Sugestão')
    const duvida = data.filter((item) => item.type === 'Dúvida')
    const reclamacao = data.filter((item) => item.type === 'Reclamação')


    return (
        <Main style={{  }}>
        
        <Scroll> 
            <Header title="Registros" rose/>

            <ScrollView ref={scrollTags} horizontal style={{  paddingHorizontal: margin.h, marginTop: 20,}} showsHorizontalScrollIndicator={false}>
                {bts.map((bt, i) => (
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}  key={i}> 
                    <Button onPress={() => {setpage(bt);}}  style={{ backgroundColor: bt===page?color.primary:'transparent', padding: 8, paddingHorizontal: 12, borderRadius: 100, }}>
                        <Label style={{ color: bt===page?"#fff":color.title, fontFamily: font.bold, fontSize: 16,}}>{bt}</Label>
                    </Button>
                    </MotiView>
                ))}
                <Column style={{width: 100, height: 12, }} />
            </ScrollView>

            <Row style={{ justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: margin.h,  }}>
                {dates.map((date, i) => (
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}  key={i}> 
                    <Button onPress={() => {setdateSelect(date)}}  style={{ padding: 8, paddingHorizontal: 6, borderRadius: 100, margin: 8, }}>
                        <Label style={{ color: date===dateSelect?color.primary:color.title, fontFamily: font.medium, fontSize: 14,}}>{date}</Label>   
                    </Button>
                    </MotiView>
                ))}     
            </Row>

            {page === 'Todos' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardDoacao item={item} />}
                />
                </MotiView>
            )}

            {page === 'Dúvidas' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={duvida}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardDoacao item={item} />}
                />
                </MotiView>
            )}

            {page === 'Reclamações' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={reclamacao}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardDoacao item={item} />}
                />
                </MotiView>
            )}

            {page === 'Sugestões' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={sugestao}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardDoacao item={item} />}
                />
                </MotiView>
            )}

            <Column style={{height: 100, }} />
        </Scroll>
    </Main>
    )
}

const CardDoacao = ({item}) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);	
    const cl = item?.status === 'Solucionada' ? color.blue : item?.status === 'Em análise' ? color.primary : item?.status === 'Campanha expirada' ? '#000' : item.status === 'Recebida' ? color.green : color.red;
    const icon = item?.status === 'Solucionada' ? <CircleCheck color={color.blue} size={24} /> : item?.status === 'Em análise' ? <Info color={color.primary} size={24} /> : item?.status === 'Recebida' ? <CircleCheck color={color.green} size={24} /> : '';
return(
    <Button onPress={() => {navigation.navigate('ExtractSingle', { item : item})}} >
    <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center',  }}>
        <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20,}}>
                <Title style={{ fontSize: 24, lineHeight: 28,
                 textDecorationLine: item?.status === 'Campanha expirada' ? "line-through" : "none",
                 textDecorationStyle: item?.status === 'Campanha expirada' ? "solid" : "none",
                 textDecorationColor: item?.status === 'Campanha expirada' ? "#000": 'transparent',
                }}>{item?.id}</Title>
                <Label style={{ fontSize: 16,  marginTop: 4, }}>{item?.type}</Label>
                <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
        </Column>
        <Column style={{  alignItems: 'flex-end',  }}>
             {icon}
            <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
        </Column>
    </Row></Button>
)}
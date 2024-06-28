import React, { useContext, useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import { CircleCheck, CircleX, AlarmClock, Info, Trophy, CheckCheck, ShoppingCart, Search } from 'lucide-react-native';
import Feather from '@expo/vector-icons/Feather';

import { MotiImage, MotiView } from 'moti';

export default function RaspadinhasShopScreen({}) {
    const { margin, color, font } = useContext(ThemeContext);
    const rasp = [
        {
            id: 'Básica',
            value: 5,
            cl: '#EFBBE0',
        },
        {
            id: 'PRO',
            value: 9,
            cl: '#FF26BD'
        },
        {
            id: 'Premium',
            value: 13,
            cl: '#5C0D45'
        },
        {
            id: 'Plus',
            value: 17,
            cl: '#00A3FF'
        }
    ]
    const [counts, setCounts] = useState({
        'Básica': 0,
        'PRO': 0,
        'Premium': 0,
        'Plus': 0,
      });
    
      const updateCount = (id, count) => {
        setCounts(prevCounts => ({
          ...prevCounts,
          [id]: count,
        }));
      };

      const navigation = useNavigation();
    return (
        <Scroll style={{paddingTop: 0,}}>
            <Column style={{ paddingHorizontal: margin.h, backgroundColor: '#f7f7f7', }}>
                <Title style={{ fontSize: 22, lineHeight: 22, marginBottom: 2, }}>Tipos de cartela</Title>
                <FlatList
                    data={rasp}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CardRaspadinha item={item} updateCount={updateCount}/>
                    )}
                    keyExtractor={item => item.id}
                />
                <ButtonPR style={{ alignSelf: 'center', paddingHorizontal: 30, marginTop: 12, }} onPress={() => {navigation.navigate('RaspadinhasFinish', {items: counts})}} >
                    <LabelPR>Continuar</LabelPR>
                </ButtonPR>
            </Column>
        </Scroll>
    )
}


const CardRaspadinha = ({ item, updateCount }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setValue] = useState(0);

    const handlePlus = () => {
        if (value < 10) {
            const newValue = value + 1;
            setValue(newValue);
            updateCount(item.id, newValue);
        }
    };

    const handleMinus = () => {
        if (value > 0) {
            const newValue = value - 1;
            setValue(newValue);
            updateCount(item.id, newValue);
        }
    };
    return (
        <Column>
            <Row style={{ paddingVertical: 12, }}>
                <MotiImage style={{ width: 92, marginRight: 12, height: 92, backgroundColor: item.cl, borderRadius: 12, }} />
                <Column style={{ justifyContent: 'center', }}>
                    <Label style={{ fontSize: 14, color: color.secundary + 99, fontFamily: font.medium, }}>Cartela {item.id}</Label>
                    <Title>R$ {item.value},00</Title>
                    <Row style={{ marginTop: 8, alignItems: 'center', }}>
                        <Button onPress={handleMinus} style={{ marginRight: 12, width: 24, height: 24, borderRadius: 100, backgroundColor: color.secundary, justifyContent: 'center', alignItems: 'center', }}>
                            <Feather name="minus" size={18} color="#fff" />
                        </Button>
                        <Title style={{ fontSize: 24, width: 30, textAlign: 'center' }}>{value}</Title>
                        <Button onPress={handlePlus} style={{ marginLeft: 12, width: 24, height: 24, backgroundColor: '#fff', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Feather name="plus" size={18} color={color.primary} />
                        </Button>
                    </Row>
                </Column>
            </Row>
        </Column>
    )
}

import React, { useContext } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Info } from 'lucide-react-native';
import { FlatList } from 'react-native';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import { CircleCheck, CircleX, AlarmClock } from 'lucide-react-native';

export default function CampaignsProgressScreen({ navigation, }) {
    const { margin, } = useContext(ThemeContext);
    return (
        <Main >
            <Scroll style={{ paddingTop: 20, }}>
                <Header rose />
                <Column style={{ marginHorizontal: margin.h, marginBottom: 20, marginTop: 10, }}>
                    <Label>Campanha</Label>
                    <Title style={{ fontSize: 32, lineHeight: 38, }}>Rifas da sorte</Title>
                    <Title style={{ marginTop: 20, }}>Seus pedidos</Title>
                </Column>

                <Column style={{ marginHorizontal: margin.h, }}>


                    <FlatList
                        style={{ marginVertical: 12, marginBottom: 50, }}
                        data={extract}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CardExtrato item={item} />
                        )}
                        keyExtractor={item => item.id}
                    />

                </Column>
            </Scroll>
        </Main>
    )
}


const extract = [
    {
        id: '1234567890',
        value: 15,
        status: 'Pagamento em espera',
        icon: 'await',
        date: '10/10/24',
        result: 'Campanha em andamento',
        lucky: null,
    },
    {
        id: '12345678910',
        value: 20,
        status: 'Pagamento confirmado',
        icon: 'check',
        date: '10/10/24',
        result: 'Campanha em andamento',
        lucky: null,
    },
    {
        id: '12345678912',
        value: 20,
        status: 'Pagamento confirmado',
        icon: 'check',
        date: '10/10/24',
        result: 'Sorteio finalizado',
        lucky: true,
    },
    {
        id: '12345678911',
        value: 10,
        status: 'Pagamento confirmado',
        icon: 'uncheck',
        date: '10/10/24',
        result: 'Sorteio finalizado',
        lucky: false,
    },
]


const CardExtrato = ({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;
    return (
        <Button onPress={() => { navigation.navigate('ExtractSingle', { item: item }) }} style={{ borderRadius: 12, }}>
            <Row style={{ paddingVertical: 16, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10, }}>
                <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20, }}>
                    <Title style={{
                        fontSize: 28, lineHeight: 28, textDecoration: item?.type === 'dimiss' ? 'underline' : 'none',
                        textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                        textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                        textDecorationColor: item?.icon === 'dimiss' ? "#000" : 'transparent',
                    }}>{item?.value} fichas</Title>
                    <Label style={{ fontSize: 16, marginVertical: 4, }}>Número do pedido {item?.id}</Label>
                    <Label style={{ fontSize: 16, marginVertical: 4, }}>{item?.status}</Label>
                    <SubLabel style={{ color: cl, }}>{item?.result} {item.lucky ? '- Parabéns' : item.lucky === null ? '' : '- Sem sorte'}</SubLabel>
                </Column>
                <Column style={{ alignItems: 'flex-end', }}>
                    {icon}
                    <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
                </Column>
            </Row>
        </Button>

    )
}

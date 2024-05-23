import React, { useContext, useState, useRef, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, CircleX, AlarmClock } from 'lucide-react-native';
import  Header   from '@components/header';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';

export default function ExtractScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
   
    const user = {balance: 550, cashback: 100,}
    const [page, setpage] = useState('Extrato');
    const [dateSelect, setdateSelect] = useState('Hoje');
    const scrollTags = useRef(null);

    const bts = ['Extrato', 'Doações', 'UhaCoins', 'Rifas', 'Cashback']
    const dates = ['Hoje', '15 dias', 'Mensal', 'Anual']

    const doacoes = [
        {
            value: 35,
            type: 'Doação',
            date: '10/10/2024',
            status: 'Pagamento em análise',
        },
        {
            value: 50,
            type: 'Doação',
            date: '12/08/2024',
            status: 'Pagamento confirmado',
        },
        {
            value: 100,
            type: 'Doação',
            date: '05/05/2024',
            status: 'Pagamento negado',
        },
    ]

    const rifas = [
        {
            value: 35,
            type: 'Campanha xxxxxxx',
            date: '10/10/2024',
            status: 'Pagamento em análise',
        },
        {
            value: 50,
            type: 'Campanha xxxxxxx',
            date: '12/08/2024',
            status: 'Pagamento confirmado',
        },
        {
            value: 100,
            type: 'Campanha xxxxxxx',
            date: '05/05/2024',
            status: 'Pagamento negado',
        },
        {
            value: 35,
            type: 'Campanha xxxxxxx',
            date: '05/05/2024',
            status: 'Campanha expirada',
        },
    ]

    const extrato = [
        {
            value: 5,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback confirmado',
            icon: 'check',
            id: '9876543234567898765434567899876543',
        },
        {
            value: 100,
            type: 'Rifa',
            date: '10/10/2024',
            status: 'Transferência pronta para resgate',
            icon: 'check',
            id: '9876543234567898765434567899876543',
        },
        {
            value: 10,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback em análise',
            icon: 'await',
            id: '9876543234567898765434567899876543',
        },
        {
            value: 50,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback negado',
            icon: 'uncheck',
            id: '9876543234567898765434567899876543',
        },
        {
            value: 300,
            type: 'UhaCoins',
            date: '10/10/2024',
            status: 'Transferência bem sucedida',
            icon: 'check',
            id: '9876543234567898765434567899876543',
        },
        {
            value: 10,
            type: 'Rifa',
            date: '10/10/2024',
            status: 'Pagamento confirmado',
            icon: 'check',
            id: '9876543234567898765434567899876543',
        },
        {
            value: 5,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback expirado',
            icon: 'dimiss',
            id: '9876543234567898765434567899876543',
        },
    ]

    const coins = [
        {
            value: 1,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback em análise',
            icon: 'await',
        },
        {
            value: 1,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback confirmado',
            icon: 'check',
        },
        {
            value: 1,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback negado',
            icon: 'uncheck',
        },
        {
            value: 30,
            type: 'Doação',
            date: '10/10/2024',
            status: 'Cashback confirmado',
            icon: 'check',
        },
        {
            value: 300,
            type: 'Doação',
            date: '10/10/2024',
            status: 'Transferência bem sucedida',
            icon: 'check',
        },
        {
            value: -300,
            type: 'UhaCoins',
            date: '10/10/2024',
            status: 'Cashback confirmado',
            icon: 'check',
        },
        {
            value: 300,
            type: 'Doação',	
            date: '10/10/2024',
            status: 'Transferência bem sucedida',
            icon: 'check',
        },
        {
            value: 45,
            type: 'Doação',	
            date: '10/10/2024',
            status: 'Cashback expirado',
            icon: 'dimiss',
        },
    ]

    const cashback = [
        {
            value: 1,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback em análise',
            icon: 'await',
        },
        {
            value: 95,
            type: 'Doação',
            date: '10/10/2024',
            status: 'Cashback confirmado',
            icon: 'check',
        },
        {
            value: 1,
            type: 'Nota fiscal',
            date: '10/10/2024',
            status: 'Cashback negado',
            icon: 'uncheck',
        },
        {
            value: 30,
            type: 'Doação',
            date: '10/10/2024',
            status: 'Cashback expirado',
            icon: 'dimiss',
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            if(page === 'Cashback' || page === 'Rifas') {scrollTags.current.scrollToEnd({ animated: true });}
            else if(page === 'Extrato' || page === 'Doações' ) {scrollTags.current.scrollTo({ x: 0, y: 0, animated: true });}
        }
        handleScroll()
    }, [page]);

    return (
        <Main>
        <Scroll>

            <Header title="Movimentações" />
           
            <Column style={{backgroundColor: color.primary, paddingHorizontal: 20, paddingVertical: 16, borderRadius: 24, marginHorizontal: margin.h, marginVertical: 18, }}>
                <Label style={{  color: "#fff", }}>Saldo em UhaCoins</Label>
                <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: "#fff", }}>{user?.balance}</Title>
                <LineD />
                <Label style={{ color: "#fff", marginTop: 12, marginBottom: 4, }}>Saldo em cashback</Label>
                <Label style={{color: "#fff", }}>R$ {user?.cashback},00</Label>
                <ButtonSE style={{ marginTop: 24, alignSelf: 'flex-end', paddingHorizontal: 32,}} onPress={() => {}} >
                    <LabelSE >Resgatar</LabelSE>
                </ButtonSE>
            </Column>

            <ScrollView ref={scrollTags} horizontal style={{  paddingHorizontal: margin.h, }} showsHorizontalScrollIndicator={false}>
                {bts.map((bt, i) => (
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}  key={i}> 
                    <Button onPress={() => {setpage(bt)}}  style={{ backgroundColor: bt===page?color.primary:'transparent', padding: 8, paddingHorizontal: 12, borderRadius: 100, }}>
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

            {page === 'Extrato' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={extrato}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardExtrato item={item} />}
                />
                </MotiView>
            )}


            {page === 'Doações' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={doacoes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardDoacao item={item} />}
                />
                </MotiView>
            )}

            {page === 'Rifas' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={rifas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardDoacao item={item} />}
                />
                </MotiView>
            )}
            

            {page === 'UhaCoins' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={coins}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardUhacoins item={item} />}
                />
                </MotiView>
            )}

            {page === 'Cashback' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={cashback}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardUhacoins item={item} />}
                />
                </MotiView>
            )}

        </Scroll>
    </Main>
    )
}



const CardExtrato = ({item}) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);	
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24}/> : null;
return(
    <Button onPress={() => {navigation.navigate('ExtractSingle', { item : item})}} >
    <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center',  }}>
        <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20,}}>
                <Title style={{ fontSize: 28, lineHeight: 28, textDecoration: item?.type === 'dimiss' ? 'underline' : 'none', 
                textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                textDecorationColor: item?.icon === 'dimiss' ? "#000": 'transparent',
                
                }}>R$ {item?.value},00</Title>
                <Label style={{ fontSize: 16,  marginVertical: 4, }}>{item?.type}</Label>
                <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
        </Column>
        <Column style={{  alignItems: 'flex-end',  }}>
             {icon}
            <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
        </Column>
    </Row>
    </Button>

)}



const CardUhacoins = ({item}) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);	
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24}/> : null;
return(
    <Button onPress={() => {navigation.navigate('ExtractSingle', { item : item})}} > 
    <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center',  }}>
        <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20,}}>
                <Title style={{ fontSize: 28, lineHeight: 28, textDecoration: item?.type === 'dimiss' ? 'underline' : 'none', 
                textDecorationLine: item?.icon === 'dimiss' ? "line-through" : "none",
                textDecorationStyle: item?.icon === 'dimiss' ? "solid" : "none",
                textDecorationColor: item?.icon === 'dimiss' ? "#000": 'transparent',
                
                }}>{item?.value}</Title>
                <Label style={{ fontSize: 16,  marginVertical: 4, }}>{item?.type}</Label>
                <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
        </Column>
        <Column style={{  alignItems: 'flex-end',  }}>
             {icon}
            <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
        </Column>
    </Row></Button>
)}

const CardDoacao = ({item}) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);	
    const cl = item?.status === 'Pagamento confirmado' ? color.blue : item?.status === 'Pagamento em análise' ? color.primary : item?.status === 'Campanha expirada' ? '#000' : color.red;
    const icon = item?.status === 'Pagamento confirmado' ? <CircleCheck color={color.blue} size={24} /> : item?.status === 'Pagamento em análise' ? <Info color={color.primary} size={24} /> : <CircleX color={color.red} size={24} />;
return(
    <Button onPress={() => {navigation.navigate('ExtractSingle', { item : item})}} >
    <Row style={{ marginBottom: 32, justifyContent: 'space-between', alignItems: 'center',  }}>
        <Column style={{ borderLeftWidth: 2, borderLeftColor: cl, paddingLeft: 20,}}>
                <Title style={{ fontSize: 28, lineHeight: 28,
                 textDecorationLine: item?.status === 'Campanha expirada' ? "line-through" : "none",
                 textDecorationStyle: item?.status === 'Campanha expirada' ? "solid" : "none",
                 textDecorationColor: item?.status === 'Campanha expirada' ? "#000": 'transparent',
                }}>R$ {item?.value},00</Title>
                <Label style={{ fontSize: 16,  marginVertical: 4, }}>{item?.type}</Label>
                <SubLabel style={{ color: cl, }}>{item?.status}</SubLabel>
        </Column>
        <Column style={{  alignItems: 'flex-end',  }}>
             {icon}
            <SubLabel style={{ marginTop: 12, }}>{item?.date}</SubLabel>
        </Column>
    </Row></Button>
)}
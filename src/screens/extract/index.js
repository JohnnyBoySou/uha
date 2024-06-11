import React, { useContext, useState, useRef, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, LineL } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, CircleX, AlarmClock, Plus, Car } from 'lucide-react-native';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { useNavigation } from '@react-navigation/native';
import doacoes from '@data/doacoes';
import extrato from '@data/extrato';
import coins from '@data/coins';
import moedas from '@data/moedas';
import rifas from '@data/rifas';
import user from '@data/user';

export default function ExtractScreen({ navigation, route}) {
    const { color, font, margin } = useContext(ThemeContext);
    let type = route.params?.type;

    const [page, setpage] = useState(type ? type : 'Extrato');
    const [dateSelect, setdateSelect] = useState('Hoje');
    const scrollTags = useRef(null);

    const bts = ['Extrato', 'Doações', 'Pontos', 'Rifas', 'Moedas']
    const dates = ['Hoje', '15 dias', 'Mensal', 'Anual']

    useEffect(() => {
        const selectType = () => {
            if(page === 'Extrato') Card.transitionTo('open');
            if(type?.lenght > 0) {
                setpage(type)
            }
            
        }

        const handleScroll = () => {
            if(page === 'Moedas' || page === 'Rifas') {scrollTags.current.scrollToEnd({ animated: true });}
            else if(page === 'Extrato' || page === 'Doações' ) {scrollTags.current.scrollTo({ x: 0, y: 0, animated: true });}
        }
        handleScroll()
        selectType()
        
    }, [page]);
    
    const [actionButton, setactionButton] = useState(false);
    const Card = useAnimationState({
        open: {
          opacity: 0,
          height: 10,
          scale: 0.1,
          marginBottom: -50,
        },
        close: {
            opacity: 1,
            height: 240,
            scale: 1,
            marginBottom: 0,
        },
      });

    const handleCard = (pag) => {
        if(pag === 'Extrato'){
            Card.transitionTo('open'); 
        }
        else{
            Card.transitionTo('close');
        }   
    }

    return (
        <Main style={{ backgroundColor: '#fff', }}>
        <AnimatePresence>
            {actionButton &&
                <MotiView from={{opacity: 0, scale: .6, rotate: '32deg', }} animate={{opacity: 1, rotate: '0deg', scale: 1,}} transition={{type: 'timing'}} exit={{opacity: 0, rotate: '32deg', scale: .7,}} style={{ position: 'absolute', bottom: 100,  right: 30, zIndex: 99, }}>
                    <Button onPress={() => {navigation.navigate('NotafiscalSend')}}  style={{  width: 52, height: 52, borderRadius: 100, backgroundColor: color.primary,  justifyContent: 'center', alignItems: 'center',  }}><Plus size={32} color="#fff" /></Button>
                </MotiView>
            }
        </AnimatePresence>
        <Scroll onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 20) { setactionButton(true);  } else {  setactionButton(false);  } }}> 
            <MotiView state={Card}   transition={{ duration: 800, type: 'timing', }} 
                /**
                 * opacity: { duration: 200, type: 'timing' }, 
                height: { duration: 800, type: 'timing' }, 
                scale: { duration: 700, type: 'timing' }
                 */
                style={{backgroundColor: color.primary, paddingHorizontal: 28, paddingVertical: 20, borderRadius: 24, marginHorizontal: margin.h, marginTop: 20,   }}>
                <Label style={{  color: "#fff", }}>Saldo em pontos</Label>
                <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: "#fff", }}>{user?.balance}</Title>
                <LineL />
                <Label style={{ color: "#fff", marginTop: 12, marginBottom: 4, }}>Saldo em moedas resgatadas</Label>
                <Label style={{color: "#fff", }}>R$ {user?.moedas},00</Label>
                <ButtonSE onPress={() => {navigation.navigate('Shop')}}  style={{ marginTop: 24, alignSelf: 'flex-end', paddingHorizontal: 26,}} >
                    <LabelSE>Utilizar pontos</LabelSE>
                </ButtonSE>
            </MotiView>

            <ScrollView ref={scrollTags} horizontal style={{  paddingHorizontal: margin.h, marginTop: 20,}} showsHorizontalScrollIndicator={false}>
                {bts.map((bt, i) => (
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}  key={i}> 
                    <Button onPress={() => {setpage(bt); handleCard(bt);}}  style={{ backgroundColor: bt===page?color.primary:'transparent', padding: 8, paddingHorizontal: 12, borderRadius: 100, }}>
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
            

            {page === 'Pontos' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={coins}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardPontos item={item} />}
                />
                </MotiView>
            )}

            {page === 'Moedas' && (
                <MotiView from={{opacity: 0, translateY: -20, }} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing'}}>
                <FlatList
                    style={{ marginTop: 12, marginHorizontal: margin.h,}}
                    data={moedas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardMoedas item={item} />}
                />
                </MotiView>
            )}
            
            <Column style={{height: 100, }} />
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

const CardPontos = ({item}) => {
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

const CardMoedas = ({item}) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);	
    const cl = item?.icon === 'check' ? color.blue : item?.icon === 'await' ? color.primary : item?.icon === 'uncheck' ? color.red : '#000'
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24}/> : null;
return(
    <Button onPress={() => {navigation.navigate('ExtractSingleMoedas', { item : item})}} > 
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
import React, { useContext, useRef, useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Clock, Info, Phone, Plus, X } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList, Animated, ScrollView } from 'react-native';
import Header from '@components/header';
import Pagination from '@components/pagination';
import { getRifaSingle } from '@api/request/rifa';
import { StatusBar } from 'expo-status-bar';



export default function RifasSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const id = route.params?.id ? route.params?.id : 'rifa-1';
    const [item, setitem] = useState();
    const [winner, setwinner] = useState();

    useEffect(() => {
        const fecthData = () => {
            getRifaSingle(id).then((res) => {
                setitem(res);
                const winner = res?.sorteados?.includes(res.user.id) ? true : res.sorteados.length == 0 ? null : false;
                setwinner(winner)
            })
        }
        fecthData();
    }, [])



    const windowWidth = 200;

    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const index = Math.round(value / windowWidth);
            setActiveIndex(index);
        });

        return () => {
            scrollX.removeListener(listener);
        };
    }, [scrollX, windowWidth]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const Ball = () => { return (<Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.primary, }} />) }
    const Line = () => { return (<Column style={{ width: 24, height: 8, borderRadius: 100, backgroundColor: color.primary, }} />) }
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header rose title="Rifa da Sorte" />

                <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled onScroll={handleScroll} scrollEventThrottle={16} horizontal style={{ paddingHorizontal: 20, marginTop: 20, }}>
                    <Column style={{ backgroundColor: "#f7f7f7", borderRadius: 12, marginRight: 24, padding: 20, height: 180, width: 300, }}>
                        <Label style={{ fontSize: 12, lineHeight: 12, textAlign: 'right', alignSelf: 'flex-end', padding: 5, position: 'absolute', top: 0, right: 0, borderBottomLeftRadius: 8, borderTopRightRadius: 8, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: color.primary, color: '#fff', }}>{item?.camp.date} até {item?.camp.finish}</Label>
                        <Title style={{ fontSize: 18, lineHeight: 18, marginTop: 8, }}>{item?.camp.name}</Title>
                        <Label style={{ fontSize: 12, lineHeight: 12, marginTop: 10, }}>{item?.camp?.desc.slice(0, 90)}...</Label>
                        <Row style={{ marginTop: 12, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 8, }}>
                                <Row>
                                    <MotiImage source={{ uri: item?.camp?.ong?.img }} style={{ width: 45, height: 45, borderRadius: 100, backgroundColor: '#303030', borderWidth: 0, borderColor: color.primary, }} />
                                    <Column style={{ marginLeft: 12, justifyContent: 'center', }}>
                                        <Title style={{ fontSize: 18, lineHeight: 18, }}>{item?.camp.ong.name}</Title>
                                        <Label style={{ fontSize: 12, lineHeight: 12, marginTop: 3, }}>{item?.camp.ong.desc}</Label>
                                    </Column>
                                </Row>
                            </Column>
                            <Button style={{ width: 60, height: 60, backgroundColor: color.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Campaigns') }}>
                                <Plus color='#fff' size={32} />
                            </Button>
                        </Row>

                    </Column>
                    <MotiImage source={{ uri: item?.camp?.img }} style={{ width: 300, marginRight: 24, borderRadius: 24, backgroundColor: '#303030', height: 180, }} from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0, }} />
                    <Column style={{ width: 32, }} />
                </ScrollView>
                <Pagination dots={2} scrollX={scrollX} activeIndex={activeIndex} activyColor={color.secundary} inactivyColor={color.secundary + 20} />

                <Column style={{ marginHorizontal: 24, backgroundColor: color.primary, borderRadius: 24, }}>
                    <Row style={{ marginBottom: -13, justifyContent: 'center', alignItems: 'center', marginTop: 30, zIndex: 9, }}>
                        <Ball />
                    </Row>
                    <Column style={{ backgroundColor: '#fff', marginHorizontal: 30, borderRadius: 12, paddingVertical: 28, paddingHorizontal: 20, }}>
                        <Title>Seu pedido</Title>
                        <Row style={{ alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
                            <SubLabel>Número: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.user?.id}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Data: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.date}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Pontos recebidos: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.pontos}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Rifas geradas: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.rifas}</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: -40, marginVertical: 12, }}>
                            <Ball />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                            <Ball />
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Cliente: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.user?.name}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>CPF: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.user?.cpf}</Label>
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                            <SubLabel>Status: </SubLabel>
                            <Label style={{ fontSize: 14, lineHeight: 14, color: color.secundary + 99, }}>{item?.status}</Label>
                        </Row>
                    </Column>

                    <Row style={{ marginTop: -10, zIndex: 2, marginBottom: 30, marginHorizontal: margin.h + 16, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                        <Ball />
                    </Row>
                </Column>

                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ marginVertical: 12, marginTop: 24, fontSize: 22, }}>Prêmios</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                        {item?.prizes?.map((prize) => <Column key={prize.id} style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ backgroundColor: "#FFE0F6", justifyContent: 'center', alignItems: 'center', borderRadius: 12, }}>
                                <MotiImage source={{ uri: prize?.img }} style={{ width: 64, height: 64, borderRadius: 6, }} />
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop: 6, }}>{prize.name.length > 12 ? prize?.name.slice(0, 10) + '...' : prize?.name}</SubLabel>
                        </Column>)}
                    </Row>

                    {item?.sorteados?.length > 0 &&  <>
                    <Title style={{ marginTop: 32, fontSize: 22, }}>Números sorteados</Title>
                    <FlatList
                        style={{ marginTop: 10, borderWidth: 1, borderColor: color.off, padding: 10, borderRadius: 12, }}
                        data={item?.sorteados}
                        keyExtractor={(item, index) => item.toString()}
                        renderItem={({ item, index }) => <Column>
                            <Row style={{ paddingVertical: 4, alignItems: 'center',  backgroundColor: index % 2 == 0 ? '#f1f1f1' : 'transparent', borderRadius: 6,  }}>
                                <SubLabel style={{ marginLeft: 12, }}>{index + 1}</SubLabel>
                                <Title style={{ backgroundColor: item == id ? color.blue : 'transparent', color: item == id ? '#fff' : '#000', padding: 6, borderRadius: 6, fontSize: 18, flexGrow: 1, marginLeft: 20, }}>{item}</Title>
                                {item?.winner && <SubLabel style={{ backgroundColor: color.blue, color: '#fff', padding: 6, paddingHorizontal: 12, borderRadius: 6, marginLeft: 5, fontSize: 18, }}>Ganhador</SubLabel>
                                }
                            </Row>
                        </Column>}
                    />
                    </>}


                    {winner == true && <Column style={{ marginVertical: 40, borderWidth: 1, borderColor: color.off, borderRadius: 16, padding: 12, }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Title style={{ marginTop: 12, textAlign: 'center', fontSize: 22,}}>Parabéns!</Title>
                            <Label style={{  textAlign: 'center', fontSize: 16, marginTop: 5, }}>Seu número foi premiado!</Label>
                            <Row style={{ marginVertical: 12, alignItems: 'center', marginHorizontal: 24, }}>
                                <SubLabel>{item?.user?.index}</SubLabel>
                                <Title style={{ backgroundColor: color.blue, color: '#fff', padding: 6, borderRadius: 12, borderBottomRightRadius: 0, fontSize: 18, flexGrow: 1, marginLeft: 20, }}> {item?.user?.id}</Title>
                            </Row>
                        </Column>


                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <MotiImage source={{ uri: item?.your_prize?.img }} style={{ width: 145, height: 145, borderRadius: 12, }} />
                            <SubLabel style={{ fontSize: 18, marginVertical: 6, }}>{item?.your_prize?.name}</SubLabel>
                            <Label style={{ textAlign: 'center', fontSize: 14, lineHeight: 16, color: color.secundary + 99,  marginHorizontal: 20,}}>Você será contatado em até 3 dias úteis para enviarmos seu prêmio ou entre em contato abaixo para resgatar pessoalmente</Label>
                        </Column>

                        <ButtonPR style={{ marginHorizontal: 22, marginTop: 30, }} onPress={() => { navigation.navigate('AccountFAQ') }} >
                            <LabelLI style={{ color: "#fff", }}>Resgatar pessoalmente</LabelLI>
                        </ButtonPR>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                            <Column style={{ width: 12, }} />
                            <ButtonOut style={{ borderColor: color.primary, }} onPress={() => { navigation.navigate('Campaigns') }} >
                                <LabelLI style={{ color: color.primary }}>Campanhas</LabelLI>
                            </ButtonOut>
                        </Row>
                    </Column> }


                    {winner == false && <>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40, borderWidth: 1, borderColor: color.off, borderRadius: 16, padding: 12, paddingVertical: 20, }}>
                        <Column style={{ width: 64, height: 64, borderRadius: 100, backgroundColor: color.red+20, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={32} color={color?.red}/>
                        </Column>
                        <Title style={{ marginTop: 12, textAlign:'center', fontSize: 20, lineHeight: 22, }}>Não foi dessa vez.</Title>
                        <Label style={{ textAlign: 'center', fontSize: 15, lineHeight: 16, marginTop: 6, marginBottom: 12, color: color.secundary+99, }}>Mas você pode tentar de novo! Contribua com uma campanha para ter mais chances de ganhar</Label>
                        <ButtonPR onPress={() => {navigation.navigate('Campaigns')}} >
                            <LabelPR>Campanhas</LabelPR>
                        </ButtonPR>
                    </Column>
                    </>
                    }

                    {winner == null && <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40, borderWidth: 1, borderColor: color.off, borderRadius: 16, padding: 12, paddingVertical: 20, }}>
                        <Column style={{ width: 64, height: 64, borderRadius: 100, backgroundColor: color.primary+20, justifyContent: 'center', alignItems: 'center', }}>
                            <Clock size={24} color={color?.primary}/>
                        </Column>
                        <Title style={{ marginTop: 12, textAlign:'center', fontSize: 20, lineHeight: 22, }}>A rifa solidaria está em andamento.</Title>
                        <Label style={{ textAlign: 'center', fontSize: 15, lineHeight: 16, marginTop: 6, marginBottom: 12, color: color.secundary+99, }}>Essa rifa se encerra em {item?.date}, aguarde para que o sorteio seja realizado.</Label>
                        <ButtonPR onPress={() => {navigation.navigate('Rifas')}} >
                            <LabelPR>Comprar mais</LabelPR>
                        </ButtonPR>
                    </Column>
                    }

                </Column>

                <Column style={{ height: 100, }} />
            </Scroll>
        </Main>
    )
}


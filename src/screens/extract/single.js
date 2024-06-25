import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LabelSE, SubLabel, Button, U, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Info, ClipboardPen, CircleX, KeyRound, AlarmClock, Shirt, X, Plus, ArrowRight } from 'lucide-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getSingleExtract } from '@request/extract/gets';
import { MotiImage, MotiView } from 'moti';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ExtractSingleScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const id = route?.params?.id ? route?.params?.id : 'rifa-1';
    const [item, setitem] = useState();
    const [steps, setsteps] = useState();
    const [ong, setong] = useState();
    const size = 46;
    const icon = item?.icon === 'check' ? <MaterialIcons name="check-circle" size={size} color={color.green} /> : item?.icon === 'await' ? <Info color={color.blue} size={size} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={size} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={size} /> : null;
    const cl = item?.icon === 'check' ? color.green : item?.icon === 'await' ? color.blue : item?.icon === 'uncheck' ? color.red : item?.icon === 'dimiss' ? "#303030" : color.red;
    const bg = item?.icon === 'check' ? color.green : item?.icon === 'await' ? color.blue : item?.icon === 'uncheck' ? "#fa8484" : item?.icon === 'dimiss' ? "#606060" : color.red;
    useEffect(() => {
        const fetchData = async () => {
            await getSingleExtract(id).then((res) => {
                setitem(res);
                setsteps(res.steps);
                setong(res.ong);
            });
        }
        fetchData()
    }, []);
    const disable = item?.icon === 'check' || item?.icon === 'await' ? false : item?.icon === 'uncheck' || item?.icon === 'dimiss' ? true : false;
   
    return (
        <Main style={{ backgroundColor: '#f7f7f7', }}>
            <Scroll style={{ paddingTop: 15, }}>
                <Column style={{  marginHorizontal: margin.h, borderRadius: 24,  }}>

                    <Column style={{ marginVertical: 18, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                            <Button onPress={() => {navigation.goBack()}}  style={{ backgroundColor: color.secundary, padding: 12, borderRadius: 100, }}>
                                <X color="#fff" size={24} />
                            </Button>
                            <Label style={{ color: color.secundary, fontSize: 14, textAlign: 'center', marginBottom: 5,  }}>{item?.date}{'\n'}{item?.hours ? item?.hours : '14:32'}</Label>
                        </Row>
                        
                        <MotiView from={{opacity: 0, scale: 0,}} animate={{opacity: 1, scale: 1,}} delay={200} transition={{duration: 600,}} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: bg+20, width: 102, height: 102, borderRadius: 100,  alignSelf: 'center', }}>
                            {icon}
                        </MotiView>

                        <MotiView from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0}} delay={500} >

                        <Title style={{ color: color.secundary, fontSize: 24,  textAlign: 'center', marginTop: 30, }}>{item?.type}</Title>
                        <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: color.primary, textAlign: 'center', marginTop: -6, }}>R$ {item?.value},00</Title>
                        <Label style={{ color: color.secundary, fontSize: 16, textAlign: 'center', marginBottom: -4, marginTop: 6,}}>{item?.name}</Label>
                        </MotiView>

                    </Column>

                    <MotiView from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0}} delay={700}  style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'  }}>
                        <Title style={{ fontSize: 18, textAlign: 'center', marginTop: 16, fontFamily: 'Font_Medium', }}>Status: </Title>
                        <Title style={{ fontSize: 18, textAlign: 'center', marginTop: 16, color: cl,}}><U>{item?.status}</U></Title>
                    </MotiView>
                    {steps && <Road data={steps} />}

                    <MotiView from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0}} delay={1200}  style={{ paddingVertical: 12,  }}>
                        <Button onPress={() => { navigation.navigate('ONGSingle', { item: ong, }) }} style={{ backgroundColor: '#fff', borderRadius: 16, marginBottom: 10, zIndex: 2,}} >
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Row>
                                    <Row style={{ padding: 18, }}>
                                        <Column style={{ backgroundColor: color.primary, transform: [{ rotate: '12deg', }], width: 56, height: 56, borderRadius: 8, }} />
                                        <MotiImage source={{ uri: ong?.img }} style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#fff", borderRadius: 8, objectFit: 'cover', marginLeft: -54, transform: [{ rotate: '-5deg', }], }} />
                                    </Row>
                                    <Column style={{ marginLeft: 12, justifyContent: 'center', }}>
                                        <Label style={{ fontSize: 14, marginBottom: -4, }}>ONG favorecida</Label>
                                        <Title style={{ fontSize: 18, }}>{ong?.name}</Title>
                                    </Column>
                                </Row>
                                <ArrowRight color={color.primary} size={24} style={{ marginRight: 20, }} />
                            </Row>
                        </Button>
                        <Column style={{ flexGrow: 1, borderRadius: 6, height: 26, backgroundColor: '#d7d7d750', marginTop: -24, marginHorizontal: 24, }} />
                    </MotiView>

                    <Row style={{ alignItems: 'center', marginTop: 20, justifyContent: 'center', }}>
                        <ButtonPR onPress={() => { navigation.navigate('Recibo') }} style={{ paddingVertical: 8, opacity: disable ? 0.6 : 1, }} disabled={disable}>
                            <LabelSE>Exportar recibo </LabelSE>
                        </ButtonPR>
                    </Row>

                </Column>
            </Scroll>

            <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ justifyContent: 'center', alignItems: 'center', padding: 18, backgroundColor: "#FFE0F6", borderRadius: 100, position: 'absolute', bottom: 30, right: 30, }}>
                <MaterialCommunityIcons name="qrcode-scan" size={24} color={color.primary} />
            </Button>
        </Main>
    )
}

const Road = ({ data }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const Card = ({ step1 }) => {
        if (step1 == undefined) return null;
        const cl = step1.icon == 'check' ? color.blue : step1.icon == 'uncheck' ? color.red : step1.icon == 'await' ? "#d7d7d7" : '#000000';
        return (
                <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 12, height: 12, backgroundColor: cl, borderRadius: 100, zIndex: 99, }} />
                        <Column style={{ width: 5, flexGrow: 1, backgroundColor: cl+99, borderRadius: 12, marginBottom: -5, marginTop: -5, }} />
                    </Column>

                    <Column style={{ marginLeft: 26, marginBottom: 12, marginTop: -4, }}>
                        <Title style={{ fontSize: 15, }}>{step1?.status}</Title>
                        <Label style={{ fontSize: 12, width: 190, marginTop: -4, color: color.secundary+99 }}>{step1?.label}.</Label>
                    </Column>
                </Row>
        )
    }
    return (
        <MotiView from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0}} delay={1000} transition={{type: 'timing'}} style={{paddingVertical: 24,  borderStyle: 'dashed', borderWidth: 2, borderColor: '#40404040', backgroundColor: '#fff', borderRadius: 12, marginVertical: 16, marginHorizontal: 28, paddingBottom: 20,}}>
            <Card step1={data[0]} />
            <Card step1={data[1]} />
            <Card step1={data[2]} />
        </MotiView>
    )
}


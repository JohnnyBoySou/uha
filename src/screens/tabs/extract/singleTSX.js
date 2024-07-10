import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LabelSE, SubLabel, Button, U, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Info, ClipboardPen, CircleX, KeyRound, AlarmClock, Shirt, X, Plus, ArrowRight } from 'lucide-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getSingleExtract } from '@request/extract/gets';
import { MotiImage } from 'moti';


export default function ExtractSingleScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const id = route?.params?.id ? route?.params?.id : 'rifa-1';
    const [item, setitem] = useState();
    const [steps, setsteps] = useState();
    const [ong, setong] = useState();
    const icon = item?.icon === 'check' ? <MaterialIcons name="check-circle" size={24} color={color.green} /> : item?.icon === 'await' ? <Info color={color.blue} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;
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
        <Main style={{ backgroundColor: bg, }}>
            <Scroll style={{ paddingTop: 10, }}>
                <Column style={{ width: 46, height: 46, backgroundColor: bg, borderRadius: 100, marginBottom: -24, alignSelf: 'center', zIndex: 99, }} />
                <Column style={{ backgroundColor: "#f7f7f7", marginHorizontal: margin.h, borderRadius: 24, paddingHorizontal: 32, paddingVertical: 32, }}>
                    <Column style={{ marginVertical: 18, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -20, marginBottom: 12,}}>
                            <Button onPress={() => {navigation.goBack()}}  style={{ backgroundColor: '#fff', padding: 12, borderRadius: 100, }}>
                                <X color={color.secundary} size={24} />
                            </Button>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: bg+40, width: 52, height: 52, borderRadius: 100,  alignSelf: 'center', }}>
                                {icon}
                            </Column>
                        </Row>
                        <Title style={{ color: color.primary, fontSize: 24,  textAlign: 'center' }}>{item?.type}</Title>
                        <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: color.secundary, textAlign: 'center', marginTop: -6, }}>R$ {item?.value},00</Title>
                        <Label style={{ color: color.secundary, fontSize: 16, textAlign: 'center', marginBottom: -4, marginTop: 6,}}>{item?.name}</Label>
                        <Label style={{ color: color.secundary, fontSize: 14, textAlign: 'center', marginBottom: 5,  }}>{item?.date}</Label>

                    </Column>

                    <Row style={{ marginHorizontal: - margin.h - 28, }}>
                        <Column style={{ width: 46, height: 46, backgroundColor: bg, borderRadius: 100, marginRight: -15, }} />
                        <Row style={{ flexGrow: 1, alignItems: 'center', }}>
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                        </Row>
                        <Column style={{ width: 46, height: 46, backgroundColor: bg, borderRadius: 100, marginLeft: -15, }} />
                    </Row>

                    <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Title style={{ fontSize: 22, textAlign: 'center', marginTop: 16, }}>Status: </Title>
                        <Title style={{ fontSize: 22, textAlign: 'center', marginTop: 16, color: cl,}}><U>{item?.status}</U></Title>
                    </Row>
                    {steps && <Road data={steps} />}

                    <Column style={{ paddingVertical: 12,  }}>
                        <Button onPress={() => { navigation.navigate('ONGSingle', { id: id, }) }} style={{ backgroundColor: '#d7d7d780', borderRadius: 16, marginBottom: 10,}} >
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Row>
                                    <Row style={{ padding: 12, }}>
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
                    </Column>

                    <Row style={{ marginHorizontal: - margin.h - 28, }}>
                        <Column style={{ width: 46, height: 46, backgroundColor: bg, borderRadius: 100, marginRight: -15, }} />
                        <Row style={{ flexGrow: 1, alignItems: 'center', }}>
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                            <Column style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 12, height: 8, marginHorizontal: 4, }} />
                        </Row>
                        <Column style={{ width: 46, height: 46, backgroundColor: bg, borderRadius: 100, marginLeft: -15, }} />
                    </Row>

                    <Row style={{ alignItems: 'center', marginTop: 20, justifyContent: 'center', }}>
                        <ButtonPR onPress={() => { navigation.navigate('Recibo') }} style={{ paddingVertical: 8, opacity: disable ? 0.6 : 1, }} disabled={disable}>
                            <LabelSE>Exportar recibo </LabelSE>
                        </ButtonPR>
                    </Row>

                </Column>
            </Scroll>

            <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ justifyContent: 'center', alignItems: 'center', padding: 18, backgroundColor: "#FFE0F6", borderRadius: 100, position: 'absolute', bottom: 30, right: 30, }}>
                <Plus color={color.primary} size={24} />
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
            <Column style={{ marginLeft: 32, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 12, height: 12, backgroundColor: cl, borderRadius: 100, zIndex: 99, }} />
                        <Column style={{ width: 5, flexGrow: 1, backgroundColor: cl, borderRadius: 12, }} />
                    </Column>

                    <Column style={{ marginLeft: 26, marginBottom: 12, marginTop: -6, }}>
                        <Title style={{ fontSize: 15, }}>{step1?.status}</Title>
                        <Label style={{ fontSize: 13, width: 300, marginTop: -4, }}>{step1?.label}</Label>
                    </Column>
                </Row>
            </Column>
        )
    }
    return (
        <Column style={{paddingVertical: 16, paddingLeft: 74, }}>
            <Card step1={data[0]} />
            <Card step1={data[1]} />
            <Card step1={data[2]} />
        </Column>
    )
}


import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LabelSE, SubLabel, Button, ButtonOut, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Info, ClipboardPen, CircleX, KeyRound, AlarmClock, Shirt, X, Plus } from 'lucide-react-native';
import Header from '@components/header';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getSingleExtract } from '@request/extract/gets';
import { MotiImage } from 'moti';


export default function ExtractSingleRifasScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const id = route.params.id;
    const [item, setitem] = useState();
    const [steps, setsteps] = useState();
    const [ong, setong] = useState();
    const icon = item?.icon === 'check' ? <MaterialIcons name="check-circle" size={24} color={color.blue} /> : item?.icon === 'await' ? <Info color="#fff" size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;

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


    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{ paddingTop: 15, }}>

                <Header title={item?.type} rose />

                <Column style={{ backgroundColor: color.secundary, paddingHorizontal: 32, paddingVertical: 32, borderRadius: 24, marginHorizontal: margin.h, marginVertical: 18, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <SubLabel style={{ color: "#fff", fontSize: 24, marginRight: 12, }}>Status</SubLabel>
                            {icon}
                        </Row>
                        <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: "#fff", }}>R$ {item?.value},00</Title>
                    </Row>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: -12, }}>
                        <Column style={{ backgroundColor: '#ffffff40', borderRadius: 12, padding: 12, }}>
                            <Label style={{ color: "#fff", marginBottom: 4, fontFamily: font.bold, }}>{item?.type}</Label>
                            <Label style={{ color: "#fff", fontSize: 14, }}>R$ {item?.value},00</Label>
                        </Column>
                        <Label style={{ color: "#fff", fontSize: 14, alignSelf: 'flex-end' }}>{item?.date}</Label>
                    </Row>

                </Column>

                {steps && <Road data={steps} />}

                <Column style={{ paddingVertical: 12, marginHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.navigate('ONGSingle', { id: id, }) }} >
                        <Row style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 18, marginBottom: 18, }}>

                            <Row style={{ padding: 12, }}>
                                <Column style={{ backgroundColor: color.primary, transform: [{ rotate: '12deg', }], width: 56, height: 56, borderRadius: 8, }} />
                                <MotiImage source={{ uri: ong?.img }} style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#fff", borderRadius: 8, objectFit: 'cover', marginLeft: -54, transform: [{ rotate: '-5deg', }], }} />
                            </Row>

                            <Column style={{ marginHorizontal: margin.h - 5, justifyContent: 'center', }}>
                                <Label style={{ fontSize: 14, marginBottom: -4, }}>ONG favorecida</Label>
                                <Title style={{ fontSize: 18, }}>{ong?.name}</Title>
                            </Column>
                        </Row>
                    </Button>


                    <Row style={{ alignItems: 'center', marginTop: 50, justifyContent: 'center', }}>
                        {item?.icon != 'check' || item?.icon != 'await' && <ButtonPR onPress={() => { navigation.navigate('Recibo') }} style={{ paddingVertical: 8, }}>
                            <LabelSE>Exportar recibo </LabelSE>
                        </ButtonPR>}
                    </Row>


                </Column>

            </Scroll>


            <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ justifyContent: 'center', alignItems: 'center', padding: 18, backgroundColor: "#FFE0F6", borderRadius: 100, position: 'absolute', bottom: 30, right: 30, }}>
                <Plus color={color.primary} size={24} />
            </Button>
        </Main>
    )
}

//ADD CODEREVIEW

const Road = ({ data }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const Card = ({ step1 }) => {
        if (step1 == undefined) return null;
        const cl = step1.icon == 'check' ? color.blue : step1.icon == 'uncheck' ? color.red : step1.icon == 'await' ? color.off : '#000';
        return (
            <Column>
                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 12, height: 12, backgroundColor: cl, borderRadius: 100, zIndex: 99, }} />
                        <Column style={{ width: 5, flexGrow: 1, backgroundColor: cl, borderRadius: 12, }} />
                    </Column>

                    <Column style={{ marginLeft: 32, marginVertical: 6, }}>
                        <Title style={{ fontSize: 15, }}>{step1?.status}</Title>
                        <Label style={{ fontSize: 13, width: 300, marginTop: -4, }}>{step1?.label}</Label>
                    </Column>
                </Row>
            </Column>
        )
    }
    return (
        <Column style={{ backgroundColor: '#f7f7f7', marginHorizontal: 28, borderRadius: 12, borderWidth: 2, borderColor: "#d6d6d6", borderStyle: 'dashed', paddingVertical: 16, }}>
            <Card step1={data[0]} />
            <Card step1={data[1]} />
            <Card step1={data[2]} />
        </Column>
    )




    return (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 14, }}>
            {item.step === 2 && <Column style={{ width: 4, height: 160, backgroundColor: cl, position: 'absolute', left: 4, }} />}
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Column style={{ width: 12, height: 12, backgroundColor: cl, borderRadius: 100, }} />
                <Column style={{ marginLeft: 32, }}>
                    <Title style={{ fontSize: 16, }}>{item?.status}</Title>
                    <Label style={{ fontSize: 14, width: 200, }}>{item?.label}</Label>
                </Column>
            </Row>
            <SubLabel>{item?.date}</SubLabel>
        </Row>
    )
}
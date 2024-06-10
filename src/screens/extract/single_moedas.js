import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonSE, LabelSE, SubLabel, Button, LabelLI, ButtonOut, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, ClipboardPen, CircleX, KeyRound, AlarmClock } from 'lucide-react-native';
import Header from '@components/header';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import extract_moedas from '@data/extract_moedas';


export default function ExtractSingleMoedasScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const item = extract_moedas[3];
    const user = { balance: 550, cashback: 100, }
    const icon = item?.icon === 'check' ? <MaterialIcons name="check-circle" size={24} color={color.blue} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24} /> : null;
    const road = item.road.reverse();

    return (
        <Main>
            <Scroll>

                <Header title="Movimentações" rose />

                <Column style={{ backgroundColor: color.secundary, paddingHorizontal: 32, paddingVertical: 24, borderRadius: 24, marginHorizontal: margin.h, marginVertical: 18, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <SubLabel style={{ color: "#FFF2E3", fontSize: 24, marginRight: 12, }}>Status</SubLabel>
                            {icon}
                        </Row>
                        <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: "#fff", }}>R$ {item?.value},00</Title>
                    </Row>
                    <Label style={{ color: "#FFF2E3", fontSize: 16, }}>ONG de destino: {item?.ong?.name}</Label>

                    <Label style={{ color: "#FFF2E3", marginTop: 20, marginBottom: 4, fontFamily: font.bold, }}>Nota fiscal</Label>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Label style={{ color: "#FFF2E3", fontSize: 14, }}>Valor da nota: R$ {user?.cashback},00</Label>
                        <Label style={{ color: "#FFF2E3", fontSize: 14, }}>{item.date}</Label>
                    </Row>

                </Column>

                <FlatList
                    style={{ paddingVertical: 12, marginHorizontal: margin.h, }}
                    data={road}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardRoad item={item} />}
                />

                <Column style={{ paddingVertical: 12, marginHorizontal: margin.h, }}>
                    <Row style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 18, marginBottom: 18, }}>
                        <Column style={{ padding: 24, backgroundColor: "#FFE0F6", borderRadius: 12, }}>
                            <KeyRound color={color.primary} size={32} />
                        </Column>
                        <Column style={{ marginHorizontal: margin.h - 5, justifyContent: 'center', }}>
                            <Title>Chave da nota</Title>
                            <Label style={{ width: 250,  fontSize: 16, marginTop: 4, }}>{item?.id}</Label>
                        </Column>
                    </Row>
                    <Button>
                        <Row>
                            <Column style={{ padding: 24, backgroundColor: "#FFE0F6", borderRadius: 12, }}>
                                <ClipboardPen color={color.primary} size={32} />
                            </Column>

                            <Button onPress={() => {navigation.navigate('NotafiscalSend')}} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ marginHorizontal: margin.h - 5, justifyContent: 'center', }}>
                                <Title>Nova nota</Title>
                                <Label style={{ width: 250,  fontSize: 16, marginTop: 4, }}>Cadastre uma nova nota fiscal</Label>
                            </Column>
                            </Button>
                        </Row>
                    </Button>

                    <Row style={{ alignItems: 'center', marginTop: 50, justifyContent: 'center', }}>
                        <ButtonOut onPress={() => {navigation.navigate('AccountFAQ')}}  style={{ borderColor: color.secundary, }}>
                            <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Central de ajuda</Label>
                        </ButtonOut>
                        <Column style={{ width: 16, }} />
                     
                     {item?.icon != 'check' || item?.icon != 'await' && <ButtonPR onPress={() => {navigation.navigate('Recibo')}} style={{ paddingVertical: 8, }}>
                            <LabelSE>Exportar recibo </LabelSE>
                        </ButtonPR>}
                    </Row>
                  

                </Column>

            </Scroll>
        </Main>
    )
}

//ADD CODEREVIEW

const CardRoad = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const cl = item.icon == 'check' ? color.blue : item.icon == 'uncheck' ?  color.red : color.off;
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
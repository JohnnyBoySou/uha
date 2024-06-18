import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonSE, LabelSE, SubLabel, Button, LabelLI, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { CircleCheck, Info, ClipboardPen, CircleX, KeyRound, AlarmClock } from 'lucide-react-native';
import  Header   from '@components/header';

export default function ExtractSingleScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const item = route.params.item;
    const user = {balance: 550, cashback: 100,}
    const icon = item?.icon === 'check' ? <CircleCheck color={color.blue} size={24} /> : item?.icon === 'await' ? <Info color={color.primary} size={24} /> : item?.icon === 'uncheck' ? <CircleX color={color.red} size={24} /> : item?.icon === 'dimiss' ? <AlarmClock color="#000" size={24}/> : null;

    const road = [
        {
            step: 1,
            type: 'Nota fiscal',
            date: '08/10/2024',
            status: 'Nota fiscal enviada',
            label: 'Aguardando análise',
            icon: 'check',
        },
        {
            step: 2,
            type: 'Nota fiscal',
            date: '09/10/2024',
            status: 'Cashback identificado',
            label: 'Nota fiscal válida',
            icon: 'check',
        },
        {
            step: 3,
            type: 'Nota fiscal',
            date: '09/10/2024',
            status: 'Cashback confirmado',
            label: 'Você recebeu suas Pontos',
            icon: 'check',
        },
    ]

    return (
        <Main>
        <Scroll style={{ paddingTop: 15, }}>

            <Header title="Detalhes" />
           
            <Column style={{backgroundColor: color.secundary, paddingHorizontal: 32, paddingVertical: 24, borderRadius: 24, marginHorizontal: margin.h, marginVertical: 18, }}>
               <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
              
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                    <SubLabel style={{  color: "#fff", fontSize: 24, marginRight: 12, }}>Status</SubLabel>
                    {icon}
                </Row>
              
                <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: "#fff", }}>R$ {item?.value}</Title>
               </Row>

                <Label style={{ color: "#fff", marginTop: 12, marginBottom: 4, fontFamily: font.bold, }}>Nota fiscal</Label>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                    <Label style={{color: "#ffffff90", }}>Valor da nota: R$ {user?.cashback},00</Label>
                    <Label style={{color: "#ffffff90", }}>{item.date}</Label>
                </Row>
               
            </Column>

            <Column style={{  paddingVertical: 12, marginHorizontal: margin.h, }}>
                <FlatList
                    data={road.reverse()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardRoad item={item} />}
                />
            </Column>

            <Column style={{  paddingVertical: 12, marginHorizontal: margin.h,  }}>
                <Row style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 18, marginBottom: 18, }}>
                    <Column style={{ padding: 24, backgroundColor: color.primary+20, borderRadius: 12, }}>
                        <KeyRound color={color.primary} size={32} />
                    </Column>
                    <Column style={{ marginHorizontal: margin.h - 5, justifyContent: 'center', }}>
                        <Title>Chave da nota</Title>
                        <SubLabel style={{ width: 250, opacity: .7, }}>{item?.id}</SubLabel>
                    </Column>
                </Row>
                <Button>
                    <Row>
                        <Column style={{ padding: 24, backgroundColor: color.primary+20, borderRadius: 12, }}>
                            <ClipboardPen  color={color.primary} size={32}/>
                        </Column>
                        <Column style={{ marginHorizontal: margin.h - 5, justifyContent: 'center', }}>
                            <Title>Nova nota</Title>
                            <SubLabel style={{ width: 250, opacity: .7, }}>Cadastre uma nova nota fiscal</SubLabel>
                        </Column>
                    </Row>
                </Button>

                <Row style={{  alignItems: 'center', marginTop: 50, justifyContent: 'center', }}>
                    <ButtonOut style={{ borderColor: color.secundary, }}>
                        <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Central de ajuda</Label>
                    </ButtonOut>
                    <Column style={{ width: 16, }} />
                    <ButtonSE>
                        <LabelSE>Exportar recibo</LabelSE>
                    </ButtonSE>
                </Row>
                <ButtonOut style={{ borderColor: color.green, marginTop: 18, marginBottom: 50, marginHorizontal: margin.h, }}>
                    <LabelLI style={{ color: color.green, }}>Informações da campanha</LabelLI>
                </ButtonOut>

            </Column>

        </Scroll>
    </Main>
    )
}

//ADD CODEREVIEW

const CardRoad = ({item}) => {
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  marginVertical: 14, }}>
            {item.step === 2 && <Column style={{ width: 4, height: 160, backgroundColor: color.blue, position: 'absolute', left: 4,}} />}
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Column style={{width: 12, height: 12, backgroundColor: color.blue, borderRadius: 100,  }} />
                <Column style={{ marginLeft: 32, }}>
                    <Title style={{ fontSize: 18, }}>{item?.status}</Title>
                    <Label style={{ fontSize: 16, }}>{item?.label}</Label>
                </Column>
            </Row>
            <SubLabel>{item?.date}</SubLabel>
        </Row>
    )}
import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList } from 'react-native';
export default function CampaignsRifasScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);


    const [user, setUser] = useState({id: '0987654321234567890', index: 11 + 1, winner: true,})

    return (
        <Main>
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color={color.secundary} />
                    </Button>
                    <Column >
                    </Column>
                    <Button onPress={() => {setUser({id: '0987654321234567890', index: 11 + 1, winner: false,})}}  style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Info color="#111" size={32} />
                    </Button>
                </Row>

                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Label>Campanha</Label>
                    <Title style={{ fontSize: 32, lineHeight: 38, }}>Rifas da sorte</Title>
                    <MotiImage style={{ flexGrow: 1, borderRadius: 24, backgroundColor: '#303030', height: 180, marginVertical: 24, }} from={{opacity: 0, translateY: -20,}} animate={{opacity: 1, translateY: 0,}}/>
                </Column>


                <Column style={{ marginHorizontal: margin.h, }}>
                    <Title>Seu pedido</Title>
                    <Row style={{  alignItems: 'center', marginTop: 12, }}>
                        <SubLabel>Número: </SubLabel> 
                        <Label>{user?.id}</Label>
                    </Row>
                    <Row style={{  alignItems: 'center',  }}>
                        <SubLabel>Data: </SubLabel> 
                        <Label>10/10/2024</Label>
                    </Row>
                    <Row style={{  alignItems: 'center',  }}>
                        <SubLabel>Horário: </SubLabel> 
                        <Label>12:00</Label>
                    </Row>
                    <Row style={{  alignItems: 'center',  }}>
                        <SubLabel>Valor em Pontos: </SubLabel> 
                        <Label>225</Label>
                    </Row>
                    <Row style={{  alignItems: 'center',  }}>
                        <SubLabel>Cliente: </SubLabel> 
                        <Label>Nome do Cliente</Label>
                    </Row>
                    <Row style={{  alignItems: 'center',  }}>
                        <SubLabel>CPF: </SubLabel> 
                        <Label>123.456.789-01</Label>
                    </Row>
                    <Row style={{  alignItems: 'center',  }}>
                        <SubLabel>Status: </SubLabel> 
                        <Label>Concluído</Label>
                    </Row>

                    <Title style={{ marginVertical: 12, marginTop: 24, }}>Prêmios: </Title> 
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ backgroundColor:"#FFE0F6", justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, }}>
                                <MotiImage style={{ width: 45, height: 45, backgroundColor: "#303030" , borderRadius: 12,}}/>
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop:6,}}>Bola de vôlei</SubLabel> 
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ backgroundColor:"#FFE0F6", justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, }}>
                                <MotiImage style={{ width: 45, height: 45, backgroundColor: "#303030" , borderRadius: 12,}}/>
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop:6,}}>Fone Bluetooh</SubLabel> 
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ backgroundColor:"#FFE0F6", justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, }}>
                                <MotiImage style={{ width: 45, height: 45, backgroundColor: "#303030" , borderRadius: 12,}}/>
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop:6,}}>Ipad</SubLabel> 
                        </Column>

                        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Column style={{ backgroundColor:"#FFE0F6", justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, }}>
                                <MotiImage style={{ width: 45, height: 45, backgroundColor: "#303030" , borderRadius: 12,}}/>
                            </Column>
                            <SubLabel style={{ fontSize: 12, marginTop:6,}}>JBL</SubLabel> 
                        </Column>
                    </Row>

                    <Title style={{  marginTop: 32, }}>Números da sorte </Title> 
                    <FlatList
                            style={{  marginTop: 10, }}
                            data={rifas}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index}) => <Column>
                            <Row style={{  marginVertical: 5, alignItems: 'center',  }}>
                            <SubLabel>{index+1}</SubLabel>
                            <Title style={{ backgroundColor: item.winner ? color.blue : "#fff", color: item?.winner ? '#fff' : '#000', padding: 6, borderRadius: 6, fontSize: 18, flexGrow: 1, marginLeft: 20,}}> {item?.id}</Title>
                            {item.winner && <SubLabel style={{ backgroundColor: color.blue, color: '#fff', padding: 6, paddingHorizontal: 12, borderRadius: 6, marginLeft: 5, fontSize: 18, }}>Ganhador</SubLabel>
                            } 
                            </Row>
                            </Column>}
                        />



             {user?.winner ?  <>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40, }}>
                        <Title style={{ marginVertical: 12, }}>Parabéns! </Title> 
                        <Label>Seu número foi premiado</Label>

                        <Row style={{  marginVertical: 5, alignItems: 'center',  }}>
                            <SubLabel>{user?.index}</SubLabel>
                            <Title style={{ backgroundColor: color.blue , color:'#fff', padding: 6, borderRadius: 12, borderBottomRightRadius: 0, fontSize: 18, flexGrow: 1, marginLeft: 20,}}> {user?.id}</Title>
                            <SubLabel style={{ backgroundColor: color.blue, color: '#fff', padding: 6, paddingHorizontal: 12, borderRadius: 12, borderBottomLeftRadius: 0, marginLeft: 5, fontSize: 18, }}>Ganhador</SubLabel>
                            </Row>
                    </Column>


                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ backgroundColor:"#FFE0F6", justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12, }}>
                            <MotiImage style={{ width: 145, height: 145, backgroundColor: "#303030" , borderRadius: 12,}}/>
                        </Column>
                        <SubLabel style={{ fontSize: 18, marginVertical: 6, }}>JBL</SubLabel> 
                        <Label style={{ textAlign: 'center', }}>Você será contatado em até 3 dias úteis para enviarmos seu prêmio ou entre em contato abaixo para resgatar pessoalmente</Label>
                   
                   
                   
                    </Column>
                    <ButtonPR style={{ paddingHorizontal: 24, marginTop: 30, }} onPress={() => {navigation.navigate('BuyServiceSuccess')}} >
                        <LabelLI style={{ color: "#fff", }}>Resgatar pessoalmente</LabelLI>  
                    </ButtonPR>
                    <Row style={{  justifyContent: 'center', alignItems: 'center',  marginVertical: 12,   }}>
                    <ButtonOut style={{ borderColor: "#000", }} onPress={() => {navigation.navigate('BuyServiceError')}} >
                            <LabelLI style={{ color: "#000" }}>Central de ajuda</LabelLI>
                        </ButtonOut>
                        <Column style={{width: 12, }} />
                        <ButtonOut style={{ borderColor: color.primary, }} onPress={() => {navigation.navigate('BuyServiceError')}} >
                            <LabelLI style={{ color: color.primary }}>Nova campanha</LabelLI>
                        </ButtonOut>
                    </Row>
                </> : 
                
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40, }}>
                        <Title>Não foi dessa vez</Title>
                        <Label>Mas você pode tentar de novo!</Label>
                        <ButtonOut style={{ borderColor: color.primary, marginVertical: 20, }} onPress={() => {navigation.navigate('BuyServiceError')}} >
                            <LabelLI style={{ color: color.primary }}>Nova campanha</LabelLI>
                        </ButtonOut>
                    </Column>
                }


                </Column>
            </Scroll>
        </Main>
    )
}


const rifas = [
    {
        id: '0987654321234567890',
        winner: false,
    },
    {
        id: '0987654321234567891',
        winner: false,
    },
    {
        id: '0987654321234567892',
        winner: false,
    },
    {
        id: '0987654321234567893',
        winner: false,
    },
    {
        id: '0987654321234567894',
        winner: false,
    },
    {
        id: '0987654321234567895',
        winner: false,
    },
    {
        id: '0987654321234567896',
        winner: false,
    },
    {
        id: '0987654321234567897',
        winner: false,
    },
    {
        id: '0987654321234567898',
        winner: false,
    },
    {
        id: '0987654321234567899',
        winner: false,
    },
    {
        id: '0987654321234567890',
        winner: false,
    },
    {
        id: '0987654321234567891',
        winner: true,
    },
    {
        id: '0987654321234567892',
        winner: false,
    },
    {
        id: '0987654321234567893',
        winner: false,
    },
    {
        id: '0987654321234567894',
        winner: false,
    },
   
   
]
import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info , Infinity } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList } from 'react-native';
export default function CampaignsScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [user, setUser] = useState({id: '0987654321234567890', index: 11 + 1, winner: true,})
    const list = [{img: require("@imgs/camp1.png")}, {img: require("@imgs/camp2.png")}]
    return (
        <Main >
            <Scroll style={{ paddingTop: 0,  }}>
                <Column style={{ paddingHorizontal:42, paddingTop: 30,  backgroundColor: color.secundary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32,}}>
                <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                <ArrowLeft color={color.secundary}/>
            </Button>
                  
                    <Title style={{ fontSize: 24, lineHeight: 24, color: color.text, marginTop: 32, }}>Campanhas do momento</Title>
                    <Label style={{ color: color.text, marginTop: 10, }}>Participe das novas campanhas todos os meses e concorra a diversos prêmios em produtos, serviços e bônus relâmpago!</Label>
                    <MotiImage source={require('@imgs/campaigns.png')} style={{borderRadius: 24, height: 190, marginHorizontal: - margin.h, marginTop: -24, alignSelf: 'center', objectFit:'contain' }} from={{opacity: 0, }} animate={{opacity: 1, }}/>
                </Column>

                <Title style={{ marginHorizontal: margin.h, marginTop: 32,  }}>Ofertas selecionadas</Title>

                <FlatList
                    style={{ marginTop: 12, }}
                    data={list}
                    horizontal
                    ListHeaderComponent={<Column style={{ width: margin.h, }}/>}
                    ListFooterComponent={<Column style={{ width: margin.h, }}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => <MotiImage source={item.img} style={{ width: 280, height: 140, borderRadius: 24, marginRight: 12, }}/>}
                />



                <Column style={{ marginHorizontal: margin.h, }}>
                   
                    <Title style={{ marginTop: 32, marginBottom: 8, }}>Indique e ganhe até 1000 pontos</Title>
                    <Label>Bônus extra para você e seus amigos ao realizar a primeira doação ou cadastrar 20 notas fiscais</Label>
                    <ButtonOut onPress={() => {navigation.navigate('Share')}} style={{ borderColor: '#000', alignSelf: 'flex-start', paddingVertical: 5, opacity:0.5, marginTop: 12, marginBottom: 40, }}>
                        <LabelLI>Saiba mais</LabelLI>
                    </ButtonOut>

                    <Button onPress={() => {navigation.navigate('DonateHide')}} > 
                        <MotiImage source={require("@imgs/doe1.png")} style={{ width: '100%', alignSelf: 'center', height: 180, borderRadius: 32,  backgroundColor: "#f7f7f7",  }} />
                    </Button>
                    <Button onPress={() => {navigation.navigate('DonateHide')}} > 
                        <MotiImage source={require("@imgs/doe2.png")} style={{ width: '100%', alignSelf: 'center', height: 180, borderRadius: 32, marginTop: 18, backgroundColor: "#f7f7f7",  }} />
                    </Button>


                    <Title style={{  marginTop: 32, textAlign: 'center',    }}>São mais de</Title> 
                   <Row style={{ justifyContent: 'center', marginTop: 20,  }}>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center',  marginRight: 10, }}>
                        <Title style={{ color: '#fff', fontSize: 26, lineHeight: 28,}}>30</Title>
                        <Label style={{ color: '#fff', fontSize: 12, lineHeight: 14, }}>Lojas {'\n'}parceiras</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 10,  }}>
                        <Title style={{ color: '#fff', fontSize: 26, lineHeight: 28,}}>170</Title>
                        <Label style={{ color: '#fff', fontSize: 12, lineHeight: 14,}}>Serviços {'\n'}disponíveis</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 10,  }}>
                        <Title style={{ color: '#fff', fontSize: 26, lineHeight: 28,}}>12 mil</Title>
                        <Label style={{ color: '#fff', fontSize: 12, lineHeight: 14,}}>Bichinos sendo {'\n'}ajudados por dia</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center',  alignItems: 'center',   }}>
                        <Infinity size={42} color="#fff" style={{ textAlign: 'center' }} />
                        <Label style={{ color: '#fff', fontSize: 12, }}>Gratidão</Label>
                    </Column>
                   </Row>

                <Column style={{ marginVertical: margin.v+20, }}>
                    <Title style={{ marginBottom: 8, }}>Concorra à prêmios incríveis</Title>
                    <Label>Todos os meses diversos serviços, produtos e vales são sorteados pelas rifas e você pode ser o ganhador desse mês!</Label>
               
                    <Row style={{ marginVertical: 20, alignSelf: 'center', alignItems: 'center',  }}>
                        <Column>
                            <MotiImage source={require('@imgs/prod1.png')} style={{ width: 180, height: 180, backgroundColor: "#f7f7f7", borderRadius: 16,}}/>
                            <MotiImage source={require('@imgs/prod3.png')} style={{ width: 180, height: 100, backgroundColor: "#f7f7f7", borderRadius: 16, marginTop: 20,}}/>
                        </Column>
                        <Column style={{ marginLeft: 20, }}>
                            <MotiImage source={require('@imgs/prod2.png')} style={{ width: 180, height: 298, backgroundColor: "#f7f7f7", borderRadius: 16,}}/>
                        </Column>
                    </Row>

                    <MotiImage source={require('@imgs/prod4.png')} style={{ width: 374, alignSelf: 'center', height: 180, borderRadius: 18,   backgroundColor: "#f7f7f7",  }} />

                </Column>

                <Column style={{ marginVertical: margin.v, }}>
                    <Title style={{ marginBottom: 8, }}>Ganhe mais pontos</Title>
                    <Label>Faça doações ou cadastre notas fiscais para receber pontos e trocá-los por serviços ou produtos nos estabelecimentos parceiros</Label>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                        <ButtonOut onPress={() => {navigation.navigate('NotafiscalSend')}}  style={{ borderColor: '#000', paddingVertical: 6, flexGrow: 1,}}>
                            <LabelLI>Nota fiscal</LabelLI>
                        </ButtonOut>
                        <Column style={{width: 12, }} />
                        <ButtonPR onPress={() => {navigation.navigate('Donate')}} style={{ flexGrow: 2,  paddingVertical: 8, }}>
                            <LabelLI style={{ color: '#fff', }}>Doação</LabelLI>
                        </ButtonPR>
                    </Row>
                </Column>


                <FlatList
                        style={{ marginVertical: 12, marginHorizontal: - margin.h, }}
                        data={campanhas}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item}) => (
                            <Button key={item.id} style={{ backgroundColor: "#fff", borderRadius: 24,  marginRight: 12, }} onPress={() => {navigation.navigate('Shop')}}>
                                <Column>
                                    <MotiImage source={ item?.img } style={{ width: 300, height: 400, borderRadius: 24,  }} />
                                    <Column style={{ backgroundColor: '#fff', marginHorizontal: 24, padding: 12, borderRadius: 24, position: 'absolute', bottom: 20, }}>
                                        <Title style={{ textAlign: 'center', marginTop: 6, }}>{item.title}</Title>
                                        <Label style={{ textAlign: 'center', marginTop: 12, color: color.title, fontFamily: font.medium, fontSize: 16, marginBottom: 12, }}>{item.label}</Label>
                                        <Title style={{ backgroundColor: color.primary, borderRadius: 100, fontSize: 12, paddingVertical: 4, paddingHorizontal: 12, textAlign: 'center', alignSelf: 'center', color: '#fff', }}>Ver estabelecimentos parceiros</Title>
                                    </Column>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />            
                    <Column style={{ height: 50, }} />
                </Column>
            </Scroll>
        </Main>
    )
}

const campanhas = [
    {
        id: 1,
        title: 'Troque Pontos por serviços ou produtos',
        label: 'Acumule Pontos através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
        img: require('@imgs/dog1.png'),
    },
    {
        id: 2,
        title: 'Troque Pontos por serviços ou produtos',
        label: 'Acumule Pontos através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
        img: require('@imgs/dog2.png'),
    },
     
]
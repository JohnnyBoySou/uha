import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info , Infinity } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList } from 'react-native';
export default function CampaignsScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);

    const [user, setUser] = useState({id: '0987654321234567890', index: 11 + 1, winner: true,})
    const list = [1, 2, 3, 4, 5]
    return (
        <Main style={{ paddingTop: 0,  }}>
            <Scroll>
                <Column style={{ paddingHorizontal: 52, paddingTop: 40,  backgroundColor: color.secundary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32,}}>
                    <Title style={{ fontSize: 24, lineHeight: 24, color: color.text, marginTop: 32, }}>Campanhas do momento</Title>
                    <Label style={{ color: color.text, marginTop: 10, }}>Participe das novas campanhas todos os meses e concorra a diversos prêmios em produtos, serviços e bônus relâmpago!</Label>
                    <MotiImage style={{ flexGrow: 1, borderRadius: 24, backgroundColor: '#f7f7f7', height: 180, marginTop: 24, }} from={{opacity: 0, translateY: -20,}} animate={{opacity: 1, translateY: 0,}}/>
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
                    renderItem={({ item, index}) => <MotiImage style={{ width: 280, height: 140, borderRadius: 24, marginRight: 12, backgroundColor: "#f7f7f7", }}/>}
                />



                <Column style={{ marginHorizontal: margin.h, }}>
                   
                    <Title style={{ marginTop: 32, marginBottom: 8, }}>Indique e ganhe até 1000 pontos</Title>
                    <Label>Bônus extra para você e seus amigos ao realizar a primeira doação ou cadastrar 20 notas fiscais</Label>
                    <ButtonOut style={{ borderColor: '#000', alignSelf: 'flex-start', paddingVertical: 5, opacity:0.5, marginTop: 12, marginBottom: 40, }}>
                        <LabelLI>Saiba mais</LabelLI>
                    </ButtonOut>

                    <MotiImage style={{ width: '100%', alignSelf: 'center', height: 180, borderRadius: 32,  backgroundColor: "#f7f7f7",  }} />
                    <MotiImage style={{ width: '100%', alignSelf: 'center', height: 180, borderRadius: 32, marginTop: 18, backgroundColor: "#f7f7f7",  }} />


                    <Title style={{  marginTop: 32, textAlign: 'center',    }}>São mais de</Title> 
                   <Row style={{ justifyContent: 'center', marginTop: 20,  }}>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center',  marginRight: 10, }}>
                        <Title style={{ color: '#fff', fontSize: 32, lineHeight: 34,}}>30</Title>
                        <Label style={{ color: '#fff', fontSize: 14, }}>Lojas {'\n'}parceiras</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 10,  }}>
                        <Title style={{ color: '#fff', fontSize: 32, lineHeight: 34,}}>170</Title>
                        <Label style={{ color: '#fff', fontSize: 14, }}>Serviços {'\n'}disponíveis</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 10,  }}>
                        <Title style={{ color: '#fff', fontSize: 32, lineHeight: 34,}}>12 mil</Title>
                        <Label style={{ color: '#fff', fontSize: 14, }}>Bichinos sendo {'\n'}ajudados por dia</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center',  alignItems: 'center',   }}>
                        <Infinity size={42} color="#fff" style={{ textAlign: 'center' }} />
                        <Label style={{ color: '#fff', fontSize: 14, }}>Gratidão</Label>
                    </Column>
                   </Row>

                <Column style={{ marginVertical: margin.v+20, }}>
                    <Title style={{ marginBottom: 8, }}>Concorra à prêmios incríveis</Title>
                    <Label>Todos os meses diversos serviços, produtos e vales são sorteados pelas rifas e você pode ser o ganhador desse mês!</Label>
               
                    <Row style={{ marginVertical: 20, alignSelf: 'center', alignItems: 'center',  }}>
                        <Column>
                            <MotiImage style={{ width: 180, height: 180, backgroundColor: "#f7f7f7", borderRadius: 24,}}/>
                            <MotiImage style={{ width: 180, height: 100, backgroundColor: "#f7f7f7", borderRadius: 24, marginTop: 20,}}/>
                        </Column>
                        <Column style={{ marginLeft: 20, }}>
                            <MotiImage style={{ width: 180, height: 298, backgroundColor: "#f7f7f7", borderRadius: 24,}}/>
                        </Column>
                    </Row>

                    <MotiImage style={{ width: 374, alignSelf: 'center', height: 180, borderRadius: 24,   backgroundColor: "#f7f7f7",  }} />

                </Column>

                <Column style={{ marginVertical: margin.v, }}>
                    <Title style={{ marginBottom: 8, }}>Ganhe mais pontos</Title>
                    <Label>Faça doações ou cadastre notas fiscais para receber pontos e trocá-los por serviços ou produtos nos estabelecimentos parceiros</Label>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                        <ButtonOut style={{ borderColor: '#000', paddingVertical: 6, flexGrow: 1,}}>
                            <LabelLI>Nota fiscal</LabelLI>
                        </ButtonOut>
                        <Column style={{width: 12, }} />
                        <ButtonPR style={{ flexGrow: 2,  paddingVertical: 8, }}>
                            <LabelLI style={{ color: '#fff', }}>Doação</LabelLI>
                        </ButtonPR>
                    </Row>
                </Column>


                <FlatList
                        style={{ marginVertical: 12, marginBottom: 50, marginHorizontal: - margin.h, }}
                        data={campanhas}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item}) => (
                            <Button style={{ backgroundColor: "#fff", borderRadius: 24,  marginRight: 12, }}>
                                <Column>
                                    <MotiImage source={{uri: item.img}} style={{ width: 300, height: 400, borderRadius: 24,  }} />
                                    <Column style={{ backgroundColor: '#fff', marginHorizontal: 24, padding: 12, borderRadius: 24, position: 'absolute', bottom: 20, }}>
                                        <Title style={{ textAlign: 'center', marginTop: 6, }}>{item.title}</Title>
                                        <Label style={{ textAlign: 'center', marginTop: 12, color: color.title, fontFamily: font.medium, fontSize: 16, marginBottom: 12, }}>{item.label}</Label>
                                    </Column>
                                </Column>
                            </Button>
                        )}
                        keyExtractor={item => item.id}
                    />     

                </Column>
            </Scroll>
        </Main>
    )
}

const campanhas = [
    {
        id: 1,
        title: 'Troque UhaCoins por serviços ou produtos',
        label: 'Acumule UhaCoins através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
        img: 'https://s3-alpha-sig.figma.com/img/5434/cab6/b4252e09af75aa2c6a770207a05e73e2?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pEjGmMV~nMRsGN1ifAc1Q5BpNd1MolpTMMu9QsZzk9isEd8yRQP5Uoka0tcU2JMWbLCbHe891vrGUTmKPUh7mJOL1L-bus0bw6HpX-rfPuo64cnHlZlw1XVduEzeCaTu4err0pkDu4f8lp-ESa0rDz6aAk9MSBm0Frq~sIM~IBWzmBPhDohbq04YnYFNB~IydaDcyR1yhP0~TuWkFquEfTdVx76VwgJv00cyG8BAU7Jm-K2TEOT8G1ghSp4vxUjyJw2y3QbCApbJTAEinlO2t5dwZIrZPtrrBxP7mbf6~hnac1ykdbWmEGaWD4UqkY3TBqdlRXvBHZba4zcaIdNjmg__',
    },
    {
        id: 2,
        title: 'Troque UhaCoins por serviços ou produtos',
        label: 'Acumule UhaCoins através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
        img: 'https://s3-alpha-sig.figma.com/img/cd97/5f11/248b1d913a7ba72e095ee6c4be8f8b89?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oeFbAPQO5QRtjZ~UqFLXaaxFL7aIs0ztuihHJuYRHddCTiXTLkcQ5F0c-MIl79Czc0N-jQM6YwelJ1GimC7zSWDdgSF3XQg0RLF4-IRiHqsSEl-ikLJXM8fsMCgGc6kIHvviNDtT4P21S5gBBl94A23q0osyduNe-3Cfsb6~f-BG4fVqm4CFNmn~Lom-nzOkUGm3MuFts5~ZyWMfRql26o6q8-a9cfrh2E72lnAr3McTV1~OKa~F35sXJeGbE9BMNPL5S4jae1aJjAt2S6iFcJgXnO7DVt8H-ofet~PCbWRTy~URVUwH0wq-GBcDKghxe3QZ9jZkhBCdugljKFOWkw__',
    },
     
]
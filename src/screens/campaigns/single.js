import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info , Infinity } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList } from 'react-native';
import Header from '@components/header';
import { getCampaignSingle } from '@request/campaigns';

export default function CampaignsSingleScreen({ navigation, route }) {
    const { color, font, margin, } = useContext(ThemeContext);

    const id = route.params?.id ? route.params?.id : 'camp-1';
    const [item, setitem] = useState();
    const a = false;


    useEffect(() => {
        const fecthData = () => {
            getCampaignSingle(id).then((res) => {
                setitem(res);
            })
        }
        fecthData();
    },[])



    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{ paddingTop: 20,  }}>
                <Header rose title="Detalhes" />  

                <Column style={{ marginHorizontal: margin.h, }}>
                    <SubLabel style={{  marginTop: 12, fontFamily: 'Font_Medium' }}>{item?.status}</SubLabel>
                    <Title style={{ marginTop: 6,  }}>{item?.name}</Title>
                    <Label style={{ fontSize: 12, marginBottom: 10,  }}>De {item?.date} até {item?.finish}</Label>
                </Column>

                <FlatList
                    style={{ marginTop: 12, }}
                    data={item?.banners}
                    horizontal
                    pagingEnabled
                    snapToOffsets={[0, 300, 600]}
                    ListHeaderComponent={<Column style={{ width: margin.h, }}/>}
                    ListFooterComponent={<Column style={{ width: margin.h, }}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => <MotiImage source={{uri: item}} style={{ width: 280, height: 320, borderRadius: 24, marginRight: 12, }}/>}
                />

                <Column style={{ marginHorizontal: margin.h, }}>
                   
                    <Title style={{ marginTop: 32, marginBottom: 8, fontSize: 22, }}>Conheça a campanha</Title>
                    <Label style={{ fontSize: 16, lineHeight: 18, }}>{item?.about}</Label>
                    
                    <Title style={{ marginTop: 32, marginBottom: 8, fontSize: 22, }}>Como participar</Title>
                    <Label style={{ fontSize: 15, lineHeight: 18, }}>{item?.how}</Label>
                    
                    
                    <Button onPress={() => {navigation.navigate('RifasBuy', { id: item.id, camp: item})}} style={{ borderRadius: 8, marginTop: 24, backgroundColor: color.primary, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                        <Label style={{ fontFamily: font.bold, color: "#fff", textAlign: 'center', }}>Comprar números</Label>
                    </Button>
                    <Button onPress={() => {navigation.navigate('Rifas', { type: 'Cashback'})}}  style={{ borderRadius: 8, borderColor: color.secundary, borderWidth: 2, marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                        <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Acompanhar número</Label>
                    </Button>
                 

                <Column style={{  }}>
                    <Title style={{ marginBottom: 8, fontSize: 22, }}>Quem essa campanha beneficia?</Title>
                    <Label style={{ fontSize: 16, lineHeight: 18, }}>{item?.what}</Label>

                    {item?.video?.length > 0 && <MotiImage source={require('@imgs/video.png')}  style={{ objectFit: 'contain', alignSelf: 'center', marginVertical: 12, }}/>}



                    {a && <Column>
                    <Title style={{ fontSize: 16, backgroundColor: color.secundary, color: "#fff", paddingVertical: 8, marginBottom: 12, paddingHorizontal: 16, borderRadius: 100, alignSelf: 'flex-start',  }}>Canil Rio Grande da Serra</Title>
                    <SubLabel>“Me faltam palavras para descrever todo o horror que presenciei”</SubLabel>
                    <Row style={{ marginVertical: 20, alignSelf: 'center', alignItems: 'center',  }}>
                        <Column>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                                <MotiImage source={require('@imgs/canil1.png')} style={{   objectFit: 'contain',  }}/>
                                <MotiImage source={require('@imgs/canil2.png')} style={{  objectFit: 'contain',  }}/>
                            </Row>
                            <MotiImage source={require('@imgs/canil5.png')} style={{  objectFit: 'contain',  }}/>
                        </Column>
                        <Column style={{ marginLeft: 12, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                                <MotiImage source={require('@imgs/canil3.png')} style={{  objectFit: 'contain',  }}/>
                                <MotiImage source={require('@imgs/canil4.png')} style={{  objectFit: 'contain',  }}/>
                            </Row>
                            <MotiImage source={require('@imgs/canil6.png')} style={{ objectFit: 'contain', }}/>
                        </Column>
                    </Row>
                    </Column>}


                </Column>

                  


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
        img: require('@imgs/current.png'),
    },
    {
        id: 2,
        title: 'Troque Pontos por serviços ou produtos',
        label: 'Acumule Pontos através de doações em dinheiro ou notas fiscais e troque por produtos ou serviços em estabelecimentos parceiros do Instituto Caramelo',
        img: require('@imgs/current.png'),
    },
     
]
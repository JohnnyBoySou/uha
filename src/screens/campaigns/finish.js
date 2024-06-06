import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info , Infinity } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList } from 'react-native';
import Header from '@components/header';
export default function CampaignsSingleFinishScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [user, setUser] = useState({id: '0987654321234567890', index: 11 + 1, winner: true,})
    const list = [{img: require("@imgs/current.png")}, {img: require("@imgs/current.png")}]
    return (
        <Main >
            <Scroll style={{ paddingTop: 20,  }}>
                <Header />  

                <Column style={{ marginHorizontal: margin.h, }}>
                    <SubLabel style={{  marginTop: 12, fontFamily: 'Font_Medium' }}>Campanha em andamento</SubLabel>
                    <Title style={{ marginTop: 6,  }}>Canil Rio Grande da Serra</Title>
                    <Label style={{ fontSize: 12, marginBottom: 10,  }}>Data 10/10/2024 até 01/12/2024</Label>
                </Column>

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
                    <Title style={{ marginTop: 32, marginBottom: 8, fontSize: 22, }}>Conheça a campanha</Title>
                    <Label style={{ fontSize: 16, lineHeight: 18, }}>Foram mais de 135 animais resgatados do canil onde sofriam maus tratos, todos devem receber cuidados adequados. Responsável pelo canil segue liberada.</Label>
                    
                    <Title style={{ marginTop: 32, marginBottom: 8, fontSize: 22, }}>Quem essa campanha beneficiou?</Title>
                    <Label style={{ fontSize: 15, lineHeight: 18, }}>A ONG recebeu uma denúncia de que oscachorros eram espancados. Os cães estavam amontoados em um canil certificado que funcionava em uma casa de alto padrão. Sem banho, tinham fezes grudadas nos pelos. Foram encontrados 9 corpos de filhotes no lixo. Os animais foram levados todos para a ONG.</Label>
                    
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
                    
                    <Button onPress={() => {navigation.navigate('Campaigns', )}}  style={{ borderRadius: 100, marginTop: 24, borderColor: color.secundary, borderWidth: 2, marginBottom: 32, paddingVertical: 16, paddingHorizontal: 20, marginVertical: 6,  }}>
                        <Label style={{ fontFamily: font.bold, color: color.secundary, textAlign: 'center', }}>Conferir nova campanha</Label>
                    </Button>


           
                  


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
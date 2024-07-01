import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut, ButtonLI, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info, Infinity } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Avatar from '@components/avatar';
import { getCampaigns, getOffers } from '@request/service';
import Header from '@components/header';

export default function CampaignsScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const list = [{ img: require("@imgs/camp1.png") }, { img: require("@imgs/camp2.png") }]


    useEffect(() => {
        const fetchData = () => {
            getOffers().then((res) => {
                setoffers(res);
            });
            getCampaigns().then((res) => {
                setcampaigns(res);
            });
        }
        fetchData()
    }, [])



    const [offers, setoffers] = useState();
    const [campaigns, setcampaigns] = useState();

    return (
        <Main style={{  }}>
            <Scroll style={{ paddingTop: 0, }}>
                <Column style={{ paddingHorizontal: 0, paddingTop: 40, backgroundColor: color.secundary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, }}>
                    <Header />
                    <Column style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ fontSize: 22, lineHeight: 24, color: color.text, marginTop: 32, }}>Campanhas do momento</Title>
                    <Label style={{ color: color.text, marginTop: 10, fontSize: 16, lineHeight: 18, }}>Participe das novas campanhas todos os meses e concorra a diversos prêmios em produtos, serviços e bônus relâmpago!</Label>
                    </Column>
                    <MotiImage source={require('@imgs/campaigns.png')} style={{ borderRadius: 24, height: 190, marginHorizontal: - margin.h, marginTop: -24, alignSelf: 'center', objectFit: 'contain' }} from={{ opacity: 0, }} animate={{ opacity: 1, }} />
                </Column>

                <CampaignsCards data={campaigns} />

                <OffersCards data={offers} />

                <Column style={{ marginHorizontal: margin.h, }}>

                    <Title style={{ marginTop: 32, marginBottom: 4, fontSize: 20, }}>Indique e ganhe até 1000 pontos</Title>
                    <Label style={{ fontSize: 16, color: color.secundary + 99, lineHeight: 18, }}>Bônus extra para você e seus amigos ao realizar a primeira doação ou cadastrar 20 notas fiscais</Label>
                    <ButtonOut onPress={() => { navigation.navigate('Share') }} style={{ borderColor: color.primary, alignSelf: 'flex-start', paddingVertical: 5, marginTop: 12, marginBottom: 40, }}>
                        <LabelLI style={{ color: color.primary, }}>Saiba mais</LabelLI>
                    </ButtonOut>

                    <Button onPress={() => { navigation.navigate('DonateHide') }} >
                        <MotiImage source={require("@imgs/doe1.png")} style={{ width: '100%', alignSelf: 'center', height: 180, borderRadius: 32, backgroundColor: "#f7f7f7", }} />
                    </Button>
                    <Button onPress={() => { navigation.navigate('DonateHide') }} >
                        <MotiImage source={require("@imgs/doe2.png")} style={{ width: '100%', alignSelf: 'center', height: 180, borderRadius: 32, marginTop: 18, backgroundColor: "#f7f7f7", }} />
                    </Button>


                    <Title style={{ marginTop: 32, textAlign: 'center', }}>São mais de</Title>
                    <Row style={{ justifyContent: 'center', marginTop: 20, }}>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 6, }}>
                            <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>30</Title>
                            <Label style={{ color: '#fff', fontSize: 12, lineHeight: 12, }}>Lojas {'\n'}parceiras</Label>
                        </Column>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 6, }}>
                            <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>170</Title>
                            <Label style={{ color: '#fff', fontSize: 10, lineHeight: 12, }}>Serviços {'\n'}disponíveis</Label>
                        </Column>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', marginRight: 6, }}>
                            <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>12 mil</Title>
                            <Label style={{ color: '#fff', fontSize: 10, lineHeight: 12, }}>Bichinos sendo {'\n'}ajudados por dia</Label>
                        </Column>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <Infinity size={32} color="#fff" style={{ textAlign: 'center' }} />
                            <Label style={{ color: '#fff', fontSize: 12, }}>Gratidão</Label>
                        </Column>
                    </Row>

                    <Column style={{ marginVertical: margin.v, }}>
                        <Title style={{ marginBottom: 4, fontSize: 22, }}>Concorra à prêmios incríveis</Title>
                        <Label style={{ color: color.secundary + 99, fontSize: 16, }}>Todos os meses diversos serviços, produtos e vales são sorteados pelas rifas e você pode ser o ganhador desse mês!</Label>
                        <Row style={{ marginTop: 20, marginHorizontal: margin.h, alignSelf: 'center', alignItems: 'center', }}>
                            <Column>
                                <MotiImage source={require('@imgs/prod1.png')} style={{ width: 150, height: 150, objectFit: 'contain', borderRadius: 16, }} />
                                <MotiImage source={require('@imgs/prod3.png')} style={{ width: 150, height: 100, objectFit: 'contain', borderRadius: 16, marginTop: 10, }} />
                            </Column>
                            <Column style={{ marginLeft: 10, }}>
                                <MotiImage source={require('@imgs/prod2.png')} style={{ width: 170, height: 250, objectFit: 'contain', borderRadius: 16, }} />
                            </Column>
                        </Row>

                        <MotiImage source={require('@imgs/prod4.png')} style={{ width: 320, alignSelf: 'center', objectFit: 'contain', height: 180, borderRadius: 18, }} />

                    </Column>

                    <Column style={{}}>
                        <Title style={{ marginBottom: 4, fontSize: 22 }}>Ganhe mais pontos</Title>
                        <Label style={{ color: color.secundary + 99, fontSize: 16, }}>Faça doações ou cadastre notas fiscais para receber pontos e trocá-los por serviços ou produtos nos estabelecimentos parceiros</Label>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                            <ButtonOut onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ borderColor: '#000', paddingVertical: 6, flexGrow: 1, }}>
                                <LabelLI>Nota fiscal</LabelLI>
                            </ButtonOut>
                            <Column style={{ width: 12, }} />
                            <ButtonPR onPress={() => { navigation.navigate('Donate') }} style={{ flexGrow: 2, paddingVertical: 8, }}>
                                <LabelLI style={{ color: '#fff', }}>Doação</LabelLI>
                            </ButtonPR>
                        </Row>
                    </Column>


                    <FlatList
                        style={{ marginVertical: 12, marginHorizontal: - margin.h, marginTop: 24, }}
                        data={campanhas}
                        ListFooterComponent={<Column style={{ width: 24 }} />}
                        ListHeaderComponent={<Column style={{ width: 24 }} />}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => (
                            <Button key={item.id} style={{ backgroundColor: "#fff", borderRadius: 24, marginRight: 12, }} onPress={() => { navigation.navigate('Shop') }}>
                                <Column>
                                    <MotiImage source={item?.img} style={{ width: 300, height: 400, borderRadius: 24, }} />
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

const CampaignsCards = ({ data }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation()
    return (
        <Column>
            <Title style={{ marginHorizontal: margin.h, marginTop: 32, fontSize: 22, }}>Campanhas em andamento</Title>

            <FlatList
                style={{ marginTop: 12, }}
                data={data}
                horizontal
                ListHeaderComponent={<Column style={{ width: margin.h, }} />}
                ListFooterComponent={<Column style={{ width: margin.h, }} />}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                <Button onPress={() => {navigation.navigate('CampaignsSingle', {id: item?.id})}}  style={{ width: 280,  borderRadius: 12, marginRight: 12, }}>
                    <Column>
                        <Label style={{ fontSize: 12, lineHeight: 12, textAlign: 'right', alignSelf: 'flex-end', padding: 5, position: 'absolute', top: 0, right: 0, borderBottomLeftRadius: 8, borderTopRightRadius: 8, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: color.primary, color: '#fff', zIndex: 99,}}>{item?.date} até {item?.finish}</Label>
                        <MotiImage source={{ uri: item?.img}} style={{ width: 280, height: 150, borderRadius: 12, marginRight: 12, }} />
                        <Column style={{ width: 260, paddingHorizontal: 10, paddingVertical: 10, marginHorizontal: 12, backgroundColor: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12,}}>
                            <Title style={{ fontSize: 18, lineHeight: 20, marginTop: -2, marginBottom: 4, }}>{item?.name}</Title>
                            <Label style={{ fontSize: 14, lineHeight: 16, }}>{item?.desc?.slice(0,72)}...</Label>
                        </Column>
                    </Column>
                </Button>
                }
            />
        </Column>
)}

const OffersCards = ({ data }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <>
            <Row style={{ paddingHorizontal: margin.h, backgroundColor: color.background, paddingVertical: 16, justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ fontSize: 22, }}>Ofertas para você</Title>
                <Button onPress={() => { navigation.navigate('ShopOffers') }} >
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 16, }}>Ver mais</Label>
                </Button>
            </Row>
            <FlatList
                data={data}
                ListFooterComponent={
                    <Column style={{ marginRight: 28, backgroundColor: color.primary + 20, paddingBottom: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20, }} >
                        <Button onPress={() => { navigation.navigate('ShopOffers') }} style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, backgroundColor: color.primary, width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                            <Label style={{ color: '#fff', fontFamily: font.bold, fontSize: 16, textAlign: 'center', }}>Ver mais {'\n'}Ofertas</Label>
                        </Button>
                    </Column>
                }
                ListHeaderComponent={<Column style={{ width: 24 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ backgroundColor: color.background, }}
                renderItem={({ item }) => (
                    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
                        <Column style={{ justifyContent: 'center', width: 124, }}>
                            <MotiImage source={{ uri: item.img }} style={{ width: 124, height: 124, borderTopLeftRadius: 20, borderTopRightRadius: 20, objectFit: 'cover', backgroundColor: "#fff", }} />
                            <Row style={{ backgroundColor: '#d7d7d7', }}>
                                <Column style={{ backgroundColor: color.primary, height: 4, width: item?.sell_porcentage + '%', }} />
                            </Row>
                            <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item.name.slice(0, 42)}</Title>
                            <Row style={{}}>
                                <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value}</Title>
                                <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
                            </Row>

                            <Title style={{ color: "#000", fontSize: 12, marginTop: -6, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value}</Title>
                        </Column>
                    </Button>
                )}
                keyExtractor={item => item.id}
            />
        </>
    )
}

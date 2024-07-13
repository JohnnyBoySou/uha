import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, UserRoundSearch } from 'lucide-react-native';
import { MotiImage, MotiView, AnimatePresence } from 'moti';
import BottomSheet, { } from '@gorhom/bottom-sheet'
import Avatar from '@components/avatar';
import { StatusBar } from 'expo-status-bar';
import { rankList } from '@api/request/rank/rank';
import TopSheet from '../../components/topsheet';


export default function RankingScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [actionButton, setactionButton] = useState(false);
    const modalUser = useRef(null)
    const [loading, setloading] = useState(true);
    const [rank, setrank] = useState();
    const [position, setposition] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await rankList();
                const dataArray = Object.values(res.rank);
                setrank(dataArray)
                setposition(res.minhaposicaorealativa);
            } catch (error) {

            } finally { setloading(false) }
        }
        fetchData();
    }, [])

    if (loading) { return <></> }
    return (
        <Main style={{ backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={color.primary} style="light" animated={true} />

            <AnimatePresence>
                {actionButton &&
                    <MotiView from={{ opacity: 0, scale: .6, rotate: '32deg', }} animate={{ opacity: 1, rotate: '0deg', scale: 1, }} transition={{ type: 'spring' }} exit={{ opacity: 0, rotate: '-32deg', scale: 0.6, }} style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                        <Button onPress={() => { modalUser.current?.expand() }} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: "#00A3FF", justifyContent: 'center', alignItems: 'center', }}><UserRoundSearch size={24} color="#fff" /></Button>
                    </MotiView>
                }
            </AnimatePresence>

            <Scroll style={{ marginTop: -20, }} onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 5) { setactionButton(true); } else { setactionButton(false); } }}>
                <TopSheet valueMin={380} valueNormal={380} valueMax={600}
                    min={<Podium rank={rank} />} max={<PodiumMax rank={rank} />} />

                <Column style={{ height: 380, }} />

                <TopRank rank={rank} />

                <Column style={{ height: 100, }} />


            </Scroll>

            <BottomSheet snapPoints={[0.2, 300]} ref={modalUser} backgroundStyle={{ backgroundColor: '#EDF9FF', }} handleIndicatorStyle={{ height: 8, width: 80, borderRadius: 100, backgroundColor: "#00A3Ff50" }} >
                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Title style={{ marginBottom: 18, marginTop: 12, color: "#00A3FF" }}>Minha posição</Title>
                    <MyRankItem item={position} />
                </Column>
            </BottomSheet>

        </Main>
    )
}


const RankItem = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const { avatar, name, TotalPontos, posicao } = item
    return (
        <Row style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: color.off, }}>
            <Title style={{ textAlign: 'center', width: 60, fontSize: 20, color: item?.posicao % 2 ? color.primary + 80 : color.primary }}>{posicao}</Title>
            <Title style={{ width: 150, marginLeft: 24, fontSize: 14, fontFamily: 'Font_Book', }}>{name}</Title>
            <Title style={{ textAlign: 'center', width: 100, fontSize: 16, }}>{TotalPontos}</Title>
        </Row>
    )
}


const MyRankItem = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);

    const anterior = item?.posicaoanterior
    const minha = item?.minhaposicao
    const depois = item?.posicaodepois

    return (
        <Column>
            {depois?.name &&
                <Row style={{ paddingVertical: 10, borderRadius: 8, borderBottomColor: color.off, backgroundColor: 'transparent' }}>
                    <Title style={{ textAlign: 'center', width: 60, fontSize: 20, color: '#00A3FF' }}>{depois?.posicao}</Title>
                    <Title style={{ width: 150, marginLeft: 24, fontSize: 16, fontFamily: 'Font_Medium', color: '#00A3FF90' }}>{depois?.name}</Title>
                    <Title style={{ textAlign: 'center', width: 100, fontSize: 16, color: '#00A3FF', paddingRight: 20, }}>{depois?.TotalPontos}</Title>
                </Row>}
            <Row style={{ paddingVertical: 10, borderRadius: 8, borderBottomColor: color.off, backgroundColor: '#00A3FF' }}>
                <Title style={{ textAlign: 'center', width: 60, fontSize: 20, color: '#fff' }}>{minha?.posicao}</Title>
                <Title style={{ width: 150, marginLeft: 24, fontSize: 16, fontFamily: 'Font_Bold', color: '#fff' }}>{minha?.name}</Title>
                <Title style={{ textAlign: 'center', width: 100, fontSize: 16, color: '#fff', paddingRight: 20, }}>{minha?.TotalPontos}</Title>
            </Row>
            {anterior?.name &&
                <Row style={{ paddingVertical: 10, borderRadius: 8, borderBottomColor: color.off, backgroundColor: 'transparent' }}>
                    <Title style={{ textAlign: 'center', width: 60, fontSize: 20, color: '#00A3FF' }}>{anterior?.posicao}</Title>
                    <Title style={{ width: 150, marginLeft: 24, fontSize: 16, fontFamily: 'Font_Medium', color: '#00A3FF90' }}>{anterior?.name}</Title>
                    <Title style={{ textAlign: 'center', width: 100, fontSize: 16, color: '#00A3FF', paddingRight: 20, }}>{anterior?.TotalPontos}</Title>
                </Row>}
        </Column>
    )
}

const TopRank = ({ rank }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Column>
            <Title style={{ textAlign: 'center', marginTop: 28, }}>Top 10</Title>
            <Row style={{ marginHorizontal: margin.h, marginVertical: 12, }}>
                <Title style={{ textAlign: 'center', width: 60, fontSize: 18, }}>Rank</Title>
                <Title style={{ width: 150, marginLeft: 24, fontSize: 18, }}>Usuário</Title>
                <Title style={{ textAlign: 'center', width: 100, fontSize: 18, }}>Pontos</Title>
            </Row>
            <FlatList
                data={rank}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <RankItem item={item} />}
                style={{ marginHorizontal: margin.h, }}
            />
        </Column>
    )
}



const Podium = ({ rank }) => {
    const { color, margin, } = useContext(ThemeContext);
    return (
        <Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -20, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <Column >
                    <Title style={{ textAlign: 'center', lineHeight: 28, color: '#fff', }}>Ranking</Title>
                </Column>
                <Column style={{ width: 42, height: 42, }} />
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: margin.h, marginTop: 40, }}>
                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                    <MotiImage source={{ uri: rank[1].avatar }} style={{ width: 62, height: 62, marginBottom: 12, borderRadius: 100, marginTop: -40, backgroundColor: color.secundary, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <Title style={{ fontSize: 24, color: color.secundary, }}>{rank[1]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[1]?.name.slice(0, 10)}</Title>
                    <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                    <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                    <SubLabel>{rank[1]?.TotalPontos}</SubLabel>
                </Column>
                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, marginHorizontal: 12, }}>
                    <MotiImage source={{ uri: rank[0].avatar }} style={{ width: 62, height: 62, marginBottom: 12, backgroundColor: color.primary, borderRadius: 100, marginTop: -40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <MotiImage source={require('@icons/top.png')} style={{ width: 22, height: 30, objectFit: 'contain', marginTop: -25, marginBottom: 10, }} />
                    <Title style={{ fontSize: 24, color: color.primary, }}>{rank[0]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[0]?.name.slice(0, 10)}</Title>
                    <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                    <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                    <SubLabel>{rank[0]?.TotalPontos}</SubLabel>
                    <SubLabel style={{ color: color.primary, fontSize: 14, textAlign: 'center', }}>Campeão {'\n'}de doações</SubLabel>
                </Column>
                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                    <MotiImage source={{ uri: rank[2].avatar }} style={{ width: 62, height: 62, marginBottom: 12, backgroundColor: color.blue, borderRadius: 100, marginTop: -40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <Title style={{ fontSize: 24, color: color.secundary, }}>{rank[2]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[2]?.name.slice(0, 10)}</Title>
                    <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                    <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                    <SubLabel>{rank[2]?.TotalPontos}</SubLabel>
                </Column>
            </Row>
        </Column>
    )
}

const PodiumMax = ({ rank }) => {
    const { color, margin, } = useContext(ThemeContext);
    return (
        <Column style={{ marginHorizontal: margin.h, marginTop: 40, }}>
            <Row style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                <MotiImage source={{ uri: rank[1].avatar }} style={{ width: 62, height: 62, marginBottom: 12, borderRadius: 100, marginTop: -40, backgroundColor: color.secundary, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                <Column>
                    <Title style={{ fontSize: 24, color: color.secundary, }}>{rank[1]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[1]?.name.slice(0, 10)}</Title>
                </Column>
                <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                <SubLabel>{rank[1]?.TotalPontos}</SubLabel>
            </Row>
            <Row style={{ backgroundColor: '#fff',  borderRadius: 12, flexGrow: 1, paddingVertical: 10, marginHorizontal: 12, }}>
                <Column>
                    <MotiImage source={{ uri: rank[0].avatar }} style={{ width: 62, height: 62, marginBottom: 12, backgroundColor: color.primary, borderRadius: 100, marginTop: -40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <MotiImage source={require('@icons/top.png')} style={{ width: 22, height: 30, objectFit: 'contain', marginTop: -25, marginBottom: 10, }} />
                    <Title style={{ fontSize: 24, color: color.primary, }}>{rank[0]?.posicao}</Title>
                </Column>
               
                <Column>
                    <Title style={{ fontSize: 14, }}>{rank[0]?.name.slice(0, 10)}</Title>
                </Column>
                <Column>
                    <SubLabel>{rank[0]?.TotalPontos}</SubLabel>
                    <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                </Column>
                <SubLabel style={{ color: color.primary, fontSize: 14, textAlign: 'center', }}>Campeão {'\n'}de doações</SubLabel>
            </Row>
            <Row style={{ backgroundColor: '#fff',  borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <MotiImage source={{ uri: rank[2].avatar }} style={{ width: 62, height: 62, marginBottom: 12, backgroundColor: color.blue, borderRadius: 100, marginTop: -40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <Title style={{ fontSize: 24, color: color.secundary, }}>{rank[2]?.posicao}</Title>
                </Column>
                <Column>
                    <Title style={{ fontSize: 14, }}>{rank[2]?.name.slice(0, 10)}</Title>
                </Column>
               <Column>
                <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                <SubLabel>{rank[2]?.TotalPontos}</SubLabel>
               </Column>
            </Row>
        </Column>
    )
}




/*  <Row style={{ marginHorizontal: margin.h, backgroundColor: '#EDF9FF', padding: 18, borderRadius: 12, marginVertical: 18, justifyContent: 'space-between', alignItems: 'center', }}>
<Column style={{ justifyContent: 'center', alignItems: 'center', }}>
<Avatar />
<SubLabel style={{ fontSize: 14, }}>Você</SubLabel>
<Title style={{ textAlign: 'center', width: 60, fontSize: 18, }}>Rank</Title>
<Title style={{ textAlign: 'center', width: 100, fontSize: 18, }}>Pontos</Title>
</Column>


</Row>*/
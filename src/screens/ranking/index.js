import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, UserRoundSearch } from 'lucide-react-native';
import { MotiImage } from 'moti';
import BottomSheet, { } from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar';
import { rankList } from '@api/request/rank/rank';
import TopSheet from '@components/topsheet';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image'
import { Skeleton } from 'moti/skeleton';

export default function RankingScreen() {
    const { color, margin } = useContext(ThemeContext);
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
                console.log(error)
            } finally {// setloading(false) 
            }
        }
        fetchData();
    }, [])


    if (loading) { return <SkeletonBody /> }
    return (
        <Main style={{ backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={color.primary} style="light" animated={true} />
            <Scroll style={{ marginTop: -20, }} >
                <TopSheet valueMin={380} valueNormal={380} valueMax={600}
                    min={<Podium rank={rank} />} normal={<Podium rank={rank} />} max={<PodiumMax rank={rank} />} />

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
            <Button onPress={() => { modalUser.current?.expand() }} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: "#00A3FF", justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30, right: 30, }}><UserRoundSearch size={24} color="#fff" /></Button>
        </Main>
    )
}

const RankItem = ({ item }) => {
    const { color } = useContext(ThemeContext);
    const { name, TotalPontos, posicao } = item
    return (
        <Row style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: color.off, }}>
            <Title style={{ textAlign: 'center', width: 60, fontSize: 20, color: item?.posicao % 2 ? color.primary + 80 : color.primary }}>{posicao}</Title>
            <Title style={{ width: 150, marginLeft: 24, fontSize: 14, fontFamily: 'Font_Book', }}>{name}</Title>
            <Title style={{ textAlign: 'center', width: 100, fontSize: 16, }}>{TotalPontos}</Title>
        </Row>
    )
}

const MyRankItem = ({ item }) => {
    const { color } = useContext(ThemeContext);

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
    const { margin } = useContext(ThemeContext);
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
    const navigation = useNavigation()
    if (rank == undefined) return <></>
    return (
        <Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -10, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <Column >
                    <Title style={{ textAlign: 'center', lineHeight: 28, color: '#fff', }}>Ranking</Title>
                </Column>
                <Column style={{ width: 42, height: 42, }} />
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: margin.h, marginTop: 40, }}>
                <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, paddingHorizontal: 12, }}>
                    <Image contentFit="cover" source={{ uri: rank[1].avatar }} style={{ width: 62, height: 62, marginBottom: 12, borderRadius: 100, marginTop: -40, backgroundColor: color.secundary, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <Title style={{ fontSize: 24, color: color.secundary, }}>#{rank[1]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[1]?.name.slice(0, 10)}</Title>
                    <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                    <SubLabel style={{ color: color.primary, }}>{rank[1]?.TotalPontos}</SubLabel>
                    <Label style={{ color: color.primary, fontSize: 12, marginTop: -8, }}>pontos</Label>
                </Column>
                <Column style={{ backgroundColor: '#fff', paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, marginHorizontal: 12, }}>
                    <Image contentFit="cover" source={{ uri: rank[0]?.avatar }} style={{ width: 62, height: 62, marginBottom: 12, backgroundColor: color.primary, borderRadius: 100, marginTop: -40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <Image contentFit="contain" source={require('@icons/top.png')} style={{ width: 22, height: 30, marginTop: -25, marginBottom: 10, }} />
                    <Title style={{ fontSize: 24, color: color.primary, }}>#{rank[0]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[0]?.name.slice(0, 10)}</Title>
                    <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                    <SubLabel style={{ color: color.primary, }}>{rank[0]?.TotalPontos}</SubLabel>
                    <Label style={{ color: color.primary, fontSize: 12, marginTop: -8, }}>pontos</Label>
                    <SubLabel style={{ color: color.primary, fontSize: 12, lineHeight: 12, marginTop: 6, textAlign: 'center', }}>Campeão {'\n'}de doações</SubLabel>
                </Column>
                <Column style={{ backgroundColor: '#fff', paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                    <Image contentFit="cover" source={{ uri: rank[2].avatar }} style={{ width: 62, height: 62, marginBottom: 12, backgroundColor: color.blue, borderRadius: 100, marginTop: -40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff', }} />
                    <Title style={{ fontSize: 24, color: color.secundary, }}>#{rank[2]?.posicao}</Title>
                    <Title style={{ fontSize: 14, }}>{rank[2]?.name.slice(0, 10)}</Title>
                    <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                    <SubLabel style={{ color: color.primary, }}>{rank[2]?.TotalPontos}</SubLabel>
                    <Label style={{ color: color.primary, fontSize: 12, marginTop: -8, }}>pontos</Label>
                </Column>
            </Row>
        </Column>
    )
}

const PodiumMax = ({ rank }) => {
    const { color, margin, } = useContext(ThemeContext);
    const navigation = useNavigation();
    if (rank == undefined) return <></>
    return (
        <Column style={{ marginHorizontal: margin.h, marginTop: 0, }}>

            <Title style={{ marginBottom: 20, }}>Top 3</Title>

            <Row style={{ borderWidth: 1, marginBottom: 12, borderColor: '#d7d7d7', paddingHorizontal: 12, backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                <Row>
                    <MotiImage source={{ uri: rank[0].avatar }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.primary, }} />
                    <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                        <Title style={{ fontSize: 14, }}>{rank[0]?.name.slice(0, 15)}</Title>
                        <SubLabel style={{ fontSize: 12, lineHeight: 14, color: color.primary, }}>{rank[0]?.TotalPontos} pontos</SubLabel>
                    </Column>
                </Row>
                <Title style={{ fontSize: 24, color: color.secundary, }}>#{rank[0]?.posicao}</Title>
            </Row>
            <Row style={{ borderWidth: 1, marginBottom: 12, borderColor: '#d7d7d7', paddingHorizontal: 12, backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                <Row>
                    <MotiImage source={{ uri: rank[1].avatar }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.secundary, }} />
                    <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                        <Title style={{ fontSize: 14, }}>{rank[1]?.name.slice(0, 15)}</Title>
                        <SubLabel style={{ fontSize: 12, lineHeight: 14, color: color.primary, }}>{rank[1]?.TotalPontos} pontos</SubLabel>
                    </Column>
                </Row>
                <Title style={{ fontSize: 24, color: color.secundary, }}>#{rank[1]?.posicao}</Title>
            </Row>
            <Row style={{ borderWidth: 1, marginBottom: 12, borderColor: '#d7d7d7', paddingHorizontal: 12, backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, flexGrow: 1, paddingVertical: 10, }}>
                <Row>
                    <MotiImage source={{ uri: rank[2].avatar }} style={{ width: 62, height: 62, borderRadius: 100, backgroundColor: color.blue, }} />
                    <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                        <Title style={{ fontSize: 14, }}>{rank[2]?.name.slice(0, 15)}</Title>
                        <SubLabel style={{ fontSize: 12, lineHeight: 14, color: color.primary, }}>{rank[2]?.TotalPontos} pontos</SubLabel>
                    </Column>
                </Row>
                <Title style={{ fontSize: 24, color: color.secundary, }}>#{rank[2]?.posicao}</Title>
            </Row>

            <Row style={{ marginTop: 16, justifyContent: 'space-between', alignItems: 'center', }}>

                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Button onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ backgroundColor: color.secundary, borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                        <MaterialCommunityIcons name="clipboard-edit-outline" size={24} color="#fff" />
                    </Button>
                    <Label style={{ fontSize: 16, color: color.secundary, fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Nota fiscal</Label>
                </Column>
                <Column>
                    <Button onPress={() => { navigation.navigate('Account') }} style={{ backgroundColor: color.secundary, borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                        <AntDesign name="user" size={24} color="#fff" />
                    </Button>
                    <Label style={{ fontSize: 16, color: color.secundary, fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Conta</Label>
                </Column>
                <Column>
                    <Button onPress={() => { navigation.navigate('AccountFAQ') }} style={{ backgroundColor: color.secundary, borderRadius: 100, padding: 16, borderWidth: 1, borderColor: "#ffffff90", }}>
                        <Feather name="help-circle" size={24} color="#fff" />
                    </Button>
                    <Label style={{ fontSize: 16, color: color.secundary, fontFamily: 'Font_Medium', letterSpacing: -1, textAlign: 'center', marginTop: 5, }}>Ajuda</Label>
                </Column>

            </Row>
        </Column>
    )
}

const SkeletonBody = () => {
    const { color, margin } = useContext(ThemeContext);
    return (
        <Column>
            <Row style={{ backgroundColor: color.primary, borderBottomLeftRadius: 32, paddingTop: 80, paddingBottom: 40, borderBottomRightRadius: 32, paddingHorizontal: margin.h, justifyContent: 'center', alignItems: 'flex-end',  }}>
                <Skeleton colorMode='light' width={80} height={120} radius={12} />
                <Column style={{width: 12, }} />
                <Skeleton colorMode='light' width={80} height={170} radius={12} />
                <Column style={{width: 12, }} />
                <Skeleton colorMode='light' width={80} height={120} radius={12} />
            </Row>
            <Column style={{ paddingHorizontal: margin.h, marginTop: 32, justifyContent: 'center', alignItems: 'center',  }}>
                <Skeleton colorMode='light' width={120} height={40} radius={8} />
            </Column>
                <Skeleton colorMode='light' width={width} height={40} radius={8} />
        </Column>
    )
}
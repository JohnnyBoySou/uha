import React, { useContext, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, UserRoundSearch } from 'lucide-react-native';
import { MotiImage, MotiView, AnimatePresence } from 'moti';
import BottomSheet, { } from '@gorhom/bottom-sheet'
import Avatar from '@components/avatar';
import { StatusBar } from'expo-status-bar';

export default function RankingScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [actionButton, setactionButton] = useState(false);
    const modalUser = useRef(null)

    const user = {
        points: '117.932',
        position: 12,
        level: 'Safíra',
        avatar: 'localAvatar',
    }

    return (
        <Main style={{ backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={color.primary} style="light" animated={true}/>

            <AnimatePresence>
                {actionButton &&
                    <MotiView from={{opacity: 0, scale: .6, rotate: '32deg', }} animate={{opacity: 1, rotate: '0deg', scale: 1,}} transition={{type: 'spring'}} exit={{opacity: 0, rotate: '-32deg', scale: 0.6, }} style={{ position: 'absolute', bottom: 30,  right: 30, zIndex: 99, }}>
                        <Button onPress={() => {modalUser.current?.expand()}}  style={{  width: 52, height: 52, borderRadius: 100, backgroundColor: "#00A3FF",  justifyContent: 'center', alignItems: 'center',  }}><UserRoundSearch size={24} color="#fff" /></Button>
                    </MotiView>
                }
            </AnimatePresence>

            <Scroll style={{ marginTop: -20,  }} onScroll={(event) => {  const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 5) { setactionButton(true); } else {  setactionButton(false); } }}>
                <Column style={{ paddingBottom: 30,  backgroundColor: color.primary, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, marginVertical: 16, }}>
                        <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <ArrowLeft color={color.secundary} />
                        </Button>
                        <Column >
                            <Title style={{ textAlign: 'center', lineHeight: 28, color: '#fff', }}>Ranking</Title>
                        </Column>
                        <Column style={{ width: 42, height: 42, }} />
                    </Row>

                    <Row style={{ justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: margin.h, marginTop: 40,}}>
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',  borderRadius: 12,  flexGrow: 1, paddingVertical: 10,}}>
                            <MotiImage source={{uri: topRank[1].avatar}} style={{ width: 62, height: 62, marginBottom: 12, borderRadius: 100, marginTop: -40, alignSelf:'center', borderWidth: 2, borderColor: '#fff',     }}/>
                            <Title style={{ fontSize: 24, color: color.secundary, }}>{topRank[1]?.position}</Title>
                            <Title style={{ fontSize: 14, }}>@{topRank[1]?.username}</Title>
                            <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                            <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                            <SubLabel>{topRank[1].points}</SubLabel>
                        </Column>
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',  borderRadius: 12,  flexGrow: 1, paddingVertical: 10, marginHorizontal: 12,}}>
                            <MotiImage source={{uri: topRank[0].avatar}} style={{ width: 62, height: 62, marginBottom: 12, borderRadius: 100, marginTop: -40, alignSelf:'center', borderWidth: 2, borderColor: '#fff',     }}/>
                            <MotiImage source={require('@icons/top.png')} style={{ width: 22, height: 30, objectFit: 'contain', marginTop: -25, marginBottom: 10,}}/>
                            <Title style={{ fontSize: 24, color: color.primary, }}>{topRank[0]?.position}</Title>
                            <Title style={{ fontSize: 14, }}>@{topRank[0]?.username}</Title>
                            <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                            <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                            <SubLabel>{topRank[0].points}</SubLabel>

                            <SubLabel style={{ color: color.primary, fontSize: 14, textAlign: 'center', }}>Campeão {'\n'}de doações</SubLabel>
                        </Column>
                        <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',  borderRadius: 12,  flexGrow: 1, paddingVertical: 10,}}>
                            <MotiImage source={{uri: topRank[2].avatar}} style={{ width: 62, height: 62, marginBottom: 12, borderRadius: 100, marginTop: -40, alignSelf:'center', borderWidth: 2, borderColor: '#fff',     }}/>
                            <Title style={{ fontSize: 24, color: color.secundary, }}>{topRank[2]?.position}</Title>
                            <Title style={{ fontSize: 14, }}>@{topRank[2]?.username}</Title>
                            <Column style={{ width: '80%', marginVertical: 5, marginHorizontal: 20, height: 1, backgroundColor: color.off, }} />
                            <Label style={{ color: color.primary, fontSize: 12, }}>pontos</Label>
                            <SubLabel>{topRank[2].points}</SubLabel>
                        </Column>
                    </Row>
                    <Column style={{ width: 72, height: 8, backgroundColor: '#ffffff80', borderRadius: 100, alignSelf: 'center', marginTop: 24, marginBottom: -18, }} />
                </Column>


                <Row style={{ marginHorizontal: margin.h, backgroundColor: '#EDF9FF', padding: 18, borderRadius: 12, marginVertical: 18, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Avatar />
                        <SubLabel style={{ fontSize: 14, }}>Você</SubLabel>
                    </Column>
                    
                    <Column>
                        <Label style={{ fontSize: 14, }}>Pontos</Label>
                        <SubLabel>{user?.points}</SubLabel>
                    </Column>
                    <Column>
                        <Label style={{ fontSize: 14, }}>Posição</Label>
                        <SubLabel>{user?.position}</SubLabel>
                    </Column>
                    <Column style={{ marginRight: 20, }}>
                        <Label style={{ fontSize: 14, }}>Nível</Label>
                        <SubLabel>{user?.level}</SubLabel>
                    </Column>
                </Row>

                <Title style={{ textAlign: 'center', marginTop: 12,}}>Top 10</Title>

                <Row style={{ marginHorizontal: margin.h,  marginVertical: 12,}}>
                    <Title style={{ textAlign: 'center', width: 60, fontSize: 18, }}>Rank</Title>
                    <Title style={{ width: 150,  marginLeft: 24, fontSize: 18, }}>Usuário</Title>
                    <Title style={{ textAlign: 'center',  width: 100, fontSize: 18, }}>Pontos</Title>
                </Row>

                <FlatList
                    data={listRank}  
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <RankItem item={item} />}
                    style={{ marginHorizontal: margin.h, }}
                />
                
                <Column style={{height: 100, }} />
               

            </Scroll>
            <BottomSheet snapPoints={[0.2, 300]} ref={modalUser}   backgroundStyle={{backgroundColor: '#EDF9FF',}} >
                <Column style={{  paddingHorizontal: margin.h,  }}>
                <Title style={{ marginBottom: 18, marginTop: 12, }}>Minha posição</Title>
                <FlatList
                    data={myRank}  
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <MyRankItem item={item} />}
                />
                </Column>
            </BottomSheet>

        </Main>
    )
}


const RankItem = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Row style={{  marginBottom: 10, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: color.off,  }}>
            <Title style={{ textAlign: 'center', width: 60, fontSize: 20,  color: item.position % 2 ? color.primary+80 : color.primary}}>{item.position}</Title>
            <Title style={{   width: 150, marginLeft: 24, fontSize: 16, fontFamily:'Font_Book', }}>@{item.username}</Title>
            <Title style={{ textAlign: 'center',  width: 100, fontSize: 16,  }}>{item.points}</Title>
        </Row>
    )
}


const MyRankItem = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Row style={{   paddingVertical: 10,  borderRadius: 8, borderBottomColor: color.off, backgroundColor: item?.current ? '#00A3FF': 'transparent' }}>
            <Title style={{ textAlign: 'center', width: 60, fontSize: 20,  color: item.current ? '#fff' : '#00A3FF'}}>{item.position}</Title>
            <Title style={{   width: 150, marginLeft: 24, fontSize: 16, fontFamily: item.current ? 'Font_Bold' : 'Font_Medium', color: item.current ? '#fff' : '#00A3FF90' }}>@{item.username}</Title>
            <Title style={{ textAlign: 'center',  width: 100, fontSize: 16, color: item.current ? '#fff' : '#00A3FF', paddingRight: 20, }}>{item.points}</Title>
        </Row>
    )
}

const topRank = [
    {
        points: '178.287',
        position: 1,
        username: 'ameixa',
        avatar: 'https://images.pexels.com/photos/6869554/pexels-photo-6869554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        points: '135.232',
        position: 2,
        username: 'bigodudo',
        avatar: 'https://images.pexels.com/photos/11364134/pexels-photo-11364134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        points: '128.437',
        position: 3,
        username: 'dinossauro',
        avatar: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
]


const listRank = [
    {
        points: '117.932',
        position: 4,
        username: 'johnmarshell',
    },
    {
        points: '117.932',
        position: 5,
        username: 'erysch',
    },
    {
        points: '117.932',
        position: 6,
        username: 'guigui',
    },
    {
        points: '117.932',
        position: 7,
        username: 'ronaldinho',
    },
    {
        points: '117.932',
        position: 8,
        username: 'ferpessoa',
    },
    {
        points: '117.932',
        position: 9,
        username: 'dayliana',
    },
    {
        points: '117.932',
        position: 10,
        username: 'routi',
    },
]


const myRank = [
    {
        points: '118.100',
        position: 11,
        username: 'jerivaldo',
    },
    {
        points: '117.932',
        position: 12,
        current: true,
        username: 'ana_silva',
    },
    {
        points: '112.320',
        position: 13,
        username: 'compilador',
    },
]
import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Plus } from 'lucide-react-native';
import { MotiImage } from 'moti';
import { Skeleton } from 'moti/skeleton';
import Header from '@components/header';
import { FlatList, StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Check from '@components/check';
import { StatusBar } from 'expo-status-bar';
import { getStickers } from '@api/request/user/stickers';

export default function StickersScreen({ navigation, }) {
    const { color, margin, font, background } = useContext(ThemeContext);
    const [porcentageView, setporcentageView] = useState(false);
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStickers();
                setdata(res);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData();
    }, []);

    return (
        <Main>
            <StatusBar style="dark" backgroundColor={background} animated />
            <Scroll>
                <Header rose />
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column>
                            <Title style={{ fontSize: 16, fontFamily: font.book, }}>Sua coleção de</Title>
                            <Title style={{ lineHeight: 26, }}>Stickers</Title>
                        </Column>
                        <Button onPress={() => { navigation.navigate('Donate')}}  style={{ backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Title style={{ fontSize: 14, color: color.blue, lineHeight: 14, fontFamily: font.bold, marginRight: 16, }}>Conseguir{'\n'}Mais</Title>
                                <Column style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: color.blue + 20, justifyContent: 'center', alignItems: 'center', }}>
                                    <Plus size={18} color={color.blue} />
                                </Column>
                            </Row>
                        </Button>
                    </Row>


                    {loading ? <SkeletonList /> :
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, }}>
                            <Column style={{ flexGrow: 2, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  backgroundColor:"#fff", borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16, }}>
                                <Title style={{ fontSize: 12, lineHeight: 12, }}>Barra de{'\n'}progresso</Title>
                                <Button onPress={() => { setporcentageView(!porcentageView)}} style={{ borderRadius: 100, justifyContent: 'center', alignItems: 'center',  }} >
                                <Check status={porcentageView}/>
                                </Button>
                                </Row>
                            <FlatList
                                data={data?.slice(0, 4)}
                                renderItem={({ item, index }) => <CardSticker item={item} index={index} bar={porcentageView}/>}
                                keyExtractor={item => item.id}
                                />
                            </Column>
                            <Column style={{width: 12, }} />
                            <FlatList
                                data={data?.slice(4, 8)}
                                renderItem={({ item , index}) => <CardSticker  item={item} bar={porcentageView} index={index}/>}
                                keyExtractor={item => item.id}
                            />
                    </Row>}


                </Column>
                <Column style={{ height: 60, }} />
            </Scroll>
        </Main>
    )
}


const SkeletonList = () => {
return(
    <Row style={{ marginVertical: 20, justifyContent: 'space-between', alignSelf: 'center', }}>
        <Column style={{ flexGrow: 1, }}>
            <Skeleton height={60} width={150} radius={12} colorMode='light' />
            <Column style={{height: 16 }} />
            <Skeleton height={200} width={150} radius={12} colorMode='light' />
            <Column style={{height: 16 }} />
            <Skeleton height={200} width={150} radius={12} colorMode='light' />
            <Column style={{height: 16 }} />
            <Skeleton height={200} width={150} radius={12} colorMode='light' />
        </Column>
        <Column style={{ flexGrow: 1, }}>
            <Skeleton height={220} width={150} radius={12} colorMode='light' />
            <Column style={{height: 16 }} />
            <Skeleton height={220} width={150} radius={12} colorMode='light' />
            <Column style={{height: 16 }} />
            <Skeleton height={220} width={150} radius={12} colorMode='light' />
        </Column>
    </Row>
)}






const CardSticker = ({ item, index, bar }) => {
    const { id, name, img, bg, total, receive, cl} = item;
    const navigation = useNavigation();
    const { color, margin, font} = useContext(ThemeContext);
    const porcentage = (receive / total) * 100;
   
    return (
        <Button onPress={() => { navigation.navigate('StickerSingle', { id: id, name: name, image: img, bg: bg, total: total, receive: receive }) }} style={{ flexGrow: 1, backgroundColor: bg, borderRadius: 16, padding: 16, marginBottom: 12, }}>
            <Column>
                <MotiImage from={{ opacity: 0, scale: 0, rotateZ: '360deg' }} animate={{ opacity: 1, scale: 1, rotateZ: '0deg' }} delay={index * 300} style={{ width: 86, height: 86, objectFit: 'cover', alignSelf: 'center' }} source={img} />
                <Title style={{ fontSize: 18, lineHeight: 20, marginVertical: 6, color: cl ? "#fff" : color.secundary,  }}>{name} {bar ? porcentage.toFixed(0) + '%' : ''}</Title>
                
                {bar ? 
                <Column style={{ backgroundColor: '#ffffff90', borderRadius: 100, }}>
                    <Column style={{ width: porcentage + '%', height: 8, backgroundColor: cl ? "#fff" : color.primary, borderRadius: 100 }}></Column>
                </Column>
                :
                <Title style={{ backgroundColor: '#ffffff50', color: cl ? "#fff" : color.secundary, borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12, alignSelf: 'flex-start', fontSize: 12, lineHeight: 14, fontFamily: font.medium, }}>{receive}/{total} stickers</Title>
                }           
            </Column>
        </Button>
    )
}


import React, { useContext, useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Button, Row, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { FlatList, ScrollView, Dimensions, Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getONGs, getONGsCategories } from '@api/request/ongs/ongs';

import { ExpandingDot } from "react-native-animated-pagination-dots";
import { Dog, HeartPulse, Speech, Trees } from 'lucide-react-native'
import { SkeletonList } from './category';

import { Image } from 'expo-image'
const { width } = Dimensions.get('window')

export default function ONGSScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState(true);
    const [ongs, setongs] = useState([]);
    const [categories, setcategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const list = await getONGs()
                const cats = await getONGsCategories()
                setongs(list);
                setcategories(cats);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData();
    }, []);


    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header rose />
                <Column style={{ justifyContent: 'center', marginVertical: 24, marginHorizontal: 28, }}>
                    <Title style={{ fontSize: 28, lineHeight: 28, }}>ONGs parceiras </Title>
                    <Label style={{ marginVertical: 6, fontSize: 16, color: color.secundary + 99, lineHeight: 18, }}>Encontre a ONG que mais combina com você! </Label>
                </Column>
                <Cards />
                <Title style={{ marginHorizontal: 28, fontSize: 22, lineHeight: 22, letterSpacing: -1, marginTop: 16, }}>Você pode gostar</Title>
                {loading ? <SkeletonList /> : <ONGSList data={ongs} /> }
                <Column style={{ height: 80, }} />
            </Scroll>
        </Main>
    )
}

const ONGSList = ({ data }) => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Scroll horizontal showsHorizontalScrollIndicator={false} pagingEnabled style={{ paddingTop: 15, }}>
            <FlatList
                data={data?.slice(0, 3)}
                showsHorizontalScrollIndicator={false}
                style={{ width: width, paddingHorizontal: 28, marginTop: 0, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, backgroundColor: '#f7f7f7', padding: 16, }} onPress={() => { navigation.navigate('ONGSingle', { id: item.id }) }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, width: 180, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
                                <Label style={{ fontSize: 14, lineHeight: 16, width: 180, }}>{item?.descri?.length > 80 ? item?.descri?.slice(0, 80) + '...' : item?.descri}</Label>
                                <Row style={{ marginTop: 8, }}>
                                    {item?.categories?.slice(0, 2).map((cat) => (
                                        <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                    ))}
                                </Row>
                            </Column>
                            <Image contentFit="cover" source={{ uri: item?.img }} style={{ width: 112, height: 112, borderRadius: 12,  backgroundColor: "#fff", }} />
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item?.id}
            />
            <FlatList
                data={data?.slice(3, 6)}
                showsHorizontalScrollIndicator={false}
                style={{ width: width, paddingHorizontal: 28, marginTop: 0, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, backgroundColor: '#f7f7f7', padding: 16, }} onPress={() => { navigation.navigate('ONGSingle', { id: item.id }) }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, width: 180, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
                                <Label style={{ fontSize: 14, lineHeight: 16, width: 180, }}>{item?.descri?.length > 80 ? item?.descri?.slice(0, 80) + '...' : item?.descri}</Label>
                                <Row style={{ marginTop: 8, }}>
                                    {item?.categories?.slice(0, 2).map((cat) => (
                                        <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                    ))}
                                </Row>
                            </Column>
                            <Image contentFit="cover" source={{ uri: item?.img }} style={{ width: 112, height: 112, borderRadius: 12, backgroundColor: "#fff", }} />
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item?.id}
            />
            <FlatList
                data={data?.slice(6, 9)}
                showsHorizontalScrollIndicator={false}
                style={{ width: width, paddingHorizontal: 28, marginTop: 0, }}
                renderItem={({ item }) => (
                    <Button style={{ marginBottom: 12, borderRadius: 12, backgroundColor: '#f7f7f7', padding: 16, }} onPress={() => { navigation.navigate('ONGSingle', { id: item.id }) }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title style={{ marginTop: 6, width: 180, fontSize: 18, lineHeight: 18, marginBottom: 4, }}>{item.name.slice(0, 24)}</Title>
                                <Label style={{ fontSize: 14, lineHeight: 16, width: 180, }}>{item?.descri?.length > 80 ? item?.descri?.slice(0, 80) + '...' : item?.descri}</Label>
                                <Row style={{ marginTop: 8, }}>
                                    {item?.categories?.slice(0, 2).map((cat) => (
                                        <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                                    ))}
                                </Row>
                            </Column>
                            <Image contentFit="cover" source={{ uri: item?.img }} style={{ width: 112, height: 112, borderRadius: 12,  backgroundColor: "#fff", }} />
                        </Row>
                    </Button>
                )}
                keyExtractor={item => item?.id}
            />

        </Scroll>
    )
}

const Cards = () => {
    const { color, margin, } = useContext(ThemeContext);
    const navigation = useNavigation()
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const pages = [1, 2]

    return (
        <Column>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}>
                <Column style={{ width: width, paddingHorizontal: margin.h, }}>
                    <Row style={{ marginBottom: 12, }}>
                        <Button onPress={() => { navigation.navigate('ONGCategory', { id: 12, name: 'Animais', }) }} style={{ backgroundColor: color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                <Dog color={color.secundary} size={28} />
                                <Title style={{ fontSize: 16, lineHeight: 22, }}>Animais</Title>
                            </Column>
                        </Button>
                        <Column style={{ width: 12, }} />
                        <Button onPress={() => { navigation.navigate('ONGCategory', { id: 13, name: 'Social', }) }} style={{ backgroundColor: color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                <Speech color={color.secundary} size={28} />
                                <Title style={{ fontSize: 16, lineHeight: 22, }}>Social</Title>
                            </Column>
                        </Button>
                    </Row>
                    <Row style={{ marginBottom: 12, }}>
                        <Button onPress={() => { navigation.navigate('ONGCategory', { id: 14, name: 'Meio Ambiente' }) }} style={{ backgroundColor: color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                <Trees color={color.secundary} size={28} />
                                <Title style={{ fontSize: 16, lineHeight: 22, }}>Meio Ambiente</Title>
                            </Column>
                        </Button>
                        <Column style={{ width: 12, }} />
                        <Button onPress={() => { navigation.navigate('ONGCategory', { id: 15, name: 'Saúde' }) }} style={{ backgroundColor: color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                <HeartPulse color={color.secundary} size={28} />
                                <Title style={{ fontSize: 16, lineHeight: 22, }}>Saúde</Title>
                            </Column>
                        </Button>
                    </Row>
                </Column>
                <Column style={{ width: width, paddingHorizontal: margin.h, }}>
                    <Button style={{ backgroundColor: color.secundary + 20, flexGrow: 1, borderRadius: 12, marginBottom: 15,}}>
                            <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                <Title style={{ fontSize: 16, lineHeight: 22, }}>Outras categorias</Title>
                            </Column>
                        </Button>
                </Column>
            </ScrollView>

            <Column style={{ backgroundColor: color.secundary + 20, marginRight: 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 5, alignSelf: 'center', marginTop: 0, marginBottom: 14, }}>
                <ExpandingDot
                    data={pages}
                    expandingDotWidth={20}
                    scrollX={scrollX}
                    containerStyle={{ position: 'relative', marginTop: 0, top: 0, }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 2,
                    }}
                    activeDotColor={color.secundary}
                    inActiveDotColor={color.secundary + 90}
                />
            </Column>
        </Column>
    )
}



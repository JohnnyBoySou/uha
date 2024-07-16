import React, { useContext, useEffect, useState, useMemo, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { FlatList, Dimensions, StyleProp } from 'react-native';
import { MotiImage, MotiView } from 'moti';
import { getONGCategorieSingle } from '@api/request/ongs/ongs';
import { useNavigation } from '@react-navigation/native';
import { Dog, HeartPulse, Speech, Trees, Pizza } from 'lucide-react-native'
import { Skeleton } from 'moti/skeleton';
const { width } = Dimensions.get('window');

export default function ONGCategoryScreen({ navigation, route }) {
    const { color } = useContext(ThemeContext);
    const { name, id } = route.params

    const icon = cats.find(cat => cat.id === id)?.icon;

    const [shops, setshops] = useState();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await getONGCategorieSingle(id);
                setshops(res);
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setloading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [])

    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <Scroll>
                <Header title={name} rose />
                <Column style={{ marginVertical: 20, flex: 1, }}>
                    <MotiView from={{ scale: 0, opacity: 0, }} animate={{ scale: 1, opacity: 1, }} style={{ width: 64, marginBottom: 30, height: 64, borderRadius: 100, backgroundColor: color.secundary + 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                        {icon}
                    </MotiView>
                    {loading ? <SkeletonList /> :
                        <FlatList
                            data={shops}
                            initialNumToRender={3}
                            maxToRenderPerBatch={3}
                            windowSize={3}
                            ListEmptyComponent={<Empty />}
                            removeClippedSubviews={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <CardList item={item} />}
                            keyExtractor={item => item.id}
                        />}
                </Column>
            </Scroll>
        </Main>
    )
}
export const SkeletonList = () => {
    return (
        <Column style={{ justifyContent: 'center', width: width, paddingHorizontal: 32, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                <Column style={{ marginRight: 12, }}>
                    <Skeleton width={200} height={40} colorMode="light" radius={8} />
                    <Column style={{ height: 8, }} />
                    <Skeleton width={140} height={30} colorMode="light" radius={8} />
                </Column>
                <Skeleton width={100} height={100} colorMode="light" radius={12} />
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                <Column style={{ marginRight: 12, }}>
                    <Skeleton width={200} height={40} colorMode="light" radius={8} />
                    <Column style={{ height: 8, }} />
                    <Skeleton width={140} height={30} colorMode="light" radius={8} />
                </Column>
                <Skeleton width={100} height={100} colorMode="light" radius={12} />
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                <Column style={{ marginRight: 12, }}>
                    <Skeleton width={200} height={40} colorMode="light" radius={8} />
                    <Column style={{ height: 8, }} />
                    <Skeleton width={140} height={30} colorMode="light" radius={8} />
                </Column>
                <Skeleton width={100} height={100} colorMode="light" radius={12} />
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, }}>
                <Column style={{ marginRight: 12, }}>
                    <Skeleton width={200} height={40} colorMode="light" radius={8} />
                    <Column style={{ height: 8, }} />
                    <Skeleton width={140} height={30} colorMode="light" radius={8} />
                </Column>
                <Skeleton width={100} height={100} colorMode="light" radius={12} />
            </Row>
        </Column>
    )
}

const Empty = () => {
    const { color } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 50, }}>
            <Title style={{ fontSize: 22, lineHeight: 24, letterSpacing: -1, textAlign: 'center', marginBottom: 6 }}>Nenhuma ONG encontrada para essa categoria!</Title>
            <Label style={{ textAlign: 'center', fontSize: 16, lineHeight: 18, color: color.secundary + 99, }}>Tente novamente com outra categoria</Label>
            <ButtonPR onPress={() => navigation.goBack()} style={{ marginTop: 12, }}><LabelPR>Escolher outra categoria</LabelPR></ButtonPR>
        </Column>
    )
}

const CardList = ({ item }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Column style={{ width: width, paddingHorizontal: 28, }}>
            <Button style={{ marginBottom: 12, borderRadius: 12, backgroundColor: '#f7f7f7', }} onPress={() => { navigation.navigate('ONGSingle', { id: item.id }) }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Column style={{ justifyContent: 'center', paddingLeft: 20, height: 124, width: width * 0.5, }}>
                        <Title style={{ marginTop: 6, fontSize: 16, lineHeight: 18, }}>{item?.name?.length > 18 ? item?.name.slice(0, 18) + '...' : item?.name.slice(0, 18)}</Title>
                        <Label style={{ fontSize: 12, lineHeight: 14, marginTop: 2, color: color.secundary + 99, }}>{item?.descri?.length > 40 ? item?.descri?.slice(0, 40) + '...' : item?.descri}</Label>
                        <Row style={{ marginTop: 8, }}>
                            {item?.categories?.slice(0, 2).map((cat) => (
                                <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                            ))}
                        </Row>
                    </Column>
                    <MotiImage source={{ uri: item?.img }} style={{ width: 108, height: 108, marginRight: 8, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                </Row>
            </Button>
        </Column>
    )
}


const cats = [
    { "icon": <Pizza size={28} color="#FFF2E3" />, "id": 11, "name": "Alimentação", "ongs": 1, },
    { "icon": <Dog size={28} color="#5C0D45" />, "id": 12, "name": "Animais", "ongs": 1, },
    { "icon": <Speech color="#5C0D45" size={28} />, "id": 13, "name": "Social", "ongs": 0, },
    { "icon": <Trees color="#5C0D45" size={28} />, "id": 14, "name": "Meio Ambiente", "ongs": 0, },
    { "icon": <HeartPulse color="#5C0D45" size={28} />, "id": 15, "name": "Saúde", "ongs": 0, }]
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { ArrowRight, TriangleAlert, X } from 'lucide-react-native';
import { MotiView, AnimatePresence } from 'moti';
import { ActivityIndicator } from 'react-native-paper';
import { getNotifications, getSingleNotification } from '@request/user/notify';
import RenderHtml from 'react-native-render-html';

const { width, height } = Dimensions.get('window');

export default function NotifyScreen({ navigation, route }) {
    const { message } = route.params || {};
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(null);
    const [loading, setloading] = useState();
    const [showtabs, setshowtabs] = useState(true);
    const [cache, setcache] = useState();
    const [single, setsingle] = useState(false);
    const [alerts, setalerts] = useState();

    const handleAlertas = () => {
        setshowtabs(false)
        setTimeout(() => {
            settype('Alertas')
            setloading(true)
        }, 200);
        setTimeout(() => {
            setloading(false)
        }, 500);
    }

    const handleClean = () => {
        settype(null)
        setsingle(false)
        setTimeout(() => {
            setshowtabs(true)
        }, 600);
    }

    const handleItem = async (item) => {
        setsingle(true)
        try {
            const res = await getSingleNotification(item.id)
            console.log(res)
            setsingle(true)
            setcache(res)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await getNotifications()
                setalerts(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false);
            }
        }
        fecthData()
    }, [])



    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>

                <Header title='Notificações' rose />
                <Row style={{ paddingHorizontal: margin.h, }}>
                    <AnimatePresence>
                        {type != null && <MotiView transition={{ duration: 500, type: 'timing' }} from={{ opacity: 0, translateX: -30, }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, }}><Button onPress={handleClean} rippleColor={color.secundary} style={{ paddingVertical: 8, paddingHorizontal: 16, backgroundColor: color.primary + 20, marginTop: 12, borderRadius: 8, }} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Title style={{ color: color.primary, fontSize: 16, marginRight: 6, lineHeight: 18, fontFamily: 'Font_Bold' }}>{type}</Title>
                                <X color={color.primary} />
                            </Row>
                        </Button></MotiView>}
                    </AnimatePresence>
                </Row>

                {!single && <>
                    <AnimatePresence>
                        {showtabs && <MotiView from={{ opacity: 0, translateX: -20, }} transition={{ duration: 200, type: 'timing' }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20, }}><Column style={{ marginHorizontal: margin.h, marginVertical: 24, }}>
                            <Button onPress={handleAlertas} style={{ backgroundColor: color.primary + 20, borderRadius: 12, padding: 12, marginBottom: 0, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Column style={{ backgroundColor: color.primary, padding: 14, borderRadius: 12, marginRight: 20, }}>
                                            <TriangleAlert color="#fff" size={32} />
                                        </Column>
                                        <Column>
                                            <Title style={{ fontSize: 16, lineHeight: 18, }}>Alertas</Title>
                                            <Label style={{ fontSize: 12, lineHeight: 14, color: color.secundary + 99, }}>Fique de olho em alterações</Label>
                                        </Column>
                                    </Row>
                                    <Column style={{ width: 36, height: 36, borderRadius: 100, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                                        <ArrowRight size={18} color={color.title} />
                                    </Column>
                                </Row>
                            </Button>





                        </Column></MotiView>}
                    </AnimatePresence>

                    <AnimatePresence>
                        {type == 'Alertas' &&
                            <MotiView from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: 20, }} transition={{ type: 'timing' }}>
                                {loading ? <ActivityIndicator size="large" color={color.primary} style={{ marginTop: 24, }} />
                                    :
                                    <MotiView from={{ opacity: 0, translateY: 20, display: 'none' }} animate={{ opacity: 1, translateY: 0, display: 'block' }} delay={500}>
                                        <FlatList
                                            style={{ marginHorizontal: margin.h, marginTop: 12, }}
                                            data={alerts}
                                            ListFooterComponent={<Column style={{ width: 28, height: 70 }} />}
                                            renderItem={({ item }) => <Card item={item} handleItem={() => handleItem(item)} />}
                                            keyExtractor={(item) => item.id}
                                        />
                                    </MotiView>
                                }
                            </MotiView>}
                    </AnimatePresence>
                </>}

                <AnimatePresence>
                    {single &&
                        <MotiView from={{ opacity: 0, translateX: 20 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20 }} transition={{ type: 'timing' }}>
                            <Column style={{ marginHorizontal: margin.h, marginTop: 24, backgroundColor: '#f7f7f7', padding: 20, borderRadius: 12, width: 0.86 * width }}>
                                <Button onPress={() => setsingle(false)} style={{ padding: 6, position: 'absolute', top: 10, right: 10, backgroundColor: color.secundary, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                    <X size={18} color="#fff" />
                                </Button>
                                <Title style={{ fontSize: 16, lineHeight: 18, width: '80%', marginBottom: 6,}}>{cache?.title}</Title>
                                <RenderHtml
                                    contentWidth={0.8 * width}
                                    source={{ html: cache?.desc }}
                                />
                            </Column>
                        </MotiView>}
                </AnimatePresence>
            </Scroll>


        </Main>
    )
}

const Card = ({ item, handleItem }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const { date, title } = item
    return (
        <Button onPress={handleItem} style={{ padding: 20, borderRadius: 12, borderWidth: 1, borderColor: "#d7d7d7", marginBottom: 12, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Column style={{ justifyContent: 'center', width: '80%', }}>
                    <Title style={{ fontSize: 18, }}>{title?.length > 52 ? title.slice(0, 52) + '...' : title}</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, }}>{date}</Label>
                </Column>
                <Column style={{ width: 45, height: 45, backgroundColor: color.secundary + 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                    <ArrowRight size={24} color={color.secundary} />
                </Column>
            </Row>
        </Button>
    )
}

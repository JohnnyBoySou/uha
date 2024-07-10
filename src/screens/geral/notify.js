import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { ArrowLeft, ArrowRight, TriangleAlert, Mail, ArrowLeftRight, X, ImagePlus } from 'lucide-react-native';
import { MotiView, AnimatePresence, MotiImage } from 'moti';
import { ActivityIndicator } from 'react-native-paper';
import { getNotifications , getSingleNotification} from '@request/user/notify';

export default function NotifyScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(null);
    const [loading, setloading] = useState();
    const [showtabs, setshowtabs] = useState(true);
    const [cache, setcache] = useState();
    const [single, setsingle] = useState(false);
    const a = false;
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

    const handleItem = (item) => {
        getSingleNotification(item.id).then(res => {
            setcache(res)
            setsingle(true)
        })
    }


    const [alerts, setalerts] = useState();
    useEffect(()=> {
        const fecthData = () => {
            getNotifications().then(res => {
                setalerts(res)
            })
        }
        fecthData()
    },[])







    return (
        <Main style={{backgroundColor: '#fff', }}>
            <Scroll>

                <Header title='Notificações' rose/>
                <Row style={{ paddingHorizontal: margin.h, }}>
                    <AnimatePresence>
                        {type != null && <MotiView  transition={{ duration: 500, type: 'timing'}} from={{ opacity: 0, translateX: -30, }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, }}><Button onPress={handleClean} rippleColor={color.secundary} style={{ paddingVertical: 8, paddingHorizontal: 16, backgroundColor: color.primary + 20, marginTop: 12, borderRadius: 8, }} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Title style={{ color: color.primary, fontSize: 18, marginRight: 6, }}>{type}</Title>
                                <X color={color.primary} />
                            </Row>
                        </Button></MotiView>}
                    </AnimatePresence>
                </Row>

                {!single && <>
                    <AnimatePresence>
                        {showtabs && <MotiView from={{ opacity: 0, translateX: -20, }} transition={{ duration: 200, type: 'timing'}} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20, }}><Column style={{ marginHorizontal: margin.h, marginVertical: 24, }}>
                            <Button onPress={handleAlertas} style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 0, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Column style={{ backgroundColor: color.primary, padding: 18, borderRadius: 12, marginRight: 20, }}>
                                            <TriangleAlert color="#fff" size={38} />
                                        </Column>
                                        <Column>
                                            <Title style={{ fontSize: 20, }}>Alertas</Title>
                                            <Label style={{ fontSize: 16, }}>Fique de olho em alterações</Label>
                                        </Column>
                                    </Row>
                                    <ArrowRight size={24} color={color.title} />
                                </Row>
                            </Button>

                            {a && <>
                                <Button onPress={() => { settype('Mensagens') }} style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <Column style={{ backgroundColor: color.secundary, padding: 18, borderRadius: 12, marginRight: 20, }}>
                                                <Mail color={color.primary} size={38} />
                                            </Column>
                                            <Column>
                                                <Title style={{ fontSize: 20, }}>Mensagens</Title>
                                                <Label style={{ fontSize: 16, }}>Todas as novidades estão aqui</Label>
                                            </Column>
                                        </Row>

                                        <ArrowRight size={24} color={color.title} />
                                    </Row>
                                </Button>
                                <Button onPress={() => { settype('Movimentações') }} style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <Column style={{ backgroundColor: '#FFE0F6', padding: 18, borderRadius: 12, marginRight: 20, }}>
                                                <ArrowLeftRight color={color.secundary} size={38} />
                                            </Column>
                                            <Column>
                                                <Title style={{ fontSize: 20, }}>Movimentações</Title>
                                                <Label style={{ fontSize: 16, }}>Acompanhe suas transações</Label>
                                            </Column>
                                        </Row>

                                        <ArrowRight size={24} color={color.title} />
                                    </Row>
                                </Button>
                                <Button onPress={() => { settype('Rifas') }} style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <Column style={{ backgroundColor: '#fff', padding: 18, borderRadius: 12, marginRight: 20, }}>
                                                <MotiImage source={require('@icons/ac7.png')} style={{ width: 32, height: 32, objectFit: 'contain' }} />
                                            </Column>
                                            <Column>
                                                <Title style={{ fontSize: 20, }}>Números da sorte</Title>
                                                <Label style={{ fontSize: 16, }}>Acompanhe suas rifas</Label>
                                            </Column>
                                        </Row>

                                        <ArrowRight size={24} color={color.title} />
                                    </Row>
                                </Button>
                            </>}



                        </Column></MotiView>}
                    </AnimatePresence>

                    <AnimatePresence>
                        {type == 'Alertas' &&
                            <MotiView from={{ opacity: 0, translateY: -20, }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: 20, }} transition={{type: 'timing'}}>
                                {loading ? <ActivityIndicator size="large" color={color.primary} style={{ marginTop: 24, }} />
                                    :
                                    <MotiView from={{ opacity: 0, translateY: 20, display: 'none' }} animate={{ opacity: 1, translateY: 0, display: 'block' }} delay={500}>
                                        <FlatList
                                            style={{ marginHorizontal: margin.h, marginTop: 12, }}
                                            data={alerts}
                                            renderItem={({ item }) => <Card item={item} handleItem={() => handleItem(item)} />}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </MotiView>
                                }
                            </MotiView>}
                    </AnimatePresence>
                </>}
                <AnimatePresence>
                    {single && <MotiView from={{ opacity: 0, translateX: 20 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20 }} transition={{type: 'timing'}}>
                        <Column style={{ marginHorizontal: margin.h, marginTop: 24,  backgroundColor: '#fff', padding: 20, borderRadius: 12, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Column style={{ paddingRight: 12, }}>
                                    <Title style={{ fontSize: 18, lineHeight: 20, }}>{cache.title}</Title>
                                    <Label style={{ fontSize: 14, }}>{cache.date} - Publicado em {cache.publish_date}</Label>
                                </Column>
                                <Button onPress={() => setsingle(false)} style={{ padding: 6, backgroundColor: color.secundary, borderRadius: 100, justifyContent: 'center', alignItems: 'center',  }}>
                                    <X size={24} color="#fff" />
                                </Button>
                            </Row>
                            <MotiImage source={{uri: cache?.img}} style={{ width: 300, height: 140, objectFit: 'cover', alignSelf: 'center', marginVertical: 12, borderRadius: 12,  }} />
                            <Label style={{ fontSize: 14, marginTop: 6, }}>{cache?.desc}</Label>
                        </Column>
                    </MotiView>}
                </AnimatePresence>
            </Scroll>


        </Main>
    )
}


const Card = ({ item, handleItem }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Button onPress={handleItem} >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                <Column>
                    <Title style={{ fontSize: 20, }}>{item.title}</Title>
                    <Label style={{ fontSize: 16 }}>{item.date}</Label>
                </Column>
                <ArrowRight size={24} color="#111" />
            </Row>
        </Button>
    )
}
import React, { useContext, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';

import { ArrowLeft, ArrowRight, TriangleAlert, Mail, ArrowLeftRight, X, ImagePlus } from 'lucide-react-native';
import { MotiView, AnimatePresence } from 'moti';
import { ActivityIndicator } from 'react-native-paper';

export default function NotifyScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(null);
    const [alertas, setalertas] = useState([]);
    const [loading, setloading] = useState();
    const [showtabs, setshowtabs] = useState(true);
    const [cache, setcache] = useState();
    const [single, setsingle] = useState(false);
    
    const handleAlertas = () => {
        setshowtabs(false)
        setTimeout(() => {
            settype('Alertas')
            setloading(true)
        }, 200);
        setTimeout(() => {
            setloading(false)
            setalertas(Alerts)
        }, 2000);
    }

    const handleClean = () => {
        settype(null)
        setalertas([])
        setsingle(false)
        setTimeout(() => {
            setshowtabs(true)
        }, 600);
    }

    const handleItem = (item) => {
        setcache(item)
        setsingle(true)
    }
    
    return (
        <Main style={{ marginTop: -10, }}>
                <Header title='Notificações' />
                <Row style={{ paddingHorizontal: margin.h, }}>
                    <AnimatePresence>
                        {type != null && <MotiView transition={{duration: 500, }} from={{opacity: 0, translateX: -30,}} animate={{opacity: 1, translateX: 0}} exit={{opacity: 0, }}><Button onPress={handleClean} rippleColor={color.secundary}  style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: color.primary+20, marginTop: 12,  borderRadius: 100,}} >
                                <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Title style={{ color: color.primary, fontSize: 18, marginRight: 6,}}>{type}</Title>
                                    <X color={color.primary}/>
                                </Row>
                            </Button></MotiView>}
                    </AnimatePresence>
                </Row>

            {!single && <>
                <AnimatePresence>
                    {showtabs && <MotiView  from={{opacity: 0, translateX: -20,}} transition={{duration: 200,}} animate={{opacity: 1, translateX: 0}} exit={{opacity: 0, translateX: 20,}}><Column style={{ marginHorizontal: margin.h, marginVertical: 24, }}>
                        <Button onPress={handleAlertas}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 0, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Column style={{ backgroundColor: color.primary,padding: 18, borderRadius: 12,  marginRight: 20,}}>
                                        <TriangleAlert color="#fff" size={38}/>
                                    </Column>
                                    <Column>
                                        <Title style={{ fontSize: 20, }}>Alertas</Title>
                                        <Label style={{ fontSize: 16, }}>Fique de olho em alterações</Label>
                                    </Column>
                                </Row>
                                <ArrowRight size={24} color={color.title} />
                            </Row>
                        </Button>
                        <Button onPress={() => {settype('Mensagens')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Column style={{ backgroundColor: color.secundary,padding: 18, borderRadius: 12, marginRight: 20, }}>
                                        <Mail  color={color.primary} size={38}/>
                                    </Column>
                                    <Column>
                                        <Title style={{ fontSize: 20, }}>Mensagens</Title>  
                                        <Label style={{ fontSize: 16, }}>Todas as novidades estão aqui</Label>
                                    </Column>
                                </Row>

                                <ArrowRight size={24} color={color.title} />
                            </Row>
                        </Button>
                        <Button onPress={() => {settype('Movimentações')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Column style={{ backgroundColor: color.primary+20,padding: 18, borderRadius: 12, marginRight: 20, }}>
                                        <ArrowLeftRight color={color.secundary} size={38}/>
                                    </Column>
                                    <Column>
                                        <Title style={{ fontSize: 20, }}>Movimentações</Title>
                                        <Label style={{ fontSize: 16, }}>Acompanhe suas transações</Label>
                                    </Column>
                                </Row>

                                <ArrowRight size={24} color={color.title} />
                            </Row>
                        </Button>
                    </Column></MotiView>}
                </AnimatePresence>

                <AnimatePresence>
                    {type == 'Alertas' && 
                    <MotiView from={{opacity: 0, translateY: -20,}} animate={{opacity: 1, translateY: 0}} exit={{opacity: 0, translateY: 20,}} >
                        {loading ? <ActivityIndicator size="large" color={color.primary} style={{ marginTop: 24,  }} />
                        :
                        <MotiView from={{opacity: 0, translateY: 20, display: 'none'}} animate={{opacity: 1, translateY: 0, display: 'block'}} delay={500}>
                            <FlatList
                                style={{ marginHorizontal: margin.h, marginTop: 12, }}
                                data={alertas}
                                renderItem={({ item }) => <Card item={item} handleItem={() => handleItem(item)}/>}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </MotiView>
                        }
                    </MotiView>}
                </AnimatePresence>
                </>}

                <AnimatePresence>

            {single && <MotiView from={{opacity: 0, translateX: 20}} animate={{opacity: 1, translateX: 0}} exit={{opacity: 0, translateX: 20}}>
                        <Button onPress={() => setsingle(false)} style={{ position: 'absolute', top: 0, right: 0, padding: 12, }}>
                            <X size={24} color={color.title} />
                        </Button>
                        <Column style={{ marginHorizontal: margin.h, marginTop: 24, }}>
                            <Title style={{ fontSize: 20, }}>{cache.title}</Title>
                            <Label style={{ fontSize: 16, }}>{cache.date} - Publicado em {cache.publish_date}</Label>
                            <Column style={{ flexGrow: 1, height: 140, backgroundColor: color.primary+40, borderRadius: 24, marginVertical: 12, justifyContent: 'center', alignItems: 'center',  }}>
                                <ImagePlus size={32} color={color.secundary}/>
                            </Column>
                            <Title style={{ textAlign: 'center', color: color.red, marginVertical: 8, }}>Termina em {cache.finish}</Title>
                            <Label style={{ fontSize: 16, marginTop: 12, }}>{cache.desc}</Label>
                        </Column>
                    </MotiView>}
                </AnimatePresence>


        </Main>
    )
}

const Alerts = [
    {
        title: 'Aproveite ofertas relâmpago',
        date: 'Há 2 dias',
        finish: '10h',
        publish_date: '09/05/2024',
        desc: 'Seja bem-vindo! Confira ofertas incríveis por tempo limitado que o app oferece: comece agora mesmo a configurar seus produtos e serviços favoritos!',
    },
    {
        title: 'Acompanhe novas ofertas',
        date: 'Há 5 dias',
        finish: '10h',
        publish_date: '02/04/2024',
        desc: 'Seja bem-vindo! Confira ofertas incríveis por tempo limitado que o app oferece: comece agora mesmo a configurar seus produtos e serviços favoritos!',

    },
    {
        title: 'Sua indicação vale o dobro',
        date: 'Há 2 semanas',
        finish: '10h',
        publish_date: '10/10/2024',
        desc: 'Seja bem-vindo! Confira ofertas incríveis por tempo limitado que o app oferece: comece agora mesmo a configurar seus produtos e serviços favoritos!',

    },
    {
        title: 'Seus favoritos voltaram',
        date: 'Há 1 mês',	
        finish: '10h',
        publish_date: '20/12/2024',
        desc: 'Seja bem-vindo! Confira ofertas incríveis por tempo limitado que o app oferece: comece agora mesmo a configurar seus produtos e serviços favoritos!',

    },
    
]

const Card = ({ item, handleItem }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Button onPress={handleItem} >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  borderBottomWidth: 2, borderBottomColor: color.off, paddingBottom: 12, marginTop: 12, }}> 
            <Column>
                <Title style={{ fontSize: 20, }}>{item.title}</Title>
                <Label style={{ fontSize: 16}}>{item.date}</Label>
            </Column>
            <ArrowRight size={24} color="#111" />
            </Row>
        </Button>
    )
}
import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Info, ArrowLeft, CircleHelp, CircleAlert } from 'lucide-react-native';
import { getExtractSingle } from '@request/extract/gets';
import { MotiImage, MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import { useNavigation } from '@react-navigation/native';

export default function ExtractSingleScreen({ id, type }) {

    const { color, font, } = useContext(ThemeContext);
    const [item, setitem] = useState();
    const [ong, setong] = useState();
    const [shop, setshop] = useState();
    const [service, setservice] = useState();
    const [loading, setloading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await getExtractSingle(type, id);
                setservice(res?.service);
                setshop(res?.shop);
                setong(res?.ong.length == 1 ? res?.ong[0] : res?.ong);
                setitem(res);
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    setloading(false);
                }, 500);
            }
        }
        if (id != undefined) {
            fetchData()
        }
    }, [id, type]);

    const formatValue = (val) => {
        return parseInt(val).toLocaleString('pt-BR');
    };
    const cl = item?.status === 'Confirmado' ? color.green : item?.status === 'Aguardando' ? color.blue : item?.status === 'Cancelado' ? color.red : item?.status === 'Expirado' ? '#000000' : item?.status === 'Confirmado' ? color.green : item?.status === 'Aguardando' ? color.blue : item?.status === 'Confirmado' ? color.green : item?.status === 'Pagamento confirmado' ? color.green : item?.status === 'Pagamento em análise' ? color.blue : '#ffffff'
    const icon = item?.status === 'Confirmado' ? <Feather color={color.green} name='check' size={46} /> : item?.status === 'Aguardando' ? <Info color={color.blue} size={46} /> : item?.status === 'Cancelado' ? <Feather name='x' size={46} color={color.red} /> : item?.status === 'Expirado' ? <Feather name='loader' color="#000000" size={46} /> : item?.status === 'Pagamento confirmado' ? <Feather color={color.green} name='check' size={46} /> : item?.status === 'Pagamento em análise' ? <Info color={color.blue} size={46} /> : null
    const vl = type == 'Notas fiscais' ? item?.value + ' ponto' : type == 'Transações' ? item?.value + ' pontos' : type == 'Doações' ? 'R$ ' + formatValue(item?.value.slice(0, -3)) + ',00' : null

    const openQRCode = () => {
        const itm = {
            date: item?.date,
            code: item?.code,
            gerador: 'App',
            shop: {
                img: shop?.img,
                name: shop?.name,
                id: shop?.id,
            },
            product: {
                name: service?.name,
                value: service?.pontos + '000',
                img: service?.img,
                id: service?.id,
            },
        }
        navigation.navigate('ShopQRCode', { item: itm })
    }

    if (loading) return <SkeletonList />
    return (
        <Main style={{ backgroundColor: '#fff', zIndex: 99, }}>
            <Scroll style={{ paddingTop: 10, }}>
                <Column >
                    <Title style={{ color: color.secundary, fontSize: 20, lineHeight: 22, textAlign: 'center', }}>{item?.type}</Title>
                    <Label style={{ color: color.secundary, fontSize: 12, lineHeight: 14, textAlign: 'center', }}>{item?.date}</Label>

                    <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} transition={{ type: 'spring', }} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: cl + 10, width: 152, height: 152, borderRadius: 100, alignSelf: 'center', }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: cl + 30, width: 102, height: 102, borderRadius: 100, alignSelf: 'center', }}>
                            {icon}
                        </Column>
                    </MotiView>

                    <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0 }} delay={500} >
                        <Label style={{ color: cl, fontSize: 18, textAlign: 'center', marginTop: 16, fontFamily: 'Font_Bold', letterSpacing: -0.5, }}>{item?.status}</Label>
                        <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 46, color: cl, textAlign: 'center', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: cl + 10, alignSelf: 'center', textAlign: 'center', borderRadius: 12, marginVertical: 12, }}>{vl}</Title>
                    </MotiView>

                </Column>

                {type == 'Doações' &&
                    <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0 }} delay={800} style={{ paddingVertical: 12, }}>
                        <Column>
                            <Button onPress={() => { navigation.navigate('ONGSingle', { id: ong.id, }) }} style={{ borderColor: '#D7D7D7', backgroundColor: '#fff', borderWidth: 1, borderRadius: 12, zIndex: 2, marginBottom: 12, }} >
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12, }}>
                                    <Row>
                                        <MotiImage source={{ uri: ong?.img }} style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover', }} />
                                        <Column style={{ marginLeft: 12, justifyContent: 'center', }}>
                                            <Title style={{ fontSize: 18, }}>{ong?.name?.slice(0, 24)}</Title>
                                            <Button style={{ backgroundColor: color.primary + 20, alignSelf: 'flex-start', borderRadius: 100, paddingVertical: 2, marginTop: 8, paddingHorizontal: 12, }}>
                                                <Title style={{ color: color.primary, fontSize: 12, }}>Conhecer ONG</Title>
                                            </Button>
                                        </Column>
                                    </Row>

                                    <Column style={{ borderBottomLeftRadius: 8, backgroundColor: color.primary, paddingHorizontal: 8, paddingVertical: 4, position: 'absolute', top: 0, right: 0, }}>
                                        <LabelPR style={{ fontSize: 12, fontFamily: 'Font_Medium', marginRight: 4, }}>ONG</LabelPR>
                                    </Column>
                                </Row>
                            </Button>



                            {item?.status === 'Pagamento confirmado' &&
                            <Column style={{ marginVertical: 12, }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                <CircleAlert color={color.label + 90} size={18} />
                                <Label style={{ fontSize: 14, lineHeight: 16, marginLeft: 8, }}>Os pontos já foram {'\n'}adicionados em sua conta.</Label>
                            </Row>
                            <ButtonPR onPress={() => { navigation.navigate('Donate') }} style={{ alignSelf: 'center', }}>
                                        <LabelPR style={{ fontSize: 16, }}>Nova doação</LabelPR>
                                    </ButtonPR>
                            </Column>
                            }


                            {item.status == 'Pagamento em análise' &&
                                <Column style={{ marginVertical: 12, }}>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                        <CircleAlert color={color.label + 90} size={24} />
                                        <Label style={{ fontSize: 14, lineHeight: 16, marginLeft: 8,  }}>Os pontos são adicionados após efetuar o pagamento.</Label>
                                    </Row>
                                    <ButtonPR onPress={() => { navigation.navigate('ExtractPayment', { id: item.id, type: type, }) }} style={{ alignSelf: 'center', }}>
                                        <LabelPR style={{ fontSize: 16, }}>Efetuar pagamento</LabelPR>
                                    </ButtonPR>
                                </Column>
                            }

                        </Column>
                    </MotiView>
                }

                {type == 'Transações' &&
                    <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0 }} delay={800}>
                        <Column style={{ paddingVertical: 12, }}>
                            <Column>
                                <Button onPress={() => { navigation.navigate('ShopServiceSingle', { id: service.id, }) }} style={{ borderColor: '#D7D7D7', backgroundColor: '#fff', borderWidth: 1, borderRadius: 16, zIndex: 2, }} >
                                    <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12, }}>
                                        <Row>
                                            <MotiImage source={{ uri: service?.img }} style={{ width: 106, height: 106, borderRadius: 8, objectFit: 'cover', }} />
                                            <Column style={{ marginLeft: 12, justifyContent: 'center', }}>
                                                <Title style={{ fontSize: 18, }}>{service?.name.slice(0, 24)}</Title>
                                                <Title style={{ color: color.primary, fontSize: 16, }}>{service?.pontos} pontos</Title>
                                                <Button style={{ backgroundColor: color.primary + 20, alignSelf: 'flex-start', borderRadius: 100, paddingVertical: 2, marginTop: 8, paddingHorizontal: 12, }}>
                                                    <Title style={{ color: color.primary, fontSize: 12, }}>Comprar novamente</Title>
                                                </Button>
                                            </Column>
                                        </Row>
                                    </Row>
                                </Button>
                                <Button onPress={() => { navigation.navigate('ShopSingle', { id: shop.id, }) }} style={{ backgroundColor: '#f7f7f7', borderRadius: 16, paddingTop: 30, marginTop: -30, marginBottom: 10, marginHorizontal: 14, }} >
                                    <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12, }}>
                                        <Row>
                                            <MotiImage source={{ uri: shop?.img }} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', }} />
                                            <Column style={{ marginLeft: 12, justifyContent: 'center', }}>
                                                <Title style={{ fontSize: 18, }}>{shop?.name.slice(0, 24)}</Title>
                                                <Label style={{ fontSize: 14, color: color.secundary + 99, }}>Ver mais</Label>
                                            </Column>
                                        </Row>
                                        <Column style={{ borderTopLeftRadius: 8, backgroundColor: color.primary, paddingHorizontal: 8, paddingVertical: 4, position: 'absolute', bottom: 0, right: 0, }}>
                                            <LabelPR style={{ fontSize: 12, fontFamily: 'Font_Medium', marginRight: 4, }}>Estabelecimento</LabelPR>
                                        </Column>
                                    </Row>
                                </Button>
                            </Column>
                        </Column>
                        <Column >
                            {item?.status === 'Aguardando' && <>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                    <CircleAlert color={color.label + 90} size={18} />
                                    <Label style={{ fontSize: 14, textAlign: 'center', marginLeft: 4, }}>Você ainda não utilizou esse serviço.</Label>
                                </Row>
                                <ButtonPR onPress={openQRCode} style={{ alignSelf: 'center', }}>
                                    <LabelPR style={{ fontSize: 16, }}>Abrir QRCode</LabelPR>
                                </ButtonPR>
                            </>}
                        </Column>
                    </MotiView>
                }

                {type == 'Notas fiscais' &&
                    <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0 }} delay={800} style={{ paddingVertical: 12, }}>
                        <Column>
                            <Button onPress={() => { navigation.navigate('ONGSingle', { id: ong.id, }) }} style={{ borderColor: '#D7D7D7', backgroundColor: '#fff', borderWidth: 1, borderRadius: 12, zIndex: 2, marginBottom: 12, }} >
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12, }}>
                                    <Row>
                                        <MotiImage source={{ uri: ong?.img }} style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover', }} />
                                        <Column style={{ marginLeft: 12, justifyContent: 'center', }}>
                                            <Title style={{ fontSize: 18, }}>{ong?.name.slice(0, 24)}</Title>
                                            <Button style={{ backgroundColor: color.primary + 20, alignSelf: 'flex-start', borderRadius: 100, paddingVertical: 2, marginTop: 8, paddingHorizontal: 12, }}>
                                                <Title style={{ color: color.primary, fontSize: 12, }}>Conhecer ONG</Title>
                                            </Button>
                                        </Column>
                                    </Row>

                                    <Column style={{ borderBottomLeftRadius: 8, backgroundColor: color.primary, paddingHorizontal: 8, paddingVertical: 4, position: 'absolute', top: 0, right: 0, }}>
                                        <LabelPR style={{ fontSize: 12, fontFamily: 'Font_Medium', marginRight: 4, }}>ONG</LabelPR>
                                    </Column>
                                </Row>
                            </Button>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                <CircleAlert color={color.label + 90} size={18} />
                                <Label style={{ fontSize: 14, textAlign: 'center', marginLeft: 4, }}>Esse valor já foi adicionado em sua conta.</Label>
                            </Row>
                            <ButtonPR onPress={() => { navigation.navigate('NotafiscalSend') }} style={{ alignSelf: 'center', }}>
                                <LabelPR style={{ fontSize: 16, }}>Enviar nova nota fiscal</LabelPR>
                            </ButtonPR>

                        </Column>
                    </MotiView>}

            </Scroll>
        </Main>
    )
}


const SkeletonList = () => {
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Row style={{ justifyContent: 'center', marginHorizontal: 28, marginVertical: 22, alignItems: 'center', }}>
                <Skeleton height={50} width={160} radius={8} colorMode='light' />
            </Row>
            <Skeleton height={160} width={160} radius={160} colorMode='light' />
            <Column style={{ height: 12, }} />
            <Skeleton height={70} width={230} radius={12} colorMode='light' />
            <Column style={{ height: 12, }} />
            <Skeleton height={40} width={180} radius={12} colorMode='light' />
            <Column style={{ height: 32, }} />
            <Skeleton height={100} width={300} radius={12} colorMode='light' />
            <Column style={{ height: 12, }} />
            <Skeleton height={70} width={230} radius={12} colorMode='light' />
        </Column>
    )
}
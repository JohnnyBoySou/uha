import React, { useContext, useEffect, useState, } from 'react';
import { FlatList, Pressable,  } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonSE, LabelSE, SubLabel, Button, LineL, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import Check from '@components/check';
import { CircleCheck, MessagesSquare, Info, ScrollText, Moon, CircleX, LogOut, HeartHandshake, ShoppingBag } from 'lucide-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { listUser } from '@api/request/user/user';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image} from 'expo-image'

export default function AccountScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [user, setuser] = useState();
    const isFocused = useIsFocused();
    const [loading, setloading] = useState();
    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const user = await listUser();
                setuser(user);
            } catch (error) {
                console.log(error)
            } finally{
                setloading(false)
            }
        }
        fecthData();
    }, [isFocused]);

    const [dark, setdark] = useState(false);

    return (
        <Main style={{ backgroundColor: color.background, }}>
            <StatusBar style="dark" backgroundColor="#fff" animated />
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <Title>Minha conta</Title>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Notify />
                        <Column style={{ width: 16, }} />
                        <Avatar />
                    </Row>
                </Row>

                <Column from={{ opacity: 0, translateX: 20 }} animate={{ opacity: 1, translateX: 0, }} delay={200} style={{ backgroundColor: color.primary, paddingHorizontal: 20, paddingVertical: 16, borderRadius: 24, marginHorizontal: margin.h, marginVertical: 18, }}>
                    <Label style={{ color: "#fff", }}>Pontos disponíveis para uso</Label>
                    <Title style={{ fontSize: 32, fontFamily: font.bold, lineHeight: 34, marginBottom: 6, color: "#fff", }}>{user?.PontosAtuais}</Title>
                    <LineL />
                    <Label style={{ color: "#fff", marginTop: 12, }}>Notas fiscais doadas</Label>
                    <Label style={{ color: "#fff", }}>{user?.NotasDoadas}</Label>
                    <ButtonSE onPress={() => { navigation.navigate('Shop') }} style={{ marginTop: 24, alignSelf: 'flex-end', paddingHorizontal: 32, }}  >
                        <LabelSE style={{ color: color.background, }}>Utilizar pontos</LabelSE>
                    </ButtonSE>
                </Column>

                <Column from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0, }} delay={600}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                        <Button onPress={() => { navigation.navigate('ONGS') }} style={{ flexGrow: 1, }}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Column style={{ padding: 20, paddingVertical: 30, width: '100%', marginBottom: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFE0F6", borderRadius: 12, }}>
                                    <HeartHandshake color={color.primary} size={36} />
                                </Column>
                                <SubLabel>ONGs</SubLabel>
                            </Column>
                        </Button>
                        <Button onPress={() => { navigation.navigate('Stickers') }} style={{ flexGrow: 1, }}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, marginHorizontal: 20, }}>
                                <Column style={{ padding: 20, paddingVertical: 30, width: '100%', marginBottom: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFE0F6", borderRadius: 12, }}>
                                <MaterialCommunityIcons name="sticker-emoji" size={32} color={color.primary}/>
                                </Column>
                                <SubLabel>Stickers</SubLabel>
                            </Column>
                        </Button>
                        <Button onPress={() => { navigation.navigate('Favorites') }} style={{ flexGrow: 1, }}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                <Column style={{ padding: 20, paddingVertical: 30, width: '100%', marginBottom: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFE0F6", borderRadius: 12, }}>
                                    <AntDesign name="hearto" size={32} color={color.primary} />
                                </Column>
                                <SubLabel>Favoritos</SubLabel>
                            </Column>
                        </Button>
                    </Row>
                </Column>

                <Column style={{ marginHorizontal: margin.h, marginVertical: 24, }}>
                    <Column from={{ opacity: 0, translateX: 30 }} animate={{ opacity: 1, translateX: 0, }} delay={1000}>
                        <Title style={{ fontSize: 18, }}>Configurações</Title>
                    </Column>
                    <FlatList
                        style={{ marginTop: 12, }}
                        data={Configs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <Card item={item} index={index} />}
                    />


                   
                    <FlatList
                        style={{}}
                        data={Links}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CardRow item={item} />}
                    />
                    <Row style={{ alignItems: 'center', marginVertical: 8, justifyContent: 'space-between', }}>
                        <Button onPress={() => { navigation.replace('Onboarding') }} >
                            <Row style={{ alignItems: 'center', }}>
                                <LogOut size={24} color="#5C0D45" />
                                <Title style={{ fontSize: 18, marginLeft: 12, }}>Sair ou Trocar de conta</Title>
                            </Row>
                        </Button>
                        <Pressable >
                            <Avatar />
                        </Pressable>
                    </Row>
                </Column>


                <Column style={{ height: 120, width: 1, }} />
            </Scroll>
        </Main>
    )
}

const Card = ({ item, index }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Column from={{ opacity: 0, translateX: 30 }} animate={{ opacity: 1, translateX: 0, }} delay={(index + 3) * 600}>
            <Button onPress={() => { navigation.navigate(item.screen) }} >
                <Row style={{ marginBottom: 12, borderBottomWidth: 2, borderBottomColor: "#00000012", alignItems: 'center', paddingBottom: 12, }}>
                    <Column style={{ padding: 18, borderRadius: 12, backgroundColor: "#FFE0F6", }}>
                        <Image contentFit='contain' source={item.img} style={{ width: 28, height: 28,  }} />
                    </Column>
                    <Column style={{ marginHorizontal: 20, }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Title style={{ fontSize: 16, marginRight: 6, }}>{item?.title}</Title>
                            {item.check && <CircleCheck color={color.primary} size={18} />}
                            {item.check == false && <CircleX color={color.red} size={18} />}
                        </Row>
                        <Label style={{ fontSize: 14, marginTop: -5, color: color.secundary + 99, }}>{item?.description}</Label>
                    </Column>
                </Row>
            </Button>
        </Column>
    )
}

const CardRow = ({ item }) => {
    const navigation = useNavigation();
    return (
        <Button onPress={() => { navigation.navigate(item?.screen) }} >
            <Row style={{ alignItems: 'center', marginVertical: 8, }}>
                {item.icon}
                <Title style={{ fontSize: 18, marginLeft: 12, }}>{item.title}</Title>
            </Row>
        </Button>
    )
}

const Configs = [
    {
        title: 'Dados cadastrais',
        description: 'Edite seu avatar e infos',
        icon: 'user',
        check: null,
        screen: 'AccountDetails',
        img: require('@icons/ic1.png'),
    },
    {
        title: 'Sobre nós',
        description: 'Conheça a Uha!',
        icon: 'bell',
        check: null,
        screen: 'About',
        img: require('@icons/ic3.png'),
    },
    {
        title: 'Notificações',
        description: 'Configure como desejar ',
        icon: 'bell',
        check: null,
        screen: 'AccountNotify',
        img: require('@icons/ic2.png'),
    },
  
    
    {
        title: 'Indique e ganhe',
        description: 'Participe da campanha',
        icon: 'log-out',
        check: null,
        screen: 'Share',
        img: require('@icons/ic7.png'),
    },
]

const Links = [
    {
        title: 'Central de ajuda',
        icon: <Info size={24} color="#5C0D45" />,
        screen: 'AccountFAQ',
    },
    {
        title: 'Feedback e sugestões',
        icon: <MessagesSquare size={24} color="#5C0D45" />,
        screen: 'Questions',
    },
    {
        title: 'Acesso à informação',
        icon: <Info size={24} color="#5C0D45" />,
        screen: 'AccountAccess',
    },
    {
        title: 'Termos e condições',
        icon: <ScrollText size={24} color="#5C0D45" />,
        screen: 'AccountTerms',
    },
]


/**
 *  {
        title: 'Histórico de Pontos',
        description: 'Acompanhe as movimentações',
        icon: 'log-out',
        check: true,
        screen: 'Extract',
        img: require('@icons/ic5.png'),
    },
    {
        title: 'Histórico de Rifas',
        description: 'Acompanhe ganhos e gastos',
        icon: 'log-out',
        check: true,
        screen: 'Extract',
        img: require('@icons/ic5.png'),
    },
 */
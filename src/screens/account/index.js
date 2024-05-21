import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Avatar from '@components/avatar';
import Check from '@components/check';
import { ImagePlus, CircleCheck, MessagesSquare, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';

export default function AccountScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    const user = {
        name: 'João Sousa',
        email: 'email@example.com',
        balance: '30,00',
        cashback: '10,00',
    }

    const [dark, setdark] = useState(false);
    return (
        <Main>
            <Scroll>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                    <Title>Olá, João Sousa</Title>
                    <Row style={{ justifyContent: 'center', alignItems: 'center',  }}> 
                        <Button style={{ marginRight: 20, }} onPress={() => {navigation.navigate('Notify')}} >
                            <Bell strokeWidth={2} color="#111" size={32} />
                        </Button>
                        <Avatar />
                    </Row>
                </Row>
                <Column style={{backgroundColor: color.primary, paddingHorizontal: 20, paddingVertical: 16, borderRadius: 24, marginHorizontal: margin.h, marginVertical: 18, }}>
                    <Label style={{ color: color.title, }}>Saldo em conta</Label>
                    <Title style={{ fontSize: 32, fontFamily: font.bold,  }}>R$ {user?.balance}</Title>
                    <LineD />
                    <Label style={{ color: color.title, marginTop: 12, }}>Saldo em cashback</Label>
                    <Label style={{ color: color.title, }}>R$ {user?.cashback}</Label>
                    <ButtonSE style={{ marginTop: 24, alignSelf: 'flex-end', paddingHorizontal: 32,}} onPress={() => {}} >
                        <LabelSE >Resgatar</LabelSE>
                    </ButtonSE>
                </Column>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ padding:42, marginBottom: 8,  justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary+30, borderRadius: 12, }}>
                            <ImagePlus color={color.primary} size={32}/>
                        </Column>
                        <SubLabel>Campanhas</SubLabel>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ padding:42, marginBottom: 8,  justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary+30, borderRadius: 12, }}>
                            <ImagePlus color={color.primary} size={32}/>
                        </Column>
                        <SubLabel>Doações</SubLabel>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ padding:42, marginBottom: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary+30, borderRadius: 12, }}>
                            <ImagePlus color={color.primary} size={32}/>
                        </Column>
                        <SubLabel>Favoritos</SubLabel>
                    </Column>
                </Row>


                <Column style={{ marginHorizontal: margin.h, marginVertical: 24,}}>
                    <Title>Configurações</Title>
                    <FlatList
                        style={{ marginTop: 12, }}
                        data={Configs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Card item={item} />}
                    />
                   

                   <Row style={{alignItems: 'center', marginVertical: 8, justifyContent: 'space-between',  }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Moon size={24} color="#111"/>
                            <Title style={{ fontSize: 18, marginLeft: 12, }}>Modo de luz escuro</Title>
                        </Row>
                        <Pressable onPress={() => setdark(!dark)}>
                            <Check status={dark}  />
                        </Pressable>
                    </Row>
                    <FlatList 
                        style={{ }}
                        data={Links}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CardRow item={item} />}
                    />
                     <Row style={{alignItems: 'center', marginVertical: 8, justifyContent: 'space-between',  }}>
                        <Row style={{ alignItems: 'center', }}>
                            <LogOut size={24} color="#111"/>
                            <Title style={{ fontSize: 18, marginLeft: 12, }}>Sair ou Trocar de conta</Title>
                        </Row>
                        <Pressable >
                            <Avatar   />
                        </Pressable>
                    </Row>
                </Column>

            </Scroll>
        </Main>
    )
}

const Card = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);

    return(
    <Row style={{ marginBottom: 12, borderBottomWidth: 2, borderBottomColor: color.off, alignItems: 'center', paddingBottom: 12,  }}>
        <Column style={{ padding: 18, borderRadius: 12, backgroundColor: color.off, }}>
            <ImagePlus color={color.primary} size={32}/>    
        </Column>
        <Column style={{ marginHorizontal: 20, }}>
            <Row style={{  alignItems: 'center',  }}>
                <Title style={{ fontSize: 18, marginRight: 6, }}>{item?.title}</Title>
                {item.check && <CircleCheck color={color.primary} size={18}/> }
                {item.check == false && <CircleX color={color.red} size={18}/> }
            </Row>
            <Label style={{ fontSize: 14, }}>{item?.description}</Label>
        </Column>
    </Row>
)}


const CardRow = ({ item }) => {
return(
    <Row style={{  alignItems: 'center',  marginVertical: 8,}}>
        {item.icon}
        <Title style={{ fontSize: 18, marginLeft: 12, }}>{item.title}</Title>
    </Row>
)}

const Configs = [
    {
        title: 'Dados cadastrais',
        description: 'Edite seu avatar e infos',
        icon: 'user',
        check: false,
    },
    {
        title: 'Notificações',
        description: 'Configure como desejar',
        icon: 'bell',
        check: true,
    },
    {
        title: 'Patinhas da sorte',
        description: 'Desfrute de serviços parceiros',
        icon: 'lock',
        check: null,
    },
    {
        title: 'Rifas',
        description: 'Concorra a premios diversos',
        icon: 'file-text',
        check: null,
    },
    {
        title: 'Histórico de Patinhas',
        description: 'Acompanhe as movimentações',
        icon: 'log-out',
        check: true,
    },
    {
        title: 'Histórico de Rifas',
        description: 'Acompanhe ganhos e gastos',
        icon: 'log-out',
        check: true,
    },
    {
        title: 'Estabelecimentos',
        description: 'Descubra nossos parceiros',
        icon: 'log-out',
        check: null,
    },
    {
        title: 'Indique e ganhe',
        description: 'Participe da campanha',
        icon: 'log-out',
        check: null,
    },
]

const Links = [
    {
        title: 'Central de ajuda',
        icon: <Info size={24} color="#111"/>
    },
    {
        title: 'Feedback e sugestões',
        icon: <MessagesSquare size={24} color="#111"/>,
    },
    {
        title: 'Acesso à informação',
        icon: <Info size={24} color="#111"/>
    },
    {
        title: 'Termos e condições',
        icon: <ScrollText size={24} color="#111"/>
    },
]
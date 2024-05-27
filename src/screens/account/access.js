import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Avatar from '@components/avatar';
import Notify from '@components/notify';
import Check from '@components/check';
import { ImagePlus, CircleCheck, MessagesSquare, Info, ScrollText, Moon, CircleX, LogOut, Bell } from 'lucide-react-native';

export default function AccountAccessInfoScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main>
            <Scroll>
             
              

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
import React, { useContext, } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row ,  Button,} from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MessagesSquare, Info, ScrollText } from 'lucide-react-native';
import Header from '@components/header';
import { MotiImage } from 'moti';
import { useNavigation } from '@react-navigation/native';

export default function AccountAccessInfoScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
            <Header title="Acesso à informação" rose/>
            <FlatList
                        style={{ marginTop: 24, marginHorizontal: margin.h, }}
                        data={Configs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Card item={item} />}
                    />
            </Scroll>
        </Main>
    )
}

const Card = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const navigation = useNavigation()
    return(
        <Button onPress={() => {navigation.navigate(item.screen)}} style={{  borderRadius: 12,  }}>
    <Row style={{ marginBottom: 12, borderBottomWidth: 2, borderBottomColor: color.off, alignItems: 'center', paddingBottom: 12,  }}>
        <Column style={{ padding: 18, borderRadius: 12, backgroundColor: "#FFE0F6",  }}>
            <MotiImage from={{ opacity: 0 }} animate={{ opacity: 1 }} delay={1000} source={item.img} style={{ width: 32, height: 32, objectFit: 'contain' }}/>
        </Column>
        <Column style={{ marginHorizontal: 20, }}>
            <Title style={{ fontSize: 18, marginRight: 6, }}>{item?.title}</Title>
            <Label style={{ fontSize: 14, }}>{item?.description}</Label>
        </Column>
    </Row>
    </Button>
)}


const Configs = [
    {
        title: 'Dúvidas frequentes',
        description: 'Acesse as dúvidas comuns',
        icon: 'user',
        check: null,
        img: require("@icons/ac1.png"),
        screen:'AccountFAQ'
    },
    {
        title: 'Sobre nós',
        description: 'Descubra a UHA!',
        icon: 'bell',
        check: null,
        img: require("@icons/ac2.png")

    },
    {
        title: 'Campanhas',
        description: 'Participe e ganhe prêmios',
        icon: 'lock',
        check: null,
        img: require("@icons/ac3.png")

    },
    {
        title: 'Faça parte',
        description: 'Faça uma doação',
        icon: 'file-text',
        check: null,
        img: require("@icons/ac4.png")

    },
    {
        title: 'Feedback e sugestões',
        description: 'Nos ajude a melhorar',
        icon: 'log-out',
        check: null,
        img: require("@icons/ac5.png")

    },
    {
        title: 'Central de ajuda',
        description: '24 horas para te ajudar',
        icon: 'log-out',
        check: null,
        img: require("@icons/ac6.png")

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
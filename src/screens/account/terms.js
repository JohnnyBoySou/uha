import React, { useContext, } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonOut, LabelLI, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MessagesSquare, Info, ScrollText } from 'lucide-react-native';
import Header from '../../components/header';
import { MotiImage } from 'moti';

export default function AccountTermsScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main>
            <Scroll>
                <Header title="Termos e condições"/>
                <Column style={{ marginHorizontal: margin.h, paddingVertical: 20, }}>
                <Label>Última alteração: 10/10/2024</Label>
                <Title style={{  marginTop: 30, marginBottom: 6, }}>1. Termos Gerais de Uso</Title>
                <Label>Ao utilizar a UHA, você declara ter lido, compreendido e concordado com todos os termos e condições estabelecidos neste documento. Reservamo-nos o direito de alterar estes termos a qualquer momento, sendo sua responsabilidade verificar regularmente esta página para se manter informado sobre eventuais mudanças.</Label>
               
                <Title  style={{  marginTop: 20, marginBottom: 6, }}>2. Doações</Title>
                <SubLabel style={{ marginTop: 12, marginBottom: 6, }}>2.1. Tipos de Doações</SubLabel>
                <Label>As doações podem ser feitas de forma única ou recorrente. Você pode selecionar o valor e a frequência de suas doações conforme sua conveniência.</Label>
                <SubLabel style={{ marginTop: 12, marginBottom: 6, }}>2.2. Processamento de Pagamentos</SubLabel>
                <Label>As doações podem ser feitas de forma única ou recorrente. Você pode selecionar o valor e a frequência de suas doações conforme sua conveniência.</Label>
                </Column>
      
              
                <Column style={{ height: 100, }} />
            </Scroll>
        </Main>
    )
}

const Card = ({ item }) => {
    const { color, font, margin } = useContext(ThemeContext);

    return(
        <Column style={{ borderBottomWidth: 1, borderBottomColor: color.off, marginBottom: 12,   paddingBottom: 12, }}>
            <Title style={{ fontSize: 18, marginRight: 6, }}>{item?.q}</Title>
            <Label style={{ fontSize: 14, }}>{item?.r}</Label>
        </Column>
)}


const Configs = [
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        q: 'Pergunta frequente...',
        r: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    
]

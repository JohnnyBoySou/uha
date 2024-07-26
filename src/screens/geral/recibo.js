import React, { useContext } from 'react';
import { Main, Scroll, Column, Title, Row, ButtonPR, LabelPR, Label } from '@theme/global';
import styled, { ThemeContext } from 'styled-components/native';
import { ButtonSE, LabelSE } from '@theme/global';
import recibo from '@api/data/recibo';
import { Image } from 'expo-image';

export default function ReciboScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const item = recibo
    return (
        <Main>
            <Scroll style={{ paddingTop: 0, }}>
                <Column style={{  marginHorizontal: margin.h, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',   }}>
                    <Title>Recibo de doação</Title>
                    <Image contentFit='contain' source={require('@imgs/logo_recibo.png')} style={{ width: 100, }}/>
                </Row>

                <Title style={{ fontSize: 36, fontFamily: font.bold, lineHeight: 38, marginBottom: 30, }}>Valor: R$ {item?.value}</Title>
                <Column style={{   marginVertical: margin.v, }}>
                    <Title style={{ fontSize: 24, fontFamily: font.bold, lineHeight: 26, marginBottom: 6, }}>Detalhes do doador</Title>
                    <LabelTx>Realizado em: {item?.date} às {item?.time}</LabelTx>
                    <LabelTx>Doador: {item?.user.name}</LabelTx>
                    <LabelTx>CPF: {item?.user.cpf}</LabelTx>
                    <LabelTx>Coletor: {item?.ong.name}</LabelTx>
                </Column>
                <Column style={{  marginVertical: margin.v, }}>
                    <Title style={{ fontSize: 24, fontFamily: font.bold, lineHeight: 26, marginBottom: 6, }}>Detalhes da doação</Title>
                    <LabelTx>Campanha: {item?.campaign.name}</LabelTx>
                    <LabelTx>Pontos recebidas: {item?.coins}</LabelTx>
                    <LabelTx>Período: {item?.campaign.date}</LabelTx>
                    <LabelTx>Número do recibo: {item?.recibo_uid}</LabelTx>
                </Column>
                <Column style={{   marginVertical: margin.v, }}>
                    <Title style={{ fontSize: 24, fontFamily: font.bold, lineHeight: 26,  marginBottom: 6,}}>Autenticação</Title>
                    <LabelTx>Eletrônica: {item?.auth.eletron}</LabelTx>
                    <LabelTx>Controle: {item?.auth.control}</LabelTx>
                    <LabelTx>Emitido em: {item?.auth.date} às {item?.auth.time}</LabelTx>
                </Column>
                <Column style={{  marginVertical: margin.v,  marginTop: 30, }}>
                    <LabelTx>* Dados digitados são de responsabilidade do usuário.</LabelTx>
                    <LabelTx>* Central de atendimento: (00) 00000-0000</LabelTx>
                    <LabelTx>* Faça uma nova doação pelo app xxxxxxxxxxx ou em estabelecimentos parceiros físicos.</LabelTx>
                </Column>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginVertical: margin.v, }}>
                    <ButtonPR>
                        <LabelPR>Exportar</LabelPR>
                    </ButtonPR>
                    <Column style={{ width: 24, }}/>
                    <ButtonSE>
                        <LabelSE>Compartilhar</LabelSE>
                    </ButtonSE>
                </Row>
                </Column>
            </Scroll>

        </Main>
    )
}


const LabelTx = styled(Label)`
    margin-bottom: 10px;
`;
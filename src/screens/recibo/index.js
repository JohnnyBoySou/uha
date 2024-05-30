import React, { useContext } from 'react';
import { Main, Scroll, Column, Title, Row, ButtonPR, LabelPR, Label } from '@theme/global';
import styled, { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti';
import { ButtonSE, LabelSE } from './../../theme/global';

export default function ReciboScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const item = {
        value: '100,00',
        date: '10/10/24',
        time: '10:10',
        coins: '100',
        recibo_uid: '1234567890',
        auth: {
            eletron: 'A000.0000.0000.0000.0000.00A0.Aa0P.AaAA',
            control: '123456',
            date: '10/10/24',
            time: '12:10',
        },
        user: {
            name: 'João da Silva',
            cpf: '123.456.789-00',
        },
        ong: {
            name: 'ONG Teste',
            cnpj: '12.345.678/0001-00',
        },
        campaign:{
            name: 'Campanha Teste',
            description: 'Descrição da campanha teste',
            date: '10/10/24 até 10/11/24',
        }
    }
    return (
        <Main>
            <Scroll style={{ paddingTop: 0, }}>
                <Column style={{  marginHorizontal: margin.h, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',   }}>
                    <Title>Recibo de doação</Title>
                    <MotiImage source={require('@imgs/logo_recibo.png')} style={{ width: 100, objectFit: 'contain', }}/>
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
                    <LabelTx>UhaCoins recebidas: {item?.coins}</LabelTx>
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
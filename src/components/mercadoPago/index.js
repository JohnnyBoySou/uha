import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native';
import { Column, Label, Row, SubLabel, Button, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Check from '@components/check';

import { initMercadoPago } from '@mercadopago/sdk-react';
import { createCardToken } from '@mercadopago/sdk-react/coreMethods';


import {
	openBrowserAsync
} from "expo-web-browser";


export const MercadoPago = ({ value, ong, }) => {
    const { color, } = useContext(ThemeContext);
    
    const [remember, setremember] = useState(true);
    const [number, setnumber] = useState('5031 4332 1540 6351');
    const [cvv, setcvv] = useState('123');
    const [month, setmonth] = useState('11');
    const [year, setyear] = useState('25');
    const [name, setname] = useState('JOAO SOUSA');

    initMercadoPago('TEST-3357d7b8-7d81-40e9-ba6d-9985d219b114');
    
    const fetchToken = async () => {
        try {
            const cardToken = await createCardToken({
                cardNumber: number,
                cardholderName: name,
                cardExpirationMonth: month,
                securityCode: cvv,
                cardExpirationYear: year,
                identificationType: '<BUYER_IDENTIFICATION_TYPE>',
                identificationNumber: '<BUYER_IDENTIFICATION_NUMBER>',
            });
            console.log(cardToken)
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <Column style={{ justifyContent: 'center', }}>
            <Column style={{ marginTop: 20, }}>
                <SubLabel style={{ fontSize: 14, color: color.secundary, }}>NÚMERO DO CARTÃO</SubLabel>
                <TextInput value={number} onChangeText={(e) => setnumber(e)} style={{ borderBottomWidth: 2, borderBottomColor: color.off, fontFamily: 'Font_Medium', marginTop: 10, fontSize: 20, flexGrow: 1, }} placeholder='0000 0000 0000 0000' />
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 12, }}>
                <Column>
                    <SubLabel style={{ fontSize: 14, color: color.secundary, }}>DATA DE EXPIRAÇÃO</SubLabel>
                    <TextInput value={month} onChangeText={(e) => setval(e)} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 10, fontFamily: 'Font_Medium', fontSize: 20, width: 150, }} placeholder='MM/AA' />
                </Column>
                <Column>
                    <SubLabel style={{ fontSize: 14, color: color.secundary, }}>CVV</SubLabel>
                    <TextInput value={cvv} onChangeText={(e) => setcvv(e)} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 10, fontFamily: 'Font_Medium', fontSize: 20, flexGrow: 1, width: 150, }} placeholder='000' />
                </Column>
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                <Label style={{ fontSize: 14, fontFamily: 'Font_Bold', marginRight: 10, }}>Lembrar deste cartão para uso futuro</Label>
                <Button onPress={() => { setremember(!remember) }} style={{ alignSelf: 'center', }} >
                    <Check status={remember} />
                </Button>
            </Row>

            <ButtonPR style={{ paddingHorizontal: 24, marginTop: 40, }} onPress={fetchToken} >
                <LabelLI style={{ color: '#fff', }}>Continuar</LabelLI>
            </ButtonPR>
        </Column>
    )
}

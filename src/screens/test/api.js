import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { getUser } from '@api/request/user/user';
import { getShops } from '@api/request/shop';

export default function TestAPIScreen({ navigation, }) {
    const { color, font, } = useContext(ThemeContext);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState('');
    const [data, setdata] = useState([]);
    let email = "admin@admin.com"
    let password = "12345"

    const fecthData = async () => {
        setloading(true);
        getShops().then(res => {
            setdata(res);
            console.log(res)
            setloading(false);
        }).catch(erro => {
            seterror(erro);
            setloading(false);
        })
    }

    
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            {loading ? <ActivityIndicator size="large" color={color.primary} /> : <Column>
                <Title></Title>
            </Column>}
            {error > 0 && <Title style={{ textAlign: 'center', color: color.secundary }}>{error}</Title>}
            <ButtonPR onPress={fecthData} >
                <LabelPR>get</LabelPR>
            </ButtonPR>
        </Main>
    )
}
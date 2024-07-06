import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Main, Button, ButtonOut, Scroll, Column, Label, Row, Title, LabelPR, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { StatusBar } from 'expo-status-bar';
import { getONGs } from '@api/request/ongs/ongs';
import { sendNotafiscal } from '@api/request/notafiscal/nota';
import CardOngs from '@components/cardOngs';

const NotafiscalONGS = ({ navigation, route, }) => {

    const { color, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState();
    const value = route.params?.value
    const [selectOng, setselectOng] = useState();
    const [ongs, setongs] = useState();

    const handleFinish = async () => {
        setloading(true)
        const params = {
            nota: value,
            id: selectOng,
        }
        sendNotafiscal(params).then((res) => {
            if(res){
                setloading(false)
                navigation.navigate('NotafiscalSuccess', {status: res})
            }
        }).catch(err => {
            navigation.navigate('NotafiscalError', {status: err.message})
            setloading(false)
        })
    }


    useEffect(() => {
        const fecthData = () => {
            setloading(true);
            getONGs().then(res => {
                setongs(res);
                setloading(false);
            })
        }
        fecthData();
    }, []);


    return (
        <Main style={{ backgroundColor: '#fff', }}>

        <Scroll >
            <StatusBar style='dark' />
            <Header rose />
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 5, }}>
                <Title style={{ fontSize: 24, lineHeight: 26, marginBottom: 8, }}>Escolha qual ONG deseja beneficiar</Title>
                <Label style={{ color: color.secundary+99, }}>Ao cadastrar sua nota, o valor será doado para a ONG abaixo de sua escolha.</Label>
               
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                    <SubLabel style={{ fontSize: 24, color: color.secundary, marginVertical: 12, marginTop: 20, }}>ONGs recentes</SubLabel>
                    <Button>
                        <Title style={{ color: color.primary, fontSize: 18, }}>Ver todas</Title>
                    </Button>
                </Row>
                <FlatList
                    data={ongs}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CardOngs item={item} setselectOng={setselectOng} selectOng={selectOng} />}
                />
                <ButtonOut onPress={handleFinish} disabled={!selectOng}  style={{ borderColor: selectOng ? color.primary : color.blue, marginTop: 20, backgroundColor : selectOng ? color.primary : "transparent" }}>
                   <Row>
                      {loading ? <ActivityIndicator size={28} color="#fff" /> : <LabelPR style={{ color: selectOng ? "#fff" : color.blue, }}>{selectOng ? 'Concluir' : 'Escolha uma ONG'}</LabelPR>}
                   </Row>
                </ButtonOut>
            </Column>
        </Scroll>
        </Main>
    )
}
export default NotafiscalONGS;


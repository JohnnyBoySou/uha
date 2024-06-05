import React, { useContext, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, U, Button, LabelLI,  } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header'; 
import { ButtonOut } from '../../theme/global';
export default function QuestionsScreen({ navigation, }) {
    const { color, font, margin} = useContext(ThemeContext);
    const [type, settype] = useState('Duvida');
    const [message, setmessage] = useState('');
    return (
        <Main>
            <Scroll>
                <Header title="Fazer um registro"/>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20,}}>
                    <Title style={{ fontSize: 20, }}>Como registrar</Title>
                    <Label style={{ lineHeight: 20, fontSize: 16, marginTop: 6, marginBottom: 20, }}>Escreva sua dúvida, reclamação ou sugestão na caixa abaixo e envie, uma ocorrência será aberta em nosso sistema. Seu registro tem o prazo de até 10 dias úteis para ser respondido.</Label>
                    <Title style={{ fontSize: 20, }}>Preciso da resposta antes do prazo</Title>
                    <Label style={{ lineHeight: 20, fontSize: 16, marginTop: 6, marginBottom: 20, }}>Nos casos de prazos curtos pedimos que entre em contato com nossa central de ajuda 24 hora <U style={{ fontFamily: 'Font_Bold', color: color.primary, }}>acessando aqui</U>.</Label>
               
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Button onPress={() => {settype('Duvida')}}  style={{ backgroundColor: type==='Duvida'?color.primary:'#fff',  paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, }}>
                            <Label style={{ color: type==='Duvida'?"#fff":color.title, fontFamily: font.bold, fontSize: 16,}}>Dúvida</Label>
                        </Button>
                        <Button onPress={() => {settype('Reclamacao')}}  style={{ backgroundColor: type==='Reclamacao'?color.primary:'#fff',  paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, }}>
                            <Label style={{ color: type==='Reclamacao'?"#fff":color.title, fontFamily: font.bold, fontSize: 16,}}>Reclamação</Label>
                        </Button>
                        <Button onPress={() => {settype('Sugestao')}}  style={{ backgroundColor: type==='Sugestao'?color.primary:'#fff',  paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, }}>
                            <Label style={{ color: type==='Sugestao'?"#fff":color.title, fontFamily: font.bold, fontSize: 16,}}>Sugestão</Label>
                        </Button>
                    </Row>
                    <Title style={{ fontSize: 20, marginTop: 20, }}>Faça seu registro</Title>
                    <TextInput onChangeText={(e) => setmessage(e)} style={{ flexGrow: 1, height: 300, backgroundColor: '#fff', borderRadius: 12, marginTop: 20, paddingVertical: 16, paddingHorizontal: 20, fontSize: 18,}} placeholder='Escreva aqui' numberOfLines={6} multiline  textAlignVertical="top"/>
                    <Label style={{ textAlign: 'right', marginTop: -30, marginRight: 12, fontSize: 12, }}>{message?.length} / 1000 caracteres</Label>
                    <ButtonOut style={{ borderColor: color.primary, marginTop: 30, marginBottom: 12, }}>
                        <LabelLI style={{ color: color.primary, fontSize: 16, }}>Enviar</LabelLI>
                    </ButtonOut>
                    <ButtonOut onPress={() => {navigation.navigate('QuestionList')}}  style={{ borderColor: '#111', }}>
                        <LabelLI style={{  fontSize: 16, }}>Verificar registros</LabelLI>
                    </ButtonOut>
                </Column>

            </Scroll>
        </Main>
    )
}
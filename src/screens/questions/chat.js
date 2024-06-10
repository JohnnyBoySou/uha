import React, { useContext, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, U, Button, LabelLI, SubLabel  } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header'; 

export default function QuestionsChatScreen({ navigation, }) {
    const { color, font, margin} = useContext(ThemeContext);
    const [type, settype] = useState('Duvida');
    const [message, setmessage] = useState('');
    const list = item.list
    const [focus, setfocus] = useState(false);
    const inpt = React.useRef();
    return (
        <Main style={{ paddingTop: 40, flex: 1, }}>
            <Header title="Chat de registro" rose/>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20,}}>
                    <Title style={{ fontSize: 20, }}>Status</Title>
 
                    <Title style={{ fontSize: 18, marginTop: 20, }}>N. {item?.id}</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Label style={{ lineHeight: 20, fontSize: 16,  }}>{item?.type} - {item?.status}</Label>
                        <SubLabel>{item?.date}</SubLabel>
                    </Row>
               
                    <ScrollView style={{ height: '70%',  borderRadius: 12, marginTop: 20, }}>
                        {list.map((item, index) => (
                            <Column key={index} style={{ marginVertical: 10, }}>
                                <SubLabel style={{ textAlign: 'center', backgroundColor: color.off, alignSelf: 'center', borderRadius: 100, paddingVertical: 6, paddingHorizontal: 10, fontSize: 14, marginVertical: 12, opacity: .6, }}>{item.date}</SubLabel>
                                {item?.msg.map((msg, index) => (
                                    <Row key={index} style={{ justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', }}>
                                        <Column style={{  backgroundColor: msg.type === 'user' ? "#fff" : '#FFE0F6', borderBottomRightRadius: msg.type === 'user' ? 0 : 8, borderBottomLeftRadius: msg.type === 'user' ? 8 : 0, padding: 10, borderRadius: 8, marginVertical: 5, }}>
                                            <Label style={{ color: msg.type === 'user' ? '#111' : '#111', }}>{msg.message}</Label>
                                        </Column>
                                    </Row>
                                ))}
                            </Column>
                        ))}
                       
                    </ScrollView>


                </Column>

                <Column style={{ position: 'absolute', bottom: 0, flexGrow: 1, left: 20, right: 20, backgroundColor: color.background, }}>
                    
                    {focus && 
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, borderRadius: 8, padding: 10, }}
                        onChangeText={text => setmessage(text)}
                        value={message}
                        ref={inpt}
                        onSubmitEditing={() => setfocus(false)}
                        placeholder="Digite sua mensagem"
                    />}

                    {!focus && <Button onPress={() => {inpt.current?.focus(); setfocus(!focus)}}  style={{ borderColor: color.primary, borderRadius: 8, borderWidth: 2, justifyContent: 'center', alignItems: 'center', paddingVertical: 10,}}>
                        <LabelLI style={{  fontSize: 16, color: color.primary, }}>Responder</LabelLI>
                    </Button>}
                    <Button onPress={() => {navigation.navigate('QuestionList')}}  style={{ borderColor: '#111', marginTop: 12, borderRadius: 8, borderWidth: 2, justifyContent: 'center', alignItems: 'center', paddingVertical: 10,}}>
                        <LabelLI style={{  fontSize: 16, }}>Finalizar</LabelLI>
                    </Button>
                </Column>
        </Main>
    )
}

const item = {
    id: "1234567890",
    status: 'Solucionada',
    type: 'Dúvida',
    date: '10/10/2024',
    list: [
            {
            date: '10/10/2024', 
            msg:  [
                { id: 1, type: 'user', message: 'Olá, gostaria de saber como faço para me inscrever no curso de inglês?', time: '10:00', },
                { id: 2, type: 'admin', message: 'Olá, você pode se inscrever no curso.', time: '10:00', },
                { id: 3, type: 'user', message: 'Muito obrigado!', time: '10:00', },
            ]},
            {
            date: '11/10/2024', 
            msg:  [
                { id: 1, type: 'user', message: 'Olá, gostaria de saber como faço para me inscrever no curso de inglês?', time: '10:00', },
                { id: 2, type: 'admin', message: 'Olá, você pode se inscrever no curso.', time: '10:00', },
                { id: 3, type: 'user', message: 'Muito obrigado!', time: '10:00', },
            ]},
            {
            date: '12/10/2024', 
            msg:  [
                { id: 1, type: 'user', message: 'Olá, gostaria de saber como faço para me inscrever no curso de inglês?', time: '10:00', },
                { id: 2, type: 'admin', message: 'Olá, você pode se inscrever no curso.', time: '10:00', },
                { id: 3, type: 'user', message: 'Muito obrigado!', time: '10:00', },
            ]},
        ],

}
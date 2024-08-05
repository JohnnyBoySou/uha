import React, { useContext, useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, U, Button, LabelLI, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { registrarFeedback } from '@request/user/question';
export default function QuestionsScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState('duvida');
    const [focusMessage, setfocusMessage] = useState();
    const [message, setmessage] = useState('');
    const [loading, setloading] = useState(false);

    const handleSend = async () => {
        if (!message) {
            return;
        }
        setloading(true)
        try {
            const res = await registrarFeedback(message, type);
            navigation.navigate('QuestionsSuccess')
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    }

    return (
        <Main style={{ backgroundColor: color.background, }}>
            <Scroll>
                <Header title="Fazer um registro" rose />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Title style={{ fontSize: 18, lineHeight: 18 }}>Como registrar</Title>
                    <Label style={{ lineHeight: 18, fontSize: 14, marginTop: 6, marginBottom: 20, }}>Escreva sua dúvida, reclamação ou sugestão na caixa abaixo e envie, uma ocorrência será aberta em nosso sistema. Seu registro tem o prazo de até 10 dias úteis para ser respondido.</Label>

                    <Row style={{ alignItems: 'center', }}>
                        <Button onPress={() => { settype('duvida') }} style={{ backgroundColor: type === 'duvida' ? color.primary : color.primary + 20, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 100, }}>
                            <Label style={{ color: type === 'duvida' ? "#fff" : color.primary, fontFamily: font.bold, fontSize: 16, }}>Dúvida</Label>
                        </Button>
                        <Button onPress={() => { settype('reclamacao') }} style={{ backgroundColor: type === 'reclamacao' ? color.primary : color.primary + 20, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 100, marginHorizontal: 12, }}>
                            <Label style={{ color: type === 'reclamacao' ? "#fff" : color.primary, fontFamily: font.bold, fontSize: 16, }}>Reclamação</Label>
                        </Button>
                        <Button onPress={() => { settype('sugestao') }} style={{ backgroundColor: type === 'sugestao' ? color.primary : color.primary + 20, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 100, }}>
                            <Label style={{ color: type === 'sugestao' ? "#fff" : color.primary, fontFamily: font.bold, fontSize: 16, }}>Sugestão</Label>
                        </Button>
                    </Row>
                    <Title style={{ fontSize: 20, marginTop: 20, }}>Faça seu registro</Title>
                    <TextInput onChangeText={(e) => setmessage(e)}
                        onBlur={() => setfocusMessage(false)} onFocus={() => setfocusMessage(true)}
                        style={{ flexGrow: 1, height: 240, borderWidth: 2, borderColor: focusMessage ? color.primary : '#D7D7D7', borderRadius: 12, marginTop: 10, paddingVertical: 16, paddingHorizontal: 20, fontSize: 18, }} placeholder='Escreva aqui' numberOfLines={6} multiline textAlignVertical="top" />
                    <Label style={{ textAlign: 'right', marginTop: -30, marginRight: 12, fontSize: 12, }}>{message?.length} / 1000 caracteres</Label>
                    <Button disabled={message?.length < 2} onPress={handleSend} style={{ backgroundColor: color.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 100, marginTop: 30, marginBottom: 12, }}>

                        <Column>
                            {loading ? <ActivityIndicator color="#fff" size={22} /> : <Label style={{ color: '#fff', fontSize: 16, textAlign: 'center', fontFamily: font.bold, }}>Enviar</Label>}
                        </Column>
                    </Button>
                </Column>

                <Column style={{ height: 60, }} />
            </Scroll>
        </Main>
    )
}

//<Title style={{ fontSize: 18, lineHeight: 18 }}>Preciso da resposta antes do prazo</Title>
//<Label style={{ lineHeight: 18, fontSize: 14, marginTop: 6, marginBottom: 20, }}>Nos casos de prazos curtos pedimos que entre em contato com nossa central de ajuda 24 horas pelo telefone <U style={{ fontFamily: 'Font_Bold', color: color.primary, }}>(44) 9 9999-9999</U>.</Label>

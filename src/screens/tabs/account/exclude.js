import React, { useContext, useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { excludeUser } from '@api/request/user/user';

import { Eye, Lock, EyeOff, AlertTriangle } from 'lucide-react-native';

import Header from '@components/header';
import Success from '@components/success';
import Error from '@components/error';

import { excludeFavorites } from '@api/user/preferences';
import { excludePreferences } from '@api/user/preferences';

export default function AccountExcludeScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    const [focusMessage, setfocusMessage] = useState(false);
    const [focusPass, setfocusPass] = useState(false);
    const [message, setmessage] = useState('');
    const [password, setpassword] = useState();
    const [loading, setloading] = useState(false);
    const [pass, setpass] = useState();
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const handleExclude = async () => {
        if (password.length < 6) {
            seterror('A senha deve ter no mínimo 6 caracteres');
            return;
        }
        setloading(true);
        try {
            const res = await excludeUser(password, message);
            setsuccess(res?.message);
            const preferences = await excludePreferences()
            const favorites = await excludeFavorites();
            setTimeout(() => {
                navigation.replace('AuthLogin');
            }, 1000);
        } catch (error) {
            console.log(error)
            seterror(error.message);
        } finally {
            setloading(false);
        }
    }

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header title="Excluir conta" rose />
                <Column style={{ paddingHorizontal: 28, paddingVertical: 12, }}>
                    <Title style={{ fontSize: 18, lineHeight: 18 }}>Por qual motivo deseja excluir sua conta? Sua resposta nos ajuda a melhorar. *</Title>
                    <TextInput onChangeText={(e) => setmessage(e)}
                        onBlur={() => setfocusMessage(false)} onFocus={() => setfocusMessage(true)}
                        style={{ flexGrow: 1, height: 240, borderWidth: 2, borderColor: focusMessage ? color.primary : '#D7D7D7', borderRadius: 12, marginTop: 10, paddingVertical: 16, paddingHorizontal: 20, fontSize: 18, }} placeholder='Escreva aqui' numberOfLines={6} multiline textAlignVertical="top" />
                    <Title style={{ fontSize: 18, lineHeight: 18, marginTop: 20, }}>Confirme sua senha para efetivar a exclusão.</Title>
                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                            <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            onFocus={() => setfocusPass(true)}
                            onBlur={() => setfocusPass(false)}
                            value={password}
                            onChangeText={(e) => setpassword(e)}
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Senha (8 digitos)' secureTextEntry={pass} placeholderTextColor="11111140" />

                        <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 40, flexDirection: 'row', position: 'absolute', right: 18, top: 10, }}>
                            {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
                    </Row>


                    {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}


                    <Column style={{ backgroundColor: color.red + 20, borderRadius: 12, justifyContent: 'center', alignItems: 'center', padding: 20, marginVertical: 20, }}>
                        <Column style={{ width: 62, height: 62, backgroundColor: "#ffffff80", borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <AlertTriangle color={color.red} size={32} />
                        </Column>

                        <Label style={{ color: color.red, textAlign: 'center', lineHeight: 16, fontSize: 16, marginTop: 12, marginHorizontal: 12, }}>Essa ação é irreversível e excluirá todos os seus dados salvos.{'\n'}Tem certeza disso?</Label>
                        <Button disabled={password?.length < 6} onPress={handleExclude} style={{ backgroundColor: color.red, borderRadius: 100, marginTop: 12, paddingHorizontal: 20, paddingVertical: 9, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: "#fff", fontFamily: font.bold, fontSize: 16, }}>Excluir minha conta</Label>
                        </Button>
                    </Column>



                </Column>
            </Scroll>
        </Main>
    )
}

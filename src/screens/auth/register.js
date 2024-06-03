import React, { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Column, Title, Row, Label, Scroll} from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti';
import { AtSign, KeyRound, Lock, MapPin, LogIn, User, Key, Phone, BookUser} from 'lucide-react-native'
import { TouchableRipple } from 'react-native-paper';
import Header from '@components/header';

export default function AuthRegisterScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [loading, setloading] = useState(false);
    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);
    const [focusName, setfocusName] = useState();
    const [focusCpf, setfocusCpf] = useState();
    const [focusCep, setfocusCep] = useState();
    const [focusCode, setfocusCode] = useState();
    const [focusWhatsapp, setfocusWhatsapp] = useState();

    const [email, setemail] = useState();
    const [passrepeat, setpassrepeat] = useState();
    const [password, setpassword] = useState();
    const [name, setname] = useState();
    const [cpf, setcpf] = useState();
    const [cep, setcep] = useState();
    const [code, setcode] = useState();
    const [whatsapp, setwhatsapp] = useState();

    const handleLogin = () => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
            navigation.replace('Home')
        }, 3000);
    }

    const textInputStyle = {
        fontFamily: 'Font_Medium',
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexGrow: 1,
    };
    return (
        <Main>
            <Scroll>
            <Header />
            <Column>
                
                <Column style={{ marginHorizontal: margin.h, paddingVertical: 22, }}>
                    <Title style={{ fontSize: 42, color: color.primary, lineHeight: 52, letterSpacing: -2, }}>Cadastre-se</Title>
                    <Label>Crie sua conta informando os dados abaixo e comece a ganhar seus pontos</Label>
                </Column>

                <Column style={{ marginHorizontal: margin.h, paddingVertical: 12, }}>
                    
                <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <User color={focusName ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusName(true)}
                    onBlur={() => setfocusName(false)}
                    onChangeText={(e) => setname(e)}
                    style={textInputStyle}
                    placeholder='NOME COMPLETO'
                    placeholderTextColor="#707070"
                />
            </Row>

                    <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <AtSign color={focusEmail ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusEmail(true)}
                    onBlur={() => setfocusEmail(false)}
                    onChangeText={(e) => setemail(e)}
                    keyboardType='email-address'
                    style={textInputStyle}
                    placeholder='E-MAIL'
                    placeholderTextColor="#707070"
                />
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusPass(true)}
                    onBlur={() => setfocusPass(false)}
                    onChangeText={(e) => setpassword(e)}
                    secureTextEntry
                    style={textInputStyle}
                    placeholder='SENHA'
                    placeholderTextColor="#707070"
                />
            </Row>
            
            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <BookUser color={focusCpf ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusCpf(true)}
                    onBlur={() => setfocusCpf(false)}
                    onChangeText={(e) => setcpf(e)}
                    style={textInputStyle}
                    placeholder='CPF'
                    placeholderTextColor="#707070"
                />
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <MapPin color={focusCep ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusCep(true)}
                    onBlur={() => setfocusCep(false)}
                    onChangeText={(e) => setcep(e)}
                    style={textInputStyle}
                    placeholder='CEP'
                    placeholderTextColor="#707070"
                />
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <Phone color={focusWhatsapp ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusWhatsapp(true)}
                    onBlur={() => setfocusWhatsapp(false)}
                    onChangeText={(e) => setwhatsapp(e)}
                    keyboardType='phone-pad'
                    style={textInputStyle}
                    placeholder='WHATSAPP'
                    placeholderTextColor="#707070"
                />
            </Row>

            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", paddingHorizontal: 12, borderRadius: 100, marginVertical: 6,}}>
                <Column>
                    <Key color={focusCode ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusCode(true)}
                    onBlur={() => setfocusCode(false)}
                    onChangeText={(e) => setcode(e)}
                    style={textInputStyle}
                    placeholder='CÓDIGO PESSOAL DE INDICAÇÃO'
                    placeholderTextColor="#707070"
                />
            </Row>

                    <TouchableRipple  rippleColor="#fff" onPress={handleLogin} style={{ backgroundColor: color.primary, marginTop: 30, marginBottom: 12, alignSelf: 'center', width: 72, height: 72, borderRadius: 100, justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ position: 'relative', justifyContent: 'center', alignItems: 'center',  }}>
                            {loading && <ActivityIndicator color="#fff" size={132}  style={{ position: 'absolute',   }}/>}
                            <LogIn color="#fff" size={32} strokeWidth={3} />
                        </Column>
                    </TouchableRipple>

                </Column>
            </Column>
            </Scroll>

        </Main>
    )
}


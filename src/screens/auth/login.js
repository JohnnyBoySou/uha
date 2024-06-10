import React, { useContext, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Column, Title, Row, Label, Scroll, Button, ButtonPR, LabelPR, U, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView } from 'moti';
import { AtSign, KeyRound, Eye, EyeOff, LogIn, ArrowLeft, Lock, Mail, MapPinned, Phone, User, BookUser } from 'lucide-react-native'
import { TouchableRipple } from 'react-native-paper';
import CheckBox from '@components/checkbox';
import { useNavigation } from '@react-navigation/native';


export default function AuthLoginScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [pass, setpass] = useState(true);

    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);
    const [focusName, setfocusName] = useState();
    const [focusCPF, setfocusCPF] = useState();
    const [focusCEP, setfocusCEP] = useState();
    const [focusWhatsapp, setfocusWhatsapp] = useState();

    const [loading, setloading] = useState(false);

    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [whatsapp, setwhatsapp] = useState();
    const [cpf, setcpf] = useState();
    const [cep, setcep] = useState();
    const [name, setname] = useState();

    const handleLogin = () => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
            navigation.navigate('Home')
        }, 3000);
    }

    const handleRegister = () => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
            navigation.navigate('Home')
        }, 3000);
    }

    const handleFacebook = () => {
    }
    const handleGoogle = () => {
    }
    const handleAppleID = () => {
    }
    const [type, settype] = useState('Entrar');
    const [remember, setremember] = useState(true);

    const message = type === 'Entrar' || type === 'Registrar' ? { title: 'Bem-vindo!', message: 'Seja bem-vindo ao nosso aplicativo, esperamos que tenha uma ótima experiência.' } : { title: 'Escolha uma nova senha', message: 'Escolha uma senha segura e não a compartilhe com ninguém.' }

    return (
        <Main style={{ backgroundColor: color.secundary, paddingTop: 40, }}>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ width: 46, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <MotiImage source={require('@imgs/logo.png')} style={{ objectFit: 'contain', width: 100, }} />
            </Row>

            <Column style={{ marginHorizontal: margin.h, paddingVertical: 22, }}>
                <Title style={{ fontSize: 28, color: "#fff", lineHeight: 52, }}>Seja bem-vindo!</Title>
                <Label style={{ color: "#fff", }}>Está pronto para começar? Escolha entre entrar ou se registrar para avançar para os próximos passos.</Label>
            </Column>

            <Column style={{ paddingHorizontal: margin.h, paddingVertical: 12, backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, position: 'absolute', bottom: 0, left: 0, right: 0, }}>

                {type == 'Entrar' &&
                    <MotiView from={{ translateX: -20, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ type: 'timing' }}>
                        <Column style={{ width: 80, height: 8, borderRadius: 100, backgroundColor: "#EFDCC5", alignSelf: 'center', marginBottom: 20, marginTop: 0, }} />
                        <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                            <Button onPress={() => { settype('Entrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Entrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                                <Label style={{ color: type === 'Entrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                            </Button>
                            <Column style={{ width: 12, }} />
                            <Button onPress={() => { settype('Registrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Registrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                                <Label style={{ color: type === 'Registrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                            </Button>
                        </Row>

                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, marginTop: 30, }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusEmail(true)}
                                onBlur={() => setfocusEmail(false)}
                                onChangeText={(e) => setemail(e)}
                                value={email}
                                keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='E-mail' placeholderTextColor="#11111190" />
                        </Row>
                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                                <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusPass(true)}
                                onBlur={() => setfocusPass(false)}
                                onChangeText={(e) => setpassword(e)}
                                value={password}
                                keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='Senha' secureTextEntry={pass} placeholderTextColor="11111140" />

                            <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', }}>
                                {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                            </Pressable>
                        </Row>

                        <Row style={{ justifyContent: 'space-between', marginTop: 16, alignItems: 'center', }}>
                            <Pressable style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onPress={() => { setremember(!remember) }} >
                                <CheckBox status={remember} />
                                <Label style={{ fontFamily: font.bold, fontSize: 14, marginLeft: 6, }}>Manter conectado</Label>
                            </Pressable>
                            <Pressable onPress={() => { settype('ForgetPassword') }} style={{ alignSelf: 'center', }}>
                                <Label style={{ color: color.secundary, fontFamily: font.bold, fontSize: 14, textDecorationStyle: 'solid', textDecorationLine: "underline", }}>Esqueci minha senha</Label>
                            </Pressable>
                        </Row>

                        <ButtonPR onPress={handleLogin} style={{ marginTop: 30, }}>
                            <Row>
                                {loading ?
                                    <ActivityIndicator animating={loading} color="#fff" size={27} />
                                    :
                                    <LabelPR>Entrar</LabelPR>
                                }
                            </Row>
                        </ButtonPR>


                        <Row style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ flexGrow: 1, height: 2, backgroundColor: color.off, }} />
                            <Label style={{ fontFamily: font.medium, textAlign: 'center', marginHorizontal: 6, }}>ou entre com</Label>
                            <Column style={{ flexGrow: 1, height: 2, backgroundColor: color.off, }} />
                        </Row>


                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 24, }}>
                            <Button onPress={handleFacebook} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6, }} >
                                <Column>
                                    <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                        <MotiImage source={require('@icons/facebook.png')} style={{ width: 28, height: 28, }} />
                                    </Column>
                                    <Label style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Font_Medium', marginTop: 10, }}>Facebook</Label>
                                </Column>
                            </Button>
                            <Button onPress={handleGoogle} style={{ justifyContent: 'center', marginHorizontal: 20, alignItems: 'center', borderRadius: 6, }} >
                                <Column>
                                    <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                        <MotiImage source={require('@icons/google.png')} style={{ width: 28, height: 28, }} />
                                    </Column>
                                    <Label style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Font_Medium', marginTop: 10, }}>Google</Label>
                                </Column>
                            </Button>
                            <Button onPress={handleAppleID} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6, }} >
                                <Column>
                                    <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                        <MotiImage source={require('@icons/apple.png')} style={{ width: 28, height: 28, }} />
                                    </Column>
                                    <Label style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Font_Medium', marginTop: 10, }}>Apple ID</Label>
                                </Column>
                            </Button>
                        </Row>

                    </MotiView>}

                {type == 'Registrar' &&
                    <MotiView from={{ translateX: 20, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ type: 'timing' }}>
                        <Column style={{ width: 80, height: 8, borderRadius: 100, backgroundColor: "#EFDCC5", alignSelf: 'center', marginBottom: 20, marginTop: 0, }} />
                        <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                            <Button onPress={() => { settype('Entrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Entrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                                <Label style={{ color: type === 'Entrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                            </Button>
                            <Column style={{ width: 12, }} />
                            <Button onPress={() => { settype('Registrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Registrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                                <Label style={{ color: type === 'Registrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                            </Button>
                        </Row>

                        <Row style={{ borderRadius: 8, marginTop: 30, borderWidth: 2, borderColor: focusName ? color.primary : color.off, }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                <User color={focusName ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusName(true)}
                                onBlur={() => setfocusName(false)}
                                onChangeText={(e) => setname(e)}
                                value={name}
                                style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='Nome completo' placeholderTextColor="#11111190" />
                        </Row>


                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCPF ? color.primary : color.off, }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                <BookUser color={focusCPF ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusCPF(true)}
                                onBlur={() => setfocusCPF(false)}
                                onChangeText={(e) => setfocusCPF(e)}
                                style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='CPF' placeholderTextColor="#11111190" />
                        </Row>
                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusWhatsapp ? color.primary : color.off, }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                <Phone color={focusWhatsapp ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusWhatsapp(true)}
                                onBlur={() => setfocusWhatsapp(false)}
                                value={whatsapp}
                                onChangeText={(e) => setfocusWhatsapp(e)}
                                keyboardType='tel' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='WhatsApp' placeholderTextColor="#11111190" />
                        </Row>
                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCEP ? color.primary : color.off, }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                <MapPinned color={focusCEP ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusCEP(true)}
                                onBlur={() => setfocusCEP(false)}
                                value={cep}
                                onChangeText={(e) => setfocusCEP(e)}
                                keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='CEP (Código Postal)' placeholderTextColor="#11111190" />
                        </Row>
                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusEmail(true)}
                                onBlur={() => setfocusEmail(false)}
                                value={email}
                                onChangeText={(e) => setemail(e)}
                                keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='E-mail' placeholderTextColor="#11111190" />
                        </Row>
                        <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                            <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                                <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                            </Column>
                            <TextInput
                                onFocus={() => setfocusPass(true)}
                                onBlur={() => setfocusPass(false)}
                                value={password}
                                onChangeText={(e) => setpassword(e)}
                                keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='Senha (8 digitos)' secureTextEntry={pass} placeholderTextColor="11111140" />

                            <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', }}>
                                {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                            </Pressable>
                        </Row>

                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 20, }}>
                            <Column style={{ backgroundColor: color.off, height: 10, borderRadius: 30, width: 100, }}>
                                <Column style={{ width: '50%', height: 10, borderRadius: 100, backgroundColor: "#00A3FF", }} />
                            </Column>
                            <SubLabel style={{ color: "#00A3FF" }}>Razoável</SubLabel>
                        </Row>


                        <Pressable style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onPress={() => { setremember(!remember) }} >
                            <CheckBox status={remember} />
                            <Label style={{ fontFamily: font.bold, fontSize: 14, marginLeft: 6, }}>Permito se contatado por WhatsApp</Label>
                        </Pressable>

                        <ButtonPR onPress={handleRegister} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                            <Row>
                                {loading ?
                                    <ActivityIndicator animating={loading} color="#fff" size={27} />
                                    :
                                    <LabelPR>Registrar</LabelPR>
                                }
                            </Row>
                        </ButtonPR>

                        <Label style={{ fontFamily: font.medium, fontSize: 16, textAlign: 'center', marginHorizontal: 6, marginBottom: 30, }}>Ao registrar-se você concorda com os <U>Termos de Uso</U> e <U>Politica de Privacidade</U></Label>
                    </MotiView>}

                {type == 'ForgetPassword' && <ForgetPassword />}
            </Column>
        </Main>
    )
}


const ForgetPassword = () => {
    const { color, font, margin, } = useContext(ThemeContext);
    const navigation = useNavigation()
    const [type, settype] = useState('Redefinir');
    const [focusEmail, setfocusEmail] = useState();
    const [email, setemail] = useState('');
    const [loading, setloading] = useState(false);
    const [step, setstep] = useState(1);
    const handleSend = () => {
        if (email?.length < 5) return alert('Preencha o campo de e-mail')
        setloading(true)
        setTimeout(() => {
            setloading(false)
            //chamada api
            setstep(2)
        }, 2000);
    }

    const handleVerify = () => {
        if (digit1?.length === 1 && digit2?.length === 1 && digit3?.length === 1 && digit4?.length === 1) {
            setloading(true)
            setTimeout(() => {
                setloading(false)
                //chamada api

                settype('Nova senha')
            }, 2000);
        }
        console.log(digit1, digit2, digit3, digit4)
    }


    const [digit1, setdigit1] = useState();
    const [digit2, setdigit2] = useState();
    const [digit3, setdigit3] = useState();
    const [digit4, setdigit4] = useState();

    const [focus1, setfocus1] = useState();
    const [focus2, setfocus2] = useState();
    const [focus3, setfocus3] = useState();
    const [focus4, setfocus4] = useState();

    const fc1 = useRef()
    const fc2 = useRef()
    const fc3 = useRef()
    const fc4 = useRef()

    const [focusPass, setfocusPass] = useState();
    const [focusPass2, setfocusPass2] = useState();

    const [pass, setpass] = useState();
    const [password, setpassword] = useState();
    const [passwordRepeat, setpasswordRepeat] = useState();

    const repeat = useRef()

    return (
        <MotiView from={{ translateY: 20, opacity: 0 }} animate={{ translateY: 0, opacity: 1, }} transition={{ type: 'timing' }}>
            <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Redefinir' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Redefinir' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Redefinir senha</Label>
                </Button>
                <Column style={{ width: 12, }} />
                <Button style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Nova senha' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Nova senha' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Nova senha</Label>
                </Button>
            </Row>


            {type === 'Redefinir' && <Column>

                {step == 1 && <Column>
                    <Column style={{ marginTop: 24, }}>
                        <Title style={{ marginBottom: 6, }}>Preencha seu e-mail</Title>
                        <Label>Vamos te enviar um e-mail com o código de verificação para redefinir sua senha.</Label>
                    </Column>

                    <Row style={{ borderRadius: 8, marginTop: 24, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            onFocus={() => setfocusEmail(true)}
                            onBlur={() => setfocusEmail(false)}
                            value={email}
                            onChangeText={(e) => setemail(e)}
                            keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='E-mail' placeholderTextColor="#11111190" />
                    </Row>
                    <ButtonPR disabled={loading} onPress={handleSend} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                        <Row>
                            {loading ? <ActivityIndicator animating={loading} color="#fff" size={27} /> : <LabelPR>Enviar código</LabelPR>}
                        </Row>
                    </ButtonPR>
                </Column>}

                {step == 2 && <Column>
                    <Column style={{ marginTop: 24, }}>
                        <Title>Código de verificação</Title>
                        <Label>Confira seu e-mail e copie o código enviado.</Label>
                    </Column>

                    <Row style={{ borderRadius: 8, marginTop: 24, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                        <TextInput
                            onFocus={() => setfocus1(true)}
                            onBlur={() => setfocus1(false)}
                            value={digit1}
                            onSubmitEditing={() => { fc2.current?.focus() }}
                            ref={fc1}
                            onChangeText={(e) => setdigit1(e)}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus1 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus2(true)}
                            onBlur={() => setfocus2(false)}
                            value={digit2}
                            ref={fc2}
                            onSubmitEditing={() => { fc3.current?.focus() }}
                            onChangeText={(e) => setdigit2(e)}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus2 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus3(true)}
                            onBlur={() => setfocus3(false)}
                            value={digit3}
                            onSubmitEditing={() => { fc4.current?.focus() }}
                            ref={fc3}
                            onChangeText={(e) => setdigit3(e)}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus3 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus4(true)}
                            onBlur={() => setfocus4(false)}
                            value={digit4}
                            ref={fc4}
                            onSubmitEditing={handleVerify}
                            onChangeText={(e) => setdigit4(e)}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus4 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                    </Row>
                    <ButtonPR disabled={loading} onPress={handleVerify} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                        <Row>
                            {loading ? <ActivityIndicator animating={loading} color="#fff" size={27} /> : <LabelPR>Verificar código</LabelPR>}
                        </Row>
                    </ButtonPR>
                </Column>}
            </Column>
            }

            {type == 'Nova senha' && <Column>
                <Column style={{ marginTop: 24, }}>
                        <Title style={{ marginBottom: 6, }}>Crie uma nova senha</Title>
                    </Column>

                <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                        <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                    </Column>
                    <TextInput
                        onFocus={() => setfocusPass(true)}
                        onBlur={() => setfocusPass(false)}
                        value={password}
                        onChangeText={(e) => setpassword(e)}
                        onSubmitEditing={() => { repeat.current?.focus() }}
                        keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='Nova senha' secureTextEntry={pass} placeholderTextColor="11111140" />

                    <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', }}>
                        {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                    </Pressable>
                </Row>
                <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, marginBottom: 12, borderColor: focusPass2 ? color.primary : color.off }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                        <Lock color={focusPass2 ? color.primary : color.secundary} size={22} />
                    </Column>
                    <TextInput
                        onFocus={() => setfocusPass2(true)}
                        onBlur={() => setfocusPass2(false)}
                        value={passwordRepeat}
                        ref={repeat}
                        onChangeText={(e) => setpasswordRepeat(e)}
                        keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow: 1, }} placeholder='Repita sua senha' secureTextEntry={pass} placeholderTextColor="11111140" />

                </Row>

                <SubLabel>Requisitos para nova senha</SubLabel>


                <Row>
                    
                </Row>
            </Column>

            }
        </MotiView>
    )
}
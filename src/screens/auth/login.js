import React, { useContext, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Alert, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Main, Column, Title, Row, Label, Button, ButtonPR, LabelPR, U, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { Eye, EyeOff, ArrowLeft, Lock, Mail, MapPinned, Phone, User, BookUser, Gift } from 'lucide-react-native'
import CheckBox from '@components/checkbox';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import BottomSheet from '@gorhom/bottom-sheet'
import { createPreferences } from '@api/user/preferences';
import { StatusBar } from 'expo-status-bar';
import { getUser, registerUser } from '@api/request/user/user';
import Error from '@components/error';
import validator from 'validator';
import { TextInputMask } from 'react-native-masked-text'


export default function AuthLoginScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [loading, setloading] = useState();
    const [type, settype] = useState('Entrar');
    const message = type === 'Entrar' || type === 'Registrar' ? { title: 'Bem-vindo!', message: 'Graças a pessoas generosas como você, levamos conforto e segurança a quem mais precisa.' } : { title: 'Escolha uma nova senha', message: 'Escolha uma senha segura e não a compartilhe com ninguém.' }
    const handleExit = (value) => {
        settype(value)
    }

    return (
        <Main style={{ backgroundColor: color.secundary, paddingTop: 60, }}>
            <StatusBar style="light" backgroundColor={color.secundary} animated />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ width: 46, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <MotiImage source={require('@imgs/logo.png')} style={{ objectFit: 'contain', width: 100, }} />
            </Row>

            <Column style={{ marginHorizontal: margin.h, paddingVertical: 22, }}>
                <Title style={{ fontSize: 28, color: "#fff", lineHeight: 52, }}>{message?.title}</Title>
                <Label style={{ color: "#fff", }}>{message?.message}</Label>
            </Column>

            <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingTop: 10, marginTop: 20, paddingHorizontal: margin.h, paddingVertical: 12, backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, }}>
                <Pressable onPress={() => { navigation.goBack() }} style={{ width: 80, height: 8, borderRadius: 100, backgroundColor: "#30303030", alignSelf: 'center', marginBottom: 20, marginTop: 0, }} />
                {type == 'Entrar' && <Entrar type={type} settype={settype} loading={loading} />}

                {type == 'Registrar' && <Registrar type={type} settype={settype} />}

                {type == 'ForgetPassword' && <ForgetPassword handleExit={handleExit} />}
            </ScrollView>


        </Main>
    )
}


const Registrar = ({ type, settype }) => {
    const passStrong = useRef()
    const navigation = useNavigation();
    const [pass, setpass] = useState(true);
    const [remember, setremember] = useState(true);
    const { color, font, margin, } = useContext(ThemeContext);
    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);
    const [focusCPF, setfocusCPF] = useState();
    const [focusCode, setfocusCode] = useState();
    const [focusCEP, setfocusCEP] = useState();
    const [focusName, setfocusName] = useState();
    const [focusWhatsapp, setfocusWhatsapp] = useState();

    const [loading, setloading] = useState(false);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpf, setcpf] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [cep, setcep] = useState('');
    const [name, setname] = useState('');
    const [code, setcode] = useState('');
    const [error, setError] = useState();

    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password?.length >= 8,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            number: /\d/.test(password),
        };
        return criteria;
    };

    const passwordCriteria = checkPasswordStrength(password);
    const porcentagePassword = Object.values(passwordCriteria).filter((e) => e).length / Object.values(passwordCriteria).length * 100;
    const messagePassword = porcentagePassword < 50 ? 'Fraca' : porcentagePassword < 80 ? 'Razoável' : 'Forte';
    const colorPassword = porcentagePassword < 50 ? color.red : porcentagePassword < 80 ? '#f5ad42' : color.green;

    const validateEmail = (email) => validator.isEmail(email);
    const validateCPF = (cpf) => validator.isLength(cpf, { min: 11, max: 14 });
    const validateCEP = (cep) => validator.isPostalCode(cep, 'BR');

    const handleRegister = async () => {
        setError('')
        //prenchimento obrigatório

        if (!name || name.length < 5) {
            return setError('Nome completo deve ter pelo menos 5 caracteres');
        }

        if (!validateCPF(cpf)) {
            return setError('CPF inválido');
        }
        if (whatsapp.length < 10) {
            return setError('WhatsApp inválido');
        }
        if (!validateCEP(cep)) {
            return setError('CEP inválido');
        }
        if (!validateEmail(email)) {
            return setError('E-mail inválido');
        }
        if (porcentagePassword < 50) {
            return setError('Senha fraca, tente uma senha mais forte');
        }

        setloading(true);
        const params = {
            "name": name,
            "email": email,
            "password": password,
            "cpf": cpf,
            "whatsapp": whatsapp,
            "cep": cep,
            "code": code,
            "is_whatsapp_send": remember == true ? 1 : 0,
        };

        //request api
        await registerUser(params).then(async (res) => {
            if (res.token) {
                const saveUser = {
                    "avatar": null,
                    "name": res.name,
                    "email": res.email,
                    "password": password,
                    "token": res.token,
                    "remember": remember,
                    "moedas": res.moedas,
                    "pontos": res.points,
                    "cpf": cpf,
                    "whatsapp": whatsapp,
                    "cep": cep,
                };
                await createPreferences(saveUser).then(res => {
                    if (res) {
                        navigation.replace('Tabs')
                        setloading(false)
                    }
                })
                setloading(false)
            }

        }).catch(err => {
            setError(err.message)
            setloading(false)
        }).finally(() => {
            setloading(false)
        })
    }
    return (

        <Column>
            <MotiView from={{ translateX: 20, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ type: 'timing' }}>
                <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                    <Button onPress={() => { settype('Entrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Entrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                        <Label style={{ color: type === 'Entrar' ? color.secundary : color.secundary + 99, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                    </Button>
                    <Column style={{ width: 12, }} />
                    <Button onPress={() => { settype('Registrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Registrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                        <Label style={{ color: type === 'Registrar' ? color.secundary : color.secundary + 99, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                    </Button>
                </Row>
                <KeyboardAvoidingView >
                    {error && <Error msg={error} show={error.length > 0} />}
                    <Row style={{ borderRadius: 8, marginTop: 15, borderWidth: 2, borderColor: focusName ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <User color={focusName ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            onFocus={() => setfocusName(true)}
                            onBlur={() => setfocusName(false)}
                            onChangeText={(e) => setname(e)}
                            value={name}
                            style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} placeholder='Nome completo *' placeholderTextColor="#11111190" />
                    </Row>

                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCPF ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <BookUser color={focusCPF ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInputMask
                            type={'cpf'}
                            onFocus={() => setfocusCPF(true)}
                            onBlur={() => setfocusCPF(false)}
                            onChangeText={(e) => setcpf(e)}
                            value={cpf}
                            keyboardType='number-pad'
                            style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} placeholder='CPF *' placeholderTextColor="#11111190" />
                    </Row>
                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusWhatsapp ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <Phone color={focusWhatsapp ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '(99) 9 9999-9999'
                            }}
                            onFocus={() => setfocusWhatsapp(true)}
                            onBlur={() => setfocusWhatsapp(false)}
                            value={whatsapp}
                            onChangeText={(e) => setwhatsapp(e)}
                            keyboardType='number-pad'  style={{ fontFamily: font.medium, color: color.secundary, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='WhatsApp *' placeholderTextColor="#11111190" />
                    </Row>
                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCEP ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <MapPinned color={focusCEP ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '99999-999'
                            }}
                            onFocus={() => setfocusCEP(true)}
                            onBlur={() => setfocusCEP(false)}
                            value={cep}
                            keyboardType='number-pad'
                            onChangeText={(e) => setcep(e)}
                             style={{ fontFamily: font.medium, color: color.secundary, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='CEP (Código Postal) *' placeholderTextColor="#11111190" />
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
                            keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} placeholder='E-mail *' placeholderTextColor="#11111190" />
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
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Senha (8 digitos)' secureTextEntry={pass} placeholderTextColor="11111140" />

                        <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 40, flexDirection: 'row', position: 'absolute', right: 18, top: 10, }}>
                            {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
                    </Row>
                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCode ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusCode ? color.secundary : "#ffffff50", }}>
                            <Gift color={focusCode ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            onFocus={() => setfocusCode(true)}
                            onBlur={() => setfocusCode(false)}
                            value={code}
                            onChangeText={(e) => setcode(e)}
                            style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Código de indicação' placeholderTextColor="11111140" />
                    </Row>

                    <AnimatePresence>
                        {password?.length >= 1 &&
                            <MotiView from={{ opacity: 0, translateX: -20, }} animate={{ opacity: 1, translateX: 0, }} exit={{ opacity: 0, translateX: -20, }} transition={{ type: 'timing', duration: 200, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: -10, }}>
                                    <Column style={{ backgroundColor: color.off, height: 10, borderRadius: 30, width: 100, }}>
                                        <Column style={{ width: porcentagePassword, height: 10, borderRadius: 100, backgroundColor: colorPassword, }} />
                                    </Column>
                                    <Button onPress={() => { passStrong.current.expand() }} >
                                        <U>
                                            <SubLabel style={{ color: colorPassword }}>{messagePassword}</SubLabel>
                                        </U>
                                    </Button>
                                </Row>
                            </MotiView>
                        }
                    </AnimatePresence>

                    <Pressable style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, }} onPress={() => { setremember(!remember) }} >
                        <CheckBox status={remember} />
                        <Label style={{ fontFamily: font.bold, fontSize: 14, marginLeft: 6, }}>Permito se contatado por WhatsApp</Label>
                    </Pressable>

                    <ButtonPR disabled={loading} onPress={handleRegister} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                        <Row>
                            {loading ?
                                <ActivityIndicator animating={loading} color="#fff" size={27} />
                                :
                                <LabelPR>Registrar</LabelPR>
                            }
                        </Row>
                    </ButtonPR>

                    <Label style={{ fontFamily: font.medium, fontSize: 16, textAlign: 'center', marginHorizontal: 6, marginBottom: 30, }}>Ao registrar-se você concorda com os <U>Termos de Uso</U> e <U>Politica de Privacidade</U></Label>
                </KeyboardAvoidingView>
            </MotiView>
            <BottomSheet ref={passStrong} snapPoints={[0.1, 200]}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <SubLabel style={{ color: color.secundary, fontSize: 18, }}>Requisitos para a senha</SubLabel>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.length ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Mínimo de 8 caracteres</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.upperCase ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Uma letra MAIÚSCULA.</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.lowerCase ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Uma letra minúscula.</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.number ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Um número.</Label>
                    </Row>
                </Column>
            </BottomSheet>
        </Column>

    )
}

const Entrar = ({ type, settype, }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext)
    const a = false;

    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);

    const passref = useRef(null);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [pass, setpass] = useState(true);
    const [remember, setremember] = useState(true);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const handleLogin = async () => {
        seterror('')
        //prenchimento obrigatório
        if (!email || email?.length < 5) {
            seterror('Preencha o campo de e-mail');
            return
        }
        if (!password || password?.length < 6) {
            seterror('Preencha o campo de senha');
            return
        }
        setloading(true);
        //request api
        await getUser(email, password).then(async (res) => {
            const params = {
                "avatar": res.avatar,
                "name": res.name,
                "email": res.email,
                "password": password,
                "token": res.token,
                "remember": remember,
                "moedas": res.moedas,
                "pontos": res.points,
            };
            await createPreferences(params).then(res => {
                if (res) {
                    navigation.replace('Tabs')
                    setloading(false)
                }
            })
        }).catch(err => {
            seterror(err.message)
            setloading(false)
        }).finally(() => {
            setloading(false)
        })
    };
    return (
        <MotiView from={{ translateX: -20, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ type: 'timing' }}>
            <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                <Button onPress={() => { settype('Entrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Entrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Entrar' ? color.secundary : color.secundary + 99, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                </Button>
                <Column style={{ width: 12, }} />
                <Button onPress={() => { settype('Registrar') }} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Registrar' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Registrar' ? color.secundary : color.secundary + 99, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                </Button>
            </Row>
            <KeyboardAvoidingView behavior="padding"  >
                {error && <Error msg={error} show={error.length > 0} />}

                <Row style={{ borderRadius: 8, marginTop: 15, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                        <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                    </Column>
                    <TextInput
                        onFocus={() => setfocusEmail(true)}
                        onBlur={() => setfocusEmail(false)}
                        onChangeText={(e) => setemail(e)}
                        onSubmitEditing={() => {passref?.current.focus()}}
                        value={email}
                        keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', color: color.secundary, }} placeholder='E-mail' placeholderTextColor="#11111190" />
                </Row>
                <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                        <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                    </Column>
                    <TextInput
                        ref={passref}
                        onFocus={() => setfocusPass(true)}
                        onBlur={() => setfocusPass(false)}
                        onChangeText={(e) => setpassword(e)}
                        onSubmitEditing={() => { handleLogin() }}
                        value={password}
                        keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Senha' secureTextEntry={pass} placeholderTextColor="11111140" />

                    <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', position: 'absolute', top: 8, right: 0, }}>
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
            </KeyboardAvoidingView>

            <ButtonPR onPress={handleLogin} disabled={loading} style={{ marginTop: 30, }}>
                <Row>
                    {loading ?
                        <ActivityIndicator color="#fff" size={27} />
                        :
                        <LabelPR>Entrar</LabelPR>
                    }
                </Row>
            </ButtonPR>


            {a &&
                <>
                    <Row style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ flexGrow: 1, height: 2, backgroundColor: color.off, }} />
                        <Label style={{ fontFamily: font.medium, textAlign: 'center', marginHorizontal: 6, }}>ou entre com</Label>
                        <Column style={{ flexGrow: 1, height: 2, backgroundColor: color.off, }} />
                    </Row>

                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 24, }}>
                        <Button style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6, }} >
                            <Column>
                                <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                    <MotiImage source={require('@icons/facebook.png')} style={{ width: 28, height: 28, }} />
                                </Column>
                                <Label style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Font_Medium', marginTop: 10, }}>Facebook</Label>
                            </Column>
                        </Button>
                        <Button style={{ justifyContent: 'center', marginHorizontal: 20, alignItems: 'center', borderRadius: 6, }} >
                            <Column>
                                <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                    <MotiImage source={require('@icons/google.png')} style={{ width: 28, height: 28, }} />
                                </Column>
                                <Label style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Font_Medium', marginTop: 10, }}>Google</Label>
                            </Column>
                        </Button>
                        <Button style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6, }} >
                            <Column>
                                <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                    <MotiImage source={require('@icons/apple.png')} style={{ width: 28, height: 28, }} />
                                </Column>
                                <Label style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Font_Medium', marginTop: 10, }}>Apple ID</Label>
                            </Column>
                        </Button>
                    </Row>
                </>
            }

        </MotiView>
    )
}


const ForgetPassword = ({ handleExit }) => {
    const { color, font, margin, } = useContext(ThemeContext);
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


    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password?.length >= 8,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            number: /\d/.test(password),
            repeat: password == passwordRepeat
        };
        return criteria;
    };

    const passwordCriteria = checkPasswordStrength(password);

    const handleNewPassword = () => {
        if (passwordCriteria?.length && passwordCriteria?.upperCase && passwordCriteria?.lowerCase && passwordCriteria?.number && passwordCriteria?.repeat) {
            setloading(true)
            setTimeout(() => {
                setloading(false)
                //chamada api
                handleExit('Entrar')
                // navigation.navigate('Home')
            }, 1500);
        }
    }

    return (
        <MotiView from={{ translateY: 20, opacity: 0 }} animate={{ translateY: 0, opacity: 1, }} transition={{ type: 'timing' }}>
            <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                <Button onPress={() => { handleExit('Entrar') }} disabled={type === 'Nova senha'} style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Redefinir' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Redefinir' ? color.secundary : color.secundary + 99, fontFamily: font.bold, textAlign: 'center', }}>Redefinir</Label>
                </Button>
                <Column style={{ width: 12, }} />
                <Button style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type === 'Nova senha' ? '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Nova senha' ? color.secundary : color.secundary + 99, fontFamily: font.bold, textAlign: 'center', }}>Nova senha</Label>
                </Button>
            </Row>


            {type === 'Redefinir' && <Column>

                {step == 1 && <Column>
                    <Column style={{ marginTop: 24, }}>
                        <Title style={{ marginBottom: 6, color: color.secundary, }}>Preencha seu e-mail</Title>
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
                            onSubmitEditing={handleSend}
                            keyboardType='email-address' style={{ fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='E-mail' placeholderTextColor="#11111190" />
                    </Row>
                    <ButtonPR disabled={loading} onPress={handleSend} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                        <Row>
                            {loading ? <ActivityIndicator animating={loading} color="#fff" size={27} /> : <LabelPR>Enviar código</LabelPR>}
                        </Row>
                    </ButtonPR>
                </Column>}

                {step == 2 && <Column>
                    <Column style={{ marginTop: 24, }}>
                        <Title style={{ color: color.secundary, marginBottom: 8, }}>Código de verificação</Title>
                        <Label>Confira seu e-mail e copie o código enviado.</Label>
                    </Column>

                    <Row style={{ borderRadius: 8, marginTop: 24, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                        <TextInput
                            onFocus={() => setfocus1(true)}
                            onBlur={() => setfocus1(false)}
                            value={digit1}
                            onSubmitEditing={() => { fc2.current?.focus() }}
                            ref={fc1}
                            selectionColor='transparent'
                            onChangeText={(e) => { setdigit1(e); if (e.length === 1) fc2.current?.focus() }}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus1 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus2(true)}
                            onBlur={() => setfocus2(false)}
                            value={digit2}
                            ref={fc2}
                            onSubmitEditing={() => { fc3.current?.focus() }}
                            underlineColorAndroid='transparent'
                            selectionColor='transparent'
                            onChangeText={(e) => { setdigit2(e); if (e.length === 1) fc3.current?.focus() }}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus2 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus3(true)}
                            onBlur={() => setfocus3(false)}
                            value={digit3}
                            onSubmitEditing={() => { fc4.current?.focus() }}
                            ref={fc3}
                            selectionColor='transparent'
                            onChangeText={(e) => { setdigit3(e); if (e.length === 1) fc4.current?.focus() }}
                            keyboardType='numeric' style={{ fontFamily: font.bold, textAlign: 'center', borderRadius: 24, borderWidth: 2, borderColor: focus3 ? color.primary : color.off, fontSize: 28, justifyContent: 'center', alignItems: 'center', width: 64, height: 64, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus4(true)}
                            onBlur={() => setfocus4(false)}
                            value={digit4}
                            ref={fc4}
                            selectionColor='transparent'
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
                    <Title style={{ marginBottom: 6, color: color.secundary, }}>Crie uma nova senha</Title>
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
                        keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Nova senha' secureTextEntry={pass} placeholderTextColor="11111140" />

                    <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 40, flexDirection: 'row', position: 'absolute', top: 8, right: 18, }}>
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
                        keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Repita sua senha' secureTextEntry={pass} placeholderTextColor="11111140" />

                </Row>

                <SubLabel style={{ color: color.secundary, fontSize: 18, }}>Requisitos para nova senha</SubLabel>
                <Row style={{ marginTop: 8, }}>
                    {passwordCriteria?.length ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                    <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Mínimo de 8 caracteres</Label>
                </Row>
                <Row style={{ marginTop: 8, }}>
                    {passwordCriteria?.upperCase ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                    <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Uma letra MAIÚSCULA.</Label>
                </Row>
                <Row style={{ marginTop: 8, }}>
                    {passwordCriteria?.lowerCase ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                    <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Uma letra minúscula.</Label>
                </Row>
                <Row style={{ marginTop: 8, }}>
                    {passwordCriteria?.number ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                    <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Um número.</Label>
                </Row>
                <Row style={{ marginTop: 8, }}>
                    {passwordCriteria?.repeat ? <Octicons name="check-circle-fill" size={18} color={color.green} /> : <Octicons name="x-circle-fill" size={18} color={color.red} />}
                    <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Repita a senha.</Label>
                </Row>

                <ButtonPR disabled={loading} onPress={handleNewPassword} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                    <Row>
                        {loading ? <ActivityIndicator animating={loading} color="#fff" size={27} /> : <LabelPR>Definir nova senha</LabelPR>}
                    </Row>
                </ButtonPR>
            </Column>
            }
        </MotiView>
    )
}
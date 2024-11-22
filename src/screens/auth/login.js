import React, { useContext, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, Animated, Vibration, Dimensions } from 'react-native';
import { Main, Column, Title, Row, Label, Button, ButtonPR, LabelPR, U, SubLabel, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiView } from 'moti';
import { Eye, EyeOff, ArrowLeft, Lock, Mail, MapPinned, Phone, User, BookUser, Gift, X } from 'lucide-react-native'
import CheckBox from '@components/checkbox';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import BottomSheet  from '@gorhom/bottom-sheet'
import { createPreferences } from '@api/user/preferences';
import { StatusBar } from 'expo-status-bar';
import { getUser, registerUser } from '@api/request/user/user';

import Error from '@components/error';
import Success from '@components/success';
import { Image } from 'expo-image';

import validator from 'validator';
import { resetPassword, resetPasswordCode, resetPasswordNew, verifyEmail } from '@api/request/user/user';
import { OneSignal } from 'react-native-onesignal'
import { maskCep, maskCpf, maskPhone } from '@hooks/maks';
import { FadeInDown, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AuthLoginScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [loading, setloading] = useState();
    const [type, settype] = useState('Entrar');
    const [email, setemail] = useState('');
    const message = type === 'Entrar' || type === 'Registrar' ? { title: 'Bem-vindo!', message: 'Graças a pessoas generosas como você, levamos conforto e segurança a quem mais precisa.' } : { title: 'Redefinir senha', message: 'Escolha uma senha segura e não a compartilhe com ninguém.' }
    const handleExit = (value) => {
        settype(value)
    }

    const visible = type === 'Entrar' || type === 'Registrar' ? true : false
    const registerref = useRef()
    return (
        <Main style={{ backgroundColor: color.secundary, paddingTop: 60, }}>
            <StatusBar style="light" backgroundColor={color.secundary} animated />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ width: 46, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <Image source={require('@imgs/logo.png')} contentFit="contain" style={{ width: 100, }} />
            </Row>

            <Column style={{ marginHorizontal: margin.h, paddingVertical: 22, }}>
                <Title style={{ fontSize: 28, color: "#fff", lineHeight: 52, }}>Bem-vindo!</Title>
                <Label style={{ color: "#fff", }}>Graças a pessoas generosas como você, levamos conforto e segurança a quem mais precisa.</Label>
            </Column>


            <ScrollView style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: margin.h, paddingVertical: 20, flex: 1, }}>
            {visible && <Row >
                <Button disabled={type === 'Entrar'} onPress={() => { settype('Entrar'); }} style={{ paddingVertical: 10, flexGrow: 2, backgroundColor: type === 'Entrar' ? color.primary + 20 : color.secundary + 20, borderRadius: 100, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Entrar' ? color.primary : color.secundary, fontFamily: font.bold, textAlign: 'center', textDecorationLine: type == 'Entrar' ? 'underline' : 'none', }}>Entrar</Label>
                </Button>
                <Column style={{ width: 12, }} />
                <Button disabled={type === 'Registrar'} onPress={() => { settype('Registrar'); }} style={{ paddingVertical: 10, backgroundColor: type === 'Registrar' ? color.primary + 20 : color.secundary + 20, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: type === 'Registrar' ? color.primary : color.secundary, fontFamily: font.bold, textAlign: 'center', textDecorationLine: type == 'Registrar' ? 'underline' : 'none', }}>Criar conta</Label>
                </Button>
            </Row>}
            {type == 'Registrar' && <Registrar settype={settype} setemail={setemail} email={email} />}
            {type == 'Entrar' && <Entrar settype={settype} loading={loading} setemail={setemail} email={email} />}
            {type == 'ForgetPassword' && <ForgetPassword handleExit={handleExit} />}
            {type === 'ConfirmEmail' && <ConfirmEmail handleExit={handleExit} email={email} />}
            </ScrollView>
        </Main>
    )
}

const Registrar = ({ settype, email, setemail, }) => {
    const navigation = useNavigation();
    const passStrong = useRef()
    const [pass, setpass] = useState(true);
    const [remember, setremember] = useState(true);
    const { color, font, margin, } = useContext(ThemeContext);

    const [focusName, setfocusName] = useState();
    const [focusCPF, setfocusCPF] = useState();
    const [focusWhatsapp, setfocusWhatsapp] = useState();
    const [focusCEP, setfocusCEP] = useState();
    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);
    const [focusCode, setfocusCode] = useState();

    const nameRef = useRef();
    const cpfRef = useRef();
    const whatsappRef = useRef();
    const cepRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const codeRef = useRef();
    const [loading, setloading] = useState(false);

    const [name, setname] = useState('');
    const [cpf, setcpf] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [cep, setcep] = useState('');
    const [password, setpassword] = useState('');
    const [code, setcode] = useState('');

    const [error, setError] = useState();
    const [success, setsuccess] = useState();
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
            return setError('Nome completo deve ter pelo menos 5 letras');
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

        const params = {
            "name": name,
            "email": email,
            "password": password,
            "cpf": cpf,
            "whatsapp": whatsapp,
            "cep": cep,
            "code": code.toUpperCase(),
            "is_whatsapp_send": remember == true ? 1 : 0,
        };

        try {
            setloading(true);
            const res = await registerUser(params)
            setsuccess('Confirme seu e-mail para ativar sua conta. Aguarde um momento...')
            settype('ConfirmEmail')

        } catch (error) {
            setError(error.message)
            Vibration.vibrate(300);
        } finally {
            setloading(false);
        }



    }
    return (

        <Column>

            <Row style={{ borderRadius: 8, marginTop: 15, borderWidth: 2, borderColor: focusName ? color.primary : color.off, }}>
                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                    <User color={focusName ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusName(true)}
                    onBlur={() => setfocusName(false)}
                    onChangeText={(e) => setname(e)}
                    onSubmitEditing={() => cpfRef.current?.focus()}
                    ref={nameRef}
                    value={name}
                    style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} placeholder='Nome completo *' placeholderTextColor="#11111190" />
            </Row>

            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCPF ? color.primary : color.off, }}>
                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                    <BookUser color={focusCPF ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusCPF(true)}
                    onBlur={() => setfocusCPF(false)}
                    onChangeText={(e) => setcpf(maskCpf(e))}
                    onSubmitEditing={() => whatsappRef.current?.focus()}
                    value={cpf}
                    ref={cpfRef}
                    keyboardType='number-pad'
                    style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} placeholder='CPF *' placeholderTextColor="#11111190" />
            </Row>

            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusWhatsapp ? color.primary : color.off, }}>
                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                    <Phone color={focusWhatsapp ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusWhatsapp(true)}
                    onBlur={() => setfocusWhatsapp(false)}
                    onSubmitEditing={() => cepRef.current?.focus()}
                    value={whatsapp}
                    ref={whatsappRef}
                    onChangeText={(e) => setwhatsapp(maskPhone(e))}
                    keyboardType='number-pad' style={{ fontFamily: font.medium, color: color.secundary, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='WhatsApp *' placeholderTextColor="#11111190" />
            </Row>

            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCEP ? color.primary : color.off, }}>
                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                    <MapPinned color={focusCEP ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusCEP(true)}
                    onBlur={() => setfocusCEP(false)}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    value={cep}
                    ref={cepRef}
                    keyboardType='number-pad'
                    onChangeText={(e) => setcep(maskCep(e))}
                    style={{ fontFamily: font.medium, color: color.secundary, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='CEP (Código Postal) *' placeholderTextColor="#11111190" />
            </Row>
            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, }}>
                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                    <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusEmail(true)}
                    onBlur={() => setfocusEmail(false)}
                    onSubmitEditing={() => passRef.current?.focus()}
                    value={email}
                    ref={emailRef}
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
                    onSubmitEditing={() => codeRef.current?.focus()}
                    value={password}
                    ref={passRef}
                    onChangeText={(e) => setpassword(e)}
                    keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Senha *' secureTextEntry={pass} placeholderTextColor="11111190" />

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
                    ref={codeRef}
                    maxLength={10}
                    onSubmitEditing={() => handleRegister()}
                    onChangeText={(e) => setcode(e)}
                    style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Código de indicação' placeholderTextColor="11111190" />
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

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Column style={{ flexGrow: 1, }}>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => { setremember(!remember) }} >
                        <CheckBox status={remember} />
                        <Label style={{ fontFamily: font.bold, fontSize: 14, lineHeight: 14, marginLeft: 6, color: remember ? color.blue : color.label, }}>Permito ser {'\n'}contatado por{'\n'}WhatsApp</Label>
                    </Pressable>
                </Column>
                <Button onPress={() => { settype('Entrar');; }} style={{ borderRadius: 8, backgroundColor: color.primary + 10, padding: 12, }}>
                    <Column style={{}}>
                        <Label style={{ fontFamily: font.medium, color: color.secundary + 99, textAlign: 'right', fontSize: 12, lineHeight: 12, }}>Já possui uma conta?</Label>
                        <Label style={{ fontFamily: font.bold, textAlign: 'right', fontSize: 14, lineHeight: 16, color: color.primary, }}>Entre por aqui</Label>
                    </Column>
                </Button>
            </Row>
            <Pressable onPress={() => { navigation.navigate('Terms') }} >
                <Label style={{ fontFamily: font.medium, textAlign: 'center', fontSize: 14, marginHorizontal: 6, marginTop: 12, }}>Ao registrar-se você concorda com os {'\n'}<U>Termos de Uso e Politica de Privacidade</U></Label>
            </Pressable>

            {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

            <ButtonPR disabled={loading} onPress={handleRegister} style={{ marginTop: 20, backgroundColor: color.secundary, marginBottom: 20, }}>
                <Row>
                    {loading ?
                        <ActivityIndicator animating={loading} color="#fff" size={27} />
                        :
                        <LabelPR>Registrar</LabelPR>
                    }
                </Row>
            </ButtonPR>
            <Column style={{ height: 40, }} />


            <BottomSheet ref={passStrong} snapPoints={[0.1, 300]} backgroundStyle={{ backgroundColor: '#f7f7f7', }} handleIndicatorStyle={{ backgroundColor: '#30303030', marginVertical: 4, width: 80, height: 8, borderRadius: 100, alignSelf: 'center', }}>
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
                    <Button onPress={() => { passStrong.current.close() }} style={{ borderRadius: 100, backgroundColor: color.secundary, paddingHorizontal: 20, marginVertical: 12, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', }}>
                        <Label style={{ color: "#fff", fontFamily: font.bold, }}>Fechar</Label>
                    </Button>
                </Column>
            </BottomSheet>
        </Column>

    )
}

const Entrar = ({ settype, email, setemail, registerref }) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext)
    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);
    const passref = useRef(null);

    const [password, setpassword] = useState('');
    const [pass, setpass] = useState(true);
    const [remember, setremember] = useState(true);
    const [loading, setloading] = useState();

    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
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

        try {
            const res = await getUser(email, password);
            if (res?.status === 'Pendente') {
                seterror('Confirme seu e-mail para ativar sua conta. Aguarde um momento...')
                setTimeout(() => {
                    settype('ConfirmEmail')
                }, 1000);
                return
            }
            else if (res?.status == 'Inativo') {
                seterror('Sua conta foi desativada, entre em contato com o suporte')
                return
            }
            else if (res?.status === 'Ativo') {
                setsuccess('Logado com sucesso! Aguarde um momento...')
                const saveUser = {
                    "avatar": null,
                    "name": res?.name,
                    "email": res?.email,
                    "token": res?.token,
                    "remember": remember,
                    "moedas": res?.moedas,
                    "pontos": res?.points,
                };
                if (res.uiid) {
                    OneSignal.login(res.uiid)
                }

                const preferences = await createPreferences(saveUser)
                if (preferences) {
                    navigation.replace('Tabs')
                }
            }
        } catch (error) {
            seterror(error.message)
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            <Row style={{ borderRadius: 8, marginTop: 15, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, }}>
                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                    <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                </Column>
                <TextInput
                    onFocus={() => setfocusEmail(true)}
                    onBlur={() => setfocusEmail(false)}
                    onChangeText={(e) => setemail(e)}
                    onSubmitEditing={() => { passref?.current.focus() }}
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
                    <Label style={{ fontFamily: font.bold, fontSize: 14, marginLeft: 6, color: remember ? color.blue : color.label, }}>Manter conectado</Label>
                </Pressable>
                <Pressable onPress={() => { settype('ForgetPassword') }} style={{ alignSelf: 'center', }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, fontSize: 14, textDecorationStyle: 'solid', textDecorationLine: "underline", }}>Esqueci minha senha</Label>
                </Pressable>
            </Row>
            {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}
            <ButtonPR onPress={handleLogin} disabled={loading} style={{ marginTop: 30, }}>
                <Row>
                    {loading ?
                        <ActivityIndicator color="#fff" size={27} />
                        :
                        <LabelPR>Entrar</LabelPR>
                    }
                </Row>
            </ButtonPR>
            <Button onPress={() => { settype('Registrar'); registerref?.current.snapToIndex(1); }} style={{ borderRadius: 8, backgroundColor: color.primary + 10, padding: 16, marginTop: 20, alignSelf: 'center', }} >
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ fontFamily: font.medium, fontSize: 16, lineHeight: 16, }}>Não possui uma conta?</Label>
                    <Label style={{ fontFamily: font.bold, color: color.primary, letterSpacing: -0.6, fontSize: 16, lineHeight: 20, }}>Clique aqui para começar</Label>
                </Column>
            </Button>
        </>
    )
}

const ConfirmEmail = ({ email, handleExit }) => {
    const { color, font, margin, } = useContext(ThemeContext);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const navigation = useNavigation();

    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (digit1?.length === 1 && digit2?.length === 1 && digit3?.length === 1 && digit4?.length === 1) {
            try {
                const res = await verifyEmail(email, digit1 + digit2 + digit3 + digit4)
                if (res) {
                    setsuccess('Email verificado com sucesso! Aguarde um momento...')
                    const saveUser = {
                        "avatar": res.avatar ? res.avatar : null,
                        "name": res.name,
                        "email": res.email,
                        "token": res.token,
                        "moedas": res.moedas,
                        "pontos": res.points,
                    };
                    OneSignal.login(res.uiid)
                    const preferences = await createPreferences(saveUser)
                    setTimeout(() => {
                        navigation.replace('Tabs')
                    }, 500);
                }
            } catch (error) {
                console.log(error)
                seterror(error.message)
            } finally {
                setloading(false)
            }
        } else {
            seterror('Preencha o código de verificação')
            setloading(false)
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

    return (
        <MotiView from={{ translateY: 20, opacity: 0 }} animate={{ translateY: 0, opacity: 1, }} transition={{ type: 'timing' }}>
            <Column>
                <Column style={{ marginTop: 24, }}>
                    <Title style={{ color: color.secundary, marginBottom: 8, }}>Código de verificação</Title>
                    <Label>Confira seu e-mail e copie o código enviado.</Label>
                </Column>
                {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

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
            </Column>

            <Column style={{ height: 40, }} />
        </MotiView>
    )
}

const ForgetPassword = ({ handleExit, }) => {
    const { color, font, margin, } = useContext(ThemeContext);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    const [type, settype] = useState('Redefinir');
    const [focusEmail, setfocusEmail] = useState();
    const [email, setemail] = useState('');
    const [codigo, setcode] = useState();

    const [password, setpassword] = useState();
    const [passwordRepeat, setpasswordRepeat] = useState();

    const [step, setstep] = useState(1);
    const handleSend = async () => {
        seterror()
        setsuccess()
        setloading(true)
        resetPassword(email).then(res => {
            if (res.email) {
                setstep(2)
            } else {
                seterror(res)
            }
        }).catch(err => {
            seterror(err)
        }).finally(() => {
            setloading(false)
        })
    }

    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (digit1?.length === 1 && digit2?.length === 1 && digit3?.length === 1 && digit4?.length === 1) {
            try {
                const res = await resetPasswordCode(email, digit1 + digit2 + digit3 + digit4)
                if (res?.codigo) {
                    setcode(res?.codigo)
                    settype('Nova senha')
                } else {
                    seterror(res)
                }
            } catch (error) {
                console.log(error)

            }
            finally {
                setloading(false)
            }

        }
    }

    const params = { password: password, password_confirmation: passwordRepeat, email: email, codigo: codigo }
    const handleReset = async () => {
        setloading(true)
        seterror()
        setsuccess()
        try {
            const res = await resetPasswordNew(params)
            setsuccess(res?.message)
            setTimeout(() => {
                handleExit('Entrar')
            }, 2000);

        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
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

    const isPasswordStrong = () => {
        return Object.values(passwordCriteria).every(criterion => criterion);
    };

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

    return (
        <MotiView from={{ translateY: 20, opacity: 0 }} animate={{ translateY: 0, opacity: 1, }} transition={{ type: 'timing' }}>

            <Row style={{ alignSelf: 'flex-end', position: 'absolute', top: 0, zIndex: 99, }}>
                <Button onPress={() => handleExit('Entrar')} style={{ width: 42, backgroundColor: color.secundary, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <X size={24} color="#fff" />
                </Button>
            </Row>

            {type === 'Redefinir' && <Column>

                {step == 1 && <Column>
                    <Column style={{ marginTop: 12, }}>
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
                    {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

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
                    {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

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

                {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

                <ButtonPR disabled={loading || !isPasswordStrong()} onPress={handleReset} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                    <Row>
                        {loading ? <ActivityIndicator animating={loading} color="#fff" size={27} /> : <LabelPR>Definir nova senha</LabelPR>}
                    </Row>
                </ButtonPR>
            </Column>
            }
            <Column style={{ height: 40, }} />
        </MotiView>
    )
}
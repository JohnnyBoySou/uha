import React, { useContext, useState, useRef } from 'react';
import { Main, Column, Title, Row, Label, Scroll, ButtonPR, LabelPR, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { Eye, EyeOff, ArrowLeft, Lock, Mail, MapPinned, Phone, User, BookUser, Gift } from 'lucide-react-native'
import { TextInput, Pressable, ActivityIndicator } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { resetPasswordUser} from '@api/request/user/reset';
import Success from '@components/success';
import Error from '@components/error';

export default function AccountResetScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    
    const [focusOld, setfocusOld] = useState();
    const [focusPass, setfocusPass] = useState();
    const [focusPass2, setfocusPass2] = useState();
    const [pass, setpass] = useState(true);
    const [pass2, setpass2] = useState(true);
    const [pass3, setpass3] = useState(true);
    const [oldpassword, setoldpassword] = useState();
    const [password, setpassword] = useState();
    const [passwordRepeat, setpasswordRepeat] = useState();

    const repeat = useRef()
    const newpass = useRef()

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
    const handleNewPassword = async () => {
        try {
            if (isPasswordStrong()) {
                seterror()
                setsuccess()
                setloading(true)
                const params = { oldpassword: oldpassword, password: password, password_confirmation: passwordRepeat }
                resetPasswordUser(params).then(res => {
                    setsuccess(res?.message)
                }).catch((err) => {
                    seterror(err.message)
                })
            }
        } catch (error) {
            console.log(error)
        } finally{
            setloading(false)
        }
    }

    const isPasswordStrong = () => {
        return Object.values(passwordCriteria).every(criterion => criterion);
    };

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll  >
                <Header rose />


                <Column style={{ marginHorizontal: 28, }}>
                    <Column style={{ marginTop: 24, }}>
                        <Title style={{ marginBottom: 6, color: color.secundary, }}>Crie uma nova senha</Title>
                    </Column>
                    {success ? <Success msg={success} show={true} /> : error ? <Error msg={error}  show={true}/> : null}

                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusOld ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusOld ? color.secundary : "#ffffff50", }}>
                            <Lock color={focusOld ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            onFocus={() => setfocusOld(true)}
                            onBlur={() => setfocusOld(false)}
                            value={oldpassword}
                            selectTextOnFocus={false}
                            onChangeText={(e) => setoldpassword(e)}
                            editable={!loading}
                            onSubmitEditing={() => { newpass.current?.focus() }}
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Senha atual' secureTextEntry={pass} placeholderTextColor="11111140" />

                        <Pressable onPress={() => { setpass(!pass) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 40, flexDirection: 'row', position: 'absolute', top: 8, right: 18, }}>
                            {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
                    </Row>

                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50", }}>
                            <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            ref={newpass}
                            onFocus={() => setfocusPass(true)}
                            onBlur={() => setfocusPass(false)}
                            value={password}
                            selectTextOnFocus={false}
                            editable={!loading}
                            onChangeText={(e) => setpassword(e)}
                            onSubmitEditing={() => { repeat.current?.focus() }}
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Nova senha' secureTextEntry={pass2} placeholderTextColor="11111140" />

                        <Pressable onPress={() => { setpass2(!pass2) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 40, flexDirection: 'row', position: 'absolute', top: 8, right: 18, }}>
                            {pass2 ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
                    </Row>
                    <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, marginBottom: 12, borderColor: focusPass2 ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, borderColor: focusPass2 ? color.secundary : "#ffffff50", }}>
                            <Lock color={focusPass2 ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput
                            onFocus={() => setfocusPass2(true)}
                            onBlur={() => setfocusPass2(false)}
                            value={passwordRepeat}
                            editable={!loading}
                            selectTextOnFocus={false}
                            ref={repeat}
                            onChangeText={(e) => setpasswordRepeat(e)}
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='Repita sua senha' secureTextEntry={pass3} placeholderTextColor="11111140" />
                        <Pressable onPress={() => { setpass3(!pass3) }} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 40, flexDirection: 'row', position: 'absolute', top: 8, right: 18, }}>
                            {pass3 ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
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

                    <ButtonPR disabled={!isPasswordStrong() || loading} onPress={handleNewPassword} style={{ marginTop: 30, backgroundColor: isPasswordStrong() ? color.primary : color.secundary, marginBottom: 20, }}>
                        <Row>
                            {loading ? <ActivityIndicator animating={loading} color="#fff" size={27} /> : <LabelPR>Definir nova senha</LabelPR>}
                        </Row>
                    </ButtonPR>
                </Column>

                <Column style={{ height: 100, }} />
            </Scroll>

        </Main>
    )
}

import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import Input from '@components/input';
import { MotiView, AnimatePresence, MotiImage } from 'moti';
import { Check, Pencil } from 'lucide-react-native';
import validator from 'validator';
import { updateUser, listUser} from '@api/request/user/user';

import * as ImagePicker from 'expo-image-picker';
import { updatePreferences } from '@api/user/preferences';
import { useIsFocused } from '@react-navigation/native';

export default function AccountDetailsScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    const [error, setError] = useState();
    const [loading, setloading] = useState(true);

    const [email, setemail] = useState();
    const [whatsapp, setwhatsapp] = useState();
    const [cep, setcep] = useState();
    const [name, setname] = useState();
    const [cpf, setcpf] = useState();
    const [avatar, setavatar] = useState();
    const [old_avatar, setold_avatar] = useState();
    const isFocused = useIsFocused();
    const [disabled, setdisabled] = useState(true);

    useEffect(() => {
        const fecthData = async () => {
            setloading(true);
            await listUser().then(res => {
                setavatar(res.avatar);
                setold_avatar(res.avatar);
                setemail(res.email);
                setname(res.name);
                setcpf(res.cpf);
                setcep(res.cep);
                setwhatsapp(res.whatsapp);
            }).catch(error => console.log(error)).finally(() => setloading(false));
        }
        fecthData();
    }, [isFocused]);


    const [temporaryImg, settemporaryImg] = useState();
    const handleImage = async () => {
        const responsey = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 1, });
        if (!responsey.canceled) {
            setavatar(responsey.assets[0].base64);
            settemporaryImg(responsey.assets[0].uri);
            setdisabled(false);
        } else {
            setavatar(old_avatar?.length > 0 ? old_avatar : null)
        }
    }

    const handleSave = async () => {
        setError('')

        if (!name || name.length < 5) {
            return setError('Nome completo deve ter pelo menos 5 caracteres');
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

        setloading(true);
        const params = {
            "name": name,
            "email": email,
            "whatsapp": whatsapp,
            "cep": cep
        };
        if(avatar !== old_avatar){
            params.avatar = avatar
        }

        await updateUser(params).then(async res => {
            if (res) {
                const pr = {
                    "avatar": res.avatar,
                    "name": res.name,
                    "whatsapp": res.whatsapp,
                    "cep": res.cep
                };
                await updatePreferences(pr).then(res => {
                    if (res) {
                        setloading(false);
                    }
                })
                setdisabled(true);
                setloading(false);
            }
        })
    }
    
    const profile = temporaryImg ? { uri: `file://${temporaryImg}` } : avatar ? { uri: avatar } : require('@imgs/user_placeholder.png')

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header title='Dados cadastrais' rose />
                {loading ? <ActivityIndicator size="large" color={color.primary} style={{ marginTop: 160, }} /> :
                <Column style={{ paddingHorizontal: margin.h, marginTop: 20, }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                        <MotiImage style={{ width: 144, height: 144, borderRadius: 100, alignSelf: 'center', objectFit: 'cover' }} source={profile} />
                        <Pressable onPress={handleImage}>
                            <SubLabel style={{ color: color.primary, marginTop: 12, }}>Escolher foto de perfil</SubLabel>
                        </Pressable>
                    </Column>

                    <Column style={{ marginBottom: 20, }}>
                        <Input label="E-mail" disabled={true} value={email} setValue={setemail} />
                        <Input label="Nome completo" disabled={disabled} value={name} setValue={setname} />
                        <Input label="WhatsApp" disabled={disabled} value={whatsapp} setValue={setwhatsapp} />
                        <Input label="CEP" disabled={disabled} value={cep} setValue={setcep} />
                        <Input label="CPF" disabled={true} value={cpf} setValue={setcpf} />
                    </Column>

                    <Column style={{ marginBottom: 20, }}>
                        <Row style={{ marginBottom: 8, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Title style={{ fontSize: 20, }}>Senha</Title>
                        </Row>
                        <ButtonOut style={{ borderColor: color.primary, }}>
                            <Label style={{ color: color.primary, fontFamily: font.medium, }}>Redefinir senha</Label>
                        </ButtonOut>
                    </Column>

                    <Label style={{ backgroundColor: color.primary + 20, color: color.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, textAlign: 'center', }}>
                        As alterações podem levar alguns minutos para serem processadas
                    </Label>
                </Column>}
                <Column style={{ height: 120, }} />
            </Scroll>
            <AnimatePresence>
                <MotiView from={{ opacity: 0, scale: .6, rotate: '32deg', }} animate={{ opacity: 1, rotate: '0deg', scale: 1, }} transition={{ type: 'timing' }} exit={{ opacity: 0, rotate: '32deg', scale: .7, }} style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                    <Button onPress={() => {
                        if (disabled) {
                            setdisabled(false)
                        }
                        else {
                            handleSave()
                            setdisabled(true)
                        }
                    }} disabled={loading} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: disabled ? color.primary : color.green, justifyContent: 'center', alignItems: 'center', }}>
                        <Row>
                            {loading ? <ActivityIndicator size="small" color="#fff" />
                            : disabled ?
                                <Pencil size={24} color="#fff" /> :
                                <Check size={24} color="#fff" />}
                        </Row>
                    </Button>
                </MotiView>
            </AnimatePresence>
        </Main>
    )
}


const validateEmail = (email) => validator.isEmail(email);
const validateCEP = (cep) => validator.isPostalCode(cep, 'BR');
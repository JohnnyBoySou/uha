import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, TextInput, Image } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';

import { BookUser, Check, Mail, MapPinned, Pencil, Phone, User } from 'lucide-react-native';
import validator from 'validator';
import { updateUser, listUser } from '@api/request/user/user';

import * as ImagePicker from 'expo-image-picker';
import { updatePreferences } from '@api/user/preferences';
import { TextInputMask } from 'react-native-masked-text';
import { Skeleton } from 'moti/skeleton';

export default function AccountDetailsScreen({ navigation }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [error, setError] = useState();

    const [date, setdate] = useState();
    const [loading, setloading] = useState(true);
    const [whatsapp, setwhatsapp] = useState();
    const [cep, setcep] = useState();
    const [name, setname] = useState();
    const [avatar, setavatar] = useState();
    const [old_avatar, setold_avatar] = useState();
    const [disabled, setdisabled] = useState(true);

    const [focusCEP, setfocusCEP] = useState();
    const [focusName, setfocusName] = useState();
    const [focusWhatsapp, setfocusWhatsapp] = useState();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await listUser();
                setavatar(res.avatar);
                setdate(res);
                setold_avatar(res.avatar);
                setname(res.name);
                setcep(res.cep);
                setwhatsapp(res.whatsapp);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false);
            }
        }
        setTimeout(() => {
            fecthData();
        }, 500);
    }, []);

    const [temporaryImg, settemporaryImg] = useState(false);
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
        setfocusCEP(false);
        setfocusName(false);
        setfocusWhatsapp(false);

        if (!name || name.length < 4) {
            return setError('Nome completo deve ter pelo menos 4 letras');
        }
        if (whatsapp.length < 10) {
            return setError('WhatsApp inválido');
        }
        if (!validateCEP(cep)) {
            return setError('CEP inválido');
        }

        setloading(true);

        try {
            const params = {
                "name": name,
                "whatsapp": whatsapp,
                "cep": cep,
                "email": date?.email,
            };
            if (avatar !== old_avatar) {
                params.avatar = avatar
            }
    
            const update = await updateUser(params);
            const pr = {
                "avatar": update.avatar,
                "name": update.name,
                "whatsapp": update.whatsapp,
                "cep": update.cep
            };
    
            const preferences = await updatePreferences(pr);
            if (preferences) {
                setloading(false);
                setdisabled(true);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
            setdisabled(true);
        }
       
        
    }
    const profile = temporaryImg ? { uri: `file://${temporaryImg}` } : avatar ? { uri: avatar } : require('@imgs/user_placeholder.png')

    if(loading) return(<Main style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 120, }}><SkeletonLoading/></Main>)
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>
                <Header title='Dados cadastrais' rose />
                    <Column style={{ paddingHorizontal: margin.h, marginTop: 20, }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                            <Image style={{ width: 144, height: 144, borderRadius: 100, alignSelf: 'center', }} contentFit="cover" transition={1000} cachePolicy="disk"  source={profile} />
                            <Pressable onPress={handleImage}>
                                <SubLabel style={{ color: color.primary, marginTop: 12, }}>Escolher foto de perfil</SubLabel>
                            </Pressable>
                        </Column>
                        <Column style={{ marginBottom: 20, }}>
                            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: color.off, }}>
                                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                    <Mail color={color.secundary} size={22} />
                                </Column>
                                <Column style={{  paddingVertical: 12, width: '78%', }} >
                                    <Title style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, }}>{date?.email}</Title>
                                </Column>
                            </Row>
                            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: color.off, }}>
                                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                    <BookUser color={color.secundary} size={22} />
                                </Column>
                                <Column style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} >
                                    <Title style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, }}>{date?.cpf}</Title>
                                </Column>
                            </Row>

                            <Row style={{ borderRadius: 8, marginTop: 15, borderWidth: 2, borderColor: focusName ? color.primary : color.off, }}>
                                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                    <User color={focusName ? color.primary : color.secundary} size={22} />
                                </Column>
                                <TextInput
                                    disabled={disabled}
                                    onFocus={() => setfocusName(true)}
                                    onBlur={() => setfocusName(false)}
                                    onChangeText={(e) => setname(e)}
                                    value={name}
                                    style={{ fontFamily: font.medium, fontSize: 18, color: color.secundary, paddingVertical: 12, width: '78%', }} placeholder='Nome completo *' placeholderTextColor="#11111190" />
                            </Row>

                            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusWhatsapp ? color.primary : color.off, }}>
                                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                    <Phone color={focusWhatsapp ? color.primary : color.secundary} size={22} />
                                </Column>
                                <TextInputMask
                                    disabled={disabled}
                                    type={'custom'}
                                    options={{
                                        mask: '(99) 9 9999-9999'
                                    }}
                                    onFocus={() => setfocusWhatsapp(true)}
                                    onBlur={() => setfocusWhatsapp(false)}
                                    value={whatsapp}
                                    onChangeText={(e) => setwhatsapp(e)}
                                    keyboardType='number-pad'
                                    style={{ fontFamily: font.medium, color: color.secundary, fontSize: 18, paddingVertical: 12, width: '78%', }} placeholder='WhatsApp *' placeholderTextColor="#11111190" />
                            </Row>

                            <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusCEP ? color.primary : color.off, }}>
                                <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                                    <MapPinned color={focusCEP ? color.primary : color.secundary} size={22} />
                                </Column>
                                <TextInputMask
                                    disabled={disabled}
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
                        </Column>

                        <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8, justifyContent: 'space-between', alignItems: 'center', }}>
                                <Title style={{ fontSize: 20, }}>Senha</Title>
                            </Row>
                            <ButtonOut onPress={() => {navigation.navigate('AccountReset', )}}  style={{ borderColor: color.primary, }}>
                                <Label style={{ color: color.primary, fontFamily: font.medium, }}>Redefinir senha</Label>
                            </ButtonOut>
                        </Column>

                        <Label style={{ backgroundColor: color.primary + 20, color: color.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, textAlign: 'center', }}>
                            As alterações podem levar alguns minutos para serem processadas
                        </Label>
                    </Column>
                <Column style={{ height: 120, }} />
            </Scroll>

            <Button onPress={() => {
                if (disabled) {
                    setdisabled(false)
                }
                else {
                    handleSave()
                    setdisabled(true)
                }
            }} disabled={loading} style={{ height: 52, borderRadius: 100, position: 'absolute', right: 24, bottom: 24, paddingHorizontal: 16, backgroundColor: disabled ? color.primary : color.green, justifyContent: 'center', alignItems: 'center', }}>
                <Row>
                    {loading ? <ActivityIndicator size="small" color="#fff" />
                        : disabled ?
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Pencil size={18} color="#fff" />
                                <Title style={{ color: "#fff", marginHorizontal: 8, fontSize: 16, fontFamily: 'Font_Medium', }}>Editar</Title>
                            </Row> :
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Check size={22} color="#fff" />
                                <Title style={{ color: "#fff", marginHorizontal: 8, fontSize: 16, fontFamily: 'Font_Medium', }}>Pronto</Title>
                            </Row>}
                </Row>
            </Button>
        </Main>
    )
}

const validateCEP = (cep) => validator.isPostalCode(cep, 'BR');

const SkeletonLoading = () => {
    return (
        <Column>
            <Row style={{ alignSelf: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 100, }}>
                <Skeleton colorMode='light' width={132} height={132} radius={100} />
            </Row>
            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Skeleton colorMode='light' width={200} height={34} radius={8} />
                <Column style={{ height: 14, }} />
                <Skeleton colorMode='light' width={280} height={48} radius={8} />
                <Column style={{ height: 18, }} />
                <Skeleton colorMode='light' width={280} height={48} radius={8} />
                <Column style={{ height: 18, }} />
                <Skeleton colorMode='light' width={280} height={48} radius={8} />
                <Column style={{ height: 18, }} />
                <Skeleton colorMode='light' width={280} height={48} radius={8} />
                <Column style={{ height: 18, }} />
                <Skeleton colorMode='light' width={280} height={48} radius={8} />
                <Column style={{ height: 38, }} />
                <Skeleton colorMode='light' width={280} height={48} radius={100} />
                <Column style={{ height: 12, }} />
                <Column style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginHorizontal: 28, marginTop: 20, }}>
                <Skeleton colorMode='light' width={180} height={46} radius={100} />
                </Column>
            </Column>
            
            <Column style={{height: 70, }} />
        </Column>
    )
}
import React, { useContext, useState, useEffect } from 'react';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonOut } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import Input from '@components/input';
import { MotiView, AnimatePresence, MotiImage } from 'moti';
import { getUser } from '@api/request/user';
import { Check, Pencil } from 'lucide-react-native';

export default function AccountDetailsScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    const [email, setemail] = useState();
    const [whatsapp, setwhatsapp] = useState();
    const [cep, setcep] = useState();
    const [name, setname] = useState();
    const [cpf, setcpf] = useState();
    const [disabled, setdisabled] = useState(true);


    const [focusEmail, setfocusEmail] = useState(false);
    const [focusWhatsapp, setfocusWhatsapp] = useState(false);
    const [focusCep, setfocusCep] = useState(false);
    const [focusName, setfocusName] = useState(false);
    const [focusCpf, setfocusCpf] = useState(false)


    useEffect(() => {
        const fecthData = async () => {
            const usr = await getUser();
            setemail(usr.email);
            setname(usr.name);
            setcpf(usr.cpf);
            setcep(usr.cep);
            setwhatsapp(usr.whatsapp);
        }
        fecthData();
    }, []);


    const handleSave = () => {
        // save data
    }


    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{ paddingTop: 20, }}>
                <Header title='Dados cadastrais' rose />
                <Column style={{ paddingHorizontal: margin.h, marginTop: 20, }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                        <MotiImage style={{ width: 144, height: 144, borderRadius: 100, alignSelf: 'center', objectFit: 'cover' }} source={require('@icons/avatar.png')} />
                        <Pressable>
                            <SubLabel style={{ color: color.primary, marginTop: 12, }}>Editar foto de perfil</SubLabel>
                        </Pressable>
                    </Column>

                    <Column style={{ marginBottom: 20, }}>
                        <Input label="Nome completo" disabled={disabled} value={name} setValue={setname}  />
                        <Input label="E-mail" disabled={disabled} value={email} setValue={setemail} />
                        <Input label="CPF" disabled={disabled} value={cpf} setValue={setcpf} />
                        <Input label="WhatsApp" disabled={disabled} value={whatsapp} setValue={setwhatsapp} />
                        <Input label="CEP" disabled={disabled} value={cep} setValue={setcep} />
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
                </Column>
                <Column style={{height: 40, }} />
            </Scroll>
            <AnimatePresence>
                    <MotiView from={{ opacity: 0, scale: .6, rotate: '32deg', }} animate={{ opacity: 1, rotate: '0deg', scale: 1, }} transition={{ type: 'timing' }} exit={{ opacity: 0, rotate: '32deg', scale: .7, }} style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 99, }}>
                        <Button onPress={() => { setdisabled(!disabled)}} style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: disabled ? color.primary : color.green, justifyContent: 'center', alignItems: 'center', }}>
                            <Row>
                                {disabled ?
                                <Pencil size={24} color="#fff" />:
                                <Check size={24} color="#fff" />  }                  
                            </Row>
                        </Button>
                    </MotiView>
            </AnimatePresence>
        </Main>
    )
}

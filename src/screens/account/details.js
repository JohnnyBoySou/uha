import React, { useContext, useState } from 'react';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel , ButtonOut} from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import Check from '@components/check';

import { MotiView, AnimatePresence, MotiImage } from 'moti';
import { ActivityIndicator } from 'react-native-paper';

export default function AccountDetailsScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    
    const [promocionais, setpromocionais] = useState(true);
    const [alertas, setalertas] = useState(false);
    const [aplicativo, setaplicativo] = useState();
    const [email, setemail] = useState();
    const [sms, setsms] = useState();
    const [whatsapp, setwhatsapp] = useState();

    const [language, setlanguage] = useState('pt-br');
    return (
        <Main>
                <Scroll>
                    <Header title='Dados cadastrais' />
                    <Column style={{ paddingHorizontal: margin.h, marginTop: 20, }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20,  }}>
                            <MotiImage style={{ width: 144, height: 144, borderRadius: 100, alignSelf: 'center', objectFit: 'cover' }} source={require('@icons/avatar.png')}/>
                            <Pressable>
                                <SubLabel style={{ color: color.primary, marginTop: 12, }}>Editar foto de perfil</SubLabel>
                            </Pressable>
                        </Column>
                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>Nome completo</Title>
                                    <Pressable>
                                        <SubLabel style={{ color: color.primary,  }}>Editar</SubLabel>
                                    </Pressable>
                            </Row>
                            <TextInput style={{ backgroundColor: color.light, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, fontSize: 16, fontFamily: font.medium, }} placeholder='Digite seu nome completo' />
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>Apelido</Title>
                                    <Pressable>
                                        <SubLabel style={{ color: color.primary,  }}>Editar</SubLabel>
                                    </Pressable>
                            </Row>
                            <TextInput style={{ backgroundColor: color.light, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, fontSize: 16, fontFamily: font.medium, }} placeholder='Digite o nome pelo qual podemos te chamar' />
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>E-mail</Title>
                                    <Pressable>
                                        <SubLabel style={{ color: color.primary,  }}>Alterar e-mail</SubLabel>
                                    </Pressable>
                            </Row>
                            <TextInput style={{ backgroundColor: color.light, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, fontSize: 16, fontFamily: font.medium, }} placeholder='Digite seu melhor e-mail' />
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>CPF</Title>
                            </Row>
                            <TextInput style={{ backgroundColor: color.light, opacity: .8, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, fontSize: 16, fontFamily: font.medium, }} placeholder='Digite seu CPF' value='100.000.000-00' />
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>WhatsApp</Title>
                                    <Pressable>
                                        <SubLabel style={{ color: color.primary,  }}>Alterar número</SubLabel>
                                    </Pressable>
                            </Row>
                            <TextInput style={{ backgroundColor: color.light, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, fontSize: 16, fontFamily: font.medium, }} placeholder='Digite seu melhor e-mail' />
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>Cidade</Title>
                                    <Pressable>
                                        <SubLabel style={{ color: color.primary,  }}>Alterar cidade</SubLabel>
                                    </Pressable>
                            </Row>
                            <TextInput style={{ backgroundColor: color.light, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, fontSize: 16, fontFamily: font.medium, }} placeholder='Digite sua cidade de moradia' />
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>Senha</Title>
                                   
                            </Row>
                            <ButtonOut style={{ borderColor: color.primary, }}>
                                <Label style={{ color: color.primary, fontFamily: font.medium, }}>Redefinir senha</Label>
                            </ButtonOut>
                       </Column>

                       <Column style={{ marginBottom: 20, }}>
                            <Row style={{ marginBottom: 8,  justifyContent: 'space-between', alignItems: 'center',  }}>
                                    <Title style={{ fontSize: 20, }}>Idioma</Title>
                                    
                            </Row>
                            <Row>
                                <Button onPress={() => {setlanguage('pt-br')}}  style={{ backgroundColor: language === 'pt-br' ? color.primary : color.light, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 100,}}>
                                    <Label style={{ color: language === 'pt-br'? color.light : color.primary, fontFamily: font.medium, }}>Português</Label>
                                </Button>
                                <Button onPress={() => {setlanguage('en-us')}} style={{ marginHorizontal: 12, backgroundColor: language === 'en-us' ? color.primary : color.light, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 100,}}>
                                    <Label style={{ color: language === 'en-us' ? color.light : color.primary, fontFamily: font.medium, }}>Inglês</Label>
                                </Button>
                                <Button onPress={() => {setlanguage('es-eu')}} style={{ backgroundColor: language === 'es-eu' ? color.primary : color.light, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 100,}}>
                                    <Label style={{ color: language === 'es-eu' ? color.light : color.primary, fontFamily: font.medium, }}>Espanhol</Label>
                                </Button>
                            </Row>
                       </Column>

                        <SubLabel style={{ backgroundColor: color.primary+20, marginVertical: 20, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, textAlign: 'center', }}>
                        As alterações podem levar alguns minutos para serem processadas
                        </SubLabel>
                    </Column>
                </Scroll>

        </Main>
    )
}

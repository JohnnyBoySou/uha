import React, { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Column, Title, Row, Label, Scroll, Button, ButtonPR, LabelPR, U, SubLabel } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView } from 'moti';
import { AtSign, KeyRound, Eye, EyeOff, LogIn, ArrowLeft, Lock, Mail, MapPinned, Phone, User, BookUser} from 'lucide-react-native'
import { TouchableRipple } from 'react-native-paper';
import CheckBox from '@components/checkbox';


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

    return (
        <Main style={{ backgroundColor: color.secundary, paddingTop: 30, }}>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                    <Button onPress={() => {navigation.goBack()}}  style={{ width: 46, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
                        <ArrowLeft color={color.secundary}/>
                    </Button>
                    <MotiImage source={require('@imgs/logo.png')} style={{ objectFit: 'contain', width: 100, }} />
                </Row>

                <Column style={{ marginHorizontal: margin.h, paddingVertical: 22, }}>
                    <Title style={{ fontSize: 28, color:"#fff", lineHeight: 52, }}>Seja bem-vindo!</Title>
                    <Label style={{ color:"#fff", }}>Está pronto para começar? Escolha entre entrar ou se registrar para avançar para os próximos passos.</Label>
                </Column>

                <Column style={{ paddingHorizontal: margin.h,  paddingVertical: 12, backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, position: 'absolute', bottom: 0, left: 0, right: 0,}}>

                {type == 'Entrar' &&
                    <MotiView from={{translateX: -20, opacity: 0, }} animate={{translateX: 0 , opacity: 1,}} transition={{type: 'timing'}}>
                    <Column style={{width: 80, height: 8, borderRadius: 100, backgroundColor: "#EFDCC5", alignSelf: 'center', marginBottom: 20, marginTop: 0, }} />   
                    <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                        <Button onPress={() => {settype('Entrar')}}  style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type  === 'Entrar' ?  '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: type === 'Entrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                        </Button>
                        <Column style={{width: 12, }} />
                        <Button onPress={() => {settype('Registrar')}}  style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type  === 'Registrar' ?  '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: type === 'Registrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                        </Button>
                    </Row>

                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, marginTop: 30, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100,   }}>
                        <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusEmail(true)}
                            onBlur={() => setfocusEmail(false)}
                            onChangeText={(e) => setemail(e)}
                            value={email}
                            keyboardType='email-address' style={{  fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='E-mail' placeholderTextColor="#11111190"/>
                    </Row>
                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50",  }}>
                            <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusPass(true)}
                            onBlur={() => setfocusPass(false)}
                            onChangeText={(e) => setpassword(e)}
                            value={password}
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='Senha' secureTextEntry={pass} placeholderTextColor="11111140"/>
                  
                        <Pressable onPress={() => {setpass(!pass)}}  style={{ justifyContent: 'center', alignItems: 'center',  paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', }}>
                            {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
                    </Row>

                    <Row style={{ justifyContent: 'space-between', marginTop: 16,  alignItems: 'center',  }}>
                        <Pressable style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',   }} onPress={() => {setremember(!remember)}} >
                            <CheckBox status={remember} />
                            <Label style={{  fontFamily: font.bold, fontSize: 14, marginLeft: 6,  }}>Manter conectado</Label>
                        </Pressable>
                        <Pressable onPress={() => {settype('ForgetPassword')}}  style={{ alignSelf: 'center',   }}>
                            <Label style={{ color: color.secundary, fontFamily: font.bold, fontSize: 14, textDecorationStyle: 'solid', textDecorationLine: "underline",  }}>Esqueci minha senha</Label>
                        </Pressable>
                    </Row>

                    <ButtonPR onPress={handleLogin} style={{ marginTop: 30, }}>
                        <Row>
                            {loading ? 
                            <ActivityIndicator animating={loading} color="#fff" size={27}/>
                            :
                            <LabelPR>Entrar</LabelPR>
                        }
                        </Row>
                    </ButtonPR>


                    <Row style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center',  }}> 
                        <Column style={{flexGrow: 1, height: 2, backgroundColor: color.off, }} />
                        <Label style={{  fontFamily: font.medium,  textAlign: 'center', marginHorizontal: 6, }}>ou entre com</Label>
                        <Column style={{flexGrow: 1, height: 2, backgroundColor: color.off, }} />
                    </Row>


                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical:  24,}}>
                    <Button onPress={handleFacebook} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6, }} >
                        <Column>
                            <Column style={{  backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/facebook.png')} style={{ width: 28, height: 28,  }} />
                            </Column>
                            <Label style={{ fontSize: 14,  textAlign:'center', fontFamily: 'Font_Medium',  marginTop: 10,  }}>Facebook</Label>
                        </Column>
                    </Button>                    
                    <Button onPress={handleGoogle} style={{ justifyContent: 'center', marginHorizontal: 20, alignItems: 'center', borderRadius: 6, }} >
                        <Column>
                            <Column style={{  backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/google.png')} style={{ width: 28, height: 28,  }} />
                            </Column>
                            <Label style={{ fontSize: 14, textAlign:'center', fontFamily: 'Font_Medium',  marginTop: 10, }}>Google</Label>
                        </Column>
                    </Button>                    
                    <Button onPress={handleAppleID} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6,}} >
                        <Column>
                            <Column style={{ backgroundColor: "#20202010", padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/apple.png')} style={{ width: 28, height: 28,  }} />
                            </Column>
                            <Label style={{ fontSize: 14,  textAlign:'center', fontFamily: 'Font_Medium',  marginTop: 10, }}>Apple ID</Label>
                        </Column>
                    </Button>                    
                </Row>

                </MotiView>}

                {type == 'Registrar' &&
                    <MotiView from={{translateX: 20, opacity: 0, }} animate={{translateX: 0 , opacity: 1,}} transition={{type: 'timing'}}>
                    <Column style={{width: 80, height: 8, borderRadius: 100, backgroundColor: "#EFDCC5", alignSelf: 'center', marginBottom: 20, marginTop: 0, }} />   
                    <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                        <Button onPress={() => {settype('Entrar')}}  style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type  === 'Entrar' ?  '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: type === 'Entrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                        </Button>
                        <Column style={{width: 12, }} />
                        <Button onPress={() => {settype('Registrar')}}  style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type  === 'Registrar' ?  '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: type === 'Registrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                        </Button>
                    </Row>

                    <Row style={{  borderRadius:8, marginTop: 30, borderWidth: 2, borderColor: focusName ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100,   }}>
                        <User color={focusName ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusName(true)}
                            onBlur={() => setfocusName(false)}
                            onChangeText={(e) => setname(e)}
                            style={{  fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='Nome completo' placeholderTextColor="#11111190"/>
                    </Row>


                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusCPF ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100,   }}>
                        <BookUser color={focusCPF ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusCPF(true)}
                            onBlur={() => setfocusCPF(false)}
                            onChangeText={(e) => setfocusCPF(e)}
                             style={{  fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='CPF' placeholderTextColor="#11111190"/>
                    </Row>
                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusWhatsapp ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100,   }}>
                        <Phone color={focusWhatsapp ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusWhatsapp(true)}
                            onBlur={() => setfocusWhatsapp(false)}
                            onChangeText={(e) => setfocusWhatsapp(e)}
                            keyboardType='tel' style={{  fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='WhatsApp' placeholderTextColor="#11111190"/>
                    </Row>
                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusCEP ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100,   }}>
                        <MapPinned color={focusCEP ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusCEP(true)}
                            onBlur={() => setfocusCEP(false)}
                            onChangeText={(e) => setfocusCEP(e)}
                            keyboardType='email-address' style={{  fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='CEP (Código Postal)' placeholderTextColor="#11111190"/>
                    </Row>
                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100,   }}>
                        <Mail color={focusEmail ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusEmail(true)}
                            onBlur={() => setfocusEmail(false)}
                            onChangeText={(e) => setemail(e)}
                            keyboardType='email-address' style={{  fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='E-mail' placeholderTextColor="#11111190"/>
                    </Row>
                    <Row style={{  borderRadius:8, marginTop: 12, borderWidth: 2, borderColor: focusPass ? color.primary : color.off }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100, borderColor: focusPass ? color.secundary : "#ffffff50",  }}>
                            <Lock color={focusPass ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusPass(true)}
                            onBlur={() => setfocusPass(false)}
                            onChangeText={(e) => setpassword(e)}
                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='Senha (8 digitos)' secureTextEntry={pass} placeholderTextColor="11111140"/>
                  
                        <Pressable onPress={() => {setpass(!pass)}}  style={{ justifyContent: 'center', alignItems: 'center',  paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', }}>
                            {pass ? <Eye size={20} color={color.primary} /> : <EyeOff size={20} color={color.primary} />}
                        </Pressable>
                    </Row>

                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  marginTop: 8, marginBottom: 20, }}>
                            <Column style={{ backgroundColor: color.off, height: 10, borderRadius: 30, width: 100, }}>
                                <Column style={{width:'50%',height: 10, borderRadius: 100, backgroundColor: "#00A3FF", }} />
                            </Column>
                            <SubLabel style={{ color: "#00A3FF" }}>Razoável</SubLabel>
                        </Row>


                        <Pressable style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',   }} onPress={() => {setremember(!remember)}} >
                            <CheckBox status={remember} />
                            <Label style={{  fontFamily: font.bold, fontSize: 14, marginLeft: 6,  }}>Permito se contatado por WhatsApp</Label>
                        </Pressable>

                    <ButtonPR onPress={handleRegister} style={{ marginTop: 30, backgroundColor: color.secundary, marginBottom: 20, }}>
                        <Row>
                            {loading ? 
                            <ActivityIndicator animating={loading} color="#fff" size={27}/>
                            :
                            <LabelPR>Registrar</LabelPR>
                        }
                        </Row>
                    </ButtonPR>

                    <Label style={{  fontFamily: font.medium, fontSize: 16,  textAlign: 'center', marginHorizontal: 6, marginBottom: 30, }}>Ao registrar-se você concorda com os <U>Termos de Uso</U> e <U>Politica de Privacidade</U></Label>
                    </MotiView>}
                {type == 'ForgetPassword' && <ForgetPassword /> }
                </Column>
        </Main>
    )
}


const ForgetPassword = () => {
    const { color, font, margin, } = useContext(ThemeContext);
    const [type, settype] = useState();
return(
    <Column>
         <Row style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100, }}>
                        <Button onPress={() => {settype('Entrar')}}  style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type  === 'Entrar' ?  '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: type === 'Entrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Entrar</Label>
                        </Button>
                        <Column style={{width: 12, }} />
                        <Button onPress={() => {settype('Registrar')}}  style={{ paddingVertical: 10, borderRadius: 100, flexGrow: 1, paddingHorizontal: 20, backgroundColor: type  === 'Registrar' ?  '#fff' : 'transparent', justifyContent: 'center', alignItems: 'center', }}>
                            <Label style={{ color: type === 'Registrar' ? color.secundary : color.label, fontFamily: font.bold, textAlign: 'center', }}>Registrar</Label>
                        </Button>
                    </Row>
    </Column>
    )}
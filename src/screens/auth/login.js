import React, { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, TextInput } from 'react-native';
import { Main, Column, Title, Row, Label, Scroll} from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti';
import { AtSign, KeyRound, Eye, EyeOff, LogIn} from 'lucide-react-native'
import { TouchableRipple } from 'react-native-paper';

export default function LoginScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const [pass, setpass] = useState(true);

    const [focusEmail, setfocusEmail] = useState(false);
    const [focusPass, setfocusPass] = useState(false);

    const [loading, setloading] = useState(false);

    const [email, setemail] = useState();
    const [password, setpassword] = useState();



    const handleLogin = () => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 3000);
    }
    return (
        <Main>
            <Scroll>

            <Column>
                <Row style={{ justifyContent: 'space-between',  }}>
                    <Column style={{height: 300, backgroundColor: '#F6E9C5', width: 80, borderBottomRightRadius: 52, }} />
                    <Column style={{ backgroundColor: color.primary, marginHorizontal: 12, paddingTop: 70, borderBottomLeftRadius: 32, borderBottomRightRadius: 32,  padding: 32, }}>
                        <Title style={{ fontSize: 32, lineHeight: 32, color: color.secundary, }}>Toda vida {"\n"} importa.</Title>
                        <Label style={{ zIndex: 99, color: color.secundary,}}>Seja um doador do {'\n'}Instituto Caramelo</Label>
                        <MotiImage source={require('@imgs/login_patinha.png')} style={{ width: 160, objectFit: 'contain', alignSelf: 'flex-end', marginBottom: -50, marginTop: -50, marginRight: -40,  }} />
                        <MotiImage source={require('@imgs/login_dog.png')} style={{ width: 200,  }} />
                    </Column>
                    <Column style={{height: 300, backgroundColor: '#2A0305', width: 80, borderBottomLeftRadius: 52, }} />
                </Row>
                <Column style={{ marginHorizontal: margin.h, paddingVertical: 22, }}>
                    <Title style={{ fontSize: 42, color: color.primary, }}>Entrar</Title>
                    <Label>Digite seus dados de login abaixo para acessar suas Patinhas da Sorte.</Label>
                </Column>

                <Column style={{ marginHorizontal: margin.h, paddingVertical: 12, }}>
                    <Row style={{ backgroundColor: color.secundary, borderRadius:100, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100, backgroundColor: focusEmail ? color.primary :  "#ffffff30",  }}>
                        <AtSign color={focusEmail ? color.secundary : '#fff'} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusEmail(true)}
                            onBlur={() => setfocusEmail(false)}
                            onChangeText={(e) => setemail(e)}
                            keyboardType='email-address' style={{ color: color.light, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='E-MAIL' placeholderTextColor="#FFF"/>
                    </Row>
                    <Row style={{ backgroundColor: color.primary, borderRadius:100, marginTop: 12, }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center',  borderRadius: 100, backgroundColor: focusPass ? color.secundary : "#ffffff50",  }}>
                            <KeyRound color={focusPass ? color.primary : color.secundary} size={22} />
                        </Column>
                        <TextInput 
                            onFocus={() => setfocusPass(true)}
                            onBlur={() => setfocusPass(false)}
                            onChangeText={(e) => setpassword(e)}

                            keyboardType='password' style={{ color: color.secundary, fontFamily: font.medium, fontSize: 18, paddingVertical: 12, paddingHorizontal: 16, flexGrow:1,  }} placeholder='SENHA' secureTextEntry={pass} placeholderTextColor={color.secundary}/>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', marginTop: 12,  alignItems: 'center',  }}>
                       
                        <Pressable style={{ alignSelf: 'center',   }}>
                            <Label style={{ color: color.primary, fontFamily: font.bold, textDecorationStyle: 'solid', textDecorationLine: "underline",  }}>Esqueci minha senha</Label>
                        </Pressable>

                        <Pressable onPress={() => {setpass(!pass)}}  style={{ backgroundColor: color.secundary+20, justifyContent: 'center', alignItems: 'center',  paddingVertical: 8, paddingHorizontal: 16, borderRadius: 40, flexDirection: 'row', }}>
                            {pass ? <Eye size={20} color={color.secundary} /> : <EyeOff size={20} color={color.secundary} />}
                            <Label style={{ color: color.secundary, fontFamily: font.medium, letterSpacing: -.6, marginLeft: 8, }}>{pass ? 'Mostrar' : 'Ocultar'} senha</Label>
                        </Pressable>
                    </Row>

                    <TouchableRipple  rippleColor="#fff" onPress={handleLogin} style={{ backgroundColor: color.primary, marginTop: 30, marginBottom: 12, alignSelf: 'center', width: 72, height: 72, borderRadius: 100, justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ position: 'relative', justifyContent: 'center', alignItems: 'center',  }}>
                            {loading && <ActivityIndicator color={color.secundary} size={132}  style={{ position: 'absolute',   }}/>}
                            <LogIn color={color.secundary} size={32} strokeWidth={3} />
                        </Column>
                    </TouchableRipple>

                </Column>
            </Column>
            </Scroll>

        </Main>
    )
}
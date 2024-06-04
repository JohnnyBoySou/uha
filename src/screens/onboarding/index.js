import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Column, Row, Title, Label,  ButtonPR, ButtonSE, LabelSE, ButtonLI, LabelLI, LineL, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus } from 'lucide-react-native';
import { MotiImage } from 'moti';

export default function OnboardingScreen({ navigation, }){
    const { color, font, margin } = useContext(ThemeContext);

    const handleFacebook = () => {
    }
    const handleGoogle = () => {
    }
    const handleAppleID = () => {
    }

    return (
    <Main>
        <Column style={{ flex:1, }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center',  height: '40%', }}>
                <ImagePlus color={color.secundary} size={52}/>
            </Column>

            <Column style={{ paddingHorizontal: margin.h, width: '100%', position: 'absolute', bottom: 0,  backgroundColor: color.primary, paddingBottom: 50, borderTopLeftRadius: 32, borderTopRightRadius: 32, }}>
                <Column style={{ width: 70, height: 8, backgroundColor: color.light+40, marginTop: 12, marginBottom: 30,  borderRadius: 50, alignSelf: 'center',}} />
                <Title style={{ color: color.light, fontFamily: font.bold, fontSize: 52, lineHeight: 56, }}>Olá!</Title>
                <LineL style={{ marginVertical: 12, }} />
                <Label style={{ color: color.light, fontFamily: font.medium,  }}>Seja bem-vindo! Está pronto para começar? Escolha entre entrar ou se cadastrar para avançar para os próximos passos</Label>

                <ButtonSE onPress={() => {navigation.replace('Tabs')}}  style={{ marginTop:24, }} >
                    <LabelSE>LOGIN</LabelSE>
                </ButtonSE>
                <ButtonLI onPress={() => {navigation.replace('Tabs')}} style={{  marginTop: 12, backgroundColor: color.background, }} >
                    <LabelLI style={{   }}>CADASTRO</LabelLI>
                </ButtonLI>
                <Button style={{  marginTop: 12, }} >
                    <LabelLI style={{ textDecorationLine:'underline', textDecorationStyle: 'solid', color: '#fff',  }}>Doar anonimamente</LabelLI>
                </Button>

                <Label style={{ color: color.light, fontFamily: font.medium,  textAlign: 'center', marginTop: 30,  }}>Fazer login com</Label>
                <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical:  24,}}>
                    <Button onPress={handleFacebook} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6, }} >
                        <Column>
                            <Column style={{ backgroundColor: color.background, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/facebook.png')} style={{ width: 28, height: 28,  }} />
                            </Column>
                            <Label style={{ fontSize: 14, color: "#fff", textAlign:'center', fontFamily: 'Font_Medium',  marginTop: 10,  }}>Facebook</Label>
                        </Column>
                    </Button>                    
                    <Button onPress={handleGoogle} style={{ justifyContent: 'center', marginHorizontal: 20, alignItems: 'center', borderRadius: 6, }} >
                        <Column>
                            <Column style={{ backgroundColor: color.background, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/google.png')} style={{ width: 28, height: 28,  }} />
                            </Column>
                            <Label style={{ fontSize: 14, color: "#fff", textAlign:'center', fontFamily: 'Font_Medium',  marginTop: 10, }}>Google</Label>
                        </Column>
                    </Button>                    
                    <Button onPress={handleAppleID} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 6,}} >
                        <Column>
                            <Column style={{ backgroundColor: color.background, padding: 18, borderRadius: 12, }}>
                                <MotiImage source={require('@icons/apple.png')} style={{ width: 28, height: 28,  }} />
                            </Column>
                            <Label style={{ fontSize: 14, color: "#fff", textAlign:'center', fontFamily: 'Font_Medium',  marginTop: 10, }}>Apple</Label>
                        </Column>
                    </Button>                    
                </Row>
            </Column>
        </Column>
    </Main>
    )
    }
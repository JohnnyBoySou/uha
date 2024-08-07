import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Dimensions, Image, ActivityIndicator, TextInput } from 'react-native';
import { Main, Column, Row, Title, ButtonPR, LabelSE, LabelLI, Button, Label, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
const { height, width } = Dimensions.get('window');
import { ExpandingDot } from "react-native-animated-pagination-dots";

import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar'
import { Mail, SquareUserRound, Store, X } from 'lucide-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Error from '@components/error';
import Success from '@components/success';
import { verifyEstabelecimento } from '@api/request/user/user';
import { createOrigin } from '@api/user/origin';

export default function OnboardingScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const scrollViewRef = useRef(null);
    const pages = [1, 2, 3];
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const modalEstabelecimento = useRef(null);
    const imgs = ['https://uha.digital/app/onboarding/1.jpg', 'https://uha.digital/app/onboarding/2.jpg', 'https://uha.digital/app/onboarding/3.jpg']

    const isFocused = useIsFocused();
    useEffect(() => {
        modalEstabelecimento.current?.close()
    }, [isFocused])

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" translucent animated={true} />
            <Column style={{ flex: 1, }}>
                <Row style={{ position: 'absolute', top: 50, left: 10, right: 10, zIndex: 99, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Image source={require('@imgs/logo.png')} contentFit='cover' style={{ width: 100, height: 60, }} />

                    <Column style={{ backgroundColor: color.secundary + 20, marginRight: 20, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 5, alignSelf: 'center', marginTop: 10, marginBottom: 14, }}>
                        <ExpandingDot
                            data={pages}
                            expandingDotWidth={20}
                            scrollX={scrollX}
                            containerStyle={{ position: 'relative', marginTop: 0, top: 0, }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 2,
                            }}
                            activeDotColor={color.secundary}
                            inActiveDotColor={color.secundary + 90}
                        />
                    </Column>

                </Row>


                <ScrollView
                    ref={scrollViewRef}
                    pagingEnabled
                    horizontal
                    style={{ position: 'absolute', top: -60, left: 0, right: 0, }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={64}>
                    <Column style={{ height: height, width: width, }}>
                        <Image transition={100} contentFit='cover' source={{ uri: imgs[0] }} style={{ height: 0.65 * height, width: width, borderRadius: 32, }} />
                        <Column style={{ justifyContent: 'center', marginTop: 20, marginHorizontal: 28, }}>
                            <Title style={{ fontSize: 32, color: color.secundary, textAlign: 'center', fontFamily: 'Font_Bold', lineHeight: 32, letterSpacing: -1, }}>Apoie ONGs de todo o Brasil.</Title>
                            <Label style={{ textAlign: 'center', color: '#4f1a40', marginTop: 12, fontSize: 18, lineHeight: 22, letterSpacing: -0.6, }}>Com o Uha!, você pode fazer a diferença doando cupons fiscais e contribuições financeiras para ONGs em todo o país. Junte-se a nós e ajude a transformar vidas!</Label>
                        </Column>
                    </Column>
                    <Column style={{ height: height, width: width, }}>
                        <Image transition={200} contentFit='cover' source={{ uri: imgs[1] }} style={{ height: 0.65 * height, width: width, borderRadius: 32, }} />
                        <Column style={{ justifyContent: 'center', marginTop: 20, marginHorizontal: 28, }}>
                            <Title style={{ fontSize: 32, color: color.secundary, textAlign: 'center', fontFamily: 'Font_Bold', lineHeight: 32, letterSpacing: -1, }}>Acumule pontos toda vez que ajudar.</Title>
                            <Label style={{ textAlign: 'center', color: '#4f1a40', marginTop: 12, fontSize: 18, lineHeight: 22, letterSpacing: -0.6, }}>Cada vez que você doa cupons fiscais ou faz contribuições financeiras, você acumula pontos. Quanto mais você ajuda, mais pontos você ganha. É simples e recompensador</Label>
                        </Column>
                    </Column>
                    <Column style={{ height: height, width: width, }}>
                        <Image transition={300} contentFit='cover' source={{ uri: imgs[2] }} style={{ height: 0.65 * height, width: width, borderRadius: 32, }} />
                        <Column style={{ justifyContent: 'center', marginTop: 20, marginHorizontal: 28, }}>
                            <Title style={{ fontSize: 32, color: color.secundary, textAlign: 'center', fontFamily: 'Font_Bold', lineHeight: 32, letterSpacing: -1, }}>Troque pontos por serviços e produtos.</Title>
                            <Label style={{ textAlign: 'center', color: '#4f1a40', marginTop: 12, fontSize: 18, lineHeight: 22, letterSpacing: -0.6, }}>Use os pontos que você acumulou para trocar por uma variedade de serviços e produtos oferecidos pelos nossos parceiros. Fazer o bem nunca foi tão gratificante!</Label>
                        </Column>
                    </Column>
                </ScrollView>


                <Column style={{ paddingHorizontal: margin.h, width: '100%', position: 'absolute', bottom: 0, paddingBottom: 40, borderTopLeftRadius: 32, borderTopRightRadius: 32, }}>
                    <ButtonPR onPress={() => { navigation.navigate('AuthLogin') }} style={{ marginTop: 24, marginHorizontal: 40, }} >
                        <LabelSE>Próximo</LabelSE>
                    </ButtonPR>
                    <Button onPress={() => { modalEstabelecimento.current.expand() }} style={{ marginTop: 8, alignSelf: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, }} >
                        <LabelLI style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', color: '#fff', textAlign: 'center', color: color.secundary, }}>Doar anonimamente</LabelLI>
                    </Button>
                </Column>
            </Column >


            <BottomSheet ref={modalEstabelecimento} snapPoints={[0.1, 400]} keyboardBlurBehavior handleIndicatorStyle={{ backgroundColor: "#d7d7d7", width: 80, height: 8, }}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', zIndex: 99, marginBottom: 20, }}>
                        <Title style={{}}>Como você deseja doar?</Title>
                        <Button onPress={() => { modalEstabelecimento.current.close() }} style={{ width: 36, backgroundColor: color.secundary, height: 36, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={18} color="#fff" />
                        </Button>
                    </Row>
                    <SelectType />
                </BottomSheetView>
            </BottomSheet>
        </Main >
    )
}

const SelectType = () => {
    const { color, font, margin } = useContext(ThemeContext);
    const navigation = useNavigation()
    const [verify, setverify] = useState(false);
    const [email, setemail] = useState();
    const [loading, setloading] = useState(false);

    const [focusEmail, setfocusEmail] = useState();

    const [success, setsuccess] = useState();
    const [error, seterror] = useState();
    const verifyEmail = async () => {
        if (email?.length < 5) {
            return;
        }
        setloading(true)
        try {
            const res = await verifyEstabelecimento(email)
            setsuccess(res?.message)
            const org = await createOrigin(email)
            console.log(org)
            setTimeout(() => {
                navigation.push('NotafiscalSendAnonimo', { origin: email,})
            }, 1000);
        } catch (error) {
            console.log(error)
            seterror(error.message)
        } finally {
            setloading(false)
        }
    }

    return (
        <Column>
            {verify ? <Column>
                <Title style={{ fontSize: 18, }}>Digite o email do seu estabelecimento *</Title>
                <Row style={{ borderRadius: 8, marginTop: 12, borderWidth: 2, borderColor: focusEmail ? color.primary : color.off,  }}>
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

                {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}
                <ButtonPR onPress={verifyEmail} style={{ marginTop: 26, }}>
                    <Row>
                        {loading ? <ActivityIndicator color="#fff" size={24} /> :
                            <LabelPR>Verificar</LabelPR>}
                    </Row>
                </ButtonPR>
            </Column> :
                <Column>
                    <Button onPress={() => { setverify(true); }} style={{ backgroundColor: color.secundary + 10, borderRadius: 12, padding: 16, }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Store color={color.secundary} size={42} />
                            <Column style={{ marginHorizontal: 16, paddingRight: 20, }}>
                                <Title style={{ fontSize: 18, lineHeight: 18, marginBottom: 4, }}>Estabelecimento</Title>
                                <Label style={{ fontSize: 14, lineHeight: 14, }}>Se você for um estabelecimento.</Label>
                            </Column>
                        </Row>
                    </Button>
                    <Button onPress={() => { navigation.push('NotafiscalSendAnonimo') }} style={{ backgroundColor: color.secundary + 10, borderRadius: 12, padding: 16, marginVertical: 12, }}>
                        <Row style={{ alignItems: 'center', }}>
                            <SquareUserRound color={color.secundary} size={42} />
                            <Column style={{ marginHorizontal: 16, paddingRight: 20, }}>
                                <Title style={{ fontSize: 18, lineHeight: 18, marginBottom: 4, }}>Pessoa física</Title>
                                <Label style={{ fontSize: 14, lineHeight: 14, }}>Não necessita de cadastro.</Label>
                            </Column>
                        </Row>
                    </Button>
                </Column>
            }
        </Column>

    )
}
import React, { useContext, useRef } from 'react';
import { Animated, ScrollView, Dimensions, Image } from 'react-native';
import { Main, Column, Row, Title, ButtonPR, LabelSE, LabelLI, Button, Label } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
const { height, width } = Dimensions.get('window');
import { ExpandingDot } from "react-native-animated-pagination-dots";

import { StatusBar } from 'expo-status-bar'

export default function OnboardingScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const scrollViewRef = useRef(null);
    const pages = [1, 2, 3];
    const scrollX = React.useRef(new Animated.Value(0)).current;


    const imgs = ['https://uha.digital/app/onboarding/1.jpg','https://uha.digital/app/onboarding/2.jpg','https://uha.digital/app/onboarding/3.jpg']

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
                        <Image transition={100} contentFit='cover' source={{uri: imgs[0]}} style={{ height: 0.65 * height, width: width,  borderRadius: 32,}} />
                        <Column style={{ justifyContent: 'center',   marginTop: 20, marginHorizontal: 28,}}>
                            <Title style={{ fontSize: 32, color: color.secundary, textAlign: 'center', fontFamily: 'Font_Bold', lineHeight: 32, letterSpacing: -1,}}>Apoie ONGs de todo o Brasil.</Title>
                            <Label style={{ textAlign: 'center', color: '#4f1a40', marginTop: 12, fontSize: 18, lineHeight: 22, letterSpacing: -0.6,}}>Com o Uha!, você pode fazer a diferença doando cupons fiscais e contribuições financeiras para ONGs em todo o país. Junte-se a nós e ajude a transformar vidas!</Label>
                        </Column>
                    </Column>
                    <Column style={{ height:height, width: width, }}>
                        <Image transition={200} contentFit='cover' source={{uri: imgs[1]}} style={{ height: 0.65 * height, width: width, borderRadius: 32,}} />
                        <Column style={{ justifyContent: 'center', marginTop: 20, marginHorizontal: 28,}}>
                            <Title style={{  fontSize: 32, color: color.secundary, textAlign: 'center', fontFamily: 'Font_Bold', lineHeight: 32, letterSpacing: -1, }}>Acumule pontos toda vez que ajudar.</Title>
                            <Label style={{ textAlign: 'center', color: '#4f1a40', marginTop: 12, fontSize: 18, lineHeight: 22, letterSpacing: -0.6,}}>Cada vez que você doa cupons fiscais ou faz contribuições financeiras, você acumula pontos. Quanto mais você ajuda, mais pontos você ganha. É simples e recompensador</Label>
                        </Column>
                    </Column>
                    <Column style={{ height: height, width: width, }}>
                        <Image transition={300} contentFit='cover' source={{uri: imgs[2]}} style={{ height: 0.65 * height, width: width, borderRadius: 32, }} />
                        <Column style={{ justifyContent: 'center', marginTop: 20, marginHorizontal: 28,}}>
                            <Title style={{ fontSize: 32, color: color.secundary, textAlign: 'center', fontFamily: 'Font_Bold', lineHeight: 32, letterSpacing: -1,  }}>Troque pontos por serviços e produtos.</Title>
                            <Label style={{ textAlign: 'center', color: '#4f1a40', marginTop: 12, fontSize: 18, lineHeight: 22, letterSpacing: -0.6, }}>Use os pontos que você acumulou para trocar por uma variedade de serviços e produtos oferecidos pelos nossos parceiros. Fazer o bem nunca foi tão gratificante!</Label>
                        </Column>
                    </Column>
                </ScrollView>


                <Column style={{ paddingHorizontal: margin.h, width: '100%', position: 'absolute', bottom: 0, paddingBottom: 40, borderTopLeftRadius: 32, borderTopRightRadius: 32, }}>
                    <ButtonPR onPress={() => { navigation.navigate('AuthLogin') }} style={{ marginTop: 24, marginHorizontal: 40, }} >
                        <LabelSE>Próximo</LabelSE>
                    </ButtonPR>
                    <Button onPress={() => { navigation.push('NotafiscalSendAnonimo') }} style={{ marginTop: 8, alignSelf: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, }} >
                        <LabelLI style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', color: '#fff', textAlign: 'center', color: color.secundary, }}>Doar anonimamente</LabelLI>
                    </Button>
                </Column>
            </Column >
        </Main >
    )
}


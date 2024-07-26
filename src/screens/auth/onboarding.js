import React, { useContext, useRef } from 'react';
import {Animated,  ScrollView, Dimensions, Image } from 'react-native';
import { Main, Column, Row, Title, ButtonPR, LabelSE, LabelLI, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
const { height, width } = Dimensions.get('window');
import { ExpandingDot } from "react-native-animated-pagination-dots";

import { StatusBar } from 'expo-status-bar'

export default function OnboardingScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const scrollViewRef = useRef(null);
    const pages = [1, 2, 3];


    const scrollX = React.useRef(new Animated.Value(0)).current;




    return (
        <Main>
            
            <StatusBar style="dark" translucent animated={true}/>
            <Column style={{ flex: 1, }}>
                <Row style={{ position: 'absolute', top: 50, left: 10, right: 10, zIndex: 99, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Image source={require('@imgs/logo.png')} contentFit='contain' style={{  width: 100, }} />
                        
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
                            inActiveDotColor={color.secundary+90}
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
                    scrollEventThrottle={64}
                >
                    <Image transition={100} contentFit='cover' source={require('@imgs/wall1.png')} style={{ height: 1.2 * height, width: width,  }} />
                    <Image transition={200} contentFit='cover' source={require('@imgs/wall2.png')} style={{ height: 1.2 * height, width: width,  }} />
                    <Image transition={300} contentFit='cover' source={require('@imgs/wall3.png')} style={{ height: 1.2 * height, width: width,  }} />
                </ScrollView>


                <Column style={{ justifyContent: 'center', position: 'absolute', top: '15%', left: 30, }}>
                    <Title style={{ fontSize: 56, color: color.secundary, fontFamily: 'Font_Bold', lineHeight: 60, }}>Doe.</Title>
                    <Title style={{ fontSize: 56, color: "#C02B93", fontFamily: 'Font_Bold', lineHeight: 60, }}>Contribua.</Title>
                    <Title style={{ fontSize: 56, color: color.primary, fontFamily: 'Font_Bold', lineHeight: 60, }}>Inspire.</Title>
                </Column>

                <Column style={{ paddingHorizontal: margin.h, width: '100%', position: 'absolute', bottom: 0, paddingBottom: 50, borderTopLeftRadius: 32, borderTopRightRadius: 32, }}>
                    <ButtonPR onPress={() => { navigation.navigate('AuthLogin') }} style={{ marginTop: 24, }} >
                        <LabelSE>Próximo</LabelSE>
                    </ButtonPR>
                    <Button onPress={() => { navigation.push('NotafiscalSendAnonimo') }} style={{ marginTop: 12, alignSelf: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, }} >
                        <LabelLI style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', color: '#fff', textAlign: 'center',  }}>Doar anonimamente</LabelLI>
                    </Button>
                </Column>
            </Column>
        </Main>
    )
}


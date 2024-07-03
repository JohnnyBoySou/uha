import React, { useContext, useRef, useState, useEffect } from 'react';
import {Animated,  ScrollView, Dimensions } from 'react-native';
import { Main, Column, Row, Title, Label, ButtonPR, ButtonSE, LabelSE, ButtonLI, LabelLI, Scroll, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView } from 'moti';
const { height, width } = Dimensions.get('window');
import { ExpandingDot } from "react-native-animated-pagination-dots";

import { StatusBar } from 'expo-status-bar'

export default function OnboardingScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    const [pageIndex, setPageIndex] = useState(0);
    const xOffset = useRef(0);
    const scrollViewRef = useRef(null);
    const pages = [1, 2, 3];

    const handleScroll = (event) => {
        xOffset.current = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
        setPageIndex(pageIndex);
    };

    const scrollX = React.useRef(new Animated.Value(0)).current;




    return (
        <Main>
            
            <StatusBar style="dark" translucent animated={true}/>
            <Column style={{ flex: 1, }}>
                <Row style={{ position: 'absolute', top: 50, left: 10, right: 10, zIndex: 99, justifyContent: 'space-between', alignItems: 'center', }}>
                    <MotiImage source={require('@imgs/logo.png')} style={{ objectFit: 'contain', width: 100, }} />
                        
                    <Column  style={{ marginRight: 20,  justifyContent: 'center', alignItems: 'center', }}>
                        <ExpandingDot
                            data={pages}
                            expandingDotWidth={30}
                            scrollX={scrollX}
                            containerStyle={{  bottom: 0, right: 0, }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 5
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
                    //onScroll={handleScroll}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                          useNativeDriver: false,
                    })}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={64}
                >
                    <MotiImage source={require('@imgs/wall1.png')} style={{ height: 1.2 * height, width: width, objectFit: 'cover' }} />
                    <MotiImage source={require('@imgs/wall2.png')} style={{ height: 1.2 * height, width: width, objectFit: 'cover' }} />
                    <MotiImage source={require('@imgs/wall3.png')} style={{ height: 1.2 * height, width: width, objectFit: 'cover' }} />
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
                    <Button onPress={() => { navigation.push('DonateHide') }} style={{ marginTop: 12, alignSelf: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, }} >
                        <LabelLI style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', color: '#fff', textAlign: 'center',  }}>Doar anonimamente</LabelLI>
                    </Button>

                </Column>
            </Column>
        </Main>
    )
}


/**Pagination
 *  <Row style={{}}>
                        {pages.map((_, index) => (
                            <MotiView
                                key={index}
                                from={{ opacity: 0.5, scale: 1 }}
                                animate={{ opacity: pageIndex === index ? 1 : 0.5, width: pageIndex === index ? 24 : 12 }}
                                transition={{ type: 'timing', duration: 300 }}
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 100,
                                    backgroundColor: pageIndex === index ? color.secundary : color.secundary + 90,
                                    marginHorizontal: 5,
                                }}
                            />
                        ))}
                    </Row>
 * 
 * 
 */
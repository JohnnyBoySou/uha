import React, { useContext, useRef, useState, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Main, Column, Row, Title, Label, ButtonPR, ButtonSE, LabelSE, ButtonLI, LabelLI, Scroll, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus } from 'lucide-react-native';
import { MotiImage, MotiView } from 'moti';
const { height, width } = Dimensions.get('window');

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
    
    return (
        <Main>
            <Column style={{ flex: 1, }}>
                <Row style={{ position: 'absolute', top: 30, left: 0, right: 20, zIndex: 99, justifyContent: 'space-between', alignItems: 'center', }}>
                    <MotiImage source={require('@imgs/logo.png')} style={{ objectFit: 'contain', width: 100, }} />
                    <Row style={{}}>
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
                </Row>


                <ScrollView
                    ref={scrollViewRef}
                    pagingEnabled
                    horizontal
                    style={{ position: 'absolute', top: -60, left: 0, right: 0, }}
                    onScroll={handleScroll}
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
                    <ButtonPR onPress={() => { navigation.replace('AuthLogin') }} style={{ marginTop: 24, }} >
                        <LabelSE>Próximo</LabelSE>
                    </ButtonPR>
                    <Button onPress={() => { navigation.push('DonateHide') }} style={{ marginTop: 12, alignSelf: 'center', }} >
                        <LabelLI style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', color: '#fff', textAlign: 'center', }}>Doar anonimamente</LabelLI>
                    </Button>

                </Column>
            </Column>
        </Main>
    )
}
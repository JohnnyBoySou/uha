import React, { useContext, useEffect, useState, } from 'react';
import { ActivityIndicator, FlatList, Pressable, Animated } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Bell, ArrowRight } from 'lucide-react-native';
import { MotiImage, MotiView, useAnimationState } from 'moti';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { Clipboard as Clip, } from 'lucide-react-native';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function ShopQRCodeScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const item = {
        code: '091722209593', 
        product: {
            name: 'Banho e tosa',
            value: '40',
            img: 'https://i.pinimg.com/564x/6b/36/7f/6b367f53e5df858d867aa45ab0ea93ca.jpg',
        }}
    //const item = route.params.item;
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 200);
    }, [])

    const [clip, setclip] = useState(false);
    const handleClipboard = async () => {
        await Clipboard.setStringAsync(item.code);
        setclip(true)
    };

    const scrollX = React.useRef(new Animated.Value(0)).current;
    
    const mode = useAnimationState({
        from: { opacity: 0, scale: 0, height: 0, display: 'none', translateY : -100,},
        to: { opacity: 1, scale: 1, height: 80,  translateY: 0, display: 'flex',  },
    })


    return (
        <Main style={{ backgroundColor: color.primary,  }}>
          
            <Scroll scrollEventThrottle={16}  onScroll={(event) => { const scrolling = event.nativeEvent.contentOffset.y; if (scrolling > 1) { mode.transitionTo('from')  } else {  mode.transitionTo('to')  } }} style={{ paddingTop: 15, borderRadius: 12 }}>

                
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <ArrowLeft color={color.secundary} />
                </Button>
                <Title style={{ color: '#fff', marginTop: 8, }}>Pagar</Title>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                    <Info color="#fff" size={32} />
                </Column>
            </Row>

            {loading && <Column style={{ padding: 12, borderRadius: 12, backgroundColor: '#ffffff60', marginHorizontal: margin.h, marginTop: 50, justifyContent: 'center', alignItems: 'center', }}>
                <Title style={{ color: '#fff', marginBottom: 32, }}>Gerando QR Code</Title>
                <ActivityIndicator size={52} color="#fff" />
            </Column>}
            {!loading &&
                <>
                <MotiView transition={{type: 'timing'}} delay={400} state={mode} from={{ opacity: 0, translateX: -40, }} animate={{ opacity: 1, translateX: 0, }} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',   borderRadius: 12, backgroundColor: '#ffffff',  marginHorizontal: margin.h, marginTop: 20, display: 'flex' }} >
                        <Row style={{ padding: 8, }}>
                        <MotiImage source={{ uri: item.product.img }} style={{ width: 56, height: 56, borderRadius: 8, marginLeft: 6, }} />
                        <Column style={{ justifyContent: 'center', marginLeft: 20, }}>
                            <Title style={{fontSize: 20, }}>{item.product.name} </Title>
                            <Title style={{fontSize: 16, color: color.primary, marginTop: -5, }}>{item.product.value} pontos</Title>
                        </Column>
                        </Row>
                        <Button onPress={() => {navigation.goBack()}}  style={{ backgroundColor: '#FFE0F6', padding: 12, borderRadius: 100,  marginRight: 12,}}>
                            <ArrowRight color={color.primary} />
                        </Button>
                </MotiView>

                <MotiView delay={800} transition={{type: 'timing'}} from={{ opacity: 0, translateY: 100, }} animate={{ opacity: 1, translateY: 0, }} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: margin.h,  marginBottom: 20,}}>
                        
                        <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -24, zIndex: 99, }} />
                        <Column style={{ backgroundColor: '#fff',  borderRadius: 32, padding: 32,  }}>
                            <Title style={{ marginVertical: 10, fontSize: 24, textAlign: 'center' }}>Aponte a camera</Title>
                            <Column style={{width: 290,  height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed',  marginTop: 20, marginBottom: 30,}} />
                        <Column style={{ alignSelf: 'center', }}>
                            <QRCode
                                size={250}
                                quietZone={10}
                                value={item.code}
                                logo={require('@imgs/logo_u_black.png')}
                                logoSize={52}
                                color={color.secundary}
                                logoBorderRadius={0}
                                logoBackgroundColor='#fff'
                                logoMargin={6}
                                />
                                </Column>
                        <Row style={{  marginHorizontal: - 64 , justifyContent: 'center', alignItems: 'center',  marginTop: 10, }}>
                            <Column style={{width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                            <Column style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                <Column style={{width: '100%', height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed', }} />
                            </Column>
                            <Column style={{width: 42, height: 42, backgroundColor: color.primary, borderRadius: 100, }} />
                        </Row>
                        <Row style={{ marginVertical: 10, alignSelf: 'center', }}>
                            <Title style={{  fontFamily: font.medium, fontSize: 18, }}>Ou digite o </Title>
                            <Title style={{  fontFamily: font.bold, fontSize: 18, }}>código manual</Title>
                        </Row>  

                        <Button onPress={handleClipboard} >
                            <Row style={{ borderWidth: 2, borderStyle: 'dashed', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderColor: clip ? color.green : color.secundary,   }}>
                                <Title style={{ marginBottom: -3, marginRight: 12, color: clip ? color.green : color.secundary,}}>{item.code}</Title>
                                <Clip size={22} color={color.primary}/>
                            </Row>
                        </Button>
                        <Label style={{ textAlign: 'center', marginTop: 20, fontSize: 14, }}>role para saber mais</Label>
                        <Column style={{width: 290,  height: 5, borderTopWidth: 2, borderColor: '#00000030', borderStyle: 'dashed',  marginTop: 20,}} />
                        <Column style={{   marginTop: 12, marginBottom: 20,}}>
                            <Title style={{ fontSize: 18, }}>Detalhes</Title>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Label style={{ fontSize: 14, }}>Criado em:</Label>
                                <Label style={{ fontSize: 14, }}>10/10/2024</Label>
                            </Row>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Label style={{ fontSize: 14, }}>Gerador:</Label>
                                <Label style={{ fontSize: 14, }}>App</Label>
                            </Row>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                                <Label style={{ fontSize: 14, }}>Estabelecimento:</Label>
                                <Label style={{ fontSize: 14, }}>Pet Tosas</Label>
                            </Row>
                        </Column>
                            <Column style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.primary, marginBottom: -52, zIndex: 99,  alignSelf: 'center', }} />
                        </Column>
                    </Column>
                </MotiView>

                
                <Column style={{ marginHorizontal: margin.h - 8, }}>
                    <Column style={{ backgroundColor: '#fff',  paddingTop: 20,  paddingHorizontal: 28, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 40, marginBottom: -8,}}>
                        <Title>Status do Pedido</Title>
                        <Column style={{ backgroundColor: '#FFE0F6', borderRadius: 12, paddingVertical: 10, marginTop: 12, borderWidth: 2, borderColor: color.primary, }}>
                            <Title style={{ color: color.primary,  fontSize: 16, justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>Aguardando confirmação</Title>
                        </Column>
                    </Column>
                    <Svg style={{ marginTop: -11, }} width="100%" height="85" viewBox="0 0 589 85" fill="none" xmlns="http://www.w3.org/2000/svg"><G clipPath="url(#clip0_407_84)"><Path d="M49 85L-0.363442 -0.500009L98.3635 -0.500001L49 85Z" fill="white"/><Path d="M147 85L97.6366 -0.500009L196.363 -0.500001L147 85Z" fill="white"/><Path d="M245 85L195.637 -0.500009L294.363 -0.500001L245 85Z" fill="white"/><Path d="M343 85L293.637 -0.500009L392.363 -0.500001L343 85Z" fill="white"/><Path d="M442 85L392.637 -0.500009L491.363 -0.500001L442 85Z" fill="white"/><Path d="M540 85L490.637 -0.500009L589.363 -0.500001L540 85Z" fill="white"/></G><Defs><ClipPath id="clip0_407_84"><Rect width="589" height="85" fill="white"/></ClipPath></Defs></Svg>
                </Column>
                
                </>
            }
            <Column style={{height: 200, }} />
            </Scroll>



        </Main>
    )
}

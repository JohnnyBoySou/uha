import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { HeartHandshake, Plus, Search, ShoppingBag, Phone, ZoomIn, Car, Rotate3D, Lock, Ticket, PartyPopper } from 'lucide-react-native';
import Header from '@components/header';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    runOnJS,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { Image } from 'expo-image'
import { MotiView } from 'moti';

export default function StickerSingleScreen({ navigation, route }) {

    const { color, margin, font } = useContext(ThemeContext);

    const { id, name, image, bg, total, receive } = route?.params || {};
    const [type, settype] = useState('Seus');

    const [scrollEnabled, setScrollEnabled] = useState(true);

    const bloqueados = total - receive;

    const conquistados = [{ id: 1, img: image, name: '20 doações' }, { id: 2, img: require('@stk/ambiental.png'), especial: true, name: '50 doações' },]
    const restante = [{ id: 7, img: image, name: '10 doações' }, { id: 2, img: require('@stk/ambiental.png'), especial: true, name: '50 doações' },]

    const porcentage = (receive / total) * 100;

    const [selectImage, setselectImage] = useState(image);
    const [selectName, setselectName] = useState();



    return (
        <Main>
            <Scroll scrollEnabled={scrollEnabled}>
                <Header rose title="Coleção" />
                <Column style={{ marginHorizontal: margin.h, }}>

                    <MotiView from={{opacity: 0, translateY: -30}} animate={{opacity: 1, translateY: 0}}>
                        <Column style={{ backgroundColor: bg, marginTop: 10, borderRadius: 16, paddingVertical: 30, justifyContent: 'center', alignItems: 'center', }}>
                        <Card3D img={selectImage} bg={bg} setScrollEnabled={setScrollEnabled} />
                        <Column style={{ width: 44, height: 44, backgroundColor: '#ffffff50', position: 'absolute', bottom: 20, right: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Rotate3D size={18} color="#fff" />
                        </Column>
                        {selectName &&
                            <MotiView from={{opacity: 0, translateY: 20,}} animate={{opacity: 1, translateY: 0,}} style={{position: 'absolute', bottom: 10, zIndex: 99, alignSelf: 'center', backgroundColor: '#ffffff60', borderRadius: 100, borderWidth: 2, borderColor: '#ffffff90',}}>
                                <Title style={{ fontSize: 15, color: '#fff', paddingVertical: 6, paddingHorizontal: 12, }}>{selectName}</Title>
                            </MotiView>}
                        </Column>
                    </MotiView>

                    <MotiView from={{opacity: 0, translateY: 30}} animate={{opacity: 1, translateY: 0}}>
                        <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 20, paddingBottom: 16, }}>
                        <Row style={{ marginTop: -10, justifyContent: 'space-evenly', alignItems: 'center', }}>
                            <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: bg, }} />
                            <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: bg, }} />
                            <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: bg, }} />
                            <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: bg, }} />
                            <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: bg, }} />
                            <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: bg, }} />
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                            <Column>
                                <Label style={{ fontSize: 12, color: color.secundary + 99 }}>Coleção de Stickers</Label>
                                <Title style={{ fontSize: 24, lineHeight: 28, }}>{name}</Title>
                                <Title style={{ fontSize: 12, fontFamily: font.medium, }}>{receive} de {total} stickers.</Title>
                            </Column>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title style={{ fontSize: 18, lineHeight: 18, fontFamily: font.bold, color: color.blue, textAlign: 'right' }}>{porcentage.toFixed(0)}%</Title>
                                <Title style={{ fontSize: 15, marginBottom: 6, lineHeight: 15, fontFamily: font.bold, color: color.blue, textAlign: 'right' }}>completo</Title>
                                <Column style={{ width: 80, height: 10, borderRadius: 12, backgroundColor: color.blue + 30, }}>
                                    <Column style={{ width: porcentage + '%', height: 10, backgroundColor: color.blue, borderRadius: 12, }} />
                                </Column>

                            </Column>
                        </Row>
                    </Column>
                    </MotiView>

                    <Row style={{ marginBottom: 12, marginTop: 20, }}>
                        <MotiView delay={400} from={{ opacity: 0, translateX: -20, }} animate={{ opacity: 1, translateX: 0, }} style={{ width: '48%' }}>
                            <Button onPress={() => { settype('Seus') }} style={{ backgroundColor: type === 'Seus' ? color.primary + 20 : color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                                <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                    {receive >= 1 && <MotiView from={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 32, height: 32, position: 'absolute', top: 20, right: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: type === 'Seus' ? color.primary : color.secundary, }}>
                                        <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>{receive}</Title>
                                    </MotiView>}
                                    <PartyPopper color={type === 'Seus' ? color.primary : color.secundary} size={36} strokeWidth={2} />
                                    <Title style={{ fontSize: 16, lineHeight: 16, fontFamily: type === 'Seus' ? font.bold : font.medium, color: type === 'Seus' ? color.primary : color.secundary, marginTop: 12, }}>Seus {'\n'}Stickers</Title>
                                </Column>
                            </Button>
                        </MotiView>
                        <Column style={{ width: 12, }} />
                        <MotiView delay={800} from={{ opacity: 0, translateX: 20, }} animate={{ opacity: 1, translateX: 0, }} style={{ flexGrow: 1, }}>
                            <Button onPress={() => { settype('Bloqueados') }} style={{ backgroundColor: type === 'Bloqueados' ? color.primary + 20 : color.secundary + 20, flexGrow: 1, borderRadius: 12, }}>
                                <Column style={{ justifyContent: 'center', padding: 16, paddingTop: 32, }}>
                                    {bloqueados >= 1 && <MotiView from={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 32, height: 32, position: 'absolute', top: 20, right: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: type === 'Bloqueados' ? color.primary : color.secundary, }}>
                                        <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>{bloqueados}</Title>
                                    </MotiView>}
                                    <Lock color={type === 'Bloqueados' ? color.primary : color.secundary} size={36} strokeWidth={2} />
                                    <Title style={{ fontSize: 16, lineHeight: 16, fontFamily: type === 'Bloqueados' ? font.bold : font.medium, color: type === 'Bloqueados' ? color.primary : color.secundary, marginTop: 12, }}>Stickers {'\n'}Bloqueados</Title>
                                </Column>
                            </Button>
                        </MotiView>
                    </Row>

                    <MotiView from={{opacity: 0, translateY: 30}} animate={{opacity: 1, translateY: 0}} delay={1000}>
                        <FlatList
                            data={type === 'Seus' ? conquistados : restante}
                            renderItem={({ item }) => <Sticker item={item} setselectImage={setselectImage} selectImage={selectImage} selectName={selectName} setselectName={setselectName} />}
                            columnWrapperStyle={{ columnGap: 16, }}
                            contentContainerStyle={{ rowGap: 16, marginTop: 10, }}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            />
                    </MotiView>

                </Column>
                <Column style={{ height: 80, }} />
            </Scroll>
        </Main>
    )
}

const Sticker = ({ item, setselectImage, selectImage, setselectName }) => {
    const { color } = useContext(ThemeContext);
    const { id, img, especial, name } = item;

    return (
        <Column style={{ backgroundColor: '#fff', borderRadius: 8, padding: 8, flexGrow: 1, }}>
            <Button onPress={() => { setselectImage(img); setselectName(name); }} style={{ flexGrow: 1, marginTop: 6, justifyContent: 'center', alignItems: 'center', }}>
                <Image source={img} style={{ width: 130, height: 130, borderRadius: 8, backgroundColor: '#f7f7f7', }} contentFit='cover' transition={300} />
            </Button>
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 6, }}>
                {especial && <Image source={require('@stk/especial.png')} style={{ width: 18, height: 18, marginRight: 5, }} contentFit='cover' transition={300} />}
                <Title style={{ fontSize: 14, lineHeight: 20, fontFamily: 'Font_Medium', textAlign: 'center', color: color.secundary + 99, }}>{name}</Title>
            </Row>
        </Column>
    )
}


const Card3D = ({ img, setScrollEnabled }) => {
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            runOnJS(setScrollEnabled)(false); // Desativar o scroll setScrollEnabled(false)
        }).onUpdate((event) => {
            rotateX.value = event.translationY / 1; // Ajuste a sensibilidade conforme necessário
            rotateY.value = -event.translationX / 1; // Ajuste a sensibilidade conforme necessário
        }).onEnd(() => {
            rotateX.value = withSpring(0);
            rotateY.value = withSpring(0);
            runOnJS(setScrollEnabled)(true); // Ativar o scroll setScrollEnabled(true)
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 1000 },
                { rotateX: `${rotateX.value % 360}deg` },
                { rotateY: `${rotateY.value % 360}deg` },
            ],
        };
    });


    return (
        <GestureHandlerRootView >
            <GestureDetector gesture={panGesture}>
                <Animated.View style={animatedStyle}>
                    <Animated.Image source={img} style={[{ width: 186, height: 186, objectFit: 'cover', overflow: 'hidden', marginBottom: 20, },]} />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}



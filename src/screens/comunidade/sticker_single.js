import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Rotate3D, Lock, PartyPopper } from 'lucide-react-native';
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
import BottomSheet from '@gorhom/bottom-sheet';
import { getSingleSticker } from '@api/request/user/stickers';
import { Skeleton } from 'moti/skeleton';

export default function StickerSingleScreen({ navigation, route }) {

    const { color, margin, font } = useContext(ThemeContext);
    const { id } = route?.params || null;
    const [type, settype] = useState('Seus');
    const [selectSticker, setselectSticker] = useState(null);
    const [selectImage, setselectImage] = useState();
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const [item, setitem] = useState();
    const [loading, setloading] = useState(true);
    const [conquistados, setconquistados] = useState([]);
    const [bloqueados, setbloqueados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSingleSticker(id);
                setitem(res);
                console.log(res)
                setselectImage(res?.img);
                setconquistados(res?.conquistados);
                setbloqueados(res?.bloqueados);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData();
    }, []);

    const porcentage = (conquistados?.length / (bloqueados?.length + conquistados?.length)) * 100;
    const modalSingle = useRef(null);

    const handleSelect = (item) => {
        setselectSticker(item);
        modalSingle.current?.expand();
        setselectImage(item?.img);
    }

    return (
        <Main>
            <Scroll scrollEnabled={scrollEnabled}>
                <Header rose title="Coleção" />
                {loading ? <SkeletonList /> :
                <Column style={{ marginHorizontal: margin.h, }}>

                    <MotiView from={{ opacity: 0, translateY: -30 }} animate={{ opacity: 1, translateY: 0 }}>
                        <Column style={{ marginTop: 10, borderRadius: 16, paddingVertical: 30, justifyContent: 'center', alignItems: 'center',  backgroundColor: item?.bg,}}>
                            <Card3D img={selectImage} bg={item?.bg} setScrollEnabled={setScrollEnabled} />
                            <Column style={{ width: 44, height: 44, backgroundColor: '#ffffff50', position: 'absolute', bottom: 20, right: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Rotate3D size={18} color="#fff" />
                            </Column>
                        </Column>
                    </MotiView>

                    <MotiView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }}>
                        <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 20, paddingBottom: 16, }}>
                            <Row style={{ marginTop: -10, justifyContent: 'space-evenly', alignItems: 'center', }}>
                                <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: item?.bg, }} />
                                <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: item?.bg, }} />
                                <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: item?.bg, }} />
                                <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: item?.bg, }} />
                                <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: item?.bg, }} />
                                <Column style={{ width: 35, marginHorizontal: 8, height: 20, borderRadius: 100, backgroundColor: item?.bg, }} />
                            </Row>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                                <Column>
                                    <Label style={{ fontSize: 12, color: color.secundary + 99 }}>Coleção de Stickers</Label>
                                    <Title style={{ fontSize: 24, lineHeight: 28, }}>{item?.name}</Title>
                                    <Title style={{ fontSize: 12, fontFamily: font.medium, }}>{conquistados?.length} de {conquistados?.length + bloqueados?.length} stickers.</Title>
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
                                    {conquistados?.length >= 1 && <MotiView from={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 32, height: 32, position: 'absolute', top: 20, right: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: type === 'Seus' ? color.primary : color.secundary, }}>
                                        <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>{conquistados?.length}</Title>
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
                                    {bloqueados.length >= 1 && <MotiView from={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} style={{ width: 32, height: 32, position: 'absolute', top: 20, right: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: type === 'Bloqueados' ? color.primary : color.secundary, }}>
                                        <Title style={{ color: '#fff', fontSize: 18, lineHeight: 20, }}>{bloqueados?.length}</Title>
                                    </MotiView>}
                                    <Lock color={type === 'Bloqueados' ? color.primary : color.secundary} size={36} strokeWidth={2} />
                                    <Title style={{ fontSize: 16, lineHeight: 16, fontFamily: type === 'Bloqueados' ? font.bold : font.medium, color: type === 'Bloqueados' ? color.primary : color.secundary, marginTop: 12, }}>Stickers {'\n'}Bloqueados</Title>
                                </Column>
                            </Button>
                        </MotiView>
                    </Row>

                    <MotiView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} delay={1000}>
                        <FlatList
                            data={type === 'Seus' ? conquistados : bloqueados}
                            renderItem={({ item }) => <Sticker item={item} handleSelect={handleSelect} />}
                            columnWrapperStyle={{ columnGap: 16, }}
                            contentContainerStyle={{ rowGap: 16, marginTop: 10, }}
                            keyExtractor={item => item.id}
                            numColumns={2}
                        />
                    </MotiView>

                </Column>} 

                <Column style={{ height: 80, }} />
            </Scroll>
            <BottomSheet snapPoints={[0.4, 220]} ref={modalSingle} handleIndicatorStyle={{ backgroundColor: "#00000030", height: 8, width: 70, }}>
                <ScrollView>
                    {selectSticker && <CardStiker item={selectSticker} />}
                    <Button onPress={() => { modalSingle.current?.close() }} style={{ borderRadius: 100, paddingVertical:8, paddingHorizontal: 16, marginTop: 15, backgroundColor: color.primary+20, alignSelf: 'center', }} >
                        <Label style={{ color: color.primary, fontFamily: 'Font_Bold', fontSize: 15, lineHeight: 16, }}>Fechar</Label>
                    </Button>
                </ScrollView>
            </BottomSheet>
        </Main>
    )
}



const SkeletonList = () => {
    return(
        <Row style={{ marginVertical: 20, justifyContent: 'space-between', alignSelf: 'center', }}>
            <Column style={{ flexGrow: 1, }}>
                <Skeleton height={60} width={150} radius={12} colorMode='light' />
                <Column style={{height: 16 }} />
                <Skeleton height={200} width={150} radius={12} colorMode='light' />
                <Column style={{height: 16 }} />
                <Skeleton height={200} width={150} radius={12} colorMode='light' />
                <Column style={{height: 16 }} />
                <Skeleton height={200} width={150} radius={12} colorMode='light' />
            </Column>
            <Column style={{ flexGrow: 1, }}>
                <Skeleton height={220} width={150} radius={12} colorMode='light' />
                <Column style={{height: 16 }} />
                <Skeleton height={220} width={150} radius={12} colorMode='light' />
                <Column style={{height: 16 }} />
                <Skeleton height={220} width={150} radius={12} colorMode='light' />
            </Column>
        </Row>
    )}
    


const CardStiker = ({ item }) => {
    const { color } = useContext(ThemeContext);
    const { img, especial, name, label, receive_date = null } = item;

    return (
        <Row style={{  paddingHorizontal: 28,  alignItems: 'center', }}>


            <Image source={img} style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: '#f7f7f7', }} contentFit='cover' transition={300} />
            <Column style={{ width: '65%', marginLeft: 12, }}>
                {especial && <Row style={{ marginBottom: 8, }}>
                    <Image source={require('@stk/especial.png')} style={{ width: 12, height: 12, marginRight: 3, }} contentFit='cover' transition={300} />
                    <Title style={{ fontSize: 12, color: '#FF852D', lineHeight: 14, }}>Especial</Title>
                </Row>}
                <Title style={{ fontSize: 18, lineHeight: 18, fontFamily: 'Font_Bold', }}>{name}</Title>
                <Label style={{ letterSpacing: -0.5, fontSize: 15, lineHeight: 16, marginVertical: 5,}}>{label}</Label>
                <Label style={{ fontSize: 10, lineHeight: 10, fontFamily: 'Font_Bold', marginLeft: -2, color: receive_date != null ? color.blue : color.red }}> {receive_date != null ? 'Recebido em ' + receive_date : 'Você ainda não desbloqueou'}</Label>
            </Column>


        </Row>
    )
}

const Sticker = ({ item, handleSelect, }) => {
    const { color } = useContext(ThemeContext);
    const { id, img, especial, name } = item;

    return (
        <Column style={{ backgroundColor: '#fff', borderRadius: 8, padding: 8, flexGrow: 1, }}>
            <Button onPress={() => { handleSelect(item) }} style={{ flexGrow: 1, marginTop: 6, justifyContent: 'center', alignItems: 'center', }}>
                <Image source={img} style={{ width: 130, height: 130, borderRadius: 8, backgroundColor: '#f7f7f7', }} contentFit='cover' transition={300} />
            </Button>
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 6, }}>
                {especial && <Image source={require('@stk/especial.png')} style={{ width: 18, height: 18, marginRight: 5, }} contentFit='cover' transition={300} />}
                <Title style={{ fontSize: 14, lineHeight: 20, fontFamily: 'Font_Medium', textAlign: 'center', color: color.secundary + 99, }}>{name.length > 14 ? name?.slice(0, 14) + '...' : name}</Title>
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



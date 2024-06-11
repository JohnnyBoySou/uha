import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI, ButtonOut, Digit, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Clipboard as Clip, X, CheckCircle } from 'lucide-react-native';
import Header from '@components/header';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';



export default function DonateValueHideScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const value = route.params?.value;

    const [loading, setloading] = useState(false);
    const [visible, setVisible] = useState(false);
    const data = { pix: 'chavepix09876543456789087' }
    const copyToClipboard = async () => {
        setVisible(true);
        await Clipboard.setStringAsync(value.pix);
    };
    const bottomONGS = useRef(null);


    return (
        <Main style={{}}>
            <Scroll>
                <Header title="Fazer doação anônima" />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 32, }}>
                    <Label>Você está fazendo uma doação de</Label>
                    <Title style={{ fontSize: 32, lineHeight: 36, marginTop: 8, marginBottom: 12, }}>R$ {value},00</Title>

                    <ButtonOut onPress={() => { bottomONGS.current.expand() }} style={{ borderColor: color.primary, alignSelf: 'flex-start', paddingVertical: 8, marginVertical: 12, }}>
                        <LabelLI style={{ color: color.primary }}>Escolher ONG</LabelLI>
                    </ButtonOut>

                    <Label>Local de doação: aplicativo </Label>
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ borderWidth: 1, borderColor: color.primary, borderRadius: 32, padding: 32, backgroundColor: "#fff", marginVertical: 20, }}>
                                <MotiImage source={require('@imgs/qrcode.png')} style={{ width: 300, height: 300, }} />
                            </Column>
                            <Label style={{ marginVertical: 20, }}>Ou copie o código para pagamento</Label>
                            <Button onPress={copyToClipboard} style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: color.secundary, borderRadius: 12, flexGrow: 1, paddingHorizontal: 30, }}>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Title style={{ paddingTop: 14, paddingBottom: 10, fontSize: 18, lineHeight: 18, }}>{data.pix}...</Title>
                                    <Clip size={16} color="#000" style={{ marginLeft: 12, }} />
                                </Row>
                            </Button>

                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 30, }}>
                                <Title style={{ marginRight: 6, }}>Status: pagamento aprovado</Title>
                                <CircleCheck color={color.green} size={24} />
                            </Row>

                            <Row style={{ padding: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', }}>
                                <ButtonPR style={{ paddingHorizontal: 24, }} onPress={() => { navigation.navigate('BuyServiceSuccess') }} >
                                    <LabelLI  style={{ color: '#fff', }}>Fazer doação</LabelLI>
                                </ButtonPR>
                            </Row>
                            
                        </Column>
                    </MotiView>

                </Column>
            </Scroll>
            <BottomSheet
                ref={bottomONGS}
                snapPoints={[0.4, 800]}

            >
                <BottomSheetScrollView>
                    <ONGS value={value} navigation={navigation}/>
                </BottomSheetScrollView>
            </BottomSheet>


            <Snackbar style={{ backgroundColor: "#fff", marginVertical: 12, marginHorizontal: margin.h, }} visible={visible} onDismiss={() => setVisible(false)} action={{ label: 'Pronto', onPress: () => setVisible(false), }}><Label>Copiado para a área de transferência</Label></Snackbar>
        </Main>
    )
}



const listOngs = [
    {
        id: 1,
        name: 'ONG 1',
        desc: 'Descrição da ONG 1',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'
    },
    {
        id: 2,
        name: 'ONG 2',
        desc: 'Descrição da ONG 2',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'

    },
    {
        id: 3,
        name: 'ONG 3',
        desc: 'Descrição da ONG 3',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'
    },
]
const ONGS = ({ navigation, value}) => {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(false);
    return (
        <Column style={{ paddingHorizontal: margin.h, paddingVertical: margin.v, }}>
            <Title style={{ fontSize: 36, lineHeight: 40, marginBottom: 12, }}>Escolha qual ONG {'\n'}deseja beneficiar</Title>
            <Label>Ao cadastrar sua nota o valor de R$ {value},00 será doado para a ONG abaixo de sua escolha</Label>
            <ButtonOut onPress={() => { settype(!type) }} style={{ borderColor: type ? '#fff': color.primary,  paddingVertical: 8, marginVertical: 18, backgroundColor: type ? color.primary : 'transparent' }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <LabelLI style={{ color: type ? '#fff' : color.primary }}>Deixar escolha em aberto</LabelLI>
                    <CheckCircle size={20} color='#fff' style={{ marginLeft: 12, }} />
                </Row>
            </ButtonOut>

            <FlatList
                data={listOngs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Button onPress={() => {navigation.navigate('ONGSingle', {item: item,})}}  key={item.id} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginBottom: 12, paddingBottom: 12, }}>
                        <Row style={{  alignItems: 'center',  }}>
                            <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }}/>
                            <Column style={{ marginLeft: 20, }}>
                                <Title>{item?.name}</Title>
                                <Label>{item?.desc}</Label>
                            </Column>
                        </Row>
                    </Button>
                )}
            />
        </Column>
    )
}
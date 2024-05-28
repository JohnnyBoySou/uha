import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI, ButtonOut, Digit, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, CheckCircle, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';
import Header from '@components/header';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';



export default function DonateValueScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState(30);
    const [loading, setloading] = useState(false);

    const patinhas  = value * 6;

    const [type, settype] = useState(null);
    const [visible, setVisible] = useState(false);
   
    const bottomONGS = useRef(null);

    return (
        <Main style={{  }}>
            <Scroll>

            <Header title="Fazer doação"/>
            <Column style={{ marginHorizontal: margin.h, marginVertical: 32, }}>
                <Label>Você está fazendo uma doação de</Label>
                <Title style={{ fontSize: 32,  lineHeight: 36, marginTop: 8, marginBottom: 12, }}>R$ {value},00</Title>

                <ButtonOut onPress={() => { bottomONGS.current.expand() }} style={{ borderColor: color.primary, alignSelf: 'flex-start', paddingVertical: 8, marginVertical: 12, }}>
                    <LabelLI style={{ color: color.primary }}>Escolher ONG</LabelLI>
                </ButtonOut>

                <Label>Local de doação: aplicativo </Label>
                <Label>Valor recebido em pontos: {patinhas}</Label>


                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 32,  }}>
                    <Title style={{ fontSize: 20, lineHeight: 24,  }}>Pagar com</Title>
                   {type != null && <Button onPress={() => {settype(null)}} style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <CircleX size={32} color={color.red}/>
                    </Button>}
                </Row>


            <AnimatePresence>


              {type == null && <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}>

                <Button onPress={() => {settype('pix')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                    <Row>
                        <Column style={{ padding: 28, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <ImagePlus size={24} color={color.secundary}/>
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20,  }}>
                            <Title>Pix</Title>
                            <Label>Pagamento instantâneo</Label>
                        </Column>
                    </Row>
                </Button>

                <Button style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                    <Row>
                        <Column style={{ padding: 28, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <ImagePlus size={24} color={color.secundary}/>
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20,  }}>
                            <Title>Cartão de crédito</Title>
                            <Label>Adicionar cartão</Label>
                        </Column>
                    </Row>
                </Button>

                <Button style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                    <Row>
                        <Column style={{ padding: 28, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <ImagePlus size={24} color={color.secundary}/>
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20,  }}>
                            <Title>Cartão de débito</Title>
                            <Label>Adicionar cartão</Label>
                        </Column>
                    </Row>
                </Button>

                <Button style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                    <Row>
                        <Column style={{ padding: 28, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                            <ImagePlus size={24} color={color.secundary}/>
                        </Column>
                        <Column style={{ justifyContent: 'center', marginHorizontal: 20,  }}>
                            <Title>Boleto</Title>
                            <Label>Pagamento com validação</Label>
                        </Column>
                    </Row>
                </Button>
                </MotiView>
                }
                </AnimatePresence>

                {type == 'pix' && 
                    <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}>
                    <Button onPress={() => {settype('pix')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                        <Row>
                            <Column style={{ padding: 28, backgroundColor: '#FFE0F6', borderRadius: 12, }}>
                                <ImagePlus size={24} color={color.secundary}/>
                            </Column>
                            <Column style={{ justifyContent: 'center', marginHorizontal: 20,  }}>
                                <Title>Pix</Title>
                                <Label>Pagamento instantâneo</Label>
                            </Column>
                        </Row>
                    </Button>
                    <ContextChose navigation={navigation}/>
                    </MotiView> }



            </Column>
            </Scroll>
            <BottomSheet
                ref={bottomONGS}
                snapPoints={[0.4, 800]}

            >
                <BottomSheetScrollView>
                    <ONGS />
                </BottomSheetScrollView>
            </BottomSheet>


            <Snackbar style={{ backgroundColor: "#fff", marginVertical: 12, marginHorizontal: margin.h, }} visible={visible} onDismiss={() => setVisible(false)} action={{ label: 'Pronto', onPress: () => setVisible(false), }}><Label>Copiado para a área de transferência</Label></Snackbar>
  
        </Main>
    )
}



const ContextChose = ({item, navigation}) => {
    const { color, font, margin } = useContext(ThemeContext);
    const data = { pix: 'chavepix09876543456789087' }
    const copyToClipboard = async () => {
        setVisible(true);
        await Clipboard.setStringAsync(value.pix);
    };
    return(
        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
            <Column style={{ borderWidth: 1, borderColor: color.primary, borderRadius: 32, padding: 32, marginVertical: 20, }}>
                <MotiImage source={require('@imgs/qrcode.png')} style={{ width: 300, height: 300, }} />
            </Column>
            <Label style={{ marginVertical: 20, }}>Ou copie o código para pagamento</Label>
            <Button onPress={copyToClipboard} style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: color.secundary, borderRadius: 12, flexGrow: 1, paddingHorizontal: 30, }}>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Title style={{ paddingTop: 14, paddingBottom: 10, fontSize: 18, lineHeight: 18, }}>{data.pix}...</Title>
                                    <Clip size={16} color="#000" style={{ marginLeft: 12, }} />
                                </Row>
                            </Button>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 30,  }}>
                <Title style={{ marginRight: 6, }}>Status: pagamento aprovado</Title>   
                <CircleCheck color={color.green} size={24} />
            </Row>

            <Row style={{ padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center',     }}>
                <ButtonPR style={{ paddingHorizontal: 24, }}  onPress={() => {navigation.navigate('BuyServiceSuccess')}} >
                    <LabelLI style={{ color: '#fff', }}>Transferir</LabelLI> 
                </ButtonPR>
                <Column style={{width: 24, }} />
                <ButtonSE onPress={() => {navigation.navigate('BuyServiceError')}} >
                    <LabelLI style={{ color: "#fff" }}>Campanhas</LabelLI>
                </ButtonSE>
            </Row>
            </Column>
        )
    }


    

const listOngs = [
    {
        id: 1,
        name: 'ONG 1',
        desc: 'Descrição da ONG 1',
    },
    {
        id: 2,
        name: 'ONG 2',
        desc: 'Descrição da ONG 2',
    },
    {
        id: 3,
        name: 'ONG 3',
        desc: 'Descrição da ONG 3',
    },
]
const ONGS = () => {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(false);
    return (
        <Column style={{ paddingHorizontal: margin.h, paddingVertical: margin.v, }}>
            <Title style={{ fontSize: 36, lineHeight: 40, marginBottom: 12, }}>Escolha qual ONG {'\n'}deseja beneficiar</Title>
            <Label>Ao cadastrar sua nota o valor de R$00,00 será doado para a ONG abaixo de sua escolha</Label>
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
                    <Column key={item.id} style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginBottom: 12, paddingBottom: 12, }}>
                        <Row style={{  alignItems: 'center',  }}>
                            <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }}/>
                            <Column style={{ marginLeft: 20, }}>
                                <Title>{item?.name}</Title>
                                <Label>{item?.desc}</Label>
                            </Column>
                        </Row>
                    </Column>
                )}
            />
        </Column>
    )
}
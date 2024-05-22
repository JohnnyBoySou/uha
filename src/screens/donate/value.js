import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI, ButtonOut, Digit, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';
import Header from '@components/header';
import { AnimatePresence, MotiImage, MotiView } from 'moti';

export default function DonateValueScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState(30);
    const [loading, setloading] = useState(false);

    const patinhas  = value * 6;

    const [type, settype] = useState(null);

    return (
        <Main style={{  }}>
            <Scroll>

            <Header title="Fazer doação"/>
            <Column style={{ marginHorizontal: margin.h, marginVertical: 32, }}>
                <Label>Você está fazendo uma doação de</Label>
                <Title style={{ fontSize: 32,  lineHeight: 36, marginTop: 8, marginBottom: 32, }}>R$ {value},00</Title>

                <Label>Local de doação: aplicativo </Label>
                <Label>Valor recebido em patinhas: {patinhas}</Label>


                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 32,  }}>
                    <Title style={{ fontSize: 20, lineHeight: 24,  }}>Pagar com</Title>
                    <Button onPress={() => {settype(null)}} style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <X size={32} color={color.red}/>
                    </Button>
                </Row>


            <AnimatePresence>


              {type == null && <MotiView from={{opacity: 0,}} animate={{opacity: 1,}}>

                <Button onPress={() => {settype('pix')}}  style={{ borderBottomWidth: 2, borderBottomColor: color.off, marginTop: 12, paddingBottom: 12, }}>
                    <Row>
                        <Column style={{ padding: 28, backgroundColor: color.primary+40, borderRadius: 12, }}>
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
                        <Column style={{ padding: 28, backgroundColor: color.primary+40, borderRadius: 12, }}>
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
                        <Column style={{ padding: 28, backgroundColor: color.primary+40, borderRadius: 12, }}>
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
                        <Column style={{ padding: 28, backgroundColor: color.primary+40, borderRadius: 12, }}>
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
                            <Column style={{ padding: 28, backgroundColor: color.primary+40, borderRadius: 12, }}>
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
            
        </Main>
    )
}



const ContextChose = ({item, navigation}) => {
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
            <Column style={{ borderWidth: 1, borderColor: color.primary, borderRadius: 32, padding: 32, marginVertical: 20, }}>
                <MotiImage source={require('@imgs/qrcode.png')} style={{ width: 300, height: 300, }} />
            </Column>
            <Label style={{ marginVertical: 20, }}>Ou copie o código para pagamento</Label>
            <Title style={{ borderWidth: 2, borderColor: color.secundary, borderStyle: 'dashed', paddingTop: 14, paddingBottom: 10,  fontSize: 18, lineHeight: 18, borderRadius: 12, flexGrow: 1, paddingHorizontal: 20,}}>chavepix09876543456789087...</Title>
            
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 30,  }}>
                <Title style={{ marginRight: 6, }}>Status: pagamento aprovado</Title>   
                <CircleCheck color={color.green} size={24} />
            </Row>

            <Row style={{ padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center',     }}>
                <ButtonPR style={{ paddingHorizontal: 24, }}  onPress={() => {navigation.navigate('BuyServiceSuccess')}} >
                    <LabelLI>Transferir</LabelLI> 
                </ButtonPR>
                <Column style={{width: 24, }} />
                <ButtonSE onPress={() => {navigation.navigate('BuyServiceError')}} >
                    <LabelLI style={{ color: "#fff" }}>Campanhas</LabelLI>
                </ButtonSE>
            </Row>
            </Column>
        )
    }
import React, { useContext, useState, useRef } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI , ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, Minus, Plus, X } from 'lucide-react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function BuyServiceRifaScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState(5);
    const [loading, setloading] = useState(false);
    const sheetRifa = useRef();

    const handleClick = (digit) => {
        if(value + digit <= values.total){
            setvalue(value + digit);
        }else {
            return
        }
    }
    const handleAdd = () => {
        if(value * 15 >= values.total){
            return
        }
        else if(value < values.total){
            setvalue(`${parseInt(value) + 1}`);
        }else {
            return
        }
    }

    const handleRemove = () => {
        if(value > 0){
            setvalue(`${parseInt(value) - 1}`);
        }else {
            return
        }
    }
    const values = {
        total: 300,

    }

    const handleFinish = () => {
        setloading(true);
        setTimeout(() => {
            navigation.navigate('BuyServiceSuccess');
            setloading(false)
        }, 3500);
    }

    const handleTotalValue = () => {
        setvalue(values.total / 15)
    }
    const bottomEnviar = useRef(null);
    const [codigo, setcodigo] = useState();
    const uhacoins = value * 15;
    return (
        <Main style={{ backgroundColor: color.secundary, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: margin.h, }}>
                <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: "#ffffff20", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                    <ArrowLeft color="#fff"/>
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center',  }}>
                    <Info color="#fff" size={32}/>
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                <Label style={{ color: '#fff', }}>Campanha</Label>
                <Title style={{ fontSize: 32, lineHeight: 38,  color: '#fff',}}>Rifas da Sorte</Title>
            </Column>

            <Column style={{ justifyContent: 'center', alignItems: 'center', marginTop: 120,  }}>
                <Label style={{ textAlign: 'center',  color: '#fff', }}>Quantidade de fichas</Label>


                <Keyboard handleClick={handleClick} handleAdd={handleAdd} handleRemove={handleRemove} value={value}/>              

               <Label style={{ color: '#fff', }}>Total em UhaCoins: {uhacoins}</Label>
               <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Label style={{ color: '#fff', }}>UhaCoins disponíveis: </Label>
                    <Button onPress={handleTotalValue} style={{ borderRadius: 100, }} >
                        <Label style={{ fontFamily: font.bold, color: '#fff', backgroundColor: color.primary+40, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 12,}}>{values.total}</Label>
                    </Button>
               </Row>
               <Label style={{ color: '#fff', marginTop: 100, }}>1 ficha = 15 UhaCoins</Label>
            </Column>
            <Row style={{ position: 'absolute', bottom: 0, backgroundColor: "#fff",  padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, width: '100%',    }}>
            <ButtonLI onPress={handleFinish}  disabled={loading} style={{ backgroundColor: color.primary, paddingHorizontal: 24, flexGrow: 1, }}>
                        <>
                        {loading ? <ActivityIndicator color={color.light} size={24} style={{ marginHorizontal:31, marginVertical: 1 }}/> :  <LabelLI style={{ color: '#fff', }}>Transferir</LabelLI>  }
                        </>
                  </ButtonLI>
                  <Column style={{width: 24, }} />
                  <ButtonOut style={{ flexGrow: 1, borderColor: color.primary, }} onPress={() => {navigation.navigate('BuyServiceError')}} >
                    <LabelLI style={{ color: color.primary, }}>QR Code</LabelLI>
                  </ButtonOut>
                </Row>


                
            <BottomSheet ref={sheetRifa} snapPoints={[0.5, 200]}   style={{ backgroundColor: color.background, borderRadius: 24, }} handleStyle={{backgroundColor: color.background, borderRadius: 24,}} handleIndicatorStyle={{backgroundColor: color.secundary+40, width: 80, height: 6, borderRadius: 100,}}>
                <BottomSheetView style={{ paddingHorizontal: margin.h, backgroundColor: color.background, flex: 1, }}>
                 
                    <Title style={{ textAlign: 'center', marginVertical: 20, }}>Deseja comprar {value} fichas</Title>
                  <Row>
                  <ButtonLI onPress={handleFinish}  disabled={loading} style={{ backgroundColor: color.primary, paddingHorizontal: 24, }}>
                        <>
                        {loading ? <ActivityIndicator color={color.light} size={24} style={{ marginHorizontal:31, marginVertical: 1 }}/> :  <LabelLI style={{ color: '#fff', }}>Gerar Gift Card</LabelLI>  }
                        </>
                  </ButtonLI>
                  <Column style={{width: 24, }} />
                  <ButtonOut style={{ flexGrow: 1, borderColor: color.primary, }} onPress={() => {navigation.navigate('BuyServiceError')}} >
                    <LabelLI style={{ color: color.primary, }}>QR Code</LabelLI>
                  </ButtonOut>
                  </Row>

                </BottomSheetView>
            </BottomSheet>

            <BottomSheet ref={bottomEnviar} snapPoints={[1, 340]}>
                <BottomSheetView style={{ marginHorizontal: margin.h, }}>
                    <Title style={{ textAlign: 'center', marginVertical: 12,}}>Digite o código</Title>
                   <Column style={{ width: 300, alignSelf: 'center', }}>
                    <TextInput value={codigo} onChangeText={e => setcodigo(e)} textBreakStrategy='highQuality' lineBreakStrategyIOS='standard' 
                        style={{ borderWidth: 2, width: 300, height: 100, alignSelf: 'center', borderColor: "#111", borderRadius: 12, paddingHorizontal: 12, marginVertical: 12, fontFamily: font.medium, fontSize: 18,  }} numberOfLines={3} multiline
                        placeholder='12345678909876543212345678909876543211234'
                        maxLength={44}
                        />
                    <Label style={{ marginTop: -40, marginBottom: 24, marginRight: 10, alignSelf: 'flex-end',  fontSize: 16,  fontFamily: font.bold, color: "#111", }}>{value.length}/44</Label>
                    </Column>
                    <Label style={{ textAlign: 'center',  }}>Sequência de 44 números</Label>
                <ButtonOut onPress={() => {bottomEnviar.current?.close()}}  style={{ borderColor: color.secundary, marginVertical: 24, marginHorizontal: 32, }}>
                    <Label style={{ color: color.secundary, fontFamily: font.bold, }}>Verificar</Label>
                </ButtonOut>
                 </BottomSheetView>
            </BottomSheet>
        </Main>
    )
}


const Keyboard = ({handleRemove, handleAdd, handleClean, value}) => {
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 24,  }}>
                <Button onPress={handleRemove}   style={{ width: 64, height: 64,  color: "#fff", borderRadius: 12,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Minus  color="#ffffff" size={32} />
                </Button>
                <Button onPress={() => {}}  style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", marginHorizontal: 20,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", fontSize: 42, lineHeight: 48, }}>{value}</Digit>
                </Button>
                <Button onPress={handleAdd} style={{ width: 64, height: 64,  color: "#fff", borderRadius: 12,   justifyContent: 'center', alignItems: 'center',  }}> 
                    <Plus color="#ffffff" size={32}/>
                </Button>
            </Row>
            
        </Column>
    )}
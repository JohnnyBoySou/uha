import React, { useContext, useState, useRef} from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI , ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function BuyServiceScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState('');
    const [loading, setloading] = useState(false);

    const handleClick = (digit) => {
        if(value + digit <= values.total){
            setvalue(value + digit);
        }else {
            return
        }
    }
    const handleDelete = () => {
        setvalue(value.slice(0, -1));
    }

    const handleClean = () => {
        setvalue('0');
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


    const bottomEnviar = useRef(null);
    const [codigo, setcodigo] = useState();

    return (
        <Main style={{ backgroundColor: '#fff' }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: margin.h, }}>
                <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: "#fff", width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                    <ArrowLeft color={color.secundary}/>
                </Button>
                <Column >
                </Column>
                <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center',  }}>
                    <Info color="#111" size={32}/>
                </Column>
            </Row>

            <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                <Label>Campanha</Label>
                <Title style={{ fontSize: 32, lineHeight: 38, }}>UhaCoins</Title>
            </Column>

            <Column style={{ justifyContent: 'center', alignItems: 'center',   }}>
                <Label style={{ textAlign: 'center',   }}>Transferir</Label>


              {value.length == 0 ? <Title style={{ fontSize: 50, lineHeight: 54, marginVertical: 12, fontFamily: font.black, color: color.title+20 }}>100</Title>
               : <Title style={{ fontSize: 50, lineHeight: 54, marginVertical: 12, fontFamily: font.black, }}>{value}</Title>}
               
               <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Label>UhaCoins disponíveis: </Label>
                    <Button onPress={() => {setvalue(`${values.total}`)}} style={{ borderRadius: 100, }}>
                        <Label style={{ fontFamily: font.bold, color: color.title, backgroundColor: color.primary+20, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 12,}}>{values.total}</Label>
                    </Button>
               </Row>
                <Button onPress={() => {bottomEnviar.current?.expand()}}  style={{ backgroundColor: color.background, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginVertical: 32, }}>
                    <Title style={{ fontSize: 18, }}>Digite o código manual</Title>
                </Button>
            </Column>
            <Keyboard handleClick={handleClick} handleDelete={handleDelete} handleClean={handleClean}/>              

            <Row style={{ position: 'absolute', bottom: 0, backgroundColor: color.primary,  padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, width: '100%', justifyContent: 'center', alignItems: 'center',   }}>
                  <ButtonLI onPress={handleFinish}  style={{ paddingHorizontal: 24, backgroundColor: color.background, }} disabled={loading}>
                        <>
                        {loading ? <ActivityIndicator color={color.blue} size={24} style={{ marginHorizontal:31, marginVertical: 1 }}/> :  <LabelLI>Transferir</LabelLI>  }
                        </>
                  </ButtonLI>
                  <Column style={{width: 24, }} />
                  <ButtonOut onPress={() => {navigation.navigate('BuyServiceError')}} style={{ marginVertical: 2, paddingVertical: 10, }}>
                    <LabelLI style={{ color: "#fff" }}>QR Code</LabelLI>
                  </ButtonOut>
                </Row>

                <BottomSheet ref={bottomEnviar} snapPoints={[1, 340]} backgroundStyle={{backgroundColor:color.background, }} style={{ backgroundColor: color.background, borderRadius: 24, overflow: 'hidden' }} >
                <BottomSheetView style={{ paddingHorizontal: margin.h, backgroundColor: color.background, }}>
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


const Keyboard = ({handleClick, handleDelete, handleClean}) => {
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('1')}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>1</Digit>
                </Button>
                <Button onPress={() => {handleClick('2')}} style={{ width: 64, height: 64, marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>2</Digit>
                </Button>
                <Button onPress={() => {handleClick('3')}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>3</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('4')}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>4</Digit>
                </Button>
                <Button onPress={() => {handleClick('5')}} style={{ width: 64, height: 64, marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>5</Digit>
                </Button>
                <Button onPress={() => {handleClick('6')}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>6</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('7')}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>7</Digit>
                </Button>
                <Button onPress={() => {handleClick('8')}} style={{ width: 64, height: 64, marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>8</Digit>
                </Button>
                <Button onPress={() => {handleClick('9')}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>9</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button   style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                   <Column style={{ }} />
                </Button>
                <Button onPress={() => {handleClick('0')}} style={{ width: 64, height: 64, marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit>0</Digit>
                </Button>
                <Pressable onPress={() => {handleDelete()}} onLongPress={() => {handleClean()}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Delete color={color.red} size={32} />
                </Pressable>
            </Row>
            
        </Column>
    )}
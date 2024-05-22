import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI , ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';

export default function BuyServiceGiftCardScreen({ navigation, }) {
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
                <Label style={{ color: '#fff', }}>Presentei com</Label>
                <Title style={{ fontSize: 32, lineHeight: 38,  color: '#fff',}}>Gift Card</Title>
            </Column>

            <Column style={{ justifyContent: 'center', alignItems: 'center',   }}>
                <Label style={{ textAlign: 'center',  color: '#fff', }}>Transferir</Label>


              {value.length == 0 ? <Title style={{ fontSize: 50, color: '#ffffff50', lineHeight: 54, marginVertical: 12, fontFamily: font.black,   }}>100</Title>
               : <Title style={{ fontSize: 50, lineHeight: 54, marginVertical: 12, fontFamily: font.black,  color: '#fff',}}>{value}</Title>}
               
               <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Label style={{ color: '#fff', }}>Patinhas disponíveis: </Label>
                    <Button onPress={() => {setvalue(`${values.total}`)}} style={{ borderRadius: 100, }} >
                        <Label style={{ fontFamily: font.bold, color: '#fff', backgroundColor: color.primary+20, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 12,}}>{values.total}</Label>
                    </Button>
               </Row>
                <Button style={{ backgroundColor: color.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginVertical: 32, }}>
                    <Title style={{ fontSize: 18, color: '#fff', }}>Digite o código manual</Title>
                </Button>
            </Column>
            <Keyboard handleClick={handleClick} handleDelete={handleDelete} handleClean={handleClean}/>              

            <Row style={{ position: 'absolute', bottom: 0, backgroundColor: "#fff",  padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, width: '100%',    }}>
                  <ButtonLI onPress={handleFinish}  disabled={loading} style={{ backgroundColor: color.primary, paddingHorizontal: 24, flexGrow: 1, width: '100%',}}>
                        <>
                        {loading ? <ActivityIndicator color={color.light} size={24} style={{ marginHorizontal:31, marginVertical: 1 }}/> :  <LabelLI>Gerar Gift Card</LabelLI>  }
                        </>
                  </ButtonLI>
                  <Column style={{width: 24, }} />
                  <ButtonOut onPress={() => {navigation.navigate('BuyServiceError')}} >
                    <LabelLI style={{ color: "#fff" }}>QR Code</LabelLI>
                  </ButtonOut>
                </Row>
        </Main>
    )
}


const Keyboard = ({handleClick, handleDelete, handleClean}) => {
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('1')}} style={{ width: 64, height: 64,  color: "#fff", justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>1</Digit>
                </Button>
                <Button onPress={() => {handleClick('2')}} style={{ width: 64, height: 64,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>2</Digit>
                </Button>
                <Button onPress={() => {handleClick('3')}} style={{ width: 64, height: 64, color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>3</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('4')}} style={{ width: 64, height: 64,  color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>4</Digit>
                </Button>
                <Button onPress={() => {handleClick('5')}} style={{ width: 64, height: 64,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>5</Digit>
                </Button>
                <Button onPress={() => {handleClick('6')}} style={{ width: 64, height: 64,  color: "#fff", justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>6</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('7')}} style={{ width: 64, height: 64,  color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>7</Digit>
                </Button>
                <Button onPress={() => {handleClick('8')}} style={{ width: 64, height: 64,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>8</Digit>
                </Button>
                <Button onPress={() => {handleClick('9')}} style={{ width: 64, height: 64,  color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>9</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button   style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                   <Column style={{ }} />
                </Button>
                <Button onPress={() => {handleClick('0')}} style={{ width: 64, height: 64,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>0</Digit>
                </Button>
                <Pressable onPress={() => {handleDelete()}} onLongPress={() => {handleClean()}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Delete color="#ffffff99" size={32} />
                </Pressable>
            </Row>
            
        </Column>
    )}
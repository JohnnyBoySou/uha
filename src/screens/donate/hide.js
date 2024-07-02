import React, { useContext, useState, } from 'react';
import { FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, LineD, ButtonSE, LabelSE, SubLabel, Button, ButtonLI, LabelLI, ButtonOut, Digit, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ImagePlus, CircleCheck, ArrowLeft, Info, ScrollText, Moon, CircleX, LogOut, Delete, X } from 'lucide-react-native';
import Header from '@components/header';
import { MotiImage, MotiView } from 'moti';

export default function DonateHideScreen({ navigation,  }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState('30');
    const [loading, setloading] = useState(false);

    const handleClick = (digit) => {
        if(digit === '0' && value === '0'){
            return
        }else if(value === '0' && digit !== '0'){
            setvalue(digit);
        }
        else{
            setvalue(value + digit);
        }
    }
    const handleDelete = () => {
        if (value.length === 1) {
            setvalue('0');
        } else {
            setvalue(value ? value.slice(0, -1) : '0');
        }
    };

    const handleClean = () => {
        setvalue('0');
    }

    const handleFinish = () => {
        if(value === '0'){
            return
        }
        setloading(true);
        setTimeout(() => {
            navigation.navigate('DonateValueHide', { value: value,  });
            setloading(false)
        }, 1500);
    }

    const formatValue = (val) => {
        return parseInt(val).toLocaleString('pt-BR');
    };

    return (
        <Main>
            <Scroll style={{ paddingTop: 40, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.secundary, width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color="#fff" />
                    </Button>
                    <Title style={{ color: color.secundary, marginTop: 8, }}>Doação anônima</Title>
                    <Column style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <MotiImage source={require('@icons/private.png')} style={{ width: 38, height: 38, }} />
                    </Column>
                </Row>

                <Column style={{ backgroundColor: "#fff", marginTop: 50, paddingVertical: 24, alignSelf: 'center', paddingHorizontal: 42, borderRadius: 14, marginBottom: -70, zIndex: 99, }}>
                    <Title style={{ fontSize: 24, color: color.secundary, lineHeight: 28, }}>R$</Title>
                    <Title style={{ fontSize: 52, color: color.secundary, lineHeight: 56, }}>{formatValue(value)},00</Title>
                </Column>


                <Column style={{  flexGrow: 1, alignItems: 'center', backgroundColor: color.secundary,  borderTopLeftRadius: 32, borderTopRightRadius: 32,  paddingBottom: 60,  }}>
                
                    <Row style={{ paddingTop: 100, paddingBottom: 80, }}>
                        <MotiView from={{opacity: 0, translateY: 30,}} animate={{opacity: 1, translateY: 0,}} delay={300} transition={{type: 'timing'}}>
                            <Button onPress={() => {setvalue(10)}}  style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 100, backgroundColor: "#ffffff20", borderColor:"#ffffff80", }}><Label style={{ color: "#fff", fontFamily: 'Font_Medium' }}>R$ 10,00</Label></Button>
                        </MotiView>
                        <MotiView from={{opacity: 0, translateY: 30,}} animate={{opacity: 1, translateY: 0,}} delay={600} transition={{type: 'timing'}}>
                            <Button onPress={() => {setvalue(30)}}  style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 100, marginHorizontal: 12, backgroundColor: "#ffffff20", borderColor:"#ffffff80", }}><Label style={{ color: "#fff", fontFamily: 'Font_Medium' }}>R$ 30,00</Label></Button>
                        </MotiView>
                        <MotiView from={{opacity: 0, translateY: 30,}} animate={{opacity: 1, translateY: 0,}} delay={900} transition={{type: 'timing'}}>
                            <Button onPress={() => {setvalue(50)}}  style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 100, backgroundColor: "#ffffff20", borderColor:"#ffffff80", }}><Label style={{ color: "#fff", fontFamily: 'Font_Medium' }}>R$ 50,00</Label></Button>
                        </MotiView>
                    </Row>

                    <Keyboard handleClick={handleClick} handleDelete={handleDelete} handleClean={handleClean}/>              
                    <Row style={{ padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', alignItems: 'center',  paddingTop: 60,   }}>
                    <ButtonPR style={{ paddingHorizontal: 24, flexGrow: 1,}} disabled={loading} onPress={handleFinish} >
                            <>
                            {loading ? <ActivityIndicator color="#fff" size={26} style={{ }}/> :  <LabelLI style={{ color: "#fff", }}>Gerar QR Code</LabelLI>  }
                            </>
                    </ButtonPR>
                    </Row>
                </Column>
            </Scroll>
        </Main>
    )
}


const Keyboard = ({handleClick, handleDelete, handleClean}) => {
    return(
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button   onPress={() => {handleClick('1')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>1</Digit>
                </Button>
                <Button onPress={() => {handleClick('2')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>2</Digit>
                </Button>
                <Button onPress={() => {handleClick('3')}} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>3</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('4')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>4</Digit>
                </Button>
                <Button onPress={() => {handleClick('5')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>5</Digit>
                </Button>
                <Button onPress={() => {handleClick('6')}} style={{ width: 64, height: 64,borderRadius: 12,  color: "#fff", justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>6</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('7')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>7</Digit>
                </Button>
                <Button onPress={() => {handleClick('8')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>8</Digit>
                </Button>
                <Button onPress={() => {handleClick('9')}} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>9</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button   style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                   <Column style={{ }} />
                </Button>
                <Button onPress={() => {handleClick('0')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>0</Digit>
                </Button>
                    <Pressable onPress={handleDelete} onLongPress={() => {handleClean()}} style={{ width: 64, height: 64,  justifyContent: 'center', alignItems: 'center',  }}> 
                        <Delete color="#ffffff99" size={32} />
                    </Pressable>
            </Row>
            
        </Column>
    )}
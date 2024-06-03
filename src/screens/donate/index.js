import React, { useContext, useState, } from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { Main, Column, Label, Title, Row, Button, ButtonLI, LabelLI , ButtonOut, Digit } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Delete } from 'lucide-react-native';
import Header from '@components/header';

export default function DonateScreen({ navigation, }) {
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
        if(value.length === 1){
            setvalue('0');
        }else{
            setvalue(value.slice(0, -1));
        }
    }

    const handleClean = () => {
        setvalue('0');
    }
    const values = {
        total: 300,
    }

    const patinhas = value * 6;

    const handleFinish = () => {
        setloading(true);
        setTimeout(() => {
            navigation.navigate('BuyServiceSuccess');
            setloading(false)
        }, 3500);
    }

    return (
        <Main style={{ paddingTop: 30, }}>
            <Header title="Fazer doação"/>

            <Column style={{ backgroundColor: color.primary, marginTop: 50, paddingVertical: 24, alignSelf: 'center', paddingHorizontal: 42, borderRadius: 24, marginBottom: -70, zIndex: 99, }}>
                <Title style={{ fontSize: 24, color: color.background, lineHeight: 28,}}>R$</Title>
                <Title style={{ fontSize: 52, color: color.background, lineHeight: 56, }}>{value},00</Title>
            </Column>

            <Column style={{  flexGrow: 1, alignItems: 'center', backgroundColor: color.secundary,  borderTopLeftRadius: 52, borderTopRightRadius: 52, paddingTop: 90, }}>
               <Row style={{ justifyContent: 'center', alignItems: 'center',  marginBottom: 100, }}>
                <Label style={{ color: '#fff', }}>Total em patinhas: </Label>
                    <Button  style={{ borderRadius: 100, }} >
                        <Label style={{ fontFamily: font.bold, color: '#fff', backgroundColor: color.primary+20, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 12,}}>{patinhas}</Label>
                    </Button>
               </Row>

                <Keyboard handleClick={handleClick} handleDelete={handleDelete} handleClean={handleClean}/>              

                <Row style={{ padding:32, borderTopLeftRadius: 32, borderTopRightRadius: 32, justifyContent: 'center', alignItems: 'center',     }}>
                <ButtonLI style={{ paddingHorizontal: 24, }} disabled={loading} onPress={() => {navigation.navigate('DonateValue', {value: value})}} >
                        <>
                        {loading ? <ActivityIndicator color={color.blue} size={24} style={{ marginHorizontal:31, marginVertical: 1 }}/> :  <LabelLI>Transferir</LabelLI>  }
                        </>
                  </ButtonLI>
                  <Column style={{width: 24, }} />
                  <ButtonOut onPress={() => {navigation.navigate('BuyServiceError')}} >
                    <LabelLI style={{ color: "#fff" }}>Campanhas</LabelLI>
                  </ButtonOut>
                </Row>
            </Column>
        </Main>
    )
}


const Keyboard = ({handleClick, handleDelete, handleClean}) => {
    return(
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('1')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", justifyContent: 'center', alignItems: 'center',  }}> 
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
                <Button onPress={() => {handleClick('4')}} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>4</Digit>
                </Button>
                <Button onPress={() => {handleClick('5')}} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>5</Digit>
                </Button>
                <Button onPress={() => {handleClick('6')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>6</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Button onPress={() => {handleClick('7')}} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>7</Digit>
                </Button>
                <Button onPress={() => {handleClick('8')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff", marginHorizontal: 40,  justifyContent: 'center', alignItems: 'center',  }}> 
                    <Digit style={{  color: "#fff", }}>8</Digit>
                </Button>
                <Button onPress={() => {handleClick('9')}} style={{ width: 64, height: 64, borderRadius: 12,  color: "#fff",  justifyContent: 'center', alignItems: 'center',  }}> 
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
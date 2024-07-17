import React, { useContext, useState, } from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { Main, Column, Label, Title, Row, Button, Scroll, LabelLI, ButtonOut, Digit, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Delete, ArrowLeft } from 'lucide-react-native';
import { MotiView } from 'moti';
import { StatusBar } from 'expo-status-bar';
import Header from '@components/header';

export default function DonateScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [value, setvalue] = useState('30');
    const [loading, setloading] = useState(false);
    const a = false
    const handleClick = (digit) => {
        if (digit === '0' && value === '0') {
            return
        } else if (value === '0' && digit !== '0') {
            setvalue(digit);
        }
        else {
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
    const formatValue = (val) => {
        return parseInt(val).toLocaleString('pt-BR');
    };
    const patinhas = value * 15;
    return (
        <Main>
            <StatusBar style="dark" backgroundColor={color.background} animated={true} />
            <Scroll>
                <Header title="Doação" />

                <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} delay={300} transition={{ type: 'timing' }} style={{ backgroundColor: "#fff", marginTop: 10, paddingVertical: 20, alignSelf: 'center', paddingHorizontal: 32, borderRadius: 14, marginBottom: -70, zIndex: 99, }}>
                    <Title style={{ fontSize: 24, color: color.secundary, lineHeight: 28, }}>R$</Title>
                    <Title style={{ fontSize: 52, color: color.secundary, lineHeight: 56, }}>{formatValue(value)},00</Title>
                </MotiView>

                <Column style={{ alignItems: 'center', backgroundColor: color.secundary, borderTopLeftRadius: 52, borderTopRightRadius: 52, paddingTop: 90, paddingBottom: 150, }}>

                    {a &&
                        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} delay={300}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                                <Label style={{ color: '#fff', }}>Total em pontos: </Label>
                                <Button style={{ borderRadius: 100, }} >
                                    <Label style={{ fontFamily: font.bold, color: '#fff', backgroundColor: color.primary + 20, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 12, }}>{patinhas}</Label>
                                </Button>
                            </Row>
                        </MotiView>}

                    <Row style={{ paddingTop: 0, paddingBottom: 40, }}>
                        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} delay={300} transition={{ type: 'timing' }}>
                            <Button onPress={() => { setvalue(10) }} style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 100, backgroundColor: "#ffffff20", borderColor: "#ffffff80", }}><Label style={{ color: "#fff", fontFamily: 'Font_Medium', fontSize: 16, }}>R$ 10,00</Label></Button>
                        </MotiView>
                        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} delay={600} transition={{ type: 'timing' }}>
                            <Button onPress={() => { setvalue(30) }} style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 100, marginHorizontal: 12, backgroundColor: "#ffffff20", borderColor: "#ffffff80", }}><Label style={{ color: "#fff", fontFamily: 'Font_Medium', fontSize: 16, }}>R$ 30,00</Label></Button>
                        </MotiView>
                        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} delay={900} transition={{ type: 'timing' }}>
                            <Button onPress={() => { setvalue(50) }} style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 100, backgroundColor: "#ffffff20", borderColor: "#ffffff80", }}><Label style={{ color: "#fff", fontFamily: 'Font_Medium', fontSize: 16, }}>R$ 50,00</Label></Button>
                        </MotiView>
                    </Row>
                    <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} delay={500}>
                        <Keyboard handleClick={handleClick} handleDelete={handleDelete} handleClean={handleClean} />
                    </MotiView>

                    <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} delay={700} style={{ flexGrow: 1, width: '78%', }}>
                        <ButtonPR style={{ paddingHorizontal: 24, marginTop: 30, width: '88%', marginHorizontal: 28, }} onPress={() => { navigation.navigate('DonateValue', { valor: value }) }} >
                            <LabelLI style={{ color: '#fff', }}>Continuar</LabelLI>
                        </ButtonPR>
                    </MotiView>
                </Column>

            </Scroll>
        </Main>
    )
}


const Keyboard = ({ handleClick, handleDelete, handleClean }) => {
    return (
        <Column>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Button onPress={() => { handleClick('1') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>1</Digit>
                </Button>
                <Button onPress={() => { handleClick('2') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>2</Digit>
                </Button>
                <Button onPress={() => { handleClick('3') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>3</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Button onPress={() => { handleClick('4') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>4</Digit>
                </Button>
                <Button onPress={() => { handleClick('5') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>5</Digit>
                </Button>
                <Button onPress={() => { handleClick('6') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>6</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Button onPress={() => { handleClick('7') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>7</Digit>
                </Button>
                <Button onPress={() => { handleClick('8') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>8</Digit>
                </Button>
                <Button onPress={() => { handleClick('9') }} style={{ width: 64, height: 64, borderRadius: 12, color: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>9</Digit>
                </Button>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Button style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{}} />
                </Button>
                <Button onPress={() => { handleClick('0') }} style={{ width: 64, height: 64, color: "#fff", marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', }}>
                    <Digit style={{ color: "#fff", }}>0</Digit>
                </Button>
                <Pressable onPress={handleDelete} onLongPress={() => { handleClean() }} style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', }}>
                    <Delete color="#ffffff99" size={32} />
                </Pressable>
            </Row>

        </Column>
    )
}
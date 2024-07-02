import React, { useContext, useState, } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ScratchCard } from './card';
import ScratchImage from '@imgs/scracth.png';
import { useImage } from '@shopify/react-native-skia';
import Header from '@components/header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MotiImage } from 'moti';



const getRandomNumber = () => {
    return Math.floor(Math.random() * 100);
};


export default function RaspadinhasRasparScreen({ navigation, route}) {
    const { color, font, } = useContext(ThemeContext);
    const [randomNumber, setRandomNumber] = useState(getRandomNumber());
    const [showPrize, setshowPrize] = useState(false);
    const result = randomNumber % 2 ? true : false;
    const bg = route.params?.type === 'Básica' ? require('@imgs/BASICA.png') : route.params?.type === 'Pro' ? require('@imgs/PRO.png') : route.params?.type === 'Premium' ? require('@imgs/PREMIUM.png') : route.params?.type === 'Plus' ? require('@imgs/PLUS.png') : null ;

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            
            <Scroll>
                <Header title="Raspar" rose />
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ width: 54, height: 54, borderRadius: 100, backgroundColor: color.primary + 20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, marginBottom: 20, marginTop: 20, }}>
                        <FontAwesome6 name="hand-sparkles" size={24} color={color.primary} />
                    </Column>


                    {!showPrize ?
                        <ScratchCard
                            key={`scratch-${randomNumber}`}
                            style={{ borderRadius: 12, }}
                            img={bg}>
                            <Column style={{
                                backgroundColor: '#FFE0F6',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zindex: 99,
                            }}>

                                {result ? 
                                <Column>
                                    <Button onPress={() => { setshowPrize(!showPrize);  }} style={{ padding: 20, backgroundColor: color.primary, borderRadius: 12, zindex: 2, }}>
                                        <Title style={{ color: '#fff', }}>
                                            Você ganhou!
                                        </Title>
                                    </Button>
                                </Column>:
                                <Column>
                                <Title>Você perdeu</Title>
                                </Column>
                                }



                            </Column>
                        </ScratchCard> :
                        <Column>
                            <Title>Seu premio</Title>
                        </Column>

                    }



                    <Title style={{ fontWeight: 600, fontSize: 16, marginBottom: 20, marginTop: 20, }}>Passe o dedo para raspar</Title>
                </Column>
            </Scroll>
        </Main>
    )
}
import React, { useContext, useState, } from 'react';
import { Main, Scroll, Column, Label, Title, Row , Button, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ScratchCard } from './card';
import ScratchImage from '@imgs/scracth.png';
import { useImage } from '@shopify/react-native-skia';
import Header from '@components/header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const getRandomNumber = () => {
    return Math.floor(Math.random() * 100);
};


export default function RaspadinhasRasparScreen({ navigation, }) {
    const { color, font, } = useContext(ThemeContext);
    const [randomNumber, setRandomNumber] = useState(getRandomNumber());
    const image = useImage(ScratchImage);

    const [showPrize, setshowPrize] = useState(false);
   
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll>

                <Header title="Raspar" rose />
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ width: 54, height: 54, borderRadius: 100, backgroundColor: color.primary+20, justifyContent: 'center', alignItems: 'center', borderRadius: 100, marginBottom: 20, marginTop: 20,}}> 
                        <FontAwesome6 name="hand-sparkles" size={24} color={color.primary} />
                    </Column>


                    {!showPrize ?
                    <ScratchCard
                        key={`scratch-${randomNumber}`}
                        style={{ borderRadius: 12, }}
                        image={image}>
                        <Column style={{
                            backgroundColor: '#FFE0F6',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zindex: 99,
                        }}>
                            <Button onPress={() => {setshowPrize(!showPrize); console.log('abriu')}} style={{ padding: 20, backgroundColor: 'red', zindex: 2, }}>
                            <Title>
                                Você ganhou!
                            </Title>
                            </Button>
                        </Column>
                    </ScratchCard>:
                <Column>
                    <Title>Seu premio</Title>
                </Column>

}



                    <Title style={{ fontWeight: 600, fontSize: 16, marginBottom: 20, marginTop: 20,}}>Passe o dedo para raspar</Title>
                </Column>
            </Scroll>
        </Main>
    )
}
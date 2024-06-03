import React, { useContext, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, SubLabel, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { Search } from 'lucide-react-native';
import Header from '@components/header';

export default function ShopScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [type, settype] = useState(route.params?.type); 

    return (
        <Main>
            <Scroll >
                <Header />
                   <Column>
                   <Title>Estabelecimentos parceiros </Title>
                    </Column>
            </Scroll>
        </Main>
    )
}

const Rate = ({ rate }) => {
    const { color, font, margin } = useContext(ThemeContext);
    const ar = Array.from({ length: rate }, (_, i) => i + 1);
    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center', }}>
            {ar.map((i) => (
                <AntDesign key={i} name="star" size={24} color={color.primary} />
            ))}
        </Row>
    )
}


const produtos = [
    {
        name: 'Natura',
        desc: 'A partir de 40 UhaCoins',
        product: 'Eudora',
        img: require('@imgs/natura.png'),
    },
    {
        name: 'Americanas',
        desc: 'A partir de 40 UhaCoins',
        product: '23ed',
        img: require('@imgs/americanas.png'),
    },
    {
        name: 'Oboticário',
        product: '23e5',
        desc: 'A partir de 40 UhaCoins',
        img: require('@imgs/oboticario.png'),
    },
    {
        name: 'Casas Bahia',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/casas_bahia.png'),
    },
    {
        name: 'Amazon',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/amazon.png'),
    },
    
    {
        name: 'Petiko',
        desc: 'a partir de 40 UhaCoins',
        img: require('@imgs/petiko.png'),
    },
   
]
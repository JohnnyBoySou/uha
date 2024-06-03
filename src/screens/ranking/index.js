import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
export default function RankingScreen({ navigation, }){
const { color, font, } = useContext(ThemeContext);
return (
<Main>
    <Scroll>
        <Column>
            <Title>Ranking</Title>
            <Row>
                <Label>1</Label>
                <Label>2</Label>
                <Label>3</Label>
            </Row>
        </Column>
    </Scroll>

</Main>
)
}
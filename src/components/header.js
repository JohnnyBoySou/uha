import React from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { Button, Column, Row, Title } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

const Header = ({ title, rose }) => {
    const { color, font, margin } = React.useContext(ThemeContext);   
    const navigation = useNavigation();
    return(
        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: margin.h, }}>
            <Button onPress={() => {navigation.goBack()}} style={{ backgroundColor: rose ? '#EFBBE0' :  "#fff", width: 42, height: 28, borderRadius: 100, justifyContent: 'center', alignItems: 'center',   }}>
                <ArrowLeft color={rose ? '#FFF2E3': color.secundary}/>
            </Button>
            <Column >
                <Title style={{ textAlign: 'center', fontSize: 22, lineHeight: 26,}}>{title}</Title>
            </Column>
            <Column style={{ width: 42, height: 42, }}></Column>
        </Row>
    )}

export default Header;
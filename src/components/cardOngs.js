import React, { useContext } from "react";
import { Button, Column, Row, Title, Label } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import CheckBox from '@components/checkbox';
import { Image } from 'expo-image'

const CardOngs = ({ item, setselectOng, selectOng }) => {
    const navigation = useNavigation()
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <Button  onPress={() => { setselectOng(item.id) }}>
            <Row style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between', backgroundColor: item.id === selectOng ? color.blue + 30 : 'transparent', }}>
                <Row style={{ alignItems: 'center', }}>
                    <Button onPress={() => { navigation.navigate('ONGSingle', { id: item.id, }) }} >
                        <Image contentFit="cover" transition={500} style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item.img }} />
                    </Button>
                    <Column style={{ marginLeft: 16, }}>
                        <Title style={{ fontSize: 16, lineHeight: 16, }}>{item?.name?.length > 14 ? item?.name.slice(0, 14) + '...' : item?.name}</Title>
                        <Label style={{ fontSize: 12, lineHeight: 14,}}>{item?.descri?.length > 20 ? item?.descri.slice(0, 20) + '...' : item?.descri}</Label>
                    </Column>
                </Row>
                <Button onPress={() => { setselectOng(item.id) }} style={{ marginRight: 6, borderRadius: 5, }} >
                    <CheckBox status={item.id === selectOng} />
                </Button>
            </Row>
        </Button>
        )}

export default CardOngs;
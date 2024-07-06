import React, { useContext } from "react";
import { MotiImage } from "moti";
import { Button, Column, Row, Title } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { MotiImage } from 'moti';
import { ArrowUpRight, } from 'lucide-react-native';
import CheckBox from '@components/checkbox';

const CardOngs = ({ item, setselectOng, selectOng }) => {
    const navigation = useNavigation()
    const { color, } = useContext(ThemeContext);
    return (
        <Row style={{ marginVertical: 3, paddingHorizontal: 12, borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between', backgroundColor: item.id === selectOng ? color.blue + 30 : 'transparent', }}>
            <Row style={{ alignItems: 'center', }}>
                <Button onPress={() => { navigation.navigate('ONGSingle', { id: item.id, }) }} >
                    <Column>
                        <MotiImage style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: '#FFE0F6' }} source={{ uri: item.img }} />
                        <ArrowUpRight size={18} color="#fff" style={{ marginTop: -20, alignSelf: 'flex-end', backgroundColor: color.primary, borderTopLeftRadius: 4, borderBottomRightRadius: 6, }} />
                    </Column>
                </Button>
                <Column style={{ marginLeft: 20, }}>
                    <Title style={{ fontSize: 18, }}>{item?.name.length >= 20 ? item?.name.slice(0, 20) + '...' : item?.name}</Title>
                    <Label style={{ fontSize: 14, }}>{item?.desc.length >= 26 ? item?.desc.slice(0, 26) + '...' : item?.desc}</Label>
                </Column>
            </Row>
            <Button onPress={() => { setselectOng(item.id) }} style={{ marginRight: 6, borderRadius: 5, }} >
                <CheckBox status={item.id === selectOng} />
            </Button>
        </Row>
    )

}
export default CardOngs;
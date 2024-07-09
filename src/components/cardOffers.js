import React, { useContext } from "react";
import { Image } from "react-native";
import { Button, Column, Row, Title } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";

const CardOffers = ({item}) => {
    const navigation = useNavigation()
    const { color,  } = useContext(ThemeContext);
    return(
    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
    <Column style={{ justifyContent: 'center', width: 124, }}>
        <Image source={{ uri: item.img }} style={{ width: 124, height: 124, borderTopLeftRadius: 12, borderTopRightRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
        {item?.sell_porcentage && <Row style={{ backgroundColor: '#d7d7d7', }}>
            <Column style={{ backgroundColor: color.primary, height: 4, width: item?.sell_porcentage + '%', }} />
        </Row>}
        <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112, }}>{item?.name?.slice(0, 42)}</Title>
        <Row style={{}}>
            <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20, }}>{item?.value?.slice(0, -3)}</Title>
            <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12, }}>pontos</Title>
        </Row>
        <Row>
            <Title style={{ color: "#000", fontSize: 12, marginTop: -6, marginRight: 4, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{item?.old_value?.slice(0, -3)}</Title>
            <Title style={{ color: "#000", fontSize: 8, lineHeight: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>pontos</Title>
        </Row>
    </Column>
</Button>
)}
export default CardOffers;
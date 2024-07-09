import React, { useContext } from "react";
import { MotiImage } from "moti";
import { Button, Column,  Title } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";

const CardServices = ({item}) => {
    const navigation = useNavigation()
    const { color,  } = useContext(ThemeContext);
    return(
    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: item.id }) }}>
    <Column style={{ justifyContent: 'center', width: 124, }}>
        <MotiImage source={{ uri: item.img }} style={{ width: 124, height: 124, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
        <Title style={{ marginTop: 12, fontSize: 14, lineHeight: 14, marginBottom: 4, width: 112,  textAlign: 'center', fontFamily: 'Font_Medium', color: color.secundary+99,}}>{item?.label}</Title>
    </Column>
</Button>
)}
export default CardServices;
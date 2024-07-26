import React, { useContext } from "react";
import { Button, Column,  Title } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { Image } from 'expo-image';

const CardServices = ({item}) => {
    const navigation = useNavigation()
    const { color,  } = useContext(ThemeContext);
    const { img, label, id } = item;
    return(
    <Button style={{ marginRight: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: id }) }}>
    <Column style={{ justifyContent: 'center', width: 124, }}>
        <Image source={{ uri: img }} style={{ width: 124, height: 124, borderRadius: 12, backgroundColor: "#fff", }} contentFit="cover"/>
        <Title style={{ marginTop: 12, fontSize: 14, lineHeight: 14, marginBottom: 4, width: 112,  textAlign: 'center', fontFamily: 'Font_Medium', color: color.secundary+99,}}>{label}</Title>
    </Column>
</Button>
)}
export default CardServices;
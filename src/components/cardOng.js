import React, { useContext } from "react";
import { Button, Column, Row, Title, Label,  } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { Image } from 'expo-image'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CardONG = ({item}) => {
    const navigation = useNavigation();
    const { color, font, margin } = useContext(ThemeContext);
    return(
        <Column style={{ width: width, paddingHorizontal: 28, }}>
            <Button style={{ marginBottom: 12, borderRadius: 12, backgroundColor: '#f7f7f7', }} onPress={() => { navigation.navigate('ShopSingle', { id: item.id }) }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Column style={{ justifyContent: 'center', paddingLeft: 20, height: 124, width: width * 0.5, }}>
                        <Title style={{ marginTop: 6, fontSize: 16, lineHeight: 18, }}>{item?.name?.length > 18 ? item.name.slice(0, 18) + '...' : item?.name.slice(0, 18)}</Title>
                        <Label style={{ fontSize: 12, lineHeight: 14, marginTop: 2, color: color.secundary + 99, }}>{item?.descri?.length > 40 ? item?.descri?.slice(0, 40) + '...' : item?.descri}</Label>
                        <Row style={{ marginTop: 8, }}>
                            {item?.categories?.slice(0, 2).map((cat) => (
                                <Label key={cat.id} style={{ fontSize: 12, marginRight: 4, fontFamily: 'Font_Bold', color: color.primary, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: color.primary + 20, borderRadius: 100, alignSelf: 'flex-start', }}>{cat?.name}</Label>
                            ))}
                        </Row>
                    </Column>
                    <Image transition={400} contentFit="cover" source={{ uri: item?.img }} style={{ width: 108, height: 108, marginRight: 8, marginLeft: 20, borderRadius: 12, backgroundColor: "#fff", }} />
                </Row>
            </Button>
        </Column>
    )
}
export default CardONG
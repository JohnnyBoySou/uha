import { Button, Column, Title, Label } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';

const CardShops = ({ item }) => {
    const navigation = useNavigation()
    const { id, img, name, descri } = item;
    return (
        <Button style={{ marginRight: 12, borderRadius: 12, }} onPress={() => { navigation.navigate('ShopServiceSingle', { id: id }) }}>
            <Column style={{ justifyContent: 'center', width: 224, }}>
                <Image source={{ uri: img }} style={{ width: 224, height: 124, borderRadius: 18, backgroundColor: "#fff", }} contentFit="cover"  />
                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 20, marginBottom: 4, width: 224, textAlign: 'center', }}>{name?.slice(0, 42)}</Title>
                <Label style={{ fontSize: 12, lineHeight: 13, textAlign: 'center', color: '#5C0D4599', }}>{descri?.length > 52 ? descri?.slice(0, 52) + '...' : descri}</Label>
            </Column>
        </Button>
    )
}
export default CardShops;

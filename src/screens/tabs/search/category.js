import React, { useContext, useEffect, useState,  } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { FlatList, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { getSingleCategory } from '@api/request/category';
import { useNavigation } from '@react-navigation/native';
import { Bike, Bone, Brush, Car, Hospital, Pizza, Shirt, } from 'lucide-react-native';
import { Image } from 'expo-image'
const { width } = Dimensions.get('window');

export default function CategorySingleScreen({ navigation, route }) {
    const { color } = useContext(ThemeContext);
    const { item, id } = route.params

    const icon = item.icon ? item.icon : cats.find(cat => cat.name === item.name).icon;

    const [shops, setshops] = useState();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
              const res = await getSingleCategory(id);
              setshops(res);
            } catch (error) {
              console.error(error);
            } finally {
              setloading(false);
            }
          };
          fetchData();
    }, [])

    return (
        <Main style={{ backgroundColor: "#fff",  }}>
                <Scroll>
                <Header title={item?.name} rose />
                <Column style={{  marginVertical: 20, flex: 1, }}>

                <MotiView from={{scale: 0, opacity: 0,}} animate={{scale: 1, opacity: 1,}} style={{ width: 64, marginBottom: 30, height: 64, borderRadius: 100, backgroundColor: color.primary, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    {icon}
                </MotiView>

                  {!loading && <>
                        <FlatList
                            data={shops} 
                            initialNumToRender={3}
                            maxToRenderPerBatch={3}
                            windowSize={3}
                            removeClippedSubviews={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <CardList item={item}/>}
                            keyExtractor={item => item.id}
                            />
                    </>}
                </Column>
            </Scroll>
        </Main>
    )
}

const CardList = ({item}) => {
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
                    <Image  contentFit='cover' source={{ uri: item?.img }} style={{ width: 108, height: 108, marginRight: 8, marginLeft: 20, borderRadius: 12, backgroundColor: "#fff", }} />
                </Row>
            </Button>
        </Column>
    )
}


const cats = [{"created_at": "2024-07-04 12:58:05", "estabelecimentos": 0, "icon": <Shirt color="#FFF2E3" size={28} />, "id": 11, "name": "Vestuário", "updated_at": "2024-07-04 12:58:05"}, {"created_at": "2024-07-04 12:58:05", "estabelecimentos": 1, "icon": <Bike color="#FFF2E3" size={28} />, "id": 12, "name": "Esportivo", "updated_at": "2024-07-04 12:58:05"}, {"created_at": "2024-07-04 12:58:05", "estabelecimentos": 0, "icon": <Hospital color="#FFF2E3" size={28} />, "id": 13, "name": "Farmácia", "updated_at": "2024-07-04 12:58:05"}, {"created_at": "2024-07-04 12:58:05", "estabelecimentos": 2, "icon": <Bone color="#FFF2E3" size={28} />, "id": 14, "name": "Serviços Pet", "updated_at": "2024-07-04 12:58:05"}, {"created_at": "2024-07-04 12:58:05", "estabelecimentos": 1, "icon": <Brush color="#FFF2E3" size={28} />, "id": 15, "name": "Cuidados estéticos", "updated_at": "2024-07-04 12:58:05"}, {"created_at": "2024-07-04 12:58:05", "estabelecimentos": 1, "icon": <Pizza color="#FFF2E3" size={28} />, "id": 16, "name": "Comida", "updated_at": "2024-07-04 12:58:05"}, {"created_at": "2024-07-04 12:58:05", "estabelecimentos": 1, "icon": <Car color="#FFF2E3" size={28} />, "id": 17, "name": "Veículos", "updated_at": "2024-07-04 12:58:05"}]
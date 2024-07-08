import React, { useContext, useEffect, useState, useMemo,  } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { FlatList, Dimensions } from 'react-native';
import { MotiImage, MotiView } from 'moti';
import { getSingleCategory } from '@api/request/category';
import { useNavigation } from '@react-navigation/native';

import { Bike, Bone, Brush, Car, Hospital, Indent, Minus, Pizza, Plus, Search, Shirt, ShoppingBag, Ticket } from 'lucide-react-native';
const { width } = Dimensions.get('window');

export default function CategorySingleScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const { item, id } = route.params
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
                    {item?.icon}
                </MotiView>

                  {!loading && <>
                        <FlatList
                            data={shops}
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
                    <MotiImage source={{ uri: item?.img }} style={{ width: 108, height: 108, marginRight: 8, marginLeft: 20, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff", }} />
                </Row>
            </Button>
        </Column>
    )
}
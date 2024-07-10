import React, { useContext, useMemo, useCallback } from "react";
import { Button, Column, Title, Row, Label } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { Skeleton } from "moti/skeleton";
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'expo-image'

export const OffersCards = ({ data, loading }) => {
    const { color, margin, font } = useContext(ThemeContext);
    const navigation = useNavigation();
    const renderItem = useCallback(({ item }) => <CardOffers item={item} />, []);
    const keyExtractor = useCallback(item => item.id, []);
    const ITEM_WIDTH = 124

    if (loading) return (<LoadOffers />)
    return (
        <Column style={{ backgroundColor: 'transparent', paddingBottom: 2, marginBottom: 12, }}>
            <Row style={{ paddingHorizontal: margin.h, paddingVertical: 16, justifyContent: 'space-between', alignItems: 'center', }}>
                <Title style={{ fontSize: 22, }}>Ofertas relâmpago</Title>
                <Button onPress={() => { navigation.navigate('ShopOffers') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12, }}>
                    <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14, }}>Ver mais</Label>
                </Button>
            </Row>
            <FlatList
                data={data}
                ListHeaderComponent={<Column style={{ width: 28 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ backgroundColor: 'transparent' }}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={3}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => (
                    { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
                )}
            />
        </Column>
    )
}
const CardOffers = React.memo(({ item }) => {
    const navigation = useNavigation();
    const { color } = useContext(ThemeContext);

    const { id, img, name, value, old_value, sell_porcentage } = item;

    const navigateToOfferDetails = useCallback(() => {
        navigation.navigate('ShopServiceSingle', { id: id });
    }, [navigation, id]);

    return (
        <Button style={{ marginRight: 12, borderRadius: 12 }} onPress={navigateToOfferDetails}>
            <Column style={{ justifyContent: 'center', width: 124 }}>
                <Image
                    transition={1000}
                    contentFit="cover"
                    source={{ uri:img }}
                    cachePolicy="disk"
                    style={{ width: 124, height: 124, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: "#fff" }}
                />
                {sell_porcentage && (
                    <Row style={{ backgroundColor: '#d7d7d7' }}>
                        <Column style={{ backgroundColor: color.primary, height: 4, width: sell_porcentage + '%' }} />
                    </Row>
                )}
                <Title style={{ marginTop: 6, fontSize: 14, lineHeight: 16, marginBottom: 4, width: 112 }}>{name?.slice(0, 42)}</Title>
                <Row>
                    <Title style={{ color: color.primary, fontSize: 16, marginRight: 4, lineHeight: 20 }}>{value?.slice(0, -3)}</Title>
                    <Title style={{ color: color.primary, fontSize: 10, lineHeight: 12 }}>pontos</Title>
                </Row>
                <Row>
                    <Title style={{ color: "#000", fontSize: 12, marginTop: -6, marginRight: 4, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>{old_value?.slice(0, -3)}</Title>
                    <Title style={{ color: "#000", fontSize: 8, lineHeight: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: '#000' }}>pontos</Title>
                </Row>
            </Column>
        </Button>
    );
});

const LoadOffers = () => {
    return (
        <Row style={{ backgroundColor: 'transparent', paddingHorizontal: 28, marginTop: 38, }}>
            <Column style={{ marginRight: 12, }}>
                <Skeleton colorMode="light" radius={12} height={120} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={24} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={18} width={80} />
            </Column>
            <Column style={{ marginRight: 12, }}>
                <Skeleton colorMode="light" radius={12} height={120} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={24} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={18} width={80} />
            </Column>
            <Column style={{ marginRight: 12, }}>
                <Skeleton colorMode="light" radius={12} height={120} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={24} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={18} width={80} />
            </Column>
        </Row>
    )
}
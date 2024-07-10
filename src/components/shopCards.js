import React, { useContext, useMemo, useCallback } from "react";
import { Button, Column, Title, Row, Label } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native"; 
import { Skeleton } from "moti/skeleton";

import { Image } from 'expo-image'
import { FlatList } from 'react-native-gesture-handler'

export const ShopsCards = ({ data, loading }) => {
    const navigation = useNavigation()
    const { color, margin, font } = useContext(ThemeContext);
    const memoizedData = useMemo(() => data, [data]);
    const renderItem = useCallback(({ item }) => <CardShops item={item} />, []);
    const ITEM_WIDTH = 224;
    if (loading) {
        return <LoadShops />;
    }
    return (
        <Column style={{ backgroundColor: color.background }}>
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 15, backgroundColor: color.background }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title style={{ fontSize: 22 }}>Estabelecimentos</Title>
                    <Button onPress={() => { navigation.navigate('Shop') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12 }}>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14 }}>Ver mais</Label>
                    </Button>
                </Row>
            </Column>
            <FlatList
                style={{ backgroundColor: color.background }}
                data={memoizedData}
                ListFooterComponent={<Column style={{ width: 28 }} />}
                ListHeaderComponent={<Column style={{ width: 28 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                windowSize={2}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => (
                    { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
                )}
            />
        </Column>
    );
};

const CardShops = React.memo(({ item }) => {
    const navigation = useNavigation();
    const { id, img, name, descri } = item;

    const navigateToShopDetails = useCallback(() => {
        navigation.navigate('ShopSingle', { id });
    }, [navigation, id]);

    return (
        <Button style={{ marginRight: 12, borderRadius: 12 }} onPress={navigateToShopDetails}>
            <Column style={{ justifyContent: 'center', width: 224 }}>
                <Image
                    transition={1000}
                    source={{ uri: img }}
                    cachePolicy="disk"
                    style={{ width: 224, height: 124, borderRadius: 18, backgroundColor: "#fff" }}
                />
                <Title style={{ marginTop: 6, fontSize: 18, lineHeight: 20, marginBottom: 4, width: 224, textAlign: 'center' }}>{name?.slice(0, 42)}</Title>
                <Label style={{ fontSize: 12, lineHeight: 13, textAlign: 'center', color: '#5C0D4599' }}>{descri?.length > 52 ? descri?.slice(0, 52) + '...' : descri}</Label>
            </Column>
        </Button>
    );
});

const LoadShops = () => {
    return (
        <Row style={{ backgroundColor: 'transparent', paddingHorizontal: 28, marginTop: 32, }}>
        <Column style={{ marginRight: 12, justifyContent: 'center', alignItems: 'center', }}>
            <Skeleton colorMode="light" radius={12} height={120} width={240} />
            <Column style={{ height: 6, }} />
            <Skeleton colorMode="light" radius={6} height={24} width={120} />
        </Column>
        <Column style={{ marginRight: 12, justifyContent: 'center', alignItems: 'center', }}>
            <Skeleton colorMode="light" radius={12} height={120} width={240} />
            <Column style={{ height: 6, }} />
            <Skeleton colorMode="light" radius={6} height={24} width={120} />
        </Column>
        </Row>
    )
}
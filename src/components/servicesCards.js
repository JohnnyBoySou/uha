import React, { useContext, useMemo, useCallback } from "react";
import { Button, Column, Title, Row, Label } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { FlatList,  } from "react-native";
import { Skeleton } from "moti/skeleton";
import { Image } from 'expo-image'


export const ServicesCards = ({ data, loading }) => {
    const navigation = useNavigation();
    const { color, margin, font } = useContext(ThemeContext);

    // Memoize data and renderItem if they are not changing
    const memoizedData = useMemo(() => data, [data]);
    const renderItem = useCallback(({ item }) => <CardServices item={item} />, []);
    const ITEM_WIDTH = 124

    if (loading) {
        return <LoadServices />;
    }

    return (
        <Column style={{ backgroundColor: color.background, paddingTop: 10 }}>
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 15, backgroundColor: color.background }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title style={{ fontSize: 22 }}>Troque seus pontos</Title>
                    <Button onPress={() => { navigation.navigate('Shop') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 8, paddingHorizontal: 16 }}>
                        <Label style={{ color: color.primary, fontFamily: font.bold, fontSize: 14 }}>Ver mais</Label>
                    </Button>
                </Row>
            </Column>
            <FlatList
                data={memoizedData}
                ListFooterComponent={<Column style={{ width: 28 }} />}
                ListHeaderComponent={<Column style={{ width: 28 }} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={3}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
            />
        </Column>
    );
}
const CardServices = React.memo(({ item }) => {
    const navigation = useNavigation();
    const { color } = useContext(ThemeContext);
    const { img, label, id } = item;

    const navigateToServiceDetails = useCallback(() => {
        navigation.navigate('ShopServiceSingle', { id });
    }, [navigation, id]);

    return (
        <Button style={{ marginRight: 12 }} onPress={navigateToServiceDetails}>
            <Column style={{ justifyContent: 'center', width: 124 }}>
                <Image
                    transition={1000}
                    source={{ uri: img }}
                    cachePolicy="disk"
                    style={{ width: 124, height: 124, borderRadius: 12, objectFit: 'cover', backgroundColor: "#fff" }}
                />
                <Title style={{ marginTop: 12, fontSize: 14, lineHeight: 14, marginBottom: 4, width: 112, textAlign: 'center', fontFamily: 'Font_Medium', color: color.secundary + 99 }}>{label}</Title>
            </Column>
        </Button>
    );
});
const LoadServices = () => {
    return (
        <Row style={{ backgroundColor: 'transparent', paddingHorizontal: 28, paddingVertical: 18, }}>
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
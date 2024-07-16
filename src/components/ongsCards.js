import React, { useContext, useMemo, useCallback } from "react";
import { Button, Column, Title, Row, Label } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native"; 
import { Skeleton } from "moti/skeleton";
import { Image } from 'expo-image'

import { FlatList } from 'react-native-gesture-handler'

export const ONGSCards = ({ data, loading }) => {
    const navigation = useNavigation();
    const { color, margin, font } = useContext(ThemeContext);

    const memoizedData = useMemo(() => data, [data]);
    const renderItem = useCallback(({ item }) => <CardONGS item={item} />, []);
    const ITEM_WIDTH = 124

    if (loading) {
        return <LoadServices />;
    }

    return (
        <Column style={{ backgroundColor: 'transparent', paddingTop: 10 }}>
            <Column style={{ paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 15,}}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title style={{ fontSize: 22 }}>ONGs parceiras</Title>
                    <Button onPress={() => { navigation.navigate('ONGS') }} style={{ backgroundColor: color.primary + 20, borderRadius: 100, paddingVertical: 6, paddingHorizontal: 12 }}>
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
const CardONGS = React.memo(({ item }) => {
    const navigation = useNavigation();
    const { color } = useContext(ThemeContext);
    const { img, name, id, descri } = item;

    const navigateToServiceDetails = useCallback(() => {
        navigation.navigate('ONGSingle', { id: id });
    }, [navigation, id]);

    return (
        <Button style={{ marginRight: 12, borderRadius: 12, backgroundColor: '#fff', }} onPress={navigateToServiceDetails}>
            <Row style={{ width: 244, alignItems: 'center' }}>
                <Image
                    transition={500}
                    source={{ uri: img }}
                    contentFit="cover"
                    style={{ width: 84, height: 84, borderRadius: 12, backgroundColor: "#fff", margin: 6, }}
                />
                <Column style={{ width: 90, marginLeft: 10, }}>
                    <Title style={{ fontSize: 14, lineHeight: 14, marginBottom: 4,  color: color.secundary,}}>{name}</Title>
                    <Label style={{ color: color.secundary+99, fontSize: 12, lineHeight: 12, }}>{descri}</Label>
                </Column>
            </Row>
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
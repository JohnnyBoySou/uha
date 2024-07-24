import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { HeartHandshake, Search, ShoppingBag } from 'lucide-react-native';
import { MotiImage, MotiView } from 'moti';
import Header from '@components/header';
import { Image } from 'expo-image';
import { Skeleton } from 'moti/skeleton';

export default function ComunidadeScreen({ navigation, }) {
    const { color, margin, font} = useContext(ThemeContext);
    return(
        <Main>
            <Scroll>
                <Header title="Comunidade" />
                <Column></Column>

            </Scroll>
        </Main>
    )
}
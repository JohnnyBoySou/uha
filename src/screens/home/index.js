import React, { useState, useContext, useEffect} from 'react';
import { ScrollView } from 'react-native';
import { Main } from '@theme/global';
import { ThemeContext } from 'styled-components/native';

export default function HomeScreen({navigation, }){
    const { color, font, } = useContext(ThemeContext);

    return (
        <Main>

        </Main>
    )
    }
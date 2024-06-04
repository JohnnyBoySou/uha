import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button } from '@theme/global';
import { BadgeInfo} from 'lucide-react-native'

export default function ButtonFeedback({ navigation, }) {
    return (
        <Button style={{ position: 'absolute', top: 50, left: 30, backgroundColor: '#00A3FF', borderRadius: 100, }}>
            <BadgeInfo />
        </Button>
    )
}
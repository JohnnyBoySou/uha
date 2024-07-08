import React, { useEffect } from 'react';
import { Main, Row } from '@theme/global';
import { MotiImage } from 'moti';
import { getPreferences } from '../../api/user/preferences';
import { StatusBar } from 'expo-status-bar';

export default function AsyncStaticScreen({ navigation, }) {
    useEffect(() => {
        const fetchData = async () => {
            const user = await getPreferences()
            if (user?.email) {
                setTimeout(() => {
                    navigation.replace('Tabs')
                }, 1200);
            }
            else{
               navigation.replace('Onboarding')
            }
        }
        fetchData()
    }, []);

    return (
        <Main style={{ backgroundColor: "#FE25BD", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <StatusBar style="light" backgroundColor="#FE25BD" animated={true}/>
            <Row>
                <MotiImage source={require('@imgs/u.png')} style={{ width: 100, objectFit: 'contain' }} 
                    transition={{duration: 600, type: 'timing',  delay: 200,}}
                    from={{opacity: 0, transform: [{translateY: -300}, {scale: 0.5}, { rotate: '180deg' }]}} 
                    animate={{opacity: 1,  transform: [{translateY: 10}, {scale: 1}, {rotate: '0deg'}]}}
                    />
                <MotiImage source={require('@imgs/h.png')} style={{ width: 110,  marginHorizontal: -10, objectFit: 'contain' }} 
                    transition={{duration:600, type: 'timing',  delay: 500,}}
                    from={{opacity: 0, transform: [{translateY: -300}, {scale: 0.5}, { rotate: '180deg' }]}} 
                    animate={{opacity: 1,  transform: [{translateY: 10}, {scale: 1}, {rotate: '0deg'}]}}
                    />
                <MotiImage source={require('@imgs/a.png')} style={{ width: 110, marginTop: 12, marginHorizontal: -20, objectFit: 'contain' }} 
                    transition={{duration: 600, type: 'timing',  delay: 700,}}
                    from={{opacity: 0, transform: [{translateY: -300}, {scale: 0.5}, { rotate: '180deg' }]}} 
                    animate={{opacity: 1,  transform: [{translateY: 10}, {scale: 1}, {rotate: '0deg'}]}}
                    />
                <MotiImage source={require('@imgs/!.png')} style={{ width: 80, marginTop: 5, objectFit: 'contain' }} 
                    transition={{duration: 600, type: 'timing', delay: 1000,}}
                    from={{opacity: 0, transform: [, {scale: 0.1}, { rotate: '100deg' }]}} 
                    animate={{opacity: 1,  transform: [ {scale: 1}, {rotate: '12deg'}]}}
                    />
                </Row>
        </Main>
    )
}
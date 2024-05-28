import React, { useEffect } from 'react';
import { Main, Row } from '@theme/global';
import { MotiImage } from 'moti';
export default function AsyncStaticScreen({ navigation, }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Dev')
        }, 2200)
    }, [])
    return (
        <Main style={{ backgroundColor: "#FE25BD", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
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
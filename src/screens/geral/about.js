import React, { useContext } from 'react';
import { Main, Scroll, Column, Label, Title, Row, ButtonPR, LabelPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Infinity } from 'lucide-react-native';  
import Header from '@components/header';
import { Image } from 'expo-image'; 

export default function AboutScreen({ navigation, }) {
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Main>
            <Scroll>
                <Header rose />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Title style={{ fontSize: 24, lineHeight: 24, }}>A UHA! que você {'\n'}ainda não conhece</Title>
                    <Label style={{ fontSize: 16, lineHeight: 18, marginVertical: 10, }}>Nós facilitamos suas doações para ONGs que transformam vidas todos os dias! Com apenas alguns toques, você pode contribuir para causas importantes e fazer a diferença no mundo. </Label>

                    <ButtonPR style={{ backgroundColor: color.primary + 20, paddingVertical: 10, paddingHorizontal: 16, alignSelf: 'flex-start', marginTop: 10, }} onPress={() => { navigation.navigate('ONGS') }} >
                        <LabelPR style={{ color: color.primary, fontSize: 16, lineHeight: 18, }}>Conheça as ONGs</LabelPR>
                    </ButtonPR>

                    <Row style={{ marginVertical: 20, }}>
                        <Column style={{ width: 150, height: 180, borderRadius: 16, backgroundColor: color.primary,justifyContent: 'flex-end'  }}>
                            <Image contentFit='contain' source={require('@imgs/logo_white_nobg.png')} style={{ width: 100, height: 50, alignSelf: 'center', marginBottom: 12, }}/>
                        </Column>
                        <Column style={{ width: 150, height: 180, marginLeft: 18, borderRadius: 16, backgroundColor: color.secundary, justifyContent: 'center', alignItems: 'center',  }}>   
                            <Title style={{ color: "#fff", fontSize: 18, }}>Boa ação{'\n'}     é <Title style={{ color: color.primary, fontSize: 18, }}>doação</Title>!</Title>
                        </Column>
                    </Row>


                    <Title style={{ textAlign: 'center', fontSize: 22, marginVertical: 10, }}>São mais de</Title>
                    <Row style={{ justifyContent: 'center', }}>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 8, justifyContent: 'center', marginRight: 10, }}>
                            <Title style={{ color: '#fff', fontSize: 18, lineHeight: 18, }}>30</Title>
                            <Label style={{ color: '#fff', fontSize: 12, lineHeight: 14, }}>Lojas {'\n'}parceiras</Label>
                        </Column>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 8, justifyContent: 'center', marginRight: 10, }}>
                            <Title style={{ color: '#fff', fontSize: 18, lineHeight: 18, }}>170</Title>
                            <Label style={{ color: '#fff', fontSize: 12, lineHeight: 14, }}>Serviços {'\n'}disponíveis</Label>
                        </Column>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 8, justifyContent: 'center', marginRight: 10, }}>
                            <Title style={{ color: '#fff', fontSize: 18, lineHeight: 18, }}>12 mil</Title>
                            <Label style={{ color: '#fff', fontSize: 12, lineHeight: 14, }}>Bichinos sendo {'\n'}ajudados por dia</Label>
                        </Column>
                        <Column style={{ backgroundColor: color.primary, borderRadius: 16, padding: 8, justifyContent: 'center', alignItems: 'center', }}>
                            <Infinity size={42} color="#fff" style={{ textAlign: 'center' }} />
                            <Label style={{ color: '#fff', fontSize: 12, }}>Gratidão</Label>
                        </Column>
                    </Row>

                    <Column style={{ marginVertical: 20, }}>
                        <Title style={{ fontSize: 18 }}>Faça parte da UHA!</Title>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Label style={{ width: '70%', fontSize: 16, lineHeight: 18, }}>Junte-se a nós e ajude a construir um futuro melhor, apoiando quem mais precisa</Label>
                            <Image contentFit='contain'  style={{ width: 80, height: 80,  alignSelf: 'center', marginLeft: 10, backgroundColor: '#fff', borderRadius: 12,  }}/>
                        </Row>
                    </Column>
                </Column>

            </Scroll>
        </Main>
    )
}
import React, { useContext } from 'react';
import { Main, Scroll, Column, Label, Title, ButtonOut, LabelLI, ButtonPR } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage } from 'moti';
import Header from './../../components/header';
export default function CampaignsGiftCardScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);

    return (
        <Main>
            <Scroll>
               <Header title='Gift Card'/>
                <Column style={{ paddingHorizontal: 28, }}>
                    <MotiImage source={require('@imgs/gift_card.png')} style={{ borderRadius: 24, width: '100%', height: 280, marginVertical: 24, }} from={{opacity: 0, translateY: -20,}} animate={{opacity: 1, translateY: 0,}}/>
                    <Column style={{ backgroundColor: color.primary, borderRadius: 100, paddingVertical: 24, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center',  marginTop: -60, zIndex: 99, }}>
                        <Title style={{ color: "#fff", }}>Presenteie alguém especial!</Title>
                        <Label style={{ color: "#fff", fontSize: 16, marginTop: 6, }}>Troque pontos por um ato de compaixão</Label>
                    </Column>
                    
                    <Title style={{ fontSize: 32, lineHeight: 32, marginTop: 24, }}>Presentear nunca foi tão importante!</Title>
                    <Label style={{  marginTop: 10, }}>Faça uma doação e receba pontos, você pode trocá-los por serviços ou produtos para presentear alguém especial</Label>
                   
                    <Title style={{ marginTop: 24, marginBottom: 8, }}>Por que um Gift Card?</Title>
                    <Label>Presentes são um ato de amor, doações também, compartilhem de uma mesma paixão! A cada x Gift Card utilizados você recebe x pontos. Um presente de nós, para você. </Label>
                    <ButtonPR onPress={() => {navigation.navigate('BuyServiceGiftCard')}}  style={{ borderColor: '#000', paddingVertical: 12, marginTop: 24,  }}>
                        <LabelLI style={{ color: '#fff', }}>Presentear com Gift Card</LabelLI>
                    </ButtonPR>

                    <Title style={{ marginTop: 32, marginBottom: 8, }}>Quem pode usar o Gift Card?</Title>
                    <Label>Qualquer pessoa com acesso ao QR Code ou Chave manual do Gift Card pode utilizá-lo, mas somente uma única vez.</Label>
                 
                    <Title style={{ marginTop: 32, marginBottom: 8, }}>Como usar meu Gift Card?</Title>
                    <Label>Você pode conferir os estabelecimentos parceiros e escolher o serviço ou produto que se encaixe no valor do Gift Card. Para usá-lo basta comparecer no estabelecimento, apresentar seu Gift Card e desfrutar de seu presente!</Label>
                   
                    <Title style={{ marginTop: 32, marginBottom: 8, }}>Qual o prazo do meu Gift Card?</Title>
                    <Label>Você pode utilizar seu Gift Card até 6 meses após a data de compra registrada.</Label>

                    <ButtonOut onPress={() => {navigation.navigate('Shop')}}  style={{ borderColor: '#000', paddingVertical: 12, marginTop: 24, marginBottom: 40, }}>
                        <LabelLI style={{  }}>Conhecer estabelecimentos parceiros</LabelLI>
                    </ButtonOut>
                </Column>
            </Scroll>
        </Main>
    )
}

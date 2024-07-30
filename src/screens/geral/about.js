import React, { useContext } from 'react';
import { Main, Scroll, Column, Label, Title, Row, ButtonPR, B } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { HeartHandshake, Infinity, Telescope } from 'lucide-react-native';  
import Header from '@components/header';
import { Image } from 'expo-image'; 
import { MotiImage } from 'moti';

export default function AboutScreen({ navigation, }) {
    const { color, margin, font } = useContext(ThemeContext);
    return (
        <Main style={{ backgroundColor: color.background, }}>
            <Scroll>
                <Header rose />
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Title style={{ fontSize: 24, lineHeight: 24, }}>UHA!</Title>
                    <Title style={{ fontSize: 20, lineHeight: 20, fontStyle: 'italic'}}>UNITED HELPING ALL!</Title>
                    <Label style={{ fontSize: 16, lineHeight: 18, marginVertical: 10, }}></Label>

                    <Title style={{ fontSize: 20, lineHeight: 20,}}>Nossa Missão</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Nascemos da urgência e da necessidade de ajudar aqueles cuja voz isolada não é ouvida. Somos um grito de guerra que enfrenta o descaso e ressoa nos corações generosos e empáticos</Label>
                   
                   
                    <Column style={{ backgroundColor: color.primary, marginVertical: 20, borderRadius: 16, flexGrow: 1, height: 140, justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ width: 300, height: 300, backgroundColor: '#FFFFFF30', borderRadius: 300, justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 200, height: 200, backgroundColor: '#FFFFFF30', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ width: 120, height: 120, backgroundColor: '#FFFFFF50', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Telescope size={42} color="#fff" />
                            </Column>
                        </Column>
                        </Column>
                    </Column>

                    <Title style={{ fontSize: 20, lineHeight: 20,}}>Nossa Visão</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Viemos para transformar a imagem de pequenez e acanhamento. Temos necessidades, temos propósito e temos nossa voz. Cremos que juntos podemos mais. Nosso grito de urgência ecoa em quem pensa no coletivo.</Label>
                   
                    <Title style={{ fontSize: 20, lineHeight: 20, marginTop: 20,}}>Junte-se a Nós</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Participe da nossa corrente do bem e gratidão. Unidos, podemos fazer um mundo melhor. Não importa a sua causa, estamos aqui para evidenciá-la e ecoá-la por toda a nação.</Label>
                    
                    <Column style={{ backgroundColor: color.secundary, marginVertical: 20, borderRadius: 16, flexGrow: 1, height: 140, justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ width: 350, height: 350, backgroundColor: '#FFFFFF10', borderRadius: 300, justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 250, height: 250, backgroundColor: '#FFFFFF20', borderRadius: 300, justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ width: 150, height: 150, backgroundColor: '#FFFFFF30', borderRadius: 300, justifyContent: 'center', alignItems: 'center', }}>
                               <MotiImage source={require('@imgs/logo_white_nobg.png')} style={{ width: 130, height: 130, objectFit: 'contain' }}/>
                            </Column>
                        </Column>
                        </Column>
                    </Column>

                    <Title style={{ fontSize: 18, lineHeight: 18, marginTop: 20,}}>Como funciona o UHA!</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold,marginTop: 12, }}>1. Doe Notas Fiscais</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Cadastre suas notas fiscais:</B> Ao cadastrar suas notas fiscais no Uha!, você ajuda ONGs de todo o Brasil e acumula pontos</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold, marginTop: 6,}}>2. Faça Contribuições Financeiras</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Doe diretamente:</B> Contribua financeiramente para ONGs parceiras e veja seu impacto aumentar, ganhando pontos por cada doação.</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold, marginTop: 6,}}>3. Acumule Pontos</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Ganhe pontos:</B> Cada nota fiscal cadastrada e cada doação financeira realizada gera pontos que podem ser acumulados na sua conta.</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold, marginTop: 6, }}>4. Troque por Produtos e Serviços</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Use seus pontos:</B> Troque seus pontos por uma variedade de produtos e serviços oferecidos pelos nossos parceiros.</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold, marginTop: 6,}}>5. Participe de Sorteios e Raspadinhas</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Testemunhe a sorte:</B> Participe de sorteios emocionantes e raspadinhas divertidas para ganhar prêmios instantâneos.</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold, marginTop: 6, }}>6. Compartilhe com Amigos</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Convide amigos:</B> Compartilhe o app com seus amigos e ganhe pontos extras por cada novo usuário que se juntar através do seu convite.</Title>
                    <Title style={{ fontSize: 16, lineHeight: 18, fontFamily: font.bold, marginTop: 6, }}>7. Faça o Bem e Receba Recompensas</Title>
                    <Title style={{ fontSize: 14, lineHeight: 16, fontFamily: font.book, marginBottom: 8, marginTop: 4, marginLeft: 24,}}>• <B>Ajudando e ganhando</B>: Além de fazer o bem ao ajudar ONGs, você também recebe serviços e produtos como recompensa pelo seu engajamento.</Title>

                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Participe da nossa corrente do bem e gratidão. Unidos, podemos fazer um mundo melhor. Não importa a sua causa, estamos aqui para evidenciá-la e ecoá-la por toda a nação.</Label>
                   
                   
                    <Column style={{ backgroundColor: color.blue, marginVertical: 20, borderRadius: 16, flexGrow: 1, height: 140, justifyContent: 'center', alignItems: 'center',  }}>
                        <Column style={{ width: 300, height: 300, backgroundColor: '#FFFFFF30', borderRadius: 300, justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 200, height: 200, backgroundColor: '#FFFFFF30', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ width: 120, height: 120, backgroundColor: '#FFFFFF50', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <HeartHandshake size={42} color="#fff" />
                            </Column>
                        </Column>
                        </Column>
                    </Column>
                   
                    <Title style={{ fontSize: 20, lineHeight: 20,}}>Nossa Compromisso</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Ajudar quem precisa não precisa ser chato, monótono ou público. Com nossa plataforma, você contribui do seu jeito, no seu tempo e da forma que mais lhe agrada.</Label>
                   
                   
                    <Title style={{ fontSize: 20, lineHeight: 20,  marginTop: 20,}}>Nossa Gratidão</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Graças a pessoas generosas como você, levamos conforto e segurança a quem precisa, estimulando uma corrente do bem. Aproveite para colecionar bons momentos com nossos parceiros e sinta-se abraçado por nós e por todos que você ajudou.</Label>
                   
                   
                    <Title style={{ fontSize: 20, lineHeight: 20, marginTop: 20,}}>Nossa Esperança</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Você pode mais e, juntos, podemos abraçar o Brasil. ONGs, juntem-se a nós para sonhar e realizar juntos. Que "Uha!" seja seu grito de guerra e socorro final. Vamos ecoar gratidão e sorrisos a partir de agora.</Label>
                    
                    <Title style={{ fontSize: 20, lineHeight: 20,  marginTop: 20,}}>Quer ser um parceiro Uha?</Title>
                    <Label style={{ fontSize: 14, lineHeight: 16, marginVertical: 6, }}>Junte-se a quem já ecoa sorrisos e apoia sua própria causa. Escreva para contato@uha.digital</Label>
                   
                    <Column style={{height: 60, }} />
                  
                </Column>

            </Scroll>
        </Main>
    )
}
import React, { useContext, } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonOut, LabelLI } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/header';
import { MessageCircleQuestion } from 'lucide-react-native';
import { MotiView } from 'moti';

export default function AccountFAQScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <Scroll style={{}}>
                <Header title="Dúvidas frequentes" rose />

                <MotiView from={{opacity: 0, scale: 0.5, }} animate={{ opacity: 1, scale: 1, }} transition={{ type: 'spring', duration: 500, }} style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, }}>
                    <MessageCircleQuestion size={38} color="#fff" />
                </MotiView>
                <FlatList
                    style={{ marginTop: 24, marginHorizontal: margin.h, }}
                    data={Configs}
                    keyExtractor={(item, index) => index.toString()}
                    maxToRenderPerBatch={6}
                    initialNumToRender={6}
                    windowSize={6}
                    renderItem={({ item, index }) => <Card item={item} index={index} />}
                />

                <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                    <ButtonOut onPress={() => { navigation.navigate('Questions') }} style={{ borderColor: "#111", }}>
                        <LabelLI style={{ fontSize: 16, }}>Registrar dúvida</LabelLI>
                    </ButtonOut>
                    <Column style={{ width: 12, }} />
                    <ButtonOut onPress={() => { navigation.navigate('Questions') }} style={{ borderColor: color.primary, }}>
                        <LabelLI style={{ fontSize: 16, color: color.primary, }}>Registrar feedback</LabelLI>
                    </ButtonOut>
                </Row>
                <Column style={{ height: 100, }} />
            </Scroll>
        </Main>
    )
}

const Card = ({ item, index }) => {
    const { color, font, margin } = useContext(ThemeContext);
    return (
        <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 500, delay: index * 500, }}>
            <Column style={{ borderWidth: 1, borderColor: color.off, marginBottom: 16, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, }}>
                <Title style={{ fontSize: 18, marginRight: 6, }}>{item?.q}</Title>
                <Label style={{ fontSize: 14, }}>{item?.r}</Label>
            </Column>
        </MotiView>
    )
}


const Configs = [
    {
        q: 'O que é o Uha!?',
        r: 'Uha! é um aplicativo que permite a doação de notas fiscais e contribuições financeiras para ONGs em todo o Brasil. Em troca, você acumula pontos que podem ser trocados por produtos e serviços oferecidos por estabelecimentos parceiros.',
    },
    {
        q: 'Como posso doar notas fiscais pelo Uha!?',
        r: 'Basta cadastrar suas notas fiscais no aplicativo Uha!. Cada nota fiscal cadastrada ajuda as ONGs e gera pontos para você.',
    },
    {
        q: 'Como faço contribuições financeiras pelo Uha!?',
        r: 'No aplicativo Uha!, você pode escolher a ONG que deseja apoiar e fazer uma contribuição financeira diretamente pela plataforma. Cada doação gera pontos que são acumulados na sua conta.',
    },
    {
        q: 'Como funcionam os pontos no Uha!?',
        r: 'Você ganha pontos ao cadastrar notas fiscais e fazer contribuições financeiras. Esses pontos podem ser acumulados e trocados por produtos e serviços oferecidos pelos nossos parceiros.',
    },
    {
        q: 'O que posso fazer com os pontos acumulados?',
        r: 'Os pontos podem ser trocados por uma variedade de produtos e serviços disponíveis no aplicativo. Basta escolher o que deseja e gerar um QRCode para utilizar no estabelecimento parceiro.',
    },
    {
        q: 'Como funciona a geração de QRCode para utilizar os pontos?',
        r: 'Após escolher o produto ou serviço que deseja trocar pelos seus pontos, o aplicativo Uha! gera um QRCode. Leve esse QRCode até o estabelecimento parceiro para resgatar sua recompensa.',
    },
    {
        q: 'Posso participar de sorteios e raspadinhas no Uha!?',
        r: 'Sim! Além de doar e acumular pontos, você pode participar de sorteios e raspadinhas no aplicativo para ganhar prêmios instantâneos.',
    },
    {
        q: 'Como posso compartilhar o Uha! com meus amigos?',
        r: 'No aplicativo, você encontrará uma opção para convidar amigos. Ao compartilhar o Uha! e seus amigos se cadastrarem, você ganha pontos extras.',
    },
    {
        q: 'É seguro fazer doações financeiras pelo Uha!?',
        r: 'Sim, a segurança das suas informações e transações é nossa prioridade. Utilizamos tecnologia de ponta para garantir que suas doações financeiras sejam realizadas de forma segura.',
    },
    {
        q: 'Como posso acompanhar minhas doações e pontos?',
        r: 'No aplicativo Uha!, você tem acesso a um painel onde pode acompanhar todas as suas doações, pontos acumulados e históricos de transações.',
    },
    {
        q: 'O que acontece se a utilização de um serviço for cancelada ou não autorizada?',
        r: 'Se a utilização de um serviço for cancelada ou não autorizada, você será notificado imediatamente pelo aplicativo. Nesses casos, seus pontos serão devolvidos para que você possa utilizá-los novamente.',
    },
    {
        q: 'Como as ONGs podem se cadastrar no Uha!?',
        r: 'ONGs interessadas em se juntar ao Uha! podem se cadastrar diretamente pelo aplicativo ou pelo nosso site, preenchendo um formulário de parceria.',
    },
    {
        q: 'Como posso entrar em contato com o suporte do Uha!?',
        r: 'Se você tiver qualquer dúvida ou precisar de ajuda, pode entrar em contato com nosso suporte diretamente pelo aplicativo ou pelo nosso site. Estamos aqui para ajudar!',
    },

]

import { Main, Scroll, } from '@theme/global';
import Header from '@components/header';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function TermsScreen({ navigation, }) {
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Header title="Termos de Uso" rose />
            <WebView
                style={{ flex: 1, }}
                source={{ uri: 'https://www.iubenda.com/privacy-policy/92173065' }}
            />
        </Main>
    )
}


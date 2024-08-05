import { Main,  Column} from '@theme/global';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'lucide-react-native';
import Header from '@components/header';

export default function TermsScreen({ navigation, }) {
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Column style={{height: 50, }} />
            <Header rose title="Termos de Uso" />
            <WebView
                style={{ flex: 1,}}
                source={{ uri: 'https://www.iubenda.com/privacy-policy/92173065' }}
            />
        </Main>
    )
}


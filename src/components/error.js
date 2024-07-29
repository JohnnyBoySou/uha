import { MotiView } from "moti"
import { Title, Column } from '@theme/global';
import { AlertCircle } from "lucide-react-native";

const Error = ({ msg}) => {
    return (
        <MotiView from={{ opacity: 0, transformX: 20, }} animate={{ opacity: 1, transformX: 0, }} 
            style={{ alignItems: 'center', marginTop: 12, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#e63c3c', flexDirection: 'row', marginBottom: -12, }}>
            <Column style={{ width: 32, height: 32, backgroundColor: '#ffffff40', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <AlertCircle size={18} color="#fff" />
            </Column>
            <Title style={{ fontSize: 14, marginLeft: 12, color: '#fff', textAlign: 'center', }}>{msg}</Title>
        </MotiView>
    )
}
export default Error;
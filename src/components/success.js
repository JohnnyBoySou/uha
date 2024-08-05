import {  MotiView } from "moti"
import { Title, Column } from '@theme/global';
import { CheckCircle } from "lucide-react-native";

const Success = ({ msg }) => {
    return (
        <MotiView from={{ opacity: 0, transformX: 20, }} animate={{ opacity: 1, transformX: 0, }} exit={{ opacity: 0, transformX: 20, }} 
        style={{ alignItems: 'center', marginTop: 12, marginBottom: -12, padding: 8, borderRadius: 6, backgroundColor: '#00A3FF', flexDirection: 'row' }}>
            <Column style={{ width: 32, height: 32, backgroundColor: '#ffffff40', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <CheckCircle size={18} color="#fff" />
            </Column>
            <Title style={{ fontSize: 14, marginLeft: 12, color: '#fff', marginRight: 20, }}>{msg}</Title>
        </MotiView>
    )
}
export default Success;
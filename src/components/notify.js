import { MotiImage, MotiView } from 'moti';
import { Button, Column } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
const Notify = ({ url }) => {
    const navigation = useNavigation();
    return(     
        <Column style={{ position: 'relative' }}>
        <MotiView from={{opacity: 0, scale: .5, }} animate={{opacity: 1, scale: 1,}} transition={{delay: 400,}} style={{ width: 12, height: 12, backgroundColor: '#FF26BD', borderRadius: 100, position: 'absolute', top: 5, right: 6, zIndex: 99, borderWidth: 2, borderColor: "#fff", }}/>
        <Button onPress={() => {navigation.navigate('Notify')}} style={{ width: 35, height: 36, }}>
            <EvilIcons name="bell" size={32} color="#111" />
        </Button>
        </Column>
        )}

export default Notify;
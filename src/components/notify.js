import { MotiImage } from 'moti';
import { Button } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
const Notify = ({ url }) => {
    const navigation = useNavigation();
    return(     
        <Button onPress={() => {navigation.navigate('Notify')}} >
            <EvilIcons name="bell" size={32} color="#111" />
        </Button>
        )}

export default Notify;
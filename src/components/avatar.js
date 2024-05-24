import { MotiImage } from 'moti';
import { Button } from '@theme/global';
import { useNavigation } from '@react-navigation/native';

const Avatar = ({ url }) => {
    const navigation = useNavigation();
    const img = url ? url : 'https://i.pinimg.com/736x/c5/e4/6f/c5e46f1afb9214486b57526a34705c7f.jpg';
    return(     
        <Button onPress={() => {navigation.navigate('Account')}} >
            <MotiImage from={{opacity: 0, scale: .6,}} animate={{opacity: 1, scale: 1,}} transition={{delay: 400,}} source={{uri: img}} style={{width: 40, height: 40, borderRadius: 100}} />
        </Button>
        )}

export default Avatar;
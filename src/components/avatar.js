import { MotiImage } from 'moti';


const Avatar = ({ url }) => {
    const img = url ? url : 'https://i.pinimg.com/736x/c5/e4/6f/c5e46f1afb9214486b57526a34705c7f.jpg';
    return(     
        <MotiImage from={{opacity: 0,}} animate={{opacity: 1,}} source={{uri: img}} style={{width: 40, height: 40, borderRadius: 100}} />
        )}

export default Avatar;
import { Column, Row } from '@theme/global';
import { Pressable } from 'react-native';

const Check = ({status}) => {
    return(
            <Row style={{ backgroundColor: status ? '#ECAD0150' : "#D9D9D9", justifyContent: status ? 'flex-end' : 'flex-start', width: 50, borderRadius: 100, padding: 6, }}>
                <Column style={{ width: 18, height: 18, borderRadius: 100, backgroundColor: status ?  '#ECAD01' : '#858585' }} />
            </Row>
)}
export default Check;
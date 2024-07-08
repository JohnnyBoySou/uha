import {Dimensions, View, Animated } from 'react-native';
import { Row } from '@theme/global';
const windowWidth = Dimensions.get('window').width;

const Pagination = ({ dots, scrollX, activeIndex, activyColor, inactivyColor }) => {
    const itemsArray = Array.from({ length: dots }, (_, i) => i + 1);
    if(itemsArray.length > 1){
    return (
        <Row style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 14, marginBottom: 20, }}>
            {itemsArray.map((_, index) => {
                const inputRange = [
                    (index - 1) * windowWidth,
                    index * windowWidth,
                    (index + 1) * windowWidth
                ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 30, 8],
                    extrapolate: 'clamp',
                });

                return (
                    <>
                        <Animated.View
                            key={index}
                            style={{
                                width: dotWidth,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: index == activeIndex ? activyColor : inactivyColor,
                                marginHorizontal: 4,
                            }}
                        />
                    </>
                );
            })}
        </Row>
    )
}}
export default Pagination;
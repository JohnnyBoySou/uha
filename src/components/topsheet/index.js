
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated"

import { useState } from "react"
import { Column, Title } from '@theme/global';


export default function TopSheet({ children, min, max, normal, valueMin, valueNormal, valueMax, }) {
  const height = useSharedValue(valueMin); // Altura inicial do componente

  const MIN_HEIGHT = valueMin// Altura mínima
  const NORMAL_HEIGHT = valueNormal // Altura normal
  const MAX_HEIGHT =valueMax; // Altura máxima

  const [currentStatus, setCurrentStatus] = useState('min');

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + height.value
      height.value = offsetDelta 
    })
    .onEnd(() => {
      const currentHeight = height.value;
      let targetHeight;
      if (currentHeight < (MIN_HEIGHT + NORMAL_HEIGHT) / 2) {
        targetHeight = MIN_HEIGHT;
        runOnJS(setCurrentStatus)('min')
      } else if (currentHeight < (NORMAL_HEIGHT + MAX_HEIGHT) / 2) {
        targetHeight = NORMAL_HEIGHT;
        runOnJS(setCurrentStatus)('normal')
      } else {
        targetHeight = MAX_HEIGHT;
        runOnJS(setCurrentStatus)('max')
      }
      height.value = withSpring(targetHeight);
    });

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      height.value,
      [MIN_HEIGHT, NORMAL_HEIGHT, MAX_HEIGHT],
      ['#FE25BD', '#FE25BD', '#F7F7F7']
    );
    return {
      height: height.value,
      backgroundColor,
    };
  });


  return (
    <Animated.View style={[{ width: '100%', top: 0, zIndex: 99, borderBottomLeftRadius: 18,  borderBottomRightRadius: 18, position: 'absolute', overflow: 'hidden', }, animatedStyle]} >
      <Column style={{ paddingHorizontal: 28, paddingTop: 60, }}>
        {currentStatus === 'min' && min}
        {currentStatus === 'normal' && normal}
        {currentStatus === 'max' && max}
      </Column>
      <GestureDetector gesture={pan}>
        <Column style={{ padding: 20, position: 'absolute', bottom: 0, width: '100%',}}>
          <Column style={{ width: 80, height: 8, backgroundColor: currentStatus === 'max' ? "#30303070" : '#ffffff90', alignSelf: 'center', borderRadius: 100, }} />
        </Column>
      </GestureDetector>
    </Animated.View>
  )
}
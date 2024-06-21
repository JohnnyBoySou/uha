
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


export default function CardSheet({ children,  }) {
  const height = useSharedValue(40); // Altura inicial do componente

  const MIN_HEIGHT = 40; // Altura mínima
  const NORMAL_HEIGHT = 600; // Altura normal
  const MAX_HEIGHT = 600; // Altura máxima

  const [currentStatus, setCurrentStatus] = useState('min');

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = - event.changeY + height.value
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
    return {
      height: height.value,
    };
  });


  return (
    <Animated.View style={[{ width: '100%', bottom: 0, zIndex: 99, borderBottomLeftRadius: 18,  borderBottomRightRadius: 18, position: 'absolute', }, animatedStyle]} >
      <Column style={{ flex: 1, backgroundColor: "#00A3FF", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingVertical: 12, }}>
        {children}
      </Column>
      <GestureDetector gesture={pan}>
        <Column style={{ padding: 20, position: 'absolute', top: -5, width: '100%', zIndex: 99,}}>
          <Column style={{ width: 80, height: 8, backgroundColor:"#ffffff70", alignSelf: 'center', borderRadius: 100, }} />
        </Column>
      </GestureDetector>
    </Animated.View>
  )
}
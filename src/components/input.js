import { useRef, useState, useContext } from 'react';
import { useAnimationState, MotiText } from 'moti';
import { Column } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { TextInput } from 'react-native';

const Input = ({ value, setValue, disabled, label }) => {
    const { font, color } = useContext(ThemeContext);
    const [focus, setFocus] = useState(false);
    const inputRef = useRef();
  
    const inputAnimation = useAnimationState({
      from: { translateY: 8, fontSize: 18, backgroundColor: '#fff', paddingHorizontal: 6 },
      to: { translateY: -12, fontSize: 14, backgroundColor: '#fff', paddingHorizontal: 6 },
    });
  
    return (
      <Column style={{ borderColor: disabled ? '#f1f1f1' : focus ? color.primary : '#d7d7d7', borderWidth: 2, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginVertical: 10, }}>
        <MotiText
          state={inputAnimation}
          style={{ fontFamily: font.bold, color: color.secundary, position: 'absolute', top: 0, left: 8, letterSpacing: 0, }}
          transition={{ type: 'timing', duration: 200 }}
        >
          {label}
        </MotiText>
  
        <TextInput
          style={{ fontSize: 18, fontFamily: font.medium, color: disabled ? color.title+90 : color.title, }}
          ref={inputRef}
          onFocus={() => { setFocus(true); inputAnimation.transitionTo('to'); }}
          onBlur={() => { if (!value?.length > 0) { inputAnimation.transitionTo('from'); setFocus(false); }else{setFocus(false)} }}
          onSubmitEditing={() => setFocus(false)}
          editable={!disabled}
          onChangeText={setValue}
          value={value}
        />
      </Column>
    );
  };
  
  export default Input;
import { Column, Row, Button } from '@theme/global';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import { useContext, useEffect, useState} from 'react';
import { ThemeContext } from 'styled-components/native';
import { Check } from 'lucide-react-native';

const CheckBox = ({status, }) => {
    const { color, font, margin } = useContext(ThemeContext);
     

    return(
         <Button style={{ borderColor: status ? "#00A3FF" : color.off, backgroundColor: status ? '#00A3FF' : '#fff', width: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center',  borderWidth:2, height: 28, }}>
           <AnimatePresence>
           {status && 
            <MotiView from={{opacity: 0, scale: 0, translateY: 20,}} animate={{scale: 1, opacity: 1,  translateY: 0,}} exit={{opacity: 0, scale: 0,  translateY: 20,}}>
            <Check size={18} color="#fff"/>
            </MotiView> 
            }
           </AnimatePresence>
          </Button>
)}
export default CheckBox;
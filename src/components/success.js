import React from "react";
import { AnimatePresence, MotiView } from "moti"
import { Title,  } from '@theme/global';

const Success = ({ msg, show }) => {
    const [visible, setvisible] = React.useState(show ? true : false);
    return (
        <AnimatePresence>
            {visible &&
                <MotiView from={{ opacity: 0, transformX: 20, }} animate={{ opacity: 1, transformX: 0, }} exit={{ opacity: 0, transformX: 20, }} style={{  alignItems: 'center', marginTop: 12, padding: 8, borderRadius: 6, backgroundColor: '#00A3FF',   }}>
                    <Title style={{ fontSize: 14, color: '#fff', textAlign: 'center',}}>{msg}</Title>
                </MotiView>}
        </AnimatePresence>
    )
}
export default Success;
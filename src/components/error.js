import React from "react";
import { AnimatePresence, MotiView } from "moti"
import { Title, Button } from '@theme/global';
import { X } from "lucide-react-native";

const Error = ({ msg, dimiss, show }) => {
    const [visible, setvisible] = React.useState(show ? true : false);
    return (
        <AnimatePresence>
            {visible &&
                <MotiView from={{ opacity: 0, transformX: 20, }} animate={{ opacity: 1, transformX: 0, }} exit={{ opacity: 0, transformX: 20, }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 8, borderRadius: 6, backgroundColor: '#D90000',   }}>
                    <Title style={{ fontSize: 14, color: '#fff', }}>{msg}</Title>
                    <Button onPress={() => setvisible(false)}>
                        <X size={20} color="#fff" />
                    </Button>
                </MotiView>}
        </AnimatePresence>
    )
}
export default Error;
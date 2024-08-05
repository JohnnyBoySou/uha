import axios from 'axios';
import validator from 'validator';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export const registrarFeedback = async (message, type) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();

    const typeAss = type == 'duvida' ? 'Dúvida' : type == 'reclamacao' ? 'Reclamação' : 'Sugestão';
    const url =`${BASE_URL}/usuarios/feedback/cadastro`;
    try {
        const response = await axios.post(url, { 
            type: typeAss,
            message: validator.escape(message),},{headers: {Authorization: `Bearer ${token}`,},});
        return response.data;
    } catch (error) {
        console.error("Error revalidating token:", error);
        return false;
    }
};


export const listFeedback = async (type) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const url = type === 'duvida' ? `${BASE_URL}/usuarios/duvidas` : type === 'reclamacao' ? `${BASE_URL}/usuarios/reclamacoes` : type === 'sugestao' ? `${BASE_URL}/usuarios/sugestoes` : '';
    try {
        const response = await axios.get(url,{headers: { Authorization: `Bearer ${token}`,},});
        return response.data;
    } catch (error) {
        console.error("Error revalidating token:", error);
        return false;
    }
};



export const listSingleFeedback = async (type, id) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const url = type === 'duvida' ? `${BASE_URL}/usuarios/duvida/${id}` : type === 'reclamacao' ? `${BASE_URL}/usuarios/reclamacao/${id}` : type === 'sugestao' ? `${BASE_URL}/usuarios/sugestao/${id}` : '';
    try {
        const response = await axios.get(url,{headers: { Authorization: `Bearer ${token}`,},});
        return response.data;
    } catch (error) {
        console.error("Error revalidating token:", error);
        return false;
    }
};

import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export async function getONGs(){
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.post(`${BASE_URL}/usuarios/instituicoes`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}


export async function getONGSingle(id){
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/instituicoes/get-single/${id}`,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}
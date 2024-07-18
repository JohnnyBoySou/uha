import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


export async function getExtractDonate() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/doacoes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getExtractNotas() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/notas`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getExtractTransacao() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/transacoes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}





export async function getExtractRifas() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/rifas`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}







export async function getExtractSingle(type, id) {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    const path = type === 'Notas fiscais' ? `/notas/single/${id}` : type === 'Transações' ? `/transacoes/single/${id}` : type === 'Doações' ? `/doacoes/single/${id}` : type === 'Rifas' ? `/rifas/single/${id}` : null
    try {
        const res = await axios.get(`${BASE_URL}/usuarios${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

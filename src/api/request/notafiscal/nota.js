import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';
import { getOrigin } from '../../user/origin';

export async function sendNotafiscal(params) {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const { id, notas } = params
    try {
        const response = await axios.post(`${BASE_URL}/usuarios/doar/nota`,
            {
                instituicao_id: id,
                notas: notas,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data.message;
    } catch (error) {
        let errMsg;
        try {
            const err = JSON.parse(error.request.response);
            errMsg = err.message;
        } catch (e) {
            errMsg = error.message;
        }
        throw new Error(errMsg);
    }
}


export async function sendNotafiscalAnonima(params) {
    const BASE_URL = await getBaseURL();
    const origin = await getOrigin();
    const { id, notas,} = params
    try {
        const response = await axios.post(`${BASE_URL}/usuarios/doar/variasanonima`,
            {
                instituicao_id: id,
                notas: notas,
                email: origin,
            });
        console.log(response.data)
        return response.data.message;
    } catch (error) {
        let errMsg;
        try {
            const err = JSON.parse(error.request.response);
            errMsg = err.message;
        } catch (e) {
            errMsg = error.message;
        }
        throw new Error(errMsg);
    }
}



export async function verifyNota(params) {
    const BASE_URL = await getBaseURL();
    try {
        const response = await axios.post(`${BASE_URL}/usuarios/validar/nota`,
            {
                nota: params.nota,
            },);
        return response.data.message;
    } catch (error) {
        let errMsg;
        try {
            const err = JSON.parse(error.request.response);
            errMsg = err.message;
        } catch (e) {
            errMsg = error.message;
        }
        throw new Error(errMsg);
    }
}
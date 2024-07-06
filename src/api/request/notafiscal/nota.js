import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export async function sendNotafiscal( params ){
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const response = await axios.get(`${BASE_URL}/usuarios/doar/nota`, 
        {
            instituicao_id: params.id,
            nota: params.nota,
        },
         {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
      }
}

import axios from 'axios';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


export const sendCodeService = async ( id ) => {
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
        const res = await axios.post(`${BASE_URL}/usuarios/gerarcode`, {
            idservico: id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
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
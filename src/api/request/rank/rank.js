import axios from 'axios';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export const rankList = async () => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const response = await axios.get(`${BASE_URL}/usuarios/rank `, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};

export const rankMyPosition = async () => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const response = await axios.get(`${BASE_URL}/usuarios/minhaposicaorealativa`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};
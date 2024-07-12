import axios from 'axios';
import validator from 'validator';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


export const resetPasswordUser = async (params) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const sanitizedOldPassword = validator.escape(params.oldpassword);
    const sanitizedPassword = validator.escape(params.password);
    const sanitizedPasswordConfirmation = validator.escape(params.password_confirmation);
    try {
        const res = await axios.post(`${BASE_URL}/usuarios/redefinirsenha`, {
            oldpassword: sanitizedOldPassword,
            password: sanitizedPassword,
            password_confirmation: sanitizedPasswordConfirmation,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        //return error.request.response
        throw new Error(err.message)
    }
};
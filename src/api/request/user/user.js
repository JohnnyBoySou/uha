import axios from 'axios';
import validator from 'validator';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export const getUser = async (email, password) => {
  const BASE_URL = await getBaseURL();
  const token = await getToken();
  const sanitizedEmail = validator.normalizeEmail(email);
  const sanitizedPassword = validator.escape(password);
  try {
    const response = await axios.post(`${BASE_URL}/auth`, {
      email: sanitizedEmail,
      password: sanitizedPassword
    });
    return response.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message)
  }
};

export const registerUser = async (params) => {
  console.log(params)
  const BASE_URL = await getBaseURL();
  const sanitizedEmail = validator.normalizeEmail(params.email);
  const sanitizedPassword = validator.escape(params.password);
  const sanitizedName = validator.escape(params.name);
  const sanitizedCpf = validator.escape(params.cpf);
  const sanitizedWhatsapp = validator.escape(params.whatsapp);
  const sanitizedCep = validator.escape(params.cep);
  const sanitizedCode = params.code?.length > 0 ? validator.escape(params.code) : 0;
  const is = parseInt(params.is_whatsapp_send)
  try {
    const res = await axios.post(`${BASE_URL}/usuarios/register`, {
      email: sanitizedEmail,
      password: sanitizedPassword,
      name: sanitizedName,
      cpf: sanitizedCpf,
      whatsapp: sanitizedWhatsapp,
      cep: sanitizedCep,
      code: sanitizedCode,
      is_whatsapp_send: is,
    });
    return res.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message)
  }
};

export const resetPassword = async (email) => {
  const BASE_URL = await getBaseURL();
  const token = await getToken();
  const sanitizedEmail = validator.normalizeEmail(email);

  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, {
      email: sanitizedEmail
    });
    return response.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    return err.message
  }
};

export const validateToken = async (token) => {
  const sanitizedToken = validator.escape(token);
  try {
    const response = await axios.post(`${BASE_URL}/token`, {
      token: sanitizedToken
    });
    return response.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    return err.message
  }
};

export const updateUser = async (params) => {
  const BASE_URL = await getBaseURL();
  const token = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/usuarios/editarperfil`,
      {
        email: params.email,
        name: params.name,
        whatsapp: params.whatsapp,
        cep: params.cep,
        avatar: params.avatar, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error revalidating token:", error);
    return false;
  }
};

export const listUser = async () => {
  const token = await getToken()
  const BASE_URL = await getBaseURL();
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error revalidating token:", error);
    return false;
  }
}
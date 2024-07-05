import axios from 'axios';
import validator from 'validator';

const BASE_URL = 'https://gestao.uha.digital/api';

export const getUser = async (email, password) => {
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

export const registerUser = async (email, password, name, cpf, whatsapp, cep, code) => {
  const sanitizedEmail = validator.normalizeEmail(email);
  const sanitizedPassword = validator.escape(password);
  const sanitizedName = validator.escape(name);
  const sanitizedCpf = validator.escape(cpf);
  const sanitizedWhatsapp = validator.escape(whatsapp);
  const sanitizedCep = validator.escape(cep);
  const sanitizedCode = validator.escape(code);

  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email: sanitizedEmail,
      password: sanitizedPassword,
      name: sanitizedName,
      cpf: sanitizedCpf,
      whatsapp: sanitizedWhatsapp,
      cep: sanitizedCep,
      code: sanitizedCode,
    });
    return response.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    return err.message
  }
};

export const resetPassword = async (email) => {
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

export const editUser = async (email, password, token, others) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/edit`,
      {
        email,
        password,
        others,
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

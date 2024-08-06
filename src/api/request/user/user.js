import axios from 'axios';
import validator from 'validator';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export const getUser = async (email, password) => {
  const BASE_URL = await getBaseURL();
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
  const BASE_URL = await getBaseURL();

  const sanitizedParams = {
    email: validator.normalizeEmail(params.email),
    password: validator.escape(params.password),
    name: validator.escape(params.name),
    cpf: validator.escape(params.cpf),
    whatsapp: validator.escape(params.whatsapp),
    cep: validator.escape(params.cep),
    codigoUsado: params.code?.length > 0 ? validator.escape(params.code) : 0,
    is_whatsapp_send: parseInt(params.is_whatsapp_send),
  };

  try {
    const { data } = await axios.post(`${BASE_URL}/usuarios/register`, sanitizedParams);
    return data;
  } catch (error) {
    console.log('Error:', error.message);
    if (error.request) {
      console.log('Request data:', error.request);
    } else {
      console.log('Error message:', error.message);
    }
    const err = JSON.parse(error.request.response);
    throw new Error(err.message)
  }
};





export const resetPassword = async (email) => {
  const BASE_URL = await getBaseURL();
  const sanitizedEmail = validator.normalizeEmail(email);

  try {
    const response = await axios.post(`${BASE_URL}/usuarios/esquecisenhaemail`, {
      email: sanitizedEmail
    });
    return response.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    return err.message
  }
};
export const resetPasswordCode = async (email, code) => {
  const BASE_URL = await getBaseURL();
  const sanitizedEmail = validator.normalizeEmail(email);

  try {
    const response = await axios.post(`${BASE_URL}/usuarios/esquecisenhacodigo`, {
      email: sanitizedEmail,
      codigo: code,
    });
    return response.data;
  } catch (error) {
    const err = JSON.parse(error.request.response);
    return err.message
  }
};

export const resetPasswordNew = async (params) => {
  const BASE_URL = await getBaseURL();
  try {
    const res = await axios.post(`${BASE_URL}/usuarios/esquecisenharedefinir`, {
      email: params.email,
      codigo: params.codigo,
      password: params.password,
      password_confirmation: params.password_confirmation,
    },);
    return res.data;
  } catch (error) {
    console.log('Error:', error.message);
    if (error.request) {
      console.log('Request data:', error.request);
    } else {
      console.log('Error message:', error.message);
    }
    throw new Error(error.message);
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
    const err = error.request.response
    return new Throw(err.message)
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


export const verifyEmail = async (email, code) => {
  console.log(email, code)
  try {
    const res = await axios.post(`${await getBaseURL()}/usuarios/validacodigo`, {
      email: validator.normalizeEmail(email),
      codigo: code,
    });
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error)
    const err = JSON.parse(error?.request?.response);
    throw new Error(err.message)
  }
};


export const indicacaoUser = async () => {
  const token = await getToken()
  const BASE_URL = await getBaseURL();
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/indicacao`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error)
    const err = JSON.parse(error?.request?.response);
    throw new Error(err.message)
  }
}




export const excludeUser = async (password, message) => {

  const token = await getToken()
  const BASE_URL = await getBaseURL();
  try {
    const res = await axios.post(`${BASE_URL}/usuarios/exclusao`, {
      password: password,
      message: message,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data
  } catch (error) {
    console.log(error)
    const err = JSON.parse(error?.request?.response);
    throw new Error(err.message)
  }
};



export const verifyEstabelecimento = async (email) => {
  const BASE_URL = await getBaseURL();
  console.log(email)
  try {
    const res = await axios.post(`${BASE_URL}/usuarios/emailestabelecimento`, {
      email: email,
    });
    return res.data
  } catch (error) {
    console.log(error)
    const err = JSON.parse(error?.request?.response);
    throw new Error(err.message)
  }
};


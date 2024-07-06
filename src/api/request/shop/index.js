import axios from 'axios';
import getToken  from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


import campaigns from '@data/campaigns/campaigns'

export const getShops = async () => {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const response = await axios.post(`${BASE_URL}/usuarios/estabelecimentos`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
} catch (error) {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message)
  }
}

export const getOffers = async () => {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const response = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-ofertas-geral`, {
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

export const getServices = async () => {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-servicos-geral`,{
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

export async function getSingleService(id) {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-servico-sigle/${id}`, {
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

export async function getSingleShop(id) {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-single/${id}`, {
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

export async function getSingleServices(id) {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-servicos/${id}`, {
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

export async function getSingleOffers(id) {
  const token = await getToken()
  const BASE_URL = await getBaseURL()
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-ofertas/${id}`, {
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

export async function getCampaigns() {
  //const res = axios.get(BASE_URL + '/services')
  return campaigns
  //data = res.data
}

/*
https://gestao.uha.digital/api/usuarios/estabelecimentos/get-servico-sigle/1 -- GET
https://gestao.uha.digital/api/usuarios/estabelecimentos/get-ofertas-geral   -- GET
https://gestao.uha.digital/api/usuarios/estabelecimentos/get-servicos-geral   -- GET
*/
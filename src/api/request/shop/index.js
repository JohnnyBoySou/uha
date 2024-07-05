import axios from 'axios';

const BASE_URL = 'https://gestao.uha.digital/api';

const getToken = () => {
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dlc3Rhby51aGEuZGlnaXRhbC9hcGkvYXV0aCIsImlhdCI6MTcyMDE3ODA3NiwiZXhwIjoxNzI1NDM0MDc2LCJuYmYiOjE3MjAxNzgwNzYsImp0aSI6ImNkY2dHNDkyUlVDT3NUR3ciLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.umdtgYapqpty67kxX_Y7BENEEC9eA7GloC6QwHKxfr0' 
}

export const getShops = async () => {
  const token = getToken()
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
  const token = getToken()
  try {
    const response = await axios.post(`${BASE_URL}/usuarios/estabelecimentos`, {}, {
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


export async function getSingleShop(id) {
  const token = getToken()
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
  const token = getToken()
  try {
    const res = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/get-servicos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data)
    return res.data;
} catch (error) {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message)
  }
}


export async function getSingleOffers(id) {
  const token = getToken()
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
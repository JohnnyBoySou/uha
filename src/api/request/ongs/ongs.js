import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

export async function getONGs(page = 1){
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.post(`${BASE_URL}/usuarios/instituicoes?page=${page}`,);
        return res.data.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getONGsCategories(){
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/instituicoes/categorias`, {
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


export async function getONGCategorieSingle(id){
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/instituicoes/categoria/${id}`, {
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


export async function getONGSingle(id){
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/instituicoes/get-single/${id}`,  {
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

/*
{
    "icon": <Dog color="#5C0D45" size={28} />
    "name": "Animais",
}
{
    "icon": <Speech color="#5C0D45" size={28} />, 
    "name": "Social",
}
{
    "icon": <Trees color="#5C0D45" size={28} />, 
    "name": "Meio Ambiente",
}
{
    "icon": <HeartPulse color="#5C0D45" size={28} />, 
    "name": "Saúde",
} */
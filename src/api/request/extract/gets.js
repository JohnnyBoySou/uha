import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

import rifas_single from '@data/extract/rifas_single';
import moedas_single from '@data/extract/moedas_single';
import pontos_single from '@data/extract/pontos_single';
import doacoes_single from '@data/extract/doacoes_single';
import extrato_single from '@data/extract/extrato_single';

export async function getExtractDonate() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/doacoes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getExtractNotas() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/notas`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getExtractTransacao() {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    try {
        const res = await axios.get(`${BASE_URL}/usuarios/transacoes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getExtractSingle(type, id) {
    const BASE_URL = await getBaseURL()
    const token = await getToken()
    const path = type === 'Notas fiscais' ? `/notas/single/${id}` : type === 'Transações' ? `/transacoes/single/${id}` : type === 'Doação' ? `/doacoes/${id}` : `/extrato/${id}`
    
    try {
        const res = await axios.get(`${BASE_URL}/usuarios${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getSingleExtract(id) {
    const rifas = rifas_single.find(rifa => rifa.id === id);
    const moedas = moedas_single.find(moeda => moeda.id === id);
    const pontos = pontos_single.find(ponto => ponto.id === id);
    const doacoes = doacoes_single.find(doacao => doacao.id === id);
    const extrato = extrato_single.find(extrato => extrato.id === id);
    return rifas ? rifas : moedas ? moedas : pontos ? pontos : doacoes ? doacoes : extrato ? extrato : [];
}


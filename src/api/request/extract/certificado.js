import axios from 'axios';
import getToken  from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';



export async function getCertificado(ong, doacao){
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
//        const res = await axios.post(`${BASE_URL}/usuarios/certificado`, { instituicaoID: ong,  doacaoID: doacao, }, {  headers: { Authorization: `Bearer ${token}`, }, });

        return response;
        return res.data.data;
    } catch (error) {
      const err = JSON.parse(error.request.response);
      throw new Error(err.message)
    }
}


const response = {
    value: 5000,
    date: '20 de agosto de 2024',
    instituicao: 'Instituto Caramelo',
    assinatura: 'url',
    pdf: 'url',
    label: 'Fundador da Instituição Caramelo',
    name: 'Marcio Tunala Caramelo',
}
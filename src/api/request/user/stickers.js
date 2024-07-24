import axios from 'axios';
import getToken  from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';



export async function getStickers(){
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
     // const res = await axios.get(`${BASE_URL}/usuarios/stickers`, {  headers: { Authorization: `Bearer ${token}`, }, });
      //return res.data.data;
      return libs;
    } catch (error) {
      const err = JSON.parse(error.request.response);
      throw new Error(err.message)
    }
}

export async function getSingleSticker(id){
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
      //const res = await axios.get(`${BASE_URL}/usuarios/sticker/${id}`, { headers: { Authorization: `Bearer ${token}`,  }, });
      //return res.data;
      const find = libs.find(lib => lib.id === id);

      return {conquistados, bloqueados, ...find};
  } catch (error) {
      const err = JSON.parse(error.request.response);
      throw new Error(err.message)
    }
}


const libs = [
    {
        id: 1,
        name: 'Animal',
        img: require('@stk/animal.png'),
        bg: "#ffb800",
        total: 30,
        receive: 12,
        cl: true,
    },
    {
        id: 2,
        name: 'Social',
        img: require('@stk/social.png'),
        bg: "#efbbe0",
        total: 20,
        receive: 6,
    },
    {
        id: 3,
        name: 'Climática',
        img: require('@stk/climatica.png'),
        bg: "#FF2E00",
        total: 20,
        receive: 15,
        cl: true,
    },
    {
        id: 4,
        name: 'LGBT+',
        img: require('@stk/lgbt.png'),
        bg: "#5C0D45",
        total: 20,
        receive: 1,
        cl: true,
    },
    {
        id: 5,
        name: 'Ambiental',
        img: require('@stk/ambiental.png'),
        bg: "#19ac42",
        total: 20,
        receive: 10,
        cl: true,
    },
    {
        id: 6,
        name: 'Mulheres',
        img: require('@stk/mulher.png'),
        bg: "#ff26bd",
        total: 30,
        receive: 13,
        cl: true,
    },
    {
        id: 7,
        name: 'Desigualdade \nracial',
        img: require('@stk/diversidade.png'),
        bg: "#411b1b",
        total: 15,
        receive: 6,
        cl: true,
    },
    {
        id: 8,
        name: 'PCD',
        img: require('@stk/pcd.png'),
        bg: "#9747FF",
        total: 13,
        receive: 6,
        cl: true,
    },
]




const conquistados = [
    {
        id: 1,
        img: require('@stk/stk1.png'),
        name: 'Petiko vibes!',
        especial: true,
        label: 'Faça 20 doações para Petiko para receber esse sticker.',
        receive_date: '12 de Jun, 2024',
    },
    {
        id: 2,
        img: require('@stk/stk1.png'),
        especial: false,
        name: 'Caramelo fotográfo',
        label: 'Envie 50 notas fiscais para Instituto Caramelo para receber esse sticker.',
        receive_date: '16 de Jun, 2024',
    },
    {
        id: 3,
        img: require('@stk/stk1.png'),
        especial: false,
        name: 'Cadê minha nota fiscal?',
        label: 'Envie 10 notas fiscais para Anima para receber esse sticker.',
        receive_date: '20 de Jun, 2024',
    },
    {
        id: 4,
        img: require('@stk/stk1.png'),
        especial: false,
        name: 'Mestre das notas fiscais',
        label: 'Envie 50 notas fiscais para Anima para receber esse sticker.',
        receive_date: '20 de Jun, 2024',
    },
]
const bloqueados = [
    {
        id: 5,
        img: require('@stk/stk1.png'),
        name: 'Coração de ouro',
        especial: true,
        label: 'Faça 50 doações para receber esse sticker.',
    },
    {
        id: 6,
        img: require('@stk/stk1.png'),
        especial: false,
        name: 'Caramelo fotográfo II',
        label: 'Envie 100 notas fiscais para Instituto Caramelo para receber esse sticker.',
    },
    {
        id: 7,
        img: require('@stk/stk1.png'),
        especial: false,
        name: 'Recebeu a nota fiscal?',
        label: 'Envie 100 notas fiscais para qualquer ong para receber esse sticker.',
    },
]

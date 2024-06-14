import axios from 'axios'

const BASE_URL = 'https://api.com/'

import shops from '@data/shops'

export async function getCategory(id = 12) {
    //const res = axios.get(BASE_URL + '/shops')
    const data = shops.filter(shop => shop.categories.some(category => category.id === id)  );
    return data
    //data = res.data
}

/**
 * const shops = [
    {
        name: "Pet",
        id: 20,
        desc: 'Aqui você encontra tudo para seu pet',
        cep: '89260665',
        img: 'https://i.pinimg.com/564x/08/f6/3d/08f63d42e41667f518127da812cfe654.jpg',
        categories: [
            {
                id: 14,
                name: "Pets"
            },
            {
                id: 12,
                name: "Cuidados"
            }
        ],
 */
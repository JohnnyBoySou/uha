import axios from 'axios'

const BASE_URL = 'https://api.com/'

import shops from '@data/shops'
import shop_single from '@data/shop_single'

export async function getShops() {
    //const res = axios.get(BASE_URL + '/shops')
    return shops
    //data = res.data
}

export async function getSingleShop(id) {
    //const res = axios.get(BASE_URL + '/shop/' + id)
    const data = shop_single.find((shop) => shop.id == id)
    const rs = data ? data : shop_single[0]
    return rs
}

export async function getSingleShopServices(id, query) {
    //const res = axios.get(BASE_URL + '/shop/' + id)
    const shop = shop_single.find((shop) => shop.id == id)
    const results = shop.services.filter((service) => service.name.includes(query))
    return results.length > 0 ? results : [] 
}

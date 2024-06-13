import axios from 'axios'

const BASE_URL = 'https://api.com/'

import services from '@data/services'
import shops from '@data/shops'
import offers from '@data/services_offers'
import services_single from '@data/service_single'
import shop_single from '@data/shop_single'

export async function getShops() {
    //const res = axios.get(BASE_URL + '/shops')
    return shops
    //data = res.data
}

export async function getServices() {
    //const res = axios.get(BASE_URL + '/services')
    return services
    //data = res.data
}

export async function getSingleService(id) {
    //const res = axios.get(BASE_URL + '/services/' + id)
    const data = services_single.find((service) => service.id == id)
    const rs = data ? data : services_single[0]
    return rs 
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



export async function getOffers() {
    //const res = axios.get(BASE_URL + '/shops')
    return offers
    //data = res.data
}
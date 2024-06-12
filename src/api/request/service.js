import axios from 'axios'
const BASE_URL = 'https://api.com/'
import services from '@data/services'
import services_single from '@data/service_single'

export async function getServices() {
    //const res = axios.get(BASE_URL + '/services')
    return services
    //data = res.data
}

export async function getSingleService(id) {
    //const res = axios.get(BASE_URL + '/services/' + id)
    const data = services_single.find((service) => service.id == id)
    return data 
}
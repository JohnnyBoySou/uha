import axios from "axios";
import shops from '@data/shops/shops';
import services from '@data/services/services';

export async function getSearch(query) {
    //const res = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
    //return res.data.items;
    const shop = shops.filter(shop => shop.name?.includes(query));
    const serv = services.filter(service => service.title?.includes(query));
    return res = {
        shop: shop,
        service: serv
    }
}
import axios from 'axios';
const BASE_URL = 'https://api.com/'

export const getLogin = async (email, password) => {
    try {
        const response = await axios.post(BASE_URL + '/login', { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        return false;
    }
}
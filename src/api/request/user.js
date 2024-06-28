import axios from 'axios';

const BASE_URL = 'https://api.com';
import user from '@data/user/user'

export const getUser = async (email, password) => {
  try {
  //  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  //  return response.data;
    return user;
} catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

export const editUser = async (email, password, token, others) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/edit`,
      {
        email,
        password,
        others,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error revalidating token:", error);
    return false;
  }
};

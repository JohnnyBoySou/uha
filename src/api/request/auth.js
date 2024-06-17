import axios from 'axios';

const BASE_URL = 'https://api.com';

export const getLogin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

export const register = async (email, password, additionalData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email,
      password,
      ...additionalData,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    return false;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-pass`, { email });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    return false;
  }
};

export const verifyCode = async (email, code) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify`, { email, code });
      return response.data;
    } catch (error) {
      console.error("Error verifying code:", error);
      return false;
    }
};

export const getToken = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/token`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error getting token:", error);
    return false;
  }
};

export const revalidateToken = async (token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/revalidate_token`,
      {},
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

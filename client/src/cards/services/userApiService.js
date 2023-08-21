import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const fetchUserInfo = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.message);
  }
};



export const saveUserInfo = async (userId, user) => {
    try {
        const { data } = await axios.put(`${apiUrl}/users/${userId}`, user);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error.message);
    }
};

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async user => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const signup = async normalizedUser => {
  try {
    const { data } = await axios.post(`${apiUrl}/users`, normalizedUser);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const sendResetEmail = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/forgetpassowrd`,{ email});
    return response.data;
  } catch (error) {
    throw new Error("Failed to send reset email");
  }
};




export const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    await axios.post(`${apiUrl}/resetPassword`, {
      email,
      verificationCode,
      newPassword,
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
};



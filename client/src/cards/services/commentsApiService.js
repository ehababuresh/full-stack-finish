

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";



export const getComments = async (cardId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/comments/${cardId}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const saveComment = async (authorId, cardId, content) => {
  try {
    const { data } = await axios.post(`${apiUrl}/comments/${authorId}/${cardId}`, { content });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const { data } = await axios.put(`${apiUrl}/comments/${commentId}`, { content });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/comments/${commentId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

import axios from './api';
// import { BaseUrl } from '../config';

const API_URL = '/favoris/';

// Register user
const getAllFavoris = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL);
  return response.data;
};

const createFavori = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const updateFavori = async (id,userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.put(API_URL+"?id=" + id, userData);
  return response.data;
};

// Login user
const getFavoriId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL+"?id=" + id);
  return response.data;
};

const deleteFavoriId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.delete (API_URL+"?id=" + id);
  return response.data;
};



const favoriService = {
    createFavori,
  getAllFavoris,
  getFavoriId,
  updateFavori,
  deleteFavoriId
};

export default favoriService;

import axios from './api';
// import { BaseUrl } from '../config';

const API_URL = '/subcategorie/';

// Register user
const getAllSousCategories = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL);
  return response.data;
};

const createSousCategorie = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const updateSousCategorie = async (id,userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.put(API_URL+"?id=" + id, userData);
  return response.data;
};

// Login user
const getSousCategorieId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL+"?id=" + id);
  return response.data;
};

const deleteSousCategorieId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.delete (API_URL+"?id=" + id);
  return response.data;
};



const sousCategorieService = {
    createSousCategorie,
  getAllSousCategories,
  getSousCategorieId,
  updateSousCategorie,
  deleteSousCategorieId
};

export default sousCategorieService;

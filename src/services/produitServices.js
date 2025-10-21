import axios from './api';
// import { BaseUrl } from '../config';

const API_URL = '/produits/';

// Register user
const getAllproduits = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL);
  return response.data;
};

const createProduitS = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post(API_URL+'?action=simple', userData);
  console.log("response",response)
  return response.data;
};
const createProduitV = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post(API_URL+'?action=variant', userData);
  return response.data;
};

const updateProduit = async (id,userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.put(API_URL+"?id=" + id, userData);
  return response.data;
};

// Login user
const getProduitId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL+"?id=" + id);
  return response.data;
};

const deleteProduitId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.delete (API_URL+"?id=" + id);
  return response.data;
};



const produitService = {
    createProduitS,
    createProduitV,
  getAllproduits,
  getProduitId,
  updateProduit,
  deleteProduitId
};

export default produitService;

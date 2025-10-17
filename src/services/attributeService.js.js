import axios from './api';
// import { BaseUrl } from '../config';

const API_URL = '/attribute/';

// Register user
const getAllAttributes = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL);
  return response.data;
};

const createAttribute = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const updateAttribute = async (id,userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.put(API_URL+"?id=" + id, userData);
  return response.data;
};

// Login user
const getAttributeId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.get (API_URL+"?id=" + id);
  return response.data;
};

const deleteAttributeId = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.delete (API_URL+"?id=" + id);
  return response.data;
};



const attributeService = {
    createAttribute,
  getAllAttributes,
  getAttributeId,
  updateAttribute,
  deleteAttributeId
};

export default attributeService;

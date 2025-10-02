import axios from 'axios';
import { BaseUrl } from '../config';

const API_URL = BaseUrl+'/api/evenements/';

// Get user Voitures
const createEvenement = async (userData) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.post(API_URL,userData);
  return response.data;
};

//getById
const getEvenementById = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get(API_URL + id);

  // console.log (response.data.result);
  return response.data;
};

const getAllEvenement = async() => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get(API_URL);

  // console.log (response);
  return response.data;
};

const DeleteEvenement = async (id) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.delete(API_URL + id);

  //   console.log (response.data.result);
  return response.data;
};

const updateEvenement = async (data,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL,data, config);

  // console.log (response);
  return response.data;
};

const RevueService = {
  getAllEvenement,
  createEvenement,
  getEvenementById,
  DeleteEvenement,
  updateEvenement
};

export default RevueService;
